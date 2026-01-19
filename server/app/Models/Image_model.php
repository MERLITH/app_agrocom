<?php namespace App\Models;

use CodeIgniter\Model;
use App\Models\Helper_model;

use Intervention\Image\ImageManagerStatic as Image;

class Image_model extends Model
{
    public function guardar($file_image, $controlador, $imagen_anterior, $tipo_recorte = 'PROPORCIONAL')
    {
    
        if($file_image->getTempName() != "")
        {
          $nombre = $file_image->getClientName();

          /** NOMBRE DE IMAGEN */
          $Helper_m = new Helper_model();

          $nombre_imagen = $controlador.'-'.$Helper_m->eliminar_simbolos(time().'_'.$nombre);

          $destino = ROOT_PUBLIC_WRITABLE.'images/'.$nombre_imagen;

          $img = Image::make($file_image->getTempName());

          if($tipo_recorte == 'PROPORCIONAL')
          {
            // RECORTE PROPORCINOAL
            $width = 600; // your max width
            $height = 600; // your max height
            
            $img->height() > $img->width() ? $width=null : $height=null;
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
          }
          
          $img->save($destino);

          $this->eliminar($imagen_anterior);
          
        }
        else
        {
          if($imagen_anterior == null)
          {
              $nombre_imagen = "sin_imagen.jpg";
          }
          else
          {
              $nombre_imagen = $imagen_anterior;
          }
        }

        return $nombre_imagen;
    }

    public function eliminar($imagen)
    {
        if($imagen != '')
        {
            $image_path = ROOT_PUBLIC_WRITABLE.'images/'.$imagen;

            if (file_exists($image_path) and $imagen != 'sin_imagen.jpg')
            {
                unlink($image_path);
            }
        }
        
    }
}
