<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Notificacion_model;

class Notificacion extends BaseController
{
	public function __construct()
	{
		$this->Notificacion_m = new Notificacion_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Notificacion_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Notificacion_m->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-notificacion', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-notificacion', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'email'                => trim($data_request["email"]),
				'telefono'             => trim($data_request["telefono"]),
				'nombre'               => trim($data_request["nombre"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DESTINO DE NOTIFICACIONES',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"]).', '.trim($data_request["email"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$this->Notificacion_m->save($data);
			
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
		$this->Helper->validar_permisos('configuracion-notificacion', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$notificacion = $this->Notificacion_m->find($data_request["id"]);

			$this->Notificacion_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DESTINO DE NOTIFICACIONES',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $notificacion->nombre.', '.$notificacion->email
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
