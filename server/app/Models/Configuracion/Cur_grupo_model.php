<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Cur_grupo_model extends Model
{
  protected $table      = 'cur_grupo';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nNivel_cns',
    'id_curricula', 
    'id_grado',  
    'fl_estado',
  ];
}
