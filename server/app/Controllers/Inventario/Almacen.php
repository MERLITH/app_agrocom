<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Almacen_model;

class Almacen extends BaseController
{
	public function __construct()
	{
		$this->Almacen_m = new Almacen_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Almacen_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Almacen_m->where('id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-almacen', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-almacen', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'         	=> trim($data_request["nombre"]),
				'descripcion'       => trim($data_request["descripcion"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Almacen_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'LOGÍSTICA',
				'menu'			=> 'ALMACÉNES',
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
		$this->Helper->validar_permisos('inventario-almacen', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$almacen = $this->Almacen_m->find($data_request["id"]);

			$this->Almacen_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'LOGÍSTICA',
				'menu'			=> 'ALMACENES',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $almacen->nombre
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
