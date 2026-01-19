<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Cuenta_bancaria_persona_model extends Model
{
  protected $table      = 'cuenta_bancaria_persona';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'banco',
    'tipo',
    'numero',
    'id_personal',
    'id_socio',
    'full_data',
    'fl_detraccion'
  ];
}
