<?php namespace App\Models\Inventario;

use CodeIgniter\Model;

class Producto_model extends Model
{
  protected $table      = 'inv_productos';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'codigo',
    'nombre',//nombre
    'id_categoria', //id_tipo_articulo
    'id_linea',
    'id_sublinea',
    'descripcion', //descripcion
    'id_unidad_medida',
    'id_marca',
    'fl_estado',
    'cantidad',
    'cantidad_minimo',
    'costo',
    'precio', //precio
    'fecha_sistema',
    'created_at',
    'updated_at',
    'id_usuario',
    'id_membresia',
    'observacion',
    'codigo_barra',
    'imagenes', //imagen
    'fl_publico',
    'id_empresa',
    'id_almacen',
    'fl_cantidad_qr_unico',
    'id_catalogo_empresa'
  ];

}
