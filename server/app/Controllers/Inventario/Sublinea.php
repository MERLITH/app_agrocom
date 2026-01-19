<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Sublinea_model;

class Sublinea extends BaseController
{
	public function __construct()
	{
		$this->Sublinea_m = new Sublinea_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Sublinea_m->select("id, nombre as text")
		->where('id_linea', $data_request["id_linea"])
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Sublinea_m->where('id_linea', $data_request["id_linea"])
		->where('id_empresa', ID_EMPRESA)		
		->findAll();

        return $this->respond($response, 200);
	}

	public function save_sublinea()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-linea_sublinea', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-linea_sublinea', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'         	=> trim($data_request["nombre"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_linea"] = $data_request["id_linea"];
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Sublinea_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'SUBLÍNEA',
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
	

	public function delete_sublinea()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-linea_sublinea', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$sublinea = $this->Sublinea_m->find($data_request["id"]);

			$this->Sublinea_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'SUBLÍNEA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $sublinea->nombre
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
