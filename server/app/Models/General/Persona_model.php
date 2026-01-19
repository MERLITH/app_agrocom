<?php namespace App\Models\General;

use CodeIgniter\Model;

class Persona_model extends Model
{
  protected $table      = 'persona';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_documento', 
    'numero_documento', 
    'razon_social', 
    'nombres', 
    'apellidos', 
    'id_ubigeo', 
    'direccion', 
    'id_empresa', 
    'telefono', 
    'persona_encargado',
    'imagen',
    'email',
    'fl_cliente',
    'fl_apoderado',
    'fl_proveedor',
    'fl_docente',
    'tipo',
    'fl_email_enviar',
    'email_enviar',
    'fl_sms_enviar',
    'sms_enviar',
    'fecha_nacimiento',
    'id_apoderado'
  ];

}
