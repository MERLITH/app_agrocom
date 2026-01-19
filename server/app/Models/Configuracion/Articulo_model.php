<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Producto_model extends Model
{
  protected $table      = 'articulo';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'id_empresa', 
    'id_usuario',
    'fecha_sistema',
    'codigo',
    'peso',
    'fl_no_bulto',
    'fl_no_tarifa',
    'unidad_medida'
  ];
}
