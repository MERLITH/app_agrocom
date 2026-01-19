

let DOM, DOM_ID ;
let Componente = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">

            <div class="row mt-2">
                <div class="col-md-8">
                    <h4 class="fw-bold py-0 mb-4">
                        <span class="text-muted fw-light">
                            Configuración
                        </span> 
                        &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                        <small>
                            <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                            <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                            <a href="javascript:" class="icon-home text-primary">Empresa</a>&nbsp;
                        </small>
                    </h4>
                </div>
            </div>

            <div class="card p-3">
                <form name="save" id="save">                    
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
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="row">

                                <div class="col-md-4">
                                    <label class="form-label">RUC <b class="text-danger">*</b></label>
                                    <div class="input-group input_group_r fx-nowrap">
                                        <input type="number" name="numero_documento" class="form-control" autocomplete="off">
                                        <button class="btn btn-secondary waves-effect" type="button" name="buscar_numero"><span class="mdi mdi-magnify"></span></button>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label class="form-label">Razón Social</label>
                                        <input type="text" name="razon_social" class="form-control" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Nombre Comercial</label>
                                        <input type="text" name="nombre_comercial" class="form-control" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Dirección</label>
                                        <input type="text" name="direccion" class="form-control" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Teléfono</label>
                                        <input type="text" name="telefono" data-minus="true" class="form-control" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Correo electrónico</label>
                                        <input type="email" name="email" data-minus="true" class="form-control" autocomplete="off" >
                                    </div>
                                </div>   
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">UBIGEO</label>
                                        <select name="id_ubigeo" class="form-select sltUbigeo" data-select="UBIGEO" ></select>
                                    </div>
                                </div>          
                                                        
                            </div>
                        </div>
                        <div class="col-md-12 text-center pt-3">
                            <button type="button" class="btn rounded-pill btn-secondary waves-effect waves-light"><span class="mdi mdi-cancel me-1"></span>Cancelar</button>
                            <button type="button" name="submit" class="btn rounded-pill btn-primary waves-effect waves-light w-25"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span>Guardar</button>
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            <!-- /.box -->



        </div>            
        `;

        Componente.after_render();
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        
        /** VALIDATE SUBMIT SAVE */
        Componente.validarForm('save');

        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
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


        await Componente.select_ubigeo();   
        Componente.get();    
         

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */

    validarForm: function (idform) {

        var arrayFields = [
            {field: 'numero_documento', message: 'Por favor, digite el Número de Documento'},
            {field: 'razon_social', message: 'Por favor, digite la Razón Social'},
            {field: 'nombre_comercial', message: 'Por favor, digite el Nombre Comercial'},
            {field: 'direccion', message: 'Por favor, digite la Dirección'},
            {field: 'telefono', message: 'Por favor, digite el Teléfono'},
            {field: 'email', message: 'Por favor, digite el Correo Electrónico'},
            {field: 'id_ubigeo', message: 'Por favor, seleccione el Ubigeo'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[name="submit"]');
        DOM.on('click', '#' + idform +' button[name="submit"]', function(e) {
            //e.stopImmediatePropagation();
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.submit();
                }
            });           
        });

    },

    select_ubigeo: async () =>
    {

        var urlB = BASE_API + "recursos/data_static/ubigeo";
        $.select2_buscar('sltUbigeo', urlB, "Departamento - Provincia - Distrito", 3);
        
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
            form.find('img[name="imagen_factura"]').attr('src', BASE_FILES+'images/'+data.logo_factura);
            form.find('select[name="tipo_proveedor_electronico"]').val(data.tipo_proveedor_electronico).change();
            form.find('select[name="estado_facturacion"]').val(data.estado_facturacion).change();
            form.find('textarea[name="info_comprobante"]').html(data.info_comprobante);
            form.find('input[name="url_proveedor_electronico"]').val(data.url_proveedor_electronico);
            
            if(data.id_ubigeo != null)
            {
                form.find('select[name="id_ubigeo"]').html('')
                .append(new Option(data.ubigeo, data.id_ubigeo));
            }

            Componente.imagen_anterior = data.logo;
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
        if (this.imagen_factura_anterior != null) { formData.append('imagen_factura_anterior', this.imagen_factura_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/empresa/' + this.action_submit,
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