

 let DOM, DOM_ID ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

            <section id="cart" class="cart section">
                <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

                    <div class="row">
                        <div class="col-lg-8 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                            <div class="cart-items">
                                <div class="cart-header d-none d-lg-block">
                                    <div class="row align-items-center">
                                        <div class="col-lg-6">
                                            <h5>Producto</h5>
                                        </div>
                                        <div class="col-lg-2 text-center">
                                            <h5>Precio</h5>
                                        </div>
                                        <div class="col-lg-2 text-center">
                                            <h5>Cantidad</h5>
                                        </div>
                                        <div class="col-lg-2 text-center">
                                            <h5>Total</h5>
                                        </div>
                                    </div>
                                </div>

                                <div class="cart-item-all">
                    
                                    
                    
                                </div>

                                <div class="cart-actions">
                                    <div class="row">
                                        <div class="col-lg-12 text-md-end">
                                            <button class="btn btn-outline-heading me-2 btn_actualizar_carrito">
                                                <i class="bi bi-arrow-clockwise"></i> Actualizar carrito
                                            </button>
                                            <button class="btn btn-outline-remove btn_borrar_carrito">
                                                <i class="bi bi-trash"></i> Borrar carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-lg-4 mt-4 mt-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                            <div class="cart-summary">
                                <h4 class="summary-title">Resumen del pedido</h4>
                    
                                <div class="summary-item">
                                    <span class="summary-label">Subtotal</span>
                                    <span class="summary-value spn_subtotal" data-value="0">S/ 0.00</span>
                                </div>
                    
                                <div class="summary-item discount">
                                    <span class="summary-label">Descuento</span>
                                    <span class="summary-value spn_descuento" data-value="0">S/ 0.00</span>
                                </div>
                    
                                <div class="summary-total">
                                    <span class="summary-label">Total</span>
                                    <span class="summary-value spn_total" data-value="0">S/ 0.00</span>
                                </div>
                    
                                <div class="checkout-button">
                                    <a href="#/checkout" class="btn btn-accent w-100">
                                        Proceder la compra <i class="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                    
                                <div class="continue-shopping">
                                    <a href="#/tienda" class="btn btn-link w-100">
                                        <i class="bi bi-arrow-left"></i> Continuar comprando
                                    </a>
                                </div>
                    
                                <div class="payment-methods">
                                    <p class="payment-title">Aceptamos</p>
                                    <div class="payment-icons">
                                        <i class="bi bi-credit-card"></i>
                                        <i class="bi bi-paypal"></i>
                                        <i class="bi bi-wallet2"></i>
                                        <i class="bi bi-bank"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

          


        </div>    
         `;
 
         await Componente.after_render();       
         
    },
 
   after_render: async () => {

     DOM_ID = '#main';
     DOM = $(DOM_ID);

     DOM.on("click", ".btn_actualizar_carrito", function (e) {
        e.stopImmediatePropagation();
        Componente.listar_carrito();
     });

     DOM.on("click", ".btn_borrar_carrito", function (e) {
        e.stopImmediatePropagation();
        Componente.borrar_carrito();
     });

     Componente.listar_carrito();

     HELPER.load_component();
   },


    listar_carrito: async () => {

        let html = '';
        let data_resp = await $.fetchData('get', 'orden/cart/get_cart_id', {});

         if ($.validarResp(data_resp).ok) {

              data_resp.forEach((row,index) => {

                let imagenes = row.imagenes;
                let html_img = '';

                if(imagenes){
                    let arrImagenes = imagenes.split(',');
                    if(arrImagenes.length > 0){
                        html_img = `<img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[0]+`" alt="Product" class="img-fluid" loading="lazy">`;
                    }
                }


                html += `<!-- Cart Item ${index+1} -->
                        <div class="cart-item" data-cantidad="${row.cantidad}" data-precio="${row.precio}" data-id_producto="${row.id_producto}">
                            <div class="row align-items-center">
                                <div class="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                                    <div class="product-info d-flex align-items-center">
                                        <div class="product-image">
                                            ${html_img}
                                        </div>
                                        <div class="product-details">
                                            <h6 class="product-title">${row.producto}</h6>
                                            <button class="remove-item" type="button">
                                                <i class="bi bi-trash"></i> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                    <div class="price-tag">
                                        <span class="current-price">${'S/ '+ row.precio}</span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                    <div class="quantity-selector">
                                        <button class="quantity-btn decrease">
                                            <i class="bi bi-dash"></i>
                                        </button>
                                        <input type="number" class="quantity-input" value="${row.cantidad}" min="1" max="10">
                                        <button class="quantity-btn increase">
                                            <i class="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                    <div class="item-total">
                                        <span>${'S/ '+ row.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div><!-- End Cart Item -->
                        `;

              });


         } else {
            html = '<center>No se agregaron productos al carrito</center>'
            DOM.find('.btn_borrar_carrito').hide();
            DOM.find('.checkout-button').hide();
         }

        

        DOM.find('.cart-item-all').html(html);

        ecommerceCartTools();

        Componente.calcularTotalCarrito();

        //EVENTOS
        DOM.on("change keyup", ".quantity-input", function () {
            let item = $(this).closest(".cart-item");
            let cantidad = parseFloat($(this).val());

            if (cantidad > 0) {
                item.data("cantidad", cantidad);
                Componente.actualizarSubtotalItem(item);
                Componente.calcularTotalCarrito();
            }
        });

        DOM.on("click", ".quantity-btn", function () {
            let item = $(this).closest(".cart-item");
            let cantidad = parseFloat(item.find('.quantity-input').val());

            if (cantidad > 0) {
                item.data("cantidad", cantidad);
                Componente.actualizarSubtotalItem(item);
                Componente.calcularTotalCarrito();
            }
        });

        DOM.on("click", ".remove-item", function () {
            let item = $(this).closest(".cart-item");
            Componente.borrar_carrito_item(item);
        });

     },

    actualizarSubtotalItem: function (itemDiv) {
        let cantidad = parseFloat(itemDiv.data("cantidad"));
        let precio = parseFloat(itemDiv.data("precio"));

        if (!isNaN(cantidad) && !isNaN(precio)) {
            let subtotal = parseFloat((cantidad * precio)).toFixed(2);
            itemDiv.find(".item-total span").text("S/ " + subtotal);
        }
    },

    calcularTotalCarrito: function () {

        let totalGeneral = 0;

        DOM.find(".cart-item").each(function () {

            let cantidad = parseFloat($(this).data("cantidad"));
            let precio = parseFloat($(this).data("precio"));

            if (!isNaN(cantidad) && !isNaN(precio)) {
                let subtotal = cantidad * precio;
                totalGeneral += subtotal;
            }

        });

        totalGeneral = parseFloat(totalGeneral).toFixed(2);

        DOM.find(".spn_subtotal").text('S/ '+totalGeneral);
        DOM.find(".spn_subtotal").attr('data-value', totalGeneral);

        DOM.find(".spn_total").text('S/ '+totalGeneral);
        DOM.find(".spn_total").attr('data-value', totalGeneral);

        return totalGeneral;
    },
 
    borrar_carrito_item: async function(itemDiv) {

        var resp = await HELPER.DeleteRegistro();
        if (resp) {

            let id_producto = itemDiv.data("id_producto");
            let oData = { id_producto: id_producto}
            let resp = await $.postData('orden/cart/delete_item', oData);
            if (resp && resp.tipo == 'success') {
                itemDiv.remove();
                Componente.calcularTotalCarrito();
                $.get_cantidades_Main();
                HELPER.notificacion('Item eliminado', 'success');
            }
        } 
    },

    borrar_carrito: async function() {

        var resp = await HELPER.DeleteRegistro();
        if (resp) {

            let resp = await $.postData('orden/cart/delete', {});
            if (resp && resp.tipo == 'success') {
                Componente.listar_carrito();
                $.get_cantidades_Main();
                HELPER.notificacion('Carrito eliminado', 'success');
            }
        } 
    },


 } 
 
 export default Componente;