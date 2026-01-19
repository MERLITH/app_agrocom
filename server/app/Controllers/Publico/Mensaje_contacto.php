<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use CodeIgniter\Controller;

use App\Models\General\Mensaje_contacto_model;

class Mensaje_contacto extends Controller
{

	use ResponseTrait;
	
	public function __construct()
	{
		$this->Mensaje_m = new Mensaje_contacto_model();
	}


	public function save()
	{
		$data_request = $this->request->getPost();


		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$id_usuario = (isset($data_request["id_usuario"])) ? $data_request["id_usuario"] : null;

			/** GUARDAR */
			$data = [
				'nombres'         			=> trim($data_request["nombres"]),
				'email'         			=> trim($data_request["email"]),
				'telefono'         			=> trim($data_request["telefono"]),
				'asunto'         			=> trim($data_request["asunto"]),
				'mensaje'         			=> trim($data_request["mensaje"]),
				'id_usuario'         		=> $id_usuario,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Mensaje_m->save($data);

			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tu mensaje ha sido enviado. ¡Gracias!'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}



}

