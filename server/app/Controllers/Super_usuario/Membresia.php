<?php namespace App\Controllers\Super_usuario;

use App\Controllers\BaseController;
use App\Models\Superusuario\Membresia_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Config_modulo_model;

class Membresia extends BaseController
{
	public function __construct()
	{
		$this->Membresia_m = new Membresia_model();
		$this->Empresa_m = new Empresa_model();
		$this->Config_modulo_m = new Config_modulo_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
	}

	public function get_select()
	{
		$response = $this->Membresia_m->select('id, nombre as text')->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Membresia_m->orderBy('id', 'desc')->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-membresia', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-membresia', 'new');
		} 

		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			/** GUARDAR */
			$data = [
				'nombre'				=> trim($data_request["nombre"]),
				'token_integracion'		=> trim($data_request["token_integracion"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Membresia_m->save($data);

			/** CREAR AUTOMATIC */
			if(!isset($data_request["id"]))
			{
				$id_membresia = $db->insertID();

				/*** EMPRESA */
				$data_empresa = [
					'logo' 			=> 'sin_imagen.jpg',
					'id_membresia'	=> $id_membresia
				];

				$this->Empresa_m->save($data_empresa);

				$id_empresa = $db->insertID();

				/*** AJUSTES AVANZADOS */
				$data_ajuste = [
					'porcentaje_detraccion'			=> 4,
					'porcentaje_igv'				=> 18,
					'id_empresa'					=> $id_empresa
				];

				$this->Ajuste_avanzado_m->insert($data_ajuste);

				/*** AJUSTES AVANZADOS */
				$data_ajuste = [
					'dt_configuracion_vehiculo'		=> '[]',
					'id_empresa'					=> $id_empresa
				];

				$this->Config_modulo_m->insert($data_ajuste); 
			}

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
		$this->Helper->validar_permisos('configuracion-membresia', 'delete');

		try {

			$data_request = $this->request->getPost();

			$db = \Config\Database::connect();
			$db->transStart();

			$this->Membresia_m->where('id', $data_request["id"])
			->delete();
			            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
