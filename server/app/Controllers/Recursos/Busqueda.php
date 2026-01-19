<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;

class Busqueda extends BaseController
{
	public function __construct()
	{
		$this->db = \Config\Database::connect();
		$this->curl = \Config\Services::curlrequest();
	}

	public function reniec_sunat()
	{
		$data_request = $this->request->getGet();
		$token = 'apis-token-7969.9YAzQQR8ssWdn7LZZryJAESYHaX5zFcx';
		$numero_documento = $data_request["numero"];

		if(strlen($numero_documento) == 11)
		{
			
	
			// Iniciar llamada a API
			$curl = curl_init();

			// Buscar ruc sunat
			curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://api.apis.net.pe/v2/sunat/ruc?numero=' . $numero_documento,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Referer: http://apis.net.pe/api-ruc',
				'Authorization: Bearer ' . $token
			),
			));
	
			$response = curl_exec($curl);
	
			curl_close($curl);
			// Datos de empresas según padron reducido
			$empresa = json_decode($response);


			$response = [
				'response' 				=> $empresa,
				'numero' 				=> $empresa->numeroDocumento,
				'razon_social' 			=> $empresa->razonSocial,
				'nombre' 				=> '',
				'apellido' 				=> '',
				'fecha_nacimiento'		=> '',
				'direccion'				=> $empresa->direccion,
				'ubigeo' 	    		=> '',
				'condicion'				=> $empresa->condicion,

				'viaTipo'	            => $empresa->viaTipo,
				'viaNombre'	            => $empresa->viaNombre,
				'zonaCodigo'	        => $empresa->zonaCodigo,
				'viaTipo'	            => $empresa->viaTipo,
				'zonaTipo'	            => $empresa->zonaTipo,
				'numero'	            => $empresa->numero,
				'interior'	            => $empresa->interior,
				'lote'	                => $empresa->lote,
				'dpto'	                => $empresa->dpto,
				'manzana'	            => $empresa->manzana,
				'kilometro'	            => $empresa->kilometro,
				'distrito'	            => $empresa->viaTipo,
				'provincia'	            => $empresa->viaTipo,
				'departamento'	        => $empresa->viaTipo,
				'EsAgenteRetencion'	    => $empresa->EsAgenteRetencion,
				'tipoDocumento' 	    => $empresa->tipoDocumento,
				'estado' 	            => $empresa->estado,
			];

			return $this->respond($response, 200);
		}

		else if(strlen($numero_documento) == 8)
		{
			
			// Iniciar llamada a API
			$curl = curl_init();

			// Buscar dni
			curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://api.apis.net.pe/v2/reniec/dni?numero=' . $numero_documento,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 2,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Referer: https://apis.net.pe/consulta-dni-api',
				'Authorization: Bearer ' . $token
			),
			));
	
			$response = curl_exec($curl);
	
			curl_close($curl);
			// Datos listos para usar
			$persona = json_decode($response);
	
			$response = [
				'response' 			=> $persona,
				'numero' 			=> $persona->numeroDocumento,
				'razon_social' 		=> $persona->nombres,
				'nombre' 			=> $persona->nombres,
				'apellido' 			=> $persona->apellidoPaterno.' '.$persona->apellidoMaterno,
				'fecha_nacimiento'	=> '',
				'direccion'			=> '',
				'ubigeo' 	    	=> '',
				'condicion'			=> '',
				'tipoDocumento' 	=> $persona->tipoDocumento,
				'digitoVerificador'	=> $persona->digitoVerificador,
			];

			return $this->respond($response, 200);
		}
		else
		{
			$response = [
				'mensaje' => 'Número de Documento no válido',
				'tipo'	=> 'danger'
			];
			return $this->respond($response, 400);
		}
		
	}
		
}
