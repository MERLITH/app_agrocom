

let DOM, DOM_ID ;
let Componente = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Ajustes Avanzados
                            <small>Configuración</small>
                        </h1>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                    <form name="save">
                        <div class="box-body">                        
                            <div class="row">  
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>ORDEN DE TRABAJO</strong></h4>
                                    </div>
                                </div>    
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_orden_crear_viaje_autoselect" autocomplete="off"> 
                                            Seleccionar automáticamente crear viaje
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>ORDEN DE VIAJE</strong></h4>
                                    </div>
                                </div>      
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_viaje_cantidad_opcional" autocomplete="off"> 
                                            Cantidad (No Obligatorio)
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_viaje_monitoreo" autocomplete="off"> 
                                            Iniciar y Finalizar viaje según estados de monitoreo
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Estado para habilitar inicio de Viaje</label>
                                                <select data-select="ESTADO_MONITOREO" name="viaje_inicio_estado" class="form-control select"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Estado para habilitar retornar Viaje</label>
                                                <select data-select="ESTADO_MONITOREO" name="viaje_retornar_estado" class="form-control select"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Estado para habilitar finalizar Viaje</label>
                                                <select data-select="ESTADO_MONITOREO" name="viaje_finalizar_estado" class="form-control select"></select>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Porcentaje de Detracción (Servicios Terceros)</label>
                                        <select name="operacion_viaje_terc_detraccion_opcion" class="form-control select">
                                            <option value="">DIGITAR EN FORMULARIO CADA VEZ</option>
                                            <option value="AUTOMATICO">OCULTAR Y ESTABLECER AUTOMÁTICAMENTE SEGÚN LA CONFIGURACIÓN</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Tipo IGV (Servicios Terceros)</label>
                                        <select name="operacion_viaje_terc_igv_opcion" class="form-control select">
                                            <option value="">SELECCIONAR EN FORMULARIO CADA VEZ</option>
                                            <option value="MAS_IGV">OCULTAR Y ESTABLECER AUTOMÁTICAMENTE MÁS IGV</option>
                                            <option value="INC_IGV">OCULTAR Y ESTABLECER AUTOMÁTICAMENTE INCLUIDO IGV</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>FACTURACIÓN ELECTRÓNICA</strong></h4>
                                    </div>
                                </div>  
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_factura_formato_customer" autocomplete="off"> 
                                            Formato de Impresión Personalizado
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_facturacion_envio_manual_sunat" autocomplete="off"> 
                                        Enviar manualmente a SUNAT <span style="color:#CB2A2A; font-weight:bold;">(Esta acción no es responsabilidad de TITANICSOFT)</span>
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>PROFORMA</strong></h4>
                                    </div>
                                </div>  
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_proforma_formato_customer" autocomplete="off"> 
                                            Formato de Impresión Personalizado
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>TESORERIA</strong></h4>
                                    </div>
                                </div>  
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_tesoreria_bloqueo_caja_orden_facturado" autocomplete="off"> 
                                           <strong>Caja</strong> Bloquear a Viajes que tengan ordenes de trabajo facturadas
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_liquidacion_tercero_print_custom" autocomplete="off"> 
                                           <strong>Liquidación de Tercero</strong> Formato de impresión personalizada
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_tesoreria_liq_tercero_desc_detrac" autocomplete="off"> 
                                           <strong>Liquidación de Tercero</strong> Descontar detracción
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_tesoreria_liq_escolta_desc_detrac" autocomplete="off"> 
                                           <strong>Liquidación de Escolta</strong> Descontar detracción
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_tesoreria_pago_importe_orden" autocomplete="off"> 
                                           <strong>Pago de Órdenes / Facturas</strong> Pago de orden según importe registrado y no de factura.
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_tesoreria_pago_detraccion_no_descuento" autocomplete="off"> 
                                           <strong>Pago de Órdenes / Facturas</strong> No descontar monto de detracción
                                        </label>                        
                                    </div>
                                </div> 
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>SISTEMA</strong></h4>
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_sistema_change_color" autocomplete="off"> 
                                           Cambiar color de la Barra Superior
                                        </label>                        
                                    </div>
                                    <div class="form-item" name="contenedor-sistema_change_color">
                                        <label for="color">Color:</label>
                                        <input type="text" id="color" name="sistema_color_bg" value="#000000">

                                        <div id="picker"></div>
                                    </div>
                                    
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_sistema_logo" autocomplete="off"> 
                                           Mostrar logotipo de la empresa en lugar de TitanicSoft
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>REPORTES</strong></h4>
                                    </div>
                                </div>  
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_rep_ord_serv_custom" autocomplete="off"> 
                                            <strong>Órdenes de Viaje</strong> formato personalizado  
                                        </label>                        
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <h4><strong>CONFIGURACIÓN</strong></h4>
                                    </div>
                                </div>  
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label"><input type="checkbox" name="fl_config_vehiculo_no_duplicidad" autocomplete="off"> 
                                            <strong>Vehículos</strong> No validar duplicidad
                                        </label>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </form>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-success">
                    <form name="save_serie">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4><strong>SERIES DE CORRELATIVOS INTERNOS DEL SISTEMA</strong></h4>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Órden de Trabajo</label>
                                        <input type="text" name="operacion_serie_orden" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Órden de viaje</label>
                                        <input type="text" name="operacion_serie_viaje" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Vales de Combustible</label>
                                        <input type="text" name="operacion_serie_vale_combu" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Vales de pago</label>
                                        <input type="text" name="operacion_serie_vale_pago" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div>  
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Tesoreria (Caja)</label>
                                        <input type="text" name="tesoreria_serie_caja" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Tesoreria (Caja Chica)</label>
                                        <input type="text" name="tesoreria_serie_caja_chica" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Tesoreria (Liquidacion Terceros)</label>
                                        <input type="text" name="tesoreria_serie_liquidacion_tercero" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">Almacén (Órden de Compra)</label>
                                        <input type="text" name="almacen_serie_orden_comp" class="form-control" placeholder="`+HELPER.fecha_ano()+`" />
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </form>

                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->



        </div>            
        `;

        Componente.after_render();
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        
        /** VALIDATE SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
                          
            /* REGLAS */
            rules: {
                viaje_inicio_estado: {required: true},
                viaje_retornar_estado: {required: true},
                viaje_finalizar_estado: {required: true},
            },
          
            messages: {
                viaje_inicio_estado: 'Estado Inicio de Viaje',
                viaje_retornar_estado: 'Estado Retornar Viaje',
                viaje_finalizar_estado: 'Estado Finalizar Viaje',

          }
        });

        DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
            e.stopImmediatePropagation();

            if(DOM.find('form[name="save"]').valid())
            {
                Componente.submit();
            }
            
        });

        DOM.on('click', 'form[name="save_serie"] button[name="submit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.submit_serie();            
        });

        DOM.on('change', 'input[name="fl_viaje_monitoreo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_viaje_monitoreo();        
        });
     

        DOM.on('change', 'input[name="fl_sistema_change_color"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_sistema_change_color();        
        });

       
      
        await Componente.select_estado_monitoreo();
        Componente.get();      

        HELPER.load_component();
        $('#picker').farbtastic('#color');
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */

    change_sistema_change_color: () => {

        if(DOM.find('input[name="fl_sistema_change_color"]').is(':checked'))
        {
            DOM.find('div[name="contenedor-sistema_change_color"]').show('slide');
        }
        else
        {
            DOM.find('div[name="contenedor-sistema_change_color"]').hide('slide');
        }

    },

    change_viaje_monitoreo: () => {
        
        if(DOM.find('input[name="fl_viaje_monitoreo"]').is(':checked'))
        {
            DOM.find('select[name="viaje_inicio_estado"]').prop('disabled', false);
            DOM.find('select[name="viaje_retornar_estado"]').prop('disabled', false);
            DOM.find('select[name="viaje_finalizar_estado"]').prop('disabled', false);
        }
        else
        {
            DOM.find('select[name="viaje_inicio_estado"]').prop('disabled', true);
            DOM.find('select[name="viaje_retornar_estado"]').prop('disabled', true);
            DOM.find('select[name="viaje_finalizar_estado"]').prop('disabled', true);
        }
    },

    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/ajuste_avanzado')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            form.find('input[name="fl_viaje_cantidad_opcional"]').prop('checked', parseInt(data.fl_viaje_cantidad_opcional));
            form.find('input[name="fl_factura_formato_customer"]').prop('checked', parseInt(data.fl_factura_formato_customer));
            form.find('input[name="fl_proforma_formato_customer"]').prop('checked', parseInt(data.fl_proforma_formato_customer));
            form.find('input[name="fl_orden_crear_viaje_autoselect"]').prop('checked', parseInt(data.fl_orden_crear_viaje_autoselect));
            form.find('input[name="fl_viaje_monitoreo"]').prop('checked', parseInt(data.fl_viaje_monitoreo));
            form.find('select[name="viaje_inicio_estado"]').val(data.viaje_inicio_estado).change();
            form.find('select[name="viaje_retornar_estado"]').val(data.viaje_retornar_estado).change();
            form.find('select[name="viaje_finalizar_estado"]').val(data.viaje_finalizar_estado).change();
            form.find('input[name="fl_tesoreria_bloqueo_caja_orden_facturado"]').prop('checked', parseInt(data.fl_tesoreria_bloqueo_caja_orden_facturado));
            form.find('input[name="fl_liquidacion_tercero_print_custom"]').prop('checked', parseInt(data.fl_liquidacion_tercero_print_custom));
            form.find('select[name="operacion_viaje_terc_detraccion_opcion"]').val(data.operacion_viaje_terc_detraccion_opcion).change();
            form.find('select[name="operacion_viaje_terc_igv_opcion"]').val(data.operacion_viaje_terc_igv_opcion).change();
            
            form.find('input[name="fl_sistema_logo"]').prop('checked', parseInt(data.fl_sistema_logo));
            form.find('input[name="fl_sistema_change_color"]').prop('checked', parseInt(data.fl_sistema_change_color));
            form.find('input[name="sistema_color_bg"]').val(data.sistema_color_bg);
            
            if(data.sistema_color_bg != null)
            {
                $.farbtastic("#picker").setColor(data.sistema_color_bg);
            }            

            form.find('input[name="fl_tesoreria_pago_importe_orden"]').prop('checked', parseInt(data.fl_tesoreria_pago_importe_orden));
            form.find('input[name="fl_tesoreria_pago_detraccion_no_descuento"]').prop('checked', parseInt(data.fl_tesoreria_pago_detraccion_no_descuento));
            
            form.find('input[name="fl_rep_ord_serv_custom"]').prop('checked', parseInt(data.fl_rep_ord_serv_custom));
                       
            form.find('input[name="fl_config_vehiculo_no_duplicidad"]').prop('checked', parseInt(data.fl_config_vehiculo_no_duplicidad));
            form.find('input[name="fl_tesoreria_liq_tercero_desc_detrac"]').prop('checked', parseInt(data.fl_tesoreria_liq_tercero_desc_detrac));
            form.find('input[name="fl_tesoreria_liq_escolta_desc_detrac"]').prop('checked', parseInt(data.fl_tesoreria_liq_escolta_desc_detrac));
            form.find('input[name="fl_facturacion_envio_manual_sunat"]').prop('checked', parseInt(data.fl_facturacion_envio_manual_sunat));            

            Componente.change_viaje_monitoreo();
            Componente.change_sistema_change_color();

            Componente.action_submit = 'save';


            /*** SERIES DEL SISTEMA */
            let form_serie = DOM.find('form[name="save_serie"]');

            form_serie.find('input[name="operacion_serie_orden"]').val(data.operacion_serie_orden);
            form_serie.find('input[name="operacion_serie_viaje"]').val(data.operacion_serie_viaje);
            form_serie.find('input[name="operacion_serie_vale_combu"]').val(data.operacion_serie_vale_combu);
            form_serie.find('input[name="operacion_serie_vale_pago"]').val(data.operacion_serie_vale_pago);
            form_serie.find('input[name="tesoreria_serie_caja"]').val(data.tesoreria_serie_caja);
            form_serie.find('input[name="tesoreria_serie_caja_chica"]').val(data.tesoreria_serie_caja_chica);
            form_serie.find('input[name="tesoreria_serie_liquidacion_tercero"]').val(data.tesoreria_serie_liquidacion_tercero);
            form_serie.find('input[name="almacen_serie_orden_comp"]').val(data.almacen_serie_orden_comp);
            console.log(data.tesoreria_serie_caja_chica);

        }).catch(error => {
            console.log(error);
        }); 
    },

    select_estado_monitoreo: async () => {

        let select = DOM.find('select[data-select="ESTADO_MONITOREO"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'configuracion/estado_monitoreo/get_select?tipo=ORDEN_VIAJE')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 

    },
    
    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/ajuste_avanzado/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.get();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_serie: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save_serie"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save_serie"]'));

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/ajuste_avanzado/save_serie',
            data: formData
        })
        .then(function(response) {
            Componente.get();
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;