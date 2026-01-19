<?php namespace App\Models;

use CodeIgniter\Model;

class Helper_model extends Model
{
  public function limpiar_nombre($string){

    if($string == null)
    {
      return '';
    }

  	$string = trim($string);

  	$string = str_replace(
  		array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
  		array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
  		$string
  	);

  	$string = str_replace(
  		array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
  		array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
  		$string
  	);

  	$string = str_replace(
  		array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
  		array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
  		$string
  	);

  	$string = str_replace(
  		array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
  		array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
  		$string
  	);

  	$string = str_replace(
  		array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
  		array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
  		$string
  	);

  	$string = str_replace(
  		array('ñ', 'Ñ', 'ç', 'Ç'),
  		array('n', 'N', 'c', 'C',),
  		$string
  	);
    

  	$string = str_replace(
  		array("'",),
  		'&#39;',$string);

    $string = str_replace(
      array("´",),
      '&#180;',$string);


    /*$string = str_replace(
      array("\\", "¨","“","”", "º", "-", "~",
          "#", "@", "|", "!", "\"",
          "·", "$", "%", "&", "/",
          "(", ")", "?", "'", "¡",
          "¿", "[", "^", "<code>", "]",
          "+", "}", "{", "¨", "´",
          ">", "< ", ";", ",", ":",),
      '',$string);*/

  	return $string;
  }

  public function limpiar_nombre_twilio($string){

  	$string = trim($string);

  	$string = str_replace(
  		array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
  		array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
  		$string
  	);

  	$string = str_replace(
  		array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
  		array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
  		$string
  	);

  	$string = str_replace(
  		array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
  		array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
  		$string
  	);

  	$string = str_replace(
  		array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
  		array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
  		$string
  	);

  	$string = str_replace(
  		array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
  		array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
  		$string
  	);

  	$string = str_replace(
  		array('ñ', 'Ñ', 'ç', 'Ç'),
  		array('n', 'N', 'c', 'C',),
  		$string
  	);
    
    /*$string = str_replace(
      array("\\", "¨","“","”", "º", "-", "~",
          "#", "@", "|", "!", "\"",
          "·", "$", "%", "&", "/",
          "(", ")", "?", "'", "¡",
          "¿", "[", "^", "<code>", "]",
          "+", "}", "{", "¨", "´",
          ">", "< ", ";", ",", ":",),
      '',$string);*/

  	return $string;
  }
  
  public function eliminar_registros_detalle($table, $foreign, $value_foreign, $array_object_no_delete, $table_vinculado = null, $id_table_vinculado = null)
  {
    $db = \Config\Database::connect();

    $registros = $db->table($table)
    ->where($foreign, $value_foreign)
    ->get()
    ->getResult();

     /*** IDENTIFICAR ID */

    foreach ($registros as $row) {

      $fl_eliminar = true;

      foreach ($array_object_no_delete as $no_reg) {
        
        if($row->id == $no_reg->id)
        {
          $fl_eliminar = false;
        }
      }

      if($fl_eliminar == true)
      {
        // CONVERT OBJT TO ARRAY
        $row = (array) $row;

        if($table_vinculado != null && $id_table_vinculado != null)
        {
          // DESVINCULAR 
          $db->table($table_vinculado)
          ->set($foreign, 'NULL', FALSE)
          ->where('id', $row[$id_table_vinculado])
          ->update();

        }
        
        // ELIMINAR DE DETALLE
        $db->table($table)
        ->where('id', $row["id"])
        ->delete();
      }

    }    
  }

  public function dias_restantes($fecha, $dias_pagar)
  {
    $fecha_a_pagar = date("d-m-Y",strtotime($fecha."+ ".($dias_pagar)." days")); 

    $now = time(); // or your date as well
    $your_date = strtotime($fecha_a_pagar);
    $datediff =  $your_date - $now;

    return round($datediff / (60 * 60 * 24));
  }

  public function validar_duplicado($titulo, $tabla, $campo, $value, $id)
  {
    $db = \Config\Database::connect();

    $registro = $db->table($tabla)
    ->where($campo, $value)
    ->where('id_empresa', ID_EMPRESA)
    ->get()->getRow();

    if($id != null)
    {
      if(is_object($registro))
      {
        if($registro->id != $id)
        {
          return ['tipo' => 'warning', 'mensaje' => $titulo. ' => '.$value.' ya existente'];
        }
      }
    }
    else
    {
      if(is_object($registro))
      {
        return ['tipo' => 'warning', 'mensaje' => $titulo. ' => '.$value.' ya existente'];
      }
    }

    return true;
  }

  public function download_header($archivo, $nombre = null)
  {
    $archivo_path = WRITEPATH.'uploads/'.$archivo;

    if (file_exists($archivo_path)) {

        $exx = explode(".", $archivo);
        $extension = $exx[(count($exx))-1];

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.(($nombre != null) ? $nombre : basename($archivo_path)).'.'.$extension.'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($archivo_path));
        readfile($archivo_path);
        exit;
    }
    else
    {
      echo 'El archivo no existe o ha sido movido';
    }
  }
  
  public function mensaje_cath($e)
  {
    
    if ($e->getCode() == 1451) {
      $mensaje = 'El registro está relacionado con otros datos. '. $e->getMessage();
    }
    else if ($e->getCode() == 1062) {

      $mensaje = 'No puede existir información duplicada. '. $e->getMessage();
    }
    else
    {
      $mensaje = $e->getMessage();
    }

    return $mensaje;
  }

  public function validar_permisos($menu, $accion)
  {
    $this->session = \Config\Services::session();
    $db = \Config\Database::connect();

    if (TIPO_USUARIO != 'SUPER ADMINISTRADOR' && TIPO_USUARIO != 'SUPER USUARIO') {

      $permiso = $db->table('permiso')
      ->where('menu', $menu)
      ->where($accion, 1)
      ->where('id_rol', ID_ROL)
      ->get()->getRow();

      if(!is_object($permiso))
      {
        header('HTTP/1.1 404 Unauthorized', true, 404);
        header('Content-Type: application/json');
        echo json_encode(['tipo' => 'warning', 'mensaje' => 'No tienes permisos suficientes para esta acción, consulte al administrador del sistema.']);
        exit;
      
      }
    }

  }

  public function errores($e)
  {
    $resultado = '';

    foreach ($e as $key => $value) {
      $resultado .= $value.'<br />';
    }

    return $resultado;
  }

  public function definidores()
  {
    define("ROOT_PUBLIC_WRITABLE", ROOTPATH.'public/writable/');
  }

  public function eliminar_simbolos($string){

  	$string = trim($string);

  	$string = str_replace(
  		array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
  		array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
  		$string
  	);

  	$string = str_replace(
  		array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
  		array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
  		$string
  	);

  	$string = str_replace(
  		array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
  		array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
  		$string
  	);

  	$string = str_replace(
  		array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
  		array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
  		$string
  	);

  	$string = str_replace(
  		array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
  		array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
  		$string
  	);

  	$string = str_replace(
  		array('ñ', 'Ñ', 'ç', 'Ç'),
  		array('n', 'N', 'c', 'C',),
  		$string
  	);

  	$string = str_replace(
  		array("\\", "¨","“","”", "º", "-", "~",
  			 "#", "@", "|", "!", "\"",
  			 "·", "$", "%", "&", "/",
  			 "(", ")", "?", "'", "¡",
  			 "¿", "[", "^", "<code>", "]",
  			 "+", "}", "{", "¨", "´",
  			 ">", "< ", ";", ",", ":",
  			 " "),
  		'',
  		$string
  	);
  	return $string;
  }

  public function in_array_multi($needle, $haystack, $strict = false) {
    foreach ($haystack as $item) {
        if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && $this->in_array_multi($needle, $item, $strict))) {
            return true;
        }
    }

    return false;
  }

  public function array_search_id($search_value, $array, $id_path) {

      if(is_array($array) && count($array) > 0) {

          foreach($array as $key => $value) {

              $temp_path = $id_path;

              // Adding current key to search path
              array_push($temp_path, $key);

              // Check if this value is an array
              // with atleast one element
              if(is_array($value) && count($value) > 0) {
                  $res_path = array_search_id(
                          $search_value, $value, $temp_path);

                  if ($res_path != null) {
                      return $res_path;
                  }
              }
              else if($value == $search_value) {
                  return join($temp_path);
              }
          }
      }

      return null;
  }
}
