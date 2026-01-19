<?php 

$data = json_decode($data);

?>




<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body
    style="margin: 0; padding: 0 !important; font-family: Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 400;">
    <div style="display: flex; justify-content: center; background-color: #f1f1f1;width: 100%; height: 100%; ">
        <div style="background-color: #fff;width: 600px; height:100vh;">
            <table cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse !important;">
                <tr>
                    <td valign="top" style="text-align: center; padding: 1em 3em 1em 3em;">
                        <a href="#"><img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_envio.png" alt="halcourier" style="width: 200px;"></a>
                    </td>
                </tr>
                <tr>
                    <td valign="top" style="padding: 1em 3em 1em 3em;">
                        <div
                            style="width: 100%;background-color: #0F2B44; border-radius: 20px; text-align: center; padding-top: 70px; padding-bottom: 70px;">
                            <span style="color: #fff; font-size: 45px; font-weight: bold;line-height: 1;">¡Estimado
                                Cliente!</span> <br>
                            <span style="color: #fff; font-size: 30px; font-weight: bold;line-height: 1;"><?= $data->text; ?></span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td valign="middle" style="padding: 1em 3em 1em 3em;">
                        <div
                            style="width: 100%;background-color: #D51030; border-radius: 20px; text-align: center; padding-top: 5px; padding-bottom: 5px;">
                            <span style="color: #fff; font-size: 25px; font-weight: bold;line-height: 1;">Número de
                                orden: <?= $data->numero_orden; ?></span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td valign="middle" style="padding: 0em 3em 0em 3em;">
                        <div
                            style="width: 100%;text-align: center; padding-top: 5px; padding-bottom: 5px; border: 0px;">
                            <span style="color: #0F2B44; font-size: 23px; font-weight: bold;line-height: 1;">Puedes
                                hacer el seguimiento de tu carga <a href="<?= $_ENV['BASE_URL_SEGUIMIENTO']; ?>" target="_blank"><u
                                        style="color: #D51030;">aquí</u></a></span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td valign="middle" style="padding: 2em 3em 0em 3em;">
                        <div class="wrapper"
                            style="width: 100%;text-align: center; padding-top: 20px; padding-bottom: 1px; border: 0px;">
                            <span style="color: #D51030; font-size: 35px; font-weight: bold;line-height: 1;">ESTADO DE
                                TU ENVÍO</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td valign="middle" style="text-align: center;padding: 2em 3em 0em 3em;">

                    <?php if($data->tipo == 'orden'){ ?>

                        <img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/estado_envio_1.png" alt="Estado 1" style="width: 500px;">

                     <?php } ?>

                     <?php if($data->tipo == 'manifiesto'){ ?>

                        <img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/estado_envio_2.png" alt="Estado 2" style="width: 500px;">

                     <?php } ?>

                     <?php if($data->tipo == 'desembarque'){ ?>

                        <img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/estado_envio_3.png" alt="Estado 3" style="width: 500px;">

                     <?php } ?>

                     <?php if($data->tipo == 'entrega'){ ?>

                        <img src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/estado_envio_4.png" alt="Estado 4" style="width: 500px;">

                     <?php } ?>

                    </td>
                </tr>

            </table>

        </div>
    </div>
</body>

</html>