
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
                             Utilitarios
                             <small>Configuración</small>
                         </h1>
                     </div>
                 </div>
                 </section>
 
                 <!-- Main content -->
                 <section class="content">
 
                 <!-- Default box -->
                 <div class="box box-warning">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <button type="button" name="base_datos" class="btn btn-primary btn-sm"><i class="fa fa-database"></i> Exportar Base de Datos</button>
                            </div>
                            <div class="col-md-6">
                                <button type="button" name="cerrar_sesion_usuarios" class="btn btn-default btn-sm"><i class="fa fa-sign-out-alt"></i> Cerrar sesión de todos los Usuarios</button>
                            </div>
                        </div>
                    </div>                     
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
 
         
        DOM.on('click', 'button[name="base_datos"]', function(e) {
            e.stopImmediatePropagation();

            HELPER.download(BASE_API+'configuracion/utilitarios/backup_base_datos');
        });

        DOM.on('click', 'button[name="cerrar_sesion_usuarios"]', function(e) {
            e.stopImmediatePropagation();
            
            axios.get(BASE_API+'configuracion/utilitarios/cerrar_sesion_usuarios')
            .then(function(response) {
                HELPER.notificacion(response.data.mensaje, 'success');
            }).catch(error => {
                console.log(error);
            }); 
        });
 
 
         HELPER.load_component();
     },
     
 } 
 
 export default Componente;