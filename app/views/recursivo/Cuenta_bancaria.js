let DOM, DOM_ID ;

let Cuenta_bancaria = {

    render: () => {
        let html = `
        <div class="row">
            <div class="col-md-12">
            
                <datalist id="list-banco"></datalist>
                <datalist id="list-tipo_cuenta_bancaria"></datalist>

                <table class="table">
                    <thead>
                        <tr>
                            <th>BANCO</th>
                            <th>TIPO DE CUENTA</th>
                            <th>NÚMERO DE CUENTA</th>
                            <th>DETRACCIÓN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody name="detalle-cuenta_bancaria"></tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" name="agregar_cuenta_bancaria" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
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

        /* AGREGAR CUENTA BANCARIA */
         DOM.find('button[name="agregar_cuenta_bancaria"]').click(function(e) {
            e.stopImmediatePropagation();
            Cuenta_bancaria.agregar();
        });

        /* QUITAR CUENTA BANCARIA */

        DOM.on('click', 'button[name="quitar-cuenta_bancaria"]', function(e) {
            e.stopImmediatePropagation();
            Cuenta_bancaria.quitar($(this));
        });


     //   await Cuenta_bancaria.select_banco();
        await Cuenta_bancaria.select_tipo_cuenta_bancaria();

        DOM.find('tbody[name="detalle-cuenta_bancaria"]').html('');

    },

    select_banco: async () => {

        await axios.get(BASE_API+'recursos/data_static/banco')
        .then(function (response) {

            let html = '';
            response.data.forEach(row => {
                html += '<option value="'+row.text+'" />';
            });

            DOM.find('datalist[id="list-banco"]').html(html);

        }).catch(error => {
            console.log(error);
        }); 

    },

    select_tipo_cuenta_bancaria:  async () => {

        await axios.get(BASE_API+'recursos/data_static/tipo_cuenta_bancaria')
        .then(function (response) {

            let html = '';
            response.data.forEach(row => {
                html += '<option value="'+row.text+'" />';
            });

            DOM.find('datalist[id="list-tipo_cuenta_bancaria"]').html(html);

        }).catch(error => {
            console.log(error);
        }); 

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
                id: '',
                banco: '',
                tipo: '',
                numero: '',
                fl_detraccion: 0
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><input type="text" data-name="banco"  class="form-control" value="`+data.banco+`" list="list-banco" /></td>
                <td><input type="text" data-name="tipo"  class="form-control" value="`+data.tipo+`" list="list-tipo_cuenta_bancaria" /></td>
                <td><input type="text" data-name="numero" class="form-control" value="`+data.numero+`" /></td>
                <td><input type="checkbox" `+((data.fl_detraccion == 1) ? 'checked' : '')+` data-name="fl_detraccion" /></td>
                <td><button type="button" name="quitar-cuenta_bancaria" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-cuenta_bancaria"]').append(html);
    },

    get_datajson: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-cuenta_bancaria"] tr').each(function(){
           
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                banco : $(this).find('input[data-name="banco"]').val(),
                tipo : $(this).find('input[data-name="tipo"]').val(),
                numero : $(this).find('input[data-name="numero"]').val(),
                fl_detraccion : ($(this).find('input[data-name="fl_detraccion"]').is(':checked')) ? 1 : 0
            };
  
            detalle.push(item);
        });

        return detalle;
    }

};

export default Cuenta_bancaria;