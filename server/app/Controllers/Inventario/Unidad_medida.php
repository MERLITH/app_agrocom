<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Unidad_medida_model;

class Unidad_medida extends BaseController
{
	public function __construct()
	{
		$this->Unidad_medida_m = new Unidad_medida_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Unidad_medida_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Unidad_medida_m->where('id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-unidad_medida', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-unidad_medida', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'         			=> trim($data_request["nombre"]),
				'codigo_sunat'    			=> trim($data_request["codigo_sunat"]),
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

			$this->Unidad_medida_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'UNIDAD MEDIDA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
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
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-unidad_medida', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$unidad_medida = $this->Unidad_medida_m->find($data_request["id"]);

			$this->Unidad_medida_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'UNIDAD MEDIDA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $unidad_medida->nombre
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
