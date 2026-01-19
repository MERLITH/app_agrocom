<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Salida_Producto_model extends Model
{
  protected $table      = 'inv_salida_producto';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'serie',
    'numero',
    'fecha',
    'fecha_sistema',
    'id_proveedor',
    'id_personal',
    'total_importe',
    'fl_estado',
    'id_usuario',
    'id_membresia',
    'id_empresa',
    'observacion',
    'tipo_destino',
    'motivo'
  ];

  public function get_correlativo($serie)
  {
    $Salida_articulo_m = new Salida_Producto_model();

    $response = $Salida_articulo_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }
}
