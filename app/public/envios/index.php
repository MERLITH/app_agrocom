<?php include_once('assets/home/home_arriba.php');?>

    <!-- Newsletter -->
    <div class="form-2" id="main">
        <div class="container">
            <div class="row" style="padding-top: 60px;">
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <input type="text" name="texto_buscar" class="form-control" placeholder="Buscar telas" aria-label="Buscar telas" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-primary" type="button" id="buscar_tela" name="buscar_tela"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <select name="id_categoria" data-select="CATEGORIA" class="form-control select" autocomplete="off" required>
                            <option value="">Todas las categorías</option>                                                                
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <select name="id_color" data-select="COLOR" class="form-control select" autocomplete="off" required>
                            <option value="">Todos los colores</option>                                                                
                        </select>
                    </div>
                </div>
            </div>
            <div class="container mt-3 mb-3">
                <div class="row" data-contenedor="articulos">
                    
                   
                </div>
            </div>


            
        </div> <!-- end of container -->
    </div> <!-- end of form-2 -->
    <!-- end of newsletter -->

<?php include_once('assets/home/home_abajo.php');?>

<script>

    let DOM_ID = '#main'; 
    let DOM = $(DOM_ID); 

    let Componente = {

        select_categoria: function ()
        {
            let select = $('select[data-select="CATEGORIA"]');
            select.empty();
            select.append($('<option></option>').attr('value', '').text('Todas las categorías'));

            $.get('server/public/publico/recursivo/get_select_categoria')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });
            }).catch(error => {
                console.log(error);
            }); 
        },

        select_color: function ()
        {
            let select = $('select[data-select="COLOR"]');
            select.empty();
            select.append($('<option></option>').attr('value', '').text('Todos los colores'));

            $.get('server/public/publico/recursivo/get_select_color')
            .then(function (response) {
                response.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });
            }).catch(error => {
                console.log(error);
            }); 
        },

        buscar_articulo: async () => {

            let parametros = {
                texto_buscar : DOM.find('input[name="texto_buscar"]').val(),
                id_categoria : DOM.find('select[name="id_categoria"]').val(),
                id_color : DOM.find('select[name="id_color"]').val()
            };

            $.get('server/public/publico/recursivo/get_select_articulo?'+jQuery.param(parametros))
            .then(function (response) {

                $('div[data-contenedor="articulos"]').html('');

                let html = '';

                response.forEach(row => {

                    let codigo = Math.random().toString(36).substr(2);
                    html += `
                    <div class="col-md-3 col-sm-6 col-xs-12" data-codigo="`+codigo+`">
                        <div class="card p-3 mb-2" style="border-radius: 15px">
                            <img src="server/public/writable/images/`+row.imagen+`" style="height: 200px" class="card-img-top" alt="...">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <div class="ms-2 c-details">
                                        <h6 class="mb-1">`+row.categoria+`</h6>
                                    </div>
                                </div>
                                <div class="badge"> <span class="badge badge-secondary">`+row.color+`</span> </div>
                            </div>
                            <div class="mt-3">
                                <h5 class="heading text-center">`+row.nombre+`</h5>
                                <div class="mt-2">
                                    <span class="badge badge-light" style="width: 100%;"><h5 class="text-primary">S/ `+parseFloat(row.precio).toFixed(2)+`</h5></span>
                                    <div class="mt-2 text-center" style="display: none;"> <button style="border-radius: 15px" type="button" class="btn btn-primary"><i class="fas fa-plus"></i> Agregar</button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    
                });

                $('div[data-contenedor="articulos"]').append(html);

            }).catch(error => {
                console.log(error);
            }); 
         
        },
    

    };

    $(document).ready(function(){ 

        Componente.select_color();
        Componente.select_categoria();
        Componente.buscar_articulo();

    });

    /*CLICK- BUSCAR */
    $(document).on('click', 'button[name="buscar_tela"]', function (e) {
        e.stopImmediatePropagation();
        Componente.buscar_articulo();
    });

    /*KEYUP- BUSCAR */
    $(document).on('keyup', 'input[name="texto_buscar"]', function (e) {
        e.stopImmediatePropagation();
        Componente.buscar_articulo();
    });

    $(document).on('change', 'select[name="id_categoria"]', function (e) {
        e.stopImmediatePropagation();
        Componente.buscar_articulo();
    });

    $(document).on('change', 'select[name="id_color"]', function (e) {
        e.stopImmediatePropagation();
        Componente.buscar_articulo();
    });


</script>
