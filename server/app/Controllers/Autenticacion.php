<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\General\Persona_model;

use CodeIgniter\Controller;

class Autenticacion extends Controller
{
	use ResponseTrait;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
	}

	public function login($data_request = null)
	{		
		if($data_request == null)
		{
			$data_request = $this->request->getPost();
		}
		
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('usuario', $data_request["usuario"])
		->orwhere('usuario.email', $data_request["usuario"])
		->first();

		if(is_object($usuario))
		{
			if($usuario->fl_suspendido == 1)
			{
				return $this->respond(['mensaje' => 'Usuario Suspendido', 'tipo' => 'warning'], 400);
			}

			$password_form = hash('sha512', $data_request["password"] . $usuario->salt);

			if($usuario->password == $password_form)
			{
				$login_date = Date('Y-m-d h:i:s');
				$tokenData['uniqueId'] = $usuario->id;
				$tokenData['role'] = $usuario->tipo;
				$tokenData['timeStamp'] = $login_date;
				$jwtToken = $this->CreatorJwt->GenerateToken($tokenData);

				$Usuario_m->save([
					'id' 			=> $usuario->id, 
					'login_date' 	=> $login_date,
					'token'			=> $jwtToken
				]);

				$session = session();
				$session->set([
					'id_usuario' => $usuario->id,
					'nombre'     => $usuario->nombre,
					'logueado'   => true
				]);

				return $this->respond(['Token' => $jwtToken], 200);
			}
			else
			{
				return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
			}

		}
		else
		{
			return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
		}	
		
	}

	public function register()
	{		
	
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES persona write, usuario write');
			

			$Usuario_m = new Usuario_model();
			$Persona_m = new Persona_model();

			//Registrar persona
			$data_persona = [
				'id_documento' 						=> trim($data_request["id_documento"]),
				'numero_documento'					=> trim($data_request["numero_documento"]),
				'razon_social'						=> trim($data_request["nombres"]).' '.trim($data_request["apellidos"]),
				'nombres'							=> trim($data_request["nombres"]),
				'apellidos'							=> trim($data_request["apellidos"]),
				'telefono'							=> trim($data_request["telefono"]) ,
				'email'								=> trim($data_request["email"]) ,
				'tipo'								=> 'CLIENTE' ,
				'fl_cliente'						=> 1 ,
			];
			$Persona_m->save($data_persona);
			$id_persona = $db->insertID();
		
			//Registrar usuario
			$data = [
				'nombre'				=> trim($data_request["nombres"]),
				'apellido'    			=> trim($data_request["apellidos"]),
				'email'					=> trim($data_request["email"]),
				'usuario'				=> trim($data_request["email"]),
				'password_original'		=> trim($data_request["password"]),
				'imagen'				=> 'sin_perfil.jpg',
				'tipo'          		=> 'SUPER ADMINISTRADOR',	
				'id_cliente'      		=> $id_persona,	
				'tipo_persona'  		=> 'CLIENTE',
			];		
			$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
			$password = hash('sha512', trim($data_request["password"]) . $random_salt);
			$data["password"] = $password;
			$data["salt"] = $random_salt;
			$data["id_empresa"] = 1;
			$data["id_membresia"] = 1;	
			$Usuario_m->save($data);
			$id_usuario = $db->insertID();

			$db->query('UNLOCK TABLES');
        	$db->transComplete();



			$usuario = $Usuario_m->where('id', $id_usuario)
			->first();

			if(is_object($usuario))
			{
				if($usuario->fl_suspendido == 1)
				{
					return $this->respond(['mensaje' => 'Usuario Suspendido', 'tipo' => 'warning'], 400);
				}

				$password_form = hash('sha512', $data_request["password"] . $usuario->salt);

				if($usuario->password == $password_form)
				{
					$login_date = Date('Y-m-d h:i:s');
					$tokenData['uniqueId'] = $usuario->id;
					$tokenData['role'] = $usuario->tipo;
					$tokenData['timeStamp'] = $login_date;
					$jwtToken = $this->CreatorJwt->GenerateToken($tokenData);

					$Usuario_m->save([
						'id' 			=> $usuario->id, 
						'login_date' 	=> $login_date,
						'token'			=> $jwtToken
					]);

					$session = session();
					$session->set([
						'id_usuario' => $usuario->id,
						'nombre'     => $usuario->nombre,
						'logueado'   => true
					]);

					return $this->respond(['Token' => $jwtToken], 200);
				}
				else
				{
					return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
				}

			}
			else
			{
				return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
			}	

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
		
	}

	public function recuperar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->select('salt')
							->where('email', $data_request["email"])
							->first();

		if(is_object($usuario))
		{
			$db = \Config\Database::connect();
			$system = $db->table('static_system')->get()->getRow();

			$email = \Config\Services::email();

			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($system->email_robot, $system->empresa);
			$email->setTo($data_request["email"]);

			$htmlContent = '<p><a href="'.$_ENV['BASE_URL_FRONTEND'].'#/restablecer/'.$usuario->salt.'">Haz click aquí para restablecer tu contraseña</a></p>';
			$email->setSubject('Restablecer Contraseña');
			$email->setMessage($htmlContent);

			$email->send();
			$mensaje = 'Hemos enviado un mensaje a '.$data_request["email"].' para que puedas retablecer tu contraseña';
			return $this->respond(['mensaje' => $mensaje], 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Correo electrónico no existe'], 400);
		}
	}

	public function restablecer_verificar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('salt', $data_request["s"])->first();

		if(is_object($usuario))
		{
			return $this->respond($usuario, 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Error de validación'], 400);
		}
	}

	public function restablecer()
    {
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			$usuario = $Usuario_m->select('id, email')
								->where('salt', $data_request["salt"])
								->first();

			if(is_object($usuario))
			{
				$Usuario_m = new Usuario_model();

				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', $data_request["password"] . $random_salt);

				$data = array(
					'password'      => $password,
					'salt'        	=> $random_salt,
					'id'  			=> $usuario->id,
				);

				if($Usuario_m->save($data))
				{
					$data_request["usuario"] = $usuario->email;
					$data_request["clave"] = $data_request["password"];

					$db->transComplete();

					return $this->login($data_request);
				}
				else
				{
					return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->errores($Usuario_m->errors())], 400);
				}

			}
			else
			{
				return $this->respond(['mensaje' => 'Error'], 400);
			}

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}

	}
	
	public function logout()
	{

		$received_Token = $this->request->getServer('HTTP_TOKEN');
		
		$jwtData = $this->CreatorJwt->DecodeToken($received_Token);

		$Usuario_m = new Usuario_model;
		$usuario = $Usuario_m->where('tipo', $jwtData["role"])
		->where('login_date', $jwtData["timeStamp"])
		->where('token', $received_Token)
		->where('id', $jwtData["uniqueId"])
		->first();


		$Usuario_m = new Usuario_model();
		
		$usuario = $Usuario_m->save(
			[
				'id'	=> $usuario->id,
				'token'	=> ''
			]
		);	

		session()->destroy();
		
		return $this->respond([], 200);
	}
	

	//--------------------------------------------------------------------

}
