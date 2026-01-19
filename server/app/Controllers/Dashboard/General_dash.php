<?php namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;

use App\Models\Gest_Orden\Orden_model;
use App\Models\Gest_Orden\Orden_products_model;
use App\Models\Gest_Orden\Users_model;
use App\Models\Gest_Orden\Address_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Logistica\Producto_model;
use App\Models\Mantenedor\Persona_model;

class General_dash extends BaseController
{
	public function __construct()
	{

		$this->Orden_m = new Orden_model();
		$this->Orden_products_m = new Orden_products_model();
		$this->Users_m = new Users_model();
		$this->Address_m = new Address_model();
		$this->Articulo_m = new Producto_model();
		$this->Persona_m = new Persona_model();
	}

    public function get_cantidades()
	{		
		$db = \Config\Database::connect();

		$lib = $this->Articulo_m->select("SUM(cantidad) as total")->where('fl_estado <>', 0)->first();

        $response = [
			'cantidad_clientes'   	=> $this->Users_m->countAllResults(),
            'cantidad_productos'  	=> (int)($lib->total ?? 0),
			'cantidad_ordenes'  	=> $this->Orden_m->countAllResults(),
			'cantidad_proveedor'  	=> $this->Persona_m->where('tipo', 'PROVEEDOR')->countAllResults(),
        ];

		return $this->respond($response, 200);
	}

	public function dash_por_estado()
	{	
		
		$currentYear = date('Y');

		$ordenes = $this->Orden_m->where("YEAR(fecha_registro)", $currentYear)->findAll();

		$pendientes = 0;
		$pagados = 0;
    	$entregados = 0;

		foreach ($ordenes as $pre) {

			if ($pre->status == 'PENDIENTE') {
				$pendientes ++;
			} elseif ($pre->status == 'PAGADO') {
				$pagados ++;
			}
			elseif ($pre->status == 'DESPACHADO') {
				$entregados ++;
			}

		}

		$data = [$pendientes, $pagados, $entregados];

		$response = [
			'data' 			=> $data,
			'total' 		=> ($pendientes + $pagados + $entregados),
			'anio_actual' 	=> $currentYear
		];

		return $this->respond($response, 200);
	}

	public function obtenerOrdenesPorDia()
	{	
		
		$currentYear = date('Y');

		$startOfWeek = date('Y-m-d', strtotime('monday this week'));
		$endOfWeek = date('Y-m-d', strtotime('sunday this week'));


		$ordenes = $this->Orden_m
		->select("DAYOFWEEK(fecha_registro) as dia_semana, COUNT(*) as total")
		->where('fecha_registro >=', $startOfWeek)
    	->where('fecha_registro <=', $endOfWeek)
		->where("YEAR(fecha_registro)", $currentYear)
		->groupBy("DAYOFWEEK(fecha_registro)")
		->findAll();

		$datos = [0, 0, 0, 0, 0, 0, 0]; // [Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo]

		// Procesar los resultados
		foreach ($ordenes as $orden) {
			$diaSemana = (int) $orden->dia_semana; // 1 (domingo) a 7 (sábado)
			$total = (int) $orden->total;

			// Ajustar índice: convertir 1-7 a 0-6 (lunes a domingo)
			$indice = $diaSemana == 1 ? 6 : $diaSemana - 2;
			$datos[$indice] = $total;
		}	

		$response = [
			'data' 			=> $datos
		];

		return $this->respond($response, 200);
	}

	public function topEmpresas_ventaproducts()
	{	
		
		$datos = $this->Orden_m
		->select('c.nombre_comercial AS empresa')
		->select('SUM(od.quantity) AS total_productos', false)
		->select('SUM(od.quantity * p.price) AS total_venta', false)
		->join('order_has_products od', 'od.id_order = orders.id')
		->join('products p', 'od.id_product = p.id')
		->join('catalogo_empresas c', 'p.id_catalogo_empresa = c.id')
		->groupBy('c.id')
		->orderBy('total_productos', 'DESC')
		->limit(5)
		->findAll();

		$categorias = [];
		$series = [];

		foreach ($datos as $d) {
			$categorias[] = $d->empresa;
			$series[] = (int)$d->total_productos;
		}
	
		$response = [
			'data' 			=> $datos,
			'categorias' 	=> $categorias,
    		'series' 		=> $series
		];

		return $this->respond($response, 200);
	}

		
}
