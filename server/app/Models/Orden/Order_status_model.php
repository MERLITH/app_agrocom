<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Order_status_model extends Model
{
  protected $table      = 'ord_status';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_order',
    'id_estado',
    'estado',
    'fecha_registro',
    'comentario'
  ];


}
