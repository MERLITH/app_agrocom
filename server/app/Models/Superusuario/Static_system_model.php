<?php namespace App\Models\Superusuario;

use CodeIgniter\Model;

class Static_system_model extends Model
{
  protected $table      = 'static_system';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'email_robot', 'empresa', 'bg_login', 'fl_bg_login', 'logo_login', 'fl_logo_login', 'color_button_login'
  ];
}
