let HELPER = {

    abr_medida: (nombre) => {
        let abreviado = '';

        switch (nombre) {
            case 'UNIDADES':
                abreviado = 'UND';
            break;
        
            case 'PESO':
                abreviado = 'KG';
            break;

            case 'VOLUMEN':
                abreviado = 'VOL';
            break;
        }

        return abreviado;
    },

    esNumero: (dato) => {
        /*Definición de los valores aceptados*/
        var valoresAceptados = /^[0-9]+$/;
        if (dato.indexOf(".") === -1 ){
            if (dato.match(valoresAceptados)){
                return true;
            }else{
                return false;
            }
        }else{
            //dividir la expresión por el punto en un array
            var particion = dato.split(".");
            //evaluamos la primera parte de la división (parte entera)
            if (particion[0].match(valoresAceptados) || particion[0]==""){
                if (particion[1].match(valoresAceptados)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        }
    },

    currency:(value) => {

        value = parseFloat(HELPER.round(value, 2));
        return value.toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    },

    round:(value, decimals) => {

        return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
    },

    array_unique: (array_data) => {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return array_data.filter(onlyUnique);
    },
    
    scanner_timer_waiting: (decodedText, time_interval = 1000) => {

        let fl_get_scanner = false;

        let tiempo_actual = moment().format('YYYY-MM-DD HH:mm:ss')

        if(localStorage.getItem('tiempo_ultimo_escaneo') === null)
        {  
            localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            fl_get_scanner = true;
        }
        else
        {  
            let tiempo_ultimo_escaneo = moment(localStorage.getItem('tiempo_ultimo_escaneo'), "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss');

            let diff  = moment(tiempo_actual).diff(moment(tiempo_ultimo_escaneo));

            let f = moment.utc(diff).format("x");

            if(f > time_interval)
            {
                /*console.log('Ultimo escaneo: '+localStorage.getItem('tiempo_ultimo_escaneo'));
                console.log('Ultimo: '+tiempo_ultimo_escaneo);
                console.log('Actual: '+tiempo_actual);
                console.log('Diferencia: '+f);
                console.log('*************');*/
                
                fl_get_scanner = true;
                localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            }
            
        }

        if(fl_get_scanner == true)
        {
            let audio = document.getElementById("scanner_beep"); 
            audio.play(); 

            return decodedText;

            //console.log(`Code scanned = ${decodedText}`, decodedResult);
            //HELPER.notificacion(decodedText, 'success');      

        }   
        else
        {
            return null;
        }

    },

    scanner_camera: async (id_element = 'qrcode') => {

        let comp_scanner = await import(BASE_URL+'app/config/Scanner_camera.js');

        let html5QrCode = new Html5QrcodeScanner(
            "qr-reader", { fps: 10});

        html5QrCode.render(comp_scanner.default.onScanSuccess,);        
    },

    
    counter_animate: (speed = 200, cantidad_decimal = 0) => {

        const counters = document.querySelectorAll('.contador_animate');

        counters.forEach( counter => {
        const animate = () => {
            const value = +counter.getAttribute('value_contador_animate');
            const data = +counter.innerText;
            
            const time = value / speed;
            if(data < value) {
                counter.innerText = Math.ceil(data + time).toFixed(cantidad_decimal);
                setTimeout(animate, 1);
            }else{
                counter.innerText = parseFloat(value).toFixed(cantidad_decimal);
            }
            
        }
        
        animate();
        });
    },

    sleep: (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)),

    zero_fill: (value, width, complete = '0') => {

        width -= value.toString().length;

        if ( width > 0 )
        {
          return new Array( width + (/\./.test( value ) ? 2 : 1) ).join( complete ) + value;
        }

        return value + ""; // always return a string
    },
    
    show_window_float: () => {
        $('header[class="main-header"]').remove();
        $('aside[class="main-sidebar"]').remove();
        $('body').removeAttr('class');
        $('body').attr('class', 'skin-blue layout-top-nav');
    },
    
    set_column_datatable: (columnas_datatable, response_server) => {

        if(response_server.data.view_datatable != null && response_server.data.view_datatable != '[]')
        {
            let columnas_create = columnas_datatable;
            
            let json_config =JSON.parse(response_server.data.view_datatable);

            let new_obj_column = [];
            
            for (let i=0; i<json_config.length; i++) {

                Object.keys(columnas_create).forEach(function (key){
                    if(json_config[i].title == columnas_create[key].title)
                    {
                        new_obj_column[i] = columnas_create[key];
                    }
                });  
            }

            columnas_datatable = new_obj_column;
        }
        
        return columnas_datatable;

    },

    get_tipo_cambio: async (id_moneda) => {

        let response_return = 0;

        await axios.get(BASE_API + 'configuracion/tipo_cambio/get/'+id_moneda)
        .then(function (response) {

            response_return = response.data.tipo_cambio; 

        }).catch(error => {
            console.log(error);
        }); 

        return response_return;
    },
    
    get_location: () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            console.log(position);
            /*location['lat'] = position.coords.latitude;
            location['lng'] = position.coords.longitude;*/

        });

        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },

    print: async (content, fl_auto_print = false, sizePage = 'A4') =>{
        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
            
            <head>
                <title>Impresión</title>
                <style>
                    body {
                        font-family: monospace !important;
                        font-size: 12px !important;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                    }

                    body, td, tr, th, span, p {
                        font-size: 12px !important;
                    }
            
                    .container {
                        width: 210mm;
                        height: 297mm;
                        margin: 0 auto;
                        padding: 20px;
                        box-sizing: border-box;
                        background-color: #fff;
                        border: 1px solid #ddd;
                    }
            
                    @media print {
                        .noPrint {
                            display: none;
                        }
                        @page {
                            margin: 1cm;
                            size: A4;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                    }
            
                    .btn_print {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        /* Espacio entre el icono y el texto */
                        width: 20%;
                        padding: 12px 24px;
                        background-color: #7C6DFE;
                        color: white;
                        text-align: center;
                        text-transform: uppercase;
                        font-weight: bold;
                        font-size: 16px;
                        border-radius: 10px;
                        border: none;
                        margin: 20px auto;
                        cursor: pointer;
                        transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
                        box-shadow: 0 0 15px rgba(124, 109, 254, 0.7), 0 0 25px rgba(124, 109, 254, 0.5);
                        animation: pulse 2s infinite;
                        /* Animación de movimiento */
                    }
            
                    .btn_print:hover {
                        background-color: #6A5BF8;
                        box-shadow: 0 0 20px rgba(106, 91, 248, 0.8), 0 0 30px rgba(106, 91, 248, 0.6);
                    }
            
                    .btn_print:active {
                        background-color: #5748F2;
                        box-shadow: 0 0 15px rgba(87, 72, 242, 0.8), 0 0 25px rgba(87, 72, 242, 0.5);
                    }
            
                    .btn_print svg {
                        width: 30px;
                        height: 30px;
                        fill: white;
                    }
            
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
            
                        50% {
                            transform: scale(1.05);
                        }
            
                        100% {
                            transform: scale(1);
                        }
                    }
            
            
                    @media all {
                        div.saltopagina {
                            display: none;
                        }
                    }
            
                    @media print {
                        div.saltopagina {
                            display: block;
                            page-break-before: always;
                        }
                    }
            
                    .table-bordered {
                        border: 1px solid #f4f4f4;
                    }
            
                    .table-bordered>tbody>tr>td,
                    .table-bordered>tbody>tr>th,
                    .table-bordered>tfoot>tr>td,
                    .table-bordered>tfoot>tr>th,
                    .table-bordered>thead>tr>td,
                    .table-bordered>thead>tr>th {
                        border: 1px solid #ddd;
                    }
            
                    table {
                        border-collapse: collapse;
                        border-spacing: 0;
                    }


                    /* Tabla con bordes redondeados */
                    .invoice-table {
                        width: 100%;
                        border-collapse: separate;
                        border-spacing: 0;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        overflow: hidden;
                    }

                    .invoice-table thead th {
                        background-color: #e8e9ed;
                        
                        padding: 5px;
                        text-align: left;
                    }

                    .invoice-table th, .invoice-table td {
                        padding: 5px;
                        border-bottom: 1px solid #ddd;
                    }

                    .invoice-table tbody tr:last-child td {
                        border-bottom: none;
                    }

                    .invoice-table tfoot {
                        background-color: #f4f4f4;
                    }

                    .invoice-table tfoot td {
                        font-weight: bold;
                        padding: 5px;
                    }

                    .invoice-table tfoot td:last-child {
                        text-align: right;
                    }

                    /* Estilo para totales */
                    .total-row td {
                        border-top: 2px solid #e8e9ed;
                        font-size: 12px;
                    }

                    .text-center {
                        text-align:center;
                    }

                    .text-left {
                        text-align:left;
                    }

                    .text-right {
                        text-align:right;
                    }

                </style>
            
            </head>
            
            <body>
                <div class="noPrint" style="text-align:center; margin-bottom: 10px;">
                    <button class="btn_print" onclick="window.print();">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 7h-14c-1.103 0-2 .897-2 2v8h4v4h12v-4h4v-8c0-1.103-.897-2-2-2zm-3 12h-8v-5h8v5zm3-7h-14v-3h14v3zm-3-8v-3h-8v3h-5v4h18v-4h-5z" />
                        </svg>
                        IMPRIMIR DOCUMENTO
                    </button>
                </div>
                <div class="container">
                    `+content+`
                </div>
            </body>
            
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close();

        if(fl_auto_print == true)
        {
            ventana.onload = function() {
                ventana.print();
            };
        }        

        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },

    print_etiquetas: async (content, fl_auto_print = false) =>{
        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
                <head>
                    <title>Impresión</title>    
                    <style>
                        body, td, tr, th, span, p{
                            font-family: monospace;
                            font-size: 11px;
                        }

                        @media print
                        {
                            .noPrint{display:none;}

                            @page {
                                size: 7cm 5cm;
                                margin: 0cm;
                            }

                            body {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }

                            .page {
                                background: white;
                                display: block;
                                margin: 0cm 0.04cm 0cm 0cm;
                                page-break-after: always;
                            }

                            .size-ticket {
                                width: 7cm;
                                height: 5cm;
                                border: 1px dashed black;
                            }

                            .page-content {
                                width: 100%;
                                height: 100%;
                                box-sizing: border-box;
                                padding: 0.5cm;
                            }
                            
                        }

                        .btn_print {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 10px;
                            /* Espacio entre el icono y el texto */
                            padding: 12px 24px;
                            background-color: #7C6DFE;
                            color: white;
                            text-align: center;
                            text-transform: uppercase;
                            font-weight: bold;
                            font-size: 16px;
                            border-radius: 10px;
                            border: none;
                            margin: 20px auto;
                            cursor: pointer;
                            transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
                            box-shadow: 0 0 15px rgba(124, 109, 254, 0.7), 0 0 25px rgba(124, 109, 254, 0.5);
                            animation: pulse 2s infinite;
                            /* Animación de movimiento */
                        }
                
                        .btn_print:hover {
                            background-color: #6A5BF8;
                            box-shadow: 0 0 20px rgba(106, 91, 248, 0.8), 0 0 30px rgba(106, 91, 248, 0.6);
                        }
                
                        .btn_print:active {
                            background-color: #5748F2;
                            box-shadow: 0 0 15px rgba(87, 72, 242, 0.8), 0 0 25px rgba(87, 72, 242, 0.5);
                        }
                
                        .btn_print svg {
                            width: 30px;
                            height: 30px;
                            fill: white;
                        }
                
                        @keyframes pulse {
                            0% {
                                transform: scale(1);
                            }
                
                            50% {
                                transform: scale(1.05);
                            }
                
                            100% {
                                transform: scale(1);
                            }
                        }
            

                          @media all {
                            div.saltopagina{
                                display: none;
                            }
                          }
                            
                          @media print{
                            div.saltopagina{
                                display:block;
                                page-break-before:always;
                            }
                          }

                        .table-bordered {
                            border: 1px solid #f4f4f4;
                        }

                        .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
                            border: 1px solid #ddd;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }


                    </style>   
                    
                </head>
                <body>
                    <div class="noPrint" style="text-align:center; margin-bottom: 10px;">
                        <button class="btn_print" onclick="window.print();">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 7h-14c-1.103 0-2 .897-2 2v8h4v4h12v-4h4v-8c0-1.103-.897-2-2-2zm-3 12h-8v-5h8v5zm3-7h-14v-3h14v3zm-3-8v-3h-8v3h-5v4h18v-4h-5z" />
                            </svg>
                            IMPRIMIR DOCUMENTO
                        </button>
                    </div>
                    <div style="display: flex;flex-direction: column;align-items: center;">
                        `+content+`
                    </div>
                </body>
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close();

        if(fl_auto_print == true)
        {
            ventana.onload = function() {
                ventana.print();
            };
        }        

        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },


    print_html_pdf: async (content, factura) =>{

        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
                <head>
                    <title>Impresión</title>    
                    <style>
                        body, td, tr, th, span, p{
                            font-family:Tahoma;
                            font-size:12px;
                        }

                        @media print
                        {
                            .noPrint{display:none;}
                        }

                        .btn_print {
                            margin-bottom:10px;
                            position:relative;
                            width: auto;
                            color:#ecf0f1;
                            text-decoration:none;
                            border-radius:5px;
                            border:solid 1px #f39c12;
                            background:#e67e22;
                            text-align:center;
                            padding:12px 18px 10px;
                            font-weight:bold;
                            font-size:14px !important;
                          
                            -webkit-transition: all 0.1s;
                            -moz-transition: all 0.1s;
                            transition: all 0.1s;
                          
                            -webkit-box-shadow: 0px 6px 0px #d35400;
                            -moz-box-shadow: 0px 6px 0px #d35400;
                            box-shadow: 0px 6px 0px #d35400;
                            cursor:pointer;
                          }

                          .btn_print:active{
                            -webkit-box-shadow: 0px 2px 0px #d35400;
                            -moz-box-shadow: 0px 2px 0px #d35400;
                            box-shadow: 0px 2px 0px #d35400;
                            position:relative;
                            top:4px;
                          }

                          @media all {
                            div.saltopagina{
                                display: none;
                            }
                          }
                            
                          @media print{
                            div.saltopagina{
                                display:block;
                                page-break-before:always;
                            }
                          }

                        .table-bordered {
                            border: 1px solid #f4f4f4;
                        }

                        .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
                            border: 1px solid #ddd;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                    </style>   

                    <script src="assets/library/html2pdf/html2pdf.bundle.min.js" type="text/javascript"></script>
          
                </head>
                <body>
                    <div class="noPrint" style="text-align:center;"> <button class="btn_print" onclick="window.print();">CLICK PARA IMPRIMIR</button></div>
                    <div style="width:100%;" id="contenido">
                        `+content+`
                    </div>
                </body>

                <script>

                    const $elementoParaConvertir = document.querySelector('#contenido');
                    html2pdf()
                        .set({
                            margin: 1,
                            filename: '`+factura+`.pdf',
                            image: {
                                type: 'jpeg',
                                quality: 0.98
                            },
                            html2canvas: {
                                scale: 3, 
                                letterRendering: true,
                            },
                            jsPDF: {
                                unit: "in",
                                format: "a4",
                                orientation: 'landscape' 
                            }
                        })
                        .from($elementoParaConvertir)
                        .save()
                        .catch(err => console.log(err));


                </script>
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close(); 
        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },

    fecha_hora: (fecha_hora = null, formato = 'DD/MM/YYYY HH:mm:ss') => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY-MM-DD HH:mm:ss").format(formato);

        if(fecha_hora == null)
        {
            parsed = moment().format(formato);
        }        

        return parsed;
    },

    fecha: (fecha = null, formato = 'DD/MM/YYYY') => {
        
        moment.locale('es');   

        let parsed = moment(fecha, "YYYY-MM-DD").format(formato);

        if(fecha == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },

    hora: (hora = null, formato = 'hh:mm A') => {
        moment.locale('es');
    
        let parsed = moment(hora, "HH:mm:ss").format(formato);
    
        if (hora == null) {
            parsed = moment().format(formato);
        }
    
        return parsed;
    },
    

    fecha_standar: (fecha = null, formato = 'YYYY-MM-DD') => {
        
        moment.locale('es');   

        let parsed = moment(fecha, "YYYY-MM-DD HH:mm:ss").format(formato);

        if(fecha == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },

    fecha_completo: (fecha_hora = null) => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY/MM/DD HH:mm:ss").format('LLLL');

        if(fecha_hora == null)
        {
            parsed = moment().format('LLLL');
        }
        

        return parsed;
    },

    fecha_ano: function()
    {
        moment.locale('es'); 

        let date = new Date();
        return date.getFullYear();
    },

    fecha_actual: function(format = 'A1')
    {
        moment.locale('es'); 
        
        let date = new Date();

        let dia = date.getDate();
        let mes = date.getMonth()+1;

        if(dia<10){ dia='0'+dia; }
        if(mes<10){ mes='0'+mes; }

        let formatDate = (format == 'A1' ? (date.getFullYear()+'-'+mes+'-'+dia) : (dia + '/'+mes+'/'+date.getFullYear()));

        return formatDate;
    },

    hora_actual: function()
    {
        moment.locale('es');   

        let parsed = moment().format('HH:mm');        

        return parsed;
    },

    primer_dia_mes: function(format = 'A1')
    {
        moment.locale('es'); 

        let formatDate = (format == 'A1' ? 'YYYY-MM-DD' : 'DD/MM/YYYY');
        
        let primerDia = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   
        return moment(primerDia).format(formatDate);

    },

    primer_dia_semana: function()
    {
        moment.locale('es'); 
        let primerDia = moment().startOf('week').toDate();
        return moment(primerDia).format('YYYY-MM-DD');

    },

    ladda:(id_dom)  => {

        let ladda = Ladda.create(document.querySelector(id_dom));
        ladda.start();

        return ladda;

    },

    reset_form: function(d) {
        d.trigger("reset");
        d.get(0).reset();
        d.find('textarea').text('');
        d.find('select').val("").change();
    },

    load_component: function()
    {
        /** SCROLL 
        $('.modal-body').slimScroll({
            height: "auto"
        });

        $('.table-responsive').slimScroll({
            height: "auto"
        });
        */

        $('.select').select2({
            minimumResultsForSearch: -1
        });

        /** TODOS LOS INPUT A MAYÙSCULAS */

        $(document).on('keyup', 'input[type="text"]', function(e) {
            e.stopImmediatePropagation();
            let input=$(this);

            /** EN MAYUSCULAS ALGUNOS CAMPOS NO */
            if(input.data('mayus')){
                if(input.data('mayus') != false)
                {
                    input.val(input.val().toUpperCase());
                }
            }
        });

        $('[data-toggle="tooltip"]').tooltip();
    },

    preview_image: function(input, dom) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                dom.attr('src', e.target.result);
                dom.hide();
                dom.fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    get_json: function(data) {
        
        var jsonData = (data).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        let obj = JSON.parse(jsonData);

        return obj;
    },

    get_attr_json: function(row) {
        let tr = row.parents('tr');
        let obj = JSON.parse(tr[0].dataset.json);

        return obj;
    },

    safe_json: function(data) {

        var jsonData = JSON.stringify(data);
        var safeJsonData = jsonData.replace(/\\/g, '\\\\')
                                .replace(/"/g, '\\"'); 

        return safeJsonData;
    },

    notificacion: function(mensaje, tipo = 'info') {

        
        toastr.options = {
            "timeOut": "2000",  // Tiempo en milisegundos (2 segundos)
            "extendedTimeOut": "1000"  // Tiempo de espera adicional cuando se interactúa con la notificación
        };
        
        let _icono = '',
            _tipo = '',
            _titulo = '';

        switch (tipo) {
            case 'success':
                _icono = 'fa fa-check';
                _titulo = 'Éxito!';
                _tipo = 'success';
            break;
            case 'info':
                _icono = 'fa fa-exclamation-circle';
                _titulo = 'Información!';
                _tipo = 'info';
            break;
            case 'danger':
                _icono = 'fa fa-exclamation-triangle';
                _titulo = 'Error!';
                _tipo = 'error';
            break;
            case 'warning':
                _icono = 'fas fa-engine-warning';
                _titulo = 'Advertencia!';
                _tipo = 'warning';
            break;
        }
        
        toastr[_tipo](mensaje, _titulo, {
            showMethod: 'slideDown',
            hideMethod: 'slideUp',
            closeButton: true,
            tapToDismiss: false,
            progressBar: true,
            rtl: false
        });

          

    },

    notificacion_v2: function(mensaje, tipo = 'success') {
        let _icono = '',
            _tipo = '',
            _titulo = '';

        switch (tipo) {
            case 'success':
                _icono = 'fa fa-check';
                _titulo = 'Éxito!';
                _tipo = 'success';
            break;
            case 'info':
                _icono = 'fa fa-exclamation-circle';
                _titulo = 'Información!';
                _tipo = 'info';
            break;
            case 'danger':
                _icono = 'fa fa-exclamation-triangle';
                _titulo = 'Error!';
                _tipo = 'error';
            break;
            case 'warning':
                _icono = 'fas fa-engine-warning';
                _titulo = 'Advertencia!';
                _tipo = 'warning';
            break;
        }
        
        Swal.fire({
            title: _titulo,
            text: mensaje,
            icon: _tipo,
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
            buttonsStyling: false
        });
    },

    strtrunc: (str, max, add) => {
        add = add || '...';
        return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
    },

    download: function(url)
    {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
              console.log(response.headers);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            var nombre_archivo = (response.headers["content-disposition"].split("filename=")[1]).slice(0, -1);
            nombre_archivo = nombre_archivo.substring(1)
            link.setAttribute('download', nombre_archivo);
            document.body.appendChild(link);
            link.click();
          });
    },

    isDark: function(color_hex) {
        
        var r = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(0,2),16);
        var g = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(2,4),16);
        var b = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(4,6),16);

        var color_rgb = 'rgb('+r+','+g+','+b+')';

        var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color_rgb);
        var result = ( match[1] & 255 )
             + ( match[2] & 255 )
             + ( match[3] & 255 )
               < 3 * 256 / 2;

        if(result)
        {
            return '#fff';
        }
        else
        {
            return '#000';
        }
    },

    active_sidebar: function(menu) {

        menu = 'sidebar-' + menu;

        $('#side-menu li a').removeClass('active');
        $('#side-menu li').removeClass('active');

        var particion = menu.split("-");

        switch (particion.length) {
            case 2:
                $('#' + particion[0] + '-' + particion[1]+ ' a').addClass('active');
                break;
            case 3:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('open');
                // $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');
                break;

            case 4:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('open');
                // $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');

                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('active');
                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('open');
                // $('#' + particion[0] + '-' + particion[1] + '-' + particion[2] + ' > .treeview-menu').css('display', 'block');
                break;
            default:

        }

        $('#' + menu).addClass('active');
    },

    DeleteRegistro: async (accion = 'D') => {  
        var texto1 = accion == 'D' ? 'Eliminar' : 'Anular';
        var texto2 = accion == 'D' ? 'eliminado' : 'anulado';
    
        return Swal.fire({
            title: `¿Estás seguro de ${texto1}?`,
            text: `Una vez ${texto2}, no podrás recuperar este registro!`,
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: false,
            confirmButtonText: 'Sí, '+ texto1,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',  // Color del botón de confirmación
            cancelButtonColor: '#3085d6',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes manejar la acción de eliminar
                Swal.close();  // Cierra el SweetAlert después de la confirmación
                return true;
            } else {
                // Acción si se cancela la operación
                Swal.close();  // Cierra el SweetAlert si se cancela
                return false;
            }
        });
    },

    DeleteSimple: function() {
    
        return Swal.fire({
            title: `¿Estás seguro de la eliminación?`,
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: false,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',  // Color del botón de confirmación
            cancelButtonColor: '#3085d6',
            dangerMode: true,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes manejar la acción de eliminar
                Swal.close();  // Cierra el SweetAlert después de la confirmación
                return true;
            } else {
                // Acción si se cancela la operación
                Swal.close();  // Cierra el SweetAlert si se cancela
                return false;
            }
        });
    },

}

window.HELPER = HELPER;