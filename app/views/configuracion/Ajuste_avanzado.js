
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
                                <div class="col-md-4">
                                    <div class="box box-widget widget-user-2">
                                        <div class="widget-user-header bg-red">
                                            <div class="widget-user-image" style="float:left; padding-top:0px">
                                                <i class="fad fa-globe fa-3x"></i>
                                            </div>
                                            <h3 class="widget-user-username">General</h3>
                                        </div>
                                        <div class="box-footer no-padding">
                                            <ul class="nav nav-stacked">
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_general_local_independiente" /> Restringir información por Locales Anexos</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_general_serie_usuario" /> Habilitar series asignado al usuario</label></a></li>
                                                <li><a href="javascript:"><label class="form-label">Cantidad de decimales en precio de Venta <input type="number" name="cant_decimales_venta" class="form-control" placeholder="7" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- /.widget-user -->

                                    <div class="box box-widget widget-user-2">
                                        <div class="widget-user-header bg-blue">
                                            <div class="widget-user-image" style="float:left; padding-top:0px">
                                                <i class="fad fa-file-invoice fa-3x"></i>
                                            </div>
                                            <h3 class="widget-user-username">Facturación</h3>
                                        </div>
                                        <div class="box-footer no-padding">
                                            <ul class="nav nav-stacked">
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_facturacion_envio_manual_sunat" /> Enviar facturas manualmente a SUNAT (OFFLINE)<br> <span style="color:#CB2A2A; font-weight:bold;">(Es responsabilidad de Ud. enviar todas las facturas a SUNAT dentro del tiempo permitido)</span></label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_fact_detraccion_automatica" /> Aplicar detracción a facturas mayores de 400 soles.</label></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- /.widget-user -->
                                </div>
                                <div class="col-md-4">
                                    <div class="box box-widget widget-user-2">
                                        <div class="widget-user-header bg-green">
                                            <div class="widget-user-image" style="float:left; padding-top:0px">
                                                <i class="fad fa-truck-loading fa-3x"></i>
                                            </div>
                                            <h3 class="widget-user-username">Operación</h3>
                                        </div>
                                        <div class="box-footer no-padding">
                                            <ul class="nav nav-stacked">
                                                <li><a href="javascript:"><strong>Orden de Servicios</strong></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_os_descripcion_articulo" /> Agregar nombre de artículo en descripción del item automáticamente, y solicitar una descripción general para la orden de servicio</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_tarifa_info" /> Mostrar Información de tarifas y los precios sean editables al agregar items a la orden</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_os_doc_ref" /> Documento de Referencia (Obligatorio) <br> Solo para clientes jurídicos</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_clave_edit_orden" /> Solicitar clave de entrega al editar orden</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_tarifa_ruta" /> Tarifas de artículos por Rutas</label></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_os_emision_grt" /> Emitir GRT al generar O/S</label></a></li>
                                                <li><a href="javascript:"><strong>Guias de Remisión</strong></a></li>
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_op_emision_electronico_grr" /> Emisión Electrónica (GR-REMITENTE)</label></a></li>
                                                <li><a href="javascript:" style="display:none;"><label class="form-label"><input type="checkbox" disabled name="fl_op_emision_electronico_grt" /> Emisión Electrónica (GR-TRANSPORTISTA)</label></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- /.widget-user -->
                                </div>
                                <div class="col-md-4" style="display:none;">
                                    <div class="box box-widget widget-user-2">
                                        <div class="widget-user-header bg-yellow">
                                            <div class="widget-user-image" style="float:left; padding-top:0px">
                                                <i class="fad fa-money-bill-alt fa-3x"></i>
                                            </div>
                                            <h3 class="widget-user-username">Tesoreria</h3>
                                        </div>
                                        <div class="box-footer no-padding">
                                            <ul class="nav nav-stacked">
                                                <li><a href="javascript:"><label class="form-label"><input type="checkbox" name="fl_pagar_factura" /> Pagar solo facturas y no órdenes de servicios</label></a></li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- /.widget-user -->
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-grey btn-sm" data-dismiss="modal" style="float:left;">Cancelar</button>
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

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID); 

      DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
          e.stopImmediatePropagation();

          Componente.submit();
          
      });
      
        Componente.get();        

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */
    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/ajuste_avanzado')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            form.find('input[name="fl_pagar_factura"]').prop('checked', parseInt(data.fl_pagar_factura));
            form.find('input[name="fl_tarifa_cliente"]').prop('checked', parseInt(data.fl_tarifa_cliente));
            form.find('input[name="fl_tarifa_articulo"]').prop('checked', parseInt(data.fl_tarifa_articulo));
            form.find('input[name="fl_tarifa_ruta"]').prop('checked', parseInt(data.fl_tarifa_ruta));
            form.find('input[name="fl_op_os_doc_ref"]').prop('checked', parseInt(data.fl_op_os_doc_ref));
            form.find('input[name="fl_op_clave_edit_orden"]').prop('checked', parseInt(data.fl_op_clave_edit_orden));
            form.find('input[name="fl_op_multiple_orden_gt"]').prop('checked', parseInt(data.fl_op_multiple_orden_gt));   
            form.find('input[name="fl_op_emision_electronico_grt"]').prop('checked', parseInt(data.fl_op_emision_electronico_grt));
            form.find('input[name="fl_op_emision_electronico_grr"]').prop('checked', parseInt(data.fl_op_emision_electronico_grr));   
            form.find('input[name="fl_general_local_independiente"]').prop('checked', parseInt(data.fl_general_local_independiente)); 
            form.find('input[name="fl_op_os_emision_grt"]').prop('checked', parseInt(data.fl_op_os_emision_grt));     
            form.find('input[name="fl_facturacion_envio_manual_sunat"]').prop('checked', parseInt(data.fl_facturacion_envio_manual_sunat));
            form.find('input[name="fl_fact_detraccion_automatica"]').prop('checked', parseInt(data.fl_fact_detraccion_automatica));
            form.find('input[name="fl_op_os_descripcion_articulo"]').prop('checked', parseInt(data.fl_op_os_descripcion_articulo));
            form.find('input[name="cant_decimales_venta"]').val(data.cant_decimales_venta);         
            form.find('input[name="fl_op_tarifa_info"]').prop('checked', parseInt(data.fl_op_tarifa_info));
            form.find('input[name="fl_general_serie_usuario"]').prop('checked', parseInt(data.fl_general_serie_usuario));

            Componente.action_submit = 'save';

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
} 

export default Componente;