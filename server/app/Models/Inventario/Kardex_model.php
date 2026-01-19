<?php namespace App\Models\Inventario;

use CodeIgniter\Model;
use App\Models\Inventario\Producto_model;

class Kardex_model extends Model
{
  protected $table      = 'inv_kardex';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
                'id_membresia', 
                'tipo', 
                'concepto',
                'ingreso_cantidad',
                'ingreso_costo',
                'ingreso_monto',
                'salida_cantidad',
                'salida_costo',
                'salida_monto',
                'saldo_cantidad',
                'saldo_costo',
                'saldo_monto',
                'id_articulo',
                'fecha',
                'id_empresa',
                'id_salida_articulo',
                'id_compra'
  ];

  public function save_movimiento($data)
  {
    $Kardex_m = new Kardex_model();
    $this->session = \Config\Services::session();

    $anterior = $Kardex_m->where('id_articulo', $data["id_articulo"])
    ->orderBy('id', 'desc')
    ->first();

    if(is_object($anterior))
    {
      if($data["tipo"] == 'INGRESO')
      {
        $data["ingreso_monto"] = $data["ingreso_cantidad"] * $data["ingreso_costo"];
        $data["saldo_cantidad"] = $anterior->saldo_cantidad + $data["ingreso_cantidad"];
        $data["saldo_monto"] = $anterior->saldo_monto + $data["ingreso_monto"];
        $data["saldo_costo"] = $data["saldo_monto"] / ($anterior->saldo_cantidad + $data["ingreso_cantidad"]);
      }
      else
      {
        $data["salida_monto"] = $data["salida_cantidad"] * $data["salida_costo"];
        $data["saldo_cantidad"] = $anterior->saldo_cantidad - $data["salida_cantidad"];
        $data["saldo_costo"] = $data["salida_costo"];
        $data["saldo_monto"] = $data["saldo_cantidad"] * $data["saldo_costo"];
      }      
    }
    else
    {
      $data["tipo"] = 'INVENTARIO INICIAL';
      $data["ingreso_monto"] = $data["ingreso_cantidad"] * $data["ingreso_costo"];
      $data["saldo_cantidad"] = $data["ingreso_cantidad"];
      $data["saldo_costo"] = $data["ingreso_costo"];
      $data["saldo_monto"] = $data["ingreso_cantidad"] * $data["ingreso_costo"];
    }

    $data["id_membresia"] = ID_MEMBRESIA;
    $data["id_empresa"] = ID_EMPRESA;

    $Kardex_m->save($data);

    /** SAVE COSTO PRODUCTO */
    $Articulo_m = new Producto_model();

    $data = [
      'id'          => $data["id_articulo"],
      'costo'       => $data["saldo_costo"]
    ];

    $Articulo_m->save($data);

  }
  
}
