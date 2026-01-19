let NOTIFI = {

    get: async() => {
        
        axios.get(BASE_API + 'notificacion_viewer/get')
        .then(function(response) {


            let html = '';

            response.data.forEach(row => {

                let color = '';
                let icono = '';
                let icono_alerta = '';
                let alerta = 'success';

                switch (row.estado) {

                    case 2:
                        color = '#ffc107;';
                        icono = '<i class="fas fa-envelope-open fa-2x"></i>';
                        icono_alerta = '<i class="fas fa-exclamation-triangle fa-beat fa-2x"></i>';
                        alerta = 'warning';
                    break;

                    case 3:
                        color = '#dc3545';
                        icono = '<i class="fas fa-envelope-open fa-2x"></i>';
                        icono_alerta = '<i class="fas fa-radiation-alt fa-2x"></i>';
                        alerta = 'danger';
                    break;

                }


                html += `
                <div class="message  message--warning" style="width:100%; padding:0px; border-left:0px;" id="global-id_notificacion-`+row.id+`">
                    <table style="width:100%;">
                        <tr>
                            <td style="width:6px; background-color:`+color+`; text-align:center; vertial-align:middle; color:#fff;"></td>
                            <td style="width:50px; color:`+color+`; text-align:center; vertial-align:middle;">
                               `+icono+`
                            </td>
                            <td style="padding:7px;">
                                <div style="font-weight:bold;">`+row.nombre+`</div>
                                <small class="label label-default" style="font-size: 14px">`+row.stock_actual+` ROLLOS</small>
                            </td>
                            <td style="width:10px; vertical-align:middle; text-align:center; padding:7px;">
                                <button type="button" name="global-row-id_notificacion" data-id="`+row.id+`" class="btn btn-`+alerta+`" style="min-width:70px; height:50px; padding:0; background-color:`+color+`; color: #fff">`+icono_alerta+`</button>
                            </td>
                        </tr>
                    </table>
                </div>
                `;
            });


            $('#global-detalle_notificacion').html(html);


            if(response.data.length > 0)
            {
               setTimeout(() => {
                $('#global_modal-notificacion').modal('show'); 
               }, 500);
            }
            
            
        }).catch(error => {
        });
    },

    check: (id) => {

        var formData = new FormData();
        formData.append('id', id)
 
         axios({
             method: 'post',
             url: BASE_API + 'notificacion_viewer/check',
             data: formData
         })
         .then(function(response) {

             $('#global-id_notificacion-'+id).hide('fast');

             console.log($('#global-detalle_notificacion  div').length);

             if($('#global-detalle_notificacion  div').length > 2)
             {
                setTimeout(() => {
                    $('#global-id_notificacion-'+id).remove();                
    
                    if($('#global-detalle_notificacion div').length == 0)
                    {
                        $('#global_modal-notificacion').modal('hide'); 
                    }
                 }, 500);
             }
             else
             {       
                $('#global_modal-notificacion').modal('hide'); 
             }            
             

             
         }).catch(error => {
             //ladda.stop();
         });

    },

}

window.NOTIFI = NOTIFI;