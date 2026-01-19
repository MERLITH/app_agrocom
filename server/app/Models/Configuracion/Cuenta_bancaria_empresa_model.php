<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Cuenta_bancaria_empresa_model extends Model
{
  protected $table      = 'cuenta_bancaria_empresa';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'banco',
    'tipo',
    'numero',
    'descripcion',
    'id_empresa',
    'full_data',
    'id_moneda',
    'fl_publico',
    'fl_detraccion',
    'fl_principal',
    'saldo_disponible',
    'saldo_disponible_2'
  ];
}