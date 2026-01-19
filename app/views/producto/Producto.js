

let DOM, DOM_ID,__idModal;
let Componente = {

    render: async (d, data, id_producto = null) => {
        
        let main_random = 'main_'+Math.random().toString(36).substr(2);
        $('#'+main_random).off();

        d.innerHTML = `
        <div id="`+main_random+`">

            <section id="product-details" class="product-details section">

                <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

                    <div class="row g-4">
                    <!-- Product Gallery -->
                    <div class="col-lg-7 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="150">
                        <div class="product-gallery">
                            <div class="main-showcase">
                                <div class="image-zoom-container">
                                    <img alt="Product Main" class="img-fluid main-product-image drift-zoom" id="main-product-image">
                                    <div class="image-navigation">
                                        <button class="nav-arrow prev-image image-nav-btn prev-image" type="button">
                                            <i class="bi bi-chevron-left"></i>
                                        </button>
                                        <button class="nav-arrow next-image image-nav-btn next-image" type="button">
                                            <i class="bi bi-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="thumbnail-grid"></div>
                        </div>
                    </div>

                    <!-- Product Details -->
                    <div class="col-lg-5 aos-init aos-animate" data-aos="fade-left" data-aos-delay="200">
                        <div class="product-details">
                            <div class="product-badge-container">
                                <span class="badge-category">-</span>
                                <div class="rating-group d-none">
                                    <div class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                    </div>
                                    <span class="review-text">(127 reviews)</span>
                                </div>
                            </div>

                            <h1 class="product-name">-</h1>

                            <div class="pricing-section">
                                <div class="price-display">
                                    <span class="sale-price">S/0.00</span>
                                </div>
                            </div>

                            <div class="product-description">-</div>


                            <!-- Purchase Options -->
                            <div class="purchase-section">
                                <div class="quantity-control">
                                    <label class="control-label">Cantidad:</label>
                                    <div class="quantity-input-group">
                                        <div class="quantity-selector">
                                            <button class="quantity-btn decrease" type="button">
                                                <i class="bi bi-dash"></i>
                                            </button>
                                            <input type="number" id="txt-quantity-input" class="quantity-input" value="1" min="1" max="18">
                                            <button class="quantity-btn increase" type="button">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="action-buttons">
                                    <button class="btn primary-action cart_producto-btn">
                                        <i class="bi bi-bag-plus"></i>
                                        Agregar al carrito
                                    </button>
                                    <button class="btn secondary-action d-none">
                                        <i class="bi bi-lightning"></i>
                                        Comprar ahora
                                    </button>     
                                    <button class="btn icon-action wishlist_producto-btn" title="Agregar a la lista de deseos">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Benefits List -->
                            <div class="benefits-list">
                                <div class="benefit-item">
                                    <i class="bi bi-truck"></i>
                                    <span>Envío gratuito en pedidos superiores a S/100.00.</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="bi bi-headset"></i>
                                    <span>Soporte al cliente disponible las 24 horas, los 7 días de la semana.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>


                </div>
            </section>

        </div> 
        `;

        Componente.after_render(main_random, data, id_producto);

       
    },

    after_render: async (main_random, data, id_producto) => {

        /********* */
        DOM_ID = '#'+main_random;
        DOM = $(DOM_ID);
        /********** */

        Componente.id = id_producto;


         //EVENTOS
        DOM.on('click', '.wishlist_producto-btn', function(e) {
            e.stopImmediatePropagation();

            let accion = $(this).attr('data-accion');
            Componente.save_wishlist(accion);
            
        });

        DOM.on('click', '.cart_producto-btn', function(e) {
            e.stopImmediatePropagation();

            Componente.save_cart();
            
        });


        Componente.renderProductoDetalles();

    },

    /**** DATA */
    id: null,
    fl_auto_event: true,
    /************ */  


    renderProductoDetalles: async () => {

         let id_usuario = GLOBAL.usuario ? GLOBAL.usuario.id: 0;
         let oData = {id_producto: Componente.id, id_usuario : id_usuario};

         let data_resp = await $.fetchData('get', 'publico/productos/get_productos', oData);

         if (data_resp && data_resp.length > 0) {

            let row = data_resp[0];

            DOM.find('.badge-category').html(row.categoria);
            DOM.find('.product-name').html(row.nombre);
            DOM.find('.sale-price').html('S/ '+row.precio);
            DOM.find('.product-description').html(row.descripcion);

            let imagenes = row.imagenes;
            if(imagenes){

                let arrImagenes = imagenes.split(',');

                DOM.find("#main-product-image").attr("src", (BASE_FILES_ADMIN+'uploads/'+arrImagenes[0])).attr("data-zoom", (BASE_FILES_ADMIN+'uploads/'+arrImagenes[0]));

                let html_img = '';
                arrImagenes.forEach((row, index) => {
                    html_img += `<div class="thumbnail-wrapper thumbnail-item ${index === 0 ? 'active' : ''}" data-image="${BASE_FILES_ADMIN+'uploads/'+row}">
                                    <img src="${BASE_FILES_ADMIN+'uploads/'+row}" alt="View ${index + 1}" class="img-fluid">
                                </div>`;
                });

                DOM.find('.thumbnail-grid').html(html_img);
            }

            if(row.id_wishlist){
                DOM.find('.wishlist_producto-btn').html('<i class="bi bi-heart-fill" style="color: red"></i>');
                DOM.find('.wishlist_producto-btn').attr('data-accion', 'delete');
            }else{   
                DOM.find('.wishlist_producto-btn').html('<i class="bi bi-heart"></i>');
                DOM.find('.wishlist_producto-btn').attr('data-accion', 'save');
            }

            productDetailFeatures();
            ecommerceCartTools();


         }

         

    },

    save_wishlist: async function(accion) {

        let oData = { id_producto: Componente.id }
        let resp = await $.postData('orden/wish_list/'+accion, oData);

        if (resp && resp.tipo == 'success') {
            if(accion == 'save'){
                DOM.find('.wishlist_producto-btn').html('<i class="bi bi-heart-fill" style="color: red"></i>');
                DOM.find('.wishlist_producto-btn').attr('data-accion', 'delete');
            }else{
                DOM.find('.wishlist_producto-btn').html('<i class="bi bi-heart"></i>');
                DOM.find('.wishlist_producto-btn').attr('data-accion', 'save');
            }

            $.get_cantidades_Main();
        }
    },

    save_cart: async function() {

        let cantidad = DOM.find('#txt-quantity-input').val();

        let oData = { id_producto: Componente.id , cantidad: cantidad}
        let resp = await $.postData('orden/cart/save', oData);

        if (resp && resp.tipo == 'success') {
            HELPER.notificacion('Producto agregado al carrito', 'success');
            $.get_cantidades_Main();
        }
    },

} 

export default Componente;