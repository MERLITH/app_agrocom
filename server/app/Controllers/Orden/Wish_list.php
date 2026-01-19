<?php namespace App\Controllers\Orden;

use App\Controllers\BaseController;

use App\Models\Orden\Wish_list_model;

class Wish_list extends BaseController
{
	public function __construct()
	{
		$this->Wish_m = new Wish_list_model();
		
	}	

	public function get_wish()
	{
		
		$response = $this->Wish_m->select('wish_list.*')->where('wish_list.id_usuario', ID_USUARIO)->findAll();

		return $this->respond($response, 200);

	}

	public function save()
	{
		//$data_request = $this->request->getPost();
		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id_usuario'					=> ID_USUARIO,
				'id_producto'					=> $data_request["id_producto"],
			];

			$this->Wish_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		//$data_request = $this->request->getPost();
		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$this->Wish_m
			->where('id_producto', $data_request["id_producto"])
			->where('id_usuario', ID_USUARIO)
			->delete();
	
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete_by_id()
	{
		//$data_request = $this->request->getPost();
		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$this->Wish_m
			->where('id', $data_request["id"])
			->delete();
	
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


}
