<?php namespace App\Controllers\General;

use App\Controllers\BaseController;

use App\Models\General\Persona_model;
use App\Models\General\Persona_direcciones_model;
use App\Models\General\Persona_paymentmethods_model;
use App\Models\Orden\Orders_model;
use App\Models\Orden\Order_items_model;
use App\Models\Orden\Order_history_model;
use App\Models\Orden\Order_status_model;
use App\Models\Orden\Order_payments_model;
use App\Models\Orden\Cart_model;
use App\Models\Orden\Wish_list_model;
use App\Models\Inventario\Producto_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Image_model;

class Micuenta extends BaseController
{
	public function __construct()
	{
		$this->Persona_m = new Persona_model();
		$this->Persona_dir_m = new Persona_direcciones_model();
		$this->Persona_pay_m = new Persona_paymentmethods_model();
		$this->Orden_m = new Orders_model();
		$this->Orden_items_m = new Order_items_model();
		$this->Orden_history_m = new Order_history_model();
		$this->Orden_status_m = new Order_status_model();
		$this->Orden_payments_m = new Order_payments_model();
		$this->Cart_m = new Cart_model();
		$this->Wish_m = new Wish_list_model();
		$this->Producto_m = new Producto_model();
		$this->Usuario_m = new Usuario_model();
	}

	public function get_mis_datos()
	{		
		$response = $this->Persona_m->select('persona.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->select('us.imagen')
		->join('static_ubigeo u', 'u.id = persona.id_ubigeo', 'left')
		->join('usuario us', 'persona.id = us.id_cliente')
		->where('us.id', ID_USUARIO)		
		->first();

		$response->direcciones = $this->Persona_dir_m->select('persona_direcciones.*')
		->where('id_persona', $response->id)
		->where('fl_estado', 1)
		->orderBy('id', 'desc')
		->findAll();

		$response->paymentmethods = $this->Persona_pay_m->select('persona_paymentmethods.*')
		->where('id_persona', $response->id)
		->where('fl_estado', 1)
		->orderBy('id', 'desc')
		->findAll();

        return $this->respond($response, 200);
	}

	public function get_mis_ordenes()
	{		
		$response = $this->Orden_m->select('ord_orders.*')
		->select('DATE_FORMAT(ord_orders.fecha_registro, "%d/%m/%Y %h:%i") as fecha_registro_f')
		->select('est.cConDescripcion as cEstado_e, est.color as cColor_e, est.color_2 as cColor_e_2, est.icono as cIcono_e')
		->join('ord_status os', 'ord_orders.id_order_status = os.id')
		->join('constante est', 'os.id_estado = est.nConValor AND est.nConCodigo = 100')
		->where('ord_orders.id_usuario', ID_USUARIO)		
		->where('ord_orders.fl_estado', 1)
		->findAll();

		foreach ($response as $item) {
				
			$ordenes_items  = $this->Orden_items_m->select('ord_items.*')
			->select('p.nombre as producto')
			->select('p.imagenes')
			->join('inv_productos p', 'ord_items.id_producto = p.id')
			->where('ord_items.id_order', $item->id)		
			->findAll();

			$ordenes_history  = $this->Orden_history_m->select('ord_history.*')
			->select('hi.cConDescripcion as historial')
			->select('hi.cConDetalle as detalle')
			->select('DATE_FORMAT(ord_history.fecha_registro, "%d/%m/%Y %h:%i") as fecha_registro_f')
			->join('constante hi', 'ord_history.id_history = hi.nConValor AND hi.nConCodigo = 103')
			->where('ord_history.id_order', $item->id)		
			->findAll();

			$ordenes_direccion = $this->Persona_dir_m->select('persona_direcciones.*')
			->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
			->select('us.nombre')
			->join('persona pe', 'persona_direcciones.id_persona = pe.id')
			->join('usuario us', 'pe.id = us.id_cliente')
			->join('static_ubigeo u', 'u.id = pe.id_ubigeo', 'left')
			->where('persona_direcciones.id', $item->id_persona_direccion)
			->first();

			$item->detalle = $ordenes_items;
			$item->history = $ordenes_history;
			$item->direccion = $ordenes_direccion;

			
		}

        return $this->respond($response, 200);
	}

	public function get_mi_lista_deseos()
	{		
		
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
		->join('wish_list w', 'w.id_producto = inv_productos.id')
		->where('w.id_usuario', ID_USUARIO)
		->findAll();

        return $this->respond($response, 200);
	}

	public function get_mis_direcciones()
	{		
		$response = $this->Persona_dir_m->select('persona_direcciones.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->select('td.cConDescripcion as tipo_domicilio')
		->join('static_ubigeo u', 'persona_direcciones.id_ubigeo = u.id', 'left')
		->join('constante td', 'persona_direcciones.id_tipo_domicilio = td.nConValor AND td.nConCodigo = 104')
		->join('usuario us', 'persona_direcciones.id_persona = us.id_cliente')
		->where('us.id', ID_USUARIO)
		->where('persona_direcciones.fl_estado', 1)
		->orderBy('persona_direcciones.id', 'desc')
		->findAll();

		return $this->respond($response, 200);
	}

	public function save_cambios_personales()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR IMAGEN */
			// $imagen = 'sin_perfil.jpg';

			// if($this->request->getFile('imagen')){
				$Imagen_upload = new Image_model();		
				$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'usuario', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
			//}
			
			$data_persona = [
				'razon_social'						=> trim($data_request["nombre"]).' '.trim($data_request["apellido"]),
				'nombres'							=> trim($data_request["nombre"]),
				'apellidos'							=> trim($data_request["apellido"]),
				'telefono'							=> trim($data_request["telefono"]) ,
				'email'								=> trim($data_request["email"]) ,
				'id'								=> $data_request["id_persona"],
			];
			$this->Persona_m->save($data_persona);

			$data = [
				'nombre'				=> trim($data_request["nombre"]),
				'apellido'    			=> trim($data_request["apellido"]),
				'email'					=> trim($data_request["email"]),
				'usuario'				=> trim($data_request["email"]),
				'imagen'				=> $imagen,
				'id'  					=> ID_USUARIO,
			];

			$this->Usuario_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => '¡Sus cambios se han guardado exitosamente!'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_cambiar_password()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$usuario = $this->Usuario_m
			->where('id', ID_USUARIO)
			->where('password_original', $data_request["password_actual"])
			->first();

			if(!is_object($usuario))
			{
				return $this->respond(['mensaje' => 'La contraseña actual ingresada no coincide', 'tipo' => 'warning'], 400);
			}

			$data = [
				'id'					=> ID_USUARIO,
				'password_original'		=> $data_request["password_actual"],
			];

			$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
			$password = hash('sha512', trim($data_request["password_nuevo"]) . $random_salt);
			$data["password"] = $password;
			$data["salt"] = $random_salt;

			$this->Usuario_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => '¡Tu contraseña se ha actualizado correctamente!'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	
		
}
