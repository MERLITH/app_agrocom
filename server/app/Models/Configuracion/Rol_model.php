<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Rol_model extends Model
{
  protected $table      = 'rol';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'fl_no_dashboard'
  ];
}
