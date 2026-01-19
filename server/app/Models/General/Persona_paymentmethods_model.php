<?php namespace App\Models\General;

use CodeIgniter\Model;

class Persona_paymentmethods_model extends Model
{
  protected $table      = 'persona_paymentmethods';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_persona',
    'id_metodo_pago',
    'id_tipo_tarjeta',
    'id_entidad',
    'numero',
    'fecha_vencimiento',
    'codigo_seguridad',
    'fecha_registro',
    'fl_estado',
  ];

}
