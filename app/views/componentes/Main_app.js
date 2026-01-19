
import Menu_sidebar from './Menu_sidebar.js'

let Main = {
    render: (data) => {
        
        let usuario = data.usuario;
        let ajuste = data.ajuste;
        let empresa = data.empresa;
        let fl_logo_sistema = true;

        let style_change_color = '';
        let logo_sistema = 'assets/images/icono_brand.png';

        let nombre = 'SIN SESIÓN';
        let usuario_imagen = 'sin_imagen.jpg';


        GLOBAL.porcentaje_igv = ajuste.porcentaje_igv;
        GLOBAL.porcentaje_detraccion = ajuste.porcentaje_detraccion;
        GLOBAL.tipo_cambio = ajuste.tipo_cambio;
        GLOBAL.moneda_sistema = ajuste.moneda_sistema;
        GLOBAL.usuario = usuario;
        GLOBAL.ajuste = ajuste;
        GLOBAL.empresa = empresa;

        if (usuario) {

          //GLOBAL.usuario = usuario;

          /**** AJUSTES PERSONALIZADOS VISUAL */
          if(ajuste.fl_sistema_change_color == 1)
          {
              style_change_color = `style="background-color:`+ajuste.sistema_color_bg+`;"`;
          }

          if(ajuste.fl_sistema_logo == 1)
          {
              logo_sistema = BASE_FILES+'images/'+empresa.logo;
              fl_logo_sistema = false;
          }

          nombre = usuario.nombre;
          usuario_imagen = (usuario.imagen == 'sin_imagen.jpg'? '1.png': usuario.imagen );

          // let part_nombre = usuario.nombre.split(' ');
          // nombre = part_nombre[0];

          // let part_apellido = usuario.apellido.split(' ');

        }
        
        logo_sistema = BASE_URL+'/assets/images/icono.png';
        
        let html = `

        <!-- Ladda -->
        <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">

        <!-- Icons -->
        <link rel="stylesheet" href="temp/assets/vendor/fonts/materialdesignicons.css" />
        <link rel="stylesheet" href="temp/assets/vendor/fonts/fontawesome.css" />

        <!-- Vendor CSS Files -->
        <link href="test/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="test/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
        <link href="test/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
        <link href="test/assets/vendor/aos/aos.css" rel="stylesheet">
        <link href="test/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
        <link href="test/assets/vendor/drift-zoom/drift-basic.css" rel="stylesheet">
        
        <link rel="stylesheet" href="temp/assets/vendor/libs/select2/select2.css" />
        <link rel="stylesheet" href="temp/assets/vendor/libs/sweetalert2/sweetalert2.css" />
        <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/toastr.min.css">
        <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/css/ext-component-toastr.css">
        
        <link rel="stylesheet" href="temp/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css" />

        <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/toastr.min.css">
        <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/css/ext-component-toastr.css">

        <!-- Main CSS File -->
        <link href="test/assets/css/main.css" rel="stylesheet">
        
        
        <!-- <link rel="stylesheet" href="assets/css/app.css"> -->
        
        <!-- Page CSS -->
        
        <header id="header" class="header sticky-top">
        
        
          <!-- Main Header -->
          <div class="main-header">
            <div class="container-fluid container-xl">
              <div class="d-flex py-3 align-items-center justify-content-between">
        
                <!-- Logo -->
                <a href="`+BASE_URL+`" class="logo d-flex align-items-center">
                  <!-- Uncomment the line below if you also wish to use an image logo -->
                  <!-- <img src="test/assets/img/logo.webp" alt=""> -->
                  <img src="`+logo_sistema+`" width="30" height="30" alt="">
                  <h1 class="sitename">AgroCom</h1>
                </a>
        
                <!-- Search -->
                <form class="search-form desktop-search-form d-none">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Buscar productos">
                    <button class="btn" type="submit">
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                </form>
        
                <!-- Actions -->
                <div class="header-actions d-flex align-items-center justify-content-end">
        
                  <!-- Mobile Search Toggle -->
                  <button class="header-action-btn mobile-search-toggle d-xl-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#mobileSearch" aria-expanded="false" aria-controls="mobileSearch">
                    <i class="bi bi-search"></i>
                  </button>
        
                  <!-- Account -->
                  <div class="dropdown account-dropdown">
                    <button class="header-action-btn" data-bs-toggle="dropdown">
                      <i class="bi bi-person"></i>
                    </button>
                    <div class="dropdown-menu">
                      <div class="dropdown-header">
                        <h6>Bienvenido a <span class="sitename">AgroCom</span></h6>
                        <p class="mb-0">Accede a tu cuenta &amp; gestiona tus pedidos</p>
                      </div>
                      <div class="dropdown-body ${usuario ? '': 'd-none'}">
                        <a class="dropdown-item d-flex align-items-center" href="#/micuenta?tab=1">
                          <i class="bi bi-person-circle me-2"></i>
                          <span>Mi perfil</span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#/micuenta?tab=1">
                          <i class="bi bi-bag-check me-2"></i>
                          <span>Mis órdenes</span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#/micuenta?tab=2">
                          <i class="bi bi-heart me-2"></i>
                          <span>Mi lista de favoritos</span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#/micuenta?tab=4">
                          <i class="bi bi-gear me-2"></i>
                          <span>Ajustes</span>
                        </a>
                      </div>
                      <div class="dropdown-footer">
                        ${(usuario ? '<a href="javascript:" class="btn btn-outline-primary w-100 cerrar_sesion"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</a>' : '<a href="javascript:" class="btn btn-primary w-100 mb-2 btnlogininiciar">Iniciar sesión</a><a href="javascript:" class="btn btn-outline-primary w-100 btnloginregistrarse">Registrarse</a>') }
                        
                      </div>
                    </div>
                  </div>
        
                  <!-- Wishlist -->
                  <a href="#/micuenta?tab=2" class="header-action-btn d-md-block">
                    <i class="bi bi-heart"></i>
                    <span class="badge spn_wishlist">0</span>
                  </a>
        
                  <!-- Cart -->
                  <a href="#/cart" class="header-action-btn">
                    <i class="bi bi-cart3"></i>
                    <span class="badge spn_cart">0</span>
                  </a>
        
                  <!-- Mobile Navigation Toggle -->
                  <i class="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
        
                </div>
              </div>
            </div>
          </div>
        
          <!-- Navigation -->
          <div class="header-nav">
            <div class="container-fluid container-xl position-relative">
              <nav id="navmenu" class="navmenu">`;
                html += Menu_sidebar.render(usuario)
                +`</nav>
            </div>
          </div>
        
          <!-- Mobile Search Form -->
          <div class="collapse" id="mobileSearch">
            <div class="container">
              <form class="search-form">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for products">
                  <button class="btn" type="submit">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        
        </header>
        
        <div class="main" id="app"></div>
        
        <footer id="footer" class="footer dark-background">
          <div class="footer-main">
            <div class="container">
              <div class="row gy-4">
                <div class="col-lg-4 col-md-6">
                  <div class="footer-widget footer-about">
                    <a href="`+BASE_URL+`" class="logo">
                      <span class="sitename">AgroCom</span>
                    </a>
                    <div class="social-links mt-4">
                      <h5>Conéctese con nosotros</h5>
                      <div class="social-icons">
                        <a href="javascript:" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                        <a href="javascript:" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                        <a href="javascript:" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>
                        <!-- <a href="javascript:" aria-label="YouTube"><i class="bi bi-youtube"></i></a> -->
                      </div>
                    </div>
                  </div>
                </div>
        
                <div class="col-lg-2 col-md-6 col-sm-6">
                  <div class="footer-widget">
                    <h4>Enlaces importantes</h4>
                    <ul class="footer-links">
                      <li><a href="#/inicio">Inicio</a></li>
                      <li><a href="#/tienda">Tienda</a></li>
                      <li><a href="#/contacto">Contacto</a></li>
                      <li><a href="#/libro_reclamaciones">Libro de reclamaciones</a></li>
                      <li><a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">Términos y condiciones</a></li>        
                      <li><a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">Política de privacidad</a></li>
                      <li><a href="#" data-bs-toggle="modal" data-bs-target="#shippingModal">Política de envío</a></li>
                    </ul>
                  </div>
                </div>
        
                <div class="col-lg-4 col-md-6">
                  <div class="footer-widget">
                    <h4>Información del contacto</h4>
                    <div class="footer-contact">
                      <div class="contact-item">
                        <i class="bi bi-geo-alt"></i>
                        <span>La Jalca, Chachapoyas, Amazonas</span>
                      </div>
                      <div class="contact-item">
                        <i class="bi bi-telephone"></i>
                        <span>+51 935080041</span>
                      </div>
                      <div class="contact-item">
                        <i class="bi bi-envelope"></i>
                        <span>aracelymerlith@gmail.com</span>
                      </div>
                      <div class="contact-item">
                        <i class="bi bi-clock"></i>
                        <span>Lunes-Viernes: 9am-6pm<br>Sábado: 10am-4pm<br>Domingo: Cerrado</span>
                      </div>
                    </div>
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div class="footer-bottom">
            <div class="container">
              <div class="row gy-3 align-items-center">
                <div class="col-lg-6 col-md-12">
                  <div class="copyright">
                    <p>© <span>Copyright</span> <strong class="sitename">AgroCom</strong>. Todos los derechos reservados.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        <!-- Scroll Top -->
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        
        <!-- Preloader -->
        <!-- <div id="preloader"></div> -->


        <!-- Modal Login-->
        <div class="modal fade" id="modal-login" aria-labelledby="modalToggleLabel" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header border-0">
                <!--<h4 class="modal-title" id="modalToggleLabel">Iniciar sesión</h4>-->
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body register">
                <div class="row justify-content-center mb-3">
                  <div class="col-lg-11" id="ctn_form_login_mod"> 
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0 d-none">
                <button type="button" class="btn btn-secondary waves-effect" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Términos y condiciones Modals -->
        <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="termsModalLabel">Términos y Condiciones</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Al usar este sitio y realizar compras, aceptas los presentes Términos y Condiciones:</p>
                        <ul>
                            <li>El uso del sitio está permitido solo a personas con capacidad legal para contratar.</li>
                            <li>Los precios, stock y descripciones pueden variar sin previo aviso.</li>
                            <li>La compra queda sujeta a validación del pago y disponibilidad del producto.</li>
                            <li>Los medios de pago admitidos son los informados en el sitio.</li>
                            <li>Los envíos se realizan según plazos y costos informados al momento de la compra.</li>
                            <li>Productos veterinarios, biológicos y agroquímicos pueden tener restricciones especiales.</li>
                            <li>Cambios y devoluciones solo en productos sin uso, cerrados y con empaque original.</li>
                            <li>No nos responsabilizamos por daños derivados del mal uso de los productos.</li>
                            <li>El contenido del sitio es propiedad de la empresa y no puede ser reproducido sin autorización.</li>
                            <li>Podemos modificar estos términos en cualquier momento.</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entiendo</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Política de privacidad Modals -->
        <div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="privacyModalLabel">Política de Privacidad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Al usar este sitio aceptas la recolección y uso de tus datos personales según esta política:</p>
                        <ul>
                            <li>Recopilamos datos básicos de contacto, identificación, envío y navegación.</li>
                            <li>Usamos esta información para gestionar compras, pagos, envíos y comunicaciones.</li>
                            <li>No almacenamos los datos completos de tus tarjetas.</li>
                            <li>El sitio utiliza cookies para mejorar tu experiencia.</li>
                            <li>Compartimos datos solo con proveedores de pago, envíos y servicios tecnológicos necesarios.</li>
                            <li>Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento.</li>
                            <li>Protegemos tu información, aunque ningún sistema es 100% seguro.</li>
                            <li>Podemos actualizar esta política sin previo aviso.</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entiendo</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Política de Envíos Modals -->
        <div class="modal fade" id="shippingModal" tabindex="-1" aria-labelledby="shippingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="shippingModalLabel">Política de Envíos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>En <strong>AgroCom</strong> trabajamos para que tus productos lleguen rápido y en excelente estado. A continuación, te explicamos nuestras políticas de envío:</p>
                        <ul>
                            <li><strong>Ámbito de cobertura:</strong> Realizamos envíos a todo el país a través de transportadoras aliadas o reparto propio en zonas cercanas.</li>
                            <li><strong>Tiempos de entrega:</strong> Los pedidos se procesan entre 24 y 48 horas hábiles después de confirmado el pago. El tiempo total de entrega depende de la ubicación del cliente (entre 2 y 7 días hábiles).</li>
                            <li><strong>Costos de envío:</strong> El valor del envío se calcula según el peso, volumen y destino del pedido. En algunos casos, ofrecemos envíos gratis en compras superiores a un monto determinado.</li>
                            <li><strong>Seguimiento:</strong> Una vez despachado tu pedido, recibirás un número de guía o confirmación por correo o WhatsApp para hacer seguimiento.</li>
                            <li><strong>Recepción:</strong> Verifica que los productos lleguen en buen estado antes de firmar la entrega. En caso de daños o errores, comunícate con nosotros dentro de las primeras 24 horas.</li>
                            <li><strong>Retrasos o incidencias:</strong> No nos responsabilizamos por demoras ocasionadas por causas externas (clima, bloqueos, errores de transportadora), pero te ayudaremos a resolver cualquier inconveniente.</li>
                            <li><strong>Cambios en la dirección:</strong> Si necesitas modificar la dirección de entrega, notifícanos antes de que el pedido sea despachado.</li>
                        </ul>
                        <p>Nos esforzamos por brindarte un servicio confiable y seguro. Si tienes dudas sobre los envíos, contáctanos a través de nuestros canales oficiales.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    </div>
                </div>
            </div>
        </div>


        
        <script src="assets/library/sammy/sammy.min.js"></script>
        <script src="assets/library/ladda/spin.min.js"></script>
        <script src="assets/library/ladda/ladda.min.js"></script>
        <script src="temp/assets/vendor/libs/moment/moment.js"></script>

        <script src="temp/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
        <script src="temp/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
        <script src="temp/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script>
        
        <script src="temp/assets/vendor/libs/extensions/js/toastr.min.js"></script>

        <!-- Vendor JS Files -->
        <script src="test/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="test/assets/vendor/php-email-form/validate.js"></script>
        <script src="test/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="test/assets/vendor/aos/aos.js"></script>
        <script src="test/assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="test/assets/vendor/drift-zoom/Drift.min.js"></script>
        <script src="test/assets/vendor/purecounter/purecounter_vanilla.js"></script>
        
        
        <!-- Main JS File -->
        <script src="test/assets/js/main_ecommerce.js"></script>
        
        <script src="temp/assets/vendor/libs/select2/select2.js"></script>
        <script src="temp/assets/vendor/libs/bootstrap-select/bootstrap-select.js"></script>
        <script src="temp/assets/vendor/libs/moment/moment.js"></script>
        <script src="temp/assets/vendor/libs/sweetalert2/sweetalert2.js"></script>
        <script src="temp/assets/vendor/libs/extensions/js/toastr.min.js"></script>

        <script src="assets/library/jquery-loading-overlay/dist/loadingoverlay.min.js"></script>

        <script src="app/config/Helper.js"></script>    
        <script src="app/config/Config_Helper.js"></script>
        <script src="app/config/Notificacion.js"></script>
        <script src="app/config/Library_init.js"></script>
        <script src="app/config/Config_library.js"></script>

        <script src="https://js.culqi.com/checkout-js"></script>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        
        
        `;

        return html;

    },

    after_render: async (data_user) => {


      

        document.querySelectorAll('.btnlogininiciar').forEach(function(button) {
            button.addEventListener('click', function() {
                $.login_modal_mod(2);
            });
        });

        document.querySelectorAll('.btnloginregistrarse').forEach(function(button) {
            button.addEventListener('click', function() {
                $.login_modal_mod(1);
            });
        });



        $(document).on("select2:open", () => {
          document.querySelector(".select2-container--open .select2-search__field").focus()
        });

        toggleScrolled();
        initSwiper();
        toggleScrollTop();
        aosInit();
     
        Menu_sidebar.after_render(data_user);

        document.querySelectorAll('.cerrar_sesion').forEach(function(button) {
            button.addEventListener('click', function() {
                cerrar_sesion()
                ;
            });
        });

        if(GLOBAL.usuario){
          Main.get_cantidades();
        }
  
    },


    get_cantidades: async () => {


      let objRes = await $.fetchData('get', 'inicio/main/get_cantidades_id', {});

      if (objRes) {

        $('.spn_cart').text(objRes.cantidad_cart);
        $('.spn_wishlist').text(objRes.cantidad_wishlist);

      }

    },


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

let parametro_global = {
    
    accion_submit: null,

    show_modal: () => {
        var accion = 'save_global';
        var form = $('#main-save_global form[name="save"]');

        /** DATA */
        HELPER.reset_form(form);
        cambiar_password.accion_submit = accion;

        $('#main-save_global').modal('show');
    },

    submit: () => {
        
        const form = document.querySelector('#main-save_global form[name="save"]');

        const data = Object.fromEntries(new FormData(form).entries());

        if(data.password_nuevo !== data.re_password_nuevo)
        {
            alert("Las contraseñas no coinciden");
            return false;
        }

        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/ajuste_avanzado/save_global',
            data: formData
        })
        .then(function(response) {
            $('#main-save_global').modal('hide');
            location.href = BASE_URL;
        }).catch(error => {
            ladda.stop();
        });
    }
}
