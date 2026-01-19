<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Image_model;

class Cuenta_bancaria_persona extends BaseController
{
	public function __construct()
	{
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Cuenta_bancaria_persona_m->select("id, full_data as text");

		if($data_request["tipo"] == 'PROVEEDOR' or $data_request["tipo"] == 'CLIENTE')
		{
			$response->where('id_socio', $data_request["id"]);
		}
		else if($data_request["tipo"] == 'PERSONAL' or $data_request["tipo"] == 'CONDUCTOR')
		{
			$response->where('id_personal', $data_request["id"]);
		}

		if(isset($data_request["fl_detraccion"]))
		{
			$response->where('fl_detraccion', 1);
		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

}
