
 import Menu_sidebar from './Menu_sidebar.js'

 let Main = {
     render: (data) => {
         
         let usuario = data.usuario;
         let ajuste = data.ajuste;
         let empresa = data.empresa;

         let style_change_color = '';
         let logo_sistema = 'assets/images/icono_brand.png';

         if(usuario.tipo != 'SUPER USUARIO')
         {
            GLOBAL.porcentaje_igv = ajuste.porcentaje_igv;
            GLOBAL.porcentaje_detraccion = ajuste.porcentaje_detraccion;
            GLOBAL.tipo_cambio = ajuste.tipo_cambio;

            /**** AJUSTES PERSONALIZADOS VISUAL */
            if(ajuste.fl_sistema_change_color == 1)
            {
                style_change_color = `style="background-color:`+ajuste.sistema_color_bg+`;"`;
            }

            if(ajuste.fl_sistema_logo == 1)
            {
                logo_sistema = BASE_FILES+'images/'+empresa.logo;
            }
         }
         
 
         let part_nombre = usuario.nombre.split(' ');
         let nombre = part_nombre[0];
 
         let part_apellido = usuario.apellido.split(' ');
         let apellido = part_apellido[0];

         
         
         
         let html = `
 
         <!-- Bootstrap 3.3.7 -->
         <link rel="stylesheet" href="template/bower_components/bootstrap/dist/css/bootstrap.min.css">
 
         <!-- DataTables -->
         <link rel="stylesheet" href="assets/library/datatable/datatables.min.css">
         <link rel="stylesheet" href="https://cdn.datatables.net/colreorder/1.5.3/css/colReorder.dataTables.min.css">
 
         <!-- FONT AWESOME -->
         <link href="assets/library/pro_fontawesome/css/all.css" rel="stylesheet">
 
         <!-- Ionicons -->
         <link rel="stylesheet" href="template/bower_components/Ionicons/css/ionicons.min.css">
 
         <!-- Ladda -->
         <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">
 
         <!-- Select2 -->
         <link rel="stylesheet" href="template/bower_components/select2/dist/css/select2.min.css">
 
         <!-- Theme style -->
         <link rel="stylesheet" href="template/dist/css/AdminLTE.min.css">
 
         <link rel="stylesheet" href="template/dist/css/skins/_all-skins.min.css">
     
 
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
 
         <link href="assets/css/app.css" rel="stylesheet">
 
         <!-- COLORPICKER -->
         <link rel="stylesheet" href="assets/library/colorpicker-input/css/colorpicker.css">
 
         <!-- Site wrapper -->
         <div class="wrapper">
 
         <header class="main-header">
             <!-- Logo -->
             <a href="app" class="logo" `+style_change_color+`>
 
             <!-- mini logo for sidebar mini 50x50 pixels -->
             <span class="logo-mini"><b>T</b>S</span>
 
             <!-- logo for regular state and mobile devices -->
             <span class="logo-lg"><img src="`+logo_sistema+`" /></i><b>Titanic</b>Soft</span>
             </a>
 
             <!-- Header Navbar: style can be found in header.less -->
             <nav class="navbar navbar-static-top" `+style_change_color+`>
 
             <!-- Sidebar toggle button-->
             <a href="javascript:" class="sidebar-toggle" data-toggle="push-menu" role="button">
                 <i class="fa fa-bars"></i>
             </a>
 
             <div class="navbar-custom-menu">
                 <ul class="nav navbar-nav">
                 <!-- Messages: style can be found in dropdown.less-->
 
                 <!-- User Account: style can be found in dropdown.less -->
                 <li class="dropdown user user-menu">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                     <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="user-image" alt="User Image">
                     <span class="hidden-xs">`+nombre+` | `+usuario.email+`</span>
                     </a>
                     <ul class="dropdown-menu">
                     <!-- User image -->
                     <li class="user-header">
                         <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="img-circle" alt="User Image">
 
                         <p>
                         <?= $nombre; ?>
                         <small>`+usuario.tipo+`</small>
                         </p>
                     </li>
                     <!-- Menu Body -->
                     <!-- Menu Footer-->
                     <li class="user-footer">
                         <div>
                             <a href="javascript:"  id="cambiar_password" class="btn btn-default btn-flat" style="width:100%;">Cambiar Contraseña</a>
                         </div>
                         <div>
                             <a href="javascript:"  id="cerrar_sesion" class="btn btn-default btn-flat" style="width:100%;">Cerrar Sesión</a>
                         </div>
                     </li>
                     
                     </ul>
                 </li>
                 </ul>
             </div>
             </nav>
         </header>
 
         <!-- =============================================== -->
 
         <!-- Left side column. contains the sidebar -->
         <aside class="main-sidebar">
 
             <!-- sidebar: style can be found in sidebar.less -->
             <section class="sidebar">
 
                 <!-- Sidebar user panel -->
                 <div class="user-panel">
 
                     <div class="pull-left image">
                         <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="img-circle" alt="User Image">
                     </div>
 
                     <div class="pull-left info">
                         <p>`+nombre+`</p>
                         <a href="#">
                             <i class="fa fa-circle text-success"></i> `+usuario.tipo+`
                         </a>
                     </div>
                    
                 </div>`; 
                 
                 html += Menu_sidebar.render(usuario)+`
 
                 </section>
             <!-- /.sidebar -->
         </aside>
 
         <!-- =============================================== -->
 
         <!-- Content Wrapper. Contains page content -->
         <div class="content-wrapper">
             <div id="app">
                 <div style="width:100%; text-align:center; margin-top:10%;">
                     <div style="margin:auto; font-size:20px;">Preparando...</div>
                 </div>
             </div>
         </div>
         <!-- /.content-wrapper -->
 
         <footer class="main-footer">
             <div class="pull-right hidden-xs">
             <b>Version</b> 3.0
             </div>
             <strong>Copyright &copy; <?= date("Y");?> Sistema para Transporte de Courier</a>
         </footer>
 
         </div>
         <!-- ./wrapper -->
         
                     <!---  MODAL SAVE -->
                         <div class="modal fade" id="main-save_password" data-backdrop="static" style="display:none;">
                             <div class="modal-dialog modal-sm">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                         <h4 name="save" class="modal-title">Cambiar Contraseña</h4>
                                     </div>
                                     <form name="save">
                                         <div class="modal-body">
                                             <div class="row">   
                                                 <div class="col-md-12">
                                                     <div class="form-group">
                                                         <label class="form-label">Contraseña Actual<span class="text-danger">*</span></label>
                                                         <input type="password" name="password_actual" class="form-control" required maxlength="50" autocomplete="off" />
                                                     </div>
                                                 </div>
                                                 <div class="col-md-12">
                                                     <div class="form-group">
                                                         <label class="form-label">Nueva Contraseña <span class="text-danger">*</span></label>
                                                         <input type="password" name="password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />
                                                     </div>
                                                 </div>                                     
                                                 <div class="col-md-12">
                                                     <div class="form-group">
                                                         <label class="form-label">Repita nueva Contraseña <span class="text-danger">*</span></label>
                                                         <input type="password" name="re_password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="modal-footer">
                                             <button type="button" class="btn btn-light-grey" data-dismiss="modal" style="float:left;">Cancelar</button>
                                             <button type="submit" class="btn btn-primary">Guardar</button>
                                         </div>
                                     </form>
                                 </div>
                                 <!-- /.modal-content -->
                             </div>
                             <!-- /.modal-dialog -->
                         </div>
                         <!-- /.modal -->
             
             <!-- Bootstrap -->
             <script src="assets/library/sammy/sammy.min.js"></script>    
             <script src="assets/library/ladda/spin.min.js"></script>    
             <script src="assets/library/ladda/ladda.min.js"></script>   
             
             <script src="https://momentjs.com/downloads/moment.min.js"></script>
             
             <!-- jQuery 3 -->
             <script src="template/bower_components/jquery/dist/jquery.min.js"></script>
 
             <!-- Bootstrap 3.3.7 -->
             <script src="template/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
 
             <!-- SlimScroll -->
             <script src="template/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
 
             <!-- FastClick -->
             <script src="template/bower_components/fastclick/lib/fastclick.js"></script>
 
             <!-- AdminLTE App -->
             <script src="template/dist/js/adminlte.min.js"></script>
             
             <!-- AdminLTE for demo purposes -->
             <script src="template/dist/js/demo.js"></script>
 
 
             <!-- DataTables -->
             <script src="assets/library/datatable/datatables.min.js"></script>
             <script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.colVis.min.js"></script>
             <script src="https://cdn.datatables.net/colreorder/1.5.3/js/dataTables.colReorder.min.js"></script>
 
             <!-- Select2 -->
             <script src="template/bower_components/select2/dist/js/select2.full.min.js"></script>
 
             <!-- Select2 -->
             <script src="template/bower_components/select2/dist/js/select2.full.min.js"></script>
 
             <!-- Sweet alert-->
             <script src="assets/library/node_modules/sweetalert/dist/sweetalert.min.js"></script>
 
 
             <script src="assets/library/form_validate/jquery.form.js"></script>
             <script src="assets/library/form_validate/jquery.validate.js"></script>
             <script src="assets/library/jquery-loading-overlay/dist/loadingoverlay.min.js"></script>
 
             <script src="assets/library/bootstrap-notify.min.js"></script>
 
             <script src="assets/library/colorpicker-input/js/colorpicker.js"></script>
             
             <script src="app/config/Helper.js"></script>
             <script src="app/config/Library_init.js"></script>
             <script src="app/config/Config_library.js"></script>
 
             <!-- GOOGLE MAPS -->
             <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDCyoF3nBv4SpGwGJYQ99cUjmtmrR5juY&libraries=adsense&sensor=true&language=es"></script>
 
 
             
 
         `;
 
         return html;
 
     },
 
     after_render: async (data_user) => {
                 
         Menu_sidebar.after_render(data_user);
 
         $('body').addClass("skin-blue fixed sidebar-mini sidebar-mini-expand-feature");
         /*$('body').overlayScrollbars({});
         $('.scroll_bars').overlayScrollbars({});*/
 
         /** SUBMIT SAVE PASSWORD*/
         $('#main-save_password form[name="save"]').validate({
             submitHandler: function() {
                 cambiar_password.submit();
             }
         });   
         
         document.querySelector('#cerrar_sesion').addEventListener('click', function() { 
             cerrar_sesion();
         });
 
         document.querySelector('#cambiar_password').addEventListener('click', function() { 
             cambiar_password.show_modal();
         });
  
         
     }
 }
 export default Main;
 
 // FUNCIONES DEL MAIN
 
 let cerrar_sesion = () => {
 
     axios.get(BASE_API + 'autenticacion/logout')
     .then(function(response) {
         localStorage.removeItem('Token');
         location.href = BASE_URL;
 
     }).catch(error => {
         localStorage.removeItem('Token');
         location.href = BASE_URL;
     });
 
 }
 
 let cambiar_password = {
     
     accion_submit: null,
 
     show_modal: () => {
         var accion = 'save_my_password';
         var form = $('#main-save_password form[name="save"]');
 
         /** DATA */
         HELPER.reset_form(form);
         cambiar_password.accion_submit = accion;
 
         $('#main-save_password').modal('show');
     },
 
     submit: () => {
         
         const form = document.querySelector('#main-save_password form[name="save"]');
 
         const data = Object.fromEntries(new FormData(form).entries());
 
         if(data.password_nuevo !== data.re_password_nuevo)
         {
             alert("Las contraseñas no coinciden");
             return false;
         }
 
         var formData = new FormData(form);
 
         axios({
             method: 'post',
             url: BASE_API + 'configuracion/usuario/save_my_password',
             data: formData
         })
         .then(function(response) {
             $('#main-save_password').modal('hide');
             alert("Completado");
             cerrar_sesion();
         }).catch(error => {
             ladda.stop();
         });
     }
 }
 