<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Checklist_detalle_model extends Model
{
  protected $table      = 'inv_checklist_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_checklist', 
    'id_articulo', 
    'stock',
    'stock_fisico'
  ];

}
