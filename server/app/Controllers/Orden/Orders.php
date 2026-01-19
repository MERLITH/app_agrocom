<?php namespace App\Controllers\Orden;

use App\Controllers\BaseController;

use App\Models\Orden\Orders_model;
use App\Models\Orden\Order_items_model;
use App\Models\Orden\Order_history_model;
use App\Models\Orden\Order_status_model;
use App\Models\Orden\Order_payments_model;
use App\Models\Orden\Cart_model;

class Orders extends BaseController
{
	public function __construct()
	{
		$this->Orden_m = new Orders_model();
		$this->Orden_items_m = new Order_items_model();
		$this->Orden_history_m = new Order_history_model();		
		$this->Orden_status_m = new Order_status_model();
		$this->Orden_payments_m = new Order_payments_model();
		$this->Cart_m = new Cart_model();
		
	}

	public function get_order_pendiente()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Orden_m->select('id')
		->where('id_usuario', ID_USUARIO)
		->where('fl_estado', 1)
		->where('fl_estado_actual', 1)
		->where('fl_pagado', null)
		->first();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES ord_orders write,  ord_payments write, ord_items write, ord_status write,ord_history write ,cart write, centinela write');			


			//echo $data_request["token_id"];
			/** GUARDAR */
			$data = [
				'id_persona'					=> trim($data_request["id_persona"]),		
				'id_persona_direccion'			=> trim($data_request["id_persona_direccion"]),				
				'id_medio_pago'					=> 1,		
				'monto_total'					=> trim($data_request["monto_total"]),
				'token_id'						=> null,		
				'fl_estado_actual'				=> 1,
				'fl_pagado'						=> null,		
				'id_usuario'					=> ID_USUARIO,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Orden_m->get_correlativo();

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["ser_num"] = $correlativo->serie.'-'.$correlativo->numero;
			}

			$this->Orden_m->save($data);

			$id_order = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/** DETALLE */
			$this->Orden_items_m->where('id_order', $id_order)->delete();

			$data_detalle = [];

			foreach (json_decode($data_request["detalle"]) as $row) {

				$data_detalle[] = [
					'id_order'			=> $id_order,
					'id_producto'		=> $row->id_producto,
					'cantidad'			=> $row->cantidad,
					'precio_unitario'	=> $row->precio,
					'id_carrito'		=> $row->id_carrito,
				];

				if($row->id_carrito){

					$data_cart = [
					  'id'     			=> $row->id_carrito,
					  //'fl_estado'     	=> 1,
					  'id_order'     	=> $id_order,
					];	  
					$this->Cart_m->save($data_cart);

				}
				
			}

			if(count($data_detalle) > 0)
			{
				$this->Orden_items_m->insertbatch($data_detalle);
			}

			if(!isset($data_request["id"]))
			{

				//Guardar Estado
				$data_his = [
					'id_order'			=> $id_order,
					'id_estado'     	=> 1,
				];	  
				$this->Orden_status_m->save($data_his);

				$id_order_status = $db->insertID();

				//Guardar Historia
				$data_his = [
					'id_order'			=> $id_order,
					'id_history'     	=> 1,
				];	  
				$this->Orden_history_m->save($data_his);

				$id_order_history = $db->insertID();

				//Actualizar último estado e historia de la orden
				$data_upd = [
					'id'					=> $id_order,
					'id_order_status'     	=> $id_order_status,
					'id_order_history'     	=> $id_order_history,
				];	  
				$this->Orden_m->save($data_upd);


			}

			/****************** SAVE CENTINELA *****************/
			$orden = $this->Orden_m->find($id_order);

			$data_centinela = [
				'modulo'		=> 'ORDEN',
				'menu'			=> 'REGISTRAR',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $orden->serie.'-'.$orden->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
						
			$db->query('UNLOCK TABLES');
        	$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'La orden se realizó con éxito.', 'id_order'	=> $id_order], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


}
