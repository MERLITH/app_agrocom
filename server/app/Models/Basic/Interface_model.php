<?php namespace App\Models\Basic;

use CodeIgniter\Model;

class Interface_model extends Model
{
  protected $table      = 'Interface';
  protected $primaryKey = ['nIntCodigo', 'nIntClase'];
  protected $returnType = 'object';

  protected $allowedFields = [
      'nIntCodigo',
      'nIntClase',
      'cIntJerarquia',
      'cIntNombre',
      'cIntDescripcion',
      'nIntTipo',
      'dIntFecRegistro',
      'nIdUsuario',
      'nIdEmpresa',
  ];

}
