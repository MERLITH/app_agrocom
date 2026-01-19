

 let DOM, DOM_ID ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">


            <div class="container">
                <div class="row">
                    <div class="col-lg-4 sidebar">
                        <div class="widgets-container">
                            <!-- Product Categories Widget -->
                            <div class="product-categories-widget widget-item">
                                <h3 class="widget-title">Categorías</h3>
                                <ul class="category-tree list-unstyled mb-0">
                                    <li class="category-item">
                                        <div class="d-flex justify-content-between align-items-center category-header">
                                            <a href="javascript:" class="category-link" data-value="0">Todos</a>
                                        </div>
                                    </li>
                                    <li class="category-item">
                                        <div class="d-flex justify-content-between align-items-center category-header">
                                            <a href="javascript:" class="category-link" data-value="1">Veterinaria</a>
                                        </div>
                                    </li>
                                    <li class="category-item">
                                        <div class="d-flex justify-content-between align-items-center category-header">
                                            <a href="javascript:" class="category-link" data-value="2">Agrícola</a>
                                        </div>
                                    </li>
                                </ul>
                            </div><!--/Brand Filter Widget -->
                        </div>
                    </div>
                    <div class="col-lg-8">

                        <!-- Category Header Section -->
                        <section id="category-header" class="category-header section">
                            <div class="container aos-init aos-animate" data-aos="fade-up">
                                <!-- Filter and Sort Options -->
                                <div class="filter-container mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="filter-item search-form">
                                                <label for="productSearch" class="form-label">Buscar productos</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="productSearch" name="productSearch" placeholder="Buscar productos..." aria-label="Buscar productos">
                                                    <button class="btn search-btn" type="button" name="btn_buscarproducto">
                                                        <i class="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="col-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                                            <div class="active-filters">   
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section><!-- /Category Header Section -->

                        <!-- Category Product List Section -->
                        <section id="category-product-list" class="category-product-list section pt-0">

                            <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

                                <div class="row g-4" id="div_listado_productos">Cargando productos...</div>

                            </div>

                        </section><!-- /Category Product List Section -->

                        <!-- Category Pagination Section -->
                        <section id="category-pagination" class="category-pagination section d-none">

                            <div class="container">
                            <nav class="d-flex justify-content-center" aria-label="Page navigation">
                                <ul>
                                <li>
                                    <a href="#" aria-label="Previous page">
                                    <i class="bi bi-arrow-left"></i>
                                    <span class="d-none d-sm-inline">Previous</span>
                                    </a>
                                </li>

                                <li><a href="#" class="active">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li class="ellipsis">...</li>
                                <li><a href="#">8</a></li>
                                <li><a href="#">9</a></li>
                                <li><a href="#">10</a></li>

                                <li>
                                    <a href="#" aria-label="Next page">
                                    <span class="d-none d-sm-inline">Next</span>
                                    <i class="bi bi-arrow-right"></i>
                                    </a>
                                </li>
                                </ul>
                            </nav>
                            </div>

                        </section><!-- /Category Pagination Section -->

                    </div>

                </div>
            </div>

          


        </div>    
         `;
 
         await Componente.after_render();       
         
    },
 
     after_render: async () => {

         DOM_ID = '#main';
         DOM = $(DOM_ID);

         DOM.on('keyup', 'input[name="productSearch"]', function (e) {
             e.stopImmediatePropagation();

             let valor = this.value;
             Componente.listado_productos(null, null, valor);
         });


         DOM.find('button[name="btn_buscarproducto"]').click(function (e) {
             e.stopImmediatePropagation();

             let valor = DOM.find('input[name="productSearch"]').val();
             Componente.listado_productos(null, null, valor);
         });

         DOM.find('.category-link').click(function (e) {
             e.stopImmediatePropagation();

             let valor = $(this).data('value');
             Componente.listado_productos(null, valor, '');
         });


         

         Componente.listado_productos();

         HELPER.load_component();

     },


    listado_productos: async (id_producto = null, id_categoria = null, texto_buscar = '') => {

         let html = '';
         let id_contenedor = '#div_listado_productos';
         let id_usuario = GLOBAL.usuario ? GLOBAL.usuario.id: 0;
         let oData = {id_usuario : id_usuario};

         if(id_categoria){
            oData = {id_usuario : id_usuario, id_categoria : id_categoria};
         }

         if(texto_buscar){
            oData = {id_usuario : id_usuario, texto_buscar : texto_buscar};
         }

         if(id_producto){         
            oData = {id_producto: id_producto, id_usuario : id_usuario};
            id_contenedor = `.div-producto[data-id="${id_producto}"]`;
         }
         //var data_resp = await $.getData(url);

         let data_resp = await $.fetchData('get', 'publico/productos/get_productos', oData);

         if (data_resp) {


              data_resp.forEach(row => {

                let imagenes = row.imagenes;
                let html_img = '';

                if(imagenes){

                    let arrImagenes = imagenes.split(',');

                    if(arrImagenes.length == 1){
                        html_img = `<img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[0]+`" class="main-image img-fluid" alt="Product">
                                   <img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[0]+`" class="hover-image img-fluid" alt="Product Variant">`;
                    }else if(arrImagenes.length > 1){
                        html_img = `<img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[0]+`" class="main-image img-fluid" alt="Product">
                                   <img src="`+BASE_FILES_ADMIN+`uploads/`+arrImagenes[1]+`" class="hover-image img-fluid" alt="Product Variant">`;
                    }

                }

                let html_wishlist = `<button class="action-btn wishlist_producto-btn wishlist-btn-insert" data-accion="save">
                                        <i class="bi bi-heart"></i>
                                    </button>`;

                if(row.id_wishlist){
                    html_wishlist = `<button class="action-btn wishlist_producto-btn wishlist-btn-delete" data-accion="delete">
                                        <i class="bi bi-heart-fill" style="color: red"></i>
                                    </button>`;
                }

                if(id_producto){         
                    html += ``;
                }else{
                    html += `<div class="col-6 col-xl-4 div-producto" data-id="${row.id}">`;
                }

                html += `<div class="product-card aos-init aos-animate" data-aos="zoom-in">
                                <div class="product-image">
                                    ${html_img}
                                    <div class="product-overlay">
                                        <div class="product-actions">
                                            <div class="div_wishlist">
                                                ${html_wishlist}
                                            </div>
                                            <button type="button" class="action-btn ver_producto-btn" data-bs-toggle="tooltip" aria-label="Quick View" data-bs-original-title="Quick View">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <button type="button" class="action-btn cart_producto-btn" data-bs-toggle="tooltip" aria-label="Add to Cart" data-bs-original-title="Add to Cart">
                                                <i class="bi bi-cart-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-details">
                                    <div class="product-category">${row.categoria}</div>
                                    <h4 class="product-title"><a href="#/producto/${row.id}">${row.nombre}</a></h4>
                                    <div class="product-meta">
                                        <div class="product-price">S/${row.precio}</div>
                                        <div class="product-rating d-none">
                                            <i class="bi bi-star-fill"></i>
                                            4.8 <span>(42)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

                if(id_producto){         
                    html += ``;
                }else{
                    html += `</div>`;
                }

              });


         } else {
             html = '<center>No se encontraron productos/center>'
         }

        

         if(id_producto){
            DOM.find(id_contenedor).html(html);
         }else{
    
            DOM.find(id_contenedor).html(html);
         }

         //EVENTOS
         DOM.on('click', '.wishlist_producto-btn', function(e) {
            e.stopImmediatePropagation();

            let divProducto = $(this).closest('.div-producto');
            let id_producto = divProducto.data('id');
            let accion = $(this).data('accion');
            Componente.save_wishlist(accion, id_producto);
            
        });

        DOM.on('click', '.ver_producto-btn', function(e) {
            e.stopImmediatePropagation();

            let divProducto = $(this).closest('.div-producto');
            let id_producto = divProducto.data('id');

            location.href = "#/producto/"+id_producto;
            
        });

        DOM.on('click', '.cart_producto-btn', function(e) {
            e.stopImmediatePropagation();

            let divProducto = $(this).closest('.div-producto');
            let id_producto = divProducto.data('id');

            Componente.save_cart(id_producto);
            
        });
     },

     save_wishlist: async function(accion,id_producto) {

        // let formData = new FormData();
        // formData.append('id_producto', id_producto);
        let oData = { id_producto: id_producto }
        let resp = await $.postData('orden/wish_list/'+accion, oData);

        if (resp && resp.tipo == 'success') {
            Componente.listado_productos(id_producto);
            $.get_cantidades_Main();
        }
     },

     save_cart: async function(id_producto) {

        let oData = { id_producto: id_producto , cantidad: 1}
        let resp = await $.postData('orden/cart/save', oData);

        if (resp && resp.tipo == 'success') {
            HELPER.notificacion('Producto agregado al carrito', 'success');
            $.get_cantidades_Main();
        }
     },

 
 } 
 
 export default Componente;