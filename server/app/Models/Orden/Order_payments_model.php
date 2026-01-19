<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Order_payments_model extends Model
{
  protected $table      = 'ord_payments';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_order',
    'id_metodo_pago',
    'monto_total',
    'fecha_pago',
    'cod_transaccion',
    'estado_pago',
    'observacion',
    'payment_id',
    'status',
    'preference_id',
    'merchant_order_id',
  ];


}
