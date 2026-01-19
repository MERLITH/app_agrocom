<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use CodeIgniter\Controller;

use App\Models\Inventario\Producto_model;
use App\Models\Inventario\Tipo_producto_model;
use App\Models\General\Persona_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Empresa_model;

class Productos extends Controller
{

	use ResponseTrait;
	
	public function __construct()
	{
		$this->Helper = new Helper_model();
		$this->Producto_m = new Producto_model();
		$this->Tipo_Producto_m = new Tipo_producto_model();
		$this->Cliente_m = new Persona_model();
		$this->Usuario_m = new Usuario_model();
		$this->Empresa_m = new Empresa_model();
	}


	public function get_productos()
	{		
		$data_request = $this->request->getGet();

		$id_usuario = (isset($data_request["id_usuario"])) ? $data_request["id_usuario"] : 0;
		$id_producto = (isset($data_request["id_producto"])) ? $data_request["id_producto"] : 0;
		$id_categoria = (isset($data_request["id_categoria"])) ? $data_request["id_categoria"] : 0;
		$texto_buscar = (isset($data_request["texto_buscar"])) ? $data_request["texto_buscar"] : '';

		$response = $this->Producto_m->select('inv_productos.*')
		->select('coalesce(m.nombre, "") as marca')
		->select('coalesce(l.nombre, "") as linea')
		->select('coalesce(sl.nombre, "") as sublinea')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->select('coalesce(ta.nombre, "") as categoria')
		->select('coalesce(alm.nombre, "") as almacen')
		->select('coalesce(ce.nombre_comercial, "") as empresa')
		->select('w.id as id_wishlist')
		->join('inv_marca m', 'm.id = inv_productos.id_marca', 'left')
		->join('inv_linea l', 'l.id = inv_productos.id_linea', 'left')
		->join('inv_sublinea sl', 'sl.id = inv_productos.id_sublinea', 'left')
		->join('inv_unidad_medida um', 'um.id = inv_productos.id_unidad_medida', 'left')
		->join('inv_categorias ta', 'ta.id = inv_productos.id_categoria', 'left')
		->join('inv_almacen alm', 'alm.id = inv_productos.id_almacen', 'left')
		->join('catalogo_empresas ce', 'inv_productos.id_catalogo_empresa = ce.id', 'left')
		->join('wish_list w', 'w.id_producto = inv_productos.id AND w.id_usuario = '.$id_usuario, 'left')
		->where('inv_productos.fl_publico', 1)
		->where('inv_productos.fl_estado', 1)
		->where('inv_productos.id = '.$id_producto.' OR '.$id_producto.' = 0');
		//->where('inv_productos.id_categoria = '.$id_categoria.' OR '.$id_categoria.' = 0');

		if($id_categoria){
			$response->where('inv_productos.id_categoria', $id_categoria);
		}

		if($texto_buscar){
			$response->where("(inv_productos.nombre like '".$texto_buscar."' or inv_productos.descripcion like '%".$texto_buscar."%')");
		}

		$response = $response->findAll();

        return $this->respond($response, 200);
	}

	public function get_categoria($id_categoria)
	{		

		$response = $this->Tipo_Producto_m->find($id_categoria);

        return $this->respond($response, 200);
	}

}
