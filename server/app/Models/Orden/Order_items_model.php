<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Order_items_model extends Model
{
  protected $table      = 'ord_items';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_order',
    'id_producto',
    'cantidad',
    'precio_unitario',
    'subtotal',
    'id_carrito',
  ];


}
