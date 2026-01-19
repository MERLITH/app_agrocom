<?php namespace App\Models;

use CodeIgniter\Model;

class Centinela_model extends Model
{
  protected $table      = 'centinela';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
      'fecha',
      'modulo',
      'descripcion',
      'accion',
      'id_empresa',
      'id_usuario',
      'menu'
  ];

  public function registrar($data)
  {
    $Centinela_m = new Centinela_model();
    $Centinela_m->save([
      'fecha' 		  => date("Y-m-d H:i:s"),
      'descripcion'	=> $data["descripcion"],
      'modulo'	    => $data["modulo"],
      'menu'	      => $data["menu"],
      'accion'	    => $data["accion"],
      'id_empresa'	=> ID_EMPRESA,
      'id_usuario'	=> ID_USUARIO
    ]);
  }
}
