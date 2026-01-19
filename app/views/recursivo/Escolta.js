let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div class="row">
            <div class="col-md-12">
                <h4><strong>SERVICIO DE ESCOLTA</strong></h4>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Proveedor de Escolta</label>
                            <select data-select="PROVEEDOR" name="id_proveedor_escolta" class="form-control" autocomplete="off"></select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Moneda <span class="text-danger">(*)</span></label>
                            <select data-select="MONEDA" name="id_moneda_escolta" class="form-control" autocomplete="off"></select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Tipo Cambio <b class="text-danger">*</b></label>
                            <input type="number" step="any" name="tipo_cambio_escolta" class="form-control" autocomplete="off">  
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Costo de Servicio <b class="text-danger">*</b></label>
                            <input type="number" step="any" name="costo_escolta" class="form-control" autocomplete="off">  
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Adelanto de Servicio <b class="text-danger">*</b></label>
                            <input type="number" step="any" name="monto_adelanto_escolta" class="form-control" autocomplete="off">  
                        </div>
                    </div>
                    <div class="col-md-4" >
                        <div class="form-group">
                            <label class="form-label">% Detracción Servicio <b class="text-danger">*</b></label>
                            <input type="number" step="any" name="porc_detraccion_escolta" class="form-control" autocomplete="off">                                                             
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">IGV Servicio  <b class="text-danger">*</b></label>
                            <select type="number" step="any" name="mas_inc_igv_escolta" class="form-control select" autocomplete="off">
                                <option value="">Seleccione...</option>
                                <option value="INC_IGV">INCLUIDO IGV</option>
                                <option value="MAS_IGV">MÁS IGV</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>VEHÍCULOS</th>
                            <th>DESCRIPCIÓN / COMENTARIO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody name="detalle-escolta_vehiculo"></tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" name="agregar_escolta_vehiculo" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        `;

        return html;
    },

    after_render: async (d = 'main') => {

        DOM_ID = '#'+d; // NO ELIMINAR IMPORTANTE
        DOM = $(DOM_ID); // NO ELIMINAR IMPORTANTE

        /* AGREGAR */
         DOM.find('button[name="agregar_escolta_vehiculo"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-escolta_vehiculo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar($(this));
        });

        /* CHANGE MONEDA  */
        DOM.on('change', 'select[name="id_moneda_escolta"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_moneda();
        });

         /* CHANGE PROVEEDOR  */
         DOM.on('change', 'select[name="id_proveedor_escolta"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_proveedor();
        });


        DOM.find('tbody[name="detalle-escolta_vehiculo"]').html('');

    },

    change_proveedor: () => {

        let id_proveedor = DOM.find('select[name="id_proveedor_escolta"]').val();

        if(id_proveedor == '')
        {
            DOM.find('select[name="id_moneda_escolta"]').prop('disabled', true);
            DOM.find('input[name="tipo_cambio_escolta"]').prop('disabled', true);
            DOM.find('input[name="costo_escolta"]').prop('disabled', true);
            DOM.find('input[name="monto_adelanto_escolta"]').prop('disabled', true);      
            DOM.find('input[name="porc_detraccion_escolta"]').prop('disabled', true);      
            DOM.find('select[name="mas_inc_igv_escolta"]').prop('disabled', true);            
        }
        else
        {
            DOM.find('select[name="id_moneda_escolta"]').prop('disabled', false);
            DOM.find('input[name="tipo_cambio_escolta"]').prop('disabled', false);
            DOM.find('input[name="costo_escolta"]').prop('disabled', false);
            DOM.find('input[name="monto_adelanto_escolta"]').prop('disabled', false);
            DOM.find('input[name="porc_detraccion_escolta"]').prop('disabled', false);      
            DOM.find('select[name="mas_inc_igv_escolta"]').prop('disabled', false);
        }

    },

    change_moneda: async (get_helper = true) => {
        let value = DOM.find('select[name="id_moneda_escolta"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio_escolta"]').prop('disabled', true);
            DOM.find('input[name="tipo_cambio_escolta"]').val('');
        }
        else if(value != '')
        {
            DOM.find('input[name="tipo_cambio_escolta"]').prop('disabled', false);
            if(get_helper)
            {
                DOM.find('input[name="tipo_cambio_escolta"]').val(await HELPER.get_tipo_cambio(value));
            }
            
        }
    },
    
    quitar: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    agregar: (data = null) => {

        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                vehiculo: '',
                descripcion: '',
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td><input type="text" data-name="vehiculo"  class="form-control" value="`+data.vehiculo+`" /></td>
                <td><input type="number" step="any" data-name="descripcion"  class="form-control" value="`+data.descripcion+`" /></td>
                <td><button type="button" name="quitar-escolta_vehiculo" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-escolta_vehiculo"]').append(html);
    },

    get_datajson: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-escolta_vehiculo"] tr').each(function(){
           
            let item = {
                vehiculo : $(this).find('input[data-name="vehiculo"]').val(),
                descripcion : $(this).find('input[data-name="descripcion"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    },

};

export default Componente;