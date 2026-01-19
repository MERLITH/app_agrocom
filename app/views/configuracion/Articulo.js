

    let DOM, DOM_ID ;
    let Componente = {

        modal: () => {
            let html = `
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
                                                <label class="form-label">Descripción <span class="text-danger">(*)</span></label>
                                                <input type="text" name="nombre" class="form-control" autocomplete="off" >
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Código Producto <b class="text-danger">*</b></label>
                                                <div class="input-group input-group-left-right">
                                                    <input type="text" name="codigo" class="form-control" autocomplete="off" >
                                                    <span data-name="btn-generar_codigo" class="btn btn-success input-group-addon input-group-addon input-group-addon_right"><i class="fa fa-sync-alt"></i></span>
                                                </div>                                   
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Unidad de Medida <b class="text-danger">*</b></label>
                                                <select type="text" name="unidad_medida" class="form-control select" autocomplete="off" required>
                                                    <option value="">Seleccione...</option>
                                                    <option value="UNIDADES">UNIDADES</option>
                                                    <option value="PESO">PESO KG</option>
                                                    <option value="VOLUMEN">VOLUMEN M3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Peso (Referencial) </label>
                                                <div class="input-group">                                                    
                                                    <input type="text" name="peso" class="form-control" autocomplete="off">
                                                    <span class="input-group-addon input-group-addon input-group-addon_right">
                                                        KG
                                                    </span>
                                                </div>                                   
                                            </div>
                                        </div>                                        
                                        <div class="col-md-12" style="padding-top:25px;">
                                            <label class="form-label"><input type="checkbox" name="fl_no_bulto" /> No es Bulto</label> 
                                            <label style="margin-left:10px;"><input type="checkbox" name="fl_no_tarifa" /> No aplica Tarifa</label>
                                        </div>
                                    </div>                              
                                </div>
                                <div class="modal-footer" align="center" style="display:block">
                                    <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                    <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            return html;
        },

        render: async (d, parent_comp = false) => {
            
            Componente.parent_comp = parent_comp;    

            let main_random = 'main_'+Math.random().toString(36).substr(2);

            $('#'+main_random).off();

            if(parent_comp != false)
            {
                d.html(`
                    <div id="`+main_random+`">`+Componente.modal(true)+`</div> 
                `);
            }
            else
            {
                d.innerHTML = `

                <div id="`+main_random+`">
                    <!-- Content Header (Page header) -->
                    <section class="content-header">
                        <div class="row">
                            <div class="col-md-8 content-header" style="padding-top:5px;">
                                <h1 style="margin:0; ">
                                    Articulos
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

                    `+Componente.modal()+`

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

            }
            
            await Componente.after_render(main_random);       
            HELPER.load_component();
            
        },

        after_render: async (main_random) => {

            DOM_ID = '#'+main_random;
            DOM = $(DOM_ID);        

            /** SUBMIT SAVE */
            DOM.find('form[name="save"]').validate({

                /* REGLAS */
                rules: {
                    codigo: {required:true},
                    nombre: {required: true},
                    unidad_medida: {required: true}
                },
            
                messages: {
                    codigo: 'Código',
                    nombre: 'Punto de Inicio',
                    unidad_medida: 'Unidad de Medida'
                },

                submitHandler: function() {
                    Componente.submit();
                }
            
            });

            /** SUBMIT DELETE */
            DOM.find('form[name="delete"]').validate({
                submitHandler: function() {
                    Componente.submit();
                }
            });

            /* NUEVO */
            DOM.on('click', 'button[name="nuevo"]', function(e) {
                e.stopImmediatePropagation();
                Componente.new();
            });

            /* EDITAR */
            DOM.on('click', 'button[name="row-edit"]', function(e) {
                e.stopImmediatePropagation();
                Componente.edit($(this));
            });

            /* ELIMINAR */
            DOM.on('click', 'a[name="row-delete"]', function(e) {
                e.stopImmediatePropagation();
                Componente.delete($(this));
            });

            DOM.on('click', 'span[data-name="btn-generar_codigo"]', function(e) {
                e.stopImmediatePropagation();
                Componente.generar_codigo();
            });
                
            Componente.datatable();

            HELPER.load_component();
        },

        /**** DATA */
        id: null,
        action_submit: null,
        imagen_anterior: null,
        /************ */

        generar_codigo: () => {

            let codigo = (Math.random().toString(36).substr(2)).substr(0, 8);
            DOM.find('input[name="codigo"]').val('P'+(codigo.toUpperCase()));

        },

        datatable: function() {

            this.table = DOM.find('table[name="registros"]').DataTable({
                ajax:BASE_API + 'configuracion/articulo',

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
                    { title: 'CÓDIGO', mData: 'codigo' },
                    { title: 'DESCRIPCIÓN', mData: 'nombre' },             
                    { title: 'UNIDAD DE MEDIDA', mData: 'unidad_medida' },             
                    { title: 'PESO', render: function(data, type, row){ return row.peso+' KG'; }},
                    { title: 'NO BULTO', render: function(data, type, row){ 
                        return (row.fl_no_bulto == 1) ? '<i class="fa fa-times" style="color:red;"></i> No es Bulto' : ''; 
                        }
                    },  
                    { title: 'NO TARIFA', render: function(data, type, row){ 
                        return (row.fl_no_tarifa == 1) ? '<i class="fa fa-times" style="color:red;"></i> No aplica Tarifa' : ''; 
                        }
                    },            
                ]
            });

        },

        new: function() {

            let accion = 'save';
            let form = DOM.find('form[name="save"]');

            DOM.find('h4[name="'+accion+'"]').text('Nuevo Articulo');

            /** DATA */
            HELPER.reset_form(form);

            this.id = null;
            this.action_submit = accion;
            
            DOM.find('div[name="modal-'+accion+'"]').modal('show');
            
        },

        edit: function(row) {
                
            let accion = 'save';
            let form = DOM.find('form[name="save"]');

            DOM.find('h4[name="'+accion+'"]').text('Editar Articulo');

            /** DATA */
            HELPER.reset_form(form);

            let data = HELPER.get_attr_json(row);

            form.find('input[name="nombre"]').val(data.nombre);
            form.find('input[name="codigo"]').val(data.codigo);
            form.find('select[name="unidad_medida"]').val(data.unidad_medida).change();
            form.find('input[name="peso"]').val(data.peso);
            form.find('input[name="fl_no_bulto"]').prop('checked', parseInt(data.fl_no_bulto));
            form.find('input[name="fl_no_tarifa"]').prop('checked', parseInt(data.fl_no_tarifa));
            form.find('input[name="unidad_medida"]').val(data.unidad_medida);

            this.id = data.id;
            this.action_submit = accion;

            DOM.find('div[name="modal-'+accion+'"]').modal('show');
        },

        delete: function(row) {

            let accion = 'delete';
            let form = DOM.find('form[name="'+accion+'"]');

            DOM.find('h4[name="'+accion+'"]').text('Eliminar Articulo');

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

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/articulo/' + this.action_submit,
                data: formData
            })
            .then(function(response) { 
                
                if(Componente.parent_comp == false)
                {
                    Componente.table.ajax.reload(null, false);
                }
                else
                {
                    Componente.parent_comp(response.data.id_articulo);
                }

                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');
                ladda.stop();
            }).catch(error => {
                ladda.stop();
            });
        },
    } 

    export default Componente;