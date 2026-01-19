
let DOM, DOM_ID ;
let Componente = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Moneda / Tipo Cambio
                            <small>Configuración</small>
                        </h1>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                    <form name="save">
                        <div class="box-body">                        
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>MONEDA</th>
                                                <th>SÍMBOLO</th>
                                                <th>CÓDIGO</th>
                                                <th>TIPO CAMBIO</th>
                                                <th>VISTA PANEL</th>
                                            </tr>
                                        </thead>
                                        <tbody name="detalle"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-grey btn-sm" data-dismiss="modal" style="float:left;">Cancelar</button>
                            <button type="button" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </form>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->



        </div>            
        `;

        Componente.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        
        /** VALIDATE SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
                          
            /* REGLAS */
            rules: {
              numero_documento: {required: true},
              razon_social: {required: true},
              direccion: {required: true},
              tipo_proveedor_electronico: {required: true},
            },
          
            messages: {
              numero_documento: 'Número de Documento',
              razon_social: 'Razón Social',
              direccion: 'Dirección',
              tipo_proveedor_electronico: 'Tipo Proveedor Electrónico'

          },

      });

      DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
          e.stopImmediatePropagation();

          if(DOM.find('form[name="save"]').valid())
          {
              Componente.submit();
          }
          
      });
      
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen_factura"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen_factura"]'));
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


        Componente.get();        

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */
    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/tipo_cambio')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            let html_table = '';

            data.forEach(row => {
                if(row.id != 1)
                {
                    html_table += `
                        <tr data-id="`+row.id+`">
                            <td>`+row.nombre+`</td>
                            <td>`+row.simbolo+`</td>
                            <td>`+row.codigo+`</td>
                            <td><input type="number" step="any" data-name="tipo_cambio" class="form-control" value="`+row.tipo_cambio+`" /></td>
                            <td><input type="radio" name="codigo_publico" value="`+row.id+`" `+((row.fl_publico == 1) ? 'checked' : '')+` /></td>
                        </tr>
                    `; 
                }
                   
            });

            DOM.find('tbody[name="detalle"]').html(html_table);
            
            Componente.action_submit = 'save';

        }).catch(error => {
            console.log(error);
        }); 
    },
    
    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData();

        let obj_filas = [];
        DOM.find('tbody[name="detalle"] tr').each(function(){

            obj_filas.push({
                id: $(this).data('id'),
                tipo_cambio: $(this).find('input[data-name="tipo_cambio"]').val()
            });

        });

        formData.append('detalle', JSON.stringify(obj_filas));
        formData.append('id_publico', DOM.find('input[name="codigo_publico"]:checked').val());

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/tipo_cambio/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.get();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;