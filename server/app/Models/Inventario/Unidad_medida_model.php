<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Unidad_medida_model extends Model
{
  protected $table      = 'inv_unidad_medida';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'codigo_sunat', 
    'id_empresa', 
    'id_membresia'
  ];

}
