<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Tipo_Producto_model;
use App\Models\Image_model;

class Tipo_articulo extends BaseController
{
	public function __construct()
	{
		$this->Tipo_articulo_m = new Tipo_Producto_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Tipo_articulo_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Tipo_articulo_m->where('id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-tipo_articulo', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-tipo_articulo', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$imagen = '';

			if($this->request->getFile('image')){
				/** GUARDAR IMAGEN */
				$Imagen_upload = new Image_model();			
				$imagen = $Imagen_upload->guardar($this->request->getFile('image'), 'empresa', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
			}

			/** GUARDAR */
			$data = [
				'nombre'         		=> trim($data_request["nombre"]),
				'description'       => trim($data_request["description"]),
				'image'         	=> $imagen,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Tipo_articulo_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'LOGÍSTICA',
				'menu'			=> 'CATEGORÍA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
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
		$this->Helper->validar_permisos('inventario-tipo_articulo', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$tipo_articulo = $this->Tipo_articulo_m->find($data_request["id"]);

			$this->Tipo_articulo_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'LOGÍSTICA',
				'menu'			=> 'CATEGORÍA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $tipo_articulo->nombre
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
