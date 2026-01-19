<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Producto_model;
use App\Models\Image_model;

class Articulo extends BaseController
{
	public function __construct()
	{
		$this->Articulo_m = new Producto_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Articulo_m->select("id, nombre as text")
		->like('nombre', '%'.$data_request["buscar"])
		->where('id_empresa', ID_EMPRESA)
		->findAll(); 

		return $this->respond($response, 200);
	}

	public function get_unique($id_articulo)
	{
		$response = $this->Articulo_m->select('inv_productos.*')
		->select('coalesce(um.nombre, "-") as unidad_medida')
		->join('inv_unidad_medida um', 'um.id = inv_productos.id_unidad_medida', 'left')
		->find($id_articulo);

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Articulo_m->select('inv_productos.*')
		->select('coalesce(m.nombre, "") as marca')
		->select('coalesce(l.nombre, "") as linea')
		->select('coalesce(sl.nombre, "") as sublinea')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->select('coalesce(ta.nombre, "") as tipo_articulo')
		->select('coalesce(alm.nombre, "") as almacen')
		->select('coalesce(ce.nombre_comercial, "") as empresa')

		->join('inv_marca m', 'm.id = inv_productos.id_marca', 'left')
		->join('inv_linea l', 'l.id = inv_productos.id_linea', 'left')
		->join('inv_sublinea sl', 'sl.id = inv_productos.id_sublinea', 'left')
		->join('inv_unidad_medida um', 'um.id = inv_productos.id_unidad_medida', 'left')
		->join('inv_categorias ta', 'ta.id = inv_productos.id_categoria', 'left')
		->join('inv_almacen alm', 'alm.id = inv_productos.id_almacen', 'left')
		->join('catalogo_empresas ce', 'inv_productos.id_catalogo_empresa = ce.id', 'left')

		->where('inv_productos.id_empresa', ID_EMPRESA)
		->findAll();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('inventario-articulo', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('inventario-articulo', 'new');
		} 
 
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			if($data_request["codigo_barra"] != '')
			{
				$response = $this->Helper->validar_duplicado('Código de Barra duplicado', 'inv_productos', 'codigo_barra', $data_request["codigo_barra"], (isset($data_request["id"]) ? $data_request["id"] : null));
				if(is_array($response))
				{
					return $this->respond($response, 400);
				}
			}
			
			/** GUARDAR */
			$data = [
				'imagenes'          		=> trim($data_request["imagenes"]),
				'nombre'					=> trim($data_request["nombre"]),
				'fl_publico'				=> trim($data_request["fl_publico"]),
				'id_categoria'				=> ($data_request["id_categoria"] != '') ? trim($data_request["id_categoria"]) : null,
				'id_linea'					=> ($data_request["id_linea"] != '') ? trim($data_request["id_linea"]) : null,
				'id_sublinea'				=> ($data_request["id_sublinea"] != '') ? trim($data_request["id_sublinea"]) : null,
				'descripcion'				=> trim($data_request["descripcion"]),
				'id_unidad_medida'			=> trim($data_request["id_unidad_medida"]),
				'id_marca'					=> ($data_request["id_marca"] != '') ? trim($data_request["id_marca"]) : null,
				'id_catalogo_empresa'		=> ($data_request["id_catalogo_empresa"] != '') ? trim($data_request["id_catalogo_empresa"]) : null,
				'cantidad_minimo'			=> trim($data_request["cantidad_minimo"]),
				'observacion'				=> trim($data_request["observacion"]),
				'codigo_barra'				=> trim($data_request["codigo_barra"]),
				'costo'						=> trim($data_request["costo"]),
				'precio'						=> trim($data_request["precio"]),
				'id_almacen'				=> ($data_request["id_almacen"] != '') ? trim($data_request["id_almacen"]) : null,
				'fl_cantidad_qr_unico'		=> (isset($data_request["fl_cantidad_qr_unico"])) ? 1 : null,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
				$data["id_usuario"] = ID_USUARIO;
				$data["fl_estado"] = 1;
				$data["cantidad"] = 0;
				$data["costo"] = 0;
			}

			$this->Articulo_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'INVENTARIO',
				'menu'			=> 'ARTÍCULO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
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
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-articulo', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$articulo = $this->Articulo_m->find($data_request["id"]);

			$this->Articulo_m->where('id', $data_request["id"])
			->delete();

			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($articulo->imagen);
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'INVENTARIO',
				'menu'			=> 'ARTÍCULO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $articulo->nombre
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function edit_stock()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('inventario-articulo', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$articulo = $this->Articulo_m->find($data_request["id"]);

			$data = [
				'id'			=> $data_request["id"],
				'cantidad'		=> $data_request["cantidad"]
			];

			$this->Articulo_m->save($data);
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'INVENTARIO',
				'menu'			=> 'ARTÍCULO',
				'accion'		=> 'EDITAR',
				'descripcion'	=> 'SE CAMBIO EL STOCK DE '.$articulo->cantidad.' A '.$data_request["cantidad"].' DEL ARTÍCULO '.$articulo->nombre
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Se cambió el stock correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
