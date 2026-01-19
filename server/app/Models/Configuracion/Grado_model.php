<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Grado_model extends Model
{
  protected $table      = 'grado';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nNivel_cns', 
    'nombre', 
    'fl_estado',
  ];
}
