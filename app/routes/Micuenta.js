
let Obj_router = async (router, d, data) => {

    router.get('#/micuenta', async function() {
        //HELPER.active_sidebar('micuenta');
        let modulo = await import('../views/micuenta/Micuenta.js');
        modulo.default.render(d, data, this.params["tab"]);
    });

    
}

export default Obj_router;