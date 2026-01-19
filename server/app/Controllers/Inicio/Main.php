<?php namespace App\Controllers\Inicio;

use App\Controllers\BaseController;

use App\Models\Orden\Cart_model;
use App\Models\Orden\Wish_list_model;

class Main extends BaseController
{
	public function __construct()
	{
		$this->Cart_m = new Cart_model();
		$this->Wish_m = new Wish_list_model();
		
	}	

	public function get_cantidades_id()
	{
		
		$cart = $this->Cart_m->select("SUM(cantidad) as total")->where('id_usuario', ID_USUARIO)->where('fl_estado', 1)->first();

		$response = [
			'cantidad_cart'   		=> (int)($cart->total ?? 0),
			'cantidad_wishlist'   	=> $this->Wish_m->where('id_usuario', ID_USUARIO)->countAllResults(),
        ];

		return $this->respond($response, 200);

	}

	public function save()
	{

		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id_usuario'					=> ID_USUARIO,
				'cantidad'						=> $data_request["cantidad"],
				'id_producto'					=> $data_request["id_producto"],
			];

			$cart_existente = $this->Cart_m
			->select('cantidad, id')
			->where('id_usuario', ID_USUARIO)
			->where('id_producto', $data_request["id_producto"])
			->first();

			if(is_object($cart_existente)){

				$data = [
					'id_usuario'	=> ID_USUARIO,
					'cantidad'		=> $cart_existente->cantidad + $data_request["cantidad"],
					'id_producto'	=> $data_request["id_producto"],
					'id'			=> $cart_existente->id
				];

			}

			$this->Cart_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{

		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$this->Cart_m
			->where('id_producto', $data_request["id_producto"])
			->where('id_usuario', ID_USUARIO)
			->delete();
	
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


}
