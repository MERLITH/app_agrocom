<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;
use App\Models\Helper_model;
use CodeIgniter\API\ResponseTrait; 
use App\Models\Configuracion\Empresa_model;

class Envio_confirmacion extends BaseController
{

    use ResponseTrait;

    public function __construct()
	{

        $this->db = \Config\Database::connect();
        $this->email = \Config\Services::email();
        $this->Helper = new Helper_model();
        $this->Empresa_m = new Empresa_model();
        
    }

    public function enviar_email_confirmacion($data_request)
    {

        try {

            /**** ARRAY EMAILS */
            $array_email = [];
            
            $mail_more = explode(",", $data_request["email"]);

            if(count($mail_more) > 1)
            {
                foreach ($mail_more as $mail) {
                    $array_email[] = $mail;
                }
            }
            else
            {
                $array_email[] = $data_request["email"];
            }
            /******** */

            $htmlContent = view('email/envio_confirmacion', ['data' => json_encode($data_request)]);

            // echo($htmlContent);
            // exit();

            $db = \Config\Database::connect();

            $sistema = $db->table('static_system')->get()->getRow();

            $email = \Config\Services::email();
        
            $config['mailType'] = 'html';

            $email->initialize($config);

            $email->setFrom($sistema->email_robot, $sistema->empresa);
            $email->setTo(implode(", ", $array_email));

            $email->setSubject($data_request["asunto"]);
            $email->setMessage($htmlContent);

            $se_envio_mensaje = false;

            if($email->send()){ 

                $se_envio_mensaje = true; 

            }
            else{ 
                
                $se_envio_mensaje = false; 
            
            }

            
                
                
        } catch (\Exception $e) {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }

    }


		
}
