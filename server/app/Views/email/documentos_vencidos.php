<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color:#ccc;">
    <div style="border:solid; border-width:1px; border-color:#114f8c; padding:10px; margin:auto; max-width:800px; border-radius:10px; font-family:Tahoma; color:#333333; background-color:#fff;">
        

        <div align="center" style="float:left;"><img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_login.png" style="width:80px;"></div>
        <div style="text-align:center; color:#000; margin-top:10px; font-size:18px;"><strong style="color:#114f8c">NOTIFICACIONES</strong></div>

        <div style="margin-top:40px; font-size:14px;"><strong>DOCUMENTOS DE PERSONAL</strong></div>
        <div style="font-size:11px;">
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th style="text-align:left;">NOMBRE Y APELLIDOS</th>
                        <th style="text-align:left;">DOCUMENTO</th>
                        <th style="text-align:left;">FECHA VENCIMIENTO</th>
                        <th style="text-align:center;">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    <?php   foreach ($personal as $row): ?>
                    <tr>
                        <td style="text-align:left;"><?= $row->personal; ?></td>
                        <td style="text-align:left;"><?= $row->documento_tipo; ?> <?= $row->documento; ?></td>
                        <td style="text-align:left;"><?= date("d/m/Y", strtotime($row->fecha_vencimiento)); ?></td>
                        <td style="text-align:center;"><?= $row->estado; ?></td>
                    </tr>                    
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div style="margin-top:20px; font-size:14px;"><strong>DOCUMENTOS DE VEHÍCULOS</strong></div>
        <div style="font-size:11px;">
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th style="text-align:left;">VEHÍCULO</th>
                        <th style="text-align:left;">DOCUMENTO</th>
                        <th style="text-align:left;">FECHA VENCIMIENTO</th>
                        <th style="text-align:center;">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    <?php   foreach ($vehiculo as $row): ?>
                    <tr>
                        <td style="text-align:left;"><?= $row->vehiculo; ?></td>
                        <td style="text-align:left;"><?= $row->documento_tipo; ?> <?= $row->documento; ?></td>
                        <td style="text-align:left;"><?= date("d/m/Y", strtotime($row->fecha_vencimiento)); ?></td>
                        <td style="text-align:center;"><?= $row->estado; ?></td>
                    </tr>                    
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <div style="text-align:center; margin-top:10px; font-weight:bold; font-size:14px;">Copyright &copy; Todos los derechos reservados <a href="https://titanicsoft.com/" style="text-decoration:none; color:#000;">TitanicSoft</a></div>
    </div>
</body>
</html>