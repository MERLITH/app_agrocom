<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Tipo_documento_model extends Model
{
  protected $table      = 'tipo_documento';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'tipo'
  ];

}
