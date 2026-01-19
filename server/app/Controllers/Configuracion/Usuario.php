<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Personal_model;
use App\Models\Mantenedor\Persona_model;
use App\Models\Image_model;

class Usuario extends BaseController
{
	public function __construct()
	{
		$this->Usuario_m = new Usuario_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Usuario_m->select("id, concat(nombre,' ',apellido) as text");

		if(isset($data_request["tipo"]))
		{
			$response->where('tipo', $data_request["tipo"]);
		}

		if(isset($data_request["id_local"]))
		{
			if ($data_request["id_local"] != "") { $response->where('id_local', $data_request["id_local"]);}
			
		}

		$response = $response->where('id_empresa', ID_EMPRESA)
		->where('fl_suspendido', null)
		->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Usuario_m->select("usuario.*, concat(usuario.nombre,' ',usuario.apellido) as nombrecompleto")
		->select("coalesce(l.descripcion, '') as local")
		->select('rol.nombre as rol')
		->select('cliente.razon_social as cliente')
		->join('local l', 'l.id = usuario.id_local', 'left')
		->join('rol', 'rol.id = usuario.id_rol', 'left')
		->join('persona cliente', 'cliente.id = usuario.id_cliente', 'left')
		->where('usuario.id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('mantenedor-usuario', 'edit');
		}
		else{
			$this->Helper->validar_permisos('mantenedor-usuario', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();		

			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'usuario', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
			
			if(isset($data_request["id_personal"]))
			{
				$Personal_m = new Personal_model();	
				$personal = $Personal_m->find($data_request["id_personal"]);
				$data_request["nombre"] = $personal->nombre;
				$data_request["apellido"] = $personal->apellido;
				return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente' . $data_request["nombre"]], 200);
			}

			if(isset($data_request["id_cliente"]))
			{
				$Persona_m = new Persona_model();	
				$cliente = $Persona_m->find($data_request["id_cliente"]);
				$data_request["nombre"] = $cliente->razon_social;
				$data_request["apellido"] = '';
			}
			
					
			/** GUARDAR */
			$data = [
				'nombre'				=> trim($data_request["nombre"]),
				'apellido'    			=> trim($data_request["apellido"]),
				'email'					=> trim($data_request["email"]),
				'usuario'				=> trim($data_request["usuario"]),
				'imagen'				=> $imagen,
				'tipo'          		=> ($data_request["id_rol"]) ? 'USUARIO' : 'SUPER ADMINISTRADOR',
				'id_rol'          		=> ($data_request["id_rol"]) ? $data_request["id_rol"] : null,
				'id_personal'      		=> (isset($data_request["id_personal"])) ? $data_request["id_personal"] : null,
				'id_cliente'      		=> (isset($data_request["id_cliente"])) ? $data_request["id_cliente"] : null,
				//'id_local'      		=> ($data_request["id_local"] != '') ? $data_request["id_local"] : null,
				'tipo_persona'  		=> $data_request["tipo_persona"],
				//'fl_cambio_local'  		=> (isset($data_request["fl_cambio_local"])) ? 1 : null,	
				//'fl_supervisor'      	=> (isset($data_request["fl_supervisor"])) ? 1 : null,
				//'fl_soporte_cliente'  	=> (isset($data_request["fl_soporte_cliente"])) ? 1 : null,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', trim($data_request["clave"]) . $random_salt);

				$data["password"] = $password;
				$data["salt"] = $random_salt;
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Usuario_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["usuario"])
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

	public function save_password()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mantenedor-usuario', 'edit');
		
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */

			$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
			$password = hash('sha512', $data_request["password"] . $random_salt);

			$data = [
				'password'		=> $password,
				'salt'    		=> $random_salt,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> 'CAMBIO PASSWORD',
				'descripcion'	=> 	$usuario->usuario
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

	public function save_my_password()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$Usuario_m = new Usuario_model();

			$usuario = $Usuario_m->find(ID_USUARIO);

			$password_form = hash('sha512', $data_request["password_actual"] . $usuario->salt);

			if($usuario->password == $password_form)
			{
				/** GUARDAR */
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', $data_request["password_nuevo"] . $random_salt);

				$data = [
					'password'		=> $password,
					'salt'    		=> $random_salt,
					'id'			=> $usuario->id
				];

				$this->Usuario_m->save($data);

				$db->transComplete();

				return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);
			}
			else
			{
				return $this->respond(['mensaje' => 'La contraseña es incorrecta'], 402);
			}

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mantenedor-usuario', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$usuario = $this->Usuario_m->find($data_request["id"]);

			$this->Usuario_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($usuario->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 	$usuario->usuario
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_suspendido()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mantenedor-usuario', 'edit');
		
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fl_suspendido'	=> 1,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> 'SUSPENDIDO',
				'descripcion'	=> 	$usuario->usuario
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

	public function save_activar()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mantenedor-usuario', 'edit');
		
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fl_suspendido'	=> null,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> 'SUSPENDIDO',
				'descripcion'	=> 	$usuario->usuario
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

	public function save_local()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id_local'		=> $data_request["id_local"],
				'id'			=> ID_USUARIO
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find(ID_USUARIO);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'SISTEMA',
				'menu'			=> 'USUARIO',
				'accion'		=> 'CAMBIO LOCAL',
				'descripcion'	=> 	$usuario->usuario
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
