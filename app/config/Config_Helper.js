var SMLog = false;

(function ($) {

    $.ModalSM = function (objModal){

        objModal.idContenedor = objModal.idContenedor ? objModal.idContenedor : 'body';  
        objModal.size = objModal.size ? objModal.size : 2;
        objModal.cHtml = objModal.cHtml ? objModal.cHtml : '';  
        objModal.header = objModal.header ? objModal.header : 0;
        objModal.titulo = objModal.titulo ? objModal.titulo : '';
        objModal.iconoTitulo = objModal.iconoTitulo ? objModal.iconoTitulo : '';
        objModal.nameModal = objModal.nameModal ? ('name="' +objModal.nameModal+'"') : '';
        objModal.position = objModal.position ? objModal.position : 1;
        objModal.noCerrarModal = objModal.noCerrarModal ? objModal.noCerrarModal : 0;
        objModal.buttonCerrar = objModal.buttonCerrar ? objModal.buttonCerrar : 0;  
        objModal.animation = objModal.animation ? objModal.animation : 'animate__animated animate__bounceInDown';
        objModal.borderBody = objModal.borderBody ? objModal.borderBody : 'custom-option custom-option-icon checked';
        objModal.scroll = objModal.scroll ? objModal.scroll : 0;
        
        var randomnumber = (1 + Math.floor(Math.random() * 1000));
        var idmodal = "modalSM-"+randomnumber;
        var cSize = '';

        if (objModal.size == 4) {
            cSize = 'modal-xxl';
        } else if (objModal.size == 3) {
            cSize = 'modal-xl';
        } else if (objModal.size == 2) {
            cSize = 'modal-lg';
        } else {
            cSize = 'modal-sm';
        }

        var cPosition = '';
        if (objModal.position == 1) {
            cPosition = '';
        } else {
            cPosition = 'modal-dialog-centered';
        } 

        var cScroll = '';
        if (objModal.scroll == 1) {
            cScroll = 'modal-dialog-scrollable';
        } else {
            cScroll = '';
        } 

        var htmlModal = `<div class="modal `+objModal.animation+`" `+objModal.nameModal+' '+(objModal.noCerrarModal == 1 ? 'data-bs-backdrop="static" data-bs-keyboard="false"' : '')+` id="`+idmodal+`" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog `+cPosition + ' ' + cScroll + ' ' +cSize+`">
                                <div class="modal-content p-0">`
                                    if(objModal.header == 1) {  
                                    htmlModal +=
                                    `<div class="modal-header  bg-label-primary pt-2 pb-2">
                                            <p class="modal-title fw-semibold fs-5"><i class="`+objModal.iconoTitulo+` me-1"></i> `+objModal.titulo+`</p>
                                            `+(objModal.buttonCerrar == 1 ? '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' : '')+
                                    `</div>`;
                                    }
                                   htmlModal +=
                                   `<div class="modal-body p-3">
                                        <div class="`+objModal.borderBody+` p-2" id="container_modal_sm_`+randomnumber+`">
                                            `+objModal.cHtml+`
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $(objModal.idContenedor).append(htmlModal);
        $('#'+idmodal).modal('show');

        if (objModal.noCerrarModal == 1){
            if (objModal.buttonCerrar == 0){
                $('#'+idmodal + ' .btn-close').remove();
            }
        }
        var modal = $("#" + idmodal);
        modal.off('click');
        modal.on('hidden.bs.modal', function (e) {
            // Esta función se ejecutará cuando se cierre el modal
            $(this).remove(); // Elimina el modal del DOM
        });
        /** fin */
        return randomnumber;
    }

    $.select2 = function (vlue = 'select2', placeholder) {

        const select2 = (vlue == 'select2' ? $('.select2'): $(vlue));
        if (select2.length) {

            if (select2.find('option').length > 0) {
                select2.each(function () {
                    var $this = $(this);
                    select2Focus($this);
                    $this.wrap('<div class="position-relative w-100"></div>').select2({
                        placeholder: placeholder,
                        dropdownParent: $this.parent(),
                        allowClear: true,
                    });
                });
            }
            else {
                select2.select2({
                    placeholder: "<< No existe datos >>",
                    allowClear: false,
                    width: 'resolve'
                });
            }

        }
    }

    // $.select_render = async function (ruta, idcombo) {

    //     let select = $(idcombo);     
    //     select.empty();  
    //     select.append($('<option></option>').attr('value', '').text(''));

    //     await axios.get(BASE_API + ruta)
    //     .then(function (response) {

    //         response.data.forEach(row => {
    //             select.append('<option value="'+row.id+'">'+row.text+'</option>');
    //         });

    //         $.select2(idcombo);
    //     }).catch(error => {
    //         console.log(error);
    //     });

    // }

    $.select_render = async function (ruta, idcombo, seleccionarPrimero = 0, placeholder = '[ -Seleccione- ]') {
        let select = $(idcombo);
        select.empty();
        select.append($('<option></option>').attr('value', '').text(''));
    
        await axios.get(BASE_API + ruta)
            .then(function (response) {
                let firstValue = null;
    
                response.data.forEach((row, index) => {
                    select.append('<option value="' + row.id + '">' + row.text + '</option>');
                    if (index === 0) {
                        firstValue = row.id;
                    }
                });
    
                // Si seleccionarPrimero es 1, seleccionar el primer registro
                if (seleccionarPrimero === 1 && firstValue !== null) {
                    select.val(firstValue).trigger('change');
                }
    
                $.select2(idcombo, placeholder);
            })
            .catch(error => {
                console.log(error);
            });
    };
    

    $.select2_buscar = async function (classSelect, urlB, pHolder, minBusqueda = 3, tipo = 1) {

        const select2 = (tipo == 1 ? $('.' + classSelect): $(classSelect));
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                select2Focus($this);
                $this.wrap('<div class="position-relative w-100"></div>').select2({
                    ajax: {
                        url: urlB,
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
                    dropdownParent: $this.parent(),
                    allowClear: true,
                    placeholder: pHolder,
                    minimumInputLength: minBusqueda,
                    language: {
                        inputTooShort: function () {
                        return "Por favor ingrese " + minBusqueda + " o más caracteres";
                        }
                    }
                });
            });
        }
        
    }

    $.select2_buscar_v2 = async function (classSelect, urlB, pHolder, minBusqueda = 3, tipo = 1) {
        const select2 = (tipo == 1 ? $(classSelect) : $('.' + classSelect));
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                select2Focus($this);
                $this.select2({
                    ajax: {
                        url: BASE_API + urlB,
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            return { buscar: params.term };
                        },
                        processResults: function (data, params) {
                            return { results: data };
                        },
                        cache: true,
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    allowClear: true,
                    placeholder: pHolder,
                    minimumInputLength: minBusqueda,
                    language: {
                        inputTooShort: function () {
                            return "Por favor ingrese " + minBusqueda + " o más caracteres";
                        }
                    },
                    width: 'resolve', // Asegura que el select2 ocupe todo el ancho disponible
                    dropdownParent: $this.parent() // Si necesitas que el dropdown aparezca en un lugar específico
                });
            });
        }
        
    }

    $.selectpicker = function () {
        const selectPicker = $('.selectpicker');
        if (selectPicker.length) {
            selectPicker.selectpicker();
        }
    }

    $.select2icons = function () {
        const select2Icons = $('.select2-icons');
        if (select2Icons.length) {
            // custom template to render icons
            function renderIcons(option) {
              if (!option.id) {
                return option.text;
              }
              var $icon = "<i class='" + $(option.element).data('icon') + " me-2'></i>" + option.text;
        
              return $icon;
            }
            select2Focus(select2Icons);
            select2Icons.wrap('<div class="position-relative w-100"></div>').select2({
              templateResult: renderIcons,
              templateSelection: renderIcons,
              escapeMarkup: function (es) {
                return es;
              }
            });
        }
    }

    // $.flatpickr_date = function (vlue = 'flatpickr_date') { 
    //     const flatpickr_date = (vlue == 'flatpickr_date' ? $('.flatpickr_date'): $(vlue));
    //     if (flatpickr_date.length) {
    //         flatpickr_date.unwrap('.flatpickr-wrapper');
    //         flatpickr_date.next('.calendar-icon').remove();    
    //         flatpickr_date.wrap('<div class="flatpickr-wrapper" style="position: relative; display: inline-block;width: 100%;padding-top:1px;"></div>');
    //         flatpickr_date.after('<span class="calendar-icon" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"><span class="mdi mdi-calendar-month"></span></span>');
    //         flatpickr_date.attr('placeholder', 'dd/mm/aaaa');
    //         flatpickr_date.flatpickr({
    //             //defaultDate: "today",
    //             dateFormat: 'Y-m-d',
    //             altFormat: "d/m/Y",
    //             altInput: true,
    //             monthSelectorType: 'static',
    //             locale: {
    //                 firstDayOfWeek: 1,
    //                 weekdays: {
    //                     shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    //                     longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    //                 },
    //                 months: {
    //                     shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
    //                     longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //                 },
    //             },
    //         });
    //         $('.calendar-icon').on('click', function() {
    //             flatpickr_date[0]._flatpickr.open(); // Abre el calendario al hacer clic en el ícono
    //         });         
    //     }
    // }

    $.flatpickr_date = function (vlue = '.flatpickr_date') { 
        const flatpickr_date = (vlue == 'flatpickr_date' ? $('.flatpickr_date'): $(vlue));
        if (flatpickr_date.length) {
    
            flatpickr_date.each(function() {
                const $this = $(this);
    
                // Eliminar cualquier Flatpickr previamente inicializado y limpiar elementos duplicados
                if ($this[0]._flatpickr) {
                    $this[0]._flatpickr.destroy(); // Destruir la instancia de Flatpickr anterior
                }
    
                // Verificar si el input ya está envuelto en un wrapper y si ya tiene el ícono de calendario
                if (!$this.parent().hasClass('flatpickr-wrapper')) {
                    // Envolver en un contenedor si no existe
                    $this.wrap('<div class="flatpickr-wrapper" style="position: relative; display: inline-block;width: 100%;padding-top:1px;"></div>');
                }
    
                // Verificar si ya tiene el ícono, si no, lo agrega
                if ($this.siblings('.calendar-icon').length === 0) {
                    $this.after('<span class="calendar-icon" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"><span class="mdi mdi-calendar-month"></span></span>');
                }
    
                $this.attr('placeholder', 'dd/mm/aaaa');
                
                // Inicializar Flatpickr solo si no está ya inicializado
                if (!$this.hasClass('flatpickr-input')) {
                    $this.flatpickr({
                        dateFormat: 'Y-m-d',
                        altFormat: "d/m/Y",
                        altInput: true,
                        
                        monthSelectorType: 'static',
                        locale: {
                            firstDayOfWeek: 1,
                            weekdays: {
                                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                            },
                            months: {
                                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
                                longhand: ['Enero', 'Febrero', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                            },
                        },
                    });
                }
    
                $this.siblings('.calendar-icon').off('click').on('click', function() {
                    $this[0]._flatpickr.open();
                });
            });
        }
    };

    $.ftpickr_clear = function (input) {
         // Asegurarnos de que Flatpickr esté inicializado en este input
         if (input[0]._flatpickr) {
            input[0]._flatpickr.clear(); // Limpia tanto el input visible como el oculto
        } else {
            // En caso de que no esté inicializado por algún motivo
            input.val(''); // Limpiar manualmente
        }
    }

    $.ftpickr_set = function (input, valor) {
         // Asignar el valor correctamente usando Flatpickr
        var inputFecha = $(input);

        if (inputFecha[0]._flatpickr) {
            inputFecha[0]._flatpickr.setDate(valor, true); // Establece la fecha y actualiza el campo visible
        } else {
            inputFecha.val(valor); // Por si el input no tiene Flatpickr inicializado
        }
    }

    $.ftpickr_time = function () {

        let flatpickrTime = document.querySelectorAll('.flatpickr-time');

        if (flatpickrTime) {
            flatpickrTime.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }
    }


    $.inicializarToolTip = function () {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
          tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            tooltipTriggerEl.addEventListener('click', function () {
                const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
                if (tooltipInstance) {
                    tooltipInstance.hide(); // Oculta el tooltip después del clic
                }
            });
        });
    }
    
    $.inicializarPopover = function () {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    $.frmValidation = function (idform, objFields) {
        var form = document.getElementById(idform);
        if (form.length) {
            var submitButton = form.querySelector('[type="submit"]');
            var fv = FormValidation.formValidation(form, {
                fields: objFields,
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // fieldStatus: new FormValidation.plugins.FieldStatus({
                    //     onStatusChanged: function (areFieldsValid) {
                    //         areFieldsValid
                    //             ? submitButton.removeAttribute('disabled')
                    //             : submitButton.setAttribute('disabled', 'disabled');
                    //     }
                    // }),
                    bootstrap5: new FormValidation.plugins.Bootstrap5(), 
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                },
            });

            $.moveErrorContainerOutsideInputGroup();//estoy quitando la validacion dentro los input groups para ponerlo a fuera

            /****************** Aplicar clases de validación manualmente para select2 ****************/
            fv.on('core.field.valid', function(fieldName) {
                const element = document.querySelector(`[name="${fieldName}"]`);
                // Verificar si el campo es un Select2
                if ($(element).hasClass('select2-hidden-accessible')) {
                    // Aplicar las clases de validación a Select2
                    $.applySelect2Validation(element, true);
                }
            });

            fv.on('core.field.invalid', function(fieldName) {
                const element = document.querySelector(`[name="${fieldName}"]`);
                // Verificar si el campo es un Select2
                if ($(element).hasClass('select2-hidden-accessible')) {
                    $.applySelect2Validation(element, false);
                }
            });
            /****************** .fin Aplicar clases de validación manualmente para select2 ****************/

            return fv;
        }else{
            return null;
        }
    }

    $.moveErrorContainerOutsideInputGroup = function () {
        const inputGroups = document.querySelectorAll('.input-group');
        inputGroups.forEach(inputGroup => {
            const errorContainer = inputGroup.querySelector('.fv-plugins-message-container.invalid-feedback');
            if (errorContainer) {
                inputGroup.parentNode.insertBefore(errorContainer, inputGroup.nextSibling);
                errorContainer.innerHTML = '';
            }
        });
    }

    $.applySelect2Validation = function (element,isValid) {
        const $select2Container = $(element).next('.select2-container');

        if (isValid) {
            // Si es válido, agregar la clase 'is-valid' y remover 'is-invalid'
            $select2Container.removeClass('is-invalid').addClass('is-valid');
        } else {
            // Si es inválido, agregar la clase 'is-invalid' y remover 'is-valid'
            $select2Container.removeClass('is-valid').addClass('is-invalid');
        }
    }

    $.frmValidation_convertir_fields_simple = function (array) {
        const result = {};

        array.forEach(item => {
            const validatorObj = {
                validators: {
                    notEmpty: {
                        message: item.message,
                    },
                },
            };

            result[item.field] = validatorObj;
        });

        return JSON.parse(JSON.stringify(result));
    }

    $.cargar_constante = async function (cAccion, nConCodigo, nEstado) {

        let parametros = {
            cAccion : cAccion,
            nConCodigo : nConCodigo,
            nEstado : nEstado
        };

        var oRespuesta = [];

        await axios.get(BASE_API+'basic/Constante/get_constante_by_accion?'+jQuery.param(parametros))
        .then(function (response) {
            oRespuesta = response.data;
        }).catch(error => {
            console.log(error);
        }); 

        return oRespuesta;
    }

    $.getData = async function (url) {
        var oRespuesta = [];

        await axios.get(BASE_API+url)
        .then(function (response) {
            oRespuesta = response.data;
        }).catch(error => {
            console.log(error);
        }); 

        return oRespuesta;
    }

    $.postData = async function (url, data = {}) {
        let oRespuesta = [];

        await axios.post(BASE_API + url, data)
            .then(function (response) {
                oRespuesta = response.data;
            })
            .catch(error => {
                console.error('Error en $.postData:', error);
            });

        return oRespuesta;
    }

    $.fetchData = async function (method, url, data = {}) {

        const isGet = method.toLowerCase() === 'get';

        try {
            // let response = await axios({
            //     method: method,
            //     url: BASE_API + url,
            //     data: data
            // });


            let config = {
                method: method,
                url: BASE_API + url
            };

            if (method.toLowerCase() === 'get') {
                config.params = data;
            }

            if (method.toLowerCase() === 'post') {
                config.data = data;
            }

            let response = await axios(config);
            return response.data;
        } catch (error) {
            console.error(`Error en $.fetchData (${method}):`, error);
            return null;
        }

        // Entonces puedes hacer:
        // let respGet = await $.fetchData('get', 'publico/productos/get_productos');
        // let respPost = await $.fetchData('post', 'publico/productos/toggle_wishlist', { id_producto: 15 });
    }

    $.validarResp = function(data) {

        // Caso 1: null, undefined o error
        if (!data) {
            return { ok: false, tipo: 'nulo', mensaje: 'No hay datos' };
        }

        // Caso 2: es un array
        if (Array.isArray(data)) {
            if (data.length === 0) {
                return { ok: false, tipo: 'array_vacio', mensaje: 'El array está vacío' };
            } else {
                return { ok: true, tipo: 'array_lleno', mensaje: 'Array válido con datos', data };
            }
        }

        // Caso 3: es un objeto
        if (typeof data === 'object') {
            if (Object.keys(data).length === 0) {
                return { ok: false, tipo: 'objeto_vacio', mensaje: 'El objeto está vacío' };
            } else {
                return { ok: true, tipo: 'objeto_lleno', mensaje: 'Objeto válido con datos', data };
            }
        }

        // Caso 4: cualquier otra cosa inesperada
        return { ok: false, tipo: 'desconocido', mensaje: 'Formato de dato no reconocido' };
    }



    $.get_cantidades_Main = async function () {

        let objRes = await $.fetchData('get', 'inicio/main/get_cantidades_id', {});

        if (objRes) {

            $('.spn_cart').text(objRes.cantidad_cart);
            $('.spn_wishlist').text(objRes.cantidad_wishlist);

        }
    }


    /*
    $.cargar_constante = async function (cAccion, nConCodigo, nEstado) {

        let parametros = {
            cAccion : cAccion,
            nConCodigo : nConCodigo,
            nEstado : nEstado
        };

        try {
            let response = await axios.get(BASE_API+'basic/Constante/get_constante_by_accion?'+jQuery.param(parametros));
            return response.data;
        } catch (error) {         
            console.error(error);
            return null;
            //throw error;
        }
    }
    */
    $.frmValidationWhitTable = function (idform, objFields) {
        var form = document.getElementById(idform);
        if (form.length) {
            var submitButton = form.querySelector('[type="submit"]');
            var fv = FormValidation.formValidation(form, {
                fields: objFields,
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
                        rowSelector: function (field, element) {
                            if (element.closest('table')) {
                                return 'td';
                            } else {
                                return 'div';
                            }
                        },
                    }),  
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                },
            });

            return fv;
        }else{
            return null;
        }
    }
    
    $.debugger = function () {
        if (location.protocol == 'http:') {
            debugger;
        }
    }

    $.xmlEscape = function (string) {
        string = string.replace(/&/gi, "&amp;");
        string = string.replace(/</gi, "&lt;");
        string = string.replace(/>/gi, "&gt;");
        string = string.replace(/\\/gi, "&apos;");
        string = string.replace(/"/gi, "&quot;");
        string = string.replace(/'/gi, "´");
        //str_replace(['&', '<', '>', '\'', '"'], ['&amp;', '&lt;', '&gt;', '&apos;', '&quot;'], string)
        return string;
    }

    $.ObtenerHTTP = function () {
        if (SMLog) {
            return 'http://';
        } else {
            return 'https://';
        }
    }

    $.desabilitarEsc = function (e) {
        if ((e.which || e.keyCode) == 27) e.preventDefault();
    }

    $.subXML = function (data2, etiqueta) {
        var xml = '';
        xml += '<' + etiqueta + '>';
        $.each(data2, function (index, value) {
            xml += ((typeof value === 'object') ? $.subXML(value, index) : (Array.isArray(value) && value.length > 0 ? $.XML(value, index) : ('<' + index + '>' + value + '</' + index + '>')));
        })
        xml += '</' + etiqueta + '>';
        return xml;
    }

    $.FirstCapital = function (cTexto) {
        var arrayTexto = cTexto.split(' ');
        var textoReturn = '';
        for (let i = 0; i < arrayTexto.length; i++) {
            const element = arrayTexto[i];
            textoReturn += element[0].toUpperCase() + element.slice(1).toLocaleLowerCase() + ' ';
        }

        return textoReturn;
    }

    $.Lower = function (word) {
        return word.toLocaleLowerCase();
    }

    $.Capitalize = function (word) {

        if (word != undefined) {
            var arrayTexto = (word.slice(1).toLocaleLowerCase()).split(' ');
            var cTexto = '';

            for (var i = 0; i < arrayTexto.length; i++) {
                var elementTexto = arrayTexto[i];
                var cTextoDato = '';

                switch (elementTexto) {
                    case 'i':
                        cTextoDato = 'I';
                        break;
                    case 'ii':
                        cTextoDato = 'II';
                        break;
                    case 'iii':
                        cTextoDato = 'III';
                        break;
                    case 'iv':
                        cTextoDato = 'IV';
                        break;
                    case 'v':
                        cTextoDato = 'V';
                        break;
                    case 'vi':
                        cTextoDato = 'VI';
                        break;
                    case 'vii':
                        cTextoDato = 'VII';
                        break;
                    default:
                        cTextoDato = elementTexto;
                        break;
                }

                cTexto = cTexto + cTextoDato + (i == arrayTexto.length - 1 ? '' : ' ');

            }
            return word[0].toUpperCase() + cTexto;
        }
    }

    $.ReplaceP = function (word) {
        return ((word).replaceAll('<p>', '<span>')).replaceAll('</p>', '</span>');
    }

    $.SMBuildTag = function (arrOpciones) {
        var ArrTag = [];
        var htmlElement;
        $.each(arrOpciones, function (index, item) {
            htmlElement = $("<" + item.element + ">", item.properties);
            if (!$.isEmpty(item.onClick)) {
                $(htmlElement).click(function () {
                    item.onClick();
                    //alert("asdasd");
                })
            }

            if (!$.isEmpty(item.onBlur)) {
                $(htmlElement).blur(function () {
                    item.onBlur();
                    //console.log($(this).val());
                    //alert("asdasd");
                })
            }

            if (!$.isEmpty(item.onChange)) {
                $(htmlElement).change(function () {
                    item.onChange();
                    //console.log($(this).val());
                    //alert("asdasd");
                })
            }

            /*if(!$.isEmpty(item.eventos)){
                $.each(item.eventos,function(i22,in22){
                
                    htmlElement.on(i22,in22);
                })
            }*/
            ArrTag.push(htmlElement);
            if (!$.isEmpty(item.children)) {
                var htmlchildren = $.SMBuildTag(item.children);
                $.each(htmlchildren, function (indx, initem) {
                    $(htmlElement).append(htmlchildren[indx]);
                })
            }
        })
        return ArrTag;
    }

    $.ShowNotify = function (cTitle , cTexto, tipo){

        var type = '';

        switch (tipo) {
            case 'alerta':
                type = 'warning';
                break;
            case 'exito':
                type = 'success';
                break;
            case '':
                type = 'info';
                break;
            default:
                type = 'info';
                break;
        }

        Swal.fire({
            title: cTitle,
            text: cTexto,
            icon: type,
            customClass: {
                confirmButton: 'btn btn-' + type,
            }
        });
    }

    $.CargandoSM = function (id, texto , tiempo) {
        $('#' + id).block({
            message:
            '<div class=""><p class="mb-0">'+texto+'</p><div class="d-flex justify-content-center"><div class="sk-wave m-0 "><div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div></div> </div></div>',

            timeout: tiempo,
            css: {
                backgroundColor: 'transparent',
                color: '#fff',
                border: '0'
            },
            overlayCSS: {
                opacity: 0.5
            }
        });
    }

    $.Cargando = function (oOptions) {
        var tDivLoading;
        //Configuración por defecto
        oDefaultOpc = {
            text: "Espere un momento...",
            visible: true,
            container: null
        };
        //Reemplaza los valores del objecto "options" en configuración por defecto 
        oOptions = $.extend({}, oDefaultOpc, oOptions);

        //Eliminar mensaje de carga
        if (oOptions.container === null) {
            $(".mensajecarga").remove();
        }
        //Crear controles

        tDivLoading = $("<div>");
        tDivLoading.addClass(((oOptions.container === null) ? "mensajecarga width-100 height-100 col-sm-12" : "cnt_" + oOptions.container.replace("#", '') + " width-100 height-100"));
        tDivLoading.hide();
        var tDiv = $("<div>");
        tDiv.addClass(((oOptions.container === null) ? "mensajecarga-content" : "width-100 height-100 col-sm-12"));
        var tCenter = $("<center>");
        tCenter.addClass("no-margin");
        //var  tP = $("<p>");
        //tP.addClass("no-margin");
        var tSpan = $("<span>");
        //tSpan.addClass("fas fa-spinner fa-pulse fa-5x mensajecarga-content-text mensajecarga-content-text text-c-orange");
        tSpan.addClass((oOptions.container === null) ? 'fas fa-spinner fa-pulse fa-5x mensajecarga-content-text mensajecarga-content-text text-c-orange' : 'fas fa-spinner fa-pulse fa-2x mensajecarga-content-text mensajecarga-content-text text-c-orange');

        if (oOptions.container === null) {
            var tH2 = $("<h2>");
            tH2.attr("class", "mensajecarga-content-text text-normal")
            var tI = $("<i>");
            tI.html(oOptions.text)
        }
        //Crear diseño
        //tP.append(tSpan);
        tCenter.append(tSpan)
        if (oOptions.container === null) {
            tCenter.append(tH2)
            tH2.append(tI)
        }

        tDiv.append(tCenter);
        tDivLoading.append(tDiv);
        //Agregar al html       
        if (oOptions.container === null) {
            $("body").append(tDivLoading);
        }
        else {
            $(".cnt_" + oOptions.container.replace("#", '')).remove();
            $(oOptions.container).html("");
            $(oOptions.container).append(tDivLoading);
        }
        if (oOptions.visible) {
            tDivLoading.show();
        }
        return tDivLoading;
    }

    $.isHavePropertiesObject = function (obj) {
        var count = 0;
        $.each(obj, function (index, item) {
            count++;
        })
        return count;
    },

    $.isEmpty = function (value) {
        var bool = false;
        if ($.type(value) === 'undefined')
            bool = true;
        if ($.type(value) === 'null')
            bool = true;
        if ($.type(value) === '')
            bool = true;
        if ($.type(value) === 'string' && value.length <= 0)
            bool = true;
        if ($.type(value) === 'array' && value.length === 0)
            bool = true;
        if ($.type(value) === 'object' && $.isHavePropertiesObject(value) === 0)
            bool = true;
        if ($.type(value) === 'number' && isNaN(parseInt(value)))
            bool = true;
        return bool;
    }

    $.InsertarTransaccion = function (nOpeCodigo, ObjJson) {

        var ToXML = {
            Transaccion: ObjJson
        }
        var xml = '';
        $.each(ToXML, function (index, value) {
            xml += $.subXML(value, 'Transaccion');
        })

        $.ajax({
            type: "POST",
            url: "/GlobalAplication/Ga_Transacciones.aspx/InsertaTransacion",
            data: JSON.stringify({ nOpeCodigo: nOpeCodigo, Xml: xml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                //Cargando(0);
            },
            error: function () {
                //Cargando(0);
            }
        })

    }

    $.AsistenciaGeneralExcelExcel= function (variables, contenedor) {
        var iframe = '/GlobalAplication/viewpdf.aspx',
            url = '/Modulos/SistemaInformacionEstrategica/SIE_ServiciosAcademicos/SIESA_RegistrosAcademicos/Sie_Sa_Ra_Reportes.aspx',
            width = '100px',
            height = '100px',
            cadenavariables = variables;
        $.cargaurl(contenedor, iframe, url, width, height, cadenavariables);
    },
    
    $.cargaurl= function (contenedor, iframe, url, width, height, cadenavariables) {
        $(".iframetmp").remove();
        if (!width) width = '100%';
        if (!height) height = '550px';
        var rnd = Math.random() * 11;
        var str = 'url=' + url + '&width=' + width + '&height=' + height;
        if (cadenavariables) str = str + '&cadenavariables=' + cadenavariables;
        str = str + '&rnd=' + rnd;
        var iframetmp = $("<iframe>");
        iframetmp.attr("width", "100%");
        iframetmp.attr("height", "100%");
        iframetmp.attr("style", "border:none;");
        var curi = window.location.protocol+"//"+ window.location.host+  iframe+"?" +str;
        iframetmp.addClass("iframetmp");
        iframetmp.prop("src", curi);
        if ($.isEmpty(contenedor)) {
            $("body").append(iframetmp);
            iframetmp.hide();
        } else {
            $("#" + contenedor).append(iframetmp);
        }
    }

    $.isArray = function (cadena) {
        try {
            return Array.isArray(cadena);
        } catch (error) {
            return false;
        }
    }

    $.login_modal_mod = function (tipo) {

        $('#modal-login').modal('show');
        $.render_login_mod(tipo);

    }

    $.render_login_mod = function (tipo) {

        let html_reg = `
        <div class="registration-form-wrapper m-0">
            <div class="form-header text-center">
                <h2>Crea tu cuenta</h2>
                <p>Crea tu cuenta y empieza a comprar con nosotros.</p>
            </div>

            <div class="row">
                <div class="col-lg-9 mx-auto">
                <form action="javascript:void(0);" id="frm_register_login_modal">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <select class="form-select id_documento_mod" id="id_documento" name="id_documento" required="">
                                    <option value="" selected="" disabled="">Seleccionar</option>
                                    <option value="1">DNI</option>
                                    <option value="2">RUC</option>
                                </select>
                                <label for="id_documento">Tipo de documento</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="numero_documento" name="numero_documento" placeholder="Confirm Password" required="" minlength="8" autocomplete="new-password">
                                <label for="numero_documento">Número de documento</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="nombres" name="nombres" placeholder="Full Name" required="" autocomplete="name">
                                <label for="nombres">Nombres</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="apellidos" name="apellidos" placeholder="Confirm Password" required="" minlength="8" autocomplete="new-password">
                                <label for="apellidos">Apellidos</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" name="email" placeholder="Correo electrónico" required="" autocomplete="email">
                        <label for="email">Correo electrónico</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Teléfono" required="" autocomplete="telefono">
                        <label for="telefono">Celular</label>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="password" name="password" placeholder="Password" required="" minlength="8" autocomplete="new-password">
                                <label for="password">Contraseña</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required="" minlength="8" autocomplete="new-password">
                                <label for="confirmPassword">Confirmar contraseña</label>
                            </div>
                        </div>
                    </div>

                    <div class="d-grid mb-4">
                        <button type="submit" class="btn btn-register" name="btn_submit_modal" id="btn-login_register_modal">Crear cuenta</button>
                    </div>

                    <div class="login-link text-center">
                        <p>¿Ya tienes una cuenta? <a href="javascript:" id="btn_ya_tienes_cuenta">Inicia sesión</a></p>
                    </div>
                </form>
                </div>
            </div>

            <div class="decorative-elements">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="square square-1"></div>
                <div class="square square-2"></div>
            </div>
        </div>`;

        let html_log = `
        <div class="registration-form-wrapper m-0">
            <div class="form-header text-center">
                <h2>Inicio de sesión</h2>
            </div>

            <div class="row">
                <div class="col-lg-9 mx-auto">
                <form action="javascript:void(0);" id="frm_iniciar_login_modal">

                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="usuario" name="usuario" placeholder="Correo electrónico" required="" autocomplete="email">
                        <label for="usuario">Correo electrónico</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required="" minlength="8" autocomplete="new-password">
                        <label for="password">Contraseña</label>
                    </div>

                    <div class="d-grid mb-4">
                        <button type="submit" class="btn btn-register" name="btn_submit_modal" id="btn-login_modal">Iniciar sesión</button>
                    </div>

                    <div class="login-link text-center">
                        <p>¿Aún no tienes una cuenta? <a href="javascript:" id="btn_no_tengo_cuenta">Registrarse</a></p>
                    </div>
                </form>
                </div>
            </div>

            <div class="decorative-elements">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="square square-1"></div>
                <div class="square square-2"></div>
            </div>
        </div>`;

        if(tipo == 1){
            $('#ctn_form_login_mod').html(html_reg);

            $("#btn_ya_tienes_cuenta").off("click");
            $("#btn_ya_tienes_cuenta").on("click", function () {
                $.render_login_mod(2);
            });

            $.validar_register_login_mod();

        }else{
            $('#ctn_form_login_mod').html(html_log);

            $("#btn_no_tengo_cuenta").off("click");
            $("#btn_no_tengo_cuenta").on("click", function () {
                $.render_login_mod(1);
            }); 

            $.validar_login_mod();
        }

    }

    $.validar_login_mod = function () {

        var form = document.getElementById('frm_iniciar_login_modal');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese su email',
                            
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese su contraseña',
                        },
                        stringLength: {
                            min: 8,
                            max: 30,
                            message: 'Este campo debe tener entre 8 y 30 caracteres'
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
                    rowSelector: '.mb-3'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    $.submit_login_mod();
                }
            });
        });

        

    }

    $.validar_register_login_mod = function () {

        var form = document.getElementById('frm_register_login_modal');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                id_documento: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor seleccione el tipo de documento',
                            
                        }
                    },
                },
                numero_documento: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese su número de documento',
                            
                        },
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: 'Solo se permiten números.',
                        },
                        stringLength: {
                            min: 8,
                            max: 15,
                            message: 'Debe tener entre 8 y 15 caracteres.'
                        },
                    },
                },
                nombres: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese sus nombres',
                            
                        },
                        stringLength: {
                            min: 3,
                            max: 30,
                            message: 'Debe tener entre 3 y 30 caracteres.'
                        },
                        regexp: {
                            regexp: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                            message: 'Solo puede contener letras y espacios.',
                        }
                    },
                },
                apellidos: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese sus apellidos',
                            
                        },
                        stringLength: {
                            min: 3,
                            max: 30,
                            message: 'Debe tener entre 3 y 30 caracteres.'
                        },
                        regexp: {
                            regexp: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                            message: 'Solo puede contener letras y espacios.',
                        }
                    },
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese su correo electrónico',
                            
                        },
                        emailAddress: {
                            message: 'El valor no es una dirección de correo electrónico válida.'
                        }
                    },
                },
                telefono: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese su celular o teléfono',
                            
                        },
                        stringLength: {
                            min: 6,
                            max: 13,
                            message: 'Debe tener entre 6 y 13 caracteres.'
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese su contraseña',
                        },
                        stringLength: {
                            min: 8,
                            max: 30,
                            message: 'Este campo debe tener más de 8 y menos de 30 caracteres'
                        },
                    },
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor confirme la contraseña'
                        },
                        identical: {
                            compare: function () {
                                return form.querySelector('[name="password"]').value;
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
                    rowSelector: '.mb-3'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    $.submit_register_login_mod();
                }
            });
        });

        

    }

    $.submit_register_login_mod = function () {

        const ladda = HELPER.ladda('#btn-login_register_modal');
        let form = document.querySelector('#frm_register_login_modal');
        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API+'autenticacion/register',
            data: formData
        })
        .then(function(response) {

            localStorage.setItem('Token', response.data.Token);
            location.reload();
            //location.href = BASE_URL;
            
        }).catch(error => {
            console.log(error);
            ladda.stop();
        });

    }

    $.submit_login_mod = function () {

        const ladda = HELPER.ladda('#btn-login_modal');
        let form = document.querySelector('#frm_iniciar_login_modal');
        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API+'autenticacion/login',
            data: formData
        })
        .then(function(response) {

            //console.log(response.data);
            localStorage.setItem('Token', response.data.Token);
            location.reload();
            //localStorage.removeItem("Token");
        }).catch(error => {
            console.log(error);
            ladda.stop();
        });

    }

})($);


_login_modal_mod = function () {

    alert(1)

    $('#modal-login').modal('show');
    _render_login_mod(1);

    // const ladda = HELPER.ladda('#btn-login');
    // let form = document.querySelector('#formulario_login');
    // var formData = new FormData(form);

    // axios({
    //     method: 'post',
    //     url: BASE_API+'autenticacion/login',
    //     data: formData
    // })
    // .then(function(response) {

    //     localStorage.setItem('Token', response.data.Token);
    //     location.href = BASE_URL;
        
    // }).catch(error => {
    //     console.log(error);
    //     ladda.stop();
    // });
}

_cargarImagenes = function (d) {
    var x = location.host;
    $.each(d, function (key, value) {
        var img1 = document.getElementById('alu_curact_docente_' + key);
        if (!$.isEmpty(img1)) {
            img1.onerror = _cargarImagenPorDefecto;
        }
    });
}

_cargarImagenesId = function (id, c) {

    var img1 = document.getElementById(id);

    if (!$.isEmpty(img1)) {
        switch (c) {
            case 'foto':
                img1.onerror = _cargarImagenPorDefecto;
                break;
            case 'curso':
                img1.onerror = _cargarImagenCursoPorDefecto;
                break;
        }
    }
},

_cargarImagenPorDefecto = function (e) {
    var x = location.host;
    e.target.src = location.protocol + '//' + x + '/Fotos/Mediana/0000000000.jpg';
},

_cargarImagenCursoPorDefecto = function (e) {
    var x = location.host;
    var ruta = location.protocol + '//' + x + '/uploadsAsignaturas/0000000001.jpg';
    e.target.src = ruta;
},

_setInterfacePerfil = function (cPerfil) {
    var cRuta = '';

    switch (cPerfil) {
        case '12':
            cRuta = '/Campus/ua/Perfiles/Camp_Virt_Docente.aspx';
            break;
        default:
            cRuta = '/Campus/ua/Perfiles/Camp_Virt_Estudiante.aspx';
            break;
    }

    $.post(cRuta, {}, function (data) {
        $('#container_principal_campus').html(data);
     
    });
}


_getDetailModalHeader = function (asignatura, nombre, url) {
    return '<div class="modal-body py-1 px-3">\
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
       <div class="row">\
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0">\
             <div class="d-flex align-items-center margin-tomito-titulo-modal">\
                <div class="text-dark">\
                   <span class="badge bg-label-secondary rounded-pill p-2 m-1"><i class="ti ti-world text-color"></i></span>\
                </div>\
                <div>\
                   <h6 class="text-dark mb-0">'+ $.Capitalize(asignatura) + '</h6>\
                </div>\
             </div>\
          </div>\
       </div>\
    </div>\
    <div class="modal-body p-0">\
       <div class="pricing-free-trial bg-primary">\
          <div class="container-fluid">\
             <div class="position-relative">\
                <div class="d-flex justify-content-between flex-wrap-tomito flex-lg-row align-items-center py-1 px-2">\
                   <div class="d-flex">\
                      <div class="d-none d-lg-block d-xl-block mb-lg-0 mb-xl-0">\
                         <img src="/Campus/assets/img/nuevas/Tomito.png" alt="" srcset="" style="width:90px ;height: 120px; vertical-align: bottom; margin-top: -40px;">\
                      </div>\
                      <div class="d-flex  margin-tomito-modal align-items-center">\
                         <div class="text-white">\
                            <i class="ti ti-notes display-4"></i>\
                         </div>\
                         <div>\
                            <h3 class="text-white mb-1">'+ nombre + '</h3>\
                         </div>\
                      </div>\
                   </div>\
                </div>\
             </div>\
          </div>\
       </div>\
    </div>\
    <div class="modal-body p-3">\
       <div class="row">\
          <div class="col-12 p-0">\
             <div class="custom-option custom-option-icon checked">\
                '+ ( url.includes('<') ? url : '<iframe style="top: 0; left: 0; width: 100%; height: 600px;padding: 1%;" src="'+ url + '" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all" frameborder="0"></iframe>' ) + '\
             </div>\
          </div>\
       </div>\
    </div>'
}

__getColorContainer = function (position) {
    var color = '';
    switch (position) {
        case 0:
            color = 'primary'
            break;
        case 1:
            color = 'success'
            break;
        case 2:
            color = 'danger'
            break;
    }
    return color;
}

__generateChartStatistic = function (arrayData, arrayHeader, id) {
    var chartRecursoStatistic = document.querySelector('#' + id),
        chartRecursoStatisticConfig = {
            chart: {
                height: 202,
                parentHeightOffset: 0,
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    barHeight: '60%',
                    columnWidth: '38%',
                    startingShape: 'rounded',
                    endingShape: 'rounded',
                    borderRadius: 4,
                    distributed: true
                }
            },
            grid: {
                show: false,
                padding: {
                    top: -30,
                    bottom: 0,
                    left: -10,
                    right: -10
                }
            },
            colors: [
                '#ff8f1c',
                '#ff8f1c',
                '#ff8f1c',
                '#ff8f1c',
            ],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Public Sans',
                    fontWeight: 'bold',
                    colors: '#000'
                },
                formatter: function (val, opts) {
                    return val + ' %'
                }
            },
            series: [
                {
                    data: arrayData
                }
            ],
            legend: {
                show: false
            },
            xaxis: {
                categories: arrayHeader,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: config.colors_dark.textMuted,
                        fontSize: '13px',
                        fontFamily: 'Public Sans'
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            tooltip: {
                enabled: false
            },
            responsive: [
                {
                    breakpoint: 1025,
                    options: {
                        chart: {
                            height: 199
                        }
                    }
                }
            ]
        };
    if (typeof chartRecursoStatistic !== undefined && chartRecursoStatistic !== null) {
        var charRecursoReport = new ApexCharts(chartRecursoStatistic, chartRecursoStatisticConfig);
        charRecursoReport.render();
    }
}

__generateRateNotas = function (id, percent, cLabel, height) {
    height = height ? height : 360;
    const supportTrackerEl = document.querySelector('#' + id),
        supportTrackerOptions = {
            series: [percent],
            labels: [cLabel],
            chart: {
                height: height,
                type: 'radialBar'
            },
            plotOptions: {
                radialBar: {
                    offsetY: 10,
                    startAngle: -140,
                    endAngle: 130,
                    hollow: {
                        size: '70%'
                    },
                    track: {
                        background: config.colors.cardColor,
                        strokeWidth: '100%'
                    },
                    dataLabels: {
                        name: {
                            offsetY: -20,
                            color: config.colors.textMuted,
                            fontSize: '13px',
                            fontWeight: '400',
                            fontFamily: 'Public Sans'
                        },
                        value: {
                            offsetY: 10,
                            color: config.colors.headingColor,
                            fontSize: '38px',
                            fontWeight: '600',
                            fontFamily: 'Public Sans'
                        }
                    }
                }
            },
            colors: [config.colors.primary],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.5,
                    gradientToColors: [config.colors.primary],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 0.6,
                    stops: [30, 70, 100]
                }
            },
            stroke: {
                dashArray: 5
            },
            grid: {
                padding: {
                    top: -20,
                    bottom: 5
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 1440,
                    options: {
                        chart: {
                            height: 330
                        }
                    }
                },
                {
                    breakpoint: 1025,
                    options: {
                        chart: {
                            height: 330
                        }
                    }
                },
                {
                    breakpoint: 769,
                    options: {
                        chart: {
                            height: 250
                        }
                    }
                }
            ]
        };
    if (typeof supportTrackerEl !== undefined && supportTrackerEl !== null) {
        const supportTracker = new ApexCharts(supportTrackerEl, supportTrackerOptions);
        supportTracker.render();
    }
}
__EarningReportsBarChart = function (arrayHeader, arrayData, highlightData) {
    const basicColor = config.colors_label.primary,
        highlightColor = config.colors.primary;
    var colorArr = [];

    for (let i = 0; i < arrayData.length; i++) {
        colorArr.push(highlightColor);
    }

    const earningReportBarChartOpt = {
        chart: {
            height: 258,
            parentHeightOffset: 0,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '32%',
                startingShape: 'rounded',
                borderRadius: 7,
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                bottom: 0,
                left: -10,
                right: -10
            }
        },
        colors: colorArr,
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -25,
            style: {
                fontSize: '15px',
                colors: [config.colors.bodyColor],
                fontWeight: '600',
                fontFamily: 'Public Sans'
            }
        },
        series: [
            {
                data: arrayData
            }
        ],
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: arrayHeader,
            axisBorder: {
                show: true,
                color: config.colors.borderColor
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: config.colors.textMuted,
                    fontSize: '13px',
                    fontFamily: 'Public Sans'
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                formatter: function (val) {
                    return + parseInt(val / 1);
                },
                style: {
                    fontSize: '13px',
                    colors: config.colors.textMuted,
                    fontFamily: 'Public Sans'
                },
                min: 0,
                max: 60000,
                tickAmount: 6
            }
        },
        responsive: [
            {
                breakpoint: 1441,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '41%'
                        }
                    }
                }
            },
            {
                breakpoint: 590,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '61%',
                            borderRadius: 5
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    },
                    grid: {
                        padding: {
                            right: 0,
                            left: -20
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: '400'
                        }
                    }
                }
            }
        ]
    };
    return earningReportBarChartOpt;
}

__generateChartBarrasNotas = function (id, array, arrayHeader) {
    const earningReportsTabsOrdersEl = document.querySelector('#' + id),
        earningReportsTabsOrdersConfig = __EarningReportsBarChart(
            arrayHeader,
            array,
            2
        );
    if (typeof earningReportsTabsOrdersEl !== undefined && earningReportsTabsOrdersEl !== null) {
        const earningReportsTabsOrders = new ApexCharts(earningReportsTabsOrdersEl, earningReportsTabsOrdersConfig);
        earningReportsTabsOrders.render();
    }
}

__generateDonutAsistencia = function (id, arrayHeader, array, cantidadSemanas) {

    const generatedLeadsChartEl = document.querySelector('#' + id),
        generatedLeadsChartConfig = {
            chart: {
                height: 147,
                width: 320,
                parentHeightOffset: 0,
                type: 'donut'
            },
            labels: arrayHeader,
            series: array,
            colors: [
                chartColors.donut.series1,
                chartColors.donut.series2,
                chartColors.donut.series3,
                chartColors.donut.series4
            ],
            stroke: {
                width: 0
            },
            dataLabels: {
                enabled: false,
                formatter: function (val, opt) {
                    return parseInt(val) + '%';
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                theme: false
            },
            grid: {
                padding: {
                    top: 15,
                    right: -20,
                    left: -20
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            value: {
                                fontSize: '1.2rem',
                                fontFamily: 'Public Sans',
                                color: config.colors.headingColor,
                                fontWeight: 600,
                                offsetY: -15,
                                formatter: function (val) {
                                    return parseInt(val) + '%';
                                }
                            },
                            name: {
                                offsetY: 15,
                                fontFamily: 'Public Sans'
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                color: config.colors.primary,
                                fontSize: '.8125rem',
                                label: 'semanas',
                                fontFamily: 'Public Sans',
                                formatter: function (w) {
                                    return cantidadSemanas + '';
                                }
                            }
                        }
                    }
                }
            },
            responsive: [
                {
                    options: {
                        chart: {
                            height: 300,
                            width: 280
                        }
                    }
                },
                {
                    breakpoint: 1440,
                    options: {
                        chart: {
                            height: 300,
                            width: 300
                        }
                    }
                },
                {
                    breakpoint: 1025,
                    options: {
                        chart: {
                            height: 172,
                            width: 230
                        }
                    }
                },
                {
                    breakpoint: 769,
                    options: {
                        chart: {
                            height: 178,
                            width: 260
                        }
                    }
                },
                {
                    breakpoint: 540,
                    options: {
                        chart: {
                            height: 147,
                        }
                    }
                },
                {
                    breakpoint: 426,
                    options: {
                        chart: {
                            height: 147,
                        }
                    }
                },

            ]
        };

    if (typeof generatedLeadsChartEl !== undefined && generatedLeadsChartEl !== null) {
        const generatedLeadsChart = new ApexCharts(generatedLeadsChartEl, generatedLeadsChartConfig);
        generatedLeadsChart.render();
    }
}

__toast = function (cDescripcion, cTitulo, cTiempo, cType) {
    var c = ''
    switch (cType) {
        case 'warning':
            c = 'text-warning';
            break;
        case 'danger':
            c = 'text-danger';
            break;
        case 'success':
            c = 'text-success';
            break;
    }

    var arrayToast = [
        {
            element: "div",
            properties: {
                class: "toast-header",
                html: '<i class="ti ti-bell ' + c + ' ti-xs me-2"></i>\
                        <div class="me-auto fw-semibold">'+ cTitulo + '</div>\
                        <small class="text-muted">'+ cTiempo + '</small>\
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'
            },
        },
        {
            element: "div",
            properties: { class: "toast-body", html: cDescripcion },
        }
    ];

    $('.toast-ex').html($.SMBuildTag(arrayToast));

    var toastAnimationExample = document.querySelector('.toast-ex');
    var toastAnimation = new bootstrap.Toast(toastAnimationExample);
    toastAnimation.show();
}

__generateDataTable = function (classTable, data, arrayColumns,arrayColumnsDef, tableLength, arrayTableLength, arrayColumnsExportar = [], titleExportarButton, paging = true,  searching = true, info = true, arrOrder = [], arrStyleExcel = []) {

    let borderColor, bodyBg, headingColor;

    if (isDarkStyle) {
      borderColor = config.colors_dark.borderColor;
      bodyBg = config.colors_dark.bodyBg;
      headingColor = config.colors_dark.headingColor;
    } else {
      borderColor = config.colors.borderColor;
      bodyBg = config.colors.bodyBg;
      headingColor = config.colors.headingColor;
    }

    if(!$.isArray(data)){
        return false;
    }

    if($.isEmpty(arrStyleExcel)){
        arrStyleExcel = [
            {
                template: [
                    "blue_medium",
                    "header_blue",
                    "title_medium",
                ]
            },
        ];
    }
    
    var dt_basic_table = $('.' + classTable);
    var dt_basic = dt_basic_table.DataTable({
        data: data,
        columns: arrayColumns,
        columnDefs: arrayColumnsDef,
        paging: paging,
        searching: searching,
        info: info,
        language: {
            url: 'assets/library/es-ES.json'
        },
        order: arrOrder,
        //ordering: false,
        //dom: '<"card-header flex-column flex-md-row p-0"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        dom:
        '<"row mx-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
        displayLength: ($.isEmpty(tableLength) ? 25 : tableLength),
        lengthMenu: ($.isEmpty(arrayTableLength) ? [25, 50, 75, 100] : arrayTableLength),
        buttons: (arrayColumnsExportar.length > 0 ? 
        [
            {
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle mx-3',
              text: '<i class="mdi mdi-export-variant me-1"></i> <span class="d-none d-sm-inline-block">Exportar</span>',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="mdi mdi-printer-outline me-1" ></i>Imprimir',
                  className: 'dropdown-item',
                  title: titleExportarButton,
                  exportOptions: {
                    columns: arrayColumnsExportar,
                    // prevent avatar to be print
                    format: {
                      body: function (inner, coldex, rowdex) {
                        if (inner.length <= 0) return inner;
                        var el = $.parseHTML(inner);
                        var result = '';
                        $.each(el, function (index, item) {
                          if (item.classList !== undefined && item.classList.contains('user-name')) {
                            result = result + item.lastChild.firstChild.textContent;
                          } else if (item.innerText === undefined) {
                            result = result + item.textContent;
                          } else result = result + item.innerText;
                        });
                        return result;
                      }
                    }
                  },
                  customize: function (win) {
                    //customize print view for dark
                    $(win.document.body)
                      .css('color', headingColor)
                      .css('border-color', borderColor)
                      .css('background-color', bodyBg);
                    $(win.document.body)
                      .find('table')
                      .addClass('compact')
                      .css('color', 'inherit')
                      .css('border-color', 'inherit')
                      .css('background-color', 'inherit');
                  }
                },
                {
                  extend: 'csv',
                  text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                  className: 'dropdown-item',
                  title: titleExportarButton,
                  exportOptions: {
                    columns: arrayColumnsExportar,
                    // prevent avatar to be display
                    format: {
                      body: function (inner, coldex, rowdex) {
                        if (inner.length <= 0) return inner;
                        var el = $.parseHTML(inner);
                        var result = '';
                        $.each(el, function (index, item) {
                          if (item.classList !== undefined && item.classList.contains('user-name')) {
                            result = result + item.lastChild.firstChild.textContent;
                          } else if (item.innerText === undefined) {
                            result = result + item.textContent;
                          } else result = result + item.innerText;
                        });
                        return result;
                      }
                    }
                  }
                },
                {
                  extend: 'excel',
                  text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                  className: 'dropdown-item',
                  title: titleExportarButton,
                  exportOptions: {
                    columns: arrayColumnsExportar,
                    // prevent avatar to be display
                    format: {
                        body: function (inner, coldex, rowdex) {
                            if (inner.length <= 0) return '-';
                            var el = $.parseHTML(inner);
                            var result = '';
                            $.each(el, function (index, item) {
                                if (item.classList !== undefined && item.classList.contains('user-name')) {
                                    result = result + item.lastChild.firstChild.textContent;
                                } else if (item.innerText === undefined) {
                                    result = result + (item.textContent || '-');
                                } else result = result + (item.innerText || '-');
                            });
                            return result;
                        }
                    }
                  },
                  /** Para dar estilo a la exportación del excel para ello estoy usando la librería -> datatables-buttons-excel-styles */
                  "excelStyles": arrStyleExcel,
                },
                {
                  extend: 'pdf',
                  text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                  className: 'dropdown-item',
                  title: titleExportarButton,
                  exportOptions: {
                    columns: arrayColumnsExportar,
                    // prevent avatar to be display
                    format: {
                      body: function (inner, coldex, rowdex) {
                        if (inner.length <= 0) return inner;
                        var el = $.parseHTML(inner);
                        var result = '';
                        $.each(el, function (index, item) {
                          if (item.classList !== undefined && item.classList.contains('user-name')) {
                            result = result + item.lastChild.firstChild.textContent;
                          } else if (item.innerText === undefined) {
                            result = result + item.textContent;
                          } else result = result + item.innerText;
                        });
                        return result;
                      }
                    }
                  }
                },
                {
                  extend: 'copy',
                  text: '<i class="mdi mdi-content-copy me-1"></i>Copiar',
                  className: 'dropdown-item',
                  title: titleExportarButton,
                  exportOptions: {
                    columns: arrayColumnsExportar,
                    // prevent avatar to be display
                    format: {
                      body: function (inner, coldex, rowdex) {
                        if (inner.length <= 0) return inner;
                        var el = $.parseHTML(inner);
                        var result = '';
                        $.each(el, function (index, item) {
                          if (item.classList !== undefined && item.classList.contains('user-name')) {
                            result = result + item.lastChild.firstChild.textContent;
                          } else if (item.innerText === undefined) {
                            result = result + item.textContent;
                          } else result = result + item.innerText;
                        });
                        return result;
                      }
                    }
                  }
                }
              ]
            },
        ] : []),
        "scrollX": false,  /* Habilita el scroll horizontal */
        responsive: true,
        "destroy": true
    });

    var cabecera = dt_basic.table().header();
    $(cabecera).addClass('table-light');

    //Esto es para cuando doy click en la fila, se pinte de color
    $('.' + classTable +' tbody').on('click', 'tr', function () {
        // Quita la clase de selección de todas las filas
        $('.' + classTable +' tbody tr').removeClass('selected');
        // Agrega la clase de selección a la fila clicada
        $(this).addClass('selected');
    });

    return dt_basic;

}

/*Server-side processing*/
__generateDataTable_SSP = function (classTable, ajaxSettings, arrayColumns, arrayColumnsDef, tableLength, arrayTableLength, arrayColumnsExportar = [], titleExportarButton, paging = true, searching = true, info = true, arrStyleExcel = []) {

    let borderColor, bodyBg, headingColor;

    if (isDarkStyle) {
        borderColor = config.colors_dark.borderColor;
        bodyBg = config.colors_dark.bodyBg;
        headingColor = config.colors_dark.headingColor;
    } else {
        borderColor = config.colors.borderColor;
        bodyBg = config.colors.bodyBg;
        headingColor = config.colors.headingColor;
    }

    if($.isEmpty(arrStyleExcel)){
        arrStyleExcel = [
            {
                template: [
                    "blue_medium",
                    "header_blue",
                    "title_medium",
                ]
            }, /**black_medium,blue_gray_medium,blue_medium,cyan_medium,gold_medium,gray_medium,green_medium,light_gray_medium,orange_medium */
            // {
            //     "cells": "1",
            //     "style": {
            //         font: {
            //             name: "Arial",
            //             size: 18,
            //             b: true,          // Single underline
            //             //color: "D75F41"
            //         }
            //     }
            // }
        ];
    }

    var dt_basic_table = $('.' + classTable);
    var dt_basic = dt_basic_table.DataTable({
        ajax: ajaxSettings,
        columns: arrayColumns,
        columnDefs: arrayColumnsDef,
        paging: paging,
        searching: searching,
        info: info,
        processing: true,
        serverSide: true,
        language: {
            url: 'assets/library/es-ES.json'
        },
        ordering: true,
        //dom: '<"card-header flex-column flex-md-row p-0"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        dom:
            '<"row mx-2"' +
            '<"col-md-2"<"me-3"l>>' +
            '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
            '>t' +
            '<"row mx-2"' +
            '<"col-sm-12 col-md-6"i>' +
            '<"col-sm-12 col-md-6"p>' +
            '>',
        displayLength: ($.isEmpty(tableLength) ? 25 : tableLength),
        lengthMenu: ($.isEmpty(arrayTableLength) ? [[25, 50, 75, 100, -1], [25, 50, 75, 100, 'Todos']] : arrayTableLength),
        buttons: (arrayColumnsExportar.length > 0 ?
            [
                {
                    extend: 'collection',
                    className: 'btn btn-label-primary dropdown-toggle mx-3',
                    text: '<i class="mdi mdi-export-variant me-1"></i> <span class="d-none d-sm-inline-block">Exportar</span>',
                    buttons: [
                        {
                            extend: 'print',
                            text: '<i class="mdi mdi-printer-outline me-1" ></i>Imprimir',
                            className: 'dropdown-item',
                            title: titleExportarButton,
                            exportOptions: {
                                columns: arrayColumnsExportar,
                                // prevent avatar to be print
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = '';
                                        $.each(el, function (index, item) {
                                            if (item.classList !== undefined && item.classList.contains('user-name')) {
                                                result = result + item.lastChild.firstChild.textContent;
                                            } else if (item.innerText === undefined) {
                                                result = result + item.textContent;
                                            } else result = result + item.innerText;
                                        });
                                        return result;
                                    }
                                }
                            },
                            /*
                            action: function (e, dt, button, config) {
                              // Realizar una solicitud al servidor para obtener los datos
                              // $.ajax({
                              //     url: 'tu_url_de_servicio_para_exportar_a_excel',
                              //     method: 'POST',
                              //     dataType: 'json',
                              //     success: function (response) {
                              //         // Procesar la respuesta y exportar los datos a Excel
                              //         // Código para exportar a Excel
                              //     },
                              //     error: function (xhr, status, error) {
                              //         console.error('Error al exportar a Excel:', error);
                              //     }
                              // });
                            },
                            */
                            customize: function (win) {
                                //customize print view for dark
                                $(win.document.body)
                                    .css('color', headingColor)
                                    .css('border-color', borderColor)
                                    .css('background-color', bodyBg);
                                $(win.document.body)
                                    .find('table')
                                    .addClass('compact')
                                    .css('color', 'inherit')
                                    .css('border-color', 'inherit')
                                    .css('background-color', 'inherit');
                            }
                        },
                        {
                            extend: 'csv',
                            text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                            className: 'dropdown-item',
                            title: titleExportarButton,
                            exportOptions: {
                                columns: arrayColumnsExportar,
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = '';
                                        $.each(el, function (index, item) {
                                            if (item.classList !== undefined && item.classList.contains('user-name')) {
                                                result = result + item.lastChild.firstChild.textContent;
                                            } else if (item.innerText === undefined) {
                                                result = result + item.textContent;
                                            } else result = result + item.innerText;
                                        });
                                        return result;
                                    }
                                }
                            }
                        },
                        {
                            extend: 'excel',
                            text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                            className: 'dropdown-item',
                            title: titleExportarButton,
                            exportOptions: {
                                columns: arrayColumnsExportar,
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return '-';
                                        var el = $.parseHTML(inner);
                                        var result = '';
                                        $.each(el, function (index, item) {
                                            if (item.classList !== undefined && item.classList.contains('user-name')) {
                                                result = result + item.lastChild.firstChild.textContent;
                                            } else if (item.innerText === undefined) {
                                                result = result + (item.textContent || '-');
                                            } else result = result + (item.innerText || '-');
                                        });
                                        return result;
                                    }
                                }
                            },
                            /** Para dar estilo a la exportación del excel para ello estoy usando la librería -> datatables-buttons-excel-styles */
                            "excelStyles": arrStyleExcel,
                        },
                        {
                            extend: 'pdf',
                            text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                            className: 'dropdown-item',
                            title: titleExportarButton,
                            exportOptions: {
                                columns: arrayColumnsExportar,
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = '';
                                        $.each(el, function (index, item) {
                                            if (item.classList !== undefined && item.classList.contains('user-name')) {
                                                result = result + item.lastChild.firstChild.textContent;
                                            } else if (item.innerText === undefined) {
                                                result = result + item.textContent;
                                            } else result = result + item.innerText;
                                        });
                                        return result;
                                    }
                                }
                            }
                        },
                        {
                            extend: 'copy',
                            text: '<i class="mdi mdi-content-copy me-1"></i>Copiar',
                            className: 'dropdown-item',
                            title: titleExportarButton,
                            exportOptions: {
                                columns: arrayColumnsExportar,
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = '';
                                        $.each(el, function (index, item) {
                                            if (item.classList !== undefined && item.classList.contains('user-name')) {
                                                result = result + item.lastChild.firstChild.textContent;
                                            } else if (item.innerText === undefined) {
                                                result = result + item.textContent;
                                            } else result = result + item.innerText;
                                        });
                                        return result;
                                    }
                                }
                            }
                        }
                    ]
                },
            ] : []),
        "scrollX": false,  /* Habilita el scroll horizontal */
        responsive: true,
        "destroy": true
    });

    var cabecera = dt_basic.table().header();
    $(cabecera).addClass('table-light');

    //Esto es para cuando doy click en la fila, se pinte de color
    $('.' + classTable + ' tbody').on('click', 'tr', function () {
        // Quita la clase de selección de todas las filas
        $('.' + classTable + ' tbody tr').removeClass('selected');
        // Agrega la clase de selección a la fila clicada
        $(this).addClass('selected');
    });

    return dt_basic;

}
__generateCalendar = function (events) {

    let direction = 'ltr';

    if (isRtl) {
        direction = 'rtl';
    }

    var initialLocaleCode = 'es';
    const calendarEl = document.getElementById('calendar'),
        appCalendarSidebar = document.querySelector('.app-calendar-sidebar'),
        appOverlay = document.querySelector('.app-overlay'),
        selectAll = document.querySelector('.select-all'),
        filterInput = [].slice.call(document.querySelectorAll('.input-filter')),
        calendarsColor = {
            Primary: 'primary',
            Success: 'success',
            Danger: 'danger',
            Warning: 'warning',
            Info: 'info'
        },
        inlineCalendar = document.querySelector('.inline-calendar');

    let currentEvents = events, inlineCalInstance;

    if (inlineCalendar) {
        inlineCalInstance = inlineCalendar.flatpickr({
            monthSelectorType: 'static',
            inline: true,
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                },
                months: {
                    shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
                    longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                },
            },
        });
    }

    function eventClick(info) {
        var objInfo = info.event._def.extendedProps;
        if (objInfo.nRecurso == 1) {
            //Camp_Virt_Principal.showModalDetailRecurso(objInfo, objInfo.nDocLinTipo);
        } else {
            //Camp_Virt_SesionVirtual.getInformationSesiones(_globalDocMisCursos.nGruCodigo, objInfo.nSesion);
        }

        //info.jsEvent.preventDefault();
    }

    function modifyToggler() {
        const fcSidebarToggleButton = document.querySelector('.fc-sidebarToggle-button');
        fcSidebarToggleButton.classList.remove('fc-button-primary');
        fcSidebarToggleButton.classList.add('d-lg-none', 'd-inline-block', 'ps-0');
        while (fcSidebarToggleButton.firstChild) {
            fcSidebarToggleButton.firstChild.remove();
        }
        fcSidebarToggleButton.setAttribute('data-bs-toggle', 'sidebar');
        fcSidebarToggleButton.setAttribute('data-overlay', '');
        fcSidebarToggleButton.setAttribute('data-target', '#app-calendar-sidebar');
        fcSidebarToggleButton.insertAdjacentHTML('beforeend', '<i class="ti ti-menu-2 ti-sm"></i>');
    }

    function selectedCalendars() {
        let selected = [],
            filterInputChecked = [].slice.call(document.querySelectorAll('.input-filter:checked'));

        filterInputChecked.forEach(item => {
            selected.push(item.getAttribute('data-value'));
    });

    return selected;
}

function fetchEvents(info, successCallback) {
    let calendars = selectedCalendars();
    let selectedEvents = currentEvents.filter(function (event) {
        return calendars.includes(event.extendedProps.calendar.toLowerCase());
    });
    successCallback(selectedEvents);
}

let { dayGrid, interaction, timeGrid, list } = calendarPlugins;
let calendar = new Calendar(calendarEl, {
    timeZone: 'local',
    initialView: 'dayGridMonth',
    locale: initialLocaleCode,
    events: fetchEvents,
    plugins: [interaction, dayGrid, timeGrid, list],
    editable: true,
    dragScroll: true,
    dayMaxEvents: 2,
    eventResizableFromStart: true,
    customButtons: {
        sidebarToggle: {
            text: 'Sidebar'
        }
    },
    headerToolbar: {
        start: 'sidebarToggle, prev,next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    direction: direction,
    initialDate: new Date(),
    navLinks: true,
    eventClassNames: function ({ event: calendarEvent }) {
        const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];
        return ['fc-event-' + colorName];
    },
dateClick: function (info) {
    let date = moment(info.date).format('YYYY-MM-DD');
    console.log(date);
},
eventClick: function (info) {
    eventClick(info);
},
datesSet: function () {
    modifyToggler();
},
viewDidMount: function () {
    modifyToggler();
}
});

// Render calendar
calendar.render();

// Modify sidebar toggler
modifyToggler();

if (selectAll) {
    selectAll.addEventListener('click', e => {
        if (e.currentTarget.checked) {
            document.querySelectorAll('.input-filter').forEach(c => (c.checked = 1));
} else {
    document.querySelectorAll('.input-filter').forEach(c => (c.checked = 0));
}
calendar.refetchEvents();
});
}

if (filterInput) {
    filterInput.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.input-filter:checked').length < document.querySelectorAll('.input-filter').length
                ? (selectAll.checked = false)
                : (selectAll.checked = true);
    calendar.refetchEvents();
});
});
}

// Jump to date on sidebar(inline) calendar change
inlineCalInstance.config.onChange.push(function (date) {
    calendar.changeView(calendar.view.type, moment(date[0]).format('YYYY-MM-DD'));
    modifyToggler();
    appCalendarSidebar.classList.remove('show');
    appOverlay.classList.remove('show');
});

}


__closeModal = function (nModal){
    $('#modalSM-'+ nModal).modal('hide');
    $('#modalSM-'+ nModal).remove();
    $('.modal-backdrop').remove();
}

_limpiarInpuFile = function (myId) {
    $('#' + myId).val('');
}

__openModal = function (cHtml, nTipo, nCloseModal) {
    
    nCloseModal = (nCloseModal ? nCloseModal : 0);

    $('#modalCurso').modal('hide');
    $('#modalCurso').remove();
    $('.modal-backdrop').remove();

    $('#container_modal_recurso').html('<div class="modal fade" id="modalCurso" ' + (nCloseModal == 1 ? 'data-bs-backdrop="static" data-bs-keyboard="false"' : '') + ' tabindex="-1">\
                    <div class="modal-dialog modal-xxl modal-simple modal-edit-user">\
                        <div class="modal-content p-0 modal-content-sm-recurso">\
                        </div>\
                    </div>\
                </div>')

    $('#modalCurso .modal-dialog').removeClass('modal-xxl').removeClass('modal-xl');

    if (nTipo == 2) {
        $('#modalCurso .modal-dialog').addClass('modal-xxl');
    } else if (nTipo == 3) {
        $('#modalCurso .modal-dialog').addClass('modal-lg');
    } else {
        $('#modalCurso .modal-dialog').addClass('modal-xl');
    }

    $('.modal-content-sm-recurso').html(cHtml);
    $("#modalCurso").modal("show");
    
    $('.tooltip').remove();

    $('#modalCurso .btn-close').off('click');
    $('#modalCurso .btn-close').on('click', function () {
        $('#modalCurso .modal-content').html('');
    });
    
}

__generateBarChartEstadsticaRecursos = function (arraySeries, arrayCategories, id) {

    var colorArr = ['#FF8F1C', '#FFF1E3'];


    const earningReportBarChartOpt = {
        chart: {
            height: 258,
            parentHeightOffset: 0,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '32%',
                startingShape: 'rounded',
                distributed: false,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                bottom: 0,
                left: -10,
                right: -10
            }
        },
        colors: colorArr,
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -25,
            style: {
                fontSize: '15px',
                colors: [config.colors.bodyColor],
                fontWeight: '600',
                fontFamily: 'Public Sans'
            }
        },
        series: arraySeries,
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: arrayCategories,
            axisBorder: {
                show: true,
                color: config.colors.borderColor
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: config.colors.textMuted,
                    fontSize: '13px',
                    fontFamily: 'Public Sans'
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                formatter: function (val) {
                    return parseInt(val / 1);
                },
                style: {
                    fontSize: '13px',
                    colors: config.colors.textMuted,
                    fontFamily: 'Public Sans'
                },
                min: 0,
                max: 60000,
                tickAmount: 6
            }
        },
        responsive: [
            {
                breakpoint: 1441,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '41%'
                        }
                    }
                }
            },
            {
                breakpoint: 590,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '61%',
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    },
                    grid: {
                        padding: {
                            right: 0,
                            left: -20
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: '400'
                        }
                    }
                }
            }
        ]
    };

    const earningReportsTabsSalesEl = document.querySelector('#' + id);
    const earningReportsTabsSales = new ApexCharts(earningReportsTabsSalesEl, earningReportBarChartOpt);
    earningReportsTabsSales.render();

}

__generateHtmlInputFile = function (id, txt) {
    return '<form action="/upload" class="dropzone needsclick" id="' + id + '">\
                <div class="dz-message needsclick">'+ txt + '</div>\
                <div class="fallback">\
                    <input class="form-control" name="file" type="file" />\
                </div>\
            </form>';
}

__generateInputFile = function (id) {

    if ($('#' + id + '').length > 0) {

        const previewTemplate = `<div class="dz-preview dz-file-preview">
        <div class="dz-details">
          <div class="dz-thumbnail">
            <img data-dz-thumbnail>
            <span class="dz-nopreview">Sin vista previa</span>
            <div class="dz-success-mark"></div>
            <div class="dz-error-mark"></div>
            <div class="dz-error-message"><span data-dz-errormessage></span></div>
            <div class="progress">
              <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
            </div>
          </div>
          <div class="dz-filename" data-dz-name></div>
          <div class="dz-size" data-dz-size></div>
        </div>
        </div>`;

        const myDropzone = new Dropzone('#' + id + '', {
            previewTemplate: previewTemplate,
            parallelUploads: 1,
            maxFilesize: 50,
            addRemoveLinks: true,
            maxFiles: 1
        });

    }

}

__generateModalDetails = function (titulo, cBody) {

    $('#modalDetailsBody').attr('style', '');

    $('#txtTituloModalDetails').html(titulo);
    $('#modalDetailsBody').html(cBody);
    $('#modalDetailsRecurso').modal("show");
}

__uploadFile = function (idFile, ruta, nValidacion) {

    var files = (nValidacion == 3 ? $('#' + idFile).get(0).files : $('#' + idFile).get(0).dropzone.files);
    var titulo = $('#txtcPerApellidoLog').val() + ' ' + $('#txtcPerNombreLog').val();
    var nombreFile = '';

    if (files.length > 0) {
        var data = new FormData();
        data.append("folder0", "");
        data.append("file0", files[0]);
        data.append("param0", titulo);
        data.append("path0", "/" + ruta);

        var nombreFileTarea = '';
        $.ajax({
            type: "POST",
            url: "/GlobalAplication/FileUpload.ashx",
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function (result, status, result3) {
                nombreFile = result;
            },
            error: function () {
                alert("Error inesperado procesando su solicitud")
            }
        });

    } else {
        if (nValidacion == 1) {
            Swal.fire({
                title: 'Alerta', text: 'Debe adjuntar un archivo para continuar', icon: 'error', customClass: { confirmButton: 'btn btn-danger' }
            });
        }
    }

    return nombreFile;

}

_getIdYoutube = function (url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

_getIdVimeo = function (url) {
    const match = /vimeo.*\/(\d+)/i.exec(url);
    if (match) {
        return match[1];
    }
}

__getFormatsQuill = function (){
    var formats = [
      'background',
      'bold',
      'color',
      'font',
      'code',
      'italic',
      'link',
      'size',
      'strike',
      'script',
      'underline',
      'blockquote',
      'header',
      'indent',
      'list',
      'align',
      'direction',
      'code-block',
      'formula'
      // 'image'
      // 'video'
    ];

    return formats;

}

__getBrowserInfo = function () {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

__secondsToString = function (seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + (second).toFixed(0) : (second).toFixed(0);
    return hour + ':' + minute + ':' + second;
}

__noBackPage = function () {
    window.location.hash = "autonoma";
    window.location.hash = "a-autonoma"
    window.onhashchange = function () {
        window.location.hash = "autonoma";
        //console.log('queria retroceder pero no :v')
    }
}

__getValueFromObjectArray = function (array, value, identifier, toIdentifier) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element[toIdentifier] == identifier) {
            return element[value];
        }
    }
}

__isValidHttpUrl = function (string) {
    try {
        const newUrl = new URL(string);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
        return false;
    }
},

__validaEnlaceYouTube = function(url){
    //var url = $('#youTubeUrl').val();
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            //$('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
            return true;
        }
        else {
            // Do anything for not being valid
            return false;
        }
    }else{
        return false;
    }
},

__validaEnlaceVimeo = function (url) {
    //console.log('a');
    if (/https:\/\/vimeo.com\/\d{8,}(?=\b|\/)/.test(url)) { 
        return true;
    } else { 
        return false;
    }
},

__GenerarScript_YoutubeVimeo = function () {

    const scriptV = document.createElement('script')
    scriptV.src = 'https://player.vimeo.com/api/player.js'
    document.head.appendChild(scriptV)

    const scriptY = document.createElement('script')
    scriptY.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(scriptY)
},

__LeerEvento_Youtube = function (id) {
    var player = new YT.Player(id)
    var handle = null
    var retorna = false;

    
    player.addEventListener('onStateChange', event => {
        if (event.data === YT.PlayerState.PLAYING) {
            retorna = true;
        } else {
            retorna = false;
            window.clearInterval(handle);
        }
    });

    return retorna;
},

__LeerEvento_Vimeo = function (id) {
    alert('DANIEL');
    var retorna = false;
    var iframe = document.getElementById(id);
    var player = new Vimeo.Player(iframe);

    player.on('play', function () {
        retorna = true;
    });

    return retorna;
},

__formatPicker = function (dFecha) {
    var arrayFecha = dFecha.split('T');
    var arrayDia = (arrayFecha[0]).split('-');
    var hora = arrayFecha[1];
    hora = hora.substring(0, hora.length - 3);

    return arrayDia[2] + '-' + arrayDia[1] + '-' + arrayDia[0] + ' ' + hora;
}

_countChars = function (obj, id, texto) {
    var strLength = obj.value.length;
    $('#' + id).html(texto + ' ' + strLength);
}

_zeroFill = function ( number, width ){
    width -= number.toString().length;
    if ( width > 0 )
    {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // siempre devuelve tipo cadena
}

__isJsonString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
