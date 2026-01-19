<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Categoria_model extends Model
{
  protected $table      = 'cajban_categoria';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'fl_incluir_utilidad'
    
  ];

}
