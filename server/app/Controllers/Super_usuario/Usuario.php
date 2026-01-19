<?php namespace App\Controllers\Super_usuario;

use App\Controllers\BaseController;

use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Image_model;

class Usuario extends BaseController
{
	public function __construct()
	{
		$this->Usuario_m = new Usuario_model();
		$this->Empresa_m = new Empresa_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Usuario_m->select("id, concat(nombre,' ',apellido) as text");

		if(isset($data_request["tipo"]))
		{
			$response->where('tipo', $data_request["tipo"]);
		}

		$response = $response->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Usuario_m->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data_request = $this->request->getPost();

			/** SEARCH EMPRESA */
			if($data_request["id_membresia"] != '')
			{				
				$empresa = $this->Empresa_m->where('id_membresia', $data_request["id_membresia"])->first();
			}
			

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'usuario', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
					
			/** GUARDAR */
			$data = [
				'nombre'			=> trim($data_request["nombre"]),
				'apellido'    		=> trim($data_request["apellido"]),
				'email'				=> trim($data_request["email"]),
				'usuario'			=> trim($data_request["usuario"]),
				'id_empresa'		=> ($data_request["id_membresia"] != '') ? $empresa->id : null,
				'id_membresia'		=> ($data_request["id_membresia"] != '') ? $data_request["id_membresia"] : null,
				'imagen'			=> $imagen,
				'tipo'          	=> ($data_request["id_membresia"] != '') ? 'SUPER ADMINISTRADOR' : 'SUPER USUARIO',
				'fl_cambio_local'	=> 1
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', $data_request["usuario"] . $random_salt);

				$data["password"] = $password;
				$data["salt"] = $random_salt;
			}

			$this->Usuario_m->save($data);

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_password()
	{
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data_request = $this->request->getPost();

			/** GUARDAR */

			$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
			$password = hash('sha512', $data_request["password"] . $random_salt);

			$data = [
				'password'		=> $password,
				'salt'    		=> $random_salt,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		try {

			$data_request = $this->request->getPost();

			$db = \Config\Database::connect();
			$db->transStart();

			$usuario = $this->Usuario_m->find($data_request["id"]);

			$this->Usuario_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($usuario->imagen);
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
