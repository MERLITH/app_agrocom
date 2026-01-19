<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Salida_articulo_detalle_model extends Model
{
  protected $table      = 'inv_salida_producto_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_salida_articulo',
    'id_articulo',
    'cantidad',
    'costo_unitario',
    'importe',
  ];

}
