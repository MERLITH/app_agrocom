
import Cuenta_bancaria from '../recursivo/Cuenta_bancaria.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Personal
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
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Datos 1</a></li>
                                        <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Datos 2</a></li>
                                        <li class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">Datos 3</a></li>
                                        <li class=""><a href="#tab_cuenta_bancaria" data-toggle="tab" aria-expanded="false">Cuentas Bancarias</a></li>
                                        <li class=""><a href="#tab_4" data-toggle="tab" aria-expanded="false">Datos 4</a></li>
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
                                                        <div class="col-md-12" align="center">
                                                            <div>
                                                                <img name="imagen_firma" style="max-width:100%;" class="img_rectangle">
                                                            </div>
                                                            <div>
                                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                                    <i class="fa fa-search"></i> Firma Virtual
                                                                    <input type="file" name="imagen_firma" style="display:none;">
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label class="form-label">Tipo de Personal <span class="text-danger">(*)</span></label>
                                                                <div class="form-group">
                                                                    <select name="tipo_personal" class="form-control select">
                                                                        <option value="">Seleccione...</option>
                                                                        <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                                                        <option value="CONDUCTOR">CONDUCTOR</option>
                                                                        <option value="COTIZADOR">COTIZADOR</option>
                                                                        <option value="ESTIBADOR">ESTIBADOR</option>
                                                                    </select>
                                                                </div>                              
                                                            </div>
                                                        </div>                              
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label class="form-label">Documento <b class="text-danger">*</b>
                                                                <select data-select="DOCUMENTO_ENTIDAD" name="id_documento"class="form-control select"></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label class="form-label">Número DOc. <b class="text-danger">*</b></label>
                                                            <div class="input-group">
                                                                <input type="number" name="numero_documento" class="form-control" autocomplete="off">
                                                                <span class="input-group-btn">
                                                                <button type="button" name="buscar_numero" class="btn btn-primary" data-style="zoom-in">
                                                                    <i class="fa fa-search"></i>
                                                                </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Nombres <b class="text-danger">*</b></label>
                                                                <input type="text" name="nombre" class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Apellidos <b class="text-danger">*</b>
                                                                <input type="text" name="apellido" class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label class="form-label">Tipo Contratación <b class="text-danger">*</b></label>
                                                                <div class="form-group">
                                                                    <select name="tipo_contratacion" class="form-control select2">
                                                                        <option value="">Seleccione...</optipn>    
                                                                        <option value="DIRECTA">DIRECTA</optipn>
                                                                        <option value="TERCERO">TERCERO</optipn>
                                                                    </select>
                                                                </div>                              
                                                            </div>
                                                        </div>   
                                                        <div class="col-md-9">
                                                            <div class="form-group">
                                                                <label class="form-label">Dirección</label>
                                                                <input type="text" name="direccion" class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label class="form-label">UBIGEO - (Departamento - Provincia - Distrito)</label>
                                                                <div class="form-group">
                                                                <select data-select="UBIGEO" name="id_ubigeo" class="form-control select2"></select>
                                                                </div>                              
                                                            </div>
                                                        </div>            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class="tab-pane" id="tab_2">
                                            <div class="row">
                                                <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Modalidad de Contrato </label>
                                                    <select name="modalidad_contrato" class="form-control select2">
                                                        <option value="">Seleccione...</option>
                                                        <option value="POR INICIO O INCREMENTO DE ACTIVIDAD">POR INICIO O INCREMENTO DE ACTIVIDAD</option>
                                                        <option value="POR NECESIDAD DE MERCADO">POR NECESIDAD DE MERCADO</option>
                                                        <option value="POR RECONVERSIÓN EMPRESARIAL">POR RECONVERSIÓN EMPRESARIAL</option>
                                                        <option value="OCASIONAL">OCASIONAL</option>
                                                        <option value="DE SUPLENCIA">DE SUPLENCIA</option>
                                                        <option value="DE EMERGENCIA">DE EMERGENCIA</option>
                                                        <option value="POR OBRA DETERMINADA O SERVICIO ESPECÍFICO">POR OBRA DETERMINADA O SERVICIO ESPECÍFICO</option>
                                                        <option value="INTERMITENTE">INTERMITENTE</option>
                                                        <option value="DE TEMPORADA">DE TEMPORADA</option>
                                                        <option value="CONTRATACIÓN INDETERMINADO">CONTRATACIÓN INDETERMINADO</option>
                                                    </select>
                                                </div>
                                                </div>
                                                <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Género </label>
                                                    <select name="genero"  class="form-control select2">
                                                        <option value="">Seleccione...</option>
                                                        <option value="MASCULINO">MASCULINO</option>
                                                        <option value="FEMENINO">FEMENINO</option>
                                                    </select>
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Teléfono</label>
                                                    <input type="text" name="telefono" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Nº Lic. de Conducir <b class="text-danger">*</b></label>
                                                    <input type="text" name="numero_licencia" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Cat. Lic. de Conducir <b class="text-danger">*</b></label>
                                                        <div class="form-group">
                                                        <input type="text" name="categoria_licencia"  class="form-control" list="list-categoria_licencia">
                                                        <datalist id="list-categoria_licencia">
                                                            <option value="A-I"/>
                                                            <option value="A-IIa"/>
                                                            <option value="A-IIb"/>
                                                            <option value="A-IIIa"/>
                                                            <option value="A-IIIb"/>
                                                            <option value="A-IIIc"/>
                                                            <option value="B-I"/>
                                                            <option value="B-IIa"/>
                                                            <option value="B-IIb"/>
                                                            <option value="B-IIc"/>
                                                            <option value="B-I"/>            
                                                        </datalist> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">2DA Cat. Lic. de Conducir </label>
                                                        <div class="form-group">
                                                        <input type="text" name="categoria_licencia_2da"  class="form-control" list="list-categoria_licencia_2da">
                                                        <datalist id="list-categoria_licencia_2da">
                                                            <option value="A-IV"/>    
                                                        </datalist> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                <div class="form-group">
                                                    <label class="form-label">Proveedor </label>
                                                    <select data-select="PROVEEDOR" name="id_proveedor" class="form-control select2"></select>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class="tab-pane" id="tab_3">
                                            <div class="row">
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Fecha de Nacimiento </label>
                                                    <input type="date" name="fecha_nacimiento" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Fecha de Ingreso </label>
                                                    <input type="date" name="fecha_ingreso" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Fecha de Planilla </label>
                                                    <input type="date" name="fecha_planilla" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Fecha de Salida </label>
                                                    <input type="date" name="fecha_salida" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Sueldo Básico </label>
                                                    <input type="number" step="any" name="sueldo_basico" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Sueldo Variable </label>
                                                    <input type="number" step="any" name="sueldo_variable" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Sueldo Interno </label>
                                                    <input type="number" step="any" name="sueldo_interno" class="form-control" autocomplete="off">
                                                </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label class="form-label">Nº Seguro </label>
                                                        <input type="text" name="numero_seguro" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Seguro complementario de trabajo y riesgo</label>
                                                        <input type="text" name="seguro_com_trabajo_riesgo" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Seguro de salud</label>
                                                        <input type="text" name="seguro_salud" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Seguro vida ley</label>
                                                        <input type="text" name="seguro_vidaley" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>               
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab_cuenta_bancaria">
                                            <div class="row">
                                                <div class="col-md-12">`+Cuenta_bancaria.render()+`</div>
                                            </div>
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class="tab-pane" id="tab_4">
                                            <datalist id="list-check_sino">
                                                <option value="SI" />
                                                <option value="NO" />
                                            </datalist>
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label class="form-label">Cliente</label>
                                                        <select data-select="CLIENTE" name="id_cliente" class="form-control"></select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Código SAP</label>
                                                        <input type="text" name="codigo_sap" class="form-control" autocomplete="off" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">PAIS</label>
                                                        <input type="text" name="pais" class="form-control" autocomplete="off" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Filtro Security</label>
                                                        <input type="text" name="filtro_security" class="form-control" autocomplete="off" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Vigencia Filtro</label>
                                                        <input type="text" name="vigencia_filtro" class="form-control" autocomplete="off" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Foto Check</label>
                                                        <input type="text" name="fotocheck" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Licencia Interna</label>
                                                        <input type="text" name="licencia_interna" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Hazmat I</label>
                                                        <input type="text" name="hazmati" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Hazmat II</label>
                                                        <input type="text" name="hazmatii" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Capacitación MTC</label>
                                                        <input type="text" name="capacitacion_mtc" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Certificado Primeros Auxilios</label>
                                                        <input type="text" name="certi_prim_auxilio" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Certificado Manejo Defensivo</label>
                                                        <input type="text" name="certi_man_defensivo" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Certificado Manejo Extintores</label>
                                                        <input type="text" name="certi_man_extintor" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Portuaria Seguridad</label>
                                                        <input type="text" name="portuaria_seguridad" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Protección Portuaria</label>
                                                        <input type="text" name="proteccion_portuaria" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Curriculum</label>
                                                        <input type="text" name="curriculum" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Record</label>
                                                        <input type="text" name="record" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Otros</label>
                                                        <input type="text" name="otro" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Antecedentes Policiales</label>
                                                        <input type="text" name="antecedente_policial" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Antecedentes Penales</label>
                                                        <input type="text" name="antecedente_penal" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Trabajo en Altura</label>
                                                        <input type="text" name="trabajo_altura" class="form-control" autocomplete="off" list="list-check_sino" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Status/Observación</label>
                                                        <input type="text" name="observacion" class="form-control" autocomplete="off" />
                                                    </div>
                                                </div>
                                                              
                                            </div>
                                        </div>
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

        await Cuenta_bancaria.after_render();
        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                tipo_personal: {required: true},
                id_documento: {required: true},
                numero_documento: {required: true},
                nombre: {required: true},
                apellido: {required: true},
                tipo_contratacion: {required: true},
                id_proveedor: {required: true},
                numero_licencia: {required:true},
                categoria_licencia: {required:true}
            },
          
            messages: {
                tipo_personal: 'Tipo de Personal',
                id_documento: 'Documento',
                numero_documento: 'Número de Documento',
                nombre: 'Nombre',
                apellido: 'Apellidos',
                tipo_contratacion: 'Tipo de Contratación',
                id_proveedor: 'Proveedor',
                numero_licencia: 'Número de Licencia de Conducir',
                categoria_licencia: 'Categoria de Licencia de Conducir'
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
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

         /* PREVIEW IMAGEN FIRMA */
         DOM.find('input[name="imagen_firma"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen_firma"]'));
        });

        /* CHANGE TIPO CONTRATACION */
        DOM.on('change', 'select[name="tipo_contratacion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_contratacion();
        });

        /* CHANGE TIPO PERSONAL */
        DOM.on('change', 'select[name="tipo_personal"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_personal();
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

        Componente.datatable();
        Componente.select_documento_entidad();
        Componente.select_proveedor();
        Componente.select_cliente();
        Componente.select_ubigeo();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    imagen_firma_anterior: null,

    /************ */

    change_tipo_personal: () => {

        let form = DOM.find('form[name="save"]');

        let form_validation = form.validate().settings;

        let value = form.find('select[name="tipo_personal"]').val();

        if(value == 'CONDUCTOR')
        {
            $.extend(true, form_validation, {
                rules: {
                    numero_licencia: {required:true},
                    categoria_licencia: {required:true},
                },
            });
        }
        else
        {
            $.extend(true, form_validation, {
                rules: {
                    numero_licencia: {required:false},
                    categoria_licencia: {required:false},
                },
            });
        }

    },

    buscar_numero: function() {

        let form = DOM.find('form[name="save"]');
        let ladda = HELPER.ladda(DOM_ID+' button[name="buscar_numero"]');

        axios.get(BASE_API + 'recursos/busqueda/reniec_sunat?numero='+form.find('input[name="numero_documento"]').val())
        .then(function (response) {

            if(DOM.find('select[name="id_documento"] option:selected').text() == 'RUC')
            {
                form.find('input[name="nombre"]').val(response.data.razon_social);
            }

            if(DOM.find('select[name="id_documento"] option:selected').text() == 'DNI')
            {
                form.find('input[name="nombre"]').val(response.data.nombre);
                form.find('input[name="apellido"]').val(response.data.apellido);
            }
            
            form.find('input[name="direccion"]').val(response.data.direccion);  

            ladda.stop();
        }).catch(error => {
            console.log(error);
            ladda.stop();
        }); 
    },

    change_tipo_contratacion: () => {

        let form = DOM.find('form[name="save"]');

        let value = form.find('select[name="tipo_contratacion"]').val();

        let form_validation = form.validate().settings;

        if(value == 'TERCERO')
        {
            
            form.find('input[name="direccion"]').prop("disabled", true);
            form.find('input[name="fecha_ingreso"]').prop("disabled", true);
            form.find('input[name="fecha_planilla"]').prop("disabled", true);
            form.find('input[name="fecha_salida"]').prop("disabled", true);
            form.find('input[name="sueldo_basico"]').prop("disabled", true);
            form.find('input[name="sueldo_variable"]').prop("disabled", true);
            form.find('input[name="sueldo_interno"]').prop("disabled", true);
            form.find('input[name="numero_seguro"]').prop("disabled", true);

            form.find('select[name="id_ubigeo"]').prop('disabled', true);
            form.find('select[name="modalidad_contrato"]').prop('disabled', true);
            form.find('select[name="genero"]').prop('disabled', true);

            form.find('select[name="id_proveedor"]').prop('disabled', false);
        }
        else
        {
            form.find('input[name="direccion"]').prop("disabled", false);
            form.find('input[name="fecha_ingreso"]').prop("disabled", false);
            form.find('input[name="fecha_planilla"]').prop("disabled", false);
            form.find('input[name="fecha_salida"]').prop("disabled", false);
            form.find('input[name="sueldo_basico"]').prop("disabled", false);
            form.find('input[name="sueldo_variable"]').prop("disabled", false);
            form.find('input[name="sueldo_interno"]').prop("disabled", false);
            form.find('input[name="numero_seguro"]').prop("disabled", false);

            form.find('select[name="id_ubigeo"]').prop('disabled', false);
            form.find('select[name="modalidad_contrato"]').prop('disabled', false);
            form.find('select[name="genero"]').prop('disabled', false);

            form.find('select[name="id_proveedor"]').prop('disabled', true);
        }
    },

    select_documento_entidad: async () =>
    {
        let select = DOM.find('select[data-select="DOCUMENTO_ENTIDAD"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'recursos/data_static/documento_entidad')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_cliente: async () => {

        DOM.find('select[data-select="CLIENTE"]').select2({
            ajax: {
              url: BASE_API + "configuracion/socio/get_select?fl_cliente=true",
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
            placeholder: "Buscar Razón Social o Número de Documento",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    select_proveedor: async () => {

        DOM.find('select[data-select="PROVEEDOR"]').select2({
            ajax: {
              url: BASE_API + "configuracion/socio/get_select?fl_proveedor=true",
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
            placeholder: "Buscar Razón Social o Número de Documento",
            minimumInputLength: 6,
            allowClear:true
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
            ajax:BASE_API + 'configuracion/personal',

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
                { title: 'TIPO PERSONAL', mData: 'tipo_personal' },
                { title: 'DOCUMENTO', render: function(data, type, row) { return row.documento+' '+row.numero_documento; } },
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'APELLIDO', mData: 'apellido' },
                { title: 'DIRECCIÓN', mData: 'direccion' },
                { title: 'TELÉFONO', mData: 'telefono' },
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

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Personal');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        form.find('img[name="imagen_firma"]').attr('src', '');

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Personal');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');

        let data = HELPER.get_attr_json(row);

        form.find('select[name="tipo_personal"]').val(data.tipo_personal).change();
        form.find('select[name="id_documento"]').val(data.id_documento).change();
        form.find('input[name="numero_documento"]').val(data.numero_documento);
        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="apellido"]').val(data.apellido);
        form.find('input[name="direccion"]').val(data.direccion);
        form.find('select[name="tipo_contratacion"]').val(data.tipo_contratacion).change();
        form.find('select[name="modalidad_contrato"]').val(data.modalidad_contrato).change();
        form.find('select[name="genero"]').val(data.genero).change();
        form.find('input[name="telefono"]').val(data.telefono);
        form.find('input[name="numero_licencia"]').val(data.numero_licencia);
        form.find('input[name="categoria_licencia"]').val(data.categoria_licencia);
        form.find('input[name="categoria_licencia_2da"]').val(data.categoria_licencia_2da);
        form.find('select[name="id_proveedor"]').val(data.id_proveedor).change();
        form.find('input[name="fecha_nacimiento"]').val(data.fecha_nacimiento);
        form.find('input[name="fecha_ingreso"]').val(data.fecha_ingreso);
        form.find('input[name="fecha_planilla"]').val(data.fecha_planilla);
        form.find('input[name="fecha_salida"]').val(data.fecha_salida);
        form.find('input[name="sueldo_basico"]').val(data.sueldo_basico);
        form.find('input[name="sueldo_variable"]').val(data.sueldo_variable);
        form.find('input[name="sueldo_interno"]').val(data.sueldo_interno);
        form.find('input[name="numero_seguro"]').val(data.numero_seguro);
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        form.find('input[name="seguro_com_trabajo_riesgo"]').val(data.seguro_com_trabajo_riesgo);
        form.find('input[name="seguro_salud"]').val(data.seguro_salud);
        form.find('input[name="seguro_vidaley"]').val(data.seguro_vidaley);

        form.find('input[name="codigo_sap"]').val(data.codigo_sap);
        form.find('input[name="pais"]').val(data.pais);
        form.find('input[name="filtro_security"]').val(data.filtro_security);
        form.find('input[name="vigencia_filtro"]').val(data.vigencia_filtro);
        form.find('input[name="fotocheck"]').val(data.fotocheck);
        form.find('input[name="licencia_interna"]').val(data.licencia_interna);
        form.find('input[name="hazmati"]').val(data.hazmati);
        form.find('input[name="hazmatii"]').val(data.hazmatii);
        form.find('input[name="capacitacion_mtc"]').val(data.capacitacion_mtc);
        form.find('input[name="certi_prim_auxilio"]').val(data.certi_prim_auxilio);
        form.find('input[name="certi_man_defensivo"]').val(data.certi_man_defensivo);
        form.find('input[name="certi_man_extintor"]').val(data.certi_man_extintor);
        form.find('input[name="portuaria_seguridad"]').val(data.portuaria_seguridad);
        form.find('input[name="proteccion_portuaria"]').val(data.proteccion_portuaria);
        form.find('input[name="curriculum"]').val(data.curriculum);
        form.find('input[name="record"]').val(data.record);
        form.find('input[name="otro"]').val(data.otro);
        form.find('input[name="antecedente_policial"]').val(data.antecedente_policial);
        form.find('input[name="antecedente_penal"]').val(data.antecedente_penal);
        form.find('input[name="trabajo_altura"]').val(data.trabajo_altura);
        form.find('input[name="observacion"]').val(data.observacion);

        form.find('img[name="imagen_firma"]').attr('src', BASE_FILES+'images/'+data.imagen_firma);

        if(data.id_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.ubigeo, data.id_ubigeo));
        }

        if(data.id_cliente != null)
        {
            form.find('select[name="id_cliente"]').html('')
            .append(new Option(data.cliente, data.id_cliente));
        }

        if(data.id_proveedor != null)
        {
            form.find('select[name="id_proveedor"]').html('')
            .append(new Option(data.proveedor, data.id_proveedor));
        }


        data.cuentas_bancarias.forEach(row => {
            Cuenta_bancaria.agregar(row);
        });

        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;
        this.imagen_firma_anterior = data.imagen_firma;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Personal');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        this.imagen_anterior = data.imagen;
        this.imagen_firma_anterior = data.imagen_firma;


        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        if (this.imagen_firma_anterior != null) { formData.append('imagen_firma_anterior', this.imagen_firma_anterior); }

        formData.append('detalle_cuenta_bancaria', JSON.stringify(Cuenta_bancaria.get_datajson()));

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/personal/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;