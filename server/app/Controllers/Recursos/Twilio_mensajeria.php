<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

class Twilio_mensajeria extends BaseController
{

    public function __construct()
	{
        // Your Account SID and Auth Token from twilio.com/console
        $this->sid = 'AC60720a113e791ca492c289d61738e12a';
        $this->token = '9c1199971becc059c9be98635708a492';
        $this->numero = '+14243250874';
    }

    public function send($data_request = null)
    {
        if($data_request == null)
        {
            $data_request = $this->request->getPost();
        }

		if($data_request["fl_whatsapp"] == true)
		{
			$this->send_whatsapp($data_request);     
		}
		else
		{
			
			$this->send_sms($data_request);     
		}         
        
    }

	public function send_sms($data_request)
	{        
        $client = new Client($this->sid, $this->token);            
 
        try{


			/**** ARRAY NUMBERS */
			$array_numero = [];
			
			$numero_more = explode(",", $data_request["numero_destino"]);

			if(count($numero_more) > 0)
			{
				foreach ($numero_more as $numero) {

					if(strlen($numero) == 9)
					{

						// Use the client to do fun stuff like send text messages!
						$client->messages->create(
							// the number you'd like to send the message to
							$data_request["codigo_pais"].$numero,
							[
								// A Twilio phone number you purchased at twilio.com/console
								// 'from' => '+13512009152', BETA GERSON
								'from' => $this->numero, //  sms
								//'from' => 'whatsapp:+14243250874', // whatsapp
			
								// the body of the text message you'd like to send
								'body' => $data_request["mensaje"]
							]
						);

					}

					

				}
			}
			
			/******** */

        }catch(RestException $e){
        
           print_r($e); 
        }
        
    }

    public function send_whatsapp($data_request)
    {
        $client = new Client($this->sid, $this->token);            

        try{

			
			/**** ARRAY NUMBERS */
			$array_numero = [];
			
			$numero_more = explode(",", $data_request["numero_destino"]);

			if(count($numero_more) > 0)
			{
				foreach ($numero_more as $numero) {

					if(strlen($numero) == 9)
					{

						$client->messages->create(

							'whatsapp:+51'.$numero,
							[
								'from' => 'whatsapp:'.$this->numero, 
								'body' => $data_request["mensaje"]
							]
						);
					}

				}
			}
  

        }catch(RestException $e){
            print_r($e);
        }

    }
		
}
