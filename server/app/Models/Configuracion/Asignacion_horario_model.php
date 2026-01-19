<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Asignacion_horario_model extends Model
{
  protected $table      = 'asignacion_horario';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_asignacion_docente', 
    'id_cur_grupo',
    'id_grupo', 
    'id_cur_grupo_asignatura',
    'fecha_registro', 
    'nDia',
    'hora_inicio',
    'hora_fin'
  ];
}
