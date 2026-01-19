<?php namespace App\Controllers\Cronjob;
use CodeIgniter\Controller;

use App\Models\Configuracion\Empresa_model;
use App\Models\Operacion\Viaje_monitoreo_model;
use App\Models\Operacion\Viaje_orden_model;

  class Viaje_monitoreo extends Controller{

    public function index()
    {
        $Viaje_monitoreo_m = new Viaje_monitoreo_model();
        $Viaje_orden_m = new Viaje_orden_model();
        $Empresa_m = new Empresa_model();

        $monitoreo = $Viaje_monitoreo_m->select('viaje_monitoreo.*, em.nombre as estado, concat(v.serie,"-",v.numero) as viaje')
        ->join('estado_monitoreo em', 'em.id = viaje_monitoreo.id_estado_monitoreo')
        ->join('viaje v', 'v.id = viaje_monitoreo.id_viaje')
        ->where('viaje_monitoreo.fecha_sistema <= date_add(NOW(), INTERVAL -2 HOUR)')
        ->where('viaje_monitoreo.fl_email_enviado', null)
        ->findAll();

        foreach ($monitoreo as $row) {

            $clientes = $Viaje_orden_m->select('c.razon_social as cliente, c.email')
            ->select("concat(o.serie,'-',o.numero) as orden")
            ->join('orden o', 'o.id = viaje_orden.id_orden')
            ->join('cliente c', 'c.id = o.id_cliente')
            ->where('id_viaje', $row->id_viaje)
            ->findAll();
            
            /**** ARRAY EMAILS */
            $array_email = [];

            foreach ($clientes as $cliente) {
                
                $mail_more = explode(",", $cliente->email);

                if(count($mail_more) > 1)
                {
                    foreach ($mail_more as $mail) {
                        $array_email[] = $mail;
                    }
                }
                else
                {
                    $array_email[] = $cliente->email;
                }
            }

            /******** */

            

            $htmlContent = view('email/viaje_monitoreo', ['data' => $row]);

            $db = \Config\Database::connect();
            $sistema = $db->table('static_system')->get()->getRow();

            $email = \Config\Services::email();
        
            $config['mailType'] = 'html';

            $email->initialize($config);

            $email->setFrom($sistema->email_robot, $sistema->empresa);
            $email->setTo(implode(", ", $array_email));

            $email->setSubject('MONITOREO DE VIAJE '.$row->viaje);
            $email->setMessage($htmlContent);

            $email->send();

            /*** UPDATE MONITOREO A FL ENVIADO */

            $data_monitoreo = [
                'fl_email_enviado'  => 1,
                'id'                => $row->id
            ];

            $Viaje_monitoreo_m->save($data_monitoreo);
            
        }

        echo count($monitoreo).' Monitorzaciones';
    }

  }
