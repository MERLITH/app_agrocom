<?php namespace App\Controllers\Basic;

use App\Controllers\BaseController;

use App\Models\Basic\Constante_model;

class Constante extends BaseController
{
	public function __construct()
	{
		$this->Constante_m = new Constante_model();
	}

	public function get_constante_by_accion()
	{
		$data_request = $this->request->getGet();

        $cAccion = isset($data_request["cAccion"]) ? $data_request["cAccion"] : '';
        $nConCodigo = isset($data_request["nConCodigo"]) ? $data_request["nConCodigo"] : 0;
        $nEstado = isset($data_request["nEstado"]) ? $data_request["nEstado"] : 0;

        $response = $this->Constante_m->select("nConCodigo as Codigo, nConValor as id, cConDescripcion as text, cConDetalle as detalle")
		->where('nConCodigo', $nConCodigo)
		->where('nConEstado', $nEstado);

		if ($cAccion == 'A') {
			$response->where('nConValor <>', 0);
		}
		
        $response = $response->orderBy('nConValor', 'asc')
		->findAll();
		
		return $this->respond($response, 200);
	}

	
		
}
