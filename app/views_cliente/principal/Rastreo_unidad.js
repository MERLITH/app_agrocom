
 import Monitoreo from './Monitoreo.js'

 let DOM, DOM_ID ;
 let Componente = {
     render: async (d) => {
         
         $('#main').off();
         d.innerHTML = `
 
         <div id="main">
             <!-- Content Header (Page header) -->
             <section class="content-header">
                 <div class="row">
                     <div class="col-md-8 content-header" style="padding-top:5px;">
                         <h1 style="margin:0; ">
                             Rastreo de Unidades
                             <small>Cliente</small>
                         </h1>
                     </div>
                 </div>
                 </section>
 
                 <!-- Main content -->
                 <section class="content">
 
                 <!-- Default box -->
                 <div class="box box-primary">
                    <div class="box-body">
                        <div class="row">        
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Fecha Desde</label>
                                    <input type="date" name="fecha_inicio" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Fecha Hasta</label>
                                    <input type="date" name="fecha_fin" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Nro. Chasis</label>
                                    <input type="text" name="serie_chasis" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label"># Ref. Cliente</label>
                                    <input type="text" name="referencia_carga_cliente" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Orden de Servicio</label>
                                    <input type="text" name="orden_servicio" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Placa</label>
                                    <input type="text" name="placa" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-3">        
                                <div class="form-group">
                                    <label class="form-label">Guia Remitente</label>
                                    <div class="input-group">
                                        <span class="input-group-addon" style="padding:0; border:none;">
                                        <input type="text" name="serie_guia_remision" class="form-control" style="width:80px;" placeholder="SERIE">
                                        </span>
                                        <input type="text" name="numero_guia_remision" class="form-control" placeholder="NÚMERO">
                                    </div>
                                </div>
                            </div>  
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Ruta</label>
                                    <select type="text" name="id_ruta" data-select="RUTA" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Solicitante</label>
                                    <select type="text" name="id_cliente_contacto" data-select="CONTACTO_CLIENTE" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Subcliente</label>
                                    <select type="text" name="id_subcliente" data-select="SUBCLIENTE" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Estado Monitoreo</label>
                                    <select name="id_estado_monitoreo" data-select="ESTADO_MONITOREO" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3" style="padding-top:19px;">
                                <button class="btn btn-primary" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
                 </div>
                 <!-- /.box -->
 
                 <!-- Default box -->
                 <div class="box box-primary">
                     <div class="box-body">
                     <div class="table-responsive">
                         <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                     </div>
                     </div>
                 </div>
                 <!-- /.box -->
 
             </section>
             <!-- /.content -->
         
 
         </div>            
         `+Monitoreo.render();

         
         await Monitoreo.after_render();
 
         await Componente.after_render();       
         
         
     },
 
     after_render: async () => {
 
         DOM_ID = '#main';
         DOM = $(DOM_ID);        

          /* DATATABLE UPDATE*/
          DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });
          
         /* MONITOREO */
        DOM.on('click', 'button[name="mostrar_monitoreo"]', function(e) {
            Monitoreo.show($(this));
        });
 
         DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
         DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
 
         Componente.datatable();
         Componente.select_estado_monitoreo();
         Componente.select_ruta();
         Componente.select_subcliente();
         Componente.select_cliente_contacto();
 
         HELPER.load_component();
     },
 
     /**** DATA */
     id: null,
     action_submit: null,
     archivo_anterior: null,
 
     /************ */

    select_ruta: async () => {

        let select = DOM.find('select[data-select="RUTA"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'configuracion/ruta/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 

    },
     
    select_estado_monitoreo: async () => {

        let select = DOM.find('select[data-select="ESTADO_MONITOREO"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'configuracion/estado_monitoreo/get_select?tipo=ORDEN_VIAJE')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 

    },

    select_subcliente: async (id_cliente = '') =>
    {
        id_cliente  = DOM.find('select[name="id_cliente"]').val();

        let select = DOM.find('select[data-select="SUBCLIENTE"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        if(id_cliente != '')
        {
            await axios.get(BASE_API+'intranet_cliente/Rastreo_unidad/get_select_subcliente')
            .then(function (response) {
                response.data.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });

                select.select2();
            }).catch(error => {
                console.log(error);
            }); 
        }
        
    },

    select_cliente_contacto: async (id_cliente = '') =>
    {
        id_cliente  = DOM.find('select[name="id_cliente"]').val();

        let select = DOM.find('select[data-select="CONTACTO_CLIENTE"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        if(id_cliente != '')
        {
            await axios.get(BASE_API+'intranet_cliente/Rastreo_unidad/get_select_contacto')
            .then(function (response) {
                response.data.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });

                select.select2();
            }).catch(error => {
                console.log(error);
            }); 
        }
        
    },
 
     datatable: function() {
 
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax:   {
                     url: BASE_API + 'intranet_cliente/rastreo_unidad',
                     data: function (d) {
                         d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                         d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                         d.serie_chasis = DOM.find('input[name="serie_chasis"]').val();
                         d.referencia_carga_cliente = DOM.find('input[name="referencia_carga_cliente"]').val();
                         d.orden_servicio = DOM.find('input[name="orden_servicio"]').val();
                         d.placa = DOM.find('input[name="placa"]').val();
                         d.serie_guia_remision = DOM.find('input[name="serie_guia_remision"]').val();
                         d.numero_guia_remision = DOM.find('input[name="numero_guia_remision"]').val();
                         d.id_ruta = DOM.find('select[name="id_ruta"]').val();
                         d.id_estado_monitoreo = DOM.find('select[name="id_estado_monitoreo"]').val();
                         d.id_subcliente = DOM.find('select[name="id_subcliente"]').val();
                         d.id_cliente_contacto = DOM.find('select[name="id_cliente_contacto"]').val();
                     }
             },
 
             columns: [
                { title: 'ID', mData: 'id', visible: false },
                {
                    title: '',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        let html = '';
    
                        if(row.fl_estado == 1)
                        {
                            html = `
                                <button type="button" class="btn btn-link btn-sm" name="mostrar_monitoreo"><i class="fa fa-external-link-square-alt" style="font-size:15px;"></i></button>
                            `;
                        }                        
    
                        return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'NÚMERO', mData: 'orden' },
                { title: 'ESTADO', class: `text-center`,                    
                    render: function(data, type, row) {                        
                        
                        let color = {
                            bg:'#fff',
                            text: '#000',
                            estado:'PREPARADO'
                        };

                        if(row.ultimo_monitoreo != null)
                        {
                            color = {
                                bg: row.ultimo_monitoreo.color_bg,
                                text: row.ultimo_monitoreo.color_text,
                                estado: row.ultimo_monitoreo.estado
                            };                            
                        }

                        return  `<small class="label label-default " style="background-color:`+color.bg+`; color:`+color.text+`"><i class="fa fa-flag"></i> `+color.estado+`</small>`;;
                    }
                },
                { title: 'SOLICITANTE', mData: 'cliente_contacto'},
                { title: 'SUBCLIENTE', mData: 'subcliente'},
                { title: 'ORDEN SERVICIO CLIENTE', mData: 'orden_servicio'},
                { title: 'RUTA', mData: 'ruta' },
                { title: 'REFERENCIA CLIENTE', mData: 'referencia_carga_cliente' },
                { title: 'FACTURA', mData: 'factura'},
                { title: 'ORDEN VIAJE', mData: 'viaje'}, 
                { title: 'PLACA', mData: 'vehiculo'},
                { title: 'CHASIS', mData: 'serie_chasis'}, 
                { title: 'FECHA SALIDA', render: function(data, type, row){ return (row.fecha_inicio != null) ? HELPER.fecha(row.fecha_inicio) : ''; }}, 
                { title: 'FECHA ENTREGA', render: function(data, type, row){ return (row.fecha_fin != null) ? HELPER.fecha(row.fecha_fin) : ''; }}, 
                { title: 'GUIA REMISIÓN', mData: 'guia_remitente'},
             ]
         });
 
     },     
 } 
 
 export default Componente;