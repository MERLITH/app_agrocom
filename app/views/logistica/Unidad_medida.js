
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
                            Inventario
                        </span> 
                        &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                        <small>
                            <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                            <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                            <a href="javascript:" class="icon-home text-primary">Unidad de medida</a>&nbsp;
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
    select_unidad_medida_sunat: async () =>
    {
        // let select = DOM.find('select[data-select="UNIDAD_MEDIDA_SUNAT"]'); 
        // select.empty();     
        // select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        // await axios.get(BASE_API+'recursos/data_static/unidad_medida')
        // .then(function (response) {

        //     response.data.forEach(row => {
        //         select.append('<option value="'+row.id+'">'+row.text+'</option>');
        //     });

        //     select.select2();
        // }).catch(error => {
        //     console.log(error);
        // }); 

        var url = "recursos/data_static/unidad_medida";
        var idcombo = DOM.find('select[data-select="UNIDAD_MEDIDA_SUNAT"]');
        await $.select_render(url, idcombo);  
    },

    datatable: async function() {

        var oData = await $.getData('logistica/unidad_medida');

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            { "data": "nombre", "title": "NOMBRE", "class": "text-left", ordenable: true },
            { "data": "codigo_sunat", "title": "CÓDIGO SUNAT", "class": "text-left", ordenable: true },
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

    ContentModalSave: function() {
        var chtml = `
            <form name="save" id="formSave">
                <div class="row mt-2">
                    <div class="col-12">
                        <label class="form-label">Nombre <b class="text-danger">*</b></label>
                        <input type="text" name="nombre" class="form-control" autocomplete="off">
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Código SUNAT </label>
                            <select name="codigo_sunat" data-select="UNIDAD_MEDIDA_SUNAT" class="form-control"></select>
                        </div>
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

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR UNIDAD DE MEDIDA',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
        Componente.validarForm('formSave');

        Componente.select_unidad_medida_sunat();
    },

    edit: async function(data) {
        
        let accion = 'save';
        this.id = data.id;
        this.action_submit = accion;

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR UNIDAD DE MEDIDA',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Componente.validarForm('formSave', 'editar');
        await Componente.select_unidad_medida_sunat();

        let form = DOM.find('form[name="save"]');

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('select[name="codigo_sunat"]').val(data.codigo_sunat).change();
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
            url: BASE_API + 'logistica/unidad_medida/' + this.action_submit,
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
            url: BASE_API + 'logistica/unidad_medida/' + this.action_submit,
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