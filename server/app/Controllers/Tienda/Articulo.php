<?php namespace App\Controllers\Inventario;

use App\Controllers\BaseController;

use App\Models\Inventario\Producto_model;
use App\Models\Image_model;

class Articulo extends BaseController
{
	public function __construct()
	{
		$this->Articulo_m = new Producto_model();
	}

 
}
