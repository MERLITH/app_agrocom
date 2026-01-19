/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

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
                            Salida de artículos
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
                                                            <label>Tipo Destino <span class="text-danger">(*)</span></label>
                                                            <select name="tipo_destino" class="form-select">
                                                                <option value="">Seleccione...</option>
                                                                <option value="Uso en actividades externas">Uso en actividades externas</option>
                                                                <option value="Mantenimiento o reparación">Mantenimiento o reparación</option>
                                                                <option value="Reemplazo por nuevo material">Reemplazo por nuevo material</option>
                                                                <option value="Préstamo temporal">Préstamo temporal</option>
                                                                <option value="Donación">Donación</option>
                                                                <option value="Descargo por deterioro o pérdida">Descargo por deterioro o pérdida</option>
                                                                <option value="Traslado a otra sede o institución">Traslado a otra sede o institución</option>
                                                                <option value="Uso administrativo">Uso administrativo</option>
                                                                <option value="Proyectos o investigaciones">Proyectos o investigaciones</option>
                                                                <option value="Devolución a proveedor">Devolución a proveedor</option>
                                                            </select>                         
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Personal (Responsable)<span class="text-danger">(*)</span></label>
                                                            <select data-select="PERSONAL" class="form-control" name="id_personal"></select>       
                                                        </div>
                                                    </div>                                            
                                                    <div class="col-md-5 d-none">
                                                        <div class="form-group">
                                                            <label>Proveedor <span class="text-danger">(*)</span></label>
                                                            <select data-select="PROVEEDOR" class="form-control" name="id_proveedor"></select>       
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Motivo (Detallar) <span class="text-danger">(*)</span></label>
                                                            <textarea class="form-control" rows="5" name="motivo" /></textarea>
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
                                                                <th style="display: none;">STOCK</th>  
                                                                <th>CANTIDAD</th>                                        
                                                                <th>COSTO UNITARIO</th>
                                                                <th>IMPORTE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-item"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <button type="button" name="agregar_item" class="btn btn-secondary" style="margin-bottom:20px;"><i class="fa fa-plus"></i> Agregar Nuevo Item</button>
                        
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group">
                                                                                <label class="form-label">Observaciones</label>
                                                                                <textarea class="form-control" name="observacion"/></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td colspan="3">
                                                                    <table style="width:100%;">
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
                                            </div>
                                        </div>
                                        <!-- /.box -->
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

        /* IMPRIMIR */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));
            Impresion.print(data.id);
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

         /* ELIMINAR */
         DOM.on('click', 'a[name="row-anular"]', function(e) {
            e.stopImmediatePropagation();
            Componente.anular($(this));
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

         DOM.on('change', 'input[data-name="cantidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
                Componente.array_totales_detalle = null;

            }            
        });

        DOM.on('keyup', 'input[data-name="costo_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
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

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        
 
         await Componente.select_personal(); 
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
            {field: 'tipo_destino', message: 'Por favor, Seleccione el tipo de destino'},
            {field: 'id_personal', message: 'Por favor, Seleccione el personal'},
            {field: 'motivo', message: 'Por favor, Por favor especifique el motivo'},
            {field: 'prioridad', message: 'Por favor, Seleccione la prioridad'},
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

     get_articulo: async (id_articulo, codigo_fila) => {

        if(id_articulo != '' && id_articulo != null)
        {
            await axios.get(BASE_API+'logistica/articulo/get_unique/'+id_articulo)
            .then(function (response) {

                DOM.find('tr[data-codigo="'+codigo_fila+'"] input[data-name="stock"]').val(response.data.cantidad);
                
                DOM.find('tr[data-codigo="'+codigo_fila+'"] input[data-name="costo_unitario"]').val(response.data.costo);
                DOM.find('tr[data-codigo="'+codigo_fila+'"] span[data-name="unidad_medida"]').text(response.data.unidad_medida);
                Componente.calculo_importe_linea(codigo_fila);

            }).catch(error => {
                console.log(error);
            }); 
        }       

     },
     
 
     /************ */
  
     new: () => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('p[name="'+accion+'"]').html('<i class="mdi mdi-check-circle me-1"></i> Nueva Salida de Artículo');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"]').html('');
 
        DOM.find('input[name="fecha"]').val(HELPER.fecha_actual());
        DOM.find('input[name="serie"]').val(HELPER.fecha_ano());

        Componente.calcular_importe_total();

        Componente.id = null;
        Componente.action_submit = accion;

        Componente.get_correlativo();    
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
 
     },
 
     edit: async (data) => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"]').html('');

        DOM.find('p[name="'+accion+'"]').html('<i class="mdi mdi-check-circle me-1"></i> Editar Salida de Artículos');

         await axios.get(BASE_API+'logistica/salida_articulo/get_unique/'+data.id)
         .then( async (response) => {            
            data = response.data;

            Componente.fl_auto_event = false;

            form.find('input[name="fecha"]').val(data.fecha);

            form.find('input[name="serie"]').val(data.serie);
            form.find('input[name="numero"]').val(data.numero);

            form.find('select[name="tipo_destino"]').val(data.tipo_destino).change();

            //form.find('select[name="id_proveedor"]').val(data.id_proveedor).change();
            form.find('select[name="id_personal"]').val(data.id_personal).change();

            form.find('textarea[name="observacion"]').html(data.observacion);
            form.find('textarea[name="motivo"]').html(data.motivo);

            data.detalle.forEach(row => {
                Componente.agregar_item(row);
            });
 
            Componente.id = data.id;
            Componente.action_submit = accion;
 
            Componente.fl_auto_event = true;
            Componente.calcular_importe_total();

            DOM.find('div[name="modal-'+accion+'"]').modal('show');
         }).catch(error => {
             console.log(error);
         }); 
         
     },

     anular: function(row) {

        let accion = 'anular';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Salida de Artículos');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

     
 
     /***** ITEMS */
 
     agregar_item: async (data = null) => {
         
         let codigo = Math.random().toString(36).substr(2);
 
         if(data == null)
         {
             data = {
                 id_articulo: '',
                 stock: '',
                 cantidad: '1',
                 costo_unitario: '',
                 importe:''          
             };
         }
 
 
         let html = `
             <tr data-codigo="`+codigo+`">
                 <td><select data-select="ARTICULO" data-name="id_articulo" class="form-control"></select></td>
                 <td style="width:100px; display: none;"><input type="hidden" step="any" style="text-align:right;" data-name="stock" class="form-control" value="`+data.stock+`" readonly /></td>
                 <td style="width:100px; display: none;"><input type="hidden" step="any" style="text-align:right;" data-name="cantidad_anterior" class="form-control" value="`+data.cantidad+`" readonly /></td>
                 <td style="width:200px;">
                    <div class="input-groupT">
                        <input type="number" step="any" data-name="cantidad" class="form-control" placeholder="0.00" aria-label="Cantidad" aria-describedby="Cantidad" value="`+data.cantidad+`">
                        <span class="input-group-text d-none" data-name="unidad_medida">-</span>
                    </div>
                 </td>
                 <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="costo_unitario" class="form-control" value="`+data.costo_unitario+`" readonly /></td>
                 <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="importe" class="form-control" value="`+data.importe+`" readonly /></td>
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
                 stock : $(this).find('input[data-name="stock"]').val(),
                 cantidad_anterior : $(this).find('input[data-name="cantidad_anterior"]').val(),
                 cantidad : $(this).find('input[data-name="cantidad"]').val(),
                 costo_unitario : $(this).find('input[data-name="costo_unitario"]').val(),
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
 
         let costo_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="costo_unitario"]').val();
         costo_unitario = parseFloat((costo_unitario != '') ? costo_unitario : 0);
  
         let importe = cantidad * costo_unitario;
         importe = Math.round((importe + Number.EPSILON) * 100) / 100;
         
         
         let obj_total = {
             cantidad: cantidad,
             costo_unitario: costo_unitario,
             importe: importe
         };
 
         console.log(obj_total);
 
         DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));
 
         Componente.calcular_importe_total();
     },
     
     /*** CALCULO TOTALES */
 
     calcular_importe_total: async () => {
 
         let total_importe = 0;
 
         DOM.find('tbody[name="detalle-item"] tr').each(function(){
            
             let importe =  parseFloat($(this).find('input[data-name="importe"]').val());
 
             total_importe = total_importe + importe;
         });
 
         DOM.find('input[name="total_importe"]').val(total_importe.toFixed(2));
 
     },
  
     get_correlativo: async () => {
 
         let serie = DOM.find('input[name="serie"]').val();

        await axios.get(BASE_API+'logistica/salida_articulo/get_correlativo/'+serie)
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);

        }).catch(error => {
            console.log(error);
        });
     },
 
     select_personal: async () =>
     {
        var url = "mantenedor/personal/get_select";
        var idcombo = DOM.find('select[data-select="PERSONAL"]');
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

        var oData = await $.getData('logistica/salida_articulo?'+jQuery.param(parametros));

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
            { "title": 'TIPO DESTINO', "data": 'tipo_destino'},
            { "title": 'MOTIVO', "data": 'motivo'},
            { "title": 'PERSONAL (RESPONSABLE)', "data": 'personal'},
            { "title": 'OBSERVACION', "data": 'observacion'},
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
            [0,1,2,4,5,6,7],
            'LISTADO DE SALIDA DE ARTÍCULOS'
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

            axios({
                method: 'post',
                url: BASE_API + 'logistica/salida_articulo/'+Componente.action_submit,
                data: formData
            })
            .then(function(response) { 
                
                Componente.datatable();
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');

                Impresion.print(response.data.id_salida_articulo); 
            
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
            url: BASE_API + 'logistica/salida_articulo/'+Componente.action_submit,
            data: formData
        })
        .then(function(response) { 
            
            Componente.datatable();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
        
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
        
    },
 } 
 
 export default Componente;