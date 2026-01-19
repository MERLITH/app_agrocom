<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Periodo_model extends Model
{
  protected $table      = 'periodo';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'anio',
    'descripcion',
    'tipo',
    'fecha_inicio',
    'fecha_fin',
    'fl_activo',
    'fl_estado',
  ];

}
