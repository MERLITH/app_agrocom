<?php namespace App\Controllers\Cronjob;
use CodeIgniter\Controller;
use App\Models\Configuracion\Personal_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Notificacion_model;

  class Cumpleano extends Controller{

    public function index()
    {
        $Personal_m = new Personal_model();
        $Empresa_m = new Empresa_model();
        $Notificacion_m = new Notificacion_model();

        $empresas = $Empresa_m->findAll();

        foreach ($empresas as $empresa) {
            
            $personal = $Personal_m->select('nombre_completo as nombre, date_format(fecha_nacimiento,  "%d-%m") as fecha')
            ->where('day(fecha_nacimiento)=day(NOW() + INTERVAL 1 DAY) and month(fecha_nacimiento)=month(NOW() + INTERVAL 1 DAY)')
            ->where('id_empresa', $empresa->id)
            ->findAll();

            $htmlContent = '';
            foreach ($personal as $row) {
                $htmlContent .= $row->nombre.'  <br>Fecha: '.$row->fecha.'-'.date("Y").' <br> <br> <br>';
            }

            if(count($personal) > 0)
            {
                $notificacion = $Notificacion_m->where('id_empresa', $empresa->id)->findAll();

                $array_email = [];
                foreach ($notificacion as $noti) {
                    if (filter_var($noti->email, FILTER_VALIDATE_EMAIL)) {
                        $array_email[] = $noti->email;
                    }                    
                }
                
                if(count($array_email) > 0)
                {
                    $db = \Config\Database::connect();
                    $sistema = $db->table('static_system')->get()->getRow();

                    $email = \Config\Services::email();
                
                    $config['mailType'] = 'html';

                    $email->initialize($config);

                    $email->setFrom($sistema->email_robot, $sistema->empresa);
                    $email->setTo(implode(", ", $array_email));

                    $email->setSubject('NOTIFICACIÓN DE CUMPLEAÑOS');
                    $email->setMessage($htmlContent);

                    $email->send();

                    echo 'Enviado a '.count($array_email);
                }
                else
                {
                    echo 'No exiten destinatarios';
                }

                
            }
            else
            {
                echo 'No exiten personales';
            }

        }
    }

  }
