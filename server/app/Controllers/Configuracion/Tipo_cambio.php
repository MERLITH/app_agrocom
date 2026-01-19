<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Moneda_model;

class Tipo_cambio extends BaseController
{
	public function __construct()
	{
		$this->Tipo_cambio_m = new Moneda_model();
	}

	public function get_all()
	{		
		$response = $this->Tipo_cambio_m->findAll();

        return $this->respond($response, 200);
	}

	public function get($id_moneda)
	{		
		$response = $this->Tipo_cambio_m->find($id_moneda);

        return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Tipo_cambio_m->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-tipo_cambio', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			if($data_request["id_publico"] == '')
			{
				$data_request["id_publico"] = 2;
			}

			foreach (json_decode($data_request["detalle"]) as $row) {
				
				$data = [
					'id'			=> $row->id,
					'tipo_cambio'	=> ($row->tipo_cambio == '') ? 0 : $row->tipo_cambio,
					'fl_publico'	=> ($row->id == $data_request["id_publico"]) ? 1 : 0
				];

				$this->Tipo_cambio_m->save($data);
			}			

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'MONEDAS / TIPO CAMBIO',
				'accion'		=> 'EDITAR',
				'descripcion'	=> 'Modificar tipo de cambios de monedas'
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
