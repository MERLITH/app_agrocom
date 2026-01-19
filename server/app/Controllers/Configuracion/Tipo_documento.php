<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Tipo_documento_model;

class Tipo_documento extends BaseController
{
	public function __construct()
	{
		$this->Tipo_documento_m = new Tipo_documento_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Tipo_documento_m->select("id, nombre as text")
		->where('tipo', $data_request["tipo"])
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Tipo_documento_m->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-tipo_documento', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-tipo_documento', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'                => trim($data_request["nombre"]),
				'tipo'                 	=> trim($data_request["tipo"])
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Tipo_documento_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'TIPO DE DOCUMENTOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["tipo"]).' - '.trim($data_request["nombre"])
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
		$this->Helper->validar_permisos('configuracion-tipo_documento', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$tipo_documento = $this->Tipo_documento_m->find($data_request["id"]);

			$this->Tipo_documento_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'TIPO DE DOCUMENTOS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $tipo_documento->tipo.' - '.$tipo_documento->nombre
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
