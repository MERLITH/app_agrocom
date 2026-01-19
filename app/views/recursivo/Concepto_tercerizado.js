let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div class="row">
            <div class="col-md-12">
                <h4>MÁS CONCEPTOS DEL SERVICIO TERCERIZADO</h4>
            </div>
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>CONCEPTO</th>
                            <th>MONTO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody name="detalle-concepto_tercerizado"></tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" name="agregar_concepto_tercerizado" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
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
         DOM.find('button[name="agregar_concepto_tercerizado"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-concepto_tercerizado"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar($(this));
            Componente.calcular_total_tercerizado();
        });


        DOM.find('tbody[name="detalle-concepto_tercerizado"]').html('');

    },

    calcular_total_tercerizado: () => {

        let costo_flete = DOM.find('input[name="costo_flete_tercerizado"]').val();
        costo_flete = (costo_flete != '') ? parseFloat(costo_flete) : 0;

        let total_conceptos = Componente.get_importe_total();

        let total_tercerizado = costo_flete + total_conceptos;

        DOM.find('input[name="costo_tercerizado"]').val(total_tercerizado);

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
                concepto: '',
                monto: '',
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td><input type="text" data-name="concepto"  class="form-control" value="`+data.concepto+`" /></td>
                <td><input type="number" step="any" data-name="monto"  class="form-control" value="`+data.monto+`" /></td>
                <td><button type="button" name="quitar-concepto_tercerizado" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-concepto_tercerizado"]').append(html);
    },

    get_datajson: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-concepto_tercerizado"] tr').each(function(){
           
            let item = {
                concepto : $(this).find('input[data-name="concepto"]').val(),
                monto : $(this).find('input[data-name="monto"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    },

    get_importe_total: () => {

        let total = 0;

        DOM.find('tbody[name="detalle-concepto_tercerizado"] tr').each(function(){
           
           let valor  = $(this).find('input[data-name="monto"]').val();

           if(valor != '')
           {
                total = total + parseFloat(valor);
           }
            
        });

        return Math.round(total * 100) / 100;
    }

};

export default Componente;