
let Obj_router = async (router, d, data) => {

    router.get('#/contacto', async function() {
        HELPER.active_sidebar('contacto');
        let modulo = await import('../views/contacto/Contacto.js');
        modulo.default.render(d, data);
    });

}

export default Obj_router;