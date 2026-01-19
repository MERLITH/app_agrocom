<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Rol_model;
use App\Models\Configuracion\Permiso_model;
use App\Models\Image_model;

class Rol extends BaseController
{
	public function __construct()
	{
		$this->Rol_m = new Rol_model();
		$this->Permiso_m = new Permiso_model();
	}

	public function get_select()
	{
		$response = $this->Rol_m->select('id, nombre as text')->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{
		$data_request = $this->request->getGet();
		
        $response = $this->Rol_m->where('id_empresa', ID_EMPRESA)->findAll();

		foreach ($response as $row) {
			$row->permisos = $this->Permiso_m->where('id_rol', $row->id)->findAll();
		}

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-rol', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-rol', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

					
			/** GUARDAR */
			$data = [
				'nombre'        	=> $data_request["nombre"],
				'fl_no_dashboard'   => isset($data_request["fl_no_dashboard"]) ? 1 : 0
			];

			if(isset($data_request["id"]))
			{
				/** ELIMINAR PERMISOS */
				$this->Permiso_m->delete(['id_rol' => $data_request["id"]]);
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Rol_m->save($data);

			$id_rol = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			$this->Permiso_m->where('id_rol', $id_rol)->delete();

			$data_insert = array();
			foreach (json_decode($data_request["permisos"]) as $row) {
				if ($row->view or $row->new or $row->edit or $row->delete) {
					$data_insert[] = array(
						'view'              => ($row->view) ? 1 : 0,
						'new'               => ($row->new) ? 1 : 0,
						'edit'              => ($row->edit) ? 1 : 0,
						'delete'            => ($row->delete) ? 1 : 0,
						'menu'            	=> $row->menu,
						'id_rol'    		=> $id_rol
					);
				}
			}

			$this->Permiso_m->insertBatch($data_insert);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'ROLES Y PERMISOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $data_request["nombre"]
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
		$this->Helper->validar_permisos('configuracion-rol', 'delete');
		
		try {


			/* VALIDAR PERMISO */
			$this->Helper->validar_permisos('configuracion-rol', 'delete');

			$db = \Config\Database::connect();
			$db->transStart();

			$rol = $this->Rol_m->find($data_request["id"]);

            $this->Rol_m->where('id', $data_request["id"])->delete();         

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'ROLES Y PERMISOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $rol->nombre
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
