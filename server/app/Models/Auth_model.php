<?php namespace App\Models;

use CodeIgniter\Model;

class Auth_model extends Model
{
    public function check()
    {
      $received_Token = $this->request->getServer('HTTP_TOKEN');
		
      if($received_Token == 'null' or $received_Token == '')
      {
        return $this->respond(['mensaje' => 'Sesión no encontrada'], 401);
        exit;
      }
      
      $jwtData = $this->CreatorJwt->DecodeToken($received_Token);

      if(is_numeric($jwtData["uniqueId"]))
      {
        $Usuario_m = new Usuario_model;
        $usuario = $Usuario_m->where('tipo', $jwtData["role"])
        ->where('login_date', $jwtData["timeStamp"])
        ->where('token', $received_Token)
        ->where('id', $jwtData["uniqueId"])
        ->first();

        if(is_object($usuario))
        {
          define("ID_USUARIO", $usuario->id);
        }
      }
      else
      {
        return $this->respond(['mensaje' => 'Sesión no encontrada'], 401);
        exit;
      }
    }
}
