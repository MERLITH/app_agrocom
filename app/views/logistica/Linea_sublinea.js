
let DOM, DOM_ID, __idModal = '';
let Componente = {

    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            
            <div class="row mt-2">
                <div class="col-md-12">
                    <h4 class="fw-bold py-0 mb-4">
                        <span class="text-muted fw-light">
                            Inventario
                        </span> 
                        &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                        <small>
                            <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                            <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                            <a href="javascript:" class="icon-home text-primary">Líneas y Sublíneas</a>&nbsp;
                        </small>
                    </h4>
                </div>

                <div class="col-md-6 card p-2">       
                    <div class="col-md-12 text-end">
                        <button type="button" class="btn rounded-pill btn-primary waves-effect waves-light" name="nuevo">
                            <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                            Nuevo Registro
                        </button>
                    </div>
                    <div class="col-md-12">
                        <div class="card-datatable table-responsive" id="Cnt_tblRegistros"></div>
                    </div>
                </div>


                <div class="col-md-6 card p-2">       
                    <div class="col-md-12">
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="form-label">Seleccione una Línea:</label>
                                <select name="id_linea" data-select="LINEA" class="form-select" /><select>
                            </div>
                            <div class="col-md-6 text-end">
                                <button type="button" class="btn rounded-pill btn-primary waves-effect waves-light" name="nuevo_sublinea">
                                    <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                                    Nuevo Registro
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-12">
                        <div class="card-datatable table-responsive" id="Cnt_tblRegistros_2"></div>
                    </div>
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

        DOM.on('click', 'button[name="nuevo_sublinea"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new_subl();
        });

        DOM.on('change', 'select[name="id_linea"]', function(e) {
            e.stopImmediatePropagation();
            Componente.datatable_subl();
        });

        await Componente.select_linea();
        Componente.datatable();
        Componente.datatable_subl();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    id_sublinea : null,

    /************ */

    select_linea: async () =>
    {
        var url = "logistica/linea/get_select";
        var idcombo = DOM.find('select[data-select="LINEA"]');
        await $.select_render(url, idcombo);  
    },

    /**************** SUBLINEA *********************************/
    datatable_subl: async function() {

        let parametros = {
            id_linea : DOM.find('select[name="id_linea"]').val(),
        };

        var oData = await $.getData('logistica/sublinea?'+jQuery.param(parametros));

        var htmlTable = '<table class="datatables-users table tblRegistros_2"></table>';
        DOM.find('#Cnt_tblRegistros_2').html(htmlTable);

        var oColums = [
            { "data": "nombre", "title": "NOMBRE", "class": "text-left", ordenable: true },
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
            'tblRegistros_2',
            oData,
            oColums,
            [], 
            15,
            [15, 20, 30, 40],
            [0],
            'LISTADO DE SUBLÍNEAS'
        );

        $('.tblRegistros_2 tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit_subl(oDataRow);     
        });
        $('.tblRegistros_2 tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.delete_subl(oDataRow);
        });

    },

    validarForm_subl: function (idform, accion = 'nuevo') {

        var arrayFields = [
            {field: 'nombre', message: 'Por favor, Escriba el nombre'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[type="submit"]');
        DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
            //e.stopImmediatePropagation();
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.submit_subl();
                }
            });           
        });

    },

    new_subl: async function() {

        let accion = 'save_sublinea';
        this.id = null;
        this.action_submit = accion;

        var cHtml = Componente.ContentModalSave('save_sublinea');
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR SUBLÍNEA',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
        Componente.validarForm_subl('save_sublinea');
    },

    edit_subl: async function(data) {
        
        let accion = 'save_sublinea';
        this.id = data.id;
        this.action_submit = accion;

        var cHtml = Componente.ContentModalSave('save_sublinea');
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR SUBLÍNEA',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Componente.validarForm_subl('save_sublinea', 'editar');

        let form = DOM.find('form[name="save_sublinea"]');

        form.find('input[name="nombre"]').val(data.nombre);
    },

    delete_subl: async function(data) {

        let accion = 'delete_sublinea';
        this.id = data.id;
        this.action_submit = accion;

        var resp = await HELPER.DeleteRegistro();
        if (resp) {
            Componente.submit_delete_subl();
        } 
    },

    
    submit_subl: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        formData.append('id_linea', DOM.find('select[name="id_linea"]').val());

        axios({
            method: 'post',
            url: BASE_API + 'logistica/sublinea/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.datatable_subl();
            __closeModal(__idModal);
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_delete_subl: function() {
    
        let formData = new FormData();
        if (this.id != null) { formData.append('id', this.id); }
        axios({
            method: 'post',
            url: BASE_API + 'logistica/sublinea/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.datatable_subl();
            HELPER.notificacion(response.data.mensaje, 'success');
        }).catch(error => {
            console.error(error);
        });
    },

    /**************** LINEA *********************************/

    datatable: async function() {

        var oData = await $.getData('logistica/linea');

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            { "data": "nombre", "title": "NOMBRE", "class": "text-left", ordenable: true },
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
            'LISTADO DE ARTÍCULOS'
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
            {field: 'nombre', message: 'Por favor, Escriba el nombre'},
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

    ContentModalSave: function(idForm) {
        var chtml = `
            <form name="`+idForm+`" id="`+idForm+`">
                <div class="row mt-2">
                    <div class="col-12">
                        <label class="form-label">Nombre <b class="text-danger">*</b></label>
                        <input type="text" name="nombre" class="form-control" autocomplete="off">
                    </div>
                </div>
                <div class="modal-footer mt-3 pb-1 d-flex justify-content-center">
                    <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                    <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                </div>
            </form>
            `;
        return chtml;
    },

    new: async function() {

        let accion = 'save';
        this.id = null;
        this.action_submit = accion;

        var cHtml = Componente.ContentModalSave('save');
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR LÍNEA',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
        Componente.validarForm('save');
    },

    edit: async function(data) {
        
        let accion = 'save';
        this.id = data.id;
        this.action_submit = accion;

        var cHtml = Componente.ContentModalSave('save');
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR LÍNEA',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Componente.validarForm('save', 'editar');

        let form = DOM.find('form[name="save"]');

        form.find('input[name="nombre"]').val(data.nombre);
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
            url: BASE_API + 'logistica/linea/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.datatable();
            __closeModal(__idModal);
            HELPER.notificacion(response.data.mensaje, 'success');
            Componente.select_linea();
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
            url: BASE_API + 'logistica/linea/' + this.action_submit,
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