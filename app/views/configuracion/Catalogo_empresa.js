
let DOM, DOM_ID, __idModal = '';
let Componente = {

    render: async (d) => {
        
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
                            <a href="javascript:" class="icon-home text-primary">Catálogo de empresas</a>&nbsp;
                        </small>
                    </h4>
                </div>
                <div class="col-md-4 text-end">
                    <button type="button" class="btn rounded-pill btn-primary waves-effect waves-light" name="nuevo">
                        <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                        Nuevo Registro
                    </button>
                </div>
            </div>

            
            <!-- Users List Table -->
            <div class="card">  
                <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                </div>
            </div>    

            <!-- Pop ups -->
            <div id="container_modal">
            </div>
            <!-- / Pop ups -->

        
        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);    

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        
        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */

    eventos: function() {

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

    },

    datatable: async function() {

        var oData = await $.getData('configuracion/catalogo_empresa');

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            { "data": "numero_documento", "title": "RUC", "class": "text-left", ordenable: true },
            { "data": "razon_social", "title": "RAZÓN SOCIAL", "class": "text-left", ordenable: true },
            { "data": "nombre_comercial", "title": "NOMBRE COMERCIAL", "class": "text-left", ordenable: true },
            { "data": "direccion", "title": "DIRECCIÓN", "class": "text-left", ordenable: true },
            { "data": "telefono", "title": "TELÉFONO", "class": "text-left", ordenable: true },
            { "data": "email", "title": "CORREO ELECTRÓNICO", "class": "text-left", ordenable: true },
            { "data": "ubigeo", "title": "UBIGEO", "class": "text-left", ordenable: true },
            {
                "data": null, "title": "Acción", "class": "text-center", ordenable: false,
                render:
                    function (data, type, row) {


                        var arrayButton = [], arrayMasButton = [];
                        arrayButton.push(
                          {
                            element: "a",
                            properties: {class:"btn btn-sm btn-text-warning rounded-pill btn-icon item-edit btnEditar", href: "javascript:",html: '<i class="mdi mdi-pencil-outline"></i>'},
                          },
                          {
                            element: "button",
                            properties: {class:"btn btn-sm btn-icon btn-text-primary rounded-pill btn-icon dropdown-toggle hide-arrow","data-bs-toggle": "dropdown",html: '<i class="mdi mdi-dots-vertical mdi-20px"></i>',},
                          }
                        );

                        arrayMasButton.push(
                            {
                                element: "a",
                                properties: {class: "dropdown-item btnEliminar",href: "javascript:;",html: '<i class="mdi mdi-delete-outline me-2"></i><span>Eliminar</span>'},
                            }
                        );

                        arrayButton.push({
                          element: "div",
                          properties: {class: "dropdown-menu dropdown-menu-end m-0",},
                          children: arrayMasButton
                        });

                        var oSetting =
                            [
                                {
                                    element: "div",
                                    properties: { class: "d-inline-block text-nowrap", },
                                    children: arrayButton
                                }
                            ];

                        var domHtml = $.SMBuildTag(oSetting);
                        return domHtml[0][0].outerHTML;
                        

                    }
            },
        ];

        var datableTarea = __generateDataTable(
            'tblRegistros',
            oData,
            oColums,
            [], 
            15,
            [15, 20, 30, 40],
            [0],
            'LISTADO DE CATÁLOGO DE EMPRESAS'
        );

        $('.tblRegistros tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit(oDataRow);     
        });
        $('.tblRegistros tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.delete(oDataRow);
        });

    },

    validarForm: function (idform, accion = 'nuevo') {

        var arrayFields = [
            {field: 'numero_documento', message: 'Por favor, Escriba el número de documento'},
            {field: 'razon_social', message: 'Por favor, Escriba la Razón Social'},
            {field: 'nombre_comercial', message: 'Por favor, Escriba el Nombre Comercial'},
            {field: 'direccion', message: 'Por favor, Escriba la Dirección'},
            {field: 'telefono', message: 'Por favor, Escriba el Teléfono'},
            {field: 'email', message: 'Por favor, Escriba el Correo Electrónico'},
            {field: 'id_ubigeo', message: 'Por favor, Escriba el Ubigeo'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[type="submit"]');
        DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
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

    ContentModalSave: function() {
        var chtml = `
            <form name="save" id="formSave">
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
                    <div class="modal-footer mt-3 pb-1 d-flex justify-content-center">
                        <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                        <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                    </div>
                    
                </div>
                
            </form>
            `;
        return chtml;
    },

    new: async function() {

        let accion = 'save';
        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;
        this.imagen_factura_anterior = null;

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR EMPRESA',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
        Componente.validarForm('formSave');

        Componente.eventos();
        await Componente.select_ubigeo();   
    },

    edit: async function(data) {
        
        let accion = 'save';
        this.id = data.id;
        this.action_submit = accion;     
        this.imagen_anterior = data.logo;
        this.imagen_factura_anterior = data.logo_factura;

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR EMPRESA',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Componente.validarForm('formSave', 'editar');

        let form = DOM.find('form[name="save"]');

        Componente.eventos();
        await Componente.select_ubigeo();   

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

    },

    delete: async function(data) {

        let accion = 'delete';
        this.id = data.id;
        this.action_submit = accion;

        var resp = await HELPER.DeleteRegistro();
        if (resp) {
            Componente.submit_delete();
        } 
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/catalogo_empresa/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.datatable();
            __closeModal(__idModal);
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_delete: function() {
    
        let formData = new FormData();
        if (this.id != null) { formData.append('id', this.id); }
        axios({
            method: 'post',
            url: BASE_API + 'configuracion/catalogo_empresa/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.datatable();
            HELPER.notificacion(response.data.mensaje, 'success');

        }).catch(error => {
            console.error(error);
        });
    },
} 

export default Componente;