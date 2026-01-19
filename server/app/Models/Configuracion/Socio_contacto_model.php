<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Socio_contacto_model extends Model
{
  protected $table      = 'socio_contacto';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_socio',
    'nombre',
    'telefono',
    'email',
    'otros',
    'id_documento',
    'numero_documento'
  ];
}
