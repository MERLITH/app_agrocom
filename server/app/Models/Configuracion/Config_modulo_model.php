<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Config_modulo_model extends Model
{
  protected $table      = 'config_modulo';
  protected $primaryKey = 'id_empresa';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_empresa', 
    'dt_operacion_orden_trabajo',
    'form_operacion_orden_trabajo',
    'dt_configuracion_vehiculo',
    'dt_report_orden_trabajo'
  ];
}
