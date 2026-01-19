<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Orden_compra_model;
use App\Models\Inventario\Orden_compra_detalle_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Image_model;

class Orden_compra extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Orden_compra_m = new Orden_compra_model();
		$this->Orden_compra_detalle_m = new Orden_compra_detalle_model();
	}

	public function imprimir($id)
	{
		$response = $this->Orden_compra_m->select('inv_orden_compra.*')
		->select('coalesce(p.razon_social, "") as proveedor')
		->select('coalesce(inv_orden_compra.tipo_cambio, "") as tipo_cambio')
		->select('m.simbolo as simbolo_moneda, m.nombre as moneda')
		->select('coalesce(cb.full_data, "") as cuenta_bancaria_proveedor')
		->select('coalesce(concat(u.nombre, " ",u.apellido), "") as nombre_usuario')

		->join('persona p', 'p.id = inv_orden_compra.id_proveedor', 'left')
		->join('static_moneda m', 'm.id = inv_orden_compra.id_moneda')
		->join('cuenta_bancaria_persona cb', 'cb.id = inv_orden_compra.id_cuenta_bancaria_proveedor', 'left')
		->join('usuario u', 'u.id = inv_orden_compra.id_usuario')

		->find($id);

		$response->detalle = $this->Orden_compra_detalle_m->select('inv_orden_compra_detalle.*')
		->select('a.name as articulo')
		->join('inv_productos a', 'a.id = inv_orden_compra_detalle.id_articulo')
		->where('inv_orden_compra_detalle.id_orden_compra', $id)->findAll();

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		$response->ajuste = $this->Ajuste_avanzado_m->where('id_empresa', ID_EMPRESA)->first();

		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response =	$this->Orden_compra_m->select("id, concat(serie, ' - ', numero) as text");

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

	public function get_select_pendiente()
	{
		$data_request = $this->request->getGet();

		$response =	$this->Orden_compra_m->select("id, concat(serie, ' - ', numero) as text")
		->where('fl_estado', 1)
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_correlativo($serie)
	{
		$secuencia = $this->Orden_compra_m->get_correlativo($serie);

		return $this->respond($secuencia, 200);
	}

	public function get_unique($id_orden_compra)
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Orden_compra_m->select('inv_orden_compra.*')
		->select('coalesce(p.razon_social, "") as proveedor')
		->select('m.simbolo as simbolo_moneda')
		->join('persona p', 'p.id = inv_orden_compra.id_proveedor', 'left')
		->join('static_moneda m', 'm.id = inv_orden_compra.id_moneda')
		->find($id_orden_compra);

		$response->detalle = $this->Orden_compra_detalle_m->select('inv_orden_compra_detalle.*')
		->select('a.name as articulo')
		->join('inv_productos a', 'a.id = inv_orden_compra_detalle.id_articulo')
		->where('inv_orden_compra_detalle.id_orden_compra', $id_orden_compra)->findAll();

		return $this->respond($response, 200);
	}


	public function index()
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Orden_compra_m->select('inv_orden_compra.*')
		->select('coalesce(p.razon_social, "") as proveedor')
		->select('m.simbolo as simbolo_moneda')
		->join('persona p', 'p.id = inv_orden_compra.id_proveedor', 'left')
		->join('static_moneda m', 'm.id = inv_orden_compra.id_moneda')
		->where('DATE_FORMAT(inv_orden_compra.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(inv_orden_compra.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('inv_orden_compra.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-orden_compra', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-orden_compra', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES inv_orden_compra write,  inv_orden_compra_detalle write, centinela write');			

			/** GUARDAR */
			$data = [
				'fecha'							=> trim($data_request["fecha"]),
				'prioridad'						=> trim($data_request["prioridad"]),
				'id_proveedor'					=> trim($data_request["id_proveedor"]),
				'total_importe'					=> trim($data_request["total_importe"]),
				'condicion_pago'				=> trim($data_request["condicion_pago"]),
				'dias_pagar'					=> (isset($data_request["dias_pagar"])) ? trim($data_request["dias_pagar"]) : null,
				'id_moneda'						=> trim($data_request["id_moneda"]),
				'lugar_entrega'					=> trim($data_request["lugar_entrega"]),
				'solicitante'					=> trim($data_request["solicitante"]),
				'motivo'						=> trim($data_request["motivo"]),
				'observacion'					=> trim($data_request["observacion"]),
				'tipo_cambio'					=> (isset($data_request["tipo_cambio"])) ? trim($data_request["tipo_cambio"]) : null,
				'numero_cotizacion'				=> trim($data_request["numero_cotizacion"]),
				'id_cuenta_bancaria_proveedor'	=> (isset($data_request["id_cuenta_bancaria_proveedor"])) ? trim($data_request["id_cuenta_bancaria_proveedor"]) : null,
				'contacto_proveedor'			=> trim($data_request["contacto_proveedor"]),
				'persona_autoriza'				=> trim($data_request["persona_autoriza"])			
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				/* GUARDAR ARCHIVO */
				$Imagen_upload = new Image_model();
				$imagen_firma = $Imagen_upload->guardar($this->request->getFile('firma_base64'), 'firma_orden_compra', null);
				$data["imagen_firma"] = $imagen_firma;
				
				$correlativo = $this->Orden_compra_m->get_correlativo(trim($data_request["serie"]));

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["fl_estado"] = 1;

				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
			}

			$this->Orden_compra_m->save($data);

			$id_orden_compra = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/** DETALLE */
			$this->Orden_compra_detalle_m->where('id_orden_compra', $id_orden_compra)->delete();

			$data_detalle = [];

			foreach (json_decode($data_request["detalle"]) as $row) {

				$data_detalle[] = [
					'id_orden_compra'	=> $id_orden_compra,
					'id_articulo'		=> $row->id_articulo,
					'cantidad'			=> $row->cantidad,
					'valor_unitario'	=> $row->valor_unitario,
					'precio_unitario'	=> $row->precio_unitario,
					'subtotal'			=> $row->subtotal,
					'porcentaje_igv'	=> $row->porcentaje_igv,
					'igv'				=> $row->igv,
					'importe'			=> $row->importe,
				];
				
			}

			if(count($data_detalle) > 0)
			{
				$this->Orden_compra_detalle_m->insertbatch($data_detalle);
			}


			/****************** SAVE CENTINELA *****************/
			$orden_compra = $this->Orden_compra_m->find($id_orden_compra);

			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'ORDEN DE COMPRAS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $orden_compra->serie.'-'.$orden_compra->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
						
			$db->query('UNLOCK TABLES');
        	$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_orden_compra'	=> $id_orden_compra], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function anular()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-orden_compra', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'		=> $data_request["id"],
				'fl_estado'	=> 0
			];

			$this->Orden_compra_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$orden_compra = $this->Orden_compra_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'ALMACEN',
				'menu'			=> 'ORDEN DE COMPRAS',
				'accion'		=> 'ANULADO',
				'descripcion'	=> $orden_compra->serie.'-'.$orden_compra->numero
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
