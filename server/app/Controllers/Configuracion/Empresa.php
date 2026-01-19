<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Empresa_model;
use App\Models\Image_model;

class Empresa extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Empresa_m->select("id, razon_social as text");

		if(isset($data_request["tipo"]))
		{
			$response->where('tipo', $data_request["tipo"]);
		}

		$response = $response->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Empresa_m->select('empresa.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = empresa.id_ubigeo', 'left')
		->find(ID_EMPRESA);

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-empresa', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$imagen = '';

			if($this->request->getFile('imagen')){
				/** GUARDAR IMAGEN */
				$Imagen_upload = new Image_model();			
				$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'empresa', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
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
				'id'							=> ID_EMPRESA				
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Empresa_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'EMPRESA',
				'accion'		=> 'EDITAR',
				'descripcion'	=> 'Datos generales de la empresa'
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

		
}
