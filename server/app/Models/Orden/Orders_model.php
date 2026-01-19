<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Orders_model extends Model
{
  protected $table      = 'ord_orders';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_persona',
    'id_persona_direccion',
    'serie',
    'numero',
    'ser_num',
    'id_medio_pago',
    'fecha_order',
    'fecha_registro',
    'monto_total',
    'fl_estado',
    'fl_estado_actual',
    'fl_pagado',
    'observacion',
    'id_usuario',
    'token_id',
    'id_order_status',
    'id_order_history',
  ];

  public function get_correlativo()
  {
    $Orden_m = new Orders_model();

    $serie = 'O'.date("y");

    $response = $Orden_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }


}
