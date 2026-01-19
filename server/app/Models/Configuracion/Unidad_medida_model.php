<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Unidad_medida_model extends Model
{
  protected $table      = 'unidad_medida';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'codigo_sunat'
  ];

}
