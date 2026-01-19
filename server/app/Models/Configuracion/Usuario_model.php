<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Usuario_model extends Model
{
  protected $table      = 'usuario';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'usuario', 
    'email', 
    'password', 
    'salt', 
    'nombre', 
    'apellido', 
    'imagen', 
    'tipo', 
    'id_membresia', 
    'id_personal', 
    'id_cliente',
    'id_rol',
    'login_date',
    'token',
    'id_empresa',
    'id_local',
    'fl_ocultar_data',
    'fl_suspendido',
    'tipo_persona',
    'fl_cambio_local',
    'serie_orden',
    'serie_manifiesto',
    'serie_desembarque',
    'serie_reparto',
    'fl_supervisor',
    'fl_soporte_cliente',
    'password_original'
  ];
}
