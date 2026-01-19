<?php namespace App\Controllers\Orden;

use App\Controllers\BaseController;

use MercadoPago\SDK;
use MercadoPago\Preference;
use MercadoPago\Item;

use App\Models\Orden\Cart_model;
use App\Models\Orden\Orders_model;
use App\Models\Orden\Order_items_model;
use App\Models\Orden\Order_payments_model;

class Checkout extends BaseController
{


	public function __construct()
	{
		$this->Cart_m = new Cart_model();
		$this->Orden_m = new Orders_model();
		$this->Orden_items_m = new Order_items_model();
		$this->Orden_payments_m = new Order_payments_model();
		
	}

	public function init()
	{		
		SDK::setAccessToken(env('MP_ACCESS_TOKEN'));

		$data_request = $this->request->getJSON(true);

		$cart = $this->Cart_m
        ->select('p.nombre as producto')
        ->select('p.precio')
		->select('cart.cantidad')
        ->select('FORMAT(p.precio * cart.cantidad, 2) AS total')
        ->join('inv_productos p', 'cart.id_producto = p.id')
        ->where('cart.id_usuario', ID_USUARIO)
        ->where('cart.fl_estado', 1)
        ->findAll();

		$preference = new Preference();
		$items = [];

		foreach ($cart as $row) {

			$item = new Item();
			$item->title = $row->producto;        // Nombre del producto
			$item->quantity = $row->cantidad; // Cantidad
			$item->unit_price = $row->precio; // Precio unitario
			$item->currency_id = "PEN";      // Moneda para Perú

			$items[] = $item;

		}

		$preference->items = $items;

		#/inicio

		$preference->back_urls = [
			"success" => (env('BASE_URL').'#/checkout/success'),
			"pending" => (env('BASE_URL').'server/public/orden/checkout/pending'),
			"failure" => (env('BASE_URL').'server/public/orden/checkout/failure'),

			// "success" => (env('BASE_URL').'server/public/orden/checkout/success'),
			// "pending" => (env('BASE_URL').'server/public/orden/checkout/pending'),
			// "failure" => (env('BASE_URL').'server/public/orden/checkout/failure'),
		];

		$preference->auto_return = "approved";
		//$preference->external_reference = uniqid("order_");

		$preference->save(); // GUARDAR EN MERCADO PAGO

		return $this->response->setJSON([
			"status" => "ok",
			"init_point" => $preference->init_point,
			"id" => $preference->id
		]);

        //return "Mercado Pago Inicializado Correctamente";
	}


	public function success()
	{
		
		$data_request = $this->request->getGet();

		$payment_id = $data_request["payment_id"];
		$status     = $data_request["status"];
		$preference_id = $data_request["preference_id"];
		$merchant_order_id = $data_request["merchant_order_id"];

		$orden = $this->Orden_m->select('id')
		->where('id_usuario', ID_USUARIO)
		->where('fl_estado', 1)
		->where('fl_estado_actual', 1)
		->where('fl_pagado', null)
		->first();

		if(is_object($orden)){

			// AQUÍ GUARDAS LA VENTA EN TU BD
			$data_pay = [
				'id_order'				=> $orden->id,
				'payment_id' 			=> $payment_id,
				'status' 				=> $status,
				'preference_id' 		=> $preference_id,
				'merchant_order_id' 	=> $merchant_order_id,
			];

			$this->Orden_payments_m->save($data_pay);


			$cart = $this->Cart_m
			->select('id')
			->where('id_order', $orden->id)
			->findAll();
			foreach ($cart as $row) {
				$data_cart = [
					'id'     		=> $row->id,
					'fl_estado'     => 2,
				];	  
				$this->Cart_m->save($data_cart);
			}

			$data = [
				'id'     		=> $orden->id,
				'fl_pagado'     => 1,
				'token_id'     	=> $payment_id,
			];	  
			$this->Orden_m->save($data);

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Su compra se realizó con éxito.' , 'codigo' => 1, 'id_order'	=> $orden->id], 200);


		}else{
			return $this->respond(['tipo' => 'success', 'mensaje' => 'Ya fue pagado', 'codigo' => 2], 200);
		}


	}



}
