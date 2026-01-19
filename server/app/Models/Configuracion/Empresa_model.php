<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Empresa_model extends Model
{
  protected $table      = 'empresa';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'numero_documento', 
    'razon_social', 
    'nombre_comercial', 
    'direccion', 
    'telefono', 
    'logo', 
    'id_membresia', 
    'url_proveedor_electronico', 
    'email', 
    'tipo_proveedor_electronico', 
    'id_ubigeo', 
    'nombre_comercial',
    'tipo_cambio',
    'porcentaje_igv',
    'estado_facturacion',
    'logo_factura'
  ];

}
