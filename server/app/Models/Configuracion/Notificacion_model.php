<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Notificacion_model extends Model
{
  protected $table      = 'notificacion';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'email',
    'telefono',
    'nombre',
    'id_empresa'
  ];

}
