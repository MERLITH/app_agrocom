
let DOM, DOM_ID ;
let Rol = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <style>
            .tabla_permiso td{
                padding:0 !important;
            }
        </style>

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Roles & Permisos
                            <small>Configuración</small>
                        </h1>
                    </div>
                    <div class="col-md-4" align="right">
                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="form-label">Nombre</label>
                                            <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4" style="padding-top:20px;">
                                        <div class="form-group">
                                            <label class="form-label"><input type="checkbox" name="fl_no_dashboard" autocomplete="off"> Ocultar Dashboard</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <table class="table tabla_permiso">
                                            <thead>
                                                <tr>
                                                    <th>SECCIONES</th>
                                                    <th class="text-center" style="width:80px;">VER</th>
                                                    <th class="text-center" style="width:80px;">CREAR</th>
                                                    <th class="text-center" style="width:80px;">EDITAR</th>
                                                    <th class="text-center" style="width:80px;">ELIMINAR</th>
                                                </tr>
                                            </thead>
                                            <tbody name="tabla-permiso">
                                                <tr>
                                                    <td class="font-weight-bold"></td>
                                                    <td class="text-center"><input type="checkbox" name="check_all" value="view"></td>
                                                    <td class="text-center"><input type="checkbox" name="check_all" value="new"></td>
                                                    <td class="text-center"><input type="checkbox" name="check_all" value="edit"></td>
                                                    <td class="text-center"><input type="checkbox" name="check_all" value="delete"></td>
                                                </tr>
                                                <tr>
                                                    <td class="font-weight-bold" colspan="5" style="background-color:#BFE4FA; text-align:left;"><strong> DASHBOARD </strong></td>
                                                </tr>
                                                <tr data-menu="dashboard-general">
                                                    <td>Sistema General</td>
                                                    <td class="text-center"><input type="checkbox" name="view"></td>
                                                    <td class="text-center"></td>
                                                    <td class="text-center"></td>
                                                    <td class="text-center"></td>
                                                </tr>
                                                
                                                <tr>
                                                    <td class="font-weight-bold" colspan="5"><strong>======= CONFIGURACIÓN ======</strong></td>
                                                </tr>
                                                <tr data-menu="configuracion-usuario">
                                                    <td>Usuarios</td>
                                                    <td class="text-center"><input type="checkbox" name="view"></td>
                                                    <td class="text-center"><input type="checkbox" name="new"></td>
                                                    <td class="text-center"><input type="checkbox" name="edit"></td>
                                                    <td class="text-center"><input type="checkbox" name="delete"></td>
                                                </tr>
                                                <tr data-menu="configuracion-rol">
                                                    <td>Roles y Permisos</td>
                                                    <td class="text-center"><input type="checkbox" name="view"></td>
                                                    <td class="text-center"><input type="checkbox" name="new"></td>
                                                    <td class="text-center"><input type="checkbox" name="edit"></td>
                                                    <td class="text-center"><input type="checkbox" name="delete"></td>
                                                </tr>
                                                <tr data-menu="configuracion-empresa">
                                                    <td>Empresa</td>
                                                    <td class="text-center"><input type="checkbox" name="view"></td>
                                                    <td class="text-center"></td>
                                                    <td class="text-center"><input type="checkbox" name="edit"></td>
                                                    <td class="text-center"></td>
                                                </tr>
                                               
                                                <tr>
                                                    <td class="font-weight-bold" colspan="5" style="background-color:#BFE4FA; text-align:left;"><strong> GENERADOR </strong></td>
                                                </tr>
                                                <tr data-menu="generador-generador_etiqueta">
                                                    <td>Generador de etiquetas</td>
                                                    <td class="text-center"><input type="checkbox" name="view"></td>
                                                    <td class="text-center"><input type="checkbox" name="new"></td>
                                                    <td class="text-center"><input type="checkbox" name="edit"></td>
                                                    <td class="text-center"><input type="checkbox" name="delete"></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
            submitHandler: function() {
                Rol.submit();
            }
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Rol.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Rol.new();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Rol.edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Rol.delete($(this));
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


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/rol',

            lengthChange:false,
            paginate: false,

            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'NOMBRE', mData: 'nombre' },
            ],
            createdRow: function(row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');
            }
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Rol');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Modificar Rol');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

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

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Rol');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
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
            
            Rol.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Rol.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Rol;