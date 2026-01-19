<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Proveedor_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Image_model;
use App\Models\Configuracion\Tarifa_model;
class Proveedor extends BaseController
{
	public function __construct()
	{
		$this->Proveedor_m = new Proveedor_model();
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
		$this->Tarifa_m = new Tarifa_model();
	}

	public function get_select()
	{
		$response = $this->Proveedor_m->select("id, razon_social as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function index()
	{		 
		$response = $this->Proveedor_m->select('proveedor.*')
		->select('d.nombre as documento')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = proveedor.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = proveedor.id_documento', 'left')
		->where('id_empresa', ID_EMPRESA)		
		->findAll();

		foreach ($response as $row) {
			$row->tarifas = $this->Tarifa_m->where('id_proveedor', $row->id)->findAll();
			$row->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_proveedor', $row->id)->findAll();
		}

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('mantenedor-proveedor', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('mantenedor-proveedor', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'proveedor', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
					
			/** GUARDAR */
			$data = [
				'imagen'          	=> $imagen,
				'id_documento'      => trim($data_request["id_documento"]),
				'numero_documento'  => trim($data_request["numero_documento"]),
				'razon_social'      => trim($data_request["razon_social"]),
				'correo' 			 => trim($data_request["correo"]),
				'id_ubigeo'         => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
				'direccion'         => trim($data_request["direccion"]),     
				'contacto_nombre'   => trim($data_request["contacto_nombre"]),
				'contacto_celular'  => trim($data_request["contacto_celular"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Proveedor_m->save($data);

			$id_proveedor = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****** SAVE CUENTAS BANCARIAS */

			$this->Helper->eliminar_registros_detalle('cuenta_bancaria_persona', 'id_proveedor', $id_proveedor, json_decode($data_request["detalle_cuenta_bancaria"]));

			foreach (json_decode($data_request["detalle_cuenta_bancaria"]) as $row) {

				$data_detalle_cuenta = [
					'id_proveedor'	=> $id_proveedor,
					'banco'			=> $row->banco,
					'tipo'			=> $row->tipo,
					'numero'		=> $row->numero,
					'full_data'		=> $row->banco.' - '.$row->tipo.' - '.$row->numero,
					'fl_detraccion'	=> $row->fl_detraccion,
				];

				if(is_numeric($row->id))
				{
					$data_detalle_cuenta["id"] = $row->id;
				}

				$this->Cuenta_bancaria_persona_m->save($data_detalle_cuenta);
			}

			/****** SAVE TARIFAS */

			$this->Helper->eliminar_registros_detalle('tarifa', 'id_proveedor', $id_proveedor, json_decode($data_request["detalle_tarifa"]));

			foreach (json_decode($data_request["detalle_tarifa"]) as $row) {

				$data_detalle_tarifa = [
					'id_proveedor'			=> $id_proveedor,
					'id_empresa'			=> ID_EMPRESA,
					'id_ruta'				=> $row->id_ruta,
					'tipo_servicio'			=> $row->tipo_servicio,
					'tipo_medida'			=> $row->tipo_medida,
					'costo_medida'			=> $row->costo_medida,
					
					'id_vehiculo_clase'	=> (is_numeric($row->id_vehiculo_clase)) ? $row->id_vehiculo_clase  : null
				];

				if(is_numeric($row->id))
				{
					$data_detalle_tarifa["id"] = $row->id;
				}

				$this->Tarifa_m->save($data_detalle_tarifa);
			}

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PROVEEDORES',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["razon_social"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mantenedor-proveedor', 'delete');

		try {

			$data_request = $this->request->getPost();

			$db = \Config\Database::connect();
			$db->transStart();

			$proveedor = $this->Proveedor_m->find($data_request["id"]);

			$this->Cuenta_bancaria_persona_m->where('id_proveedor', $data_request["id"])->delete();
			$this->Proveedor_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($proveedor->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PROVEEDORES',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $proveedor->razon_social
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
