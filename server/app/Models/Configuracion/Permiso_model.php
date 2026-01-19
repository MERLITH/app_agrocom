<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Permiso_model extends Model
{
  protected $table      = 'permiso';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = ['view', 'new', 'edit', 'delete', 'id_rol', 'menu'];
}
