let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div class="row">
            <div class="col-md-12">
                <datalist id="datalist-tipo_ayudante">
                    <option value="CONDUCTOR" />
                    <option value="AUXILIAR" />
                    <option value="ESTIBADOR" />
                </datalist>
                <table class="table">
                    <thead>
                        <tr>
                            <th>TIPO</th>
                            <th>NOMBRE</th>
                            <th style="width:20px;"></th>
                        </tr>
                    </thead>
                    <tbody name="detalle-ayudante"></tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" name="agregar_ayudante" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
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
         DOM.find('button[name="agregar_ayudante"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-ayudante"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar($(this));
        });


        DOM.find('tbody[name="detalle-ayudante"]').html('');

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
                nombre: '',
                tipo: '',
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="width:150px;"><input type="text" data-name="tipo" list="datalist-tipo_ayudante"  class="form-control" value="`+data.tipo+`" /></td>
                <td><input type="text" data-name="nombre"  class="form-control" value="`+data.nombre+`" /></td>
                <td><button type="button" name="quitar-ayudante" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-ayudante"]').append(html);
    },

    get_datajson: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-ayudante"] tr').each(function(){
           
            let item = {
                tipo : $(this).find('input[data-name="tipo"]').val(),
                nombre : $(this).find('input[data-name="nombre"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    }

};

export default Componente;