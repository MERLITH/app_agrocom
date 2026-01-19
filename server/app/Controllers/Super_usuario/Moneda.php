<?php namespace App\Controllers\Super_usuario;

use App\Controllers\BaseController;

use App\Models\Configuracion\Moneda_model;

class Moneda extends BaseController
{
	public function __construct()
	{
		$this->Moneda_m = new Moneda_model();
	}


	public function index()
	{		
		$response = $this->Moneda_m->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data_request = $this->request->getPost();
			
			/** GUARDAR */
			$data = [
				'nombre'			=> trim($data_request["nombre"]),
				'simbolo'    		=> trim($data_request["simbolo"]),
				'codigo'			=> trim($data_request["codigo"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Moneda_m->save($data);

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	
	public function delete()
	{
		try {

			$data_request = $this->request->getPost();

			$db = \Config\Database::connect();
			$db->transStart();

			$this->Moneda_m->where('id', $data_request["id"])
			->delete();
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
