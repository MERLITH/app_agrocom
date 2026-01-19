<?php namespace App\Controllers\Cronjob;
use CodeIgniter\Controller;
use App\Models\Personal_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Notificacion_model;
use App\Models\Documento\Documento_personal_model;
use App\Models\Documento\Documento_vehiculo_model;

  class Documento extends Controller{


    public function index()
    {
        $Documento_personal_m = new Documento_personal_model();
        $Documento_vehiculo_m = new Documento_vehiculo_model();
        $Empresa_m = new Empresa_model();
        $Notificacion_m = new Notificacion_model();

        $empresas = $Empresa_m->findAll();

        foreach ($empresas as $empresa) {

            $vencidos = 0;

            /** PERSONAL */
            $personal_vencido = $Documento_personal_m->select('documento_personal.*')
            ->select('p.nombre_completo as personal')
            ->select('td.nombre as documento_tipo')
            ->join('personal p', 'p.id = documento_personal.id_personal')
            ->join('tipo_documento td', 'td.id = documento_personal.id_tipo_documento')
            ->where('documento_personal.fecha_vencimiento = date_add(NOW(), INTERVAL +15 DAY)')
            ->where('documento_personal.id_empresa', $empresa->id)
            ->findAll();

            foreach ($personal_vencido as $row) {
                $vencidos++;

                $now = time(); 
                $your_date = strtotime($row->fecha_vencimiento);
                $datediff =  $your_date - $now;

                $dias_restantes = round($datediff / (60 * 60 * 24));

                if($dias_restantes < 0)
                {
                    $row->estado = 'VENCIDO';
                }
                else if($dias_restantes < 15)
                {
                    $row->estado = 'POR VENCER';
                }
                else 
                {
                    $row->estado = 'VIGENTE';
                }
            }

            /** VEHICULOS */

            $vehiculo_vencido = $Documento_vehiculo_m->select('documento_vehiculo.*')
            ->select('v.placa as vehiculo')
            ->select('td.nombre as documento_tipo')
            ->join('vehiculo v', 'v.id = documento_vehiculo.id_vehiculo')
            ->join('tipo_documento td', 'td.id = documento_vehiculo.id_tipo_documento')
            ->where('documento_vehiculo.fecha_vencimiento < date_add(NOW(), INTERVAL +15 DAY)')
            ->where('documento_vehiculo.id_empresa', $empresa->id)
            ->findAll();

            foreach ($vehiculo_vencido as $row) {
                $vencidos++;

                $now = time(); 
                $your_date = strtotime($row->fecha_vencimiento);
                $datediff =  $your_date - $now;

                $dias_restantes = round($datediff / (60 * 60 * 24));

                if($dias_restantes < 0)
                {
                    $row->estado = 'VENCIDO';
                }
                else if($dias_restantes < 15)
                {
                    $row->estado = 'POR VENCER';
                }
                else 
                {
                    $row->estado = 'VIGENTE';
                }
            }
            
            if($vencidos > 0)
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

                    $data = [
                        //'empresa'   => $empresa,
                        'personal'  => $personal_vencido,
                        'vehiculo'  => $vehiculo_vencido              
                    ];

                    $htmlContent = view('email/documentos_vencidos', $data);

                    $db = \Config\Database::connect();
                    $sistema = $db->table('static_system')->get()->getRow();

                    $email = \Config\Services::email();
                
                    $config['mailType'] = 'html';

                    $email->initialize($config);

                    $email->setFrom($sistema->email_robot, $sistema->empresa);
                    $email->setTo(implode(", ", $array_email));

                    $email->setSubject('NOTIFICACIÓN DE DOCUMENTOS VENCIDOS');
                    $email->setMessage($htmlContent);

                    $email->send();

                    echo 'Enviado a '.count($array_email);
                }
                else
                {
                    echo 'No exiten destinatarios';
                }
                
            }            
        }
    }

  }
