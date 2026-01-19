
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
                            Empresa
                            <small>Configuración</small>
                        </h1>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-primary">
                    <form name="save">
                        <div class="box-body">                        
                            <div class="row">
                                <div class="col-md-3" align="center">
                                    <div class="row">
                                        <div class="col-md-12" align="center">
                                            <div>
                                                <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div>
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Examinar Logo
                                                    <input type="file" name="imagen" style="display:none;">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-12" align="center" style="display: none;">
                                            <div>
                                                <img name="imagen_logo_claro" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div>
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Examinar Logo (claro)
                                                    <input type="file" name="imagen_logo_claro" style="display:none;">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-12" align="center" style="display: none;">
                                            <div>
                                                <img name="imagen_factura" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div>
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Examinar logo para facturas
                                                    <input type="file" name="imagen_factura" style="display:none;">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Número RUC <b class="text-danger">*</b></label>
                                                <input type="text" name="numero_documento" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="form-label">Razón Social</label>
                                                <input type="text" name="razon_social" class="form-control form-control-sm" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Nombre Comercial</label>
                                                <input type="text" name="nombre_comercial" class="form-control form-control-sm" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Dirección</label>
                                                <input type="text" name="direccion" class="form-control form-control-sm" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Teléfono</label>
                                                <input type="text" name="telefono" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Correo electrónico</label>
                                                <input type="email" name="email" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-6" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">Proveedor Electrónico</label>
                                                <select name="tipo_proveedor_electronico" class="form-control form-control-sm select">
                                                    <option value="">Ninguno</option>
                                                    <option value="NUBEFACT">NUBEFACT</option>
                                                    <option value="FACTURALAYA">FACTURALAYA</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">URL Proveedor Electrónico</label>
                                                <input type="text" name="url_proveedor_electronico" data-mayus="false" class="form-control form-control-sm mayus_false" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-12" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">TOKEN Proveedor Electrónico</label>
                                                <input type="text" name="token_proveedor_electronico" data-mayus="false" class="form-control form-control-sm mayus_false" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-6" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">Estado Facturación</span></label>
                                                <select name="estado_facturacion" class="form-control select">
                                                    <option value="DEMO">DEMO</option>
                                                    <option value="PRODUCCION">PRODUCCIÓN</option>
                                                </select>
                                            </div>
                                        </div>   
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">UBIGEO</label>
                                                <select name="id_ubigeo" class="form-control form-control-sm" data-select="UBIGEO" ></select>
                                            </div>
                                        </div>
                                        <div class="col-md-6" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">Origen Factura Impresión</span></label>
                                                <select name="origen_factura" class="form-control select2">
                                                    <option value="NUBEFACT">PROVEEDOR ELECTRÓNICO</option>
                                                    <option value="APP">APP TITANICSOFT</option>
                                                </select>
                                            </div>
                                        </div>   
                                        <div class="col-md-6" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">Formato Impresión </span></label>
                                                <select name="formato_factura" class="form-control select2">
                                                    <option value="TICKET">TICKET</option>
                                                    <option value="A4">A4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-12" style="display: none;">
                                            <div class="form-group">
                                                <label class="form-label">Información para Facturas</label>
                                                <textarea name="info_comprobante" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-grey btn-sm" data-dismiss="modal">Cancelar</button>
                            <button type="button" name="submit" class="btn btn-primary btn-sm w-25">Guardar</button>
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

        
        /** VALIDATE SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
                          
            /* REGLAS */
            rules: {
              numero_documento: {required: true},
              razon_social: {required: true},
              direccion: {required: true},
              tipo_proveedor_electronico: {required: true},
            },
          
            messages: {
              numero_documento: 'Número de Documento',
              razon_social: 'Razón Social',
              direccion: 'Dirección',
              tipo_proveedor_electronico: 'Tipo Proveedor Electrónico'

          },

      });

      DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
          e.stopImmediatePropagation();

          if(DOM.find('form[name="save"]').valid())
          {
              Componente.submit();
          }
          
      });
      
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen_logo_claro"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen_logo_claro"]'));
        });

        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen_factura"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen_factura"]'));
        });

        /** BUSCAR NUMERO */
        DOM.on('click', 'button[name="buscar_numero"]', function(e) {
            e.stopImmediatePropagation();
            Componente.buscar_numero();
        });

        DOM.on('keyup', 'input[name="numero_documento"]', function(e) {            
            e.stopImmediatePropagation();
            if(e.which == 13) {
                Componente.buscar_numero();
            }            
        });


        Componente.select_ubigeo();
        Componente.get();        

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    imagen_anterior_claro: null,
    imagen_factura_anterior: null,

    /************ */

    select_ubigeo: async () =>
    {
        DOM.find('select[data-select="UBIGEO"]').select2({
            ajax: {
              url: BASE_API+'recursos/data_static/ubigeo',
              dataType: 'json',
              delay: 250,
              data: function(params) {
                return {buscar:params.term};
              },
              processResults: function(data, params) {      
                return {results: data};
              },
              cache: true,
            },
            escapeMarkup: function(markup) {
              return markup;
            },
            placeholder: "Departamento - Provincia - Distrito",
            minimumInputLength: 3,
            allowClear: true,
            language: {
              inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
              }
            }
        });
    },

    buscar_numero: function() {

        let form = DOM.find('form[name="save"]');
        let ladda = HELPER.ladda(DOM_ID+' button[name="buscar_numero"]');

        axios.get(BASE_API + 'recursos/busqueda/reniec_sunat?numero='+form.find('input[name="numero_documento"]').val())
        .then(function (response) {

            form.find('input[name="razon_social"]').val(response.data.razon_social);
            form.find('input[name="direccion"]').val(response.data.direccion);  
            form.find('select[name="id_ubigeo"]').val(response.data.ubigeo).change();

            ladda.stop();
        }).catch(error => {
            console.log(error);
            ladda.stop();
        }); 
    },
    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/empresa')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            form.find('input[name="numero_documento"]').val(data.numero_documento);
            form.find('input[name="razon_social"]').val(data.razon_social);
            form.find('input[name="nombre_comercial"]').val(data.nombre_comercial);
            form.find('input[name="direccion"]').val(data.direccion);
            form.find('input[name="telefono"]').val(data.telefono);
            form.find('input[name="email"]').val(data.email);
            form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.logo);
            form.find('img[name="imagen_logo_claro"]').attr('src', BASE_FILES+'images/'+data.logo_claro);
            form.find('img[name="imagen_factura"]').attr('src', BASE_FILES+'images/'+data.logo_factura);
            form.find('select[name="tipo_proveedor_electronico"]').val(data.tipo_proveedor_electronico).change();
            form.find('select[name="estado_facturacion"]').val(data.estado_facturacion).change();
            form.find('select[name="formato_factura"]').val(data.formato_factura).change();
            form.find('select[name="origen_factura"]').val(data.origen_factura).change();
            form.find('textarea[name="info_comprobante"]').html(data.info_comprobante);
            form.find('input[name="url_proveedor_electronico"]').val(data.url_proveedor_electronico);
            form.find('input[name="token_proveedor_electronico"]').val(data.token_proveedor_electronico);
            
            if(data.id_ubigeo != null)
            {
                form.find('select[name="id_ubigeo"]').html('')
                .append(new Option(data.ubigeo, data.id_ubigeo));
            }

            Componente.imagen_anterior = data.logo;
            Componente.imagen_anterior_claro = data.logo_claro;
            Componente.imagen_factura_anterior = data.logo_factura;
            Componente.action_submit = 'save';

        }).catch(error => {
            console.log(error);
        }); 
    },
    
    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        if (this.imagen_anterior_claro != null) { formData.append('imagen_anterior_claro', this.imagen_anterior_claro); }
        if (this.imagen_factura_anterior != null) { formData.append('imagen_factura_anterior', this.imagen_factura_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/empresa/' + this.action_submit,
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