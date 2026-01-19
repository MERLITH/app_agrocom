<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Checklist_model extends Model
{
  protected $table      = 'inv_checklist';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'fecha', 
    'id_empresa', 
    'id_usuario',
    'observacion' 
  ];

}

