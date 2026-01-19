<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Salida_Producto_model;
use App\Models\Inventario\Salida_articulo_detalle_model;
use App\Models\Inventario\Kardex_model;
use App\Models\Inventario\Producto_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Ajuste_avanzado_model;

class Salida_articulo extends BaseController
{
	public function __construct()
	{
		$this->Salida_articulo_m = new Salida_Producto_model();
		$this->Salida_articulo_detalle_m = new Salida_articulo_detalle_model();
		$this->Kardex_m = new Kardex_model();
		$this->Articulo_m = new Producto_model();
		$this->Empresa_m = new Empresa_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
	}

	public function imprimir($id)
	{
		$response = $this->Salida_articulo_m->select('inv_salida_producto.*')
		->select('coalesce(p.nombre_completo, "") as personal')
		->select('coalesce(pr.razon_social, "") as proveedor')
		->join('personal p', 'p.id = inv_salida_producto.id_personal', 'left')
		->join('persona pr', 'pr.id = inv_salida_producto.id_proveedor', 'left')
		->find($id);

		$response->detalle = $this->Salida_articulo_detalle_m->select('inv_salida_producto_detalle.*')
		->select('a.name as articulo')
		->join('inv_productos a', 'a.id = inv_salida_producto_detalle.id_articulo')
		->where('inv_salida_producto_detalle.id_salida_articulo', $id)->findAll();

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		$response->ajuste = $this->Ajuste_avanzado_m->where('id_empresa', ID_EMPRESA)->first();

		return $this->respond($response, 200);
	}


	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response =	$this->Salida_articulo_m->select("id, concat(serie, ' - ', numero) as text");

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
		$secuencia = $this->Salida_articulo_m->get_correlativo($serie);

		return $this->respond($secuencia, 200);
	}

	public function get_unique($id_salida_articulo)
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Salida_articulo_m->select('inv_salida_producto.*')
		->find($id_salida_articulo);

		$response->detalle = $this->Salida_articulo_detalle_m->select('inv_salida_producto_detalle.*')
		->select('a.name as articulo, a.cantidad as stock')
		->join('inv_productos a', 'a.id = inv_salida_producto_detalle.id_articulo')
		->where('inv_salida_producto_detalle.id_salida_articulo', $id_salida_articulo)->findAll();

		return $this->respond($response, 200);
	}


	public function index()
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Salida_articulo_m->select('inv_salida_producto.*')
		->select('coalesce(p.nombre_completo, "") as personal')
		->select('coalesce(pr.razon_social, "") as proveedor')

		->join('personal p', 'p.id = inv_salida_producto.id_personal', 'left')
		->join('persona pr', 'pr.id = inv_salida_producto.id_proveedor', 'left')

		->where('DATE_FORMAT(inv_salida_producto.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(inv_salida_producto.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('inv_salida_producto.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-salida_articulo', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-salida_articulo', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES inv_productos write, inv_kardex write, inv_salida_producto write,  inv_salida_producto_detalle write, centinela write');

			/** GUARDAR */
			$data = [
				'fecha'				=> trim($data_request["fecha"]),
				//'id_proveedor'		=> (isset($data_request["id_proveedor"])) ? trim($data_request["id_proveedor"]) : null,
				'id_personal'		=> (isset($data_request["id_personal"])) ? trim($data_request["id_personal"]) : null,
				'tipo_destino'		=> trim($data_request["tipo_destino"]),
				'motivo'			=> trim($data_request["motivo"]),
				'total_importe'		=> trim($data_request["total_importe"]),
				'observacion'		=> trim($data_request["observacion"])
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Salida_articulo_m->get_correlativo(trim($data_request["serie"]));

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["fl_estado"] = 1;

				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
			}

			$this->Salida_articulo_m->save($data);

			$id_salida_articulo = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();


			/*** DEVOLVER INGRESO A ALMACÉN - SOLO AL EDITAR*/
			if (isset($data_request["id"])) {
			
				$detalle = $this->Salida_articulo_detalle_m->where('id_salida_articulo', $id_salida_articulo)->findAll();

				foreach ($detalle as $row) {
					$articulo = $this->Articulo_m->select('cantidad, nombre')->find($row->id_articulo);
			
					$update_articulo = array(
					'id'         			=> $row->id_articulo,
					'cantidad'              => $articulo->cantidad + $row->cantidad,
					);
		
					$this->Articulo_m->save($update_articulo);
				}
				
			}

			$this->Kardex_m->where('id_salida_articulo', $id_salida_articulo)->delete();

			/** DETALLE */

			$this->Salida_articulo_detalle_m->where('id_salida_articulo', $id_salida_articulo)->delete();
			$data_detalle = []; 

			foreach (json_decode($data_request["detalle"]) as $row) {


				/*** VALIDAR CANTIDAD EN STOCK */
				
				$arti = $this->Articulo_m->select('cantidad, nombre')->find($row->id_articulo);
				if (isset($data_request["id"])) {

					if (intval($row->cantidad) > (intval($arti->cantidad) - intval($row->stock))) {

						return $this->respond(['tipo' => 'warning', 'mensaje' => 'La cantidad supera el stock del artículo '.$arti->nombre.', solo hay '.(intval($arti->cantidad) - intval($row->cantidad_anterior)).' en almacen'], 400);
					
					}

				}else{

					if (intval($row->cantidad) > intval($arti->cantidad)) {

						return $this->respond(['tipo' => 'warning', 'mensaje' => 'La cantidad supera el stock del artículo '.$arti->nombre.', solo hay '.$arti->cantidad.' en almacen'], 400);
					
					}


				}
				/*  */


				$data_detalle[] = [
					'id_salida_articulo'	=> $id_salida_articulo,
					'id_articulo'			=> $row->id_articulo,
					'cantidad'				=> $row->cantidad,
					'costo_unitario'		=> $row->costo_unitario,
					'importe'				=> $row->importe,
				];

				/** ACTUALIZAR CANTIDAD & COSTO DE PRODUCTO */

				$articulo = $this->Articulo_m->select('cantidad, nombre')->find($row->id_articulo);
          
				$update_articulo = array(
				  'id'         			=> $row->id_articulo,
				  'cantidad'            => $articulo->cantidad - $row->cantidad,
				);
	  
				$this->Articulo_m->save($update_articulo);


				/*** SAVE KARDEX */
				$kardex = [
					'fecha'             		=> trim($data_request["fecha"]),
					'tipo'              		=> 'SALIDA',
					'id_articulo'       		=> $row->id_articulo,
					'concepto'          		=> $articulo->nombre,
					'salida_cantidad'   		=> $row->cantidad,
					'salida_costo'      		=> $row->costo_unitario,
					'id_salida_articulo'      	=> $id_salida_articulo
				];
	
				$this->Kardex_m->save_movimiento($kardex);
			}

			if(count($data_detalle) > 0)
			{
				$this->Salida_articulo_detalle_m->insertbatch($data_detalle);
			}

			/****************** SAVE CENTINELA *****************/
			$salida_articulo = $this->Salida_articulo_m->find($id_salida_articulo);

			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'SALIDA DE ARTÍCULO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $salida_articulo->serie.'-'.$salida_articulo->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
						
			$db->query('UNLOCK TABLES');
        	$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_salida_articulo'	=> $id_salida_articulo], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function anular()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-salida_articulo', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'		=> $data_request["id"],
				'fl_estado'	=> 0
			];

			$this->Salida_articulo_m->save($data);

			/*** DEVOLVER INGRESO A ALMACÉN */

			$detalle = $this->Salida_articulo_detalle_m->where('id_salida_articulo', $data_request["id"])->findAll();

			foreach ($detalle as $row) {
				$articulo = $this->Articulo_m->select('cantidad, nombre')->find($row->id_articulo);
          
				$update_articulo = array(
				  'id'         			=> $row->id_articulo,
				  'cantidad'            => $articulo->cantidad + $row->cantidad,
				);
	  
				$this->Articulo_m->save($update_articulo);
			}

			/****************** SAVE CENTINELA *****************/
			$salida_articulo = $this->Salida_articulo_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'SALIDA DE ARTÍCULO',
				'accion'		=> 'ANULADO',
				'descripcion'	=> $salida_articulo->serie.'-'.$salida_articulo->numero
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
