

 let DOM, DOM_ID,__idModal ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

            <section id="checkout" class="checkout section"> 
                <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            
                    <div class="row">
                        <div class="col-lg-7">
                            <!-- Checkout Form -->
                            <div class="checkout-container aos-init aos-animate" data-aos="fade-up">
                                <form class="checkout-form" id="frm_pago" name="frm_pago">
                                    <!-- Customer Information -->
                                    <div class="checkout-section" id="customer-info">
                                        <div class="section-header">
                                            <div class="section-number">1</div>
                                            <h3>Información del cliente</h3>
                                        </div>
                                        <div class="section-content">
                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <label for="first-name">Nombres</label>
                                                    <input type="text" name="first-name" class="form-control" id="first-name"
                                                        placeholder="Tu nombre" required="" disabled>
                                                </div>
                                                <div class="col-md-6 form-group">
                                                    <label for="last-name">Apellidos</label>
                                                    <input type="text" name="last-name" class="form-control" id="last-name"
                                                        placeholder="Tu apellido" required="" disabled>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">Email</label>
                                                <input type="email" class="form-control" name="email" id="email"
                                                    placeholder="Tu correo eléctrónico" required="" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="phone">Celular</label>
                                                <input type="tel" class="form-control" name="phone" id="phone"
                                                    placeholder="Tu celular" required="" disabled>
                                            </div>
                                        </div>
                                    </div>
            
                                    <!-- Shipping Address -->
                                    <div class="checkout-section" id="shipping-address">
                                        <div class="section-header">
                                            <div class="section-number">2</div>
                                            <h3>Dirección de envío</h3>
                                        </div>
                                        <div class="div_direcciones shipping-options p-3">
                                        </div>
                                        <div class="section-content text-end">
                                            <button type="button" class="btn btn-sm btn-outline-dark btn_agregar_direccion"><i class="bi bi-plus-circle"></i> Agregar Dirección</button>
                                        </div>
                                    </div>
            
                                    <!-- Payment Method -->
                                    <div class="checkout-section" id="payment-method">
                                        <div class="section-header">
                                            <div class="section-number">3</div>
                                            <h3>Método de pago</h3>
                                        </div>
                                        <div class="section-content">
                                            <div class="payment-options">
                                                <div class="payment-option active">
                                                    <input type="radio" name="payment-method" id="credit-card" checked="">
                                                    <label for="credit-card">
                                                        <span class="payment-icon"><i class="bi bi-credit-card-2-front"></i></span>
                                                        <span class="payment-label">Tarjeta de Crédito / Débito / Yape</span>
                                                    </label>
                                                </div>
                                            </div>
            
                                            <div class="payment-details d-none" id="credit-card-details">
                                                <div class="form-group">
                                                    <label for="card-number">Número de tarjeta</label>
                                                    <div class="card-number-wrapper">
                                                        <input type="text" class="form-control" name="card-number" id="card-number"
                                                            placeholder="1234 5678 9012 3456" required="">
                                                        <div class="card-icons">
                                                            <i class="bi bi-credit-card-2-front"></i>
                                                            <i class="bi bi-credit-card"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 form-group">
                                                        <label for="expiry">Fecha de expiración</label>
                                                        <input type="text" class="form-control" name="expiry" id="expiry"
                                                            placeholder="MM/YY" required="">
                                                    </div>
                                                    <div class="col-md-6 form-group">
                                                        <label for="cvv">Código de seguridad (CVV)</label>
                                                        <div class="cvv-wrapper">
                                                            <input type="text" class="form-control" name="cvv" id="cvv"
                                                                placeholder="123" required="">
                                                            <span class="cvv-hint" data-bs-toggle="tooltip" data-bs-placement="top"
                                                                aria-label="3-digit code on the back of your card"
                                                                data-bs-original-title="3-digit code on the back of your card">
                                                                <i class="bi bi-question-circle"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="card-name">Nombre del titular de la tarjeta</label>
                                                    <input type="text" class="form-control" name="card-name" id="card-name"
                                                        placeholder="John Doe" required="">
                                                </div>
                                            </div>
            
                                            <div class="payment-details d-none" id="paypal-details">
                                                <p class="payment-info">You will be redirected to PayPal to complete your purchase securely.</p>
                                            </div>
            
                                            <div class="payment-details d-none" id="apple-pay-details">
                                                <p class="payment-info">You will be prompted to authorize payment with Apple Pay.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
            
                                    <!-- Order Review -->
                                    <div class="checkout-section" id="order-review">
                                        <div class="section-header">
                                            <div class="section-number">4</div>
                                            <h3>Revisar y realizar pedido</h3>
                                        </div>
                                        <div class="section-content">
                                            <div class="form-check terms-check">
                                                <input class="form-check-input" type="checkbox" id="chk_terms" name="chk_terms">
                                                <label class="form-check-label" for="chk_terms">
                                                    Acepto los <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">Términos y Condiciones</a> , <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">Política de Privacidad</a> y <a href="#" data-bs-toggle="modal" data-bs-target="#shippingModal">Política de Envío</a>
                                                </label>
                                            </div>
                                            <div class="success-message d-none">¡Su pedido se ha realizado correctamente! Gracias por su compra.</div>
                                            <div class="place-order-container">
                                                <button type="button" class="btn btn-primary place-order-btn btn-proceder_pago" name="btn_proceder_pago">
                                                    <span class="btn-text">Realizar pedido</span>
                                                    <span class="btn-price">S/0.00</span>
                                                </button>
                                            </div>
                                            <!-- Container para o botão de pagamento -->
                                            <div class="cho-container"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
            
                        <div class="col-lg-5">
                            <!-- Order Summary -->
                            <div class="order-summary aos-init aos-animate" data-aos="fade-left" data-aos-delay="200">
                                <div class="order-summary-header">
                                    <h3>Resumen del pedido</h3>
                                    <span class="item-count">0 ártículos</span>
                                </div>
            
                                <div class="order-summary-content">
                                    <div class="order-items"></div>
            
                                    <div class="order-totals">
                                        <div class="order-subtotal d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <span class="spn_subtotal">S/ 0.00</span>
                                        </div>
                                        <div class="order-shipping d-flex justify-content-between d-none">
                                            <span>Shipping</span>
                                            <span>$9.99</span>
                                        </div>
                                        <div class="order-tax d-flex justify-content-between">
                                            <span>Descuento</span>
                                            <span>S/ 0.00</span>
                                        </div>
                                        <div class="order-total d-flex justify-content-between">
                                            <span>Total</span>
                                            <span class="spn_total">S/ 0.00</span>
                                        </div>
                                    </div>
            
                                    <div class="secure-checkout">
                                        <div class="secure-checkout-header">
                                            <i class="bi bi-shield-lock"></i>
                                            <span>Pago seguro</span>
                                        </div>
                                        <div class="payment-icons">
                                            <i class="bi bi-credit-card-2-front"></i>
                                            <i class="bi bi-credit-card"></i>
                                            <i class="bi bi-paypal"></i>
                                            <i class="bi bi-apple"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            
                    
            
                </div>          
            </section>

            <!-- Pop ups -->
            <div id="container_modal">
            </div>
            <!-- / Pop ups -->

        </div>    
         `;
 
         await Componente.after_render();       
         
    },
 
    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);

        DOM.on("click", ".btn_agregar_direccion", function (e) {
            e.stopImmediatePropagation();
            Componente.agregar_direccion();
        });

        // DOM.on("click", ".btn-proceder_pago", function (e) {
        //     e.stopImmediatePropagation();
        //     //Componente.proceder_pago();
        //     Componente.init_checkout();
        // });

        
        Componente.get_order_pendiente();
        Componente.mostrar_mis_datos();
        Componente.listar_carrito();
        Componente.validarForm();

        HELPER.load_component();
    },

    /**** Variables globales */
    id: null,
    id_persona: null,
    arrayItems: null,
    total_monto: null,
    obj_misdatos: null,

    get_order_pendiente: async function () {

        let row = await $.fetchData('get', 'orden/orders/get_order_pendiente', {});
        if ($.validarResp(row).ok) {
            this.id = row.id;
        }
    },

    init_checkout: async function () {

        let row = await $.fetchData('get', 'orden/checkout/init', {});
        console.log("🚀 ~ data_resp:", row);

        window.location.href = row.init_point;

        /*
        let width = 1100;
        let height = 800;

        let left = (window.screen.width / 2) - (width / 2);
        let top  = (window.screen.height / 2) - (height / 2);

        window.open(
            row.init_point,
            "mp_checkout",
            `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=no,status=no`
        );
        */




        /*
        let preferenceId = row.id;

        let publicKey = "APP_USR-d9d85607-f5fa-4295-9150-e7c713ce9720";
        let mp = new MercadoPago(publicKey , {
            locale: "es-PE"
        });
        
        mp.bricks().create("wallet", "walletBrick_container", {
            initialization: {
                preferenceId: preferenceId,
                redirectMode: 'modal'

            },
            customization:{
                texts:{
                    action: 'buy',
                    valueProp: 'security_details',
                }
            }
        });
        */

    },

    mostrar_mis_datos: async function () {

        let row = await $.fetchData('get', 'general/persona/get_mis_datos', {});
        console.log("🚀 ~ data_resp:", row)

        if ($.validarResp(row).ok) {

            this.obj_misdatos = row;
            this.id_persona = row.id;

            DOM.find("#first-name").val(row.nombres);
            DOM.find("#last-name").val(row.apellidos);
            DOM.find("#email").val(row.email);
            DOM.find("#phone").val(row.telefono);

            let html_direcciones = '';
            row.direcciones.forEach((item,index) => {

                html_direcciones += `<div class="form-check text-star">
                                        <input class="form-check-input" type="radio" name="shipping" id="express" ${index===0?'checked':''} value="${item.id}">
                                        <label class="form-check-label" for="express">${item.direccion}</label>
                                    </div>`;

            });

            DOM.find(".div_direcciones").html(html_direcciones);

        }

    },

    listar_carrito: async () => {

        let html = '';
        let data_resp = await $.fetchData('get', 'orden/cart/get_cart_id', {});
        let cant_articulos = '0 ártículos';

         if ($.validarResp(data_resp).ok) {

              data_resp.forEach((row,index) => {

                let imagenes = row.imagenes;
                let html_img = '';

                if(imagenes){
                    let arrImagenes = imagenes.split(',');
                    if(arrImagenes.length > 0){
                        html_img = `<img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[0]+`" alt="Product" class="img-fluid">`;
                    }
                }


                html += `<div class="order-item">
                            <div class="order-item-image">
                                ${html_img}
                            </div>
                            <div class="order-item-details">
                                <h4>${row.producto}</h4>
                                <div class="order-item-price">
                                    <span class="quantity">${row.cantidad} ×</span>
                                    <span class="price">${'S/ '+row.precio}</span>
                                </div>
                            </div>
                        </div>`;

              });

              cant_articulos = data_resp.length + ' artículos';


              Componente.calcularTotalCarrito(data_resp);


         } else {
            html = '<center>No se agregaron productos al carrito</center>'
         }

         DOM.find(".order-items").html(html);
         DOM.find(".item-count").text(cant_articulos);


    },

    agregar_direccion: function () {

        let idform = 'formSave';

        var cHtml = `<form name="${idform}" id="${idform}">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <label for="direccion">Dirección <span class="text-danger">(*)</span></label>
                                <input type="text" class="form-control" name="direccion" id="direccion" placeholder="Tu dirección">
                            </div>
                            <div class="col-12 mb-2">
                                <label for="apartamento">Apartamento, Suite, etc. (opcional)</label>
                                <input type="text" class="form-control" name="apartamento" id="apartamento" placeholder="Apartmento, Suite, etc.">
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="id_tipo_domicilio">Tipo de domicilio <span class="text-danger">(*)</span></label>
                                        <select class="form-select" id="id_tipo_domicilio" name="id_tipo_domicilio">
                                            <option value="1">Residencia</option>
                                            <option value="2">Oficina de trabajo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="codigo_postal">Código postal</label>
                                        <input type="text" name="codigo_postal" class="form-control" id="codigo_postal" placeholder="0000">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-md-6">
                                    <label for="nombres_contacto">Nombres de contacto</label>
                                    <input type="text" name="nombres_contacto" class="form-control" id="nombres_contacto" placeholder="Ejemplo: Daniel Gómez">
                                </div>
                                <div class="col-md-6">
                                    <label for="telefono_contacto">Celular de contacto</label>
                                    <input type="text" name="telefono_contacto" class="form-control" id="telefono_contacto" placeholder="Ejemplo: 999999999">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <label for="indicaciones">Indicaciones</label>
                                <textarea type="text" class="form-control" name="indicaciones" id="indicaciones" placeholder="Indicaciones o referencias de la dirección"></textarea>
                            </div>
                            <div class="col-12 mb-2">
                                <label for="id_ubigeo">Departamento/Provincia/País <span class="text-danger">(*)</span></label>
                                <select class="form-select sltUbigeo" id="id_ubigeo" name="id_ubigeo"></select>
                            </div>
                        </div>
                        <div class="modal-footer mt-4 pb-1 d-flex justify-content-center">
                            <button type="button" name="cerrar" class="btn btn-outline-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                            <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                        </div>
                    </form>`;

        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 3,
            cHtml : cHtml,  
            header : 1,
            titulo : 'Agregar dirección',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Componente.select_ubigeo();

        var arrayFields = [
            {field: 'direccion', message: 'Por favor, Escriba su dirección exacta'},
            {field: 'id_tipo_domicilio', message: 'Por favor, Seleccione el tipo de domicilio'},
            {field: 'id_ubigeo', message: 'Por favor, Seleccione el departamento/provincia/distrito'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[type="submit"]');
        DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {                   
                    Componente.save_direccion(idform);           
                }
            });           
        });

    },

    calcularTotalCarrito: function (data) {

        this.arrayItems = [];

        let totalGeneral = 0;

        data.forEach((row,index) => {

            let cantidad = parseFloat(row.cantidad);
            let precio = parseFloat(row.precio);

            if (!isNaN(cantidad) && !isNaN(precio)) {
                let subtotal = cantidad * precio;
                totalGeneral += subtotal;

                this.arrayItems.push({cantidad: cantidad, precio: precio, id_producto: row.id_producto, subtotal: subtotal, id_carrito: row.id})
            }

        });

        totalGeneral = parseFloat(totalGeneral).toFixed(2);

        this.total_monto = totalGeneral;

        DOM.find(".spn_subtotal").text('S/ '+totalGeneral);
        DOM.find(".spn_total").text('S/ '+totalGeneral);
        DOM.find(".btn-price").text('S/ '+totalGeneral);

    },

    validarForm: function () {

        let idform = 'frm_pago';

        var arrayFields = [
            {field: 'first-name', message: 'Por favor, este campo es requerido'},
            {field: 'last-name', message: 'Por favor, este campo es requerido'},
            {field: 'email', message: 'Por favor, este campo es requerido'},
            {field: 'phone', message: 'Por favor, este campo es requerido'},
            {field: 'chk_terms', message: 'Por favor, acepte los términos y condiciones'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[name="btn_proceder_pago"]');
        DOM.on('click', '#' + idform +' button[name="btn_proceder_pago"]', function(e) {
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.save_orden();
                    //Componente.proceder_pago();
                }
            });           
        });

    },

    proceder_pago: function () {

        //algunas validaciones
        if(!this.total_monto){
            HELPER.notificacion('Debe agregar productos a su compra', 'warning');
            return;
        }
        else if(this.total_monto == 0){
            HELPER.notificacion('El monto total tiene que ser mayor a 0', 'warning');
            return;
        }

        let $seleccionado = $('.div_direcciones input[name="shipping"]:checked');

        if($seleccionado.length === 0){
            HELPER.notificacion('Por favor, selecciona una dirección de envío.', 'warning');
            return;
        }

        let id_llave_publica_RSA = '6d3f312c-95af-4acc-8942-64170698f548';
        let llave_publica_RSA = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsxwuaRIZKMPeexl58K3qOo/M5bIOP3v3Hii2bXEMyMxx4fzI4Ijz1ZNtSFEmZ9gRKq/ZzLi+g/nteBSjLpr0sm/V4TJ5Z61yHPw57lM3TwpqVmAsn01yawO5UijD/MeYye+nJX9JyoxZF5Qbpt9bXoehGsYKhmK6lrmsvh5eqUwIDAQAB'; 
        let publicKey = 'pk_test_JRkuU9Dg1eyYopl7';

        const settings = {
            title: 'AgroCom',
            currency: 'PEN',
            amount: (this.total_monto * 100),
            order: 'ord_live_d1P0Tu1n7Od4nZdp',
            xculqirsaid: id_llave_publica_RSA,
            rsapublickey: llave_publica_RSA,
        }

        const paymentMethods = {// las opciones se ordenan según se configuren
            tarjeta: true,
            yape: true,
            billetera: true,
            bancaMovil: true,
            agente: true,
            cuotealo: true,	
        }

        const options = {
            lang: 'auto',
            installments: true,
            modal: true,
            container: "#culqi-container", // Opcional
            paymentMethods: paymentMethods,
            paymentMethodsSort: Object.keys(paymentMethods), // las opciones se ordenan según se configuren en paymentMethods
        }

        const client = {
            email: 'test2@demo.com'//(this.obj_misdatos? this.obj_misdatos.email: ''),
        }

        const appearance = {
            theme: "default",
            hiddenCulqiLogo: false,
            hiddenBannerContent: false,
            hiddenBanner: false,
            hiddenToolBarAmount: false,
            menuType: "sidebar", // default/sidebar / sliderTop / select
            buttonCardPayText: "Pagar tal monto", // hexadecimal
            logo: 'https://inchecksas.com/wp-content/uploads/2021/05/In-Check-Empresa-Agrocom.jpg',
            //logo: 'http://www.childrensociety.ms/wp-content/uploads/2019/11/MCS-Logo-2019-no-text.jpg',
            //logo: BASE_URL+'/assets/images/icono.png',
            defaultStyle: {
            bannerColor: "blue", // hexadecimal
            buttonBackground: "yellow", // hexadecimal
            menuColor: "pink", // hexadecimal
            linksColor: "green", // hexadecimal
            buttonTextColor: "blue", // hexadecimal
            priceColor: "red",
            },
            variables: {
            fontFamily: "monospace",
            fontWeightNormal: "500",
            borderRadius: "8px",
            colorBackground: "#0A2540",
            colorPrimary: "#EFC078",
            colorPrimaryText: "#1A1B25",
            colorText: "white",
            colorTextSecondary: "white",
            colorTextPlaceholder: "#727F96",
            colorIconTab: "white",
            colorLogo: "dark",
            soyUnaVariable: "blue",
            },
            rules: {
                    ".Culqi-Main-Container": {
                        background: "red",
                        fontFamily: "var(--fontFamily)",
                    },
                    ".Culqi-ToolBanner": {
                        background: "blue",
                        fontFamily: "var(--fontFamily)",
                        color: "white",
                    },
                    // cambia el color del texto y del ícono
                    ".Culqi-Toolbar-Price": {
                        color: "red",
                        fontFamily: "var(--fontFamily)",
                    },
                    // cambia el color solo del ícono
                    ".Culqi-Toolbar-Price .Culqi-Icon": {
                        color: "blue",
                    },
                    ".Culqi-Main-Method": {
                        background: "orange",
                        padding: "10px 20px",
                        color: "blue",
                    },
                    
                    // aplica color al texto del link y al Icon del link
                    ".Culqi-Text-Link": {
                        color: "red",
                    },
                    // Solo aplica color al Icon del link
                    ".Culqi-Text-Link .Culqi-Icon": {
                        color: "blue",
                    },
                    // Message, color aplica para text e ícono
                    ".Culqi-message": {
                        color: "blue",
                    },
                    // cambia el color solo del ícono
                    ".Culqi-message .Culqi-Icon": {
                        color: "red",
                    },
                    ".Culqi-message-warning": {
                        background: "white",
                        color: "orange",
                    },
                    ".Culqi-message-info": {
                        background: "white",
                        color: "black",
                    },
                    ".Culqi-message-error": {
                        background: "black",
                        color: "yellow",
                    },
                    ".Culqi-message-error .Culqi-Icon": {
                        color: "yellow",
                    },
                    
                    // aplica a los labels
                    ".Culqi-Label": {
                        color: "var(--soyUnaVariable)",
                        marginBottom: "20px",
                    },
                    ".Culqi-Input": {
                        border: "1px solid red",
                        color: "var(--soyUnaVariable)",
                    },
                    ".Culqi-Input:focus": {
                        border: "2px solid black",
                    },
                    ".Culqi-Input.input-valid": {
                        border: "1px solid pink",
                        background: "black",
                        color: "var(--colorText)",
                    },
                    ".Culqi-Input-Icon-Spinner": {
                        color: "red",
                    },
                    ".Culqi-Input-Select": {
                        border: "1px solid red",
                        color: "blue",
                    },
                    // aplica para al hacer hover en los options del select
                    ".Culqi-Input-Select-Options-Hover": {  
                        color: "red",
                        background: "black",
                    },
                    // aplica para el seleccionado al ser activado
                    ".Culqi-Input-Select-Selected":{  
                        color: "green",
                    },
                    ".Culqi-Input-Select.active": { // aplica cuando le das click al control
                        border: "1px solid red",
                        background: "pink",
                    },
                    // aplica al listado de cuotas
                    ".Culqi-Input-Select-Options": {
                        background: "gray",
                    },
                    // aplica a los botones
                    ".Culqi-Button": {
                        background: "red",
                    },
                    
                    //--------Menu GENERALES----------------
                    // el color se aplica para el texto y el ícono del menú
                    ".Culqi-Menu": {
                        color: "blue",
                        //background: "white",
                    },
                    
                    // el color se aplica para el ícono del menú
                    ".Culqi-Menu .Culqi-Icon": {
                        color: "green",
                    },
                    //-------FIN Menu GENERALES----------------
                    
                    //--------- MENU SELECT-------------
                    // aplica cuando el select esta seleccionado
                    ".Culqi-Menu-Selected": { 
                        //background: "orange",
                        color: "#D621A5",
                        //border: "1px solid white",
                    },
                    ".Culqi-Menu-Selected .Culqi-Icon": { 
                        //background: "orange",
                        color: "red",
                        //border: "1px solid white",
                    },
                    // aplica cuando para las opciones del select menú
                    ".Culqi-Menu-Options": {
                        background: "orange",
                    },
                    // aplica para las opciones del select menú cuando se hace hover
                    ".Culqi-Menu-Options-Hover": { 
                        background: "green",
                        color: "red",
                    },
                    // aplica para los ICONOS de las opciones del select menú cuando se hace hover
                    ".Culqi-Menu-Options-Hover .Culqi-Icon": {  
                        color: "blue",
                    },
                    
                    //--------- FIN SELECT-------------
                    
                    //----------------- MENU SLIDERTOP Y SIDEBAR----------------------
                    /*
                    ".Culqi-Menu-Item": { 
                        background: "black",
                        color: "red",
                    },
                
                    // cambia el color para el item menu, tanto texto e ícono seleccionado (no aplica en el select menu)
                    ".Culqi-Menu-Item.active": { 
                        color: "white",
                        //border: "1px solid white",
                    },
                    // cambia el color para el ICONO del item menu seleccionado (no aplica en el select menu)
                    ".Culqi-Menu-Item.active .Culqi-Icon": {
                        color: "blue",
                    },
                    
                    // MODIFICA EL TEXTO DEL MENÚ(no aplica al menú select)
                    ".Culqi-Menu-Item-Text": { // reemplaza a la clase .Culqi-Menu-Item  
                        "font-size": "12px",
                        color: "green",
                    },

                    
                    // cambia el color de los ICONOS ARROW DE sliderTop
                    ".Culqi-Menu .Culqi-Icon-Arrow": {
                        color: "blue",
                    },
                    // CAMBIA EL COLOR DE LA BARRA LATERAL DE SIDEBAR
                    ".Culqi-Menu-Item.active .Culqi-Bar": { 
                        background: "blue" 
                    },
                    */
                },
            };

        const handleCulqiAction = () => {
            if (Culqi.token) {
                const token = Culqi.token.id;
                console.log('Se ha creado un Token: ', token);
            } else if (Culqi.order) {
                const order = Culqi.order;
                console.log('Se ha creado el objeto Order: ', order);
            } else {
                console.log('Errorrr : ', Culqi.error);
            }
        }

        const config = {
            settings,
            client,
            options,
            appearance,
        };

        const Culqi = new CulqiCheckout(publicKey, config);

        Culqi.culqi = handleCulqiAction;
     
        Culqi.open()
   
    },

    select_ubigeo: async () =>
    {
        var urlB = BASE_API + "recursos/data_static/ubigeo";
        $.select2_buscar('sltUbigeo', urlB, "Departamento - Provincia - Distrito", 3);    
    },

    save_direccion: async function(idform) {

        let ladda = HELPER.ladda(DOM_ID+' form[name="' + idform + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + idform + '"]'));
        if (this.id_persona != null) { formData.append('id_persona', this.id_persona); }

        let resp = await $.postData('general/persona/save_direccion', formData);
        if (resp && resp.tipo == 'success') {
            __closeModal(__idModal);
            HELPER.notificacion(resp.mensaje, 'success');

            Componente.mostrar_mis_datos();
        }
        ladda.stop();
     
    },

    save_orden: async function() {

        let $seleccionado = $('.div_direcciones input[name="shipping"]:checked');

        let formData = new FormData(document.querySelector(DOM_ID+' form[name="frm_pago"]'));

        if(this.id){
            formData.append('id', this.id);
        }
        
        formData.append('id_persona', this.id_persona);
        formData.append('id_persona_direccion', $seleccionado.val());
        formData.append('token_id', '1234');
        formData.append('monto_total', this.total_monto);
        formData.append('detalle', JSON.stringify(this.arrayItems));

        let resp = await $.postData('orden/orders/save', formData);
        if (resp && resp.tipo == 'success') {

            Componente.init_checkout();
            //__closeModal(__idModal);
            //HELPER.notificacion_v2(resp.mensaje, 'success');
            //$.get_cantidades_Main();

            // setTimeout(() => {
            //     location.href = "#/inicio";
            // }, 3000);

        }
     
    },

 
 } 
 
 export default Componente;