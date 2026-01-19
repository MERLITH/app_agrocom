
import Comp_print_qr from './Print_qr.js'

let DOM, DOM_ID, __idModal = '' ;
let Componente = {

    modal: (fl_basic = false) => {

        let html = `
            <!-- Pop ups -->
            <div id="container_modal">
            </div>
            <!-- / Pop ups -->
        `;

        return html;
    },

    render: async (d, parent_comp = false) => {
        
        Componente.parent_comp = parent_comp;        

        let main_random = 'main_'+Math.random().toString(36).substr(2);

        $('#'+main_random).off();

        if(parent_comp != false)
        {
            d.html(`
                <div id="`+main_random+`">`+Componente.modal(true)+`</div> 
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
                                Inventario
                            </span> 
                            &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                            <small>
                                <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                                <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                                <a href="javascript:" class="icon-home text-primary">Artículo</a>&nbsp;
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

                <!-- MODAL SAVE -->
                `+Componente.modal()+`
                           
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
            /* NUEVO */
            DOM.on('click', 'button[name="nuevo"]', function(e) {
                e.stopImmediatePropagation();
                Componente.new();
            });

            Componente.datatable();
        }
        
        Componente.datatable();
        Componente.select_tipo_articulo();
        Componente.select_marca();
        Componente.select_linea();
        Componente.select_unidad_medida();
        Componente.select_almacen();

        HELPER.load_component();

        

    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    archivo_anterior: null,
    fl_auto_event: true,

    /************ */

    Eventos: () => {

        /* PREVIEW IMAGEN */
        DOM.find('input[name="image1"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

         DOM.find('input[name="image2"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen2"]'));
        });

        /** CHANGE LINEA */
        DOM.on('change', 'select[name="id_linea"]', function(e) {
            e.stopImmediatePropagation();
            Componente.select_sublinea();
        });

        /* CHANGE TEXT QRCODE */
        DOM.on('change', 'input[name="codigo_barra"]', function(e) {
            e.stopImmediatePropagation();
            Componente.generar_codigo_qr();
        });
        
    },

    print_qr: function(data) {

        let accion = 'print_qr';

        var cHtml = Componente.ContentModalPrintQR();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'Imprimir QR',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'edit_stock',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });    

        Componente.validarFormQR('print_qr', 'editar');
        Componente.Eventos();

        let form = DOM.find('form[name="'+accion+'"]');

        Componente.qrcode_print = new QRCode(document.getElementById("qrcode_print"), {
			width : 150,
			height : 150
		});

        Componente.qrcode_print.makeCode(data.codigo_barra);

        form.find('input[name="cantidad"]').val(1);
        form.find('input[name="ancho"]').val(150);
        form.find('input[name="altura"]').val(150);

        Componente.id = data.id;
        Componente.action_submit = accion;

    },

    generar_codigo_qr: () => {
        let texto = DOM.find('input[name="codigo_barra"]').val();

        if(texto == '')
        {
            $('#qrcode').hide('slide');
        }
        else
        {
            $('#qrcode').show('slide');
            Componente.qrcode_form.makeCode(DOM.find('input[name="codigo_barra"]').val());
        }
        
    },


    select_empresa: async () =>
    {
        var url = "configuracion/catalogo_empresa/get_select";
        var idcombo = DOM.find('select[data-select="EMPRESA"]');
        await $.select_render(url, idcombo);  
    },


    select_almacen: async () =>
    {
        var url = "logistica/almacen/get_select";
        var idcombo = DOM.find('select[data-select="ALMACEN"]');
        await $.select_render(url, idcombo);  
    },
    
    select_tipo_articulo: async () =>
    {
        var url = "logistica/tipo_articulo/get_select";
        var idcombo = DOM.find('select[data-select="TIPO_ARTICULO"]');
        await $.select_render(url, idcombo);  
    },

    select_marca: async () =>
    {
        var url = "logistica/marca/get_select";
        var idcombo = DOM.find('select[data-select="MARCA"]');
        await $.select_render(url, idcombo);  
    },

    select_unidad_medida: async () =>
    {
        var url = "logistica/unidad_medida/get_select";
        var idcombo = DOM.find('select[data-select="UNIDAD_MEDIDA"]');
        await $.select_render(url, idcombo);  
    },

    select_linea: async () =>
    {
        var url = "logistica/linea/get_select";
        var idcombo = DOM.find('select[data-select="LINEA"]');
        await $.select_render(url, idcombo);  
    },

    select_sublinea: async () =>
    {
        let id_linea = DOM.find('select[name="id_linea"]').val();
        var url = "logistica/sublinea/get_select?id_linea="+id_linea;
        var idcombo = DOM.find('select[data-select="SUBLINEA"]');
        await $.select_render(url, idcombo);  
    },

    submit_qr: async () =>
    {
        axios.get(BASE_API+'logistica/articulo/get_unique/'+Componente.id)
        .then(function (response) {
            
            let form = DOM.find('form[name="print_qr"]');

            Comp_print_qr.articulo_unico(response.data, form.find('input[name="cantidad"]').val(), form.find('input[name="ancho"]').val(), form.find('input[name="altura"]').val());
            
        }).catch(error => {
            console.log(error);
        });   
    },


    datatable: async function() {

        var oData = await $.getData('logistica/articulo');

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            { "title": 'ESTADO',"data": null, render: function(data, type, row) { 

                    let stock_minimo = row.cantidad_minimo;
                    stock_minimo = (stock_minimo != '') ? parseFloat(stock_minimo) : 0;

                    let stock = row.cantidad;
                    stock = (stock != '') ? parseFloat(stock) : 0;

                    if(stock == 0)
                    {
                        return '<span class="badge rounded-pill bg-danger">SIN STOCK</span>'; 
                    }
                    else if(stock < stock_minimo)
                    {
                        return '<span class="badge rounded-pill bg-warning">STOCK BAJO</span>'; 
                    }
                    
                    else
                    {
                        return '<span class="badge rounded-pill bg-success">STOCK ALTO</span>'; 
                    }              
                }
            },

            {
                "data": null, "title": "ARTÍCULO", "class": "text-left", ordenable: false,
                render:
                    function (data, type, row) {

                        var $name = row.name,
                        $image = (row.image1 == 'sin_imagen.jpg' ? '' : row.image1);

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
                        '</div>' +
                        '</div>';

                        return $row_output;

                    }
            },  
            { "title": 'EMPRESA', "data": 'empresa' },
            //{ "title": 'NOMBRE', "data": 'nombre' },
            { "title": 'TIPO ARTÍCULO', "data": 'tipo_articulo' },
            { "title": 'LÍNEA', "data": 'linea' },
            //{ "title": 'SUBLÍNEA', "data": 'sublinea' },
            { "title": 'MARCA', "data": 'marca' },
            { "title": 'UNIDAD MEDIDA', "data": 'unidad_medida' },
            { "title": 'STOCK', "data": 'cantidad' },
            { "title": 'STOCK MÍNIMO', "data": 'cantidad_minimo' },
            { "title": 'COSTO', "data": 'costo' },
            { "title": 'PRECIO', "data": 'price' },
            //{ "title": 'CÓDIGO DE BARRA', "data": 'codigo_barra' },
            //{ "title": 'ALMACEN', "data": 'almacen' },
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
                                properties: {class: "dropdown-item btnEditarStock",href: "javascript:;",html: '<i class="mdi mdi-tooltip-edit-outline me-2"></i><span>Editar el stock</span>'},
                            },
                            {
                                element: "a",
                                properties: {class: "dropdown-item btnImprimir",href: "javascript:;",html: '<i class="mdi mdi-printer-outline me-2"></i><span>Imprimir QR</span>'},
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

        $('.tblRegistros tbody').on('click', '.btnEditarStock', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit_stock(oDataRow);     
        });

        $('.tblRegistros tbody').on('click', '.btnImprimir', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.print_qr(oDataRow);     
        });

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
            {field: 'name', message: 'Por favor, Escriba el nombre del artículo'},
            {field: 'image1', message: 'Por favor, Seleccione una imagen'},
            {field: 'costo', message: 'Por favor, Escriba el costo del artículo'},
            {field: 'price', message: 'Por favor, Escriba el precio del artículo'},
            {field: 'id_category', message: 'Por favor, Seleccione el tipo de artículo'},
            {field: 'id_unidad_medida', message: 'Por favor, Seleccione la unidad de medida'},
            {field: 'id_catalogo_empresa', message: 'Por favor, Seleccione la empresa'},
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
    validarFormQR: function (idform, accion = 'nuevo') {

        var arrayFields = [
            {field: 'cantidad', message: 'Por favor, Escriba la cantidad'},
            {field: 'ancho', message: 'Por favor, Escriba el ancho'},
            {field: 'altura', message: 'Por favor, Escriba la altura'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[type="submit"]');
        DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
            //e.stopImmediatePropagation();
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.submit_qr();
                }
            });           
        });

    },
    validarFormEditarStock: function (idform, accion = 'nuevo') {

        var arrayFields = [
            {field: 'cantidad', message: 'Por favor, Escriba la cantidad'},
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
            <ul class="nav nav-tabs nav_articulo" role="tablist">
                <li class="nav-item" role="presentation" id="li_tab_1">
                    <button type="button" style="font-size: 14px;" class="nav-link waves-effect active" role="tab" data-bs-toggle="tab" data-bs-target="#nv_tab_1" aria-controls="navs-tab-home" aria-selected="true">
                        <span class="mdi mdi-content-save-check-outline"></span>&nbsp;Datos Generales
                    </button>
                </li>
            </ul>
            <div class="tab-content p-0">
                <div class="tab-pane fade active show" id="nv_tab_1" role="tabpanel">
                    <form name="save" id="formSave">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <div class="row"> 
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Empresa <span class="text-danger">(*)</span></label>
                                            <select name="id_catalogo_empresa" data-select="EMPRESA" class="form-control select2"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre <span class="text-danger">(*)</span></label>
                                            <input type="text" name="name" class="form-control" autocomplete="off">
                                        </div>
                                    </div>  
                                    <div class="col-md-8">
                                    <div class="form-group">
                                        <label> <i class="fa fa-qrcode"></i> Código QR </label>
                                        <input type="text" name="codigo_barra" class="form-control" autocomplete="off">
                                    </div>
                                    </div>         
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Categoría </label>
                                            <select name="id_category" data-select="TIPO_ARTICULO" class="form-control select2"></select>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Línea </label>
                                        <select name="id_linea" data-select="LINEA" class="form-control select2"></select>
                                    </div>
                                    </div>
                                    <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Sub Línea </label>
                                        <select name="id_sublinea" data-select="SUBLINEA" class="form-control select2"></select>
                                    </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Marca </label>
                                            <select name="id_marca" data-select="MARCA" class="form-control select2"></select>
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Observación </label>
                                        <input type="text" name="observacion" class="form-control" autocomplete="off">
                                    </div>
                                    </div>
                                    <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Descripción </label>
                                        <textarea name="description" class="form-control" style="height:105px;"></textarea>
                                    </div>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Unidad de Medida <span class="text-danger">(*)</span></label>
                                        <select name="id_unidad_medida" data-select="UNIDAD_MEDIDA" class="form-control select2"></select>
                                    </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Stock Mínimo </label>
                                            <input type="number" step="any" name="cantidad_minimo" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Costo <span class="text-danger">(*)</span></label>
                                            <input type="number" step="any" name="costo" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Precio <span class="text-danger">(*)</span></label>
                                            <input type="number" step="any" name="price" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Almacén (Ubicación) </label>
                                            <select name="id_almacen" data-select="ALMACEN" class="form-control select2"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <div class="row">
                                            <div class="col-md-12 d-none" style="padding-top:10px;" align="center">
                                                <div id="qrcode" style="width:100%; display:none;"></div>
                                            </div>
                                            <div class="col-8">
                                                <label class="form-label">Imagen 1 <b class="text-danger">*</b></label>
                                                <input type="file" name="image1" class="form-control" autocomplete="off" accept=".jpg,.jpeg,.png,.gif">
                                            </div>
                                            <div class="col-4 text-center">
                                                <img name="imagen" style="max-width:25%;" class="img_rectangle">
                                            </div>
                                            <div class="col-8 mt-2">
                                                <label class="form-label">Imagen 2</label>
                                                <input type="file" name="image2" class="form-control" autocomplete="off" accept=".jpg,.jpeg,.png,.gif">
                                            </div>
                                            <div class="col-4 text-center mt-2">
                                                <img name="imagen2" style="max-width:25%;" class="img_rectangle">
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-6 mt-4">
                                        <label>
                                            <input type="checkbox" name="fl_cantidad_qr_unico" /> Imprimir una sola imagen QR (COMPRAS). <i class="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="Imprimirá una sola imagen qr y no dependerá de las cantidades ingresadas en compras, esto se puede aplicar a aquellos artículos que no se puede controlar por cantidades exactas."></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer mt-4 pb-1 d-flex justify-content-center">
                            <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                            <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
                    `;
        return chtml;
    },

    ContentModalPrintQR: function() {
        
        var chtml = `
            <form name="print_qr" id="print_qr">
                <div class="row">
                    <div class="col-md-12" align="center">
                        <div id="qrcode_print"></div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Cantidad </label>
                            <input type="number" name="cantidad" class="form-control" autocomplete="off" required min="1">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Ancho </label>
                            <input type="number" name="ancho" class="form-control" autocomplete="off" required placeholder="150" min="50">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Altura </label>
                            <input type="number" name="altura" class="form-control" autocomplete="off" required placeholder="150" min="50">
                        </div>
                    </div>
                </div>           
                <div class="modal-footer mt-4 pb-1 d-flex justify-content-center">
                    <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                    <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                </div>
            </form>
            `;

        return chtml;
    },

    ContentModalEditarStock: function() {
        
        var chtml = `
            <form name="edit_stock" id="edit_stock">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Stock </label>
                            <input type="number" name="cantidad" class="form-control" autocomplete="off" style="text-align: center; font-size: 22px; font-weight: bold;" required min="0">
                        </div>
                    </div>
                </div>         
                <div class="modal-footer mt-4 pb-1 d-flex justify-content-center">
                    <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                    <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                </div>
            </form>
            `;

        return chtml;
    },

    new: function() {

        let accion = 'save';

        Componente.id = null;
        Componente.action_submit = accion;
        Componente.imagen_anterior = null;
        Componente.imagen_anterior2 = null;
        Componente.archivo_anterior = null;
        
        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR ARTÍCULO',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        let form = DOM.find('form[name="save"]');    
        
        Componente.qrcode_form = new QRCode(document.getElementById("qrcode"), {
			width : 150,
			height : 150
		});

        // Componente.qrcode_print = new QRCode(document.getElementById("qrcode_print"), {
		// 	width : 150,
		// 	height : 150
		// });
        
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');
        form.find('img[name="imagen2"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        Componente.validarForm('formSave');
        Componente.Eventos();

        
        Componente.select_empresa();
        Componente.select_tipo_articulo();
        Componente.select_almacen();
        Componente.select_marca();
        Componente.select_unidad_medida();
        Componente.select_linea();
        Componente.select_sublinea();
    },

    edit: async (data) => {
        
        let accion = 'save';

        var cHtml = Componente.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR ARTÍCULO',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });


        Componente.validarForm('formSave', 'editar');
        Componente.Eventos();

        Componente.qrcode_form = new QRCode(document.getElementById("qrcode"), {
			width : 150,
			height : 150
		});

        // Componente.qrcode_print = new QRCode(document.getElementById("qrcode_print"), {
		// 	width : 150,
		// 	height : 150
		// });

        let form = DOM.find('form[name="save"]');

        Componente.fl_auto_event = false;

        await Componente.select_tipo_articulo();
        await Componente.select_almacen();
        await Componente.select_marca();
        await Componente.select_unidad_medida();
        await Componente.select_linea();
        await Componente.select_empresa();

        form.find('input[name="name"]').val(data.name);
        form.find('input[name="costo"]').val(data.costo);
        form.find('input[name="price"]').val(data.price);
        form.find('input[name="codigo_barra"]').val(data.codigo_barra);
        form.find('select[name="id_category"]').val(data.id_category).change();
        form.find('select[name="id_linea"]').val(data.id_linea).change();
        form.find('select[name="id_catalogo_empresa"]').val(data.id_catalogo_empresa).change();

        await Componente.select_sublinea();

        form.find('select[name="id_sublinea"]').val(data.id_sublinea).change();

        form.find('select[name="id_marca"]').val(data.id_marca).change();
        form.find('input[name="observacion"]').val(data.observacion);
        form.find('textarea[name="description"]').html(data.description);
        form.find('input[name="cantidad_minimo"]').val(data.cantidad_minimo);
        form.find('select[name="id_unidad_medida"]').val(data.id_unidad_medida).change();
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.image1);
        form.find('img[name="imagen2"]').attr('src', BASE_FILES+'images/'+data.image2);
        form.find('select[name="id_almacen"]').val(data.id_almacen).change();
        form.find('input[name="fl_cantidad_qr_unico"]').prop('checked', parseInt(data.fl_cantidad_qr_unico));

        Componente.generar_codigo_qr();

        Componente.id = data.id;
        Componente.action_submit = accion;
        Componente.imagen_anterior = data.image1;
        Componente.imagen_anterior2 = data.image2;
        Componente.fl_auto_event = true;
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

    edit_stock: function(data) {

        let accion = 'edit_stock';

        var cHtml = Componente.ContentModalEditarStock();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR STOCK DE ARTÍCULO',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'edit_stock',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });


        Componente.validarFormEditarStock('edit_stock', 'editar');
        Componente.Eventos();

        Componente.id = data.id;
        Componente.action_submit = accion;
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        if (this.imagen_anterior2 != null) { formData.append('imagen_anterior2', this.imagen_anterior2); }

        axios({
            method: 'post',
            url: BASE_API + 'logistica/articulo/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            if(Componente.parent_comp == false)
            {
                Componente.datatable();
            }
            else
            {
                Componente.parent_comp(response.data.insumo);
            }

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
            url: BASE_API + 'logistica/articulo/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            HELPER.notificacion(response.data.mensaje, 'success');
            Componente.datatable();

        }).catch(error => {
            console.error(error);
        });
    },
} 

export default Componente;