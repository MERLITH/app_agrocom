
const contenedor_principal = document.getElementById('contenedor_principal');

let Main = {

    initialize: async () => {
        axios({
            method: 'post',
            url: BASE_API+'app/initial',
            headers: {
                'Token': localStorage.getItem("Token"),
                'tipo': 'initial'
            },
        })
        .then(function(response) {
                   
            var data = response.data;   

            // console.log("daniel")
            // console.log(data)
 
            Main.body('app', data);       

        }).catch(error => {

            /*** VIEW LOGIN */
            // Main.body('app', null);
            // console.log("caleb");
            console.log(error);
            Main.body('autenticacion', error.response.data);
        });
    },

    body: async (tipo, data_user = null) => {
        (async () => {

            if(tipo == 'app_cliente')
            {
                // DRAW BODY APP CLIENTES
                let html_main = await import('../views_cliente/componentes/Main_app.js');                
                await $('#contenedor_principal').html(html_main.default.render(data_user));
                html_main.default.after_render(data_user);
            }
            else if(tipo == 'app')
            {
                // DRAW BODY APP
                let html_main = await import('../views/componentes/Main_app.js');                
                await $('#contenedor_principal').html(html_main.default.render(data_user));
                html_main.default.after_render(data_user);
            }
            else
            {
                // DRAW BODY AUTENTICATION
                let html_main = await import('../views/componentes/Main_autenticacion.js');                
                await $('#contenedor_principal').html(html_main.default.render(data_user));
            }
            
            // ENRUTADOR        
            let modulo = await import('./Sammy_router.js');
            await modulo.default.run(tipo, data_user);
            contenedor_principal.style.display = 'block';
            
            Main.hide_preloader();
            
        })();
    },

    
    hide_preloader: async () => {
        
        // DESACTIVAR PRELOADER
        var preloader = document.getElementById('loader');
        if(!preloader.classList.contains('done') )
        {
            preloader.classList.add('done');
        }
        
    }

}

export default Main;