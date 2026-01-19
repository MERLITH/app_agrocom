<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Compra_model;
use App\Models\Inventario\Compra_detalle_model;
use App\Models\Inventario\Kardex_model;
use App\Models\Inventario\Producto_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Mantenedor\Persona_model;
use App\Models\Inventario\Orden_compra_model;

class Compra extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Compra_m = new Compra_model();
		$this->Compra_detalle_m = new Compra_detalle_model();
		$this->Kardex_m = new Kardex_model();
		$this->Articulo_m = new Producto_model();
		$this->Proveedor_m = new Persona_model();
		$this->Orden_compra_m = new Orden_compra_model();
	}

	public function imprimir($id)
	{
		$response = $this->Compra_m->select('inv_compra.*')
		->select('coalesce(inv_compra.tipo_cambio, "") as tipo_cambio')
		->select('c.nombre as comprobante')
		->select('m.simbolo as simbolo_moneda, m.nombre as moneda')
		->select('coalesce(concat(oc.serie,"-",oc.numero),"") as orden_compra')
		->join('static_moneda m', 'm.id = inv_compra.id_moneda')
		->join('static_comprobante c', 'c.id = inv_compra.id_comprobante', 'left')
		->join('inv_orden_compra oc', 'oc.id = inv_compra.id_orden_compra', 'left')
		->find($id);

		$response->detalle = $this->Compra_detalle_m->select('inv_compra_detalle.*')
		->select('a.name as articulo, a.codigo_barra, a.fl_cantidad_qr_unico')
		->join('log_productosuctos a', 'a.id = inv_compra_detalle.id_articulo')
		->where('inv_compra_detalle.id_compra', $id)->findAll();

		$response->proveedor = $this->Proveedor_m->find($response->id_proveedor);

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		$response->ajuste = $this->Ajuste_avanzado_m->where('id_empresa', ID_EMPRESA)->first();

		return $this->respond($response, 200);
	}


	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response =	$this->Compra_m->select("id, concat(serie, ' - ', numero) as text");

		$serie_numero = explode('-', $data_request["buscar"]);
		$fecha = explode('/', $data_request["buscar"]);

		if(count($serie_numero) == 2)
		{
			/** SERIE NUMERO */
			$response->where('serie', $serie_numero[0]);
			$response->like('numero', '%'.$serie_numero[1]);
		}

		if(count($fecha) == 3)
		{
			/** FECHA */
			if($fecha[2] == '')
			{          
				$fecha[2] = date("Y");          
			}
			
			$response->where('DATE_FORMAT(fecha, "%Y-%m-%d")', $fecha[2].'-'.$fecha[1].'-'.$fecha[0]);
			
		}
		
		$response = $response->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_correlativo($serie)
	{
		$secuencia = $this->Compra_m->get_correlativo($serie);

		return $this->respond($secuencia, 200);
	}

	public function get_unique($id_compra)
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Compra_m->select('inv_compra.*')
		->select('coalesce(p.razon_social, "") as proveedor')
		->select('m.simbolo as simbolo_moneda')
		->join('persona p', 'p.id = inv_compra.id_proveedor', 'left')
		->join('static_moneda m', 'm.id = inv_compra.id_moneda')
		->find($id_compra);

		$response->detalle = $this->Compra_detalle_m->select('inv_compra_detalle.*')
		->select('a.name as articulo')
		->join('inv_productos a', 'a.id = inv_compra_detalle.id_articulo')
		->where('inv_compra_detalle.id_compra', $id_compra)->findAll();

		return $this->respond($response, 200);
	}


	public function index()
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Compra_m->select('inv_compra.*')
		->select('coalesce(p.razon_social, "") as proveedor')
		->select('m.simbolo as simbolo_moneda')
		->select('coalesce(concat(oc.serie,"-",oc.numero), "") as orden_compra')
		->join('persona p', 'p.id = inv_compra.id_proveedor', 'left')
		->join('static_moneda m', 'm.id = inv_compra.id_moneda')
		->join('inv_orden_compra oc', 'oc.id = inv_compra.id_orden_compra', 'left')
		->where('DATE_FORMAT(inv_compra.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(inv_compra.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('inv_compra.id_empresa', ID_EMPRESA)		
		->findAll();

		foreach ($response as $row) {
			
			/** CALCULAR DIAS RESNTANTE DE PAGO */

			$fecha_a_pagar = date("d-m-Y",strtotime($row->fecha."+ ".($row->dias_pagar + 1)." days")); 

			$now = time(); // or your date as well
			$your_date = strtotime($fecha_a_pagar);
			$datediff =  $your_date - $now;
	
			$row->dias_restantes = round($datediff / (60 * 60 * 24));

		}

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-compra', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-compra', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();

			/** GUARDAR */
			$data = [
				'fecha'				=> trim($data_request["fecha"]),
				'id_comprobante'	=> trim($data_request["id_comprobante"]),
				'serie'				=> trim($data_request["serie"]),
				'numero'			=> trim($data_request["numero"]),
				'id_proveedor'		=> trim($data_request["id_proveedor"]),
				'total_importe'		=> trim($data_request["total_importe"]),
				'total_igv'			=> trim($data_request["total_igv"]),
				'total_gravada'		=> trim($data_request["total_gravada"]),
				'condicion_pago'	=> trim($data_request["condicion_pago"]),
				'dias_pagar'		=> (isset($data_request["dias_pagar"])) ? trim($data_request["dias_pagar"]) : null,
				'id_moneda'			=> trim($data_request["id_moneda"]),
				'tipo_cambio'		=> (isset($data_request["tipo_cambio"])) ? trim($data_request["tipo_cambio"]) : null,
				'observacion'		=> trim($data_request["observacion"]),
				'origen_pago'		=> trim($data_request["origen_pago"]),
				'pagado_por'		=> trim($data_request["pagado_por"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["fl_estado"] = 1;
				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
				$data["id_orden_compra"] = (isset($data_request["id_orden_compra"])) ? $data_request["id_orden_compra"] : null;
			}

			$this->Compra_m->save($data);

			$id_compra = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/** DETALLE */
			$this->Helper->eliminar_registros_detalle('inv_compra_detalle', 'id_compra', $id_compra, json_decode($data_request["detalle"]));

			$data_detalle = []; 

			foreach (json_decode($data_request["detalle"]) as $row) {

				$data_detalle = [
					'id_compra'			=> $id_compra,
					'id_articulo'		=> $row->id_articulo,
					'cantidad'			=> $row->cantidad,
					'valor_unitario'	=> $row->valor_unitario,
					'precio_unitario'	=> $row->precio_unitario,
					'subtotal'			=> $row->subtotal,
					'porcentaje_igv'	=> $row->porcentaje_igv,
					'igv'				=> $row->igv,
					'importe'			=> $row->importe,
					'descripcion'		=> $row->descripcion
				];

				// SAVE COSTO DE PRODUCTO
				if(!isset($data_request["id"]))
				{
					/** ACTUALIZAR CANTIDAD & COSTO DE PRODUCTO */
					$articulo = $this->Articulo_m->select('cantidad, costo, nombre')->find($row->id_articulo);
          
					$update_articulo = [
					  'id'         			=> $row->id_articulo,
					  'cantidad'            => $articulo->cantidad + $row->cantidad,
					  'costo'               => ($articulo->costo == 0) ? $row->precio_unitario  : (($row->precio_unitario + $articulo->costo) / 2),
					];
		  
					$this->Articulo_m->save($update_articulo);
		  
					/*** SAVE KARDEX */
					$kardex = [
					  'fecha'             => trim($data_request["fecha"]),
					  'tipo'              => 'INGRESO',
					  'id_articulo'       => $row->id_articulo,
					  'concepto'          => $articulo->nombre,
					  'ingreso_cantidad'  => $row->cantidad,
					  'ingreso_costo'     => $row->precio_unitario
					];
		  
					$this->Kardex_m->save_movimiento($kardex);
				}

				if(is_numeric($row->id))
				{
					$data_detalle["id"] = $row->id;
				}

				$this->Compra_detalle_m->save($data_detalle);
			}

			

			if(!isset($data_request["id"]) && isset($data_request["id_orden_compra"]))
			{
				// ESTADO ORDEN DE COMPRA A CONSUMIDO
				$orden_compra_update = [
					'id'		=> $data_request["id_orden_compra"],
					'fl_estado'	=> 2
				];

				$this->Orden_compra_m->save($orden_compra_update);
			}


			/****************** SAVE CENTINELA *****************/
			$compra = $this->Compra_m->find($id_compra);

			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'COMPRAS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $compra->serie.'-'.$compra->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
						
        	$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_compra'	=> $id_compra], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function anular()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-compra', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$compra = $this->Compra_m->find($data_request["id"]);

			// UPDATE ORDEN COMPRA
			$orden_compra_update = [
				'id'		=> $compra->id_orden_compra,
				'fl_estado'	=> 1
			];

			$this->Orden_compra_m->save($orden_compra_update);

			// UPDATE COMPRA
			$data = [
				'id'				=> $data_request["id"],
				'fl_estado'			=> 0,
				'id_orden_compra'	=> null
			];

			$this->Compra_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'COMPRAS',
				'accion'		=> 'ANULADO',
				'descripcion'	=> $compra->serie.'-'.$compra->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	
}
