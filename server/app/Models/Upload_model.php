<?php namespace App\Models;

use CodeIgniter\Model;
use App\Models\Helper_model;

class Upload_model extends Model
{
    public function guardar($file_archivo, $controlador, $archivo_anterior)
    {
        if($file_archivo->getTempName() != "")
        {
            $nombre_archivo = $controlador.'-'.$file_archivo->getRandomName();

            /** NOMBRE DE ARCHIVO */
            $Helper_m = new Helper_model();

            $destino = ROOT_PUBLIC_WRITABLE.'uploads/';

            $file_archivo->move($destino, $nombre_archivo);

            if($archivo_anterior != '')
            {
                $this->eliminar($archivo_anterior);
            }       
        }
        else
        {
          if($archivo_anterior == null)
          {
              $nombre_archivo = NULL;
          }
          else
          {
              $nombre_archivo = $archivo_anterior;
          }
        }

        return $nombre_archivo;
    }

    public function eliminar($archivo)
    {
        $archivo_path = ROOT_PUBLIC_WRITABLE.'uploads/'.$archivo;

        if (file_exists($archivo_path))
        {
            unlink($archivo_path);
        }
    }
}
