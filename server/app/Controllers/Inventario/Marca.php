<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Marca_model;

class Marca extends BaseController
{
	public function __construct()
	{
		$this->Marca_m = new Marca_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Marca_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Marca_m->where('id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-marca', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-marca', 'new');
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
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Marca_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'TIPO ARTÍCULO',
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
		$this->Helper->validar_permisos('inventario-marca', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$marca = $this->Marca_m->find($data_request["id"]);

			$this->Marca_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'TIPO ARTÍCULO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $marca->nombre
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
