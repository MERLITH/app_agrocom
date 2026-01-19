
let Obj_router = async (router, d, data) => {

    router.get('#/tienda', async function() {
        HELPER.active_sidebar('tienda');
        let modulo = await import('../views/tienda/Tienda.js');
        modulo.default.render(d, data);
    });

}

export default Obj_router;