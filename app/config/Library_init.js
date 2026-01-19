function show_loader() {
    $.LoadingOverlay("show", {
        image: "",
        background: "rgba(0, 0, 0, 0.6)",//"rgba(255, 255, 255, 0.5)",
        fontawesome: "fa-solid fa-cloud-bolt", // String/Boolean  fa-solid fa-spinner
        fontawesomeAnimation: "900ms fadein", //rotate_right
        fontawesomeAutoResize: false,
        fontawesomeResizeFactor: 0.8,
        fontawesomeColor: "#00A9FF",
        fontawesomeOrder: 2,
        size: 50,
        maxSize: 50,
        minSize: 50
    });
}

function hide_loader() {
    $.LoadingOverlay("hide");
}

/** AXIOS INTERCEPCIONES */
axios.interceptors.request.use(function(config) {
        
    $.LoadingOverlay("show", {
        image: "",
        //text: "Loading...",
        background: "rgba(0, 0, 0, 0.6)",
        fontawesome: "fa-solid fa-cloud-bolt", // String/Boolean
        fontawesomeAnimation: "900ms fadein", // String/Boolean
        fontawesomeAutoResize: false, // Boolean
        fontawesomeResizeFactor: 0.8, // Float
        fontawesomeColor: "#00A9FF", // String/Boolean
        fontawesomeOrder: 2,
        size: 50,
        maxSize: 50,
        minSize: 50
    });

    /** ENVIAR TOKEN HEADER AUTORIZATION */
    config.headers.Token = localStorage.getItem("Token");

    return config;
}, function(error) {
    $.LoadingOverlay("hide");
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    $.LoadingOverlay("hide");
    
    return response;
}, function(error) {            
    $.LoadingOverlay("hide");

    if (error.response) {

        let status = error.response.status;
        let data = error.response.data;

        if (status  === 401) {
            if (data.tipo != 'initial') {
                $.login_modal_mod(1);
            }
            else
            {
                alert(data.mensaje);
            }
        }
        else if (status === 400) {
            // Capturar el mensaje de error y mostrarlo en un alert
            let mensaje = typeof data === 'object' ? data.mensaje : data;
            let tipo = typeof data === 'object' ? data.tipo : 'danger';
            
            HELPER.notificacion(mensaje, tipo); 
            console.log("Error 400:", mensaje);
        }else {
            HELPER.notificacion('UPS! ocurrió un problema, consulte con soporte.', 'danger'); 
            console.log("Error inesperado:", error);
        }
    }else{
        console.log("Error sin respuesta del servidor:", error);
    }

    return Promise.reject(error);
});

/** AJAX JQUERY GLOBAL */

$.ajaxSetup({

    beforeSend: function(xhr) {
        xhr.setRequestHeader('Token', localStorage.getItem("Token"));
        show_loader();
    },
    complete: function(data) {

        if (data.status == 401) {
            location.reload();
        }

        hide_loader();
    },

    error: function(x, status, error) {
        if (x.status == 401) {
            location.reload();
        } else {
            console.log("AJAX - Error: " + status + "nError: " + error)
        }

        hide_loader();
    }
});

$.ajaxSetup({
    statusCode: {
        401: function(response) {
            /*location.href = BASE_URL;*/
        }
    }
});

/*** JQUERY VALIDATOR */

// jQuery.validator.setDefaults({ 

//     ignore: '*:not([name])', 
//     onkeyup: false,
//     onclick: false,
//     onfocusout: false,
//     event: "blur",
//     debug: true,

//     showErrors: function(errorMap, errorList){
//         var mensaje = '<div style="text-align:left;"><strong>Existe campos vacíos que son requeridos</strong> <br>';
    
//         $.each(errorList, function (key, entry) {
//           mensaje += '- '+entry.message+' <br>';
//         });

//         mensaje += '</div>'
    
//         if(errorList.length > 0)
//         {
//             HELPER.notificacion(mensaje, 'warning');
//         }
//     }
// });

