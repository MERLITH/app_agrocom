<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Compra_model extends Model
{
  protected $table      = 'inv_compra';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_comprobante',
    'serie',
    'numero',
    'fecha',
    'fecha_sistema',
    'prioridad',
    'id_proveedor',
    'total_importe',
    'total_gravada',
    'total_igv',
    'fl_estado',
    'id_usuario',
    'id_membresia',
    'id_empresa',
    'condicion_pago',
    'id_moneda',
    'observacion',
	  'tipo_cambio',
	  'fecha_pago',
    'id_orden_compra',
    'fl_pagado',
    'dias_pagar',
    'origen_pago',
    'pagado_por'
  ];

}
