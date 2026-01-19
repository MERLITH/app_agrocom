<?php namespace App\Models\Basic;

use CodeIgniter\Model;

class IntInterface_model extends Model
{
  protected $table      = 'IntInterface';
  protected $primaryKey = ['nIntSrcCodigo', 'nIntSrcClase', 'nIntDstCodigo', 'nIntDstClase'];
  protected $returnType = 'object';

  protected $allowedFields = [
      'nIntSrcCodigo',
      'nIntSrcClase',
      'nIntDstCodigo',
      'nIntDstClase',
      'cValor',
      'MARCAJWME',
  ];

}
