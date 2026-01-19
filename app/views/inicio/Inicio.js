

 let DOM, DOM_ID ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

          <!-- Hero Section -->
          <section id="hero" class="hero section">

            <div class="hero-container">
              <div class="hero-content">
                <div class="content-wrapper" data-aos="fade-up" data-aos-delay="100">
                  <h1 class="hero-title">Descubre productos para el campo y tus animales</h1>
                  <p class="hero-description">Encuentra insumos agrícolas y veterinarios de calidad, seleccionados para mejorar la productividad de tu finca. Productos confiables, precios justos y envío rápido a todo el país.</p>
                  <div class="hero-actions" data-aos="fade-up" data-aos-delay="200">
                    <a href="#/tienda" class="btn-primary">Comprar ahora</a>
                    <!-- <a href="#categories" class="btn-secondary">Explorar categorías</a> -->
                  </div>
                  <div class="features-list" data-aos="fade-up" data-aos-delay="300">
                    <div class="feature-item">
                      <i class="bi bi-truck"></i>
                      <span>Envío gratis</span>
                    </div>
                    <div class="feature-item">
                      <i class="bi bi-award"></i>
                      <span>Garantía de calidad</span>
                    </div>
                    <!-- <div class="feature-item">
                      <i class="bi bi-headset"></i>
                      <span>Soporte 24/7</span>
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="hero-visuals">
                <div class="product-showcase" data-aos="fade-left" data-aos-delay="200">

                  <div class="product-card featured">
                    <img src="test/assets/img/product/product-2.webp" alt="Featured Product" class="img-fluid">
                    <div class="product-badge">Más vendido</div>
                    <div class="product-info">
                      <h4>Premium Wireless Headphones</h4>
                      <div class="price">
                        <span class="sale-price">$299</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="floating-elements">
                  <div class="floating-icon cart" data-aos="fade-up" data-aos-delay="600">
                    <i class="bi bi-cart3"></i>
                    <span class="notification-dot">3</span>
                  </div>
                  <div class="floating-icon wishlist" data-aos="fade-up" data-aos-delay="700">
                    <i class="bi bi-heart"></i>
                  </div>
                  <div class="floating-icon search" data-aos="fade-up" data-aos-delay="800">
                    <i class="bi bi-search"></i>
                  </div>
                </div>
              </div>
            </div>

          </section><!-- /Hero Section -->

          <!-- Best Sellers Section -->
          <section id="best-sellers" class="best-sellers section">

            <!-- Section Title -->
            <div class="container section-title" data-aos="fade-up">
              <h2>Los más vendidos</h2>
              <p>Nuestros productos agropecuarios preferidos por ganaderos y agricultores en todo el país.</p>
            </div><!-- End Section Title -->

            <div class="container" data-aos="fade-up" data-aos-delay="100">

              <div class="row g-5 div_productos_mas_vendidos">

              </div>

            </div>

          </section><!-- /Best Sellers Section -->

          <!-- Cards Section -->
          <section id="cards" class="cards section">

            <div class="container" data-aos="fade-up" data-aos-delay="100">

              <div class="row gy-4">

                <div class="col-lg-6 col-md-6 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="200">
                  <div class="product-category">
                    <h3 class="category-title">
                      <i class="bi bi-fire"></i> Lo más nuevo
                    </h3>
                    <div class="product-list div_productos_tendencia">
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="300">
                  <div class="product-category">
                    <h3 class="category-title">
                      <i class="bi bi-star"></i> Artículos destacados
                    </h3>
                    <div class="product-list div_productos_destacados">
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </section><!-- /Cards Section -->


          <section id="contact-2" class="contact-2 section">
            <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

              <!-- Section Title -->
              <div class="container section-title" data-aos="fade-up">
                <h2>Características de la empresa</h2>
                <p>Presentamos las características más importantes de la empresa</p>
              </div><!-- End Section Title -->

              <!-- Contact Info Boxes -->
              <div class="row gy-4 mb-5">
                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-cart-check"></i>
                    </div>
                    <div class="info-content">
                      <h4>Envío gratis</h4>
                      <p>Disfruta de envío gratis en todas tus compras, sin costo adicional.</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-bag-heart"></i>
                    </div>
                    <div class="info-content">
                      <h4>Compra rápida</h4>
                      <p>Simplifica tu experiencia de compra y recibe lo que necesitas en un abrir y cerrar de ojos.</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-shop"></i>
                    </div>
                    <div class="info-content">
                      <h4>Tienda de distinción</h4>
                      <p>Compra única con productos excepcionales y servicio de primera, para tu satisfacción.</p>
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

     Componente.render_top_mas_vendido();
     Componente.render_los_mas_vendidos();
     Componente.render_tendencias();
     Componente.render_destacados();


     HELPER.load_component();
   },


   render_top_mas_vendido: async function () {

        let $div_contenedor = DOM.find(".product-showcase");
        $div_contenedor.html('');

        let row = await $.fetchData('get', 'publico/inicio_web/get_top_mas_vendido', {});
        if ($.validarResp(row).ok) {

            let primeraImg = row.imagenes.split(",")[0].trim();
            
            let html =`
            <div class="product-card featured">
                <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${row.nombre}" alt="${row.nombre}" class="img-fluid">
                <div class="product-badge">Más vendido</div>
                <div class="product-info">
                  <h4>${row.nombre}</h4>
                  <div class="price">
                    <span class="sale-price">S/${row.precio}</span>
                  </div>
                </div>
              </div>
            `;

            $div_contenedor.append(html);

        }
        else{
            $div_contenedor.append('');
        }

   },

   render_los_mas_vendidos: async () => {

      let $div_contenedor = DOM.find(".div_productos_mas_vendidos");
      $div_contenedor.html('');

      let data_resp = await $.fetchData('get', 'publico/inicio_web/get_top_los_mas_vendidos', {});
      if ($.validarResp(data_resp).ok) {


        data_resp.forEach((row,index) => {

          let primeraImg = row.imagenes.split(",")[0].trim();
          
          let html =`
          <!-- Product ${index} -->
          <div class="col-lg-3 col-md-6 div-producto" data-id="${row.id}">
            <div class="product-item">
              <div class="product-image">
                <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${row.nombre}" alt="${row.nombre}" class="img-fluid" loading="lazy">
                <div class="product-actions">
                  <button class="action-btn quickview-btn ver_producto-btn">
                    <i class="bi bi-zoom-in"></i>
                  </button>
                </div>
                <button class="cart-btn cart_producto-btn">Agregar al carrito</button>
              </div>
              <div class="product-info">
                <div class="product-category">${row.tipo_articulo}</div>
                <h4 class="product-name"><a href="product-details.html">${row.nombre}</a></h4>
                <div class="product-price">S/${row.precio}</div>
              </div>
            </div>
          </div>
          <!-- End Product ${index} -->
          `;

          $div_contenedor.append(html);

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

      }
      else{
        $div_contenedor.append('');
      }

   },

   render_tendencias: async () => {

      let $div_contenedor = DOM.find(".div_productos_tendencia");
      $div_contenedor.html('');

      let data_resp = await $.fetchData('get', 'publico/inicio_web/get_top_tendencias', {});
      if ($.validarResp(data_resp).ok) {

        data_resp.forEach((row,index) => {

          let primeraImg = row.imagenes.split(",")[0].trim();
          
          let html =`
          <!-- Product ${index} -->
          <div class="product-card">
            <div class="product-image">
              <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${row.nombre}" class="img-fluid">
            </div>
            <div class="product-info">
              <h4 class="product-name">${row.nombre}</h4>
              <div class="product-price">
                <span class="current-price">S/${row.precio}</span>
              </div>
            </div>
          </div>
          <!-- End Product ${index} -->
          `;

          $div_contenedor.append(html);

        });

      }
      else{
        $div_contenedor.append('');
      }

   },

   render_destacados: async () => {

      let $div_contenedor = DOM.find(".div_productos_destacados");
      $div_contenedor.html('');

      let data_resp = await $.fetchData('get', 'publico/inicio_web/get_top_destacados', {});
      if ($.validarResp(data_resp).ok) {

        data_resp.forEach((row,index) => {

          let primeraImg = row.imagenes.split(",")[0].trim();
          
          let html =`
          <!-- Product ${index} -->
          <div class="product-card">
            <div class="product-image">
              <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${row.nombre}" class="img-fluid">
            </div>
            <div class="product-info">
              <h4 class="product-name">${row.nombre}</h4>
              <div class="product-price">
                <span class="current-price">S/${row.precio}</span>
              </div>
            </div>
          </div>
          <!-- End Product ${index} -->
          `;

          $div_contenedor.append(html);

        });

      }
      else{
        $div_contenedor.append('');
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