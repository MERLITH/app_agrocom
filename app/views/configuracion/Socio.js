
import Cuenta_bancaria from '../recursivo/Cuenta_bancaria.js'

let DOM, DOM_ID ;
let Componente = {

    modal: (fl_basic = false) => {

        let style_hide = '';
        let size_modal = 'modal-xl';

        if(fl_basic == true)
        {
            style_hide = 'style="display:none;"';
            size_modal = 'modal-lg';
        }

        let html = `
            <!-- MODAL SAVE -->
                <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                    <div class="modal-dialog `+size_modal+`">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 name="save" class="modal-title">Modal title</h4>
                            </div>
                            <form name="save">
                                <div class="modal-body">
                                    <div class="nav-tabs-custom">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Datos Personales</a></li>
                                            <li class="" `+style_hide+`><a href="#tab_direccion" data-toggle="tab" aria-expanded="false">Direcciones</a></li>
                                            <li class="" `+style_hide+`><a href="#tab_contacto" data-toggle="tab" aria-expanded="false">Contactos</a></li>
                                            <li class="" `+style_hide+`><a href="#tab_2" data-toggle="tab" aria-expanded="false">Cuentas Bancarias</a></li>
                                            <li><a href="#tab_envio_confirmacion" data-toggle="tab" aria-expanded="false">Envío de confirmaciones</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tab_1">
                                            
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="row">
                                                            <div class="col-md-12" align="center">
                                                                <div>
                                                                    <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                                </div>
                                                                <div>
                                                                    <label class="btn btn-default btn-sm" style="width:100%;">
                                                                        <i class="fa fa-search"></i> Examinar
                                                                        <input type="file" name="imagen" style="display:none;">
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="form-label">Tipo socio <span class="text-danger">(*)</span></label>
                                                                    <select name="tipo" class="form-control select">
                                                                        <option value="">Seleccione...</option>
                                                                        <option value="AMBOS">AMBOS</option>
                                                                        <option value="CLIENTE">CLIENTE</option>
                                                                        <option value="PROVEEDOR">PROVEEDOR</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <div class="form-group">
                                                                    <label class="form-label">Documento <b class="text-danger">*</b>
                                                                    <select data-select="DOCUMENTO_ENTIDAD" name="id_documento"class="form-control select"></select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label class="form-label">Número DOC. <b class="text-danger">*</b></label> <label name="condicion"></label>
                                                                <div class="input-group">
                                                                    <input type="text" name="numero_documento" class="form-control" autocomplete="off">
                                                                    <span class="input-group-btn">
                                                                    <button type="button" name="buscar_numero" class="btn btn-primary" data-style="zoom-in">
                                                                        <i class="fa fa-search"></i>
                                                                    </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Razón Social <b class="text-danger">*</b></label>
                                                                    <input type="text" name="razon_social" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <div class="form-group">
                                                                    <label class="form-label">Dirección Fiscal <b class="text-danger">*</b></label>
                                                                    <input type="text" name="direccion" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="form-label">Teléfono </label>
                                                                    <input type="text" name="telefono" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12" `+style_hide+`>
                                                                <div class="form-group">
                                                                    <label class="form-label">Email <small>Separar por comas</small> </label>
                                                                    <input type="text" name="email" class="form-control mayus_false" data-mayus="false" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <div class="form-group">
                                                                    <label class="form-label">UBIGEO - (Departamento - Provincia - Distrito) </label>
                                                                    <div class="form-group">
                                                                    <select name="id_ubigeo" data-select="UBIGEO" class="form-control select2"></select>
                                                                    </div>                              
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4" `+style_hide+`>
                                                                <div class="form-group">
                                                                    <label class="form-label">Persona / Encargado  </label>
                                                                    <input type="text" name="persona_encargado" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>     
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>             
                                            <div class="tab-pane" id="tab_direccion">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="table-responsive">
                                                            <table class="table" style="width:100%;">
                                                                <thead>
                                                                    <tr>
                                                                        <th>DIRECCIÓN</th>
                                                                        <th style="width:10px;"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody name="detalle-direccion"></tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td><button type="button" name="agregar_direccion" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab_contacto">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>TIPO DOC.</th>
                                                                        <th>NUM. DOC.</th>
                                                                        <th>NOMBRE / RAZÓN SOCIAL</th>
                                                                        <th>TELÉFONO</th>
                                                                        <th>EMAIL</th>
                                                                        <th>OTROS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody name="detalle-contacto"></tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td><button type="button" name="agregar_contacto" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                           
                                            <div class="tab-pane" id="tab_2">
                                                <div class="row">
                                                    <div class="col-md-12">`+Cuenta_bancaria.render()+`</div>
                                                </div>
                                            </div> 
                                            <div class="tab-pane" id="tab_envio_confirmacion">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="panel panel-danger" style="border-radius: 20px;">
                                                            <div class="panel-heading" style="border-radius:  20px 20px 0px 0px; text-align: center; background-color: #D4102F;">
                                                                <h1 name="manifiesto_a" class="panel-title text-center" style="color: #fff; font-weight: bold;"><i class="fas fa-envelope"></i> EMAIL</h1>
                                                            </div>
                                                            <div class="panel-body">
                                                                <div class="row">
                                                                    <div class="col-md-12" style="text-align: center;">
                                                                        <div class="form-group" align="center">
                                                                            <label class="form-label">¿Desea habilitar?</label>
                                                                            <div class="switchToggle">
                                                                                <input type="checkbox" id="fl_email_enviar" name="fl_email_enviar">
                                                                                <label for="fl_email_enviar">Habilitar</label>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label class="form-label">Email <small>(Separar por comas)</small> </label>
                                                                            <input type="email" name="email_enviar" class="form-control mayus_false" data-mayus="false" autocomplete="off" multiple/>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="panel panel-danger" style="border-radius: 20px;">
                                                            <div class="panel-heading" style="border-radius:  20px 20px 0px 0px; text-align: center; background-color: #D4102F;">
                                                                <h1 name="manifiesto_a" class="panel-title text-center" style="color: #fff; font-weight: bold;"><i class="fas fa-sms"></i> SMS</h1>
                                                            </div>
                                                            <div class="panel-body">
                                                                <div class="row">
                                                                    <div class="col-md-12" style="text-align: center;">
                                                                        <div class="form-group" align="center">
                                                                            <label class="form-label">¿Desea habilitar?</label>
                                                                            <div class="switchToggle">
                                                                                <input type="checkbox" id="fl_sms_enviar" name="fl_sms_enviar">
                                                                                <label for="fl_sms_enviar">Habilitar</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label class="form-label">Celular <small>(Separar por comas)</small> </label>
                                                                            <input type="tel" name="sms_enviar" class="form-control mayus_false" data-mayus="false" autocomplete="off" multiple/>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="modal-footer" align="center" style="display:block">
                                    <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                    <button type="button" name="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        `;

        return html;
    },

    render: async (d, tipo, parent_comp = false) => {

      
        Componente.tipo = tipo;

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
                                    Clientes y Proveedores
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
                                <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
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

        
        
        await Cuenta_bancaria.after_render(main_random);
        await Componente.after_render(main_random);       
        
    },

    after_render: async (main_random) => {

        DOM_ID = '#'+main_random;
        DOM = $(DOM_ID);           

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                id_documento: {required: true},
                numero_documento: {required: true},
                razon_social: {required: true},
                direccion: {required: true},
                tipo: {required: true},
            },
          
            messages: {
                id_documento: 'Documento',
                numero_documento: 'Número de Documento',
                razon_social: 'Razón Social',
                direccion: 'Dirección',
                tipo: 'Tipo socio',
            },
          
        });

        DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
            e.stopImmediatePropagation();
  
            if(DOM.find('form[name="save"]').valid())
            {
                Componente.submit();
            }
            
        });

        if(Componente.parent_comp == false)
        {
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
        }
        
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /** CHANGE DOCUMENTO */
        DOM.on('change', 'select[name="id_documento"]', function(e) {
            e.stopImmediatePropagation();            
            Componente.change_documento();
        });

        /** BUSCAR NUMERO */
        DOM.on('click', 'button[name="buscar_numero"]', function(e) {
            e.stopImmediatePropagation();
            Componente.buscar_numero();
        });

        DOM.on('keyup', 'input[name="numero_documento"]', function(e) {            
            e.stopImmediatePropagation();
            if(e.which == 13) {
                Componente.buscar_numero();
            }            
        });

        /* AGREGAR CONTACTO */
        DOM.find('button[name="agregar_contacto"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_contacto();
        });

        /* QUITAR CONTACTO */
        DOM.on('click', 'button[name="quitar-contacto"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_contacto($(this));
        });

         /* AGREGAR DIRECCION */
         DOM.find('button[name="agregar_direccion"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_direccion();
        });

        /* QUITAR DIRECCION */
        DOM.on('click', 'button[name="quitar-direccion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_direccion($(this));
        });

        /* CHANGE EMAIL ENVIAR */
        DOM.on('change', 'input[name="fl_email_enviar"]', function(e) {
            e.stopImmediatePropagation();

            Componente.change_fl_email_enviar();

        });

        /* CHANGE SMS ENVIAR */
        DOM.on('change', 'input[name="fl_sms_enviar"]', function(e) {
            e.stopImmediatePropagation();

            Componente.change_fl_sms_enviar();

        });
       

        Componente.datatable();
        Componente.select_documento_entidad();
        Componente.select_ubigeo();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    array_rutas : [],
    array_documento: [],


    change_fl_email_enviar: async() => {

   

        if(DOM.find('input[name="fl_email_enviar"]').is(':checked'))
        {

            DOM.find('input[name="email_enviar"]').prop('disabled', false);
          
        }else{

            DOM.find('input[name="email_enviar"]').prop('disabled', true);

        }


    },

    change_fl_sms_enviar: async() => {


        if(DOM.find('input[name="fl_sms_enviar"]').is(':checked'))
        {
            DOM.find('input[name="sms_enviar"]').prop('disabled', false);
            
        }else{

            DOM.find('input[name="sms_enviar"]').prop('disabled', true);

        }

    },
    
    /***** DIRECCION */

    change_documento: () => {        

        if(DOM.find('select[name="id_documento"]').val() == 100)
        {
            let codigo = Math.random().toString(36).substr(2);

            DOM.find('input[name="numero_documento"]').val('SD'+codigo);
        }
        else
        {
            DOM.find('input[name="numero_documento"]').val('');
        }

    },

    agregar_direccion: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id:'',
                direccion:'',
                id_orden: null
                
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><input type="text" data-name="direccion"  class="form-control" value="`+data.direccion+`"/></td>
                <td>`+((data.id_orden == null) ? `<button type="button" name="quitar-contacto" class="btn btn-danger"><i class="fa fa-times"></i></button>` : '' )+`</td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-direccion"]').append(html);

    },

    quitar_direccion: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    direccion_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-direccion"] tr').each(function(){
           
            let item = {

                id : $(this).find('input[data-name="id"]').val(),
                direccion : $(this).find('input[data-name="direccion"]').val(),

            };
  
            detalle.push(item);
        });

        return detalle;
    },

    /***** CONTACTO */

    agregar_contacto: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id:'',
                id_documento: '',
                numero_documento: '',
                nombre: '',
                telefono: '',
                email: '',
                otros:'',
                id_orden: null
                
            };
        }

        let option_documento = '<option value="">Seleccione...</option>';

        Componente.array_documento.forEach(row => {
            option_documento += `<option value="`+row.id+`">`+row.text+`</option>`;
        });

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><select data-name="id_documento" class="form-control">`+option_documento+`</select></td>
                <td><input type="text" data-name="numero_documento"  class="form-control" value="`+data.numero_documento+`"/></td>
                <td><input type="text" data-name="nombre"  class="form-control" value="`+data.nombre+`"/></td>
                <td><input type="text" data-name="telefono" class="form-control" value="`+data.telefono+`" /></td>
                <td><input type="text" data-name="email"  class="form-control" value="`+data.email+`" /></td>
                <td><input type="text" data-name="otros" class="form-control" value="`+data.otros+`" /></td>
                <td>`+((data.id_orden == null) ? `<button type="button" name="quitar-contacto" class="btn btn-danger"><i class="fa fa-times"></i></button>` : '' )+`</td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-contacto"]').append(html);
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_documento"]').val(data.id_documento);

    },

    quitar_contacto: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    contacto_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-contacto"] tr').each(function(){
           
            let item = {

                id : $(this).find('input[data-name="id"]').val(),
                nombre : $(this).find('input[data-name="nombre"]').val(),
                telefono : $(this).find('input[data-name="telefono"]').val(),
                email : $(this).find('input[data-name="email"]').val(),
                otros : $(this).find('input[data-name="otros"]').val(),
                id_documento : $(this).find('select[data-name="id_documento"]').val(),
                numero_documento : $(this).find('input[data-name="numero_documento"]').val(),

            };
  
            detalle.push(item);
        });

        return detalle;
    },
    
    buscar_numero: async function() {

        let form = DOM.find('form[name="save"]');
        let ladda = HELPER.ladda(DOM_ID+' button[name="buscar_numero"]');

        /** BUSQUEDA INTERNO */
        await axios.get(BASE_API + 'configuracion/socio/buscar?numero='+form.find('input[name="numero_documento"]').val())
        .then(async function (response) {

            let fl_buscar = true;

            if(response.data != '')
            {
                let opcion = confirm("El cliente o proveedor ya existe, ¿Desea buscar nuevamente los datos en SUNAT/RENIEC?");
                if (opcion != true) {
                    fl_buscar = false;
                    ladda.stop();
                }                 
            }
            
            if(fl_buscar == true)
            {
                /*** BUSQUEDA EN SUNAT */
                await axios.get(BASE_API + 'recursos/busqueda/reniec_sunat?numero='+form.find('input[name="numero_documento"]').val())
                .then(function (response) {

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'RUC')
                    {
                        form.find('input[name="razon_social"]').val(response.data.razon_social);
                        form.find('select[name="id_ubigeo"]').html('')
                        .append(new Option(response.data.ubigeo, response.data.ubigeo));
                        
                        form.find('label[name="condicion"]').text(response.data.condicion);

                        if(response.data.condicion == 'HABIDO')
                        {
                            form.find('label[name="condicion"]').css('color', 'green');
                        }
                        else
                        {
                            form.find('label[name="condicion"]').css('color', 'red');
                        }
                        
                        

                    }

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'DNI')
                    {
                        form.find('input[name="razon_social"]').val(response.data.nombre+ ' '+response.data.apellido);
                        form.find('label[name="condicion"]').text('');
                    }
                    
                    form.find('input[name="direccion"]').val(response.data.direccion);  

                    ladda.stop();
                }).catch(error => {
                    console.log(error);
                    ladda.stop();
                }); 
            }

        }).catch(error => {
            console.log(error);
            ladda.stop();
        }); 


        
    },

    select_documento_entidad: async () =>
    {
        let select = DOM.find('select[data-select="DOCUMENTO_ENTIDAD"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'recursos/data_static/documento_entidad')
        .then(function (response) {
            Componente.array_documento = response.data;
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 
    },
    
    select_ubigeo: async () =>
    {
        DOM.find('select[data-select="UBIGEO"]').select2({
            ajax: {
              url: BASE_API+'recursos/data_static/ubigeo',
              dataType: 'json',
              delay: 250,
              data: function(params) {
                return {buscar:params.term};
              },
              processResults: function(data, params) {      
                return {results: data};
              },
              cache: true,
            },
            escapeMarkup: function(markup) {
              return markup;
            },
            placeholder: "Departamento - Provincia - Distrito",
            minimumInputLength: 3,
            allowClear: true,
            language: {
              inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
              }
            }
        });
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:{
                url:BASE_API + 'configuracion/socio',
                data: function(d)
                {
                    if(Componente.tipo == 'cliente')
                    {
                        d.fl_cliente = true;
                    }
                    else if(Componente.tipo == 'proveedor')
                    {
                        d.fl_proveedor = true;
                    }
                    
                }
            },
            lengthChange:true,
            paginate: true,
            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:120px;">
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
                { title: 'TIPO', mData: 'tipo' },
                { title: 'DOCUMENTO', render: function(data, type, row) { return row.documento+' '+row.numero_documento; } },
                { title: 'RAZÓN SOCIAL', mData: 'razon_social' },
                { title: 'DIRECCIÓN', mData: 'direccion' },
                { title: 'EMAIL', mData: 'email' },
                { title: 'ENCARGADO', mData: 'persona_encargado' },
                { title: 'CONTACTOS', render: function(data, type, row) { 

                    let html = '<table class="table" style="margin:0; background-color:transparent !important;">';
                    row.contactos.forEach(row => {

                        html += `<tr>
                            <td>`+row.nombre+`</td>
                            <td>`+row.telefono+`</td>
                            <td>`+row.email+`</td>
                        </tr>`;
                        
                    });

                    html += `</table>`;

                    return html
                    } 
                },
            ]
        });

    },

    new: async function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo');

        

        /** DATA */
        HELPER.reset_form(form);

        await Componente.change_fl_email_enviar();
        await Componente.change_fl_sms_enviar();

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('tbody[name="detalle-contacto"').html('');
        DOM.find('tbody[name="detalle-direccion"').html('');

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async function(row = null, data_busqueda = null, id_socio = null) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('tbody[name="detalle-contacto"').html('');
        DOM.find('tbody[name="detalle-direccion"').html('');

        

        let data = null;

        if(id_socio == null)
        {
            if(data_busqueda == null)
            {
                data = HELPER.get_attr_json(row);
            }
            else
            {
                data = data_busqueda;
            } 
        }
        else
        {
            await axios.get(BASE_API+'configuracion/socio/buscar?id_socio='+id_socio)
            .then(async function (response) {
                data = response.data;
            }).catch(error => {
                console.log(error);
            }); 
        }

        form.find('select[name="id_documento"]').val(data.id_documento).change();
        form.find('input[name="numero_documento"]').val(data.numero_documento);
        form.find('input[name="razon_social"]').val(data.razon_social);
        form.find('input[name="direccion"]').val(data.direccion);
        form.find('input[name="telefono"]').val(data.telefono);
        form.find('input[name="persona_encargado"]').val(data.persona_encargado);
        form.find('input[name="email"]').val(data.email);
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        form.find('select[name="tipo"]').val(data.tipo).change();

        form.find('input[name="fl_email_enviar"]').prop('checked', parseInt(data.fl_email_enviar));
        form.find('input[name="email_enviar"]').val(data.email_enviar);
        form.find('input[name="fl_sms_enviar"]').prop('checked', parseInt(data.fl_sms_enviar));
        form.find('input[name="sms_enviar"]').val(data.sms_enviar);

        
        if(data.id_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.ubigeo, data.id_ubigeo));
        }

        data.cuentas_bancarias.forEach(row => {
            Cuenta_bancaria.agregar(row);
        });

        data.contactos.forEach(row => {
            Componente.agregar_contacto(row);
        });

        data.direcciones.forEach(row => {
            Componente.agregar_direccion(row);
        });

        await Componente.change_fl_email_enviar();
        await Componente.change_fl_sms_enviar();

        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }

        formData.append('detalle_cuenta_bancaria', JSON.stringify(Cuenta_bancaria.get_datajson()));
        formData.append('detalle_contacto', JSON.stringify(Componente.contacto_json()));
        formData.append('detalle_direccion', JSON.stringify(Componente.direccion_json()));

        if(Componente.tipo == 'cliente')
        {
            formData.append('fl_cliente', 1);
        }

        if(Componente.tipo == 'proveedor')
        {
            formData.append('fl_proveedor', 1);
        }
        

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/socio/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            if(Componente.parent_comp == false)
            {
                Componente.table.ajax.reload(null, false);
            }
            else
            {
                Componente.parent_comp(response.data.socio);
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