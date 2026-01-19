/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

let DOM, DOM_ID ;
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
                                <a href="javascript:" class="icon-home text-primary">Checklist</a>&nbsp;
                            </small>
                        </h4>
                    </div>
                    <div class="col-md-4 text-end">
                        <button type="button" class="btn rounded-pill btn-warning waves-effect waves-light d-none" name="change_device">
                            <span class="tf-icons mdi mdi-barcode-scan me-1"></span>
                            Cambiar Dispositivo
                        </button>
                        <button type="button" class="btn rounded-pill btn-primary waves-effect waves-light" name="nuevo">
                            <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                            Nuevo Registro
                        </button>
                        <button type="button" class="btn rounded-pill btn-secondary waves-effect waves-light d-none" name="cancelar">
                            <span class="tf-icons mdi mdi-close me-1"></span>
                            Cancelar
                        </button>
                    </div>
                </div>
                
                <!-- Default box -->
                <div class="card p-4 mb-4" name="contenedor-table">
                    <div class="row">                          
                       <div class="col-md-3">
                           <div class="form-group">
                               <label>Fecha Desde</label>
                               <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control" autocomplete="off">
                           </div>
                       </div>
                       <div class="col-md-3">
                           <div class="form-group">
                               <label>Fecha Hasta</label>
                               <input type="date" name="fecha_fin" id="fecha_fin" class="form-control" autocomplete="off">
                           </div>
                       </div>
                       <div class="col-md-3" style="padding-top:19px;">
                           <button type="button" class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                       </div>
                    </div>
                </div>
                <!-- /.box -->


                <!-- Users List Table -->
                <div class="card p-2" name="contenedor-table">  
                    <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                    </div>
                </div>    

                <!-- Default box -->
                <div class="card p-2" name="contenedor-save" style="display:none;">

                    <div class="card-header">
                        <h3 class="card-title" name="save"></h3>
                    </div>
                    <div class="card-body"> 

                        <div class="row">
                            <div class="col-md-12" name="devices" style="display:none;">
                                <div class="row">
                                    <div class="col-md-12" name="device-movil">
                                        <div id="qr-reader" style="width: 100%"></div>
                                    </div>
                                    <div class="col-md-12" name="device-scanner">
                                        <div class="form-group">
                                            <label> <i class="fa fa-qrcode"></i> Búsqueda desde Lector Scanner</label>
                                            <input type="text" name="codigo_barra" class="form-control" autocomplete="off">
                                        </div>
                                    </div>  
                                    <div class="col-md-12" name="device-manual">
                                        <div class="form-group">
                                            <label> <i class="fa fa-keyboard"></i> Búsqueda por nombre de Artículo</label>
                                            <select name="id_articulo" data-select="ARTICULO" class="form-control" autocomplete="off"></select>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table" style="width:100%;">
                                        <thead>
                                            <tr>
                                                <th>ARTÍCULO</th>
                                                <th>UNIDAD MEDIDA</th>
                                                <th>STOCK TOTAL</th>
                                                <th>STOCK FÍSICO</th>
                                                <th>AUMENTAR/DISMINUIR</th>
                                            </tr>
                                        </thead>
                                        <tbody name="detalle"></tbody>
                                    </table>
                                </div>
                            </div>  
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label> Observación</label>
                                    <input type="text" name="observacion" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-12 text-center mt-2">
                                <button type="button" name="submit_checklist" class="btn btn-primary"><i class="fa fa-save"></i> Guardar</button>
                            </div>
                        </div>                    

                    </div>
                </div>


            <!-- MODAL SELECT DEVICE -->
            <div class="modal animate__animated animate__bounceInDown" name="modal-select_device" data-bs-backdrop="static"
                data-bs-keyboard="false" tabindex="-1" aria-modal="true"
                role="dialog">
                <div class="modal-dialog modal-dialog-centered  modal-lg">
                    <div class="modal-content p-0">
                        <div class="modal-header  bg-label-primary pt-2 pb-2">
                            <p class="modal-title fw-semibold fs-5" name="select_device"><i class="mdi mdi-check-circle me-1"></i> SELECCIÓN DE DISPOSITIVO</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-3">
                            <div class="custom-option custom-option-icon checked p-2">
                              
                                <div class="modal-body">
                                    <div class="row">      
                                        <div class="col-md-12" align="center">
                                            <div style="font-size:24px; font-weight:bold; margin-bottom:15px;">¿Qué dispositivo usará para realizar el checklist?</div>
                                        </div>                             
                                        <div class="col-md-12" align="center">
                                            <button name="device" data-name="MOVIL" class="btn btn-secondary" style="padding:15px;">
                                                <i class="mdi mdi-camera me-1"></i> <br> Cámara del Móvil/PC
                                            </button>
                                            <button name="device" data-name="SCANNER" class="btn btn-secondary" style="padding:15px;">
                                                <i class="mdi mdi-barcode-scan me-1" ></i> <br> Pistola Scanner
                                            </button>                                    
                                            <button name="device" data-name="MANUAL" class="btn btn-secondary" style="padding:15px;">
                                                <i class="mdi mdi-text-box-check me-1"></i> <br> Manualmente
                                            </button>
                                        </div>
                                    </div>   
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT DELETE */
        // DOM.find('form[name="delete"]').validate({
        //     submitHandler: function() {
        //         Componente.submit_delete();
        //     }
        // });

        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.datatable();
        });

        /* CANCELAR */
        DOM.on('click', 'button[name="cancelar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.cancel_save('CANCELAR');
        });

        /* BUTTON CHANGE DEVICE */
        DOM.on('click', 'button[name="change_device"]', function(e) {
            e.stopImmediatePropagation();
            Componente.select_device();
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        /* EDITAR */
        DOM.on('click', 'a[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        /* IMPRIMIR */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            let data = HELPER.get_attr_json($(this));
            Componente.print(data.id);
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });

        /* SUBTMIT */
        DOM.on('click', 'button[name="submit_checklist"]', function(e) {
            e.stopImmediatePropagation();
            Componente.submit();
        });

        /* BUTTON SELECT DEVICE */
        DOM.on('click', 'button[name="device"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_device($(this).data('name'));
        });

        /* SEARCH SCANNER */
        DOM.find('input[name="codigo_barra"]').keypress(function(e){
            e.stopImmediatePropagation();
            let keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == '13'){
                Componente.search_escanner(); 
                DOM.find('input[name="codigo_barra"]').val('');
            }
        });
        /* SEARCH SCANNER */
        DOM.on('change', 'select[name="id_articulo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.search_select(this.value);             
        });

        /* AUMENTAR */
        DOM.on('click', 'button[name="btn-aumentar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.conteo($(this), 'AUMENTAR');
        });

        /* DISMINUIR */
        DOM.on('click', 'button[name="btn-disminuir"]', function(e) {
            e.stopImmediatePropagation();
            Componente.conteo($(this), 'DISMINUIR');
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        
        Componente.datatable();
        Componente.select_articulo();

        let html5QrCode = new Html5QrcodeScanner("qr-reader", { fps: 10});
        html5QrCode.render(Componente.search_movil);  

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */

    print: async (id_checklist) => {
        await axios.get(BASE_API+'logistica/checklist/get_imprimir?id_checklist='+id_checklist)
        .then(async function (response) {
            
            let html = `
                <style>
                  
                    .table {
                        font-family: Arial, Helvetica, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }
                    
                    .table td, .table th {
                        border: 1px solid #ddd;
                        padding: 5px;
                    }
                    
                    .table tr:nth-child(even){background-color: #f2f2f2;}
                    
                    .table tr:hover {background-color: #ddd;}
                    
                    .table th {
                        padding-top: 6px;
                        padding-bottom: 6px;
                        text-align: left;
                        background-color: #04AA6D;
                        color: white;
                    }
                  
                </style>

                <div style="max-width:842px; margin:auto;"> 
                    <div style="font-size:24px; font-weight:bold; text-align:center;">CHECKLIST - ARTÍCULOS</div>
                    <table style="width:100%;">
                        <tr>
                            <td>Fecha: `+HELPER.fecha(response.data.fecha)+`</td>
                            <td style="text-align:right;">Usuario:`+response.data.usuario+`</td>
                        </tr>
                        <tr>
                            <td colspan="2">Observación: `+response.data.observacion+`</td>
                        </tr>
                    </table>
                    <table style="width:100%" class="table">
                        <thead>
                            <th style="text-align:center;">ARTÍCULO</th>
                            <th style="text-align:center;">UNIDAD MEDIDA</th>
                            <th style="text-align:center;">STOCK SISTEMA</th>
                            <th style="text-align:center;">STOCK FÍSICO</th>
                        </thead>
                        <tbody>
                            `;

                            response.data.detalle.forEach(row => {

                                html += `
                                    <tr>
                                        <td>`+row.nombre+`</td>
                                        <td>`+row.unidad_medida+`</td>
                                        <td style="text-align:center;">`+row.stock+`</td>
                                        <td style="text-align:center;">`+row.stock_fisico+`</td>
                                    </tr>
                                `;

                            });

                            html += `
                        </tbody>
                    </table>
                </div>
            `;

            HELPER.print(html);

        }).catch(error => {
            console.log(error);
        });  
    },

    comparar_stock: (row) => {

        let stock = parseFloat(row.find('td[data-name="stock"]').text());
        let stock_fisico = parseFloat(row.find('td[data-name="stock_fisico"]').text());
        
        if(stock_fisico == stock)
        {
            row.css('background-color', '#9CE2A9');
        }
        else if(stock_fisico < stock)
        {
            row.css('background-color', '#FFF');
        }
        else if(stock_fisico > stock)
        {
            row.css('background-color', '#FFCD6A');
        }

    },

    conteo: (row, tipo) => {
        
        let id = JSON.parse(row.parents('tr')[0].dataset.id_articulo);
        
        DOM.find('tbody[name="detalle"] tr').each(function()
        {
            if($(this).find('td[data-name="id_articulo"]').text() == id)
            {
                let stock_contable = parseFloat($(this).find('td[data-name="stock_fisico"]').text());

                if(tipo == 'AUMENTAR')
                {
                    stock_contable++;
                }
                else
                {
                    stock_contable--;
                }
                

                $(this).find('td[data-name="stock_fisico"]').text(stock_contable);

                Componente.comparar_stock($(this));
            }
        });
    },

    select_articulo: async (codigo_linea) =>
    {
        DOM.find('select[data-select="ARTICULO"]').select2({
            ajax: {
            url: BASE_API+'logistica/articulo/get_select',
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
            placeholder: "Buscar por nombre o código de Barra",
            minimumInputLength: 3,
            allowClear: true,
            language: {
            inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
            }
            }
        });
    },
    
    search_movil: async (decodedText, decodedResult) => {

        let text_decode = HELPER.scanner_timer_waiting(decodedText);

        if(text_decode != null)
        {
            await axios.get(BASE_API+'logistica/checklist/search_barcode?codigo_barra='+text_decode)
            .then(async function (response) {
                Componente.verificar_articulo_table(response.data)
            }).catch(error => {
                console.log(error);
            });             
        }
    },

    search_escanner: async () => {

        let text_decode = DOM.find('input[name="codigo_barra"]').val();

        if(text_decode != '')
        {
            await axios.get(BASE_API+'logistica/checklist/search_barcode?codigo_barra='+text_decode)
            .then(async function (response) {
                Componente.verificar_articulo_table(response.data)
            }).catch(error => {
                console.log(error);
            });             
        }
    },

    search_select: async (id_value) => {

        if(id_value != '' && id_value != null)
        {
            await axios.get(BASE_API+'logistica/checklist/search_barcode?id='+id_value)
            .then(async function (response) {
                Componente.verificar_articulo_table(response.data)
            }).catch(error => {
                console.log(error);
            });             
        }
    },

    verificar_articulo_table: (data) => {

        let encontrado = false;

        DOM.find('tbody[name="detalle"] tr').each(function()
        {
            if($(this).find('td[data-name="id_articulo"]').text() == data.id_articulo)
            {
                encontrado = true;

                let stock_contable = parseFloat($(this).find('td[data-name="stock_fisico"]').text());
                stock_contable++;

                $(this).find('td[data-name="stock_fisico"]').text(stock_contable);

                HELPER.notificacion(stock_contable+', '+data.nombre, 'success');

                Componente.comparar_stock($(this));
            }
        });

        if(encontrado == false)
        {
            Componente.agregar_busqueda(data);
        }
    },

    agregar_busqueda: async (data, fl_edit = false) => {

        if(fl_edit == false)
        {
            data.id = '';
            data.stock_fisico = 1;
        }

        let html = `
            <tr data-id_articulo="`+data.id_articulo+`">
                <td data-name="id" style="display:none;">`+data.id+`</td>
                <td data-name="id_articulo" style="display:none;">`+data.id_articulo+`</td>
                <td>`+data.nombre+`</td>
                <td>`+data.unidad_medida+`</td>
                <td data-name="stock">`+data.cantidad+`</td>
                <td data-name="stock_fisico">`+data.stock_fisico+`</td>
                <td><button class="btn btn-primary" name="btn-aumentar"><i class="fa fa-plus-circle"></i></button> <button class="btn btn-danger" name="btn-disminuir"><i class="fa fa-minus-circle"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle"]').prepend(html);

        if(fl_edit == false)
        {
            HELPER.notificacion(data.nombre, 'success');
        }
        

        Componente.comparar_stock(DOM.find('tbody[name="detalle"] tr[data-id_articulo="'+data.id_articulo+'"]'));

    },

    change_device: (tipo_device) => {

        DOM.find('div[name="devices"]').show();
        DOM.find('div[name="device-movil"]').hide();
        DOM.find('div[name="device-scanner"]').hide();
        DOM.find('div[name="device-manual"]').hide();

        switch (tipo_device) {
            case 'MOVIL':
                DOM.find('div[name="device-movil"]').show('slide');
            break;
        
            case 'SCANNER':
                DOM.find('div[name="device-scanner"]').show('slide');

                DOM.find('input[name="codigo_barra"]').focus();
            break;

            default:
                DOM.find('div[name="device-manual"]').show('slide');
            break;
        }

        DOM.find('div[name="modal-select_device"]').modal('hide');

    },

    datatable: async function() {

        let parametros = {
            fecha_inicio : DOM.find('input[name="fecha_inicio"]').val(),
            fecha_fin : DOM.find('input[name="fecha_fin"]').val(),
        };

        var oData = await $.getData('logistica/checklist?'+jQuery.param(parametros));

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [ 
            { "title": 'FECHA', "data": null, render: function(data, type, row) { return HELPER.fecha(row.fecha); } },
            { "title": 'USUARIO', "data": 'usuario' },
            { "title": 'OBSERVACION', "data": 'observacion' },
            {
                "data": null, "title": "Acción", "class": "text-center", ordenable: false,
                render:
                    function (data, type, row) {


                        var arrayButton = [], arrayMasButton = [];
                        arrayButton.push(
                          {
                            element: "a",
                            properties: {class:"btn btn-sm btn-text-warning rounded-pill btn-icon item-edit btnVisualizar", href: "javascript:",html: '<i class="mdi mdi-eye-outline"></i>'},
                          },
                          {
                            element: "button",
                            properties: {class:"btn btn-sm btn-icon btn-text-primary rounded-pill btn-icon dropdown-toggle hide-arrow","data-bs-toggle": "dropdown",html: '<i class="mdi mdi-dots-vertical mdi-20px"></i>',},
                          }
                        );

                        arrayMasButton.push(
                            {
                                element: "a",
                                properties: {class: "dropdown-item btnEditar",href: "javascript:;",html: '<i class="mdi mdi-pencil-outline me-2"></i><span>Editar</span>'},
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
            'LISTADO DE CHECKLIST'
        );

        $('.tblRegistros tbody').on('click', '.btnVisualizar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.print(oDataRow.id);     
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

    cancel_save: (tipo) => {

        DOM.find('input[name="observacion"]').val('');
        DOM.find('tbody[name="detalle"]').empty();

        if(tipo == 'SAVE')
        {
            DOM.find('div[name="contenedor-table"]').hide('slide');
            DOM.find('div[name="contenedor-save"]').show('slide');

            DOM.find('button[name="nuevo"]').addClass('d-none');
            DOM.find('button[name="cancelar"]').removeClass('d-none');
            DOM.find('button[name="change_device"]').removeClass('d-none');
        }
        else
        {
            DOM.find('div[name="contenedor-table"]').show('slide');
            DOM.find('div[name="contenedor-save"]').hide('slide');

            DOM.find('button[name="nuevo"]').removeClass('d-none');
            DOM.find('button[name="cancelar"]').addClass('d-none');
            DOM.find('button[name="change_device"]').addClass('d-none');
        }
        
    },

    select_device: function() {

        DOM.find('div[name="devices"]').hide('slide');

        DOM.find('h4[name="select_device"]').text('Selección de Dispositivo');
        
        DOM.find('div[name="modal-select_device"]').modal('show');
    },

    new: function() {

        Componente.cancel_save('SAVE');       

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h3[name="'+accion+'"]').text('Nuevo Checklist');

        this.id = null;
        this.action_submit = accion;
        
        Componente.select_device();
    },

    edit: function(data) {
        
        Componente.cancel_save('SAVE');

        let accion = 'save';

        DOM.find('h3[name="'+accion+'"]').text('Editar Checklist');

        axios.get(BASE_API+'logistica/checklist/get_detalle?id_checklist='+data.id)
        .then(async function (response) {
            
            response.data.forEach(row => {
                Componente.agregar_busqueda(row, true);
            });
            
        }).catch(error => {
            console.log(error);
        });  

        console.log(data)


        DOM.find('input[name="observacion"]').val(data.observacion);

        this.id = data.id;
        this.action_submit = accion;

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
        
        let ladda = HELPER.ladda(DOM_ID+' button[name="submit_checklist"]');
        let formData = new FormData();

        if (this.id != null) { formData.append('id', this.id); }

        /*** GET DETALLE */
        let detalle_checklist = [];
        DOM.find('tbody[name="detalle"] tr').each(function()
        {
            let row_list = {
                id: $(this).find('td[data-name="id"]').text(),
                id_articulo: $(this).find('td[data-name="id_articulo"]').text(),
                stock: $(this).find('td[data-name="stock"]').text(),
                stock_fisico: $(this).find('td[data-name="stock_fisico"]').text(),
            };

            detalle_checklist.push(row_list);
        });

        formData.append('detalle', JSON.stringify(detalle_checklist));
        formData.append('observacion', DOM.find('input[name="observacion"]').val());

        axios({
            method: 'post',
            url: BASE_API + 'logistica/checklist/save',
            data: formData
        })
        .then(function(response) { 
            Componente.print(response.data.id_checklist);    
            Componente.datatable();           
            HELPER.notificacion(response.data.mensaje, 'success');
            Componente.cancel_save('CANCEL');
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
            url: BASE_API + 'logistica/checklist/' + this.action_submit,
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