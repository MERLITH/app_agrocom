<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Cart_model extends Model
{
  protected $table      = 'cart';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_producto',
    'cantidad',
    'id_usuario',
    'fecha_registro',
    'fl_estado',
    'id_order',
  ];


}
