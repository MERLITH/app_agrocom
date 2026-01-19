<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use CodeIgniter\Controller;

use App\Models\General\Libro_reclamaciones_model;

class Libro_reclamaciones extends Controller
{

	use ResponseTrait;
	
	public function __construct()
	{
		$this->Helper = new Helper_model();
		$this->Libro_reclamaciones_m = new Libro_reclamaciones_model();
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
				'id_tipo_documento'         => trim($data_request["id_tipo_documento"]),
				'numero_documento'         	=> trim($data_request["numero_documento"]),
				'id_tipo'         			=> trim($data_request["id_tipo"]),
				'bien_contratado'         	=> trim($data_request["bien_contratado"]),
				'descripcion'         		=> trim($data_request["descripcion"]),
				'pedido'         			=> trim($data_request["pedido"]),
				'id_usuario'         		=> $id_usuario,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Libro_reclamaciones_m->get_correlativo();

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["ser_num"] = $correlativo->serie.'-'.$correlativo->numero;
			}

			$this->Libro_reclamaciones_m->save($data);

			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tu reclamo ha sido enviado. En 5 días hábiles tendra una respuesta. ¡Gracias!'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}



}

