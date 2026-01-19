<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Permiso_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Moneda_model;
use CodeIgniter\Controller;

class App extends Controller
{
	use ResponseTrait;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
	}

	public function initial($response = true)
	{
		
		$Usuario_m = new Usuario_model;
		$Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$Empresa_m = new Empresa_model;
		$Moneda_m = new Moneda_model;

		$received_Token = $this->request->getServer('HTTP_TOKEN');
		$received_Tipo = $this->request->getServer('HTTP_TIPO');

		$id_usuario = $this->GET_id_usuario($received_Token, $received_Tipo);

		$usuario = $Usuario_m->select('usuario.id, usuario.imagen, id_rol, usuario.id_local, usuario.tipo, usuario.nombre, usuario.apellido, usuario.email, usuario.id_empresa, usuario.id_personal, usuario.tipo_persona, usuario.usuario')//usuario.fl_cambio_local,fl_supervisor, fl_soporte_cliente
		->select('p.telefono')
		->select('p.id as id_persona')
		->select('r.fl_no_dashboard')
		->select('coalesce(l.nombre, "") as local, l.formato_impresion')//l.tipo_afectacion_igv
		->join('rol r', 'r.id = usuario.id_rol', 'left')
		->join('local l', 'l.id = usuario.id_local', 'left')
		->join('persona p', 'usuario.id_cliente = p.id', 'left')
		->find($id_usuario);

		$ajustes = $Ajuste_avanzado_m->first();

		$empresa = $Empresa_m->select('logo,  numero_documento, razon_social, tipo_proveedor_electronico')->first();
		$moneda = $Moneda_m->select('codigo, tipo_cambio, id')->where('fl_publico', 1)->first();
		$moneda_sistema = $Moneda_m->select('nombre, codigo, tipo_cambio, simbolo, id')->where('id', 1)->first();

		if(is_object($ajustes))
		{
			$ajustes->moneda_sistema = $moneda_sistema;

			if(is_object($moneda))
			{
				$ajustes->tipo_cambio = $moneda->tipo_cambio;
				$ajustes->tipo_cambio_moneda = $moneda->codigo;
				$ajustes->id_moneda_tipo_cambio = $moneda->id;
			}
			else
			{
				$ajustes->tipo_cambio_texto = 'No especificado';
				$ajustes->tipo_cambio = 0;
				$ajustes->id_moneda_tipo_cambio = 0;
			}
		}		
		

		if(is_object($empresa))
		{
			
			/** CARGAR PERMISOS */
			$permisos = array(
				0 => (object) array(
				'modulo'    => '',
				'view'      => 1,
				'new'       => 1,
				'edit'      => 1,
				'delete'    => 1,
				)
			);

			$response = [
				'usuario' 			=> $usuario,
				'permisos'			=> $permisos,
				'all_permiso'		=> true,
				'ajuste'			=> $ajustes,
				'empresa'			=> $empresa
			];

			return $this->respond($response, 200);			
		}


		else
		{
			return $this->respond(['mensaje' => 'Sesión Finalizada'], 401);
		}
				
	}

	public function GET_id_usuario($received_Token, $received_Tipo) 
	{
		
		// $received_Token = $this->request->getServer('HTTP_TOKEN');
		// $received_Tipo = $this->request->getServer('HTTP_TIPO');

		$id_usuario = 0;

		if($received_Token == 'null' or $received_Token == '')
		{
			$id_usuario = 0;
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
					$id_usuario = $usuario->id;
				}
				else
				{
					$id_usuario = 0;
				}
			}
			else
			{
				$id_usuario = 0;
			}
			
		}
		
		return $id_usuario;
	}

}
