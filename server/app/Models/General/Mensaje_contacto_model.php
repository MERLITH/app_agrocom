<?php namespace App\Models\General;

use CodeIgniter\Model;

class Mensaje_contacto_model extends Model
{
  protected $table      = 'mensaje_contacto';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombres', 
    'email', 
    'telefono', 
    'asunto',
    'mensaje', 
    'fecha_registro', 
    'id_usuario', 
  ];

}
