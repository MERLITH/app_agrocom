<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div data-template-type="html" align="center" style="height: auto; padding-bottom: 149px; border: 3px solid rgb(126, 124, 124);border-top:10px solid #D4102F; border-radius: 30px;" class="ui-sortable">
<table data-module="header-bar" data-bgcolor="Main BG" class="full" bgcolor="#FFFFFF" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="border-radius: 30px;">
  <tbody>
    <tr>
      <td data-border-color="Top Border" data-border-size="Top Border" align="center" style="border: 1px solid rgb(126, 124, 124);border-width: 0px 0px 1px 0px;">
        <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="table-inner ui-resizable" width="600" style="max-width: 600px;" border="0" align="center" cellpadding="0" cellspacing="0">
          <tbody><tr>
            <td height="35"></td>
          </tr>
          <tr>
            <td style="vertical-align: middle; padding-bottom: 20px;">
              <!--logo-->
              <table class="table-full" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td align="center" style="line-height: 0px;vertical-align: middle;"><img label="image" src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_login3.png" alt="img" width="200" style="display:block; line-height:0px; font-size:0px; border:0px;" mc:edit="switch-1"></td>
                  </tr>
                </tbody>
              </table>

            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
  </tbody>
</table>


<table data-module="header-left-1" data-bgcolor="Main BG" mc:repeatable="layout" mc:hideable="" mc:variant="header left" class="full" bgcolor="#FFFFFF" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
  <tbody><tr>
    <td align="center">
      <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div>
      <table class="table-inner ui-resizable" width="600" style="max-width: 600px;" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td align="center" style="line-height: 0px;vertical-align: middle;"><img label="image" src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/sobro_dinero.png"  width="350" alt="img" style="display:block; line-height:0px; font-size:0px; border:0px;" mc:edit="switch-1"></td>
          </tr>
        </tbody>
      </table>
      <table class="table-inner ui-resizable" width="600" style="max-width: 600px; margin-top:10px;" border="0" align="center" cellpadding="0" cellspacing="0">    
              <!--image-->
          <tbody>
            <tr>
              <td data-color="Title" data-size="Title" mc:edit="switch-57" class="fallback-font" align="center" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 20px;color: #122333; font-weight: bold; border-radius: 30px;">
                <singleline label="title" style="font-size: 40px !important;">Ups!</singleline><br>
                <singleline label="title" style="font-size: 30px !important; color: #D4102F;">RENDICIÓN DE GASTOS : RUTA</singleline>
              </td>
            </tr>
            <tr>
              <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                <div><span style="font-size: 20px;">Alerta, sobró una parte del reembolso debido a que el siguiente conductor no gastó en su totalidad el monto que se le fue asignado. <br>BANCO-LIMA: <?= $data->agencia.' | S/ '.$data->importe_agencia; ?>.</span></div><br>
                <div style="font-size: 20px;"><span style="font-size: 20px; font-weight: bold;">Conductor: </span> <?= $data->conductor; ?></div> 
                <div style="font-size: 20px;"><span style="font-size: 20px; font-weight: bold;">Manifiesto: </span> <?= $data->manifiesto; ?></div><br> 
                <div style="font-size: 20px;"><span style="font-size: 20px; font-weight: bold;">Más detalles </span>
              </td>
            </tr>
            <tr>
              <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                <table style="width: 100%;" cellpadding="0" cellspacing="0">
                  <thead style="background-color: #D4102F;">
                    <tr>
                      <th style="width: 23%; color: #fff;text-align: right;border-radius: 10px 0px 0px 0px;">Desembolso</th>
                      <th style="width: 23%;color: #fff;text-align: right;">Gasto</th>
                      <th style="width: 23%;color: #fff;text-align: right;">Saldo</th>
                      <th style="width: 31%;color: #fff;text-align: center;border-radius: 0px 10px 0px 0px;">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align: right;border: 1px solid #D4102F; border-width: 0px 0px 1px 1px;border-radius: 0px 0px 0px 10px;">S/ <?= $data->desembolso; ?></td>
                      <td style="text-align: right;border: 1px solid #D4102F; border-width: 0px 0px 1px 0px;">S/ <?= $data->gasto; ?></td>
                      <td style="text-align: right;border: 1px solid #D4102F; border-width: 0px 0px 1px 0px;">S/ <?= $data->saldo; ?></td>
                      <td style="text-align: center;border: 1px solid #D4102F; border-width: 0px 1px 1px 0px;border-radius: 0px 0px 10px 0px;">
                        <small style="background-color: rgba(250,92,124,.25)!important; color: rgb(250,92,124); padding: 5px; border-radius: 6px;">INCOMPLETO</small>
                      </td>
                    </tr>
                  </tbody>

                </table>  
              </td>
            </tr>
            <tr>
              <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                <br><div style="font-size: 20px;"><span style="font-size: 20px; font-weight: bold;">Comentario: </span> <?= $data->comentario; ?></div> 
              </td>
            </tr>
          </tbody>
        </table>
    </td>
  </tr>
</tbody>
</table>



</div>
</body>
</html>