<?php namespace App\Controllers;

use CodeIgniter\Controller;

class Soporte_cliente extends BaseController
{
	public function __construct()
	{
		$this->curl = \Config\Services::curlrequest();
	}

	public function get_token()
	{		
		$db = \Config\Database::connect();
		
		$membresia = $db->table('membresia')
		->join('empresa e ', 'e.id_membresia = membresia.id')
		->where('e.id', ID_EMPRESA)
		->get()->getRow();

		$response_api = $this->curl->request('POST', 'https://soporte.titanicsoft.net/server/public/api/v1/autenticacion/generate_token_integracion_temp', [
				'form_params' => [
						'token_integracion' => $membresia->token_integracion
				],
		]);		

		if($response_api->getStatusCode() == 200)
		{
			return $this->respond($response_api->getBody(), 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Autenticación Fallida', 'tipo' => 'warning'], 400);
		}

	}

}
