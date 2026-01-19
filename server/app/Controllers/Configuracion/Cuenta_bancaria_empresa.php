<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Cuenta_bancaria_empresa_model;
use App\Models\Image_model;

class Cuenta_bancaria_empresa extends BaseController
{
	public function __construct()
	{
		$this->Cuenta_bancaria_empresa_m = new Cuenta_bancaria_empresa_model();
	}

	public function get_unique()
	{
		$data_request = $this->request->getGet();

		$response = $this->Cuenta_bancaria_empresa_m->select("id, full_data as text, saldo_disponible");


		if(isset($data_request["fl_principal"]))
		{
			$response->where('fl_principal', 1);
		}

		if(isset($data_request["fl_gastos"]))
		{
			$response->where('fl_gastos', 1);
		}

		$response = $response->where('id_empresa', ID_EMPRESA)
		->first();

		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Cuenta_bancaria_empresa_m->select("id, full_data as text");

		if(isset($data_request["id_moneda"]))
		{
			$response->where('id_moneda', $data_request["id_moneda"]);
		}

		if(isset($data_request["fl_principal"]))
		{
			$response->where('fl_principal', 1);
		}

		if(isset($data_request["fl_gastos"]))
		{
			$response->where('fl_gastos', 1);
		}

		$response = $response->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Cuenta_bancaria_empresa_m->select('cuenta_bancaria_empresa.*')
		->select('m.nombre as moneda')
		->join('static_moneda m', 'm.id = cuenta_bancaria_empresa.id_moneda')
		->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-cuenta_bancaria_empresa', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-cuenta_bancaria_empresa', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'banco'         	=> trim($data_request["banco"]),
				'tipo'          	=> trim($data_request["tipo"]),
				'numero'        	=> trim($data_request["numero"]),
				'descripcion'   	=> trim($data_request["descripcion"]),
				'id_moneda'   		=> trim($data_request["id_moneda"]),
				'full_data'     	=> trim($data_request["banco"]).' - '.trim($data_request["tipo"]).' - '.trim($data_request["numero"]),
				'fl_publico'   		=> (isset($data_request["id_moneda"])) ? 1 : 0,
				'fl_detraccion' 	=> ($data_request["tipo"] == 'CUENTA DE DETRACCIONES') ? 1 : 0,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Cuenta_bancaria_empresa_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CUENTAS BANCARIAS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["banco"]).' - '.trim($data_request["tipo"]).' - '.trim($data_request["numero"])
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
		$this->Helper->validar_permisos('configuracion-cuenta_bancaria_empresa', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$cuenta_bancaria = $this->Cuenta_bancaria_empresa_m->find($data_request["id"]);

			$this->Cuenta_bancaria_empresa_m->where('id', $data_request["id"])
			->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CUENTAS BANCARIAS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $cuenta_bancaria->full_data
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
