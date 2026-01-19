<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Linea_model extends Model
{
  protected $table      = 'inv_linea';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'codigo', 
    'nombre', 
    'id_empresa', 
    'id_membresia'
  ];

}
