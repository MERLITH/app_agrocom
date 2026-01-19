<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Order_history_model extends Model
{
  protected $table      = 'ord_history';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_order',
    'id_history',
    'nombre',    
    'comentario',
    'fecha_registro',
  ];


}
