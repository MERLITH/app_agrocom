<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Curricula_model extends Model
{
  protected $table      = 'curricula';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'descipcion', 
    'tipo_curricula', 
    'fl_estado',
  ];
}
