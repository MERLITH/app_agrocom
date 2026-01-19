<?php namespace App\Models\Orden;

use CodeIgniter\Model;

class Order_comments_model extends Model
{
  protected $table      = 'ord_comments';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_order',
    'id_persona',
    'id_calificacion',
    'comentario',
    'archivos',
    'fecha_registro',
  ];


}
