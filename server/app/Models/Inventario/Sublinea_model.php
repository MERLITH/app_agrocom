<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Sublinea_model extends Model
{
  protected $table      = 'inv_sublinea';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'codigo', 
    'nombre', 
    'id_linea',
    'id_empresa', 
    'id_membresia'
  ];

}
