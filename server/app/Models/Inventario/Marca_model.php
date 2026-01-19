<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Marca_model extends Model
{
  protected $table      = 'inv_marca';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'id_empresa', 
    'id_membresia'
  ];

}
