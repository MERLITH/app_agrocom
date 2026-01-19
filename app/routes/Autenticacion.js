import Autenticacion_view from '../views/autenticacion/Login.js';
import Recuperacion_view from '../views/autenticacion/Recuperacion.js';
import Restablecer_view from '../views/autenticacion/Restablecer.js';

let Obj_router = async (router, d, data_user) => {

    router.get('#/inicio', async function() {            
        $(document).off();
        Autenticacion_view.render(d, data_user);     
    });    
    
    router.get('#/recuperacion', async function() {            
        $(document).off();
        Recuperacion_view.render(d); 
    });    

    /* RESTABLECER */
    router.get('#/restablecer/:salt', function() {
        $(document).off();
        Restablecer_view.render(d, this.params['salt']); 
    });

    router.run('#/inicio');

}

export default Obj_router;