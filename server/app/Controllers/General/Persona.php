<?php namespace App\Controllers\General;

use App\Controllers\BaseController;

use App\Models\General\Persona_model;
use App\Models\General\Persona_direcciones_model;
use App\Models\General\Persona_paymentmethods_model;

class Persona extends BaseController
{
	public function __construct()
	{
		$this->Persona_m = new Persona_model();
		$this->Persona_dir_m = new Persona_direcciones_model();
		$this->Persona_pay_m = new Persona_paymentmethods_model();
		$this->pager = \Config\Services::pager();
		// $this->Socio_contacto_m = new Socio_contacto_model();
		// $this->Socio_direccion_m = new Socio_direccion_model();
		// $this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
	}

	public function buscar()
	{
		$data_request = $this->request->getGet();

		$response = $this->Persona_m->select('persona.*')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = persona.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = persona.id_documento', 'left');

		if(isset($data_request["numero"]))
		{
			$response->where('persona.numero_documento', $data_request["numero"]);
		}

		if(isset($data_request["id_socio"]))
		{
			$response->where('persona.id', $data_request["id_socio"]);
		}
		
		$response = $response->where('id_empresa', ID_EMPRESA)
		->first();

		if(!is_object($response))
		{
			return $this->respond([], 200);
		}

		// $response->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_socio', $response->id)->findAll();	
		// $response->contactos = $this->Socio_contacto_m->where('id_socio', $response->id)->findAll();
		// $response->direcciones = $this->Socio_direccion_m->where('id_socio', $response->id)->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_contacto($id_socio)
	{
		$response = $this->Socio_contacto_m->select("id, nombre as text")
		->where('id_socio', $id_socio)
		->findAll();

		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Persona_m->select("id, razon_social as text")
		->where("(numero_documento like '".$data_request["buscar"]."' or razon_social like '%".$data_request["buscar"]."%')")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_buscar()
	{
		$data_request = $this->request->getGet();

		$response = $this->Persona_m->select("id, razon_social as text")
		->where("(numero_documento like '".$data_request["buscar"]."' or razon_social like '%".$data_request["buscar"]."%')")
		->where('id_empresa', ID_EMPRESA);

		if(isset($data_request["fl_cliente"]))
		{
			$response->where('fl_cliente', 1);
		}

		if(isset($data_request["fl_proveedor"]))
		{
			$response->where('fl_proveedor', 1);
		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_simple()
	{
		$data_request = $this->request->getGet();

		$response = $this->Persona_m->select("id, razon_social as text")
		->where('id_empresa', ID_EMPRESA);

		if(isset($data_request["fl_cliente"]))
		{
			$response->where('fl_cliente', 1);
		}

		if(isset($data_request["fl_proveedor"]))
		{
			$response->where('fl_proveedor', 1);
		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

	public function get_mis_datos()
	{		
		$response = $this->Persona_m->select('persona.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->select('us.imagen')
		->join('static_ubigeo u', 'u.id = persona.id_ubigeo', 'left')
		->join('usuario us', 'persona.id = us.id_cliente', 'left')
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

	
 
	public function get_unique($id_socio)
	{		
		$response = $this->Persona_m->select('persona.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = persona.id_ubigeo', 'left')
		->where('persona.id', $id_socio)
		->where('id_empresa', ID_EMPRESA)		
		->first();

        return $this->respond($response, 200);
	}

	public function index()
	{		

		$data_request = $this->request->getGet();
		
		$draw = $data_request["draw"];
		$length = $data_request["length"];
		$start = $data_request["start"];
		$primerLlamadoDT = ($draw == 1 ? 1 : 0);		

		$order = $data_request["order"][0];
		$orderColumn = $order["column"];
		$orderDirection = $order["dir"];
		$search = $data_request["search"]["value"];

		$tipo_persona_f = $data_request["tipo_persona_f"];
        $tipo_documento_f = $data_request["tipo_documento_f"];
		$numero_documento_f = trim($data_request["numero_documento_f"]);

		$Arr_tipo_persona_f = [];

		switch ($tipo_persona_f) {
			case 'CLIENTE':
				$Arr_tipo_persona_f = ['persona.fl_cliente' => 1];
				break;
			case 'PROVEEDOR':
				$Arr_tipo_persona_f = ['persona.fl_proveedor' => 1];
				break;
			default:
				$Arr_tipo_persona_f = [];
				break;
		}

        $Arr_tipo_documento_f = $tipo_documento_f ? ['persona.id_documento' => $tipo_documento_f] : [];
		$Arr_numero_documento_f = $numero_documento_f ? ['persona.numero_documento' => $numero_documento_f] : [];

		// Array que mapea los índices de DataTables a los nombres de las columnas(esto se amarra a las columnas que se muestran en el datatable y de mi consulta)
		$columnMapping = [
			0 => 'persona.razon_social',
			1 => 'persona.numero_documento',
			2 => 'persona.tipo',
			3 => 'persona.direccion',
			4 => 'persona.telefono',
			5 => '',
			//'ubigeo' => "COALESCE(CONCAT(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '')" /** NOTA: NO BORRAR ESTA LÍNEAS COMENTADA, PUEDE SERVIR PARA UN FUTURO */
		];

		$orderColumnName = $columnMapping[$orderColumn];
		$orderByIndex = $orderColumnName != '' ? "$orderColumnName $orderDirection" : '';
		$orderById = $primerLlamadoDT ? "persona.id DESC" : '';

		$response = $this->Persona_m
		->select('persona.id, persona.id_documento, persona.numero_documento,persona.razon_social,persona.direccion,persona.telefono,persona.id_ubigeo,persona.imagen,persona.email, persona.tipo, persona.nombres, persona.apellidos, persona.fecha_nacimiento')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = persona.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = persona.id_documento', 'left')
		->where($Arr_tipo_persona_f)
		->where($Arr_tipo_documento_f)
		->where($Arr_numero_documento_f)
		->where('persona.id_empresa', ID_EMPRESA);

		if(!empty($search)) {	
			// Buscar en la primera columna con 'like'
			$firstColumn = reset($columnMapping);
    		$response->like($firstColumn, $search);

			// Buscar en las columnas restantes con 'orLike'
			$otherColumns = array_slice($columnMapping, 1);
			foreach ($otherColumns as $column) {
				if($column != ""){
					$response->orLike($column, $search);
				}				
			}
		}
		/** NOTA: NO BORRAR ESTAS LÍNEAS COMENTADAS, PUEDE SERVIR PARA UN FUTURO */
		/** Esto sería otra opción si en caso voy a buscar por un campo concatenado */
		// if (!empty($search)) {
		// 	//$response->groupStart(); // Iniciar un grupo de condiciones OR
		// 	foreach ($columnMapping as $index => $column) {
		// 		if ($index !== 'ubigeo') {
		// 			if ($column != '') {
		// 				if ($index === 0) {
		// 					// Buscar en la primera columna con 'like'
		// 					$response->like($column, $search);
		// 				} else {
		// 					// Buscar en las columnas restantes con 'orLike'
		// 					$response->orLike($column, $search);
		// 				}
		// 			}
		// 		} else {
		// 			// Si el índice es 'ubigeo', buscar en la columna 'ubigeo'
		// 			$response->orLike($column, $search);
		// 		}
		// 	}
		// 	//$response->groupEnd(); // Finalizar el grupo de condiciones OR
		// }

		$response = $response->orderBy($orderById)
		->orderBy($orderByIndex);

		if ($length != '-1') {/** si length no es -1 entonces que aplique paginación */
			$page = ceil(($start - 1) / $length + 1);
			$response = $response->paginate($length, 'default', $page);
		} else {/** si length es -1 entonces que no aplique paginacion, que liste todo */
			$response = $response->findAll();
		}

		$recordsTotal = $this->Persona_m->where($Arr_tipo_persona_f)
										->where($Arr_tipo_documento_f)
										->where($Arr_numero_documento_f)
										->where('id_empresa', ID_EMPRESA)
										->countAllResults();

		/** Si length no es -1 entonces que aplique la paginación filtrada, de lo contrario, no se aplica filtración de página */
		$recordsFiltered = ($length != '-1') ? $this->Persona_m->pager->getTotal('default') : $recordsTotal;

		$arrayReturn = [
			"draw" => $draw,
			"recordsTotal" => $recordsTotal,
			"recordsFiltered" => $recordsFiltered,
			"data" => $response,
			// "start" => $start,
			// "length" => $length,
		];

        return $this->respond($arrayReturn, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		$modulo_permiso = '';
		switch ($data_request["tipo"]) {
			case 'CLIENTE':
				$modulo_permiso = 'cliente';
				break;
			case 'PROVEEDOR':
				$modulo_permiso = 'proveedor';
				break;
		}

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('mentenedor-' + $modulo_permiso, 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('mentenedor-' + $modulo_permiso, 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR IMAGEN */
			// $Imagen_upload = new Image_model();			
			// $imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'persona', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
			$nombres = '';
			$apellidos = '';
			$razon_social = '';

			if($data_request["id_documento"] == 2)
			{
				$razon_social = trim($data_request["razon_social"]);
				$nombres = null;
				$apellidos = null;
			}else{
				$razon_social = trim($data_request["nombres"]).' '.trim($data_request["apellidos"]);
				$nombres = trim($data_request["nombres"]);
				$apellidos = trim($data_request["apellidos"]);
			}

			/** GUARDAR */
			$data_socio = [
				'id_documento'              => trim($data_request["id_documento"]),
				'numero_documento'          => trim($data_request["numero_documento"]),
				'razon_social'              => $razon_social,
				'nombres'              		=> $nombres,
				'apellidos'              	=> $apellidos,
				'id_ubigeo'                 => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
				'direccion'                 => trim($data_request["direccion"]),
				'telefono'                  => trim($data_request["telefono"]),
				'email'         			=> trim($data_request["email"]),
				'fecha_nacimiento'         	=> (isset($data_request["fecha_nacimiento"])) ? trim($data_request["fecha_nacimiento"]) : null,
			];

			if(isset($data_request["id"]))
			{
				$data_socio["id"] = $data_request["id"];
			}
			else
			{
				$data_socio["id_empresa"] = ID_EMPRESA;

			}

			switch ($data_request["tipo"]) {
				case 'AMBOS':
					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = 1;
					$data_socio["fl_cliente"] = 1;
					break;
				case 'CLIENTE':
					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = null;
					$data_socio["fl_cliente"] = 1;
					break;
				case 'PROVEEDOR':
					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = 1;
					$data_socio["fl_cliente"] = null;
					break;
			}

			$this->Persona_m->save($data_socio);

			$id_socio = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'MANTENEDOR',
				'menu'			=> 'PERSONA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["razon_social"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			$data_socio["id_persona"] = $id_socio;
			
			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'persona' => $data_socio], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	
	public function save_direccion()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id_persona'				=> $data_request["id_persona"],
				'direccion'					=> trim($data_request["direccion"]),
				'id_ubigeo'					=> trim($data_request["id_ubigeo"]),
				'apartamento'				=> trim($data_request["apartamento"]),
				'indicaciones'				=> trim($data_request["indicaciones"]),
				'id_tipo_domicilio'			=> trim($data_request["id_tipo_domicilio"]),
				'codigo_postal'				=> trim($data_request["codigo_postal"]),
				'nombres_contacto'			=> trim($data_request["nombres_contacto"]),
				'telefono_contacto'			=> trim($data_request["telefono_contacto"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Persona_dir_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Dirección guardada con éxito'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete_direccion()
	{
		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'				=> $data_request["id"],
				'fl_estado'			=> 0,
			];

			$this->Persona_dir_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Dirección eliminada con éxito'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function establecer_predeterminado_direccion()
	{
		$data_request = $this->request->getJSON(true);

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$db->table('persona_direcciones')
			->set('fl_principal', NULL)
			->where('id_persona', $data_request["id_persona"])
			->update();

			$data = [
				'id'					=> $data_request["id"],
				'fl_principal'			=> 1,
			];

			$this->Persona_dir_m->save($data);
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Dirección establecida como predeterminada'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();


		$socio = $this->Persona_m->find($data_request["id"]);


		$modulo_permiso = '';
		switch ($socio->tipo) {
			case 'CLIENTE':
				$modulo_permiso = 'cliente';
				break;
			case 'PROVEEDOR':
				$modulo_permiso = 'proveedor';
				break;
		}


		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('mentenedor-' + $modulo_permiso, 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			//$socio = $this->Persona_m->find($data_request["id"]);

			//$this->Cuenta_bancaria_persona_m->where('id_socio', $data_request["id"])->delete();
			$this->Persona_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			// $Imagen_upload = new Image_model();
			// $Imagen_upload->eliminar($socio->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'MANTENEDOR',
				'menu'			=> 'PERSONA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 	$socio->razon_social
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
