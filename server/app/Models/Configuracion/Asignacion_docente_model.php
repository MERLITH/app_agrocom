<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Asignacion_docente_model extends Model
{
  protected $table      = 'asignacion_docente';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_docente', 
    'id_periodo', 
    'fecha_registro', 
    'fl_estado',
  ];
}
