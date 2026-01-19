
let Obj_router = async (router, d, data) => {

    router.get('#/inicio', async function() {
        HELPER.active_sidebar('inicio');
        let modulo = await import('../views/inicio/Inicio.js');
        modulo.default.render(d, data);
    });

    
}

export default Obj_router;