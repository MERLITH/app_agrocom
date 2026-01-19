<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Almacen_model extends Model
{
  protected $table      = 'inv_almacen';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'id_empresa', 
    'descripcion'
  ];

}
