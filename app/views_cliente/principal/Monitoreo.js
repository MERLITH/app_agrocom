import Google_maps_marker from '../../views/recursivo/Google_maps_marker.js'
import Google_maps_view from '../../views/recursivo/Google_maps_view.js'
import Image_view from '../../views/recursivo/Image_view.js'

let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        
            <div id="componente-monitoreo">

                <!-- MODAL DETALLE MONITOREO -->
                <div class="modal inmodal fade" name="modal-show_monitoreo" data-backdrop="static"  role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 name="show_monitoreo" class="modal-title">Modal title</h4>
                            </div>
                            <div class="modal-body">
                                <table style="width:60%; margin:auto;">
                                    <tr>
                                        <td colspan="4" style="font-weight:bold; text-align:center; font-size:18px;">INFORMACIÓN VEHÍCULO TRANSPORTADO</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold; text-align:right; padding-right:10px;">CHASIS</td>
                                        <td><span name="chasis"></span></td>
                                        <td style="font-weight:bold;  text-align:right; padding-right:10px;">PLACA</td>
                                        <td><span name="placa"></span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold;  text-align:right; padding-right:10px;">MODELO</td>
                                        <td><span name="modelo"></span></td>
                                        <td style="font-weight:bold;  text-align:right; padding-right:10px;">RUTA</td>
                                        <td><span name="ruta"></span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold;  text-align:right; padding-right:10px;">GUIA REMISIÓN</td>
                                        <td><span name="guia_remitente"></span></td>
                                        <td style="font-weight:bold;  text-align:right; padding-right:10px;">ESTADO</td>
                                        <td><span name="estado"></span></td>
                                    </tr>
                                </table>
                                <div style="font-weight:bold; text-align:center; font-size:16px; margin-top:20px;">SEGUIMIENTO DE TRÁNSITO</div>
                                <div class="table-responsive">
                                    <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                                </div>                      
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            `+Google_maps_view.render()+`

            `+Image_view.render()+`
        `;

        return html;
    },

    after_render: async (d = 'componente-monitoreo') => {

        DOM_ID = '#'+d; // NO ELIMINAR IMPORTANTE
        DOM = $(DOM_ID); // NO ELIMINAR IMPORTANTE

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha: {required: true},
                id_estado_monitoreo: {required: true},
              },
            
              messages: {
                    fecha: 'Fecha',
                    id_estado_monitoreo: 'Estado',
                },

            submitHandler: function() {
                Componente.submit();
            }
          
        });

         /** SUBMIT DELETE */
         DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT ENVIAR EMAIL */
        DOM.find('form[name="enviar_email"]').validate({
            submitHandler: function() {
                Componente.submit_enviar_email();
            }
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
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });

        /* ENVIAR EMAIL */
        DOM.on('click', 'button[name="row-enviar_email"]', function(e) {
            e.stopImmediatePropagation();
            Componente.enviar_email($(this));
        });

        /* VISUALIZAR MAPA */
        DOM.on('click', 'button[name="ver_ubicacion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.ver_ubicacion($(this));
        });

        /* VISUALIZAR IMAGEN */
        DOM.on('click', 'button[name="ver_imagen"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));
            Image_view.initital(data.foto);
        });

        Componente.datatable();
        Componente.select_estado_monitoreo();
    },

    ver_ubicacion: async (row) => {
        
        let data = HELPER.get_attr_json(row);

        let array_locacion = [];

        let item = {
            contenido: 'Viaje: '+data.viaje,
            latitud: data.latitud,
            longitud: data.longitud
        };

        array_locacion.push(item);

        Google_maps_view.initital(array_locacion);
    },

    show: (row) => {

        let data = HELPER.get_attr_json(row);

        Componente.id_viaje = data.id_viaje;

        DOM.find('span[name="placa"]').text(data.vehiculo);
        DOM.find('span[name="chasis"]').text(data.serie_chasis);
        DOM.find('span[name="modelo"]').text(data.modelo);
        DOM.find('span[name="ruta"]').text(data.ruta);
        DOM.find('span[name="guia_remitente"]').text(data.guia_remitente);
        DOM.find('span[name="estado"]').text(((data.ultimo_monitoreo != null) ? data.ultimo_monitoreo.estado :'PREPARADO'));


        Componente.table.ajax.reload(null, false);

        setInterval(() => {
            $($.fn.dataTable.tables(true)).DataTable()
            .columns.adjust();
        }, 100);

        
        
        DOM.find('h4[name="show_monitoreo"]').text('DETALLE RASTREO DE UNIDAD');
        DOM.find('div[name="modal-show_monitoreo"]').modal('show');
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'operacion/viaje_monitoreo',
                    data: function (d) {
                        d.id_viaje = Componente.id_viaje;
                    }
            },

            dom: 'frtip',
            searching:false,
            responsive: false,
            ordering:false,

            columns: [
                { title: 'FECHA HORA', render: function(data, type, row) { return HELPER.fecha_hora(row.fecha); }},
                { title: 'ESTADO', mData: 'estado' },
                { title: 'COORDENADAS', render: function(data, type, row) { return (row.fl_mapa == 1) ?  'LT: '+row.latitud+', LNG: '+row.longitud : ''; }},
                { title: 'UBICACIÓN', render: function(data, type, row) { return (row.fl_mapa == 1) ? '<button class="btn btn-default btn-sm" name="ver_ubicacion"><i class="fa fa-map-marker-alt"></i> Ver Ubicación</button>' : ''  }},
                { title: 'FOTO', render: function(data, type, row) { return (row.foto != 'sin_imagen.jpg') ? '<button class="btn btn-default btn-sm" name="ver_imagen"><i class="fa fa-image"></i> Ver Imagen</button>' : ''  }},
                { title: 'COMENTARIO', mData: 'comentario' },
            ]
        });

    },

    /******** */
    id_viaje: null,
    id: null,
    action_submit: null,
    foto_anterior: null,

    /********** */

    select_estado_monitoreo: async () => {

        let select = DOM.find('select[data-select="ESTADO_MONITOREO"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'configuracion/estado_monitoreo/get_select?tipo=ORDEN_VIAJE')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Monitoreo');

        /** DATA */
        HELPER.reset_form(form);

        form.find('input[name="fecha"]').val(HELPER.fecha_actual());

        this.id = null;
        this.action_submit = accion;
        this.foto_anterior = null;

        Google_maps_marker.initital();
        
        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        form.find('input[name="hora"]').val(HELPER.hora_actual());
        form.find('input[name="fl_mapa"]').prop('checked', true);
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Monitoreo');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        let fecha = data.fecha.split(" ");

        form.find('input[name="fecha"]').val(fecha[0]);
        form.find('input[name="hora"]').val(fecha[1]);
        form.find('select[name="id_estado_monitoreo"]').val(data.id_estado_monitoreo).change();
        form.find('input[name="mapa_latitud"]').val(data.latitud);
        form.find('input[name="mapa_longitud"]').val(data.longitud);
        form.find('input[name="comentario"]').html(data.comentario);        
        form.find('input[name="fl_mapa"]').prop('checked', parseInt(data.fl_mapa));

        Google_maps_marker.initital(data.latitud, data.longitud);

        Componente.id = data.id;
        Componente.action_submit = accion;
        Componente.foto_anterior = data.foto;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Monitoreo');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;
        this.foto_anterior = data.foto;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    enviar_email: async (row) => {
        
        let accion = 'enviar_email';
        let form = DOM.find('form[name="enviar_email"]');

        DOM.find('h4[name="'+accion+'"]').text('Enviar notificación a correo de cliente');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        Componente.id = data.id;

        axios.get(BASE_API+'operacion/viaje/get_orden_cliente/'+Componente.id_viaje)
        .then(function (response) {

            let codigo = Math.random().toString(36).substr(2);
            let html = '';

            response.data.forEach(row => {

                html = `
                    <tr data-codigo="`+codigo+`">
                        <td>`+row.orden+`</td>
                        <td>`+row.cliente+`</td>
                        <td data-name="email">`+row.email+`</td>
                        <td><button type="button" onclick="$('tr[data-codigo=`+codigo+`]').remove();" class="btn btn-danger btn-sm"><i class="fa fa-times"></i></button></td>
                    </tr>
                `;
                
            });

            DOM.find('tbody[name="detalle-enviar_email"]').html(html);

        }).catch(error => {
            console.log(error);
        }); 

        Componente.action_submit = accion;

        DOM.find('div[name="modal-enviar_email"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.id_viaje != null) { formData.append('id_viaje', this.id_viaje); }
        if (this.foto_anterior != null) { formData.append('foto_anterior', this.foto_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'operacion/viaje_monitoreo/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();

            $('#main button[name="update_datatable"]').click();
            
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_enviar_email: function() {

        let cantidad_email = 0;

        let data_email = [];

        DOM.find('tbody[name="detalle-enviar_email"] tr').each(function(){
           
            let value = $(this).find('td[data-name="email"]').text();
  
            if(value != '')
            {
                cantidad_email++;

                data_email.push(value);
            }
        });

        if(cantidad_email == 0)
        {
            HELPER.notificacion('No existe email de destinos', 'warning');
        }
        else
        {
            let ladda = HELPER.ladda(DOM_ID+' form[name="enviar_email"] button[type="submit"]');
            let formData = new FormData(document.querySelector(DOM_ID+' form[name="enviar_email"]'));

            if (this.id != null) { formData.append('id', this.id); }

            formData.append('email', JSON.stringify(data_email));

            axios({
                method: 'post',
                url: BASE_API + 'operacion/viaje_monitoreo/enviar_email',
                data: formData
            })
            .then(function(response) { 
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');
                ladda.stop();
                
            }).catch(error => {
                ladda.stop();
            });
        }        
        
    },

};

export default Componente;