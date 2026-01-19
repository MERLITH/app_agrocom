
let Obj_router = async (router, d, data) => {

    router.get('#/categoria/:id_categoria?', async function() {
        HELPER.active_sidebar('categoria');
        let modulo = await import('../views/categoria/Categoria.js');
        modulo.default.render(d, data, this.params["id_categoria"]);
    });

    
}

export default Obj_router;