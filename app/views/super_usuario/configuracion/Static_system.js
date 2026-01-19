
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
                             General
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
                                 <div class="col-md-3">
                                     <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label"> <input type="checkbox" name="fl_bg_login"> Fondo Login Personalizado</label>
                                            </div>
                                        </div>
                                         <div class="col-md-12" align="center">
                                             <div>
                                                 <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                             </div>
                                             <div>
                                                 <label class="btn btn-default btn-sm" style="width:100%;">
                                                     <i class="fa fa-search"></i> Examinar imagen de fondo (1920 x 1080 píxeles)
                                                     <input type="file" name="imagen" style="display:none;">
                                                 </label>
                                             </div>
                                         </div>
                                         <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label"> <input type="checkbox" name="fl_logo_login"> Logo Login Personalizado</label>
                                            </div>
                                        </div>
                                         <div class="col-md-12" align="center">
                                            <div>
                                                <img name="logo_login" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div>
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Examinar Logo (200 x 90 píxeles)
                                                    <input type="file" name="logo_login" style="display:none;">
                                                </label>
                                            </div>
                                         </div>
 
                                     </div>
                                 </div>
                                 <div class="col-md-9">
                                     <div class="row">                                         
                                         <div class="col-md-8">
                                             <div class="form-group">
                                                 <label class="form-label">Email ROBOT</label>
                                                 <input type="email" name="email_robot" class="form-control form-control-sm" autocomplete="off" >
                                             </div>
                                         </div>
                                         <div class="col-md-12">
                                             <div class="form-group">
                                                 <label class="form-label">Nombre Sistema</label>
                                                 <input type="text" name="empresa" class="form-control form-control-sm" autocomplete="off" >
                                             </div>
                                         </div>      
                                         <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Cambio de color botton Login</label>
                                                <input type="text" name="color_button_login" class="form-control form-control-sm" placeholder="#000" >
                                            </div>
                                        </div>                                    
                                     </div>
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
         DOM.find('input[name="logo_login"]').change(function(e) {
             e.stopImmediatePropagation();
             HELPER.preview_image(this, DOM.find('img[name="logo_login"]'));
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
         $('#picker_button_color_login').farbtastic('#button_color_login');
     },
 
     /**** DATA */
     id: null,
     action_submit: null,
     imagen_anterior: null,
     logo_login_anterior: null,
 
     /************ */
     
     get: async function() {
         
         axios.get(BASE_API + 'super_usuario/static_system')
         .then(function(response) {
 
             let data = response.data;
 
             let form = DOM.find('form[name="save"]');

             if(data.bg_login != null)
             {
                form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.bg_login);
             }

             if(data.logo_login != null)
             {
                form.find('img[name="logo_login"]').attr('src', BASE_FILES+'images/'+data.logo_login);
             }

             form.find('input[name="fl_bg_login"]').prop('checked', parseInt(data.fl_bg_login));
             form.find('input[name="fl_logo_login"]').prop('checked', parseInt(data.fl_logo_login));
             form.find('input[name="email_robot"]').val(data.email_robot);
             form.find('input[name="empresa"]').val(data.empresa);
             form.find('input[name="color_button_login"]').val(data.color_button_login);
             
             Componente.imagen_anterior = data.bg_login;
             Componente.logo_login_anterior = data.logo_login;
             Componente.action_submit = 'save';
 
         }).catch(error => {
             console.log(error);
         }); 
     },
     
     submit: function() {
         
         let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
         let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));
 
         if (this.id != null) { formData.append('id', this.id); }
         if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
         if (this.logo_login_anterior != null) { formData.append('logo_login_anterior', this.logo_login_anterior); }
 
         axios({
             method: 'post',
             url: BASE_API + 'super_usuario/static_system/' + this.action_submit,
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