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
      <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="table-inner ui-resizable" width="600" style="max-width: 600px;" border="0" align="center" cellpadding="0" cellspacing="0">
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
                <td data-color="Content" data-size="Content" mc:edit="switch-2" align="center" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 13px;color: #4a4a4a;"> Soporte al Cliente
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
      <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="table-inner ui-resizable" width="600" style="max-width: 600px;" border="0" align="center" cellpadding="0" cellspacing="0">
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
                            <td data-color="Header" data-size="Header" mc:edit="switch-3" class="fallback-font" align="left" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 34px;color: #FFFFFF;">
                              <singleline label="title">Ticket #<?= $cliente->numero; ?></singleline>
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
      <table class="table-inner ui-resizable" width="600" style="max-width: 600px; margin-top:10px;" border="0" align="center" cellpadding="0" cellspacing="0">    
              <!--image-->
            <tbody>
              <tr>
                <td data-color="Title" data-size="Title" mc:edit="switch-57" class="fallback-font" align="left" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 20px;color: #122333; font-weight: bold;">
                  <singleline label="title">Hola <?= $cliente->nombre; ?>,</singleline>
                </td>
              </tr>
              <?php if($estado->fl_inicio == 1): ?>
              <tr>
                <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                  <multiline label="content">Felicitaciones tu ticket ha sido registrado correctamente, te estaremos notificando por este medio cuando el personal especializado esté atendiendo tu ticket, te recordamos que la atención de los tickets es en forma de llegada y estaremos haciendo lo mejor posible para atender a todos nuestros clientes.</multiline>
                </td>
              </tr>
              <?php else: ?>

              <tr>
                <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                  <multiline label="content">Tenemos nuevas noticias sobre tu ticket</multiline>
                </td>
              </tr>

              <?php endif; ?>
              
              <!--end title-->
              <tr>
                <td height="15"></td>
              </tr>
              <tr>
                <td data-color="Title" data-size="Title" mc:edit="switch-57" class="fallback-font" align="left" style="font-family:'Montserrat', Arial, 'sans-serif'; font-size: 14px;color: #122333; font-weight: bold;">
                  <singleline label="title">ESTADO : <span style="padding:5px; border-radius:8px; background-color:<?= $estado->color_bg; ?>; color:<?= $estado->color_text; ?>;"><?= $estado->nombre; ?></span></singleline>
                </td>
              </tr>
              <tr>
                <td height="15"></td>
              </tr>
              <!--content-->
              <?php if($estado->fl_inicio_atencion == 1): ?>
              <tr>
                <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                  <multiline label="content">En estos momentos tu ticket está siendo atendido por el personal de soporte especializado, cualquier duda que se encuentre en el detalle del ticket el personal estará contactándose con Ud. mediante los canales de comunicación establecidos.</multiline>
                </td>
              </tr>
              <?php endif; ?>

              <!--end content-->
              <tr>
                <td height="15"></td>
              </tr>

              <?php if($estado->observacion != null and $estado->observacion != ''): ?>
              <tr>
                <td mc:edit="switch-58" align="left" style="font-family:'Open Sans', Arial, 'sans-serif'; font-size: 14px;color: #122333; line-height: 28px;">
                    <div><strong>Mensaje de Soporte:</strong></div>
                    <multiline label="content"><?= $estado->observacion; ?></multiline>
                </td>
              </tr>
              <?php endif; ?>

              <!--end content-->
              <tr>
                <td height="15"></td>
              </tr>

            </tbody></table>
    </td>
  </tr>
</tbody></table>



</div>
</body>
</html>