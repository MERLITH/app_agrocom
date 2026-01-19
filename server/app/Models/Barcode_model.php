<?php namespace App\Models;

use CodeIgniter\Model;
use App\Models\Helper_model;

class Barcode_model extends Model
{
    public function guardar($sku, $controlador, $imagen_barcode_anterior)
    {
        $Helper_m = new Helper_model();

        $imagen_sku = $controlador.'-'.$Helper_m->eliminar_simbolos($sku.'.jpg');

        $destino = ROOT_PUBLIC_WRITABLE.'images/'.$imagen_sku;

        
        if($imagen_sku != $imagen_barcode_anterior)
        {            
            $generator = new \Picqer\Barcode\BarcodeGeneratorJPG();
            file_put_contents($destino, $generator->getBarcode($sku, $generator::TYPE_CODE_128, 5, 200));

            $this->eliminar($imagen_barcode_anterior);
            
        }   
        else
        {
            $imagen_sku = $imagen_barcode_anterior;
        }     

        return $imagen_sku;
    }

    public function eliminar($imagen_barcode)
    {
        if($imagen_barcode != '')
        {
            $image_path = ROOT_PUBLIC_WRITABLE.'images/'.$imagen_barcode;

            if (file_exists($image_path))
            {
                unlink($image_path);
            }
        }
        
    }
}
