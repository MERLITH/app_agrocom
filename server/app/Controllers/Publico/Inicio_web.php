<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use CodeIgniter\Controller;

use App\Models\Inventario\Producto_model;
use App\Models\General\Persona_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Empresa_model;

class Inicio_web extends Controller
{

	use ResponseTrait;
	
	public function __construct()
	{
		$this->Helper = new Helper_model();
		$this->Producto_m = new Producto_model();
		$this->Cliente_m = new Persona_model();
		$this->Usuario_m = new Usuario_model();
		$this->Empresa_m = new Empresa_model();

		$this->db = \Config\Database::connect();
	}


	public function get_top_mas_vendido()
	{		
		$response = $this->db->table('ord_items i')
		->select('p.id, p.nombre, p.precio, p.imagenes, SUM(i.cantidad) AS total_vendido')
		->join('inv_productos p', 'p.id = i.id_producto', 'left')
		->join('ord_orders o', 'o.id = i.id_order', 'left')
		->where('o.fl_estado', 1)
		->groupBy('p.id')
		->orderBy('total_vendido', 'DESC')
		->limit(1)
		->get()
		->getRowArray();

        return $this->respond($response, 200);
	}

	public function get_top_los_mas_vendidos()
	{		
		$response = $this->db->table('ord_items i')
		->select('p.id, p.nombre, p.precio, p.imagenes, SUM(i.cantidad) AS total_vendido')
		->select('coalesce(ta.nombre, "") as tipo_articulo')
		->join('inv_productos p', 'p.id = i.id_producto', 'left')
		->join('ord_orders o', 'o.id = i.id_order', 'left')
		->join('inv_categorias ta', 'ta.id = p.id_categoria', 'left')
		->where('o.fl_estado', 1)
		->groupBy('p.id')
		->orderBy('total_vendido', 'DESC')
		->limit(4)
		->get()
		->getResultArray();

        return $this->respond($response, 200);
	}


	public function get_top_tendencias()
	{		
		$response = $this->db->table('inv_productos p')
		->select('p.id, p.nombre, p.precio, p.imagenes, p.fecha_sistema')
		->join('inv_categorias ta', 'ta.id = p.id_categoria', 'left')
		->where('p.fl_estado', 1)
		->where('p.fl_publico', 1)
		->orderBy('p.fecha_sistema', 'DESC')
		->limit(3)
		->get()
		->getResultArray();

        return $this->respond($response, 200);
	}

	public function get_top_destacados()
	{		
		$response = $this->db->table('wish_list w')
		->select('p.id, p.nombre, p.precio, p.imagenes, COUNT(w.id) AS total_deseos')
		->join('inv_productos p', 'p.id = w.id_producto', 'left')
		->groupBy('p.id')
		->orderBy('total_deseos', 'DESC')
		->limit(3) // top 10 más deseados
		->get()
		->getResultArray();

        return $this->respond($response, 200);
	}


	/*
	public function get_top_mas_vendido()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Producto_m->select('inv_productos.*')
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
		->findAll();

        return $this->respond($response, 200);
	}
	*/



}
