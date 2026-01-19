<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Grupo_model extends Model
{
  protected $table      = 'grupo';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_cur_grupo', 
    'id_aula', 
    'seccion', 
    'fl_estado',
  ];
}
