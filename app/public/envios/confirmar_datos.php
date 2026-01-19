<?php include_once('assets/home/home_arriba.php');?>

    <div id="main">
        <!-- Newsletter -->
        <div class="form-2" style="height: 100%;">
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
                            <div class="stepper-item completed active">
                            <div class="step-counter"><i style="color: #fff; font-size: 2rem;" class="fas fa-edit"></i></div>
                            <div class="step-name" style="text-align: center">Confirmar tus datos</div>
                            </div>
                            <div class="stepper-item">
                            <div class="step-counter"><i style="color: #fff; font-size: 2rem;" class="fas fa-check-circle"></i></div>
                            <div class="step-name" style="text-align: center">Pedido registrado</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <!-- Form Save -->
                        <form name="save" id="save">
                            <div class="row">
                                <div class="col-md-12" style="text-align: right; display: none;">
                                    <a style="height: 20px; padding: 1rem 2rem 2rem 2rem;; text-align: center;" class="btn-solid-lg page-scroll" href="registrar_envio.php"><i class="fas fa-plus"></i> Agregar envíos</a>
                                </div>
                                <div class="col-md-12">
                                    <h4 class="card-title">Resumen de envíos registrados</h4>
                                </div>
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Acción</th>
                                                <th scope="col"># Orden</th>
                                                <th scope="col">Origen</th>
                                                <th scope="col">Envía</th>
                                                <th scope="col">Telefono</th>
                                                <th scope="col">Recibe</th>
                                                <th scope="col">Teléfono</th>
                                                <th scope="col">Tipo de entrega</th>
                                                <th scope="col">Destino</th>
                                                <th scope="col">Dirección</th>
                                                <th scope="col">Contenido</th>
                                                <th scope="col">Cant. bultos</th>
                                                
                                            </tr>
                                            </thead>
                                            <tbody name="detalle">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-12" style="text-align: center;padding-top: 20px;" data-contenedor="confirmar">
                                    <div class="form-group">
                                        <button style="width: 40%;" type="submit" name="submit" class="form-control-submit-button">CONFIRMAR</button>
                                    </div>
                                </div>

                                <div class="col-md-12" style="text-align: center;padding-top: 20px;" data-contenedor="regresar">
                                    <div class="form-group">
                                        <a class="btn-solid-lg page-scroll" href="registrar_envio" style="padding: 15px;"><i style="color: #fff; font-size: 1rem;" class="fas fa-arrow-left"></i> Regresar</a>
                                    </div>
                                </div>
                                
                            </div>

                        </form>
                        <!-- end of contact form -->
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of form-2 -->
        <!-- end of newsletter -->


        
        <!-- MODAL EDITAR -->
        <div class="modal inmodal fade" name="modal-edit" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title">EDITAR ORDEN DE ENVÍO</h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>    
                    </div> 
                    <form name="save-edit" id="save-edit">
                        <div class="modal-body" style="max-height:550px; overflow:auto;">
                            
                                <div class="row" data-contenedor="row_1">
                                    <div class="col-md-12">
                                        <h4 class="card-title">1. ¿Cuál es el origen de tu envío?</h4>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <select style="width: 100%" class="form-control-select"  name="id_lugar_origen" data-select="LUGAR_ORIGEN" required></select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row" data-contenedor="row_2" >
                                    <div class="col-md-12">
                                        <h4 class="card-title">2. ¿Quién envía?</h4>
                                    </div>
                                    <div class="col-md-12" style="display: none;">
                                        <div class="form-group">
                                            <input type="hidden" name="id_remitente" class="form-control-input" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <select class="form-control-input"  name="id_documento_remitente" data-select="DOCUMENTO_ENTIDAD" id="cname" required></select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" name="numero_documento_remitente" class="form-control-input" id="numero_documento_remitente" autocomplete="off" required>
                                            <label class="label-control" for="numero_documento_remitente">Número de documento</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" name="empresa_remitente" class="form-control-input" id="empresa_remitente" autocomplete="off" required>
                                            <label class="label-control" for="empresa_remitente">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" name="email_remitente" class="form-control-input" id="email_remitente" autocomplete="off">
                                            <label class="label-control" for="email_remitente">Email (opcional)</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" name="telefono_remitente" class="form-control-input" id="telefono_remitente" autocomplete="off">
                                            <label class="label-control" for="telefono_remitente">Teléfono</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style="text-align: right;">
                                        <div class="form-group">
                                            <button style="width: 40%; display: none;" name="continuar_row_2" type="button" class="form-control-submit-button">CONTINUAR</button>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row" data-contenedor="row_3" >
                                    <div class="col-md-12">
                                        <h4 class="card-title">3. ¿Quién recibe?</h4>
                                    </div>
                                    <div class="col-md-12" style="display: none;">
                                        <div class="form-group">
                                            <input type="hidden" name="id_destinatario" class="form-control-input" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <select class="form-control-select" name="id_documento_destinatario" data-select="DOCUMENTO_ENTIDAD" id="cname" required></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <input type="text" name="numero_documento_destinatario" class="form-control-input" id="numero_documento_destinatario" autocomplete="off" required>
                                            <label class="label-control" for="numero_documento_destinatario">Número de documento</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <input type="number" name="telefono_destinatario" class="form-control-input" id="telefono_destinatario" autocomplete="off" required/>
                                            <label class="label-control" for="telefono_destinatario">Teléfono</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" name="empresa_destinatario" class="form-control-input" id="empresa_destinatario" autocomplete="off" required/>
                                            <label class="label-control" for="empresa_destinatario">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style="text-align: right;">
                                        <div class="form-group">
                                            <button style="width: 40%; display: none;" name="continuar_row_3" type="button" class="form-control-submit-button">CONTINUAR</button>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row" data-contenedor="row_4" >
                                    <div class="col-md-12">
                                        <h4 class="card-title">4. ¿Qué envías?</h4>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Artículo</th>
                                                    <th scope="col">Contenido</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Valor declarado</th>
                                                    <th scope="col">Bultos</th>
                                                    <th scope="col">Tipo contenido</th>
                                                    <th scope="col">Tamaño bulto</th>
                                                    <th scope="col">Precio</th>
                                                    <th scope="col">Importe</th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody name="detalle-item">
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style="text-align: right;">
                                        <div class="form-group">
                                            <label style="font-weight: bold;">TOTAL BULTOS: &nbsp;<span name="total-bultos">0</span></label><br>
                                            <label style="font-weight: bold;">PRECIO UNITARIO: $&nbsp;<span name="total-precio">0.00</span></label><br>
                                            <label style="font-weight: bold;">TOTAL IMPORTE: $&nbsp;<span name="total-importe">0.00</span></label>
                                        </div>
                                    </div>
        
                                    <div class="col-md-12" style="text-align: center;padding-top: 10px;">
                                        <div class="form-group">
                                            <button type="button" name="agregar" style="width: 40%;border-radius: 20px;" class="btn btn-outline-success">AGREGAR <i class="fas fa-plus-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                    
                                <div class="row" data-contenedor="row_5" >
                                    <div class="col-md-12">
                                        <h4 class="card-title">5. ¿Cuál es el destino de tu paquete?</h4>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <select class="form-control-input" name="id_tipo_entrega" required>
                                                <option value="">Tipo de entrega...</option>
                                                <option value="1">PUERTA A SUCURSAL</option>
                                                <option value="2">PUERTA A PUERTA</option>
                                                <option value="3">SUCURSAL A SUCURSAL</option>
                                                <option value="4">SUCURSAL A PUERTA</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <select style="width: 100%" class="form-control-select"  name="id_lugar_destino" data-select="LUGAR_DESTINO" required></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-contenedor="direccion_destinatario">
                                        <div class="form-group">
                                            <input type="text" name="direccion_destinatario" class="form-control-input" id="direccion_destinatario" autocomplete="off">
                                            <label class="label-control" for="direccion_destinatario">Dirección destinatario completa</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-contenedor="coordenada_geografica_destinatario">
                                        <div class="input-group mb-2 mr-sm-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                                            </div>
                                            <input type="text" class="form-control" name="coordenada_geografica_destinatario" placeholder="Escribir latitud y longitud">
                                            <div class="input-group-prepend">
                                                <button type="button" name="extraer_ubicacion_destinatario" style="text-decoration: none;" class="btn btn-outline-success"><i class="fas fa-search-location"></i> Extraer ubicación</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-contenedor="direccion_remitente">
                                        <div class="form-group">
                                            <input type="text" name="direccion_remitente" class="form-control-input" id="direccion_remitente" autocomplete="off">
                                            <label class="label-control" for="direccion_remitente">Dirección remitente completa</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-contenedor="coordenada_geografica_remitente">
                                        <div class="input-group mb-2 mr-sm-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                                            </div>
                                            <input type="text" class="form-control" name="coordenada_geografica_remitente" placeholder="Escribir latitud y longitud">
                                            <div class="input-group-prepend">
                                                <button type="button" name="extraer_ubicacion_remitente" style="text-decoration: none;" class="btn btn-outline-success"><i class="fas fa-search-location"></i> Extraer ubicación</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" name="referencia_destinatario" class="form-control-input" id="referencia_destinatario" autocomplete="off">
                                            <label class="label-control" for="referencia_destinatario">Referencias de entrega(opcional)</label>
                                        </div>
                                    </div>  
                                </div>
                                <div class="row" data-contenedor="row_6" >
                                    <div class="col-md-12">
                                        <h4 class="card-title">6. Forma de pago</h4>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <select name="tipo_pago" class="form-control select" autocomplete="off" required>
                                                <option value="">Seleccione...</option>                                                                
                                                <option value="CONTRAENTREGA">CONTRAENTREGA</option>
                                                <option value="CONTADO">CONTADO (PAGADO)</option>
                                                <option value="CREDITO">CREDITO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                        </div>                        
                        <div class="modal-footer" align="center" style="display:block" >
                            <button type="submit" name="submit-edit" class="form-control-submit-button" style="width: 400px;">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- MODAL ITEMS -->
        <div class="modal inmodal fade" name="modal-item" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title">Agregar un artículo</h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>    
                    </div>
                    <div class="modal-body">
                        <form id="modal-item-form">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="form-control-select" data-name="id_articulo" data-select="ARTICULO" id="cname" required></select>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" data-name="contenido" class="form-control-input" id="contenido" autocomplete="off" required>
                                        <label class="label-control" for="contenido">Contenido</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number" data-name="valor" class="form-control-input" id="valor" autocomplete="off" required>
                                        <label class="label-control" for="valor">Valor declarado</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number" data-name="bultos" class="form-control-input" id="bultos" autocomplete="off" required>
                                        <label class="label-control" for="bultos" id="lbl-bultos">Cantidad de bultos</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="form-control-select" data-name="tipo_contenido" required>
                                            <option value="">Tipo de contenido...</option>
                                            <option value="REGULAR">REGULAR</option>
                                            <option value="FRAGIL">FRÁGIL</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="form-control-select" data-name="tamano_bulto" required>
                                            <option value="">Tamaño de bulto...</option>
                                            <option value="PEQUEÑA">PEQUEÑA</option>
                                            <option value="MEDIANA">MEDIANA</option>
                                            <option value="GRANDE">GRANDE</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number" style="background-color: rgb(230, 228, 228);" data-name="precio" class="form-control-input" id="precio" autocomplete="off" required readonly/>
                                        <label class="label-control" for="precio">Precio unitario</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number" style="background-color: rgb(230, 228, 228);" data-name="importe" class="form-control-input" id="importe" autocomplete="off" required readonly/>
                                        <label class="label-control" for="importe">Importe</label>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="text" data-name="descripcion" class="form-control-input" id="descripcion" autocomplete="off">
                                        <label class="label-control" for="descripcion">Descripción</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-md-12" style="display: none;">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="fl_opcional">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Opcional
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3" data-ocultar="opcional" style="display: none;">
                                    <div class="form-group">
                                        <input type="number" data-name="largo" class="form-control-input" id="largo" autocomplete="off" required>
                                        <label class="label-control" for="largo">Largo (cm)</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-3" data-ocultar="opcional" style="display: none;">
                                    <div class="form-group">
                                        <input type="number" data-name="ancho" class="form-control-input" id="ancho" autocomplete="off" required>
                                        <label class="label-control" for="ancho">Ancho (cm)</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-3" data-ocultar="opcional" style="display: none;">
                                    <div class="form-group">
                                        <input type="number" data-name="altura" class="form-control-input" id="altura" autocomplete="off" required>
                                        <label class="label-control" for="altura">Altura (cm)</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-3" data-ocultar="opcional" style="display: none;">
                                    <div class="form-group">
                                        <input type="number" data-name="peso" class="form-control-input" id="peso" autocomplete="off" required>
                                        <label class="label-control" for="peso">Peso (Kg)</label>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>                        
                    <div class="modal-footer" align="center" style="display:block" >
                        <button type="button" name="agregar_item" class="btn btn-primary">Agregar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL DELETE -->
        <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title">Eliminar Orden de envío</h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>    
                    </div> 
                    <form name="delete" id="delete">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <i class="fa fa-trash-alt fa-4x"></i><br/>
                                </div>
                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                    <label class="form-label">class="form-label"><input type="checkbox" name="confirmacion" required/>
                                        Confirmo realizar la eliminación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">
        
                                </div>
                            </div>
                        
                        </div>  
                        <div class="modal-footer" align="center" style="display:block" >
                            <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                            <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>

        
        <!-- MODAL GOOGLE MAPS -->
        <div class="modal inmodal fade" name="modal-map" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title">Google Maps</h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>    
                    </div> 
                    <div class="modal-body">

                        <form name="map">

                            <input type="hidden" name="tipo_cliente" class="form-control" autocomplete="off">

                            <div class="row" id="mapa_dom">
                                <div class="col-md-12">
                                    <h4 style="margin:0; margin-bottom:10px; font-weight:bold;">Ubicación Geográfica</h4>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group" style="margin-bottom:0px;">
                                        <span class="input-group-addon" style="width:100px;">Latitud</span>
                                        <input type="text" name="mapa_latitud" class="form-control" autocomplete="off" >
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-addon" style="width:100px;">Longitud</span>
                                        <input type="text" name="mapa_longitud" class="form-control" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-6"> 
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <button type="button" name="get_coordenadas" class="btn btn-default" style="padding:8px 12px; "><i class="fa fa-search fa-2x"></i> <br> Coordenadas</button>                       
                                        </div>
                                        <div class="col-xs-6">
                                            <button type="button" name="get_locacion" class="btn btn-default" style="padding:8px"><i class="fa fa-map-marker-alt fa-2x"></i> <br> Ubicación Actual</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" style="display:none;">
                                    <div class="form-group">
                                        <label class="form-label">class="form-label">class="form-label">Dirección </label>
                                        <input type="text" name="mapa_direccion" class="form-control" autocomplete="off" readonly>
                                    </div>
                                </div>            
                                <div class="col-md-12">
                                    <div>Ubicación en Mapa</div>
                                    <div id="mapCanvas" style="height:350px; margin-bottom:10px;"></div>
                                </div>
                            </div>
                        </form>

                        
                    </div>                        
                    <div class="modal-footer" align="center" style="display:block" >
                        <button type="button" name="capturar_coordenadas" class="btn btn-primary">CAPTURAR</button>
                    </div>
                </div>
            </div>
        </div>

    </div>


<?php include_once('assets/home/home_abajo.php');?>

<script>

    
    let DOM_ID = '#main'; 
    let DOM = $(DOM_ID); 

    /* VARIABLES PARA GOOGLE MAPS */
    let geocoder;
    let marker;
    let latLng;
    let latLng2;
    let map;
    /* ./FIN */
    
    let Componente = {

        id : null,
        array_articulo : [],
        array_cliente : [],
        total_bultos: 0,
        total_importe: 0,
        array_orden: [],

        get_table: function ()
        {
            let params = new URLSearchParams(location.search);
            var id = params.get('id');

            Componente.id = id;

            $.get('server/public/publico/envio/orden_envio/get_unique/'+id)
            .then(function (response) {

                if (response != '') {

                    Componente.array_orden = [response];
                    
                    let html = '';
                    let data = [response];
                    let item = 0;

                    data.forEach(row => {

                        item ++;

                        html += `
                            <tr data-json='`+JSON.stringify(row)+`'>
                                <td style="vertical-align:top;">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" title="Editar" name="row-edit" class="btn btn-warning" style="border-radius: 50px;"><i class="fas fa-pen"></i></button>
                                        <button type="button" title="Eliminar" name="row-delete" class="btn btn-danger" style="border-radius: 50px;"><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                                <td style="vertical-align:top;">`+row.serie + '-' + row.numero+`</td> 
                                <td style="vertical-align:top;">`+row.origen+`</td> 
                                <td style="vertical-align:top;">`+row.envia+`</td> 
                                <td style="vertical-align:top;">`+row.telefono_remitente+`</td>
                                <td style="vertical-align:top;">`+row.recibe+`</td>
                                <td style="vertical-align:top;">`+row.telefono_destinatario+`</td>
                                <td style="vertical-align:top;">`+row.tipo_entrega+`</td>
                                <td style="vertical-align:top;">`+row.destino+`</td>
                                <td style="vertical-align:top;">`+row.direccion_destinatario+`</td>
                                <td style="vertical-align:top;">`+row.contenidos+`</td>
                                <td style="vertical-align:top;">`+row.total_bultos+`</td>
                            </tr>
                        `;

                    });

                    $('tbody[name="detalle"]').html(html);

                }

                Componente.ocultar_button_confirmar();


            }).catch(error => {
                console.log(error);
            }); 
        },

        ocultar_button_confirmar: function ()
        {

            
            if ((Componente.array_orden).length > 0) {

                $('div[data-contenedor="confirmar"]').show();
                $('div[data-contenedor="regresar"]').hide();

            }else{

                $('div[data-contenedor="confirmar"]').hide();
                $('div[data-contenedor="regresar"]').show();

            }

        },


        /* TODOS LAS FUNCIONES NECESARIAS PARA EDITAR */

        edit: function(dom) {

            var tr = dom.parents('tr');
            var data_json = tr[0].dataset.json;
            let data = JSON.parse(data_json);
            console.log(data);

            

            let form = $('form[name="save-edit"]');

            /** DATA */
            HELPER.reset_form(form);

            $('tbody[name="detalle-item"]').html('');
            

            
            form.find('select[name="id_lugar_origen"]').val(data.id_lugar_origen).change();
            form.find('input[name="id_remitente"]').val(data.remitente.id);
            form.find('select[name="id_documento_remitente"]').val(data.remitente.id_documento).change();
            form.find('input[name="numero_documento_remitente"]').val(data.remitente.numero_documento);
            form.find('input[name="empresa_remitente"]').val(data.remitente.razon_social);
            form.find('input[name="email_remitente"]').val(data.remitente.email);
            form.find('input[name="telefono_remitente"]').val(data.remitente.telefono);
            form.find('input[name="id_destinatario"]').val(data.destinatario.id);
            form.find('select[name="id_documento_destinatario"]').val(data.destinatario.id_documento).change();
            form.find('input[name="numero_documento_destinatario"]').val(data.destinatario.numero_documento);
            form.find('input[name="telefono_destinatario"]').val(data.destinatario.telefono);
            form.find('input[name="empresa_destinatario"]').val(data.destinatario.razon_social);
            form.find('select[name="id_tipo_entrega"]').val(data.id_tipo_entrega).change();
            form.find('select[name="id_lugar_destino"]').val(data.id_lugar_destino).change();
            form.find('input[name="direccion_destinatario"]').val(data.direccion_destinatario);
            form.find('input[name="coordenada_geografica_destinatario"]').val(data.destinatario.coordenada_geografica);
            form.find('input[name="direccion_remitente"]').val(data.direccion_remitente);
            form.find('input[name="coordenada_geografica_remitente"]').val(data.remitente.coordenada_geografica);
            form.find('input[name="referencia_destinatario"]').val(data.direccion_referencia);
            form.find('select[name="tipo_pago"]').val(data.tipo_pago).change();


            /* ESTO SE APLICA DEBIDO QUE LA PLANTILLA NO FUNCIONA EL ESTILO CUANDO SE USA "VAL O VALUE" DESDE JAVASCRIPT */
            $('label[for="numero_documento_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="empresa_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="email_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="telefono_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="numero_documento_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="telefono_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="empresa_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="direccion_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="direccion_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            $('label[for="referencia_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
            /* ./ */



            data.detalle.forEach(row => {
                Componente.agregar_item(row);
            });


            this.id = data.id;

            $('div[name="modal-edit"]').modal('show');
        },

        delete: function(dom) {

            let accion = 'delete';
            let form = $('form[name="'+accion+'"]');

            /** DATA */
            HELPER.reset_form(form);

            var tr = dom.parents('tr');
            var data_json = tr[0].dataset.json;
            let data = JSON.parse(data_json);
            console.log(data);


            this.id = data.id;

            $('div[name="modal-'+accion+'"]').modal('show');
        },

            
        select_lugar_origen: function ()
        {
            let select = $('select[data-select="LUGAR_ORIGEN"]');
            select.append($('<option></option>').attr('value', '').text('Seleccione sucursal...'));

            $.get('server/public/publico/recursivo/get_select_lugar_origen')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });
            }).catch(error => {
                console.log(error);
            }); 
        },

        select_lugar_destino: function ()
        {
            let select = $('select[data-select="LUGAR_DESTINO"]');
            select.append($('<option></option>').attr('value', '').text('Seleccione territorio...'));

            $.get('server/public/publico/recursivo/get_select_lugar_destino')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });
            }).catch(error => {
                console.log(error);
            }); 
        },


        select_documento_entidad: function ()
        {
            let select = $('select[data-select="DOCUMENTO_ENTIDAD"]');
            select.append($('<option></option>').attr('value', '').text('Documento'));

            $.get('server/public/publico/recursivo/documento_entidad')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });
            }).catch(error => {
                console.log(error);
            }); 
        },

        select_articulo: function ()
        {
            let select = $('select[data-select="ARTICULO"]');
            select.append($('<option></option>').attr('value', '').text('Seleccione árticulo...'));

            $.get('server/public/publico/recursivo/articulo')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });

                Componente.array_articulo = response;

            }).catch(error => {
                console.log(error);
            }); 
        },

        validar_cliente: function ()
        {

            let form = $('form[name="validar_cliente"]');
            let nombre = form.find('input[name="nombre"]').val().trim().toUpperCase();
            let razon_social = form.find('input[name="razon_social_cliente"]').val();
            let email = form.find('input[name="email_cliente"]').val();

            if ((Componente.array_cliente).includes(nombre)){

                let form2 = $('form[name="save-edit"]');
                
                form2.find('input[name="empresa_remitente"]').val(razon_social);
                form2.find('input[name="empresa_remitente"]').focus();

                form2.find('input[name="email_remitente"]').val(email);
                form2.find('input[name="email_remitente"]').focus();        

                $('div[name="modal-validar_cliente"]').modal('hide');


            }else{

                HELPER.notificacion('El nombre ingresado no coincide con el registrado', 'warning');

            }

        },

        get_cliente: function (numero_documento = '', id_documento = '', tipo = '')
        {

            let form = $('form[name="save-edit"]');

            if (tipo == 'REMITENTE') {

                form.find('input[name="id_remitente"]').val('');
                form.find('input[name="empresa_remitente"]').val('');
                form.find('input[name="email_remitente"]').val('');
                form.find('input[name="telefono_remitente"]').val('');

            }else{

                form.find('input[name="id_destinatario"]').val('');
                form.find('input[name="empresa_destinatario"]').val('');
                form.find('input[name="telefono_destinatario"]').val('');

            }

            $.get('server/public/publico/busqueda/buscar_cliente?numero_documento='+numero_documento+'&id_documento='+id_documento)
            .then(function (response) {

                if (response != '') {

                
                    if (tipo == 'REMITENTE') {

                        form.find('input[name="id_remitente"]').val(response.id);
                        form.find('input[name="empresa_remitente"]').val(response.razon_social);
                        form.find('input[name="email_remitente"]').val(response.email);
                        form.find('input[name="telefono_remitente"]').val(response.telefono);

                        $('label[for="empresa_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                        $('label[for="email_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                        $('label[for="telefono_remitente"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                        
                    }else{

                        form.find('input[name="id_destinatario"]').val(response.id);
                        form.find('input[name="empresa_destinatario"]').val(response.razon_social);
                        form.find('input[name="telefono_destinatario"]').val(response.telefono);

                        $('label[for="empresa_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                        $('label[for="telefono_destinatario"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});

                    }

                }

                
            }).catch(error => {
                console.log(error);
            }); 

        },

        calculo_importe_item: () => {

            let form = $('form[id="modal-item-form"]');

            let bultos = form.find('input[data-name="bultos"]').val();
            let precio = form.find('input[data-name="precio"]').val();

            bultos = (bultos != '') ? bultos : 0;
            precio = (precio != '') ? precio : 0;

            let importe = bultos * precio;

            importe = HELPER.round(importe, 2);

            form.find('input[data-name="importe"]').val(importe);
        },

        calculo_importe_linea: async (codigo) => {

            let bultos = $('tr[data-codigo="'+codigo+'"] input[name="bultos"]').val();
            bultos =  parseFloat((bultos != '') ? bultos : 0);

            let precio_unitario = $('tr[data-codigo="'+codigo+'"] input[name="precio"]').val();
            precio_unitario = parseFloat((precio_unitario != '') ? precio_unitario : 0);

            let importe = bultos * precio_unitario;
            importe = Math.round((importe + Number.EPSILON) * 100) / 100;
            
            $('tr[data-codigo="'+codigo+'"] input[name="importe"]').val(importe.toFixed(2));

            Componente.calcular_importe_totales();
        },

        calcular_importe_totales: () =>{

            /*** ITEMS */
            let total_importe = 0;
            let total_bultos = 0;
            let total_precio = 0;

            $('tbody[name="detalle-item"] > tr').each(function(){

                let bultos = $(this).find('input[name="bultos"]').val();
                bultos = parseFloat((bultos != '') ? bultos : 0);

                let precio = $(this).find('input[name="precio"]').val();
                precio = parseFloat((precio != '') ? precio : 0);

                let importe = $(this).find('input[name="importe"]').val();
                importe = parseFloat((importe != '') ? importe : 0);

                total_importe = total_importe + parseFloat(importe);      
                total_bultos = total_bultos + parseFloat(bultos);
                total_precio = precio;

            });


            total_importe = Math.round(total_importe * 100) / 100;
            total_bultos = Math.round(total_bultos * 100) / 100;
            total_precio = Math.round(total_precio * 100) / 100;

            Componente.total_bultos = total_bultos;
            Componente.total_importe = total_importe;

            $('span[name="total-bultos"]').text(total_bultos.toFixed(2));
            $('span[name="total-precio"]').text(total_precio.toFixed(2));
            $('span[name="total-importe"]').text(total_importe.toFixed(2));
                

        },


        agregar_item: async (data = null) => {
        
            let codigo = Math.random().toString(36).substr(2);

            if(data == null)
            {
                data = {
                    id_articulo: $('select[data-name="id_articulo"]').val(),
                    contenido: $('input[data-name="contenido"]').val(),
                    descripcion: $('input[data-name="descripcion"]').val(),
                    bultos: $('input[data-name="bultos"]').val(),
                    tipo_contenido: $('select[data-name="tipo_contenido"]').val(),
                    tamano_bulto: $('select[data-name="tamano_bulto"]').val(),
                    valor: $('input[data-name="valor"]').val(),
                    precio: $('input[data-name="precio"]').val(),
                    importe: $('input[data-name="importe"]').val(),
                    largo: $('input[data-name="largo"]').val(),        
                    ancho: $('input[data-name="ancho"]').val(),       
                    altura: $('input[data-name="altura"]').val(),        
                    peso: $('input[data-name="peso"]').val(),    
                };
            }

            let option_articulo = '<option value="">Seleccione árticulo...</option>';

            Componente.array_articulo.forEach(row => {
                option_articulo += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            if($('input[name="fl_opcional"]').is((':checked')))
            {
                data.valor = '';
                data.largo = '';
                data.ancho = '';
                data.altura = '';
                data.peso = '';

            }

            let html = `
                <tr data-codigo="`+codigo+`">
                    <td style="vertical-align:top;">
                        <select style="width: 200px;" class="form-control-select" name="id_articulo">`+option_articulo+`</select>
                    </td> 
                    <td style="vertical-align:top;">
                        <input style="width: 100px;" type="text" name="contenido" class="form-control-input" value="`+data.contenido+`" autocomplete="off" />
                    </td>
                    <td style="vertical-align:top;">
                        <input style="width: 200px;" type="text" name="descripcion" class="form-control-input" value="`+data.descripcion+`" autocomplete="off" />
                    </td>  
                    <td style="vertical-align:top;">
                        <input style="width: 90px;" type="number" name="valor" class="form-control-input" value="`+data.valor+`" autocomplete="off" />
                    </td> 
                    <td style="vertical-align:top;">
                        <input style="width: 90px;" type="number" name="bultos" class="form-control-input" value="`+data.bultos+`" autocomplete="off" />
                    </td> 
                    <td style="vertical-align:top;">
                        <select style="width: 200px;" class="form-control-select" name="tipo_contenido">
                            <option value="">Tipo de contenido...</option>
                            <option value="REGULAR">REGULAR</option>
                            <option value="FRAGIL">FRÁGIL</option>
                        </select>
                    </td> 
                    <td style="vertical-align:top;">
                        <select style="width: 200px;" class="form-control-select" name="tamano_bulto">
                            <option value="">Tamaño de bulto...</option>
                            <option value="PEQUEÑA">PEQUEÑA</option>
                            <option value="MEDIANA">MEDIANA</option>
                            <option value="GRANDE">GRANDE</option>
                        </select>
                    </td> 
                    <td style="vertical-align:top;">
                        <input style="width: 90px; background-color: rgb(230, 228, 228);" type="number" step="any" name="precio" class="form-control-input" value="`+data.precio+`" autocomplete="off" readonly />
                    </td> 
                    <td style="vertical-align:top;">
                        <input style="width: 90px; background-color: rgb(230, 228, 228);" type="number" step="any" name="importe" class="form-control-input" value="`+data.importe+`" autocomplete="off" readonly />
                    </td> 
                    <td style="vertical-align:top; display: none;">
                        <input style="width: 90px;" type="number" name="largo" class="form-control-input" value="`+data.largo+`" autocomplete="off" />
                    </td>
                    <td style="vertical-align:top; display: none;">
                        <input style="width: 90px;" type="number" name="ancho" class="form-control-input" value="`+data.ancho+`" autocomplete="off" />
                    </td>
                    <td style="vertical-align:top; display: none;">
                        <input style="width: 90px;" type="number" name="altura" class="form-control-input" value="`+data.altura+`" autocomplete="off" />
                    </td>
                    <td style="vertical-align:top; display: none;">
                        <input style="width: 90px;" type="number" name="peso" class="form-control-input" value="`+data.peso+`" autocomplete="off" />
                    </td>
                    <td style="vertical-align:top;">
                        <button type="button" name="quitar-item" style="border-radius: 50%;" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;

            if (data.id_articulo != '') {

                $('tbody[name="detalle-item"]').append(html);
                $('tr[data-codigo="'+codigo+'"] select[name="id_articulo"]').val(data.id_articulo).change();
                $('tr[data-codigo="'+codigo+'"] select[name="tipo_contenido"]').val(data.tipo_contenido).change();
                $('tr[data-codigo="'+codigo+'"] select[name="tamano_bulto"]').val(data.tamano_bulto).change();
                $('div[name="modal-item"]').modal('hide');

            }else{

                HELPER.notificacion('Seleccione un artículo por favor', 'warning');

            }

            Componente.calcular_importe_totales();

            return codigo;
        },

        quitar_item: (dom) => {

            var tr = dom.parents('tr');
            var codigo = tr[0].dataset.codigo;

            $('tr[data-codigo="'+codigo+'"]').remove();

            Componente.calcular_importe_totales();


        },

        item_json: () => {

            let detalle = [];

            $('tbody[name="detalle-item"] tr').each(function(){

                if($(this).find('select[name="id_articulo"]').val() == '')
                {
                    HELPER.notificacion('Existe item sin Artículo', 'warning');
                    detalle = [];
                    return false;         
                }
                
                let item = {
                    id_articulo : $(this).find('select[name="id_articulo"]').val(),
                    contenido: $(this).find('input[name="contenido"]').val(),
                    descripcion: $(this).find('input[name="descripcion"]').val(),
                    valor: $(this).find('input[name="valor"]').val(),
                    bultos: $(this).find('input[name="bultos"]').val(),
                    tipo_contenido: $(this).find('select[name="tipo_contenido"]').val(),
                    tamano_bulto: $(this).find('select[name="tamano_bulto"]').val(),
                    largo: $(this).find('input[name="largo"]').val(),        
                    ancho: $(this).find('input[name="ancho"]').val(),       
                    altura: $(this).find('input[name="altura"]').val(),        
                    peso: $(this).find('input[name="peso"]').val(),
                    importe: $(this).find('input[name="importe"]').val(),
                    precio: $(this).find('input[name="precio"]').val(),
                };

                detalle.push(item);
            });

            return detalle;
        },

        get_tarifa: async () => {

            let parametro = {
                id_lugar_origen : $('select[name="id_lugar_origen"]').val(),
                id_lugar_destino : $('select[name="id_lugar_destino"]').val(),
                tipo_tarifa : 'CLIENTE-BULTO',
                tarifa_cliente : 'REMITENTE',
                id_cliente_tarifa : null,
            };

            let id_remitente = $('input[name="id_remitente"]').val();
            let id_destinatario = $('input[name="id_destinatario"]').val();

            if(id_remitente != '')
            {

                // VALIDAR CLIENTE SELECCIONADO SI ES OBLIGATORIO EN TARIFA
                if(parametro.tarifa_cliente != '')
                {
                    parametro.id_cliente_tarifa = null;

                    if(parametro.tarifa_cliente == 'REMITENTE')
                    {
                        parametro.id_cliente_tarifa = id_remitente;
                    }
                    else if(parametro.tarifa_cliente == 'DESTINATARIO')
                    {
                        parametro.id_cliente_tarifa = id_destinatario;  
                    }    
                
                }
                    
            
                $.get('server/public/publico/envio/orden_envio/tarifa_get?'+jQuery.param(parametro))
                .then(function (response) {

                    let precio = parseFloat(response.precio); 

                    $('input[data-name="bultos"]').val(1);
                    $('input[data-name="precio"]').val(precio.toFixed(2));
                    $('input[data-name="importe"]').val(precio.toFixed(2));

                    $('label[for="bultos"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                    $('label[for="precio"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                    $('label[for="importe"]').css({"top": "0.125rem", "opacity": "1", "font-size": "0.75rem", "font-weight": "700"});
                    
                    
                }).catch(error => {
                    console.log(error);
                });
                
                
            }   
            else
            {

                HELPER.notificacion('Debe ingresar el remitente para obtener las tarifas', 'warning');
                     
            }        

        },

        change_tipo_entrega: () => {

            let tipo_entrega = DOM.find('select[name="id_tipo_entrega"]').val();

            switch (tipo_entrega) {
                case '1':

                    DOM.find('div[data-contenedor="direccion_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="direccion_remitente"]').show('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_remitente"]').show('fast');   

                    DOM.find('input[name="direccion_remitente"]').prop('required', true);
                    DOM.find('input[name="direccion_destinatario"]').prop('required', false);
                    
                    break;

                case '2':

                    DOM.find('div[data-contenedor="direccion_destinatario"]').show('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_destinatario"]').show('fast');
                    DOM.find('div[data-contenedor="direccion_remitente"]').show('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_remitente"]').show('fast');

                    DOM.find('input[name="direccion_remitente"]').prop('required', true);
                    DOM.find('input[name="direccion_destinatario"]').prop('required', true);

                    break;

                case '3':

                    DOM.find('div[data-contenedor="direccion_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="direccion_remitente"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_remitente"]').hide('fast');

                    DOM.find('input[name="direccion_remitente"]').prop('required', false);
                    DOM.find('input[name="direccion_destinatario"]').prop('required', false);

                    break;

                case '4':

                    DOM.find('div[data-contenedor="direccion_destinatario"]').show('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_destinatario"]').show('fast');
                    DOM.find('div[data-contenedor="direccion_remitente"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_remitente"]').hide('fast');

                    DOM.find('input[name="direccion_remitente"]').prop('required', false);
                    DOM.find('input[name="direccion_destinatario"]').prop('required', true);

                    break;

                default:

                    DOM.find('div[data-contenedor="direccion_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_destinatario"]').hide('fast');
                    DOM.find('div[data-contenedor="direccion_remitente"]').hide('fast');
                    DOM.find('div[data-contenedor="coordenada_geografica_remitente"]').hide('fast');

                    DOM.find('input[name="direccion_remitente"]').prop('required', false);
                    DOM.find('input[name="direccion_destinatario"]').prop('required', false);

                    break;
            }
        },


        /* GOOGLE MAPS */
        abrir_google_maps: function (input_longitud = '-79.522340' , input_latitud = '9.016058')
        {

            DOM.find('input[name="mapa_longitud"]').val(input_longitud);
            DOM.find('input[name="mapa_latitud"]').val(input_latitud);

            geocoder = new google.maps.Geocoder();
            latLng = new google.maps.LatLng(input_latitud, input_longitud);

            map = new google.maps.Map(document.getElementById('mapCanvas'), {
                zoom:17,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP  
            });


            marker = new google.maps.Marker({
                position: latLng,
                title: 'Arrastra el marcador si quieres moverlo',
                map: map,
                draggable: true
            });

            google.maps.event.addListener(map, 'click', function(event) {
                Componente.updateMarker(event.latLng);
            });

            Componente.geocodePosition(latLng);

            google.maps.event.addListener(marker, 'dragstart', function() {
                Componente.updateMarkerAddress('Arrastrando...');
            });

            google.maps.event.addListener(marker, 'drag', function() {
                Componente.updateMarkerStatus('Arrastrando...');
                Componente.updateMarkerPosition(marker.getPosition());
            });

            google.maps.event.addListener(marker, 'dragend', function() {
                Componente.updateMarkerStatus('Arrastre finalizado');
                Componente.geocodePosition(marker.getPosition());
            }); 

        },

        geocodePosition : (pos) => {
            geocoder.geocode({
                latLng: pos
            }, function(responses) {
                if (responses && responses.length > 0) {
                    Componente.updateMarkerAddress(responses[0].formatted_address);
                } else {
                    Componente.updateMarkerAddress('No puedo encontrar esta direccion.');
                }
            });
        },

        codeLatLon: () => {

            let mapa_longitud = DOM.find('input[name="mapa_longitud"]').val();
            let mapa_latitud = DOM.find('input[name="mapa_latitud"]').val();

            str = mapa_longitud+" , "+mapa_latitud;
            latLng2 = new google.maps.LatLng(mapa_longitud ,mapa_latitud);
            marker.setPosition(latLng2);
            map.setCenter(latLng2);
            Componente.geocodePosition (latLng2);

        },

        codeAddress : () => {
            var address = DOM.find('input[name="mapa_direccion"]').val();
            geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                Componente.updateMarkerPosition(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
            } else {
                alert('La dirección escrita no existe o no fue válida');
            }
            });
        },

        codeAddress2 : (address) => {
            geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                Componente.updateMarkerPosition(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                DOM.find('input[name="mapa_direccion"]').val(address);
            } else {
                alert('ERROR : ' + status);
            }
            });
        },

        updateMarkerStatus : (str) => {
            DOM.find('input[name="mapa_direccion"]').val(str);
        },

        updateMarkerPosition : (latLng) => {
            DOM.find('input[name="mapa_longitud"]').val(latLng.lng());
            DOM.find('input[name="mapa_latitud"]').val(latLng.lat());
        },

        updateMarkerAddress :(str) => {
            DOM.find('input[name="mapa_direccion"]').val(str);
        },

        updateMarker : (location) => {
            marker.setPosition(location);
            Componente.updateMarkerPosition(location);
            Componente.geocodePosition(location);
        }




    };

    $(document).ready(function(){ 

        Componente.get_table();
        Componente.select_articulo();
        Componente.select_lugar_origen();
        Componente.select_lugar_destino();
        Componente.select_documento_entidad();
        Componente.change_tipo_entrega();

        /* SUBMIT */
        $("#save").submit(function(event) {
            event.preventDefault();

            var formData = new FormData(document.getElementById("save"));
            var URLactual = window.location;

            if(Componente.id != null){formData.append('id', Componente.id)};
            if(URLactual != ''){formData.append('url', URLactual)};
           

            
            jQuery.ajax({
                type: "POST",
                url: "server/public/publico/envio/orden_envio/completar",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function(response)
                {
                    HELPER.notificacion(response.mensaje, 'success');
                    // document.getElementById("save").reset();

                    setTimeout(function() {
                        window.location = "finalizacion.php?id="+response.id_orden_envio; 
                    }, 1000);

                }
            });
        });
        /* CLICK EN EDITAR */
        $(document).on('click', 'button[name="row-edit"]', function (e) {
            e.stopImmediatePropagation();

            Componente.edit($(this));

        });

        /* CLICK EN ELIMINAR */
        $(document).on('click', 'button[name="row-delete"]', function (e) {
            e.stopImmediatePropagation();

            Componente.delete($(this));

        });

        /* EVENTOS PARA EDITAR */

         /* SUBMIT EDITAR*/
         $("#save-edit").submit(function(event) {
            event.preventDefault();

            let items = Componente.item_json();
    
            if(items.length == 0 )
            {
                HELPER.notificacion('No existe items para enviar', 'warning');
            }
            else
            {

                var formData = new FormData(document.getElementById("save-edit"));

                if (Componente.id != null) { formData.append('id', Componente.id); }

                formData.append('total_bultos', Componente.total_bultos);
                formData.append('total_importe', Componente.total_importe);

                formData.append('detalle', JSON.stringify(items));
                
                jQuery.ajax({
                    type: "POST",
                    url: "server/public/publico/envio/orden_envio/save",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function(response)
                    {
                        HELPER.notificacion(response.mensaje, 'success');
                        document.getElementById("save-edit").reset();

                        $('div[name="modal-edit"]').modal('hide');
                        setInterval("location.reload()",1000); 

                    }
                });
            }
        });  


        /* SUBMIT DELETE*/
        $("#delete").submit(function(event) {
            event.preventDefault();


            var formData = new FormData(document.getElementById("delete"));

            if (Componente.id != null) { formData.append('id', Componente.id); }
            
            jQuery.ajax({
                type: "POST",
                url: "server/public/publico/envio/orden_envio/delete",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function(response)
                {
                    HELPER.notificacion(response.mensaje, 'success');
                    $('div[name="modal-delete"]').modal('hide');
                    setInterval("location.reload()",1000);

                }
            });
            
        });  

        $(document).on('keyup', 'input[name="numero_documento_remitente"]', function (e) {
            e.stopImmediatePropagation();

            let id_documento = $('select[name="id_documento_remitente"]').val();

            if (this.value != '' && id_documento != '') {

               Componente.get_cliente(this.value, id_documento, 'REMITENTE'); 

            }
        
        });

        $(document).on('keyup', 'input[name="numero_documento_destinatario"]', function (e) {
            e.stopImmediatePropagation();

            let id_documento = $('select[name="id_documento_destinatario"]').val();

            if (this.value != '' && id_documento != '') {

               Componente.get_cliente(this.value, id_documento, 'DESTINATARIO'); 

            }
        
        });

        $(document).on('change', 'select[name="id_documento_remitente"]', function (e) {
            e.stopImmediatePropagation();

            let numero_documento_remitente = $('input[name="numero_documento_remitente"]').val();

            if (this.value != '' && numero_documento_remitente != '') {

               Componente.get_cliente(numero_documento_remitente, this.value, 'REMITENTE'); 

            }
        
        });

        $(document).on('change', 'select[name="id_documento_destinatario"]', function (e) {
            e.stopImmediatePropagation();

            let numero_documento_destinatario = $('input[name="numero_documento_destinatario"]').val();

            if (this.value != '' && numero_documento_destinatario != '') {

               Componente.get_cliente(numero_documento_destinatario, this.value, 'DESTINATARIO'); 

            }
        
        });

         /* AGREGAR ITEM */
        $(document).on('click', 'button[name="agregar"]', function (e) {
            e.stopImmediatePropagation();

            let id_remitente = $('input[name="id_remitente"]').val();

            if (id_remitente != '') {

               
                $('div[name="modal-item"]').modal('show');
                document.getElementById("modal-item-form").reset();

                Componente.get_tarifa();
                
            }else{

                HELPER.notificacion('Debe ingresar el remitente para obtener las tarifas', 'warning');

            }
            
        });

        /* AGREGAR ITEM */
        $(document).on('click', 'button[name="agregar_item"]', function (e) {
            e.stopImmediatePropagation();
            Componente.agregar_item();
        });

        /* AGREGAR ITEM */
        $(document).on('click', 'button[name="quitar-item"]', function (e) {
            e.stopImmediatePropagation();
            Componente.quitar_item($(this));
        });

         /* CLICK VALIDAR CLIENTE */
         $(document).on('click', 'button[name="validar_cliente"]', function (e) {
            e.stopImmediatePropagation();

            Componente.validar_cliente();
            
        });

        /* AGREGAR ITEM */
        $(document).on('change', 'input[name="fl_opcional"]', function (e) {
            e.stopImmediatePropagation();

            if($('input[name="fl_opcional"]').is((':checked')))
            {
                $('div[data-ocultar="opcional"]').show('fast');

            }else{

                $('div[data-ocultar="opcional"]').hide('fast');
            }
            
        });

        $(document).on('keyup', 'input[data-name="bultos"]', function (e) {
            e.stopImmediatePropagation();

            Componente.calculo_importe_item();
        
        });

        $(document).on('change', 'input[data-name="bultos"]', function (e) {
            e.stopImmediatePropagation();

            Componente.calculo_importe_item();
        
        });

        $(document).on('keyup', 'input[name="bultos"]', function (e) {
            e.stopImmediatePropagation();

            let codigo = $(this).parents('tr')[0].dataset.codigo;
            Componente.calculo_importe_linea(codigo);
        
        });

        $(document).on('change', 'input[name="bultos"]', function (e) {
            e.stopImmediatePropagation();

            let codigo = $(this).parents('tr')[0].dataset.codigo;
            Componente.calculo_importe_linea(codigo);
        
        });

        $(document).on('change', 'select[name="id_tipo_entrega"]', function (e) {
            e.stopImmediatePropagation();

            Componente.change_tipo_entrega();
        
        });

         /* EVENTOS DE GOOGLE MAPS */

        /* CLICK EXTRAER UBICACION REMITENTE */
        $(document).on('click', 'button[name="extraer_ubicacion_remitente"]', function (e) {
            e.stopImmediatePropagation();

            Componente.abrir_google_maps();
            $('div[name="modal-map"]').modal('show');

            let form = DOM.find('form[name="map"]');

            form.find('input[name="tipo_cliente"]').val('REMITENTE');

            
        });

        /* CLICK EXTRAER UBICACION DESTINATARIO */
        $(document).on('click', 'button[name="extraer_ubicacion_destinatario"]', function (e) {
            e.stopImmediatePropagation();

            Componente.abrir_google_maps();
            $('div[name="modal-map"]').modal('show');

            let form = DOM.find('form[name="map"]');

            form.find('input[name="tipo_cliente"]').val('DESTINATARIO');

        
            
        });

        /* CLICK EXTRAER UBICACION DESTINATARIO */
        $(document).on('click', 'button[name="capturar_coordenadas"]', function (e) {
            e.stopImmediatePropagation();

            let form = DOM.find('form[name="map"]');

            let tipo_cliente =  form.find('input[name="tipo_cliente"]').val();
            let latitud = form.find('input[name="mapa_latitud"]').val();
            let longitud = form.find('input[name="mapa_longitud"]').val();

            if (tipo_cliente == 'REMITENTE') {

                DOM.find('input[name="coordenada_geografica_remitente"]').val(latitud +', '+ longitud);
 
            }else{

                DOM.find('input[name="coordenada_geografica_destinatario"]').val(latitud +', '+ longitud);
            }

            $('div[name="modal-map"]').modal('hide');

            
        });

        /**** CLICK CORRDENADAS */
        DOM.on('click', 'button[name="get_coordenadas"]', function(e) {
            e.stopImmediatePropagation();

            let mapa_longitud = DOM.find('input[name="mapa_longitud"]').val();
            let mapa_latitud = DOM.find('input[name="mapa_latitud"]').val();


            Componente.abrir_google_maps(mapa_longitud, mapa_latitud);
        });

        /*** CLICK UBICACIÓN ACTUAL */
        DOM.on('click', 'button[name="get_locacion"]', function(e) {
            e.stopImmediatePropagation();


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
        
                    Componente.abrir_google_maps(position.coords.latitude, position.coords.longitude);
                    
                    DOM.find('input[name="mapa_longitud"]').val(position.coords.longitude);
                    DOM.find('input[name="mapa_latitud"]').val(position.coords.latitude);
        
                });
        
            } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
            }
        });

        




    });
</script>