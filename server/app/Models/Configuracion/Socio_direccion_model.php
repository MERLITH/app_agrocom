<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Socio_direccion_model extends Model
{
  protected $table      = 'socio_direccion';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_socio',
    'direccion'
  ];

}
