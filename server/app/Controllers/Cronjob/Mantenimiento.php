<?php namespace App\Controllers\Cronjob;
use CodeIgniter\Controller;
use App\Models\Personal_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Notificacion_model;
use App\Models\Operacion\Mantenimiento_vehiculo_model;
use App\Models\Configuracion\Vehiculo_model;
use App\Models\Configuracion\Vehiculo_km_model;
use App\Models\Configuracion\Vehiculo_mantenimiento_model;

  class Mantenimiento extends Controller{


    public function index()
    {
        $Mantenimiento_vehiculo_m = new Mantenimiento_vehiculo_model();
        $Vehiculo_m = new Vehiculo_model();
        $Vehiculo_km_m = new Vehiculo_km_model();
        $Vehiculo_mantenimiento_m = new Vehiculo_mantenimiento_model();
        $Empresa_m = new Empresa_model();
        $Notificacion_m = new Notificacion_model();

        $empresas = $Empresa_m->findAll();

        foreach ($empresas as $empresa) {

            /** VEHICULO */
            $vehiculos = $Vehiculo_m->select('vehiculo.id, km_actual, placa, marca, modelo')
            ->select('vc.nombre as clase')
            ->join('vehiculo_clase vc', 'vc.id = vehiculo.id_vehiculo_clase')
            ->where('vehiculo.id_empresa', $empresa->id)->findAll();            
            $vehiculo_notificacion = [];

            foreach ($vehiculos as $vehiculo) {              

              $ultimo_km = $Vehiculo_km_m->where('id_vehiculo', $vehiculo->id)
              ->orderBy('fecha', 'desc')
              ->orderBy('id', 'desc')
              ->first();

              $vehiculo->km_actual = (is_object($ultimo_km)) ? $ultimo_km->km : 0;

              /*** VEHICULO MANTENIMIENTO */
              $mantenimientos_vehiculo = $Vehiculo_mantenimiento_m->where('id_vehiculo', $vehiculo->id)->findAll();
              $mantenimiento_notificacion = [];

              $estado_mantenimiento = 'VIGENTE';

              foreach ($mantenimientos_vehiculo as $mantenimiento_vehiculo) {

                /** ULTIMO MANTENIMIENTOS DE VEHÍCULO */
                $mantenimiento = $Mantenimiento_vehiculo_m->where('mantenimiento', $mantenimiento_vehiculo->mantenimiento)->orderBy('fecha', 'desc')->first();

                if(is_object($mantenimiento))
                {
                  /** CALCULAR CUANDO SERÍA EL PRÓXIMO MANTENIMIENTO EN KM */
                  $proximo_mantenimiento = $mantenimiento->kilometraje + $mantenimiento_vehiculo->ciclo_km;

                  /** CALCULAR CUANTOS KM FALTAN PARA CUMPLIR EL ÚLTIMO CICLO */
                  $km_restante = $proximo_mantenimiento - $vehiculo->km_actual;

                  if ($km_restante <= 0) {
                    $estado_mantenimiento = 'VENCIDO';
                  }
                  else if ($km_restante <= $mantenimiento_vehiculo->alerta_km) {
                    $estado_mantenimiento = 'POR VENCER';
                  }

                  if($estado_mantenimiento != 'VIGENTE')
                  {
                    $mantenimiento_notificacion[] = (object)[
                      'mantenimiento'               => $mantenimiento_vehiculo->mantenimiento,
                      'ultimo_mantenimiento'        => $mantenimiento->kilometraje,
                      'fecha_ultimo_mantenimiento'  => $mantenimiento->fecha,
                      'km_actual'                   => $vehiculo->km_actual,
                      'km_proximo'                  => $proximo_mantenimiento,
                      'km_restante'                 => $km_restante,
                      'km_ciclo'                    => $mantenimiento_vehiculo->ciclo_km,
                      'km_alerta'                   => $mantenimiento_vehiculo->alerta_km,
                      'estado'                      => $estado_mantenimiento
                    ];
                  }
                }
                
                
              }

              /** SI EXISTEN MANTENIENTOS VENCIDOS AGREGAR VEHICULO A NOTIFICACION */
              if(count($mantenimiento_notificacion) > 0)
              {
                $vehiculo->detalle_mantenimiento = $mantenimiento_notificacion;

                $vehiculo_notificacion[] = $vehiculo;
              }

            }
            
            if(count($vehiculo_notificacion) > 0)
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
                        'empresa'   => $empresa,
                        'vehiculos'  => $vehiculo_notificacion,  
                    ];

                    $htmlContent = view('email/mantenimiento_vencidos', $data);

                    $db = \Config\Database::connect();
                    $sistema = $db->table('static_system')->get()->getRow();

                    $email = \Config\Services::email();
                
                    $config['mailType'] = 'html';

                    $email->initialize($config);

                    $email->setFrom($sistema->email_robot, $sistema->empresa);
                    $email->setTo(implode(", ", $array_email));

                    $email->setSubject('NOTIFICACIÓN DE MANTENIMIENTO DE VEHÍCULOS');
                    $email->setMessage($htmlContent);

                    $email->send();

                    echo 'Enviado a '.count($array_email).' destinos correctamente';
                }
                else
                {
                    echo 'No exiten destinatarios';
                }
                
            } 
            else
            {
              echo 'No existen vehículos con mantenimientos pendiente o vencidos';
            }           
        }
    }

  }
