<?php
namespace App\Controllers;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 *
 * @package CodeIgniter
 */

use CodeIgniter\Controller;
use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Superusuario\Static_system_model;
use App\Models\Centinela_model;

//use MercadoPago\MercadoPagoConfig; 

class BaseController extends Controller
{

	use ResponseTrait;
	
	/**
	 * An array of helpers to be loaded automatically upon
	 * class instantiation. These helpers will be available
	 * to all other controllers that extend BaseController.
	 *
	 * @var array
	 */
	protected $helpers = [];

	/**
	 * Constructor.
	 */
	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		// Do Not Edit This Line
		parent::initController($request, $response, $logger);

		//MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));

		//--------------------------------------------------------------------
		// Preload any models, libraries, etc, here.
		//--------------------------------------------------------------------
		// E.g.:
		// $this->session = \Config\Services::session();

		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
		$this->Centinela_m = new Centinela_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Helper->definidores();

		/** VALIDAR USUARIO LOGUEADOS TOKEN */		
		
		
		$login = true;
		

		$received_Token = $this->request->getServer('HTTP_TOKEN');
		$received_Tipo = $this->request->getServer('HTTP_TIPO');

		if($received_Token == 'null' or $received_Token == '')
		{
			$login = false;
		}
		else
		{
			/** VERIFICAR TOKEN */
			$jwtData = $this->CreatorJwt->DecodeToken($received_Token);

			if(is_numeric($jwtData["uniqueId"]))
			{
				/** LOGUEO CORRECTO */
				$Usuario_m = new Usuario_model;
				$usuario = $Usuario_m->select('id, tipo, id_rol, id_empresa, id_membresia, usuario, id_local, id_personal, id_cliente')
				->where('tipo', $jwtData["role"])
				->where('login_date', $jwtData["timeStamp"])
				->where('token', $received_Token)
				->where('id', $jwtData["uniqueId"])
				->first();

				if(is_object($usuario))
				{
					define("ID_MEMBRESIA", $usuario->id_membresia);
					define("ID_EMPRESA", $usuario->id_empresa);
					define("ID_USUARIO", $usuario->id);
					define("ID_ROL", $usuario->id_rol);
					define("ID_PERSONAL", $usuario->id_personal);
					define("ID_CLIENTE", $usuario->id_cliente);
					define("ID_LOCAL", $usuario->id_local);
					define("TIPO_USUARIO", $usuario->tipo);
					define("USUARIO", $usuario->usuario);
				}
				else
				{
					$login = false;
				}
			}
			else
			{
				$login = false;
			}
			
		}


		if(!$login)
		{
			if($received_Tipo == 'initial')
			{
				$Usuario_m = new Usuario_model;
				$usuario = $Usuario_m->where('tipo', 'SUPER USUARIO')->first();

				if(!is_object($usuario))
				{
					$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
					$password = hash('sha512', 'clave.@dmin' . $random_salt);

					$data = [
						'nombre'			=> 'SUPER',
						'apellido'    		=> 'SUPER',
						'usuario'			=> '@dmin',
						'imagen'			=> 'sin_imagen.jpg',
						'tipo'          	=> 'SUPER USUARIO',
						'password'			=> $password,
						'salt'				=> $random_salt
					];
					
					$Usuario_m->save($data);
				}
			}

			$Static_system_m = new Static_system_model;
			$system = $Static_system_m->select('bg_login, fl_bg_login, fl_logo_login, logo_login, color_button_login')->first();

			/*** RESPUESTA DE AUTENTICACIÓN FALLIDA  */
			header('HTTP/1.1 401 Unauthorized', true, 401);
			header('Content-Type: application/json');
			echo json_encode(['tipo' => $received_Tipo, 'mensaje' => 'No Autorizado', 'general' => $system]);
			exit;
		}
		
		
	}

}
