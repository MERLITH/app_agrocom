<?php namespace App\Models\General;

use CodeIgniter\Model;

class Persona_direcciones_model extends Model
{
  protected $table      = 'persona_direcciones';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_persona',
    'direccion',
    'ubicacion',
    'id_ubigeo',
    'apartamento',
    'indicaciones',
    'id_tipo_domicilio',
    'codigo_postal',
    'nombres_contacto',
    'telefono_contacto',
    'fecha_registro',
    'fl_estado',
    'fl_principal',

  ];

}
