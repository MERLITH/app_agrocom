<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Cur_grupo_asignatura_model extends Model
{
  protected $table      = 'cur_grupo_asignatura';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_cur_grupo',
    'id_asignatura', 
  ];
}
