
let Obj_router = async (router, d, data) => {

    router.get('#/producto/:id_producto?', async function() {
        HELPER.active_sidebar('producto');
        let modulo = await import('../views/producto/Producto.js');
        modulo.default.render(d, data, this.params["id_producto"]);
    });

    
}

export default Obj_router;