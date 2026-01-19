
let DOM, DOM_ID, __idModal = '';
let Componente = {
    render: (d) => {        
        $('#main').off();
        d.innerHTML = `
        <div id="main">      
            <h4 class="fw-bold py-0 mb-4"><span class="text-muted fw-light">Mantenedor /</span> Usuarios</h4>
            <!-- Users List Table -->
            <div class="card">  
                <div class="d-flex justify-content-between align-items-center row pt-3 px-4 gap-3 gap-md-0">
                    <div class="col-sm-12 text-end">
                        <button type="button" class="btn rounded-pill btn-info waves-effect waves-light" name="nuevo">
                            <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                            Nuevo usuario
                        </button>
                    </div>
                </div> 
                <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                </div>
            </div>    
            <!-- Pop ups -->
            <div id="container_modal">
            </div>
            <!-- / Pop ups -->
        </div>
        `;

        Componente.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        Componente.renderDatatable();
        
        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_autoevento: true,
    

    /************ */
    Eventos: function()
    {
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* CHANGE TIPO PERSONA */
        DOM.on('change', 'select[name="tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_persona();
            Componente.change_cambio_local();
        });

        DOM.on('change', 'select[name="id_rol"]', function(e) {
            e.stopImmediatePropagation();
            console.log(this.value);
        });
    },

    change_cambio_local: () => {
        if(DOM.find('select[name="tipo_persona"]').val() == '')
        {
            DOM.find('div[name="contenedor-cambio_local"]').show('slide');
            DOM.find('input[name="fl_cambio_local"]').prop('disabled', false);
        }
        else
        {
            DOM.find('div[name="contenedor-cambio_local"]').hide('slide');
            DOM.find('input[name="fl_cambio_local"]').prop('disabled', true);
        }
    },

    change_tipo_persona: () => {

        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();

        DOM.find('div[name="contenedor-personal"]').hide();
        DOM.find('div[name="contenedor-cliente"]').hide();

        DOM.find('select[name="id_personal"]').prop('disabled', true);
        DOM.find('select[name="id_cliente"]').prop('disabled', true);

        /** OCULTAR CAMPOS PARA DIGITAR NOMBRE Y APELLIDO */
        DOM.find('input[name="nombre"]').prop('disabled', true);
        DOM.find('input[name="apellido"]').prop('disabled', true);

        DOM.find('div[name="contenedor-nombre"]').hide();
        DOM.find('div[data-no_cliente="true"]').show();

        if(tipo_persona == 'PERSONAL')
        {
            DOM.find('div[name="contenedor-personal"]').show('slide');
            DOM.find('select[name="id_personal"]').prop('disabled', false);
        }
        else if(tipo_persona == 'CLIENTE')
        {
            DOM.find('div[name="contenedor-cliente"]').show('slide');
            DOM.find('select[name="id_cliente"]').prop('disabled', false);
            DOM.find('div[data-no_cliente="true"]').hide('slide');
        }
        else
        {
            /** MOSTRAR CAMPOS PARA DIGITAR NOMBRE Y APELLIDO */
            DOM.find('input[name="nombre"]').prop('disabled', false);
            DOM.find('input[name="apellido"]').prop('disabled', false);

            DOM.find('div[name="contenedor-nombre"]').show('slide');
        }
    },

    // select_local: function()
    // {
    //     let select = DOM.find('select[data-select="LOCAL"]');
    //     select.append($('<option></option>').attr('value', '').text('Ninguno...'));
    //     axios.get(BASE_API+'configuracion/local/get_select')
    //     .then(function (response) {
    //         response.data.forEach(row => {
    //             select.append('<option value="'+row.id+'">'+row.text+'</option>');
    //         });
    //         $.select2();  
    //     }).catch(error => {
    //         console.log(error);
    //     }); 
    // },

    select_cliente: function() {

        var urlB = BASE_API + "configuracion/socio/get_select?fl_cliente=true";
        $.select2_buscar('sltCliente', urlB, "Buscar Razón Social o Número de Documento", 5);
    },

    select_personal: function()
    {
        let select = DOM.find('select[data-select="PERSONAL"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
        axios.get(BASE_API+'mantenedor/personal/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            $.select2();  
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_rol: function()
    {
        let select = DOM.find('select[data-select="rol"]');
        select.append($('<option></option>').attr('value', '0').text('SUPER ADMINISTRADOR'));
        axios.get(BASE_API+'configuracion/rol/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            $.select2();
        }).catch(error => {
            console.log(error);
        }); 
        //$('#mySelect2').val(null).trigger('change');
    },

    list_datatable: async () => {
        try {
            let response = await axios.get(BASE_API + 'configuracion/usuario');
            return response.data;
        } catch (error) {           
            console.error(error);
            return null;
            //throw error;
        }
    },
    
    renderDatatable:  async function() {

        var oData = await Componente.list_datatable();

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var statusObj = {   
            1: { title: "Suspendido", class: "bg-label-secondary" },
            0: { title: "Activo", class: "bg-label-success" },
            2: { title: "Eliminado", class: "bg-label-warning" },
        };

        var oColums = [
            //{ "data": null, 'width': '2px', },
            {
                "data": null, "title": "NOMBRE COMPLETO", "class": "text-left", ordenable: false,
                render:
                    function (data, type, row) {

                        var $name = row.nombrecompleto,
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
            { "data": "usuario", "title": "USUARIO", "class": "text-left", ordenable: false },
            { "data": "rol", "title": "ROL", "class": "text-left", ordenable: true },
            // { "data": "local", "title": "LOCAL", "class": "text-left", ordenable: true },
            //{ "data": "tipo_persona", "title": "TIPO PERSONA", "class": "text-left", ordenable: true },
            {
                "data": null, "title": "ESTADO", "class": "text-center", ordenable: false,
                render:
                    function (data, type, row) {
  
                        var $status = row.fl_suspendido ? row.fl_suspendido : 0;
                        return (
                          '<span class="badge rounded-pill ' +
                          statusObj[$status].class +
                          '" text-capitalized>' +
                          statusObj[$status].title +
                          "</span>"
                        );
                    }
            },
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

                        if (row.fl_suspendido == 1) {
                            arrayMasButton.push(
                                {
                                element: "a",
                                properties: {class: "dropdown-item btnActivar",href: "javascript:;",html: '<i class="mdi mdi-account-reactivate me-2"></i><span>Reactivar</span>'},
                                },
                            );
                        }else{
                            arrayMasButton.push(
                                {
                                element: "a",
                                properties: {class: "dropdown-item btnSuspender",href: "javascript:;",html: '<i class="mdi mdi-pause me-2"></i><span>Dar de Baja</span>'},
                                },
                            );
                        }
                        arrayMasButton.push(
                            {
                            element: "a",
                            properties: {class: "dropdown-item btnCambiarClave",href: "javascript:;",html: '<i class="mdi mdi-lock-outline me-2"></i><span>Cambiar Contraseña</span>'},
                            },
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

        var arrayColumnDef = [
            // {
            //     // For Responsive
            //     className: 'control',
            //     orderable: false,
            //     searchable: false,
            //     responsivePriority: 1,
            //     targets: 0,
            //     render: function (data, type, full, meta) {
            //         return '';
            //     }
            // },
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 2,
                targets: 4
            },
        ];

        var datableTarea = __generateDataTable(
            'tblRegistros',
            oData,
            oColums,
            arrayColumnDef, 
            15,
            [15, 20, 30, 40],
            [0,1,2,3],
            'LISTADO DE USUARIOS'
        );

        $('.tblRegistros tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit(oDataRow);       
        });
        $('.tblRegistros tbody').on('click', '.btnActivar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.activar(oDataRow);
        });
        $('.tblRegistros tbody').on('click', '.btnSuspender', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.suspender(oDataRow);
        });
        $('.tblRegistros tbody').on('click', '.btnCambiarClave', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit_password(oDataRow);
        });
        $('tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.delete(oDataRow);
        });

    },

    validarForm: function (idform, accion = 'nuevo') {
        var validateClave = {
            validators: {
                notEmpty: {
                    message: 'Ingrese su contraseña',
                },
                stringLength: {
                    min: 4,
                    max: 30,
                    message: 'Este campo debe tener más de 4 y menos de 30 caracteres'
                }
            },
        };

        validateClave = accion == 'nuevo' ? validateClave : {};

        var fields = {
            nombre: {
                validators: {
                    callback: {
                        message: 'Ingrese el nombre',
                        callback: function (input) {
                            var value = $('select[name=tipo_persona]').val();
                            return (value != '')
                                ? true
                                : (input.value != '');
                        }
                    }
                }
            },
            apellido: {
                validators: {
                    callback: {
                        message: 'Ingrese los apellidos',
                        callback: function (input) {
                            var value = $('select[name=tipo_persona]').val();
                            return (value != '')
                                ? true
                                : (input.value != '');
                        }
                    }
                }
            },
            id_personal: {
                validators: {
                    callback: {
                        message: 'Seleccione el personal',
                        callback: function (input) {
                            var value = $('select[name=tipo_persona]').val();
                            return (value != '')
                                ? true
                                : (input.value != 'PERSONAL');
                        }
                    }
                }
            },
            id_cliente: {
                validators: {
                    callback: {
                        message: 'Seleccione el cliente',
                        callback: function (input) {
                            var value = $('select[name=tipo_persona]').val();
                            return (value != '')
                                ? true
                                : (input.value != 'CLIENTE');
                        }
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, ingrese su correo electrónico',
                        
                    },
                    emailAddress: {
                        message: 'Deber ingresar un email válido',
                    }
                },
            },
            usuario: {
                validators: {
                    notEmpty: {
                        message: 'Por favor, ingrese su usuario',
                        
                    },
                },
            },
            clave: validateClave,
        };

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

    ContentModalSave: function(accion = 'nuevo') {
        var nombreButton = (accion == 'nuevo' ?'REGISTRAR':'ACTUALIZAR');
        var chtml = `<form name="save" id="formSave">
                        <div class="row"> 
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-12" name="contenedor-personal">
                                        <div class="form-group">
                                            <label class="form-label">Personal <span class="text-danger">*</span></label>
                                            <select data-select="PERSONAL" name="id_personal" class="form-select select2" autocomplete="off"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="contenedor-cliente">
                                        <div class="form-group">
                                            <label class="form-label">Cliente <span class="text-danger">*</span></label>
                                            <select data-select="CLIENTE" class="form-select sltCliente" name="id_cliente" id="id_cliente"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="contenedor-nombre">
                                        <div class="row">
                                            <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Nombre(s) <span class="text-danger">*</span></label>
                                                <input type="text" name="nombre" class="form-control" autocomplete="off">
                                            </div>
                                            </div>
                                            <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Apellidos <span class="text-danger">*</span></label>
                                                <input type="text" name="apellido" class="form-control" autocomplete="off">
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Correo Electrónico <span class="text-danger">*</span><small>(Recuperar Contraseña)</small></label>
                                            <input type="email" name="email" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Usuario <span class="text-danger">*</span></label>
                                            <input type="text" name="usuario" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Contraseña <span class="text-danger">*</span></label>
                                            <input type="text" name="clave" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-no_cliente="true">
                                        <div class="form-group">
                                            <label class="form-label">Rol y Permisos</label>
                                            <select name="id_rol" data-select="rol" class="form-select select2"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12 d-none">
                                        <div class="form-group">
                                            <label class="form-label">Local Anexo</label>
                                            <select name="id_local" data-select="LOCAL" class="form-select"></select>
                                        </div>
                                    </div>
                                    <div class="col-xl-12 p-4 d-none">
                                        <div class="text-light small fw-semibold">Otros permisos</div>
                                        <div class="demo-inline-spacing">
                                            <label class="switch switch-primary">
                                                <input type="checkbox" class="switch-input" name="fl_cambio_local">
                                                <span class="switch-toggle-slider">
                                                <span class="switch-on"></span>
                                                <span class="switch-off"></span>
                                                </span>
                                                <span class="switch-label">Cambio de local</span>
                                            </label>
                                            <label class="switch switch-primary d-none">
                                                <input type="checkbox" class="switch-input" name="fl_supervisor">
                                                <span class="switch-toggle-slider">
                                                <span class="switch-on"></span>
                                                <span class="switch-off"></span>
                                                </span>
                                                <span class="switch-label">Supervisor</span>
                                            </label>
                                            <label class="switch switch-primary d-none">
                                                <input type="checkbox" class="switch-input" name="fl_soporte_cliente">
                                                <span class="switch-toggle-slider">
                                                <span class="switch-on"></span>
                                                <span class="switch-off"></span>
                                                </span>
                                                <span class="switch-label">Acceso Soporte al Cliente</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Tipo Persona</label>
                                            <select name="tipo_persona" class="form-select">
                                                <option value="">USUARIO COMÚN</option>
                                                <option value="PERSONAL">PERSONAL</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mt-2" align="center">                                      
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
                        </div>
                        <div class="modal-footer mt-3 pb-1 d-flex justify-content-center">
                            <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary waves-effect waves-light rounded-pill"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> `+nombreButton+`</button>
                        </div>
                    </form>`;
        return chtml;
    },

    new: async function() {
        
        let accion = 'save';
        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR USUARIO',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        let form = DOM.find('form[name="'+accion+'"]');

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');
        form.find('input[name="clave"]').prop('disabled', false);

        Componente.validarForm('formSave');
        Componente.Eventos();
        Componente.change_tipo_persona();
        Componente.select_rol();
        Componente.select_personal();
        //Componente.select_local();
        Componente.select_cliente();
    },

    edit: (data) => {
        
        let accion = 'save';
        Componente.id = data.id;
        Componente.action_submit = accion;
        Componente.imagen_anterior = data.imagen;
        Componente.imagen_firma_anterior = data.imagen_firma;

        var cHtml = Componente.ContentModalSave('editar');
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR USUARIO',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
              
        let form = DOM.find('form[name="save"]');

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="apellido"]').val(data.apellido);
        form.find('input[name="email"]').val(data.email);
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('select[name="id_local"]').val(data.id_local).change();
        form.find('select[name="id_rol"]').val(data.id_rol).change();
        form.find('select[name="id_personal"]').val(data.id_personal).change();
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        form.find('input[name="fl_ocultar_data"]').prop('checked', parseInt(data.fl_ocultar_data));
        form.find('input[name="fl_importe"]').prop('checked', parseInt(data.fl_importe));
        form.find('select[name="tipo_persona"]').val(data.tipo_persona).change();
        form.find('select[name="id_cliente"]').val(data.id_cliente).change();
        form.find('input[name="fl_acceso"]').prop('checked', parseInt(data.fl_acceso));
        form.find('input[name="clave"]').prop('disabled', true);
        
        Componente.validarForm('formSave', 'editar');
        Componente.Eventos();
        Componente.change_tipo_persona();
        Componente.select_rol();
        Componente.select_personal();
        //Componente.select_local();
        Componente.select_cliente();

    },

    edit_password: function(data) {

        let accion = 'save_password';
        this.id = data.id;
        this.action_submit = accion;

        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 1,
            cHtml : '<form name="save_password">\
                    <div class="mt-3 pb-1">\
                    <div class="mb-2"><label class="form-label">Usuario</label><input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled></div>\
                    <div class="mb-2"><label class="form-label">Email</label><input type="text" data-mayus="false" name="email" class="form-control" autocomplete="off" disabled></div>\
                    <div class="mb-2"><label class="form-label">Nueva contraseña</label><input type="text" data-mayus="false" name="password" class="form-control mayus_false" autocomplete="off" required></div>\
                    </div>\
                    <div class="swal2-actions" style="display: flex;">\
                    <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>\
                    <button type="submit" class="btn btn-primary waves-effect waves-light rounded-pill" style="display: inline-block;" aria-label=""><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> GUARDAR</button>\
                    </div></form>',  
            header : 1,
            titulo : 'MODIFICAR CONTRASEÑA',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1
        });

        DOM.on('click', 'form[name="save_password"] button[type="submit"]', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            Componente.submit();   
        });

        let form = DOM.find('form[name="save_password"]');
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);
    },

    suspender: function(data) {

        let accion = 'save_suspendido';
        this.id = data.id;
        this.action_submit = accion;

        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 1,
            cHtml : '<form name="save_suspendido">\
                    <div class="mt-3 pb-1">\
                    <div class="mb-2"><label class="form-label">Usuario</label><input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled></div>\
                    <div class="mb-2"><label class="form-label">Email</label><input type="text" data-mayus="false" name="email" class="form-control" autocomplete="off" disabled></div>\
                    </div>\
                    <div class="swal2-actions" style="display: flex;">\
                    <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>\
                    <button type="submit" class="btn btn-primary waves-effect waves-light rounded-pill" style="display: inline-block;" aria-label=""><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> GUARDAR</button>\
                    </div></form>',  
            header : 1,
            titulo : 'SUSPENDER USUARIO',
            iconoTitulo : 'mdi mdi-pause-octagon-outline',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1
        });

        DOM.on('click', 'form[name="save_suspendido"] button[type="submit"]', function(e) {
            e.preventDefault();
            Componente.submit();   
        });
        
        let form = DOM.find('form[name="save_suspendido"]');
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);
    },

    activar: function(data) {

        let accion = 'save_activar';
        this.id = data.id;
        this.action_submit = accion;

        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 1,
            cHtml : '<form name="save_activar">\
                    <div class="mt-3 pb-1">\
                    <div class="mb-2"><label class="form-label">Usuario</label><input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled></div>\
                    <div class="mb-2"><label class="form-label">Email</label><input type="text" data-mayus="false" name="email" class="form-control" autocomplete="off" disabled></div>\
                    </div>\
                    <div class="swal2-actions" style="display: flex;">\
                    <button type="button" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal">Cancelar</button>\
                    <button type="submit" class="btn btn-primary waves-effect waves-light rounded-pill" style="display: inline-block;" aria-label=""><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> GUARDAR</button>\
                    </div></form>',  
            header : 1,
            titulo : 'ACTIVAR USUARIO',
            iconoTitulo : 'mdi mdi-account-reactivate',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1
        });

        DOM.on('click', 'form[name="save_activar"] button[type="submit"]', function(e) {
            e.preventDefault();
            Componente.submit();   
        });

        let form = DOM.find('form[name="'+accion+'"]');
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);
    },

    delete: function(data) {

        let accion = 'delete';
        
        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;
        this.imagen_firma_anterior = data.imagen_firma;

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
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        
        axios({
            method: 'post',
            url: BASE_API + 'configuracion/usuario/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.renderDatatable();
            __closeModal(__idModal);
            HELPER.notificacion_v2(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;