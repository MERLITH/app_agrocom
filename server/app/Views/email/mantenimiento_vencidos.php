<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div data-template-type="html" style="height: auto; padding-bottom: 149px;" class="ui-sortable">
 


  
<table data-module="header-bar" data-bgcolor="Main BG" class="full" bgcolor="#FFFFFF" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tbody><tr>
    <td data-border-color="Top Border" data-border-size="Top Border" align="center" style="border-top:5px solid #122333;">
      <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="table-inner ui-resizable" width="800" style="max-width: 800px;" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody><tr>
          <td height="35"></td>
        </tr>
        <tr>
          <td>
            <!--logo-->
            <table class="table-full" border="0" align="left" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td align="center" style="line-height: 0px;"><img editable="" label="image" src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_mail.png" alt="img" width="139" style="display:block; line-height:0px; font-size:0px; border:0px;" mc:edit="switch-1"></td>
              </tr>
            </tbody></table>
            <table class="table-full" border="0" align="right" cellpadding="0" cellspacing="0">
              <tbody>
              <tr>
                <td height="5"></td>
              </tr>
              <tr>
                <td data-color="Content" data-size="Content" mc:edit="switch-2" align="center" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 13px;color: #4a4a4a;"> 
                </td>
              </tr>
            </tbody></table>
            <!--end slogan-->
          </td>
        </tr>
      </tbody></table>
    </td>
  </tr>
</tbody></table>


<table data-module="header-left-1" data-bgcolor="Main BG" mc:repeatable="layout" mc:hideable="" mc:variant="header left" class="full" bgcolor="#FFFFFF" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
  <tbody><tr>
    <td align="center">
      <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="table-inner ui-resizable" width="800" style="max-width: 800px;" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <td data-bgcolor="Header BG" data-background="Header" background="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/bg_header_mail.png" bgcolor="#ed4c21" class="table-inner" style="background-size: cover; background-position: center center; border-radius: 5px; background-image: url(<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/bg_header_mail.png);" align="center">
            <table class="table-inner" width="570" align="center" border="0" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td>
                  <table width="350" border="0" align="left" cellpadding="0" cellspacing="0" class="table-full" style="margin-bottom:10px;">
                    <tbody><tr>
                      <td height="25"></td>
                    </tr>
                    <tr>
                      <td data-bgcolor="Header Content BG" bgcolor="#122333" style="border-radius: 5px; " align="center">
                        <table width="85%" border="0" align="center" cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td height="25"></td>
                          </tr>
                          <!--title-->
                          <tr>
                            <td data-color="Header" data-size="Header" mc:edit="switch-3" class="fallback-font" align="left" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 28px;color: #FFFFFF;">
                              <singleline label="title">MANTENIMIENTO DE VEHÍCULOS</singleline>
                            </td>
                          </tr>
                          <!--end title-->
                          <tr>
                            <td height="15"></td>
                          </tr>
                          <!--dash-->
                          <tr>
                            <td>
                              <table data-width="Dash" align="left" width="40" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                  <td data-bgcolor="Dash" bgcolor="#ed4c21" height="3"></td>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
                          <!--end dash-->
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                  <table align="right" border="0" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                      <td width="272" align="center"></td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody></table>

      <?php foreach ($vehiculos as $vehiculo) { ?>
        
        <table class="table-inner ui-resizable" width="800" style="max-width: 800px; margin-top:10px;" border="0" align="center" cellpadding="0" cellspacing="0">    
           <tbody>
              <tr>
                <td data-color="Title" data-size="Title" mc:edit="switch-57" class="fallback-font" align="left" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 20px;color: #122333; font-weight: bold;">
                  <singleline label="title"><?= $vehiculo->clase; ?> / <?= $vehiculo->placa; ?></singleline>
                  <div style="float:right; font-weight:100; font-size:24px;"><strong><?= $vehiculo->km_actual; ?>KM</strong></div> 
                </td>
              </tr>
              <tr>
                <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 12px;color: #122333; line-height: 24px;">
                  <table style="width:100%; border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">TIPO MANTENIMIENTO</th>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">ÚLTIMO MANTENIMIENTO</th>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">CICLO</th>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">PRÓXIMO MANT.</th>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">RESTANTE.</th>
                        <th style="padding: 1px; text-align: left; background-color: #1d333f; color: white;">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php foreach ($vehiculo->detalle_mantenimiento as $mantenimiento) { ?>
                        <tr>
                          <td><?= $mantenimiento->mantenimiento; ?></td>
                          <td><?= $mantenimiento->fecha_ultimo_mantenimiento; ?> <?= $mantenimiento->ultimo_mantenimiento; ?>KM</td>
                          <td><?= $mantenimiento->km_ciclo; ?>KM</td>
                          <td><?= $mantenimiento->km_proximo; ?>KM</td>
                          <td><?= $mantenimiento->km_restante; ?>KM</td>
                          <td><?= $mantenimiento->estado; ?></td>
                        </tr>
                      <?php } ?>
                    </tbody>                    
                  </table> 
                </td>
              </tr>
              <!--end content-->
              <tr>
                <td height="15"></td>
              </tr>
            </tbody>
       </table>

      <?php } ?>
      
    </td>
  </tr>
</tbody></table>



</div>
</body>
</html>