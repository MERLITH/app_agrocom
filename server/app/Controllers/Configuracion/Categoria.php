<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Categoria_model;

class Categoria extends BaseController
{
	public function __construct()
	{
		$this->Categoria_m = new Categoria_model();
	}

	public function get_select()
	{
		$response = $this->Categoria_m->select("id, nombre as text")
		->orderBy('nombre', 'asc')
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Categoria_m
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-categoria', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-categoria', 'new');
		} 

		try {


			$result_duplicado = $this->Helper->validar_duplicado('Nombre', 'cajban_categoria', 'nombre',  trim($data_request["nombre"]), ((isset($data_request["id"])) ? $data_request["id"] : null));
			if(is_array($result_duplicado))
			{
				return $this->respond($result_duplicado, 400);
			}

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'               => trim($data_request["nombre"]),
				'fl_incluir_utilidad'  => isset($data_request["fl_incluir_utilidad"]) ? 1 : null,
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
				'menu'			=> 'CATEGORIA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$this->Categoria_m->save($data);
			
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
		$this->Helper->validar_permisos('configuracion-categoria', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$categoria = $this->Categoria_m->find($data_request["id"]);

			$this->Categoria_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CATEGORIA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $categoria->nombre
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
