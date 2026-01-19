<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Aula_model extends Model
{
  protected $table      = 'aula';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'num_piso', 
    'aforo',
    'pabellon',
    'fl_estado'
  ];

}
