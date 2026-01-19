<?php include_once('assets/home/home_arriba.php');?>

    <!-- Newsletter -->
    <div class="cards">
        <div class="container">
            <div class="row">
                <div class="col-lg-12" style="text-align: center;">
                    <h2>REGISTRAR ENVÍO</h2>
                </div>
                <div class="col-lg-12">
                    <div class="stepper-wrapper">
                        <div class="stepper-item completed">
                          <div class="step-counter"><i style="color: #fff; font-size: 2rem;" class="fas fa-user-alt"></i></div>
                          <div class="step-name" style="text-align: center">Datos personales</div>
                        </div>
                        <div class="stepper-item completed">
                          <div class="step-counter"><i style="color: #fff; font-size: 2rem;" class="fas fa-edit"></i></div>
                          <div class="step-name" style="text-align: center">Confirmar tus datos</div>
                        </div>
                        <div class="stepper-item completed active">
                          <div class="step-counter"><i style="color: #fff; font-size: 2rem;" class="fas fa-check-circle"></i></div>
                          <div class="step-name" style="text-align: center">Pedido registrado</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <!-- Card -->
                    <div class="card" style="width: 50rem; background-color: rgb(1, 53, 154, .20); padding-top: 40px; padding-bottom: 0px;">
                       <div class="card-body">
                            <i class="fas fa-check-circle"></i>
                            <p style="color: #01359A;">Tu envío se registró correctamente. Pasaremos a evaluar
                            su pedido lo más pronto posible y a ponernos en contacto, gracias por su elección.</p><br>
                       </div>
                   </div>
                   <!-- end of card -->
               </div>
               <div class="col-lg-12 text-center">
                    <a class="btn-solid-lg page-scroll" href="elegir_envio" style="padding: 10px;"><i style="color: #fff; font-size: 1rem;" class="fas fa-arrow-left"></i> VOLVER A INICIO</a>
               </div>
               
               <div class="col-lg-12" style="padding-top: 0px; display: none;">
                    <!-- Card -->
                    <div class="card" style="width: 50rem;padding-top: 10px;">
                        <div class="card-body" style="padding-top: 0px; padding-bottom: 0px;">
                            <h4 class="card-title">Resumen de tu registro</h4>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td style="border-top: none; text-align: left;">Cantidad de envíos:</td>
                                        <td style="border-top: none; text-align: right;">1</td>
                                    </tr>
                                    <tr>
                                        <td style="border-top: none;text-align: left;">Sub total:</td>
                                        <td style="border-top: none;text-align: right;">S/ 55.00</td>
                                    </tr>
                                    <tr>
                                        <td style="border-top: none;text-align: left;">IGV:</td>
                                        <td style="border-top: none;text-align: right;">S/ 5.00</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th style="text-align: left;">Total</th>
                                        <th style="text-align: right; color:#01359A">S/ 60.00</th>
                                    </tr>

                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <!-- end of card -->
                </div>
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of form-2 -->
    <!-- end of newsletter -->

<?php include_once('assets/home/home_abajo.php');?>
