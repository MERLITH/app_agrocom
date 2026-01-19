<?php namespace App\Models\General;

use CodeIgniter\Model;

class Libro_reclamaciones_model extends Model
{
  protected $table      = 'libro_reclamaciones';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'serie',
    'numero',
    'ser_num',
    'fecha_registro',
    'nombres',
    'email',
    'telefono',
    'id_tipo_documento',
    'numero_documento',
    'id_tipo',
    'bien_contratado',
    'descripcion',
    'pedido',
    'id_usuario',
    'fl_estado',
    'respuesta',
  ];

  public function get_correlativo()
  {
    $Libro_m = new Libro_reclamaciones_model();

    $serie = 'L'.date("y");

    $response = $Libro_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }


}
