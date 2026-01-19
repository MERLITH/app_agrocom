<?php namespace App\Controllers\Super_usuario;

use App\Controllers\BaseController;

use App\Models\Superusuario\Static_system_model;
use App\Models\Image_model;

class Static_system extends BaseController
{
	public function __construct()
	{
		$this->Static_system_m = new Static_system_model();
	}

	public function index()
	{		
		$response = $this->Static_system_m->first();

        return $this->respond($response, 200);
	}

	public function save()
	{
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data_request = $this->request->getPost();

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'system', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null, null);
			$logo_login = $Imagen_upload->guardar($this->request->getFile('logo_login'), 'system', (isset($data_request["logo_login_anterior"])) ? $data_request["logo_login_anterior"] : null, null);
					
			/** GUARDAR */
			$data = [
				'email_robot'			=> trim($data_request["email_robot"]),
				'empresa'    			=> trim($data_request["empresa"]),
				'fl_bg_login'  			=> (isset($data_request["fl_bg_login"])) ?  1 : 0,
				'bg_login'				=> $imagen,
				'fl_logo_login'  		=> (isset($data_request["fl_logo_login"])) ?  1 : 0,
				'logo_login'			=> $logo_login,
				'color_button_login'    => trim($data_request["color_button_login"]),
				'id'					=> 1
			];

			$this->Static_system_m->save($data);

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

}
