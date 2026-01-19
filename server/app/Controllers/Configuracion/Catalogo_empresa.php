<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Catalogo_empresa_model;
use App\Models\Image_model;

class Catalogo_empresa extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Catalogo_empresa_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Empresa_m->select("id, nombre_comercial as text")
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Empresa_m->select('catalogo_empresas.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = catalogo_empresas.id_ubigeo', 'left')
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-catalogo_empresa', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$imagen = '';

			if($this->request->getFile('imagen')){
				/** GUARDAR IMAGEN */
				$Imagen_upload = new Image_model();			
				$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'catalogo_empresas', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
			}
			
			/** GUARDAR */
			$data = [
				'logo'							=> $imagen,
				'razon_social'					=> $data_request["razon_social"],
				'nombre_comercial'				=> $data_request["nombre_comercial"],
				'numero_documento'				=> $data_request["numero_documento"],
				'direccion'						=> $data_request["direccion"],
				'id_ubigeo'						=> (isset($data_request["id_ubigeo"])) ? $data_request["id_ubigeo"] : null,
				'telefono'						=> $data_request["telefono"],
				'email'							=> $data_request["email"],
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Empresa_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CATÁLOGO EMPRESA',
				'accion'		=> 'EDITAR',
				'descripcion'	=> 'Catalogo empresas'
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
		$this->Helper->validar_permisos('configuracion-catalogo_empresa', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$objEmp = $this->Empresa_m->find($data_request["id"]);

			$this->Empresa_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CATÁLOGO EMPRESAS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $objEmp->tipo.' - '.$objEmp->nombre
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
