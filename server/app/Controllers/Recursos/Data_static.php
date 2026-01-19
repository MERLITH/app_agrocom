<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;

class Data_static extends BaseController
{
	public function __construct()
	{
		$this->db = \Config\Database::connect();
	}

	public function ubigeo()
	{
		$data_get = $this->request->getGet();

		$response = $this->db->table('static_ubigeo')
		->select('id, concat(id, " - ", departamento, " - ", provincia, " - ", distrito) as text')
		->like('id', $data_get["buscar"], 'both')
		->orLike('departamento', $data_get["buscar"], 'both')
		->orLike('provincia', $data_get["buscar"], 'both')
		->orLike('distrito', $data_get["buscar"], 'both')
		->get()->getResult();
		
		return $this->respond($response, 200);
	}

	public function motivo_traslado()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_motivo_traslado_sunat')
		->select('id, nombre as text')
		->get()->getResult();

		return $this->respond($response, 200);
	}

	public function tipo_cuenta_bancaria()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_tipo_cuenta_bancaria')
		->select('id, nombre as text')
		->get()->getResult();

		return $this->respond($response, 200);
	}
	
	public function documento_entidad()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_documento')
		->select('id, nombre as text')
		->get()->getResult();

		return $this->respond($response, 200);
	}

	public function moneda()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_moneda')
		->select('id, nombre as text')
		->get()->getResult();

		return $this->respond($response, 200);
	}

	public function comprobante()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_comprobante')
		->select('id, nombre as text');
		
		if(isset($data_request["tipo"]))
		{
			$response->where('tipo', $data_request["tipo"]);
		}

		$response = $response->get()->getResult();

		return $this->respond($response, 200);
	}

	public function tipo_nota()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_tipo_nota')
		->select('id, nombre as text')
		->where('tipo', $data_request["tipo"]);

		$response = $response->get()->getResult();

		return $this->respond($response, 200);
	}

	public function unidad_medida()
	{
		$data_request = $this->request->getGet();

        $response = $this->db->table('static_unidad_medida')
		->select('codigo_sunat as id, concat("(",codigo_sunat,") ", nombre) as text')
		->get()->getResult();

		return $this->respond($response, 200);
	}
		
}
