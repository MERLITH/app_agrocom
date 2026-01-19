

 let DOM, DOM_ID,__idModal ;

 let Componente = {
     render: async (d, data, id_caso) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

            <section id="account" class="account section">
            
                <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            
                    <!-- Mobile Menu Toggle -->
                    <div class="mobile-menu d-lg-none mb-4">
                        <button class="mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#profileMenu">
                            <i class="bi bi-grid"></i>
                            <span>Menú</span>
                        </button>
                    </div>
            
                    <div class="row g-4">
                        <!-- Profile Menu -->
                        <div class="col-lg-3">
                            <div class="profile-menu collapse d-lg-block" id="profileMenu">
                                <!-- User Info -->
                                <div class="user-info aos-init aos-animate" data-aos="fade-right">
                                    <div class="user-avatar">
                                        <img class="img-profile" alt="Profile" loading="lazy">
                                        <span class="status-badge"><i class="bi bi-shield-check"></i></span>
                                    </div>
                                    <h4 class="nombre_usu">Sin usuario</h4>
                                    <div class="user-status">
                                        <i class="bi bi-check2-circle text-success"></i>
                                        <span>Activo</span>
                                    </div>
                                </div>
            
                                <!-- Navigation Menu -->
                                <nav class="menu-nav">
                                    <ul class="nav flex-column" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-bs-toggle="tab" href="#orders" aria-selected="true" role="tab" id="a_li_1" data-value="1">
                                                <i class="bi bi-box-seam"></i>
                                                <span>Mis órdenes</span>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#wishlist" aria-selected="false" tabindex="-1" role="tab" id="a_li_2" data-value="2">
                                                <i class="bi bi-heart"></i>
                                                <span>Lista de deseos</span>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#addresses" aria-selected="false" tabindex="-1" role="tab" id="a_li_3" data-value="3" id="tab_li_3">
                                                <i class="bi bi-geo-alt"></i>
                                                <span>Direcciones</span>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#settings" aria-selected="false" tabindex="-1" role="tab" id="a_li_4" data-value="4">
                                                <i class="bi bi-gear"></i>
                                                <span>Configurar mi cuenta</span>
                                            </a>
                                        </li>
                                    </ul>
            
                                    <div class="menu-footer">
                                        <a href="#" class="help-link d-none">
                                            <i class="bi bi-question-circle"></i>
                                            <span>Centro de ayuda</span>
                                        </a>
                                        <a href="javascript:" class="logout-link cerrar_sesion">
                                            <i class="bi bi-box-arrow-right"></i>
                                            <span>Cerrar sesión</span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
            
                        <!-- Content Area -->
                        <div class="col-lg-9">
                            <div class="content-area">
                                <div class="tab-content">
                                    <!-- Orders Tab -->
                                    <div class="tab-pane fade show active" id="orders" role="tabpanel" name="tab-pane_1">
                                        <div class="section-header aos-init aos-animate" data-aos="fade-up">
                                            <h2>Mis órdenes</h2>
                                            <div class="header-actions d-none">
                                                <div class="search-box">
                                                    <i class="bi bi-search"></i>
                                                    <input type="text" placeholder="Search orders...">
                                                </div>
                                                <div class="dropdown">
                                                    <button class="filter-btn" data-bs-toggle="dropdown">
                                                        <i class="bi bi-funnel"></i>
                                                        <span>Filter</span>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" href="#">All Orders</a></li>
                                                        <li><a class="dropdown-item" href="#">Processing</a></li>
                                                        <li><a class="dropdown-item" href="#">Shipped</a></li>
                                                        <li><a class="dropdown-item" href="#">Delivered</a></li>
                                                        <li><a class="dropdown-item" href="#">Cancelled</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="orders-grid">
                                        </div>
            
                                        <!-- Pagination -->
                                        <div class="pagination-wrapper aos-init d-none" data-aos="fade-up">
                                            <button type="button" class="btn-prev" disabled="">
                                                <i class="bi bi-chevron-left"></i>
                                            </button>
                                            <div class="page-numbers">
                                                <button type="button" class="active">1</button>
                                                <button type="button">2</button>
                                                <button type="button">3</button>
                                                <span>...</span>
                                                <button type="button">12</button>
                                            </div>
                                            <button type="button" class="btn-next">
                                                <i class="bi bi-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
            
                                    <!-- Wishlist Tab -->
                                    <div class="tab-pane fade" id="wishlist" role="tabpanel" name="tab-pane_2">
                                        <div class="section-header aos-init aos-animate" data-aos="fade-up">
                                            <h2>Mi lista de deseos</h2>
                                            <div class="header-actions d-none">
                                                <button type="button" class="btn-add-all">Add All to Cart</button>
                                            </div>
                                        </div>
            
                                        <div class="wishlist-grid">
                                        </div>
                                    </div>
 
                                    <!-- Addresses Tab -->
                                    <div class="tab-pane fade" id="addresses" role="tabpanel" name="tab-pane_3">
                                        <div class="section-header aos-init aos-animate" data-aos="fade-up">
                                            <h2>Mis direcciones</h2>
                                            <div class="header-actions">
                                                <button type="button" class="btn btn-primary btnAgregarDireccion">
                                                    <i class="bi bi-plus-lg"></i>
                                                    Agregar nueva dirección
                                                </button>
                                            </div>
                                        </div>
            
                                        <div class="addresses-grid">
                                            
                                        </div>
                                    </div>
            
                                    <!-- Settings Tab -->
                                    <div class="tab-pane fade" id="settings" role="tabpanel" name="tab-pane_4">
                                        <div class="section-header aos-init aos-animate" data-aos="fade-up">
                                            <h2>Configuraciones de mi cuenta</h2>
                                        </div>
            
                                        <div class="settings-content">
                                            <!-- Personal Information -->
                                            <div class="settings-section aos-init aos-animate" data-aos="fade-up">
                                                <h3>Información personal</h3>
                                                <form class="php-email-form settings-form" id="frm_cambios_personales" name="frm_cambios_personales">
                                                    <div class="row g-3">
                                                        <div class="col-md-6 col-vali">
                                                            <label for="nombre" class="form-label">Nombres</label>
                                                            <input type="text" class="form-control" id="nombre" name="nombre" value="Sarah">
                                                        </div>
                                                        <div class="col-md-6 col-vali">
                                                            <label for="apellido" class="form-label">Apellidos</label>
                                                            <input type="text" class="form-control" id="apellido" name="apellido" value="Anderson">
                                                        </div>
                                                        <div class="col-md-6 col-vali">
                                                            <label for="email" class="form-label">Email</label>
                                                            <input type="email" class="form-control" id="email" name="email"
                                                                value="sarah@example.com">
                                                        </div>
                                                        <div class="col-md-6 col-vali">
                                                            <label for="telefono" class="form-label">Celular</label>
                                                            <input type="tel" class="form-control" id="telefono" name="telefono"
                                                                value="+51 999 999 999">
                                                        </div>
                                                        <div class="col-md-12" align="center">
                                                            <div>
                                                                <img name="imagen" style="top: 0; left: 0; width: 50%; height: 50%;" class="rounded-circle cursor-pointer" alt="Descripción de la imagen">
                                                            </div>
                                                            <div class="mt-2">
                                                                <label class="btn btn-label-primary btn-sm" style="width:100%;">
                                                                    <i class="mdi mdi-tab-search me-1"></i>Seleccionar Imagen de Perfil
                                                                    <input type="file" class="rounded-pill" name="imagen" style="display:none;">
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
            
                                                    <div class="form-buttons">
                                                        <button type="submit" class="btn-save">Guardar cambios</button>
                                                    </div>
            
                                                    <div class="loading">Loading</div>
                                                    <div class="error-message"></div>
                                                    <div class="sent-message">Your changes have been saved successfully!</div>
                                                </form>
                                            </div>

            
                                            <!-- Security Settings -->
                                            <div class="settings-section aos-init aos-animate" data-aos="fade-up"
                                                data-aos-delay="200">
                                                <h3>Seguridad</h3>
                                                <form class="php-email-form settings-form" id="frm_cambiar_password" name="frm_cambiar_password">
                                                    <div class="row g-3">
                                                        <div class="col-md-12 col-vali">
                                                            <label for="currentPassword" class="form-label">Contraseña actual</label>
                                                            <input type="password" class="form-control" id="password_actual" name="password_actual">
                                                        </div>
                                                        <div class="col-md-6 col-vali">
                                                            <label for="newPassword" class="form-label">Nueva contraseña</label>
                                                            <input type="password" class="form-control" id="password_nuevo" name="password_nuevo">
                                                        </div>
                                                        <div class="col-md-6 col-vali">
                                                            <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
                                                            <input type="password" class="form-control" id="password_confirmar" name="password_confirmar">
                                                        </div>
                                                    </div>
            
                                                    <div class="form-buttons">
                                                        <button type="submit" class="btn-save">Actualizar contraseña</button>
                                                    </div>
            
                                                    <div class="loading">Loading</div>
                                                    <div class="error-message"></div>
                                                    <div class="sent-message">Your password has been updated successfully!</div>
                                                </form>
                                            </div>
            
                                            <!-- Delete Account -->
                                            <div class="settings-section danger-zone aos-init aos-animate d-none" data-aos="fade-up"
                                                data-aos-delay="300">
                                                <h3>Eliminar cuenta</h3>
                                                <div class="danger-zone-content">
                                                    <p>Una vez que elimines tu cuenta, no hay vuelta atrás. Asegúrate bien.</p>
                                                    <button type="button" class="btn-danger">Eliminar cuenta</button>
                                                </div>
                                            </div>
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
 
         await Componente.after_render(id_caso);       
         
    },
 
   after_render: async (id_caso) => {

     DOM_ID = '#main';
     DOM = $(DOM_ID);

     Componente.id_caso = (id_caso?id_caso: 1);

     DOM.on("click", ".cerrar_sesion", function (e) {
        e.stopImmediatePropagation();
        Componente.cerrar_sesion();
     });

     DOM.on("click", ".btnAgregarDireccion", function (e) {
        e.stopImmediatePropagation();
        Componente.agregar_direccion();
     });

     /* PREVIEW IMAGEN */
    DOM.find('input[name="imagen"]').change(function(e) {
        e.stopImmediatePropagation();
        HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
    });

    DOM.on('click','.nav-link', function(e) {
        e.stopImmediatePropagation();
        let id_caso = $(this).data('value');
        Componente.id_caso = id_caso;
        //console.log("Pestaña seleccionada:", id_caso);  
        
        //Componente.cargar_by_caso();
        window.location.hash = `#/micuenta?tab=${id_caso}`;
        //history.replaceState(null, '', `#/micuenta?tab=${id_caso}`);

    });


    
    Componente.mostrar_mis_datos();
    Componente.cargar_by_caso();
    Componente.validar_cambios_personales();
    Componente.validar_cambiar_password();

     HELPER.load_component();
   },

    id_caso: null,
    id_persona_direccion: null,
    imagen_anterior: null,
    id_persona: null,

    cargar_by_caso: async function () {

        //console.log(this.id_caso)

        switch (parseInt(this.id_caso)) {
            case 1:
                Componente.tab_mostrar_mis_ordenes();
                break;
            case 2:
                Componente.tab_mostrar_mi_listadeseos();
                break;
            case 3:
                Componente.tab_mostrar_mis_direcciones();
                break;
            case 4:
                Componente.tab_mostrar_mis_datos_personales();
                break;
            default:
                Componente.tab_mostrar_mis_ordenes();
                break;
        }


        await Componente.activar_pestanas();
        
                
    },

    activar_pestanas: async function () {

        DOM.find('.nav-link').removeClass('active');
        DOM.find('.tab-pane').removeClass('show');
        DOM.find('.tab-pane').removeClass('active');

        DOM.find('#a_li_'+this.id_caso).addClass('active');
        DOM.find('div[name="tab-pane_'+this.id_caso+'"]').addClass('show');
        DOM.find('div[name="tab-pane_'+this.id_caso+'"]').addClass('active');

    },

    mostrar_mis_datos: async function () {

        if (GLOBAL.usuario) {

            let data = GLOBAL.usuario;

            DOM.find(".nombre_usu").text(data.nombre);
            DOM.find(".img-profile").attr("src", (BASE_FILES + 'images/' + data.imagen));

            this.id_persona = data.id_persona;
            this.imagen_anterior = data.imagen;

        }

    },

    tab_mostrar_mis_ordenes: async function () {

        let $div_contenedor = DOM.find(".orders-grid");
        $div_contenedor.html('');

        let row = await $.fetchData('get', 'general/micuenta/get_mis_ordenes', {});
        if ($.validarResp(row).ok) {

            row.forEach((item,index) => {

                let arrayDetalle = item.detalle;
                let html_imagenes = "", html_articulos = "";

                arrayDetalle.forEach(x => {
                    //imágenes
                    let primeraImg = x.imagenes.split(",")[0].trim();
                    html_imagenes += `
                        <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" 
                            alt="${x.producto}" 
                            loading="lazy">
                    `;

                    html_articulos+=`<div class="item">
                                        <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${x.producto}" loading="lazy">
                                        <div class="item-info">
                                            <h6>${x.producto}</h6>
                                            <div class="item-meta">
                                                <span class="qty">Cantidad: ${x.cantidad}</span>
                                            </div>
                                        </div>
                                        <div class="item-price">S/${parseFloat(x.subtotal).toFixed(2)}</div>
                                    </div>`;


                });

                let html = `<!-- Order Card ${index} -->
                            <div class="order-card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" id="div_order_card_${index}">
                                <div class="order-header">
                                    <div class="order-id">
                                        <span class="label">Orden:</span>
                                        <span class="value">#${item.ser_num}</span>
                                    </div>
                                    <div class="order-date">${item.fecha_registro_f}</div>
                                </div>
                                <div class="order-content">
                                    <div class="product-grid">
                                        ${html_imagenes}
                                    </div>
                                    <div class="order-info">
                                        <div class="info-row">
                                            <span>Estado</span>
                                            <span class="status ${item.cColor_e_2}">${item.cEstado_e}</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Artículos</span>
                                            <span>${arrayDetalle.length} items</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Total</span>
                                            <span class="price">S/${item.monto_total}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-footer">
                                    <button type="button" class="btn-track" data-bs-toggle="collapse"
                                        data-bs-target="#tracking_${item.id}" aria-expanded="false">Seguimiento del Pedido</button>
                                    <button type="button" class="btn-details" data-bs-toggle="collapse"
                                        data-bs-target="#details_${item.id}" aria-expanded="false">Ver Detalles</button>
                                </div>

                                <!-- Order Tracking -->
                                <div class="collapse tracking-info" id="tracking_${item.id}">
                                    <div class="tracking-timeline">
                                        <div class="timeline-item completed">
                                            <div class="timeline-icon">
                                                <i class="bi bi-check-circle-fill"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h5>Order Confirmed</h5>
                                                <p>Your order has been received and confirmed</p>
                                                <span class="timeline-date">Feb 20, 2025 - 10:30 AM</span>
                                            </div>
                                        </div>

                                        <div class="timeline-item completed">
                                            <div class="timeline-icon">
                                                <i class="bi bi-check-circle-fill"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h5>Processing</h5>
                                                <p>Your order is being prepared for shipment</p>
                                                <span class="timeline-date">Feb 20, 2025 - 2:45 PM</span>
                                            </div>
                                        </div>

                                        <div class="timeline-item active">
                                            <div class="timeline-icon">
                                                <i class="bi bi-box-seam"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h5>Packaging</h5>
                                                <p>Your items are being packaged for shipping</p>
                                                <span class="timeline-date">Feb 20, 2025 - 4:15 PM</span>
                                            </div>
                                        </div>

                                        <div class="timeline-item">
                                            <div class="timeline-icon">
                                                <i class="bi bi-truck"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h5>In Transit</h5>
                                                <p>Expected to ship within 24 hours</p>
                                            </div>
                                        </div>

                                        <div class="timeline-item">
                                            <div class="timeline-icon">
                                                <i class="bi bi-house-door"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h5>Delivery</h5>
                                                <p>Estimated delivery: Feb 22, 2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Order Details -->
                                <div class="collapse order-details" id="details_${item.id}">
                                    <div class="details-content">
                                        <div class="detail-section">
                                            <h5>Información del pedido</h5>
                                            <div class="info-grid">
                                                <div class="info-item">
                                                    <span class="label">Método de envío</span>
                                                    <span class="value">Shalom (2-5 días)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="detail-section">
                                            <h5>Artículos (${arrayDetalle.length})</h5>
                                            <div class="order-items">
                                                ${html_articulos}
                                            </div>
                                        </div>

                                        <div class="detail-section">
                                            <h5>Detalle de los precios</h5>
                                            <div class="price-breakdown">
                                                <div class="price-row">
                                                    <span>Subtotal</span>
                                                    <span>S/${item.monto_total}</span>
                                                </div>
                                                <div class="price-row">
                                                    <span>Envío</span>
                                                    <span>S/0.00</span>
                                                </div>
                                                <div class="price-row total">
                                                    <span>Total</span>
                                                    <span>S/${item.monto_total}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="detail-section">
                                            <h5>Dirección de envío</h5>
                                            <div class="address-info">
                                                <p>
                                                    ${item.direccion.nombre}
                                                    <br>${item.direccion.direccion}
                                                    <br>${item.direccion.apartamento}
                                                    <br>${item.direccion.ubigeo}
                                                </p>
                                                <p class="contact">${item.direccion.telefono_contacto}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                $div_contenedor.append(html);

                $('#div_order_card_'+index).data('value', item.id);

                let safeValue = encodeURIComponent(JSON.stringify(item)); 
                $('#div_order_card_' + index).data('json', safeValue);

                Componente.renderTracking(item.id, item.history);
            });

            $('.btn-track').on('click', function () {

                let $order_card = $(this).closest('.order-card');
                let id_pedido = $order_card.data('value');

                let data_json = JSON.parse(decodeURIComponent($order_card.data('json')));

                $('#details_'+id_pedido).collapse('hide');
            });

            $('.btn-details').on('click', function () {
                let $order_card = $(this).closest('.order-card');
                let id_pedido = $order_card.data('value');

                let data_json = JSON.parse(decodeURIComponent($order_card.data('json')));
                //console.log(JSON.parse(decodeURIComponent(data_json)));

                $('#tracking_'+id_pedido).collapse('hide');
            });

            
        }else{
            $div_contenedor.append('<center>No se encontraron resultados</center>')
        }

    },

    renderTracking: function (id_orden, historial) {

        const TIMELINE_STEPS = [
            {
                key: "Registrado",
                title: "Orden Registrada",
                desc: "",
                icon: "bi bi-floppy2-fill"
            },
            {
                key: "Pedido confirmado",
                title: "Pedido confirmado",
                desc: "",
                icon: "bi bi-bag-check"
            },
            {
                key: "Procesando",
                title: "Procesando",
                desc: "",
                icon: "bi bi-hourglass"
            },
            {
                key: "Empaquetando",
                title: "Empaquetando",
                desc: "",
                icon: "bi-box-seam"
            },
            {
                key: "En tránsito",
                title: "En tránsito",
                desc: "",
                icon: "bi-truck"
            },
            {
                key: "En delivery",
                title: "En delivery",
                desc: "",
                icon: "bi bi-truck-flatbed"
            },
            {
                key: "Entregado",
                title: "Entregado",
                desc: "",
                icon: "bi-house-door"
            }
        ];

        // Ordenar por fecha si no viene ordenado
        historial.sort((a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro));

        // Se toma la cantidad de estados completados
        const completedCount = historial.length;

        let html = '';

        TIMELINE_STEPS.forEach((step, index) => {

            let estado = "";
            let fecha = "";
            let comentario = "";
            let detalle = step.desc;

            // Verificar si este step existe en el historial
            const match = historial.find(h => h.historial === step.key);

            if (match) {
                fecha = match.fecha_registro_f;
                detalle = match.detalle;
            }

            // Estados dinámicos
            if (index < completedCount - 1) {
                estado = "completed"; // todos los anteriores
                step.icon = 'bi-check-circle-fill'
            } else if (index === completedCount - 1) {
                estado = "active"; // el último estado registrado
            }

            html += `
                <div class="timeline-item ${estado}">
                    <div class="timeline-icon">
                        <i class="bi ${step.icon}"></i>
                    </div>
                    <div class="timeline-content">
                        <h5>${step.title}</h5>
                        <p>${detalle}</p>
                        ${fecha ? `<span class="timeline-date">${fecha}</span>` : ''}
                    </div>
                </div>
            `;
        });


        //<div class="collapse tracking-info" id="tracking_${item.id}"><div class="tracking-timeline">
        $('#tracking_'+id_orden+' .tracking-timeline').html(html);

        //return html;


    },

    select_ubigeo: async () =>
    {
        var urlB = BASE_API + "recursos/data_static/ubigeo";
        $.select2_buscar('sltUbigeo', urlB, "Departamento - Provincia - Distrito", 3);    
    },

    tab_mostrar_mi_listadeseos: async function () {

        let $div_contenedor = DOM.find(".wishlist-grid");
        $div_contenedor.html('');

        let row = await $.fetchData('get', 'general/micuenta/get_mi_lista_deseos', {});
        if ($.validarResp(row).ok) {

            row.forEach((x,index) => {
                //imágenes
                let primeraImg = x.imagenes.split(",")[0].trim();
                
                let html =`
                <!-- Wishlist Item ${index} -->
                <div class="wishlist-card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" id="div_wishlist_card_${index}">
                    <div class="wishlist-image">
                        <img src="${BASE_FILES_ADMIN+'uploads/'+primeraImg}" alt="${x.nombre}" loading="lazy">
                        <button class="btn-remove btnRemoverWishlist" type="button" aria-label="Remove from wishlist">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                    <div class="wishlist-content">
                        <h4>${x.nombre}</h4>
                        <div class="product-meta">
                            <div class="rating d-none">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-half"></i>
                                <span>(4.5)</span>
                            </div>
                            <div class="price">
                                <span class="current">S/${x.precio}</span>
                                <span class="original d-none">$99.99</span>
                            </div>
                        </div>
                        <button type="button" class="btn-add-cart btnAgregarWishlist">Agregar al carrito</button>
                    </div>
                </div>
                `;

                $div_contenedor.append(html);

                $('#div_wishlist_card_'+index).data('value', x.id_wishlist);
                $('#div_wishlist_card_'+index).data('idproducto', x.id);

                let safeValue = encodeURIComponent(JSON.stringify(x)); 
                $('#div_wishlist_card_' + index).data('json', safeValue);


            });


            $('.btnRemoverWishlist').on('click', function () {

                let $order_card = $(this).closest('.wishlist-card');
                let id_wishlist = $order_card.data('value');
                let data_json = $order_card.data('json');

                Componente.delete_wishlist(id_wishlist);

            });

            $('.btnAgregarWishlist').on('click', function () {

                let $order_card = $(this).closest('.wishlist-card');
                let id_wishlist = $order_card.data('value');
                let id_producto = $order_card.data('idproducto');
                let data_json = $order_card.data('json');

                Componente.save_cart(id_producto);

            });

        }
        else{
            $div_contenedor.append('<center>No se encontraron resultados</center>')
        }

    },

    tab_mostrar_mis_direcciones: async function () {

        let $div_contenedor = DOM.find(".addresses-grid");
        $div_contenedor.html('');

        let row = await $.fetchData('get', 'general/micuenta/get_mis_direcciones', {});
        console.log("🚀 ~ row:", row)
        if ($.validarResp(row).ok) {

            row.forEach((x,index) => {

                let html =`
                <!-- Address Card ${index} -->
                <div class="address-card default aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" id="div_address_card_${index}">
                    <div class="card-header">
                        <h4>${x.tipo_domicilio}</h4>
                        ${x.fl_principal?'<span class="default-badge">Predeterminado</span>':''}
                    </div>
                    <div class="card-body">
                        <p class="address-text">
                            ${x.direccion}
                            <br>${x.apartamento}
                            <br>${x.ubigeo}
                            <br>Perú
                        </p>
                        <div class="contact-info">
                            <div><i class="bi bi-person"></i> ${x.nombres_contacto}</div>
                            <div><i class="bi bi-telephone"></i>${x.telefono_contacto}</div>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button type="button" class="btn-edit btnEditarDireccion">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button type="button" class="btn-remove btnEliminarDireccion">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                        ${x.fl_principal?'':'<button type="button" class="btn-make-default btnEstPredeterminado">Establecer predeterminado</button>'}
                    </div>
                </div>
                `;

                $div_contenedor.append(html);

                $('#div_address_card_'+index).data('value', x.id);

                let safeValue = encodeURIComponent(JSON.stringify(x)); 
                $('#div_address_card_' + index).data('json', safeValue);


            });


            $('.btnEditarDireccion').on('click', function () {

                let $order_card = $(this).closest('.address-card');
                let id_persona_direccion = $order_card.data('value');
                let data_json = JSON.parse(decodeURIComponent($order_card.data('json')));

                Componente.agregar_direccion(data_json);

            });

            $('.btnEliminarDireccion').on('click', function () {

                let $order_card = $(this).closest('.address-card');
                let id_persona_direccion = $order_card.data('value');
                let data_json = JSON.parse(decodeURIComponent($order_card.data('json')));

                Componente.id_persona_direccion = id_persona_direccion;

                Componente.delete_direccion();

            });

            $('.btnEstPredeterminado').on('click', function () {

                let $order_card = $(this).closest('.address-card');
                let id_persona_direccion = $order_card.data('value');
                let data_json = JSON.parse(decodeURIComponent($order_card.data('json')));

                Componente.id_persona_direccion = id_persona_direccion;

                Componente.establecer_predeterminado_direccion();

            });

        }
        else{
            $div_contenedor.append('<center>No se encontraron resultados</center>')
        }

    },

    agregar_direccion: async function (data) {

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
                                            <option value="1">Casa</option>
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

        let form = DOM.find('form[name="'+idform+'"]');

        this.id_persona_direccion = null;

        if(data){

            this.id_persona_direccion = data.id;
            form.find('input[name="direccion"]').val(data.direccion);
            form.find('input[name="apartamento"]').val(data.apartamento);
            form.find('select[name="id_tipo_domicilio"]').val(data.id_tipo_domicilio).change();
            form.find('input[name="codigo_postal"]').val(data.codigo_postal);
            form.find('input[name="nombres_contacto"]').val(data.nombres_contacto);
            form.find('input[name="telefono_contacto"]').val(data.telefono_contacto);
            form.find('input[name="indicaciones"]').val(data.indicaciones);

            if(data.id_ubigeo != null)
            {
                form.find('select[name="id_ubigeo"]').html('')
                .append(new Option(data.ubigeo, data.id_ubigeo));
            }
        }

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

    tab_mostrar_mis_datos_personales: async function () {

        let row = await $.fetchData('get', 'general/micuenta/get_mis_datos', {});
        if ($.validarResp(row).ok) {

            DOM.find("#nombre").val(row.nombres);
            DOM.find("#apellido").val(row.apellidos);
            DOM.find("#email").val(row.email);
            DOM.find("#telefono").val(row.telefono);
            DOM.find("img[name='imagen']").attr("src", (BASE_FILES + 'images/' + row.imagen));

            DOM.find(".nombre_usu").text(row.nombres);
            DOM.find(".img-profile").attr("src", (BASE_FILES + 'images/' + row.imagen));

            this.imagen_anterior = row.imagen;

        }

    },

    cerrar_sesion : () => {

        axios.get(BASE_API + 'autenticacion/logout')
        .then(function(response) {
            localStorage.removeItem('Token');
            location.href = BASE_URL;

        }).catch(error => {
            localStorage.removeItem('Token');
            location.href = BASE_URL;
        });

    },

    delete_wishlist: async function(id_wishlist) {

        let oData = { id: id_wishlist }
        let resp = await $.postData('orden/wish_list/delete_by_id', oData);

        if (resp && resp.tipo == 'success') {
            Componente.tab_mostrar_mi_listadeseos();
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

    save_direccion: async function(idform) {

        let ladda = HELPER.ladda(DOM_ID+' form[name="' + idform + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + idform + '"]'));

        if (this.id_persona_direccion) { formData.append('id', this.id_persona_direccion); }
        formData.append('id_persona', this.id_persona);

        let resp = await $.postData('general/persona/save_direccion', formData);
        if (resp && resp.tipo == 'success') {
            __closeModal(__idModal);
            HELPER.notificacion(resp.mensaje, 'success');
            Componente.tab_mostrar_mis_direcciones();
        }
        ladda.stop();
     
    },

    delete_direccion: async function() {

        var resp = await HELPER.DeleteRegistro();
        if (resp) {

             let oData = { id: this.id_persona_direccion}

            let resp = await $.postData('general/persona/delete_direccion', oData);
            if (resp && resp.tipo == 'success') {
                HELPER.notificacion(resp.mensaje, 'success');
                Componente.tab_mostrar_mis_direcciones();
            }
        } 
    },

    establecer_predeterminado_direccion: async function() {

        let oData = { id: this.id_persona_direccion, id_persona: this.id_persona}

        let resp = await $.postData('general/persona/establecer_predeterminado_direccion', oData);
        if (resp && resp.tipo == 'success') {
            HELPER.notificacion(resp.mensaje, 'success');
            Componente.tab_mostrar_mis_direcciones();
        }
       
    },

    validar_cambios_personales: async function () {

        var form = document.getElementById('frm_cambios_personales');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                nombre: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
                apellido: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                        emailAddress: {
                            message: 'Deber ingresar un email válido',
                        }
                    },
                },
                telefono: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                fieldStatus: new FormValidation.plugins.FieldStatus({
                    onStatusChanged: function (areFieldsValid) {
                        areFieldsValid
                            ? submitButton.removeAttribute('disabled')
                            : submitButton.setAttribute('disabled', 'disabled');
                    }
                }),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: '',
                    rowSelector: '.col-vali'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.save_cambios_personales();
                    form.reset();
                    fv.resetForm();
                }
            });
        });

    },

    save_cambios_personales: async function() {

      let ladda = HELPER.ladda(DOM_ID+' form[name="frm_cambios_personales"] button[type="submit"]');
      let formData = new FormData(document.querySelector(DOM_ID+' form[name="frm_cambios_personales"]'));

      if(this.id_persona){
        formData.append('id_persona', this.id_persona);
      }

      if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }

      let resp = await $.postData('general/micuenta/save_cambios_personales', formData);
      if (resp && resp.tipo == 'success') {

          HELPER.notificacion_v2(resp.mensaje, 'success');
          Componente.tab_mostrar_mis_datos_personales();
          ladda.stop();

      }else{
        ladda.stop();
      }
     
    },

    validar_cambiar_password: async function () {

        var form = document.getElementById('frm_cambiar_password');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                password_actual: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese su contraseña actual',
                        },
                        stringLength: {
                            min: 8,
                            max: 30,
                            message: 'Este campo debe tener más de 8 y menos de 30 caracteres'
                        },
                    },
                },
                password_nuevo: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese su nueva contraseña',
                        },
                        stringLength: {
                            min: 8,
                            max: 30,
                            message: 'Este campo debe tener más de 8 y menos de 30 caracteres'
                        },
                    },
                },
                password_confirmar: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor confirme la nueva contraseña'
                        },
                        identical: {
                            compare: function () {
                                return form.querySelector('[name="password_nuevo"]').value;
                            },
                            message: 'La contraseña y su confirmación no son la misma.'
                        }
                    }
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                fieldStatus: new FormValidation.plugins.FieldStatus({
                    onStatusChanged: function (areFieldsValid) {
                        areFieldsValid
                            ? submitButton.removeAttribute('disabled')
                            : submitButton.setAttribute('disabled', 'disabled');
                    }
                }),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: '',
                    rowSelector: '.col-vali'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            fv.validate().then(function (status) {
                if (status === 'Valid') {
                    Componente.save_cambiar_password();
                    form.reset();
                    fv.resetForm();
                }
            });
        });

    },

    save_cambiar_password: async function() {

      let ladda = HELPER.ladda(DOM_ID+' form[name="frm_cambiar_password"] button[type="submit"]');
      let formData = new FormData(document.querySelector(DOM_ID+' form[name="frm_cambiar_password"]'));

      let resp = await $.postData('general/micuenta/save_cambiar_password', formData);
      if (resp && resp.tipo == 'success') {

          HELPER.notificacion_v2(resp.mensaje, 'success');
          Componente.tab_mostrar_mis_datos_personales();
          ladda.stop();

      }else{
        ladda.stop();
      }
     
    },

 } 
 
 export default Componente;