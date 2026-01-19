<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Producto_model;
use App\Models\Inventario\Checklist_model;
use App\Models\Inventario\Checklist_detalle_model;

class Checklist extends BaseController
{
	public function __construct()
	{
		$this->Articulo_m = new Producto_model();
		$this->Checklist_m = new Checklist_model();
		$this->Checklist_detalle_m = new Checklist_detalle_model();
	}

	public function search_barcode()
	{
		$data_request = $this->request->getGet();

		$response = $this->Articulo_m->select("inv_productos.name as nombre, inv_productos.id as id_articulo, cantidad, um.nombre as unidad_medida")
		->join('inv_unidad_medida um', 'um.id = inv_productos.id_unidad_medida')
		->where('inv_productos.id_empresa', ID_EMPRESA);

		if(isset($data_request["codigo_barra"]))
		{
			$response->where('codigo_barra', $data_request["codigo_barra"]);
		}
		else
		{
			$response->where('inv_productos.id', $data_request["id"]);
		}

		$response = $response->first();

		if(is_object($response))
		{
			return $this->respond($response, 200);
		}
		else
		{
			return $this->respond(['tipo' => 'warning', 'mensaje' => 'Artículo no encontrado en base de datos'], 400);
		}		
	}

	public function get_imprimir()
	{
		$data_request = $this->request->getGet();

		$response = $this->Checklist_m->select('inv_checklist.*')
		->select('u.nombre as usuario')
		->join('usuario u', 'u.id = inv_checklist.id_usuario', 'left')
		->find($data_request["id_checklist"]);

		$response->detalle = $this->Checklist_detalle_m->select('inv_checklist_detalle.*')
		->select('inv_checklist_detalle.stock as cantidad')
		->select('a.name as nombre, a.id as id_articulo')
		->select('um.nombre as unidad_medida')
		->join('inv_productos a', 'a.id = inv_checklist_detalle.id_articulo', 'left')
		->join('inv_unidad_medida um', 'um.id = a.id_unidad_medida', 'left')
		->where('inv_checklist_detalle.id_checklist', $data_request["id_checklist"])
		->findAll();

        return $this->respond($response, 200);
	}

	public function get_detalle()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Checklist_detalle_m->select('inv_checklist_detalle.*')
		->select('inv_checklist_detalle.stock as cantidad')
		->select('a.name as nombre, a.id as id_articulo')
		->select('um.nombre as unidad_medida')
		->join('inv_productos a', 'a.id = inv_checklist_detalle.id_articulo', 'left')
		->join('inv_unidad_medida um', 'um.id = a.id_unidad_medida', 'left')
		->where('inv_checklist_detalle.id_checklist', $data_request["id_checklist"])
		->findAll();

        return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Checklist_m->select('inv_checklist.*')
		->select('u.nombre as usuario')
		->join('usuario u', 'u.id = inv_checklist.id_usuario', 'left')
		->where('inv_checklist.id_empresa', ID_EMPRESA)
		->where('DATE_FORMAT(fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
		->where('DATE_FORMAT(fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-checklist', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-checklist', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */	
			if(isset($data_request["id"]))
			{
				$data = [
					'observacion'         	=> trim($data_request["observacion"]),
				];

				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["fecha"] = date("Y-m-d H:i:s");
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
			}

			$this->Checklist_m->save($data);

			$id_checklist = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			$this->Helper->eliminar_registros_detalle('inv_checklist_detalle', 'id_checklist', $id_checklist, json_decode($data_request["detalle"]));

			foreach (json_decode($data_request["detalle"]) as $row) {

				$data_detalle = [
					'id_checklist'	=> $id_checklist,
					'id_articulo'	=> $row->id_articulo,
					'stock'			=> $row->stock,
					'stock_fisico'	=> $row->stock_fisico,
				];

				if(is_numeric($row->id))
				{
					$data_detalle["id"] = $row->id;
				}

				$this->Checklist_detalle_m->save($data_detalle);
			}


			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'CHECKLIST',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> date("Y-m-d H:i:s")
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_checklist' => $id_checklist], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-checklist', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$checklist = $this->Checklist_m->find($data_request["id"]);

			$this->Checklist_detalle_m->where('id_checklist', $data_request["id"])
			->delete();

			$this->Checklist_m->where('id', $data_request["id"])
			->delete();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'ALMACÉN',
				'menu'			=> 'CHECKLIST',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $checklist->fecha
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
