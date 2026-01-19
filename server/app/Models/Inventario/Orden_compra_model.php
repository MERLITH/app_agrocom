<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Orden_compra_model extends Model
{
  protected $table      = 'inv_orden_compra';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'serie',
    'numero',
    'fecha',
    'fecha_sistema',
    'prioridad',
    'id_proveedor',
    'total_importe',
    'fl_estado',
    'id_usuario',
    'id_membresia',
    'id_empresa',
    'condicion_pago',
    'id_moneda',
    'lugar_entrega',
    'solicitante',
    'motivo',
    'observacion',
    'tipo_cambio',
    'dias_pagar',
    'numero_cotizacion',
    'id_cuenta_bancaria_proveedor',
    'contacto_proveedor',
    'imagen_firma',
    'persona_autoriza'
  ];

  public function get_correlativo($serie)
  {
    $Orden_compra_m = new Orden_compra_model();

    $response = $Orden_compra_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }
}
