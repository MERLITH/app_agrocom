

let DOM, DOM_ID,__idModal ;
let Rol = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        

        <div id="main">

            <div class="row mt-2">
                <div class="col-md-8">
                    <h4 class="fw-bold py-0 mb-4">
                        <span class="text-muted fw-light">
                            Configuración
                        </span> 
                        &nbsp;<span style="border-right: 1px solid #d6dce1;"></span>&nbsp;
                        <small>
                            <a href="`+BASE_URL+`" class="icon-home text-primary"><i class="mdi mdi-home"></i></a>&nbsp;
                            <i class="fas fa-chevron-right" style="font-size: 12px;"></i>&nbsp;
                            <a href="javascript:" class="icon-home text-primary">Roles & Permisos</a>&nbsp;
                        </small>
                    </h4>
                </div>
                <div class="col-md-4 text-end">
                    <button type="button" class="btn rounded-pill btn-primary waves-effect waves-light" name="nuevo">
                        <span class="tf-icons mdi mdi-plus-circle-outline me-1"></span>
                        Nuevo Registro
                    </button>
                </div>
            </div>

            <!-- Users List Table -->
            <div class="card">  
                <div class="card-datatable table-responsive" id="Cnt_tblRegistros">
                </div>
            </div>  

            <!-- Pop ups -->
            <div id="container_modal">
            </div>
            <!-- / Pop ups -->

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="delete" class="modal-title">Modal title</h4>
                        </div>
                        <form name="delete">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <i class="fad fa-trash-alt fa-4x"></i><br/>
                                </div>
                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                    <label class="form-label"><input type="checkbox" name="confirmacion" required/>
                                        Confirmo realizar la eliminación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




        </div>            
        `;

        Rol.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Rol.new();
        });
     
        /* ALL VIEW SELECT */
        DOM.on('click', 'input[name="check_all"]', function(e) {
            e.stopImmediatePropagation();

            if($(this).is(':checked'))
            {
                DOM.find('input[name="'+this.value+'"]').prop('checked', true);
            }
            else
            {
                DOM.find('input[name="'+this.value+'"]').prop('checked', false);
            }            
        });

        Rol.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */

    ContentModalSave: function() {
        var chtml = `
                    <form name="save" id="formSave">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Nombre</label>
                                    <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-4 d-none" style="padding-top:20px;">
                                <div class="form-group">
                                    <label class="form-label"><input type="checkbox" name="fl_no_dashboard" autocomplete="off"> Ocultar Dashboard</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <table class="table tabla_permiso">
                                    <thead>
                                        <tr>
                                            <th><strong>SECCIONES</strong></th>
                                            <th class="text-center" style="width:80px;"><strong>VER</strong></th>
                                            <th class="text-center" style="width:80px;"><strong>CREAR</strong></th>
                                            <th class="text-center" style="width:80px;"><strong>EDITAR</strong></th>
                                            <th class="text-center" style="width:80px;"><strong>ELIMINAR</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody name="tabla-permiso">
                                        <tr>
                                            <td class="font-weight-bold"></td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="check_all" value="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="check_all" value="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="check_all" value="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="check_all" value="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="font-weight-bold table-primary" colspan="5"> <strong>PANEL DASHBOARD</strong></td>
                                        </tr>
                                        <tr data-menu="dashboard-general">
                                            <td>General</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center"></td>
                                            <td class="text-center"></td>
                                            <td class="text-center"></td>
                                        </tr>
                                        <tr>
                                            <td class="font-weight-bold table-primary" colspan="5"><strong> CONFIGURACIÓN </strong></td>
                                        </tr>                    
                                        <tr data-menu="configuracion-empresa">
                                            <td>Empresa</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center"></td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center"></td>
                                        </tr>
                                        <tr data-menu="configuracion-catalogo_empresa">
                                            <td>Catálogo empresas</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center"></td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center"></td>
                                        </tr>
                                        <tr data-menu="configuracion-rol">
                                            <td>Roles y Permisos</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="font-weight-bold table-primary" colspan="5"><strong> MANTENEDOR </strong></td>
                                        </tr>
                                        <tr data-menu="mantenedor-usuario">
                                            <td>Usuario</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="mantenedor-cliente">
                                            <td>Estudiante</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="mantenedor-proveedor">
                                            <td>Proveedor</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="font-weight-bold table-primary" colspan="5"><strong> GESTIÓN DE ÓRDENES </strong></td>
                                        </tr>
                                        <tr data-menu="gest_orden-orden">
                                            <td>Órdenes</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="font-weight-bold table-primary" colspan="5"><strong>INVENTARIO</strong></td>
                                        </tr>
                                        <tr data-menu="logistica-tipo_articulo">
                                            <td>Tipo de artículo</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-marca">
                                            <td>Marca</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-linea_sublinea">
                                            <td>Línea y SubLínea</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-articulo">
                                            <td>Artículo</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-unidad_medida">
                                            <td>Unidad de medida</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-orden_compra">
                                            <td>Orden de compra</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-compra">
                                            <td>Compra</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-salida_articulo">
                                            <td>Salida de artículo</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-almacen">
                                            <td>Almacen</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr data-menu="logistica-checklist">
                                            <td>Checklist</td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="view">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="new">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="edit">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                            <td class="text-center">
                                                <label class="switch switch-sm">
                                                    <input type="checkbox" class="switch-input" name="delete">
                                                    <span class="switch-toggle-slider">
                                                        <span class="switch-on"></span>
                                                        <span class="switch-off"></span>
                                                    </span>
                                                    <span class="switch-label"></span>
                                                </label>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer mt-4 pb-1 d-flex justify-content-center">
                            <button type="button" name="cerrar" class="btn btn-label-secondary waves-effect rounded-pill" data-bs-dismiss="modal"><span class="mdi mdi-cancel me-1"></span> Cancelar</button>
                            <button type="submit" name="submit" class="btn btn-primary waves-effect waves-light rounded-pill w-50"><span class="tf-icons mdi mdi-checkbox-marked-circle-outline me-1"></span> Registrar</button>
                        </div>
                    </form>
                    `;
        return chtml;
    },

    validarForm: function (idform) {

        var arrayFields = [
            {field: 'nombre', message: 'Por favor, digite el Nombre del rol'},
        ];

        var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        var fv = $.frmValidation(idform, fields);
        DOM.off('click', '#' + idform + ' button[name="submit"]');
        DOM.on('click', '#' + idform +' button[name="submit"]', function(e) {
            //e.stopImmediatePropagation();
            e.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Rol.submit();
                }
            });           
        });

    },
   
    select_all_permiso : function(value_permiso)
    {
        if($(this.el+' div[name="modal-save"]').find('input[name="m_'+value_permiso+'"]').is(':checked'))
        {
            flag_check = true;
        }
        else
        {
            flag_check = false;
        }

        $(this.el+' table[name="tabla-permiso"] tbody tr').each(function(){      
            $(this).find('input[name="'+value_permiso+'"]').prop('checked', flag_check);
        });
    },

    datatable: async function() {

        var oData = await $.getData('configuracion/rol');

        var htmlTable = '<table class="datatables-users table tblRegistros"></table>';
        DOM.find('#Cnt_tblRegistros').html(htmlTable);

        var oColums = [
            { "data": "nombre", "title": "NOMBRE", "class": "text-left", ordenable: true },
            {
                "data": null, "title": "Acción", "class": "text-center", ordenable: false,
                render:
                    function (data, type, row) {


                        var arrayButton = [];
                        arrayButton.push(
                            {
                              element: "a",
                              properties: {class:"btn btn-sm btn-text-warning rounded-pill btn-icon item-edit btnEditar", href: "javascript:",html: '<i class="mdi mdi-pencil-outline"></i>'},
                            },
                            {
                              element: "a",
                              properties: {class:"btn btn-sm btn-text-danger rounded-pill btn-icon item-edit btnEliminar", href: "javascript:",html: '<i class="mdi mdi-delete-outline me-2"></i>'},
                            },
                          );
  
                          var oSetting =
                              [
                                  {
                                      element: "div",
                                      properties: { class: "d-inline-block text-nowrap", },
                                      children: arrayButton
                                  }
                              ];
  
                          var domHtml = $.SMBuildTag(oSetting);
                          return domHtml[0][0].outerHTML;
                        

                    }
            },
        ];

        var datableTarea = __generateDataTable(
            'tblRegistros',
            oData,
            oColums,
            [], 
            15,
            [15, 20, 30, 40],
            [0,1,2],
            'LISTADO DE ROLES'
        );

        $('.tblRegistros tbody').on('click', '.btnEditar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Rol.edit(oDataRow);     
        });
        $('.tblRegistros tbody').on('click', '.btnEliminar', function () {
            var oTrRow = $(this).parent().parent().parent();
            var oDataRow = datableTarea.row(oTrRow).data();
            Rol.delete(oDataRow);
        });


    },

    new: function() {

        let accion = 'save';

        Rol.id = null;
        Rol.action_submit = accion;
        Rol.imagen_anterior = null;
        
        var cHtml = Rol.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'REGISTRAR NUEVO ROL',
            iconoTitulo : 'mdi mdi-content-save-check-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });

        Rol.validarForm('formSave');

        let form = DOM.find('form[name="save"]');
        
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

    },

    edit: function(data) {
        
        let accion = 'save';
        
        var cHtml = Rol.ContentModalSave();
        __idModal = $.ModalSM({
            idContenedor : DOM.find('#container_modal'),  
            size : 2,
            cHtml : cHtml,  
            header : 1,
            titulo : 'MODIFICAR ROL',
            iconoTitulo : 'mdi mdi-square-edit-outline',
            nameModal : 'save',
            position : 2,
            noCerrarModal : 1,
            buttonCerrar : 1,  
        });
    
        Rol.validarForm('formSave', 'editar');
              
        let form = DOM.find('form[name="save"]');

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="fl_no_dashboard"]').prop('checked', parseInt(data.fl_no_dashboard));

        let tabla = DOM.find('tbody[name="tabla-permiso"]');

        data.permisos.forEach(row => {
            console.log(row);
            var fila = tabla.find('tr[data-menu="'+row.menu+'"]');

            if (row.view == 1) {
                fila.find('input[name="view"]').prop('checked', true);
            }

            if (row.new == 1) {
                fila.find('input[name="new"]').prop('checked', true);
            }

            if (row.edit == 1) {
                fila.find('input[name="edit"]').prop('checked', true);
            }

            if (row.delete == 1) {
                fila.find('input[name="delete"]').prop('checked', true);
            }
        });

        this.id = data.id;
        this.action_submit = accion;
    },


    delete: async function(data) {

        let accion = 'delete';
        this.id = data.id;
        this.action_submit = accion;

        var resp = await HELPER.DeleteRegistro();
        if (resp) {
            Rol.submit_delete();
        }  
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        
        /* PERMISOS */
        var permisos = [];
        var index = 0;

        DOM.find('tbody[name="tabla-permiso"] tr').each(function(){
            if($(this).attr('data-menu') != undefined)
            {
                var view = false;
                if($(this).find('input[name="view"]').is(':checked'))
                {
                    view = true;
                }

                var _new = false;
                if($(this).find('input[name="new"]').is(':checked'))
                {
                    _new = true;
                }

                var edit = false;
                if($(this).find('input[name="edit"]').is(':checked'))
                {
                    edit = true;
                }

                var _delete = false;
                if($(this).find('input[name="delete"]').is(':checked'))
                {
                    _delete = true;
                }

                if(view === true || _new === true || edit === true || _delete === true)
                {
                    permisos[index] = {
                        menu: $(this).attr('data-menu'),
                        view: view,
                        new: _new,
                        edit: edit,
                        delete: _delete,
                    };
                    
                    index++;
                }
                
                
            }
        });

        if(permisos.length <= 0 && this.action_submit == 'save')
        {
            HELPER.notificacion('No ha seleccionado ningún módulo', 'warning');
            ladda.stop();
            return false;
        }

        formData.append('permisos', JSON.stringify(permisos));

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/rol/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            
            Rol.datatable();
            __closeModal(__idModal);
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_delete: function() {
             
        let formData = new FormData();
        if (this.id != null) { formData.append('id', this.id); }
      
        axios({
            method: 'post',
            url: BASE_API + 'configuracion/rol/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            HELPER.notificacion(response.data.mensaje, 'success');
            Rol.datatable();

        }).catch(error => {
            console.error(error);
        });
    },
} 

export default Rol;