import Rastreo_unidad from '../views_cliente/principal/Rastreo_unidad.js';

let Componente = async (router, d, permisos) => {

    router.get('#/rastreo_unidad', async function() {
        HELPER.active_sidebar('rastreo_unidad');
        Rastreo_unidad.render(d, permisos);     
    });    
    
}

export default Componente;