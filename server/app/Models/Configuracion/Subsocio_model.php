<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Subsocio_model extends Model
{
  protected $table      = 'subsocio';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_documento', 
    'numero_documento', 
    'razon_social', 
    'direccion', 
    'email',
    'telefono',
    'id_socio',
    'codigo',
    'distrito',
    'mapa_latitud',
    'mapa_longitud',
    'segmento',
    'vendedor',
    'atencion_tipo',
    'atencion_horario',
    'tienda'
  ];
}
