<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Tipo_producto_model extends Model
{
  protected $table      = 'inv_categorias';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'descripcion', 
    'image',
    'id_empresa',
    'id_membresia'
  ];

}
