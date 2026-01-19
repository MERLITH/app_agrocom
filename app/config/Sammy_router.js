import Error404     from '../views/pages/Error404.js'
const d = document.getElementById('app');

let Sammy_router = {

    app: async (router, data_user) => {
        
        // CARGAR RUTAS DE NAVEGACIÓN ROUTER
        let modulo;

        // RUTAS PARA USUARIOS DEL APP
        modulo = await import('../routes/Inicio.js');
        modulo.default(router, d, data_user);

        modulo = await import('../routes/Categoria.js');
        modulo.default(router, d, data_user);
 
        modulo = await import('../routes/Tienda.js');
        modulo.default(router, d, data_user);  

        modulo = await import('../routes/Producto.js');
        modulo.default(router, d, data_user);  

        modulo = await import('../routes/Cart.js');
        modulo.default(router, d, data_user);
        
        modulo = await import('../routes/Checkout.js');
        modulo.default(router, d, data_user);  

        modulo = await import('../routes/Micuenta.js');
        modulo.default(router, d, data_user); 

        modulo = await import('../routes/Contacto.js');
        modulo.default(router, d, data_user);

        modulo = await import('../routes/Libro_reclamaciones.js');
        modulo.default(router, d, data_user);

        router.run('#/inicio');

        
    },

    autenticacion: async (router, data_user) => {
        
        // AGREGAR ROUTERS
        let modulo;

        modulo = await import('../routes/Autenticacion.js');
        await modulo.default(router, d, data_user);
        
        // INICIAR
        
    },

    run: async(tipo, data_user = null) => {        
        
        window.DATA_USER = data_user;

        // Inicializa la libreria Sammy JS para rutas por hash
        let router = Sammy('#app', async function() {
            
            // Página no existente
            this.notFound = async function(c) {
            
                if(tipo == 'autenticacion')
                {
                    location.href = "#/inicio";
                } 
                else
                {
                    //alert("esta pagina no existe");
                    d.innerHTML = await Error404.render();
                }          
            
            }        
        
        });

        if(tipo === 'app')
        {
            // Llamar rutas para el sistema dentro
            Sammy_router.app(router, data_user);
        }
        else if(tipo === 'autenticacion')
        {
            // Llamar rutas para autenticación visitante
            await Sammy_router.autenticacion(router, data_user);            
        }
    },
}

export default Sammy_router;