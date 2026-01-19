<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Moneda_model extends Model
{
  protected $table      = 'static_moneda';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'simbolo',
    'codigo',
    'tipo_cambio',
    'fl_publico'
  ];

}
