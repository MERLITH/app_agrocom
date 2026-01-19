<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Asignatura_model extends Model
{
  protected $table      = 'asignatura';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nNivel_cns', 
    'nombre', 
    'fl_estado',
  ];
}
