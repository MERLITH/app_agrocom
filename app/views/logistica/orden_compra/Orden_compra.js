
import Impresion from './Impresion.js'

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
                            Órdenes de Compras
                        </span> 
                        &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                        <small>
                            <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                            <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                            <a href="javascript:" class="icon-home text-primary">Inventario</a>&nbsp;
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

            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">        
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Fecha Desde</label>
                                <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Fecha Hasta</label>
                                <input type="date" name="fecha_fin" id="fecha_fin" class="form-control" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-2 text-start pt-4">
                            <button type="button" class="btn rounded-pill btn-label-primary btn-fab demo waves-effect" name="update_datatable">
                                <span class="tf-icons mdi mdi-magnify me-1"></span> Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
  
            <!-- Users List Table -->
            <div class="card">  
                <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                </div>
            </div>

            <!-- MODAL SAVE -->
            <div class="modal animate__animated animate__bounceInDown" name="modal-save" data-bs-backdrop="static"
                data-bs-keyboard="false" tabindex="-1" aria-modal="true"
                role="dialog">
                <div class="modal-dialog modal-dialog-centered  modal-xxl">
                    <div class="modal-content p-0">
                        <div class="modal-header  bg-label-primary pt-2 pb-2">
                            <p class="modal-title fw-semibold fs-5" name="save"></p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-3">
                            <div class="custom-option custom-option-icon checked p-2">
                                

                                <form name="save" id="save">
                                    <div class="modal-body">
                    
                                        <div class="card">
                                            <div class="card-header pb-0">
                                                <h5><span class="mdi mdi-subtitles-outline me-1"></span> Sección Principal</h5>
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Fecha <span class="text-danger">(*)</span></label>
                                                            <div class="form-group">
                                                            <input type="date" class="form-control" name="fecha"  />
                                                            </div>                              
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Serie <span class="text-danger">(*)</span></label>
                                                            <input type="text" class="form-control" name="serie" readonly/>                  
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Número <span class="text-danger">(*)</span></label>
                                                            <input type="text" class="form-control" name="numero" readonly/>                       
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Moneda <span class="text-danger">(*)</span></label>
                                                            <select name="id_moneda" data-select="MONEDA" class="form-control"></select>                         
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Tipo de Cambio <span class="text-danger">(*)</span></label>
                                                            <input type="number" step="any" class="form-control" name="tipo_cambio"/>                
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Condición de Pago <span class="text-danger">(*)</span></label>
                                                            <select name="condicion_pago" class="form-select">
                                                                <option value="">Seleccione...</option>
                                                                <option value="CONTADO">CONTADO</option>
                                                                <option value="CREDITO">CRÉDITO</option>
                                                            </select>                         
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Días a Pagar <span class="text-danger">(*)</span></label>
                                                            <input type="number" class="form-control" name="dias_pagar" min="1"/>                
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Prioridad <span class="text-danger">(*)</span></label>
                                                            <select class="form-select" name="prioridad"/>
                                                                <option value="">Seleccione...</option>
                                                                <option value="REGULAR">REGULAR</option>
                                                                <option value="ALTA">ALTA</option>
                                                                <option value="URGENTE">URGENTE</option>
                                                            </select>       
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Proveedor <span class="text-danger">(*)</span></label>
                                                            <select class="form-select" name="id_proveedor" data-select="PROVEEDOR"/></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Número de Cotización </label>
                                                            <input type="text" class="form-control" name="numero_cotizacion"/>                   
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Cuenta Bancaria de Proveedor </label>
                                                            <select class="form-control" name="id_cuenta_bancaria_proveedor" data-select="CUENTA_BANCARIA_PROVEEDOR"/></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Contacto del Proveedor </label>
                                                            <input type="text" class="form-control" name="contacto_proveedor"/>                   
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Solicitante </label>
                                                            <input type="text" class="form-control" name="solicitante"/>                   
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Motivo </label>
                                                            <input type="text" class="form-control" name="motivo"/>                   
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Lugar de Entrega </label>
                                                            <input type="text" class="form-control" name="lugar_entrega"/>                   
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                        
                                        <!-- Default box -->
                                        <div class="card mt-3">
                                            <div class="card-header pb-0">
                                                <h5><span class="mdi mdi-format-list-bulleted me-1"></span> Sección Items</h5>
                                            </div>
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table table-striped nowrap" style="width:100%;">
                                                        <thead>
                                                            <tr>
                                                                <th>ARTÍCULO</th>
                                                                <th>CANTIDAD</th>                                        
                                                                <th>VALOR UNITARIO</th>
                                                                <th>PRECIO UNITARIO</th>
                                                                <th>IGV</th>
                                                                <th>IMPORTE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-item"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="4">
                                                                    <button type="button" name="agregar_item" class="btn btn-secondary" style="margin-bottom:20px;"><i class="fa fa-plus"></i> Agregar Nuevo Item</button>
                        
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group">
                                                                                <label>Autorizado por: </small></label>
                                                                                <input type="text" class="form-control" name="persona_autoriza" />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label>Observaciones </small></label>
                                                                                <textarea class="form-control" name="observacion"/></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td colspan="3">
                                                                    <table style="width:100%;">
                                                                        <tr>
                                                                            <td style="padding-bottom:10px">TIPO IGV:</td>
                                                                            <td align="center" style="padding-bottom:10px">
                                                                                <select name="tipo_igv" class="form-control">
                                                                                    <option value="" selected>INCLUIDO IGV</option>
                                                                                    <option value="MAS_IGV">MÁS IGV</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>TOTAL GRAVADO:</td>
                                                                            <td><input type="number" step="any" class="form-control" name="total_gravada" style="text-align:right;" readonly/></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>TOTAL IGV:</td>
                                                                            <td><input type="number" step="any" class="form-control" name="total_igv" style="text-align:right;" readonly/></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>TOTAL IMPORTE:</td>
                                                                            <td><input type="number" step="any" class="form-control" style="text-align:right;" name="total_importe" readonly /></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            
                                                        </tfoot>
                                                    </table>
                                                </div>
                                                <div class="row" data-contenedor="firma">
                                                    <div class="col-md-12" align="center">
                                                        <div id="signature-pad" class="signature-pad">                                                
                                                            <div class="signature-pad--body">
                                                                <canvas style="max-width: 300px; height: 150px; border: 1px black solid; " id="canvas"></canvas>
                                                            </div>
                                                            <div align="center">FIRMA</div>
                                                            <div align="center">Creado por: `+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`</div>
                                                        </div>                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.box -->
                    
                                        <div align="center" class="d-none">
                                            <label><input type="checkbox" name="fl_autorizacion"> Confirmo que los datos llenados en el formulario son correctos</label> <br><br>
                                        </div>
                                    </div>  
                                    <div class="modal-footer mt-3 pb-1 d-flex justify-content-center">
                                        <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                                        <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                                    </div>
                                </form> 
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

        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.datatable();
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        

        /* CHANGE CONDICION PAGO*/
        DOM.on('change', 'select[name="condicion_pago"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_condicion_pago();
            }            
        });

            /* CHANGE MONEDA*/
        DOM.on('change', 'select[name="id_moneda"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_moneda();
            }            
        });


        /* AGREGAR ITEM */
        DOM.find('button[name="agregar_item"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_item();
        });

        /* QUITAR ITEM */
        DOM.on('click', 'button[name="quitar-item"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_item($(this));
        });

        /**** EVENTOS CALCULOS */

        /* TIPO IGV*/
        DOM.find('select[name="tipo_igv"]').change(function(e) {
            e.stopImmediatePropagation();
            Componente.calculo_consin_igv();
        });
        
        /* CANTIDAD*/ 
        DOM.on('keyup', 'input[data-name="cantidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* PRECIO UNITARIO*/
        DOM.on('keyup', 'input[data-name="precio_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_valor_unitario_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* VALOR UNITARIO*/

        DOM.on('keyup', 'input[data-name="valor_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_precio_unitario_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* IMPORTE LINEA*/

        DOM.on('change', 'input[data-name="importe"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_precio_unitario_importe_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* IGV LINEA*/

        DOM.on('change', 'input[data-name="igv"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_valor_unitario_igv_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        DOM.on('change', 'select[data-name="id_articulo"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo_fila = $(this).parents('tr')[0].dataset.codigo;
                let id = this.value;

                Componente.get_articulo(id, codigo_fila);
                Componente.array_totales_detalle = null;
            }            
        });

        DOM.on('click', 'button[name="limpiar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.signaturePad.clear();
        });  

        DOM.on('change', 'select[name="id_proveedor"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
               Componente.select_cuenta_bancaria_proveedor();
            }            
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        

        await Componente.select_moneda();
        await Componente.select_proveedor(); 
        Componente.validarForm('save');   

        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    id_orden: null,
    action_submit: null,
    fl_auto_event: true,
    array_totales_detalle: null,

    validarForm: function (idform) {

        var arrayFields = [
            {field: 'fecha', message: 'Por favor, Seleccione la fecha'},
            {field: 'serie', message: 'Por favor, Escriba la serie'},
            {field: 'numero', message: 'Por favor, Escriba el número'},
            {field: 'id_moneda', message: 'Por favor, Seleccione la moneda'},
            {field: 'condicion_pago', message: 'Por favor, Seleccione la condición de pago'},
            {field: 'id_proveedor', message: 'Por favor, Seleccione el proveedor'},
            //{field: 'dias_pagar', message: 'Por favor, Escriba los días a pagar'},
            {field: 'prioridad', message: 'Por favor, Seleccione la prioridad'},
            //{field: 'fl_autorizacion', message: 'Por favor, Seleccione el check de conformidad'}
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

    select_cuenta_bancaria_proveedor: async () =>
    {
        let id_proveedor = DOM.find('select[name="id_proveedor"]').val();
        var url = "configuracion/cuenta_bancaria_persona/get_select?tipo=PROVEEDOR&id="+id_proveedor;
        var idcombo = DOM.find('select[data-select="CUENTA_BANCARIA_PROVEEDOR"]');
        await $.select_render(url, idcombo);  
    },

    get_articulo: async (id_articulo, codigo_fila) => {

        if(id_articulo != '' && id_articulo != null)
        {
            await axios.get(BASE_API+'logistica/articulo/get_unique/'+id_articulo)
            .then(function (response) {
                
                DOM.find('tr[data-codigo="'+codigo_fila+'"] input[data-name="precio_unitario"]').val(response.data.costo);
                DOM.find('tr[data-codigo="'+codigo_fila+'"] span[data-name="unidad_medida"]').text(response.data.unidad_medida);
                Componente.calculo_valor_unitario_linea(codigo_fila);

            }).catch(error => {
                console.log(error);
            }); 
        }       

    },

    capturar_totales: () => {

        let array_totales_detalle = [];

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let codigo = $(this).data('codigo');
            let importe =  parseFloat($(this).find('input[data-name="importe"]').val());

            let item = {
                codigo: codigo,
                importe: importe
            };

            array_totales_detalle.push(item);
        });

        Componente.array_totales_detalle = array_totales_detalle;

    },

    calculo_consin_igv: () => {

        if(Componente.array_totales_detalle == null || Componente.array_totales_detalle.length == 0)
        {
            Componente.capturar_totales();
        }        

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let codigo = $(this).data('codigo');

            Componente.array_totales_detalle.forEach(row => {
                
                if(row.codigo == codigo)
                {
                    let importe = row.importe;

                    if(DOM.find('select[name="tipo_igv"]').val() == 'MAS_IGV')
                    {
                        importe = row.importe + (row.importe * (GLOBAL.porcentaje_igv / 100));
                    }

                    $(this).find('input[data-name="importe"]').val(importe);
                    Componente.calculo_precio_unitario_importe_linea(codigo);
                }

            });
            
        });
    },

    /************ */

    new: () => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('p[name="'+accion+'"]').html('<i class="mdi mdi-check-circle me-1"></i> Nueva Orden compra');
        

        /** DATA */
        HELPER.reset_form(form); 

        DOM.find('tbody[name="detalle-item"]').html('');

        DOM.find('input[name="fecha"]').val(HELPER.fecha_actual());
        DOM.find('input[name="serie"]').val((GLOBAL.ajuste.almacen_serie_orden_comp != null && GLOBAL.ajuste.almacen_serie_orden_comp != '') ? GLOBAL.ajuste.almacen_serie_orden_comp : HELPER.fecha_ano());

        Componente.calcular_importe_total();

        Componente.id = null;
        Componente.action_submit = accion;

        Componente.get_correlativo();    

        DOM.find('div[data-contenedor="firma"]').show();

        DOM.find('div[name="modal-'+accion+'"]').modal('show');

        setTimeout(() => {
            // DIBUJAR  CANVAS
            let wrapper = document.getElementById("signature-pad");

            let canvas = wrapper.querySelector("canvas");
                Componente.signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });

            let ratio =  Math.max(window.devicePixelRatio || 1, 1);

            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            Componente.signaturePad.clear();  
        }, 500);    

    },

    edit: async (data) => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"]').html('');

        DOM.find('p[name="'+accion+'"]').html('<i class="mdi mdi-check-circle me-1"></i> Editar Orden compra');

        await axios.get(BASE_API+'logistica/orden_compra/get_unique/'+data.id)
        .then( async (response) => {            
        data = response.data;

        Componente.fl_auto_event = false;

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);
        form.find('select[name="id_moneda"]').val(data.id_moneda).change();
        form.find('select[name="condicion_pago"]').val(data.condicion_pago).change();

        await Componente.change_condicion_pago();

        form.find('select[name="id_proveedor"]').html('');
        form.find('select[name="id_proveedor"]').append(new Option(data.proveedor, data.id_proveedor));

        await Componente.select_cuenta_bancaria_proveedor();

        form.find('select[name="id_cuenta_bancaria_proveedor"]').val(data.id_cuenta_bancaria_proveedor).change();
        form.find('input[name="numero_cotizacion"]').val(data.numero_cotizacion);
        form.find('input[name="contacto_proveedor"]').val(data.contacto_proveedor);

        form.find('select[name="prioridad"]').val(data.prioridad).change();

        form.find('input[name="solicitante"]').val(data.solicitante);
        form.find('input[name="motivo"]').val(data.motivo);
        form.find('input[name="lugar_entrega"]').val(data.lugar_entrega);
        form.find('textarea[name="observacion"]').html(data.observacion);
        form.find('input[name="dias_pagar"]').val(data.dias_pagar);
        form.find('input[name="persona_autoriza"]').val(data.persona_autoriza);
        

        if(data.cliente_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.cliente_ubigeo, data.cliente_ubigeo));
        }

        data.detalle.forEach(row => {
            Componente.agregar_item(row);
        });

        Componente.id = data.id;
        Componente.action_submit = accion;

        Componente.fl_auto_event = true;
        Componente.calcular_importe_total();
        Componente.change_moneda();

        DOM.find('div[data-contenedor="firma"]').hide();

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
        }).catch(error => {
            console.log(error);
        }); 
        
    },

    anular: async function(data) {

        let accion = 'anular';
        this.id = data.id;
        this.action_submit = accion;

        var resp = await HELPER.DeleteRegistro('A');
        if (resp) {
            Componente.submit_anular();
        }  
    },

    

    /***** ITEMS */

    agregar_item: async (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id_articulo: '',
                cantidad: '1',
                valor_unitario: '',
                precio_unitario:'',
                subtotal:'',
                igv:'',
                importe:'',
                porcentaje_igv:GLOBAL.porcentaje_igv                
            };
        }


        let html = `
            <tr data-codigo="`+codigo+`">
                <td><select data-select="ARTICULO" data-name="id_articulo" class="form-control"></select></td>
                <td style="width:200px;">
                    <div class="input-groupT">
                        <input type="number" step="any" data-name="cantidad" class="form-control" placeholder="0.00" aria-label="Cantidad" aria-describedby="Cantidad" value="`+data.cantidad+`">
                        <span class="input-group-text d-none" data-name="unidad_medida">-</span>
                    </div>
                </td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="valor_unitario" class="form-control" value="`+data.valor_unitario+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="precio_unitario" class="form-control" value="`+data.precio_unitario+`" /></td>
                <td style="display:none;"><input type="number" step="any" data-name="subtotal" class="form-control" value="`+data.subtotal+`" /></td>
                <td style="display:none;"><input type="number" step="any" data-name="porcentaje_igv"class="form-control" value="`+data.porcentaje_igv+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="igv"class="form-control" value="`+data.igv+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="importe" class="form-control" value="`+data.importe+`" /></td>
                <td style="width:10px;"><button type="button" name="quitar-item" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-item"]').append(html);

        await Componente.select_articulo(codigo);  

        if(data.id_articulo != '' && data.id_articulo != null)
        {
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_articulo"]').html('');
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_articulo"]').append(new Option(data.articulo, data.id_articulo));
        }

        Componente.calculo_importe_linea(codigo);

        return codigo;
    },

    select_articulo: async (codigo_linea) =>
    {
        var urlB = "logistica/articulo/get_select";
        $.select2_buscar_v2('tr[data-codigo="'+codigo_linea+'"] select[data-select="ARTICULO"]', urlB, "Buscar por nombre o código de barra", 3);
    },

    quitar_item: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

        Componente.calcular_importe_total();

    },

    item_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-item"] tr').each(function(){

            if($(this).find('textarea[data-name="descripcion"]').val() == '')
            {
                HELPER.notificacion('Existe item sin Descripción', 'warning');
                detalle = [];
                return false;         
            }
        
            let item = {
                id_articulo : $(this).find('select[data-name="id_articulo"]').val(),
                cantidad : $(this).find('input[data-name="cantidad"]').val(),
                valor_unitario : $(this).find('input[data-name="valor_unitario"]').val(),
                precio_unitario : $(this).find('input[data-name="precio_unitario"]').val(),
                subtotal : $(this).find('input[data-name="subtotal"]').val(),
                porcentaje_igv : $(this).find('input[data-name="porcentaje_igv"]').val(),
                igv : $(this).find('input[data-name="igv"]').val(),
                importe : $(this).find('input[data-name="importe"]').val()

            };

            detalle.push(item);
        });

        return detalle;
    },

    /************
     * 
     *  CALCULOS
     */

    calculo_importe_linea: async (codigo) => {

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val();
        cantidad =  parseFloat((cantidad != '') ? cantidad : 0);

        let valor_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val();
        valor_unitario = parseFloat((valor_unitario != '') ? valor_unitario : 0);

        let precio_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val();
        precio_unitario = parseFloat((precio_unitario != '') ? precio_unitario : 0);

        let importe = cantidad * precio_unitario;
        importe = Math.round((importe + Number.EPSILON) * 100) / 100;
        
        let subtotal = cantidad * valor_unitario;
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;

        let igv = importe - subtotal;
        igv = Math.round((igv + Number.EPSILON) * 100) / 100;
        
        let obj_total = {
            cantidad: cantidad,
            valor_unitario: valor_unitario,
            precio_unitario: precio_unitario,
            subtotal: subtotal,
            igv: igv,
            importe: importe
        };

        console.log(obj_total);

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="subtotal"]').val(subtotal.toFixed(2));
        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="igv"]').val(igv.toFixed(2));
        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));

        Componente.calcular_importe_total();
    },

    calculo_valor_unitario_linea: async (codigo) => {

        let precio_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val();
        precio_unitario = parseFloat((precio_unitario != '') ? precio_unitario : 0);

        let valor_unitario = precio_unitario / ((GLOBAL.porcentaje_igv / 100) + 1);

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val(valor_unitario.toFixed(7));

        Componente.calculo_importe_linea(codigo);
    },

    calculo_precio_unitario_linea: async (codigo) => {

        let valor_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val();
        valor_unitario = parseFloat((valor_unitario != '') ? valor_unitario : 0);

        let precio_unitario = valor_unitario * (1 + (GLOBAL.porcentaje_igv / 100));

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val(precio_unitario.toFixed(2));

        Componente.calculo_importe_linea(codigo);
    },

    calculo_precio_unitario_importe_linea: async (codigo) => {

        let importe = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val();
        importe = parseFloat((importe != '') ? importe : 0);

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val();

        if(cantidad == '')
        {
            DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val(1);
            cantidad = 1;
        }
        
        cantidad =  parseFloat(cantidad);

        let precio_unitario = importe / cantidad;

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val(precio_unitario.toFixed(2));

        Componente.calculo_valor_unitario_linea(codigo);
    },

    calculo_valor_unitario_igv_linea: async (codigo) => {

        let igv = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="igv"]').val();
        igv = parseFloat((igv != '') ? igv : 0);
        
        let monto_base = igv / (GLOBAL.porcentaje_igv / 100);
        let importe = monto_base + igv;

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));

        Componente.calculo_precio_unitario_importe_linea(codigo);
    },

    /*** CALCULO TOTALES */

    calcular_importe_total: async () => {

        let total_gravada = 0;
        let total_igv = 0;
        let total_importe = 0;

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let subtotal =  parseFloat($(this).find('input[data-name="subtotal"]').val());
            let igv = parseFloat($(this).find('input[data-name="igv"]').val());
            let importe =  parseFloat($(this).find('input[data-name="importe"]').val());

            total_gravada = total_gravada + subtotal;
            total_igv = total_igv + igv;
            total_importe = total_importe + importe;
        });

        DOM.find('input[name="total_gravada"]').val(total_gravada.toFixed(2));
        DOM.find('input[name="total_igv"]').val(total_igv.toFixed(2));
        DOM.find('input[name="total_importe"]').val(total_importe.toFixed(2));

    },

    /**** */



    change_condicion_pago: () => {

        let condicion_pago = DOM.find('select[name="condicion_pago"]').val();

        if(condicion_pago == 'CONTADO')
        {
            DOM.find('input[name="dias_pagar"]').prop('disabled', true);
        }
        else
        {
            DOM.find('input[name="dias_pagar"]').prop('disabled', false);
        }
    },

    change_moneda: () => {

        let value = DOM.find('select[name="id_moneda"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', true)
            .val('');
        }
        else
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', false)
            .val(GLOBAL.tipo_cambio);
        }
    },
    

    get_correlativo: async () => {

        let serie = DOM.find('input[name="serie"]').val();

    await axios.get(BASE_API+'logistica/orden_compra/get_correlativo/'+serie)
    .then(function (response) {

        DOM.find('input[name="numero"]').val(response.data.numero);

    }).catch(error => {
        console.log(error);
    });
    },

    select_moneda: async () =>
    {
        var url = "recursos/data_static/moneda";
        var idcombo = DOM.find('select[data-select="MONEDA"]');
        await $.select_render(url, idcombo);  
    },

    select_proveedor: async () => {
        var urlB = "mantenedor/persona/get_select_buscar?fl_proveedor=1";
        $.select2_buscar_v2('select[data-select="PROVEEDOR"]', urlB, "Buscar Razón Social o Número de Documento", 3);
    },

    datatable: async function() {

        let parametros = {
            fecha_inicio : DOM.find('input[name="fecha_inicio"]').val(),
            fecha_fin : DOM.find('input[name="fecha_fin"]').val(),
        };

        var oData = await $.getData('logistica/orden_compra?'+jQuery.param(parametros));

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [

            { "title": 'ESTADO',"data": null, render: function(data, type, row) { 
                
                let html = ``;

                if(row.fl_estado == 0)
                {
                    html = `<span class="badge rounded-pill bg-danger">ANULADO</span>`;                        
                }
                else if(row.fl_estado == 1)
                {
                    html = `<span class="badge rounded-pill bg-primary">REGISTRADO</span>`;
                }
                else if(row.fl_estado == 2)
                {
                    html = `<span class="badge rounded-pill bg-SUCCESS">PROCESADO</span>`;
                }

                return html;
                
            }, "class":'text-center'},
            { "title": 'FECHA', "data": 'fecha', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
            { "title": 'SERIE', "data": 'serie'},
            { "title": 'NÚMERO', "data": 'numero'},
            { "title": 'PROVEEDOR', "data": 'proveedor'},
            { "title": 'IMPORTE', "data": null, render: function(data, type, row) { return row.simbolo_moneda+' '+row.total_importe; }},
            { "title": 'TIPO CAMBIO', "data": 'tipo_cambio'},
            { "title": 'PRIORIDAD', "data": 'prioridad'},
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
                                properties: {class: "dropdown-item btnImprimir",href: "javascript:;",html: '<span class="mdi mdi-printer-outline"></span> Imprimir'},
                            },
                            {
                                element: "a",
                                properties: {class: "dropdown-item btnEliminar",href: "javascript:;",html: '<span class="mdi mdi-trash-can-outline"></span> Anular'},
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
            {
                responsivePriority: 1,
                targets: 8
            },
        ];

        var datableTarea = __generateDataTable(
            'tblRegistros',
            oData,
            oColums,
            arrayColumnDef, 
            15,
            [15, 20, 30, 40],
            [0,1,2,4,6,7],
            'LISTADO DE ÓRDENES DE COMPRA'
        );

        $('.tblRegistros tbody').on('click', '.btnImprimir', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Impresion.print(oDataRow.id);     
        });

        $('.tblRegistros tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.edit(oDataRow);     
        });
       
        $('.tblRegistros tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Componente.anular(oDataRow);
        });

    },

    submit: function() {
        
        let items = Componente.item_json();
        
        if(items.length == 0 )
        {
            HELPER.notificacion('No existe items', 'warning');
        }
        else
        {
            let ladda = HELPER.ladda(DOM_ID+' form[name="save"] button[name="submit"]');
            let formData = new FormData(document.querySelector(DOM_ID+' form[name="save"]'));

            if (this.id != null) { formData.append('id', this.id); }

            formData.append('detalle', JSON.stringify(items));

            let canvas = document.getElementById('canvas');
            let imagen_firma = canvas.toDataURL("image/png");
            formData.append('firma_base64', Componente.dataURLtoFile(imagen_firma, 'firma.png'));

            axios({
                method: 'post',
                url: BASE_API + 'logistica/orden_compra/'+Componente.action_submit,
                data: formData
            })
            .then(function(response) { 
                
                Componente.datatable();
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');

                Impresion.print(response.data.id_orden_compra); 
            
                ladda.stop();
            }).catch(error => {
                ladda.stop();
            });
        }
        
    },

    submit_anular: function() {        
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'logistica/orden_compra/'+Componente.action_submit,
            data: formData
        })
        .then(function(response) { 
            
            Componente.datatable();
            HELPER.notificacion(response.data.mensaje, 'success');
        
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
        
    },

    dataURLtoFile:(dataurl, filename) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    },
} 

export default Componente;