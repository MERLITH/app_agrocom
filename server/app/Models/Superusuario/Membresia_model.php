<?php namespace App\Models\Superusuario;

use CodeIgniter\Model;

class Membresia_model extends Model
{
  protected $table      = 'membresia';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 'cantidad_usuario', 'token_integracion'
  ];
  
}
