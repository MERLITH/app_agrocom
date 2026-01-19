<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Ajuste_avanzado_model extends Model
{
  
  protected $table      = 'ajuste_avanzado';
  protected $primaryKey = 'id_empresa';
  protected $returnType = 'object';

  protected $allowedFields = [ 
    'id_empresa',
    'porcentaje_detraccion',
    'porcentaje_igv',
    'fl_sistema_logo',
    'fl_sistema_change_color',
    'sistema_color_bg',
    'fl_pagar_factura',
    'fl_tarifa_articulo',
    'fl_tarifa_cliente',
    'fl_tarifa_ruta',
    'fl_op_os_doc_ref',
    'fl_op_clave_edit_orden',
    'fl_op_multiple_orden_gt',
    'fl_op_emision_electronico_grt',
    'fl_op_emision_electronico_grr',
    'fl_general_local_independiente',
    'fl_op_os_emision_grt',
    'fl_facturacion_envio_manual_sunat',
    'cant_decimales_venta',
    'fl_fact_detraccion_automatica',
    'fl_op_os_descripcion_articulo',
    'fl_op_tarifa_info',
    'fl_general_serie_usuario',
    'porcentaje_izipay'
  ];

}
