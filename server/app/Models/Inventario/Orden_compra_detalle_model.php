<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Orden_compra_detalle_model extends Model
{
  protected $table      = 'inv_orden_compra_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_orden_compra',
    'id_articulo',
    'cantidad',
    'valor_unitario',
    'precio_unitario',
    'subtotal',
    'porcentaje_igv',
    'igv',
    'importe',
  ];

}
