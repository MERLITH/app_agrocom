let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>SERIE</th>
                            <th>NUMERO</th>
                            <th>PUNTO ORIGEN</th>
                            <th>PUNTO DESTINO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody name="detalle-guia_transportista"></tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" name="agregar_guia_transportista" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
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
         DOM.find('button[name="agregar_guia_transportista"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-guia_transportista"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar($(this));
        });


        DOM.find('tbody[name="detalle-guia_transportista"]').html('');

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
                serie: '',
                numero: '',
                punto_origen: '',
                punto_destino: '',
                id:''
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><input type="text" data-name="serie"  class="form-control" value="`+data.serie+`" /></td>
                <td><input type="text" data-name="numero"  class="form-control" value="`+data.numero+`" /></td>
                <td><input type="text" data-name="punto_origen" class="form-control" value="`+data.punto_origen+`" /></td>
                <td><input type="text" data-name="punto_destino" class="form-control" value="`+data.punto_destino+`" /></td>
                <td><button type="button" name="quitar-guia_transportista" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-guia_transportista"]').append(html);
    },

    get_datajson: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-guia_transportista"] tr').each(function(){
           
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                serie : $(this).find('input[data-name="serie"]').val(),
                numero : $(this).find('input[data-name="numero"]').val(),
                punto_origen : $(this).find('input[data-name="punto_origen"]').val(),
                punto_destino : $(this).find('input[data-name="punto_destino"]').val()
            };
  
            detalle.push(item);
        });

        return detalle;
    }

};

export default Componente;