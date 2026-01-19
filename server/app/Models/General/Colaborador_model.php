<?php namespace App\Models\General;

use CodeIgniter\Model;

class Colaborador_model extends Model
{
  protected $table      = 'colaboradores';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'tipo_personal',
    'id_documento',
    'numero_documento',
    'nombre', 
    'apellido', 
    'nombre_completo', 
    'id_ubigeo', 
    'direccion', 
    'tipo_contratacion', 
    'modalidad_contrato', 
    'genero', 
    'telefono', 
    'numero_licencia', 
    'categoria_licencia', 
    'categoria_licencia_2da', 
    'id_empresa', 
    'id_proveedor', 
    'fecha_ingreso', 
    'fecha_planilla', 
    'fecha_salida', 
    'sueldo_basico', 
    'sueldo_variable', 
    'sueldo_interno', 
    'numero_seguro',
    'saldo_gastos_operativos', 
    'fecha_nacimiento',
    'imagen',
    'seguro_com_trabajo_riesgo',
    'seguro_salud',
    'seguro_vidaley',

    'id_cliente',
    'codigo_sap',
    'pais',
    'filtro_security',
    'vigencia_filtro',
    'fotocheck',
    'licencia_interna',
    'hazmati',
    'hazmatii',
    'capacitacion_mtc',
    'certi_prim_auxilio',
    'certi_man_defensivo',
    'certi_man_extintor',
    'portuaria_seguridad',
    'proteccion_portuaria',
    'curriculum',
    'record',
    'otro',
    'antecedente_policial',
    'antecedente_penal',
    'trabajo_altura',
    'observacion',

    'imagen_firma',
    'id_membresia'

    
    
];
}
