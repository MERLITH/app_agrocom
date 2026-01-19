

let DOM, DOM_ID, __idModal = '';
let Componente = {

    modal: (fl_basic = false) => {

        let html = `
            <!-- Pop ups -->
            <div id="container_modal"></div>
            <!-- / Pop ups -->
        `;

        return html;
    },

    render: async (d, tipo, parent_comp = false) => {

        Componente.tipo = tipo;
        Componente.parent_comp = parent_comp;        

        let main_random = 'main_'+Math.random().toString(36).substr(2);

        $('#'+main_random).off();
        if(parent_comp != false)
        {
            d.html(`
                <div id="`+main_random+`"><div id="container_modal"></div></div> 
            `);
        }
        else
        {
            d.innerHTML = `
                <div id="`+main_random+`"> 
                
                <div class="row mt-2">
                    <div class="col-md-8">
                        <h4 class="fw-bold py-0 mb-4">
                            <span class="text-muted fw-light">
                                Mantenedor
                            </span> 
                            &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                            <small>
                                <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                                <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                                <a href="javascript:" class="icon-home text-primary">Clientes</a>&nbsp;
                            </small>
                        </h4>
                    </div>
                </div>
                    <!-- Users List Table -->
                    <div class="card">   
                        <div class="d-flex justify-content-between align-items-center row pt-3 px-4 gap-3 gap-md-0">
                            <div class="col-md-2 d-none">
                                <div class="form-floating form-floating-outline">
                                    <select class="form-select text-capitalize" id="slt_tipo_persona_f">
                                        <option value="CLIENTE" selected>CLIENTE</option>
                                    </select>
                                    <label for="slt_tipo_persona_f">Tipo persona</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating form-floating-outline">
                                    <select class="form-select text-capitalize" id="slt_tipo_documento_f" data-select="DOCUMENTO_ENTIDAD"></select>
                                    <label for="slt_tipo_documento_f">Documento</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-floating form-floating-outline">
                                    <input class="form-control" type="text" id="numero_documento_f">
                                    <label for="numero_documento_f">Número doc.</label>
                                </div>
                            </div>

                            <div class="col-sm-2 text-start">
                                <button type="button" class="btn btn-sm rounded-pill btn-primary waves-effect waves-light" name="filtrarTable" id="filtrarTable">
                                    <span class="tf-icons mdi mdi-magnify me-1"></span>
                                </button>
                            </div>
                            <div class="col-sm-4 text-end">
                                <button type="button" class="btn rounded-pill btn-info waves-effect waves-light" name="nuevo">
                                    <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                                    Nuevo Registro
                                </button>
                            </div>
                        </div>
                        <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                        </div>
                    </div>    
                    <!-- Pop ups -->
                    <div id="container_modal"></div>
                    <!-- / Pop ups -->

                </div> 
                
                `;

        }

        await Componente.after_render(main_random);   
        
    },

    after_render: async (main_random) => {

        DOM_ID = '#'+main_random;
        DOM = $(DOM_ID);           

        if(Componente.parent_comp == false)
        {

            DOM.on('click', 'button[name="filtrarTable"]', function(e) {
                e.stopImmediatePropagation();
                Componente.renderDatatable();
            });

            /* NUEVO */
            DOM.on('click', 'button[name="nuevo"]', function(e) {
                e.stopImmediatePropagation();
                Componente.new();
            });

            Componente.renderDatatable();

        }

        Componente.select_documento_entidad();
        // var resp = await $.cargar_constante('A', 100, 1);
        // console.log(resp);

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    array_rutas : [],
    array_documento: [],

    Eventos: function()
    {
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /** CHANGE DOCUMENTO */
        DOM.on('change', 'select[name="id_documento"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_documento();
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
    
    change_documento: () => {        

        if(DOM.find('select[name="id_documento"]').val() == 2)
        {
            DOM.find('.divRazonSocial').show();
            DOM.find('.divNombreCompleto').hide();
        }
        else
        {
            DOM.find('.divRazonSocial').hide();
            DOM.find('.divNombreCompleto').show();
        }

    },

    buscar_numero: async function() {

        let form = DOM.find('form[name="save"]');
        let ladda = HELPER.ladda(DOM_ID+' button[name="buscar_numero"]');

        /** BUSQUEDA INTERNO */
        await axios.get(BASE_API + 'mantenedor/persona/buscar?numero='+form.find('input[name="numero_documento"]').val())
        .then(async function (response) {

            let fl_buscar = true;

            if(typeof response.data === 'object' && !Array.isArray(response.data)) 
            {
                let opcion = confirm("El cliente ya existe, ¿Desea buscar nuevamente los datos en SUNAT/RENIEC?");
                if (opcion != true) {
                    fl_buscar = false;
                    ladda.stop();
                }                 
            }
            
            if(fl_buscar == true)
            {
                /*** BUSQUEDA EN SUNAT */
                await axios.get(BASE_API + 'recursos/busqueda/reniec_sunat?numero='+form.find('input[name="numero_documento"]').val())
                .then(function (response) {

                    console.log(response.data);

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'RUC')
                    {
                        form.find('input[name="razon_social"]').val(response.data.razon_social);
                        form.find('select[name="id_ubigeo"]').html('')
                        .append(new Option(response.data.ubigeo, response.data.ubigeo));
                        
                        form.find('label[name="condicion"]').text(response.data.condicion);

                        if(response.data.condicion == 'HABIDO')
                        {
                            form.find('label[name="condicion"]').css('color', 'green');
                        }
                        else
                        {
                            form.find('label[name="condicion"]').css('color', 'red');
                        }
                    }

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'DNI')
                    {
                        form.find('input[name="razon_social"]').val(response.data.apellido + ' '+ response.data.nombre);
                        form.find('input[name="apellidos"]').val(response.data.apellido);
                        form.find('input[name="nombres"]').val(response.data.nombre);
                        form.find('label[name="condicion"]').text('');
                    }
                    
                    form.find('input[name="direccion"]').val(response.data.direccion);  

                    ladda.stop();
                }).catch(error => {
                    console.log(error);
                    ladda.stop();
                }); 
            }

        }).catch(error => {
            console.log(error);
            ladda.stop();
        }); 


        
    },

    select_documento_entidad: async () =>
    {
        let select = DOM.find('select[data-select="DOCUMENTO_ENTIDAD"]');
        select.append($('<option></option>').attr('value', '').text('- Seleccione -'));

        await axios.get(BASE_API+'recursos/data_static/documento_entidad')
        .then(function (response) {
            Componente.array_documento = response.data;
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 
    },
    
    select_ubigeo: async () =>
    {

        var urlB = BASE_API + "recursos/data_static/ubigeo";
        $.select2_buscar('sltUbigeo', urlB, "Departamento - Provincia - Distrito", 3);

        
    },

    renderDatatable: async function() {

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            {
                "data": null, "title": "NOMBRE COMPLETO", "class": "text-left", ordenable: false,
                render:
                    function (data, type, row) {

                        var $name = row.razon_social,
                        $email = row.email,
                        $image = (row.imagen == 'sin_imagen.jpg' ? '' : row.imagen);

                        if ($image) {
                        // For Avatar image
                            var $output =
                                '<img src="' + BASE_FILES+'images/'+ $image + '" alt="Avatar" class="rounded-circle">';
                        } else {
                            // For Avatar badge
                            var stateNum = Math.floor(Math.random() * 6);
                            var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
                            var $state = states[stateNum],
                                $initials = $name.match(/\b\w/g) || [];
                            $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                            $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
                        }
                        // Creates full output for row
                        var $row_output =
                        '<div class="d-flex justify-content-start align-items-center user-name">' +
                        '<div class="avatar-wrapper">' +
                        '<div class="avatar avatar-sm me-3">' +
                        $output +
                        '</div>' +
                        '</div>' +
                        '<div class="d-flex flex-column">' +
                        '<a href="javascript:" class="text-heading text-truncate"><span class="fw-semibold">' +
                        $name +
                        '</span></a>' +
                        '<small class="text-muted">' +
                        $email +
                        '</small>' +
                        '</div>' +
                        '</div>';

                        return $row_output;

                    }
            },       
            
            { "data": null, "title": "DOCUMENTO", "class": "text-left", ordenable: false,
                render: function(data, type, row) { return row.documento+' '+row.numero_documento; } 
            },
            // { "data": "tipo", "title": "TIPO", "class": "text-left", ordenable: false },
            { "data": "direccion", "title": "DIRECCIÓN", "class": "text-left", ordenable: false },
            { "data": "telefono", "title": "TELÉFONO", "class": "text-left", ordenable: false },
            {
                "data": null, "title": "Acción", "class": "text-center", ordenable: false,
                render:
                    function (data, type, row) {
                        var arrayButton = [];

                        arrayButton.push(
                          {
                            element: "a",
                            properties: {class:"btn btn-sm btn-text-warning rounded-pill btn-icon item-edit btnEditar", href: "javascript:",html: '<i class="mdi mdi-pencil-outline"></i>'},
                          },
                          {
                            element: "a",
                            properties: {class:"btn btn-sm btn-text-danger rounded-pill btn-icon item-edit btnEliminar", href: "javascript:",html: '<i class="mdi mdi-delete-outline me-2"></i>'},
                          },
                        );

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

        var arrayColumnDef = [
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 2,
                targets: 4
            },
        ];

        var tipo_persona_f = DOM.find('#slt_tipo_persona_f').val();
        var tipo_documento_f = DOM.find('#slt_tipo_documento_f').val();
        var numero_documento_f = DOM.find('#numero_documento_f').val();
     
        var ajaxSettings = {
            url: BASE_API + 'mantenedor/persona',
            data: function (d) {
                d.tipo_persona_f = tipo_persona_f;
                d.tipo_documento_f = tipo_documento_f;
                d.numero_documento_f = numero_documento_f;
            }
        }

        var datableTarea = __generateDataTable_SSP(
            'tblRegistros', /** identificador de la tabla */ 
            ajaxSettings, /*ajax*/
            oColums,/** columnas */
            arrayColumnDef, /** mostrar columnas por defecto al se responsivo */
            25,/** paginacion inicial */
            [[25, 50, 75, 100, -1],[25, 50, 75, 100, 'Todos']],/** array de paginacion */
            [0,1,2,3],/** array de columnas a exportar */
            'LISTADO DE CLIENTES',/** título de exportación de la tabla */
            [], /** array de ordenar tabla */
        );

        $('.tblRegistros tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit(oDataRow);       
        });
        $('tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.delete(oDataRow);
        });

    },

    ContentModalSave: function(accion = 'nuevo') {       
        var nombreButton = (accion == 'nuevo' ?'REGISTRAR':'ACTUALIZAR');

        let style_hide = '';
        if(Componente.parent_comp)
        {
            style_hide = 'style="display:none;"';
        }

        var chtml = `
        <form name="save" id="formSave">
            <div class="order-0 order-md-1">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#tab_1" aria-controls="tab_1" aria-selected="true">
                            <i class="mdi mdi-account-outline mdi-20px me-1"></i>Datos Personales
                        </button>
                    </li>   
                </ul>
            </div>
            <div class="tab-content px-1">
                <div class="tab-pane fade show active" id="tab_1" role="tabpanel">
                    <div class="row">
                        <div class="col-md-3 d-none">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <div style="width: 100%; padding-bottom: 100%; position: relative;">
                                        <img name="imagen" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" class="rounded-circle cursor-pointer" alt="Descripción de la imagen">
                                    </div>
                                    <div class="mt-2">
                                        <label class="btn btn-label-primary btn-sm" style="width:100%;">
                                            <i class="mdi mdi-tab-search me-1"></i>Seleccionar Imagen de Perfil
                                            <input type="file" class="rounded-pill" name="imagen" style="display:none;">
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3 d-none">
                                    <div class="form-group">
                                        <label class="form-label">Tipo persona <span class="text-danger">*</span></label>
                                        <select name="tipo" class="form-select">
                                            <option value="CLIENTE">CLIENTE</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Documento <span class="text-danger">*</span></label>
                                        <select data-select="DOCUMENTO_ENTIDAD" name="id_documento" class="form-select"></select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Número DOC. <span class="text-danger">*</span></label> <label name="condicion"></label>
                                    <div class="input-group">
                                        <input type="text" name="numero_documento" class="form-control" autocomplete="off">
                                        <span class="input-group-btn">
                                            <button type="button" name="buscar_numero" style="border-top-left-radius: 0; border-bottom-left-radius: 0; height: 35px;" class="btn btn-primary"
                                                data-style="zoom-in">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-12 divRazonSocial" style="display: none">
                                    <div class="form-group">
                                        <label class="form-label">Razón Social <span class="text-danger">*</span></label>
                                        <input type="text" name="razon_social" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 divNombreCompleto">
                                    <div class="form-group">
                                        <label class="form-label">Nombres <span class="text-danger">*</span></label>
                                        <input type="text" name="nombres" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 divNombreCompleto">
                                    <div class="form-group">
                                        <label class="form-label">Apellidos <span class="text-danger">*</span></label>
                                        <input type="text" name="apellidos" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label class="form-label">Dirección <span class="text-danger">*</span></label>
                                        <input type="text" name="direccion" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Teléfono </label>
                                        <input type="text" name="telefono" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Fecha de nacimiento <span class="text-danger">*</span></label>
                                        <input type="date" name="fecha_nacimiento" class="form-control" autocomplete="off">
                                    </div>
                                </div>

                                <div class="col-md-12" `+style_hide+`>
                                    <div class="form-group">
                                        <label class="form-label">Email <small>Separar por comas</small> </label>
                                        <input type="text" name="email" class="form-control mayus_false" data-mayus="false" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">UBIGEO - (Departamento - Provincia - Distrito)</label>
                                        <div class="form-group">
                                            <select name="id_ubigeo" data-select="UBIGEO" class="form-select sltUbigeo"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer mt-3 pb-1 d-flex justify-content-center">
                <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary waves-effect waves-light rounded-pill"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> `+nombreButton+`</button>
            </div>
        </form>`;

        return chtml;
    },

    validarForm: function (idform, accion = 'nuevo') {

        var fields = {
            // tipo: {
            //     validators: {
            //         notEmpty: {
            //             message: 'Por favor, Seleccione el tipo de persona',
                        
            //         },
            //     },
            // },
            id_documento: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, Seleccione el documento',
                        
                    },
                },
            },
            numero_documento: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, Seleccione el número de documento',
                        
                    },
                },
            },
            nombres: {
                validators: {
                    callback: {
                        message: 'Ingrese el nombre',
                        callback: function (input) {
                            var value = $('select[name=id_documento]').val();
                            return (value == '2')
                                ? true
                                : (input.value != '');
                        }
                    }
                }
            },
            apellidos: {
                validators: {
                    callback: {
                        message: 'Ingrese los apellidos',
                        callback: function (input) {
                            var value = $('select[name=id_documento]').val();
                            return (value == '2')
                                ? true
                                : (input.value != '');
                        }
                    }
                }
            },
            razon_social: {
                validators: {
                    callback: {
                        message: 'Ingrese la razón social',
                        callback: function (input) {
                            var value = $('select[name=id_documento]').val();
                            return (value != '2')
                                ? true
                                : (input.value != '');
                        }
                    }
                },
            },
            direccion: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, Ingrese la dirección',
                        
                    },
                },
            },
            fecha_nacimiento: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, Seleccione la fecha de nacimiento',
                        
                    },
                },
            },
            
        };

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[type="submit"]');
        DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.submit();
                }
            });           
        });

    },

    new: async function() {

        let accion = 'save';
        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        let size_modal = 3;
        if(Componente.parent_comp)
        {
            size_modal = 2;
        }

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : size_modal,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR CLIENTE',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 1,
            noCerrarModal : 0,
            buttonCerrar : 1,  
        });

        Componente.Eventos();
        Componente.validarForm('formSave');
        Componente.select_documento_entidad();
        Componente.select_ubigeo();

    },

    edit: async function(data) {
        
        let accion = 'save';
        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;

        console.log(data);

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'EDITAR CLIENTE',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 1,
            noCerrarModal : 0,
            buttonCerrar : 1,  
        });

        
        Componente.validarForm('formSave', 'editar');     
        await Componente.select_documento_entidad();
        await Componente.select_ubigeo();
        Componente.Eventos();

        let form = DOM.find('form[name="save"]');
        form.find('select[name="id_documento"]').val(data.id_documento).change();
        form.find('input[name="numero_documento"]').val(data.numero_documento);
        form.find('input[name="razon_social"]').val(data.razon_social);
        form.find('input[name="nombres"]').val(data.nombres);
        form.find('input[name="apellidos"]').val(data.apellidos);
        form.find('input[name="direccion"]').val(data.direccion);
        form.find('input[name="telefono"]').val(data.telefono);
        form.find('input[name="email"]').val(data.email);
        form.find('select[name="tipo"]').val(data.tipo).change();
        form.find('input[name="fecha_nacimiento"]').val(data.fecha_nacimiento);

        if(data.id_ubigeo)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.ubigeo, data.id_ubigeo));
        }


    },

    delete: function(data) {

        let accion = 'delete';
        this.id = data.id;
        this.action_submit = accion;

        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : '<form name="delete"><h2 class="swal2-title" id="swal2-title" style="display: block;"><strong>¿Estás seguro de la eliminación?</strong></h2>\
                    <div class="mt-3 pb-1 d-flex justify-content-center">\
                    <div class="mb-2"><label for="detalle" class="form-label">No podrás revertir esto!</label></div>\
                    </div>\
                    <div class="swal2-actions" style="display: flex;">\
                    <button type="submit" class="btn btn-danger waves-effect waves-light rounded-pill" style="display: inline-block;" aria-label=""><span class="tf-icons mdi mdi-trash-can-outline me-1"></span> Sí, eliminar</button>\
                    <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>\
                    </div></form>',  
            header : 0,
            position : 2,
            noCerrarModal : 1
        });

        DOM.on('click', 'form[name="delete"] button[type="submit"]', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            Componente.submit();   
        });
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
       
        if(Componente.tipo == 'cliente')
        {
            formData.append('fl_cliente', 1);
        }

        if(Componente.tipo == 'proveedor')
        {
            formData.append('fl_proveedor', 1);
        }
        

        axios({
            method: 'post',
            url: BASE_API + 'mantenedor/persona/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            if(Componente.parent_comp == false)
            {
                Componente.renderDatatable();
                __closeModal(__idModal);
                HELPER.notificacion_v2(response.data.mensaje, 'success');
            }
            else
            {
                Componente.parent_comp(response.data.persona);
            }

            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;