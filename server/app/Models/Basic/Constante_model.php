<?php namespace App\Models\Basic;

use CodeIgniter\Model;

class Constante_model extends Model
{
  protected $table      = 'Constante';
  protected $primaryKey = ['nConCodigo', 'nConValor'];
  protected $returnType = 'object';

  protected $allowedFields = [
      'nConCodigo',
      'nConValor',
      'cConDescripcion',
      'cConDetalle',
      'color',
      'icono',
      'nConEstado',
      'cConEquiv_PS',
      'nIdUsuario',
      'nIdEmpresa',
      'dConFecRegistro',
  ];

}
