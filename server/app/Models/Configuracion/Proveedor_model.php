<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Proveedor_model extends Model
{
  protected $table      = 'proveedor';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_documento', 'numero_documento', 'razon_social', 'id_ubigeo', 'direccion', 'id_empresa', 'contacto_nombre', 'contacto_celular', 'imagen', 'id_membresia','correo'
  ];
}
