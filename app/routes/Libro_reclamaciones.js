
let Obj_router = async (router, d, data) => {

    router.get('#/libro_reclamaciones', async function() {
        HELPER.active_sidebar('libro_reclamaciones');
        let modulo = await import('../views/libro_reclamaciones/Libro_reclamaciones.js');
        modulo.default.render(d, data);
    });

}

export default Obj_router;