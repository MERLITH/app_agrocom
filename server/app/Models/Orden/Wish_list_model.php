<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Wish_list_model extends Model
{
  protected $table      = 'wish_list';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_persona',
    'id_usuario',
    'id_producto',
    'fecha_registro',
  ];


}
