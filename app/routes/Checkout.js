
let Obj_router = async (router, d, data) => {

    router.get('#/checkout', async function() {
        HELPER.active_sidebar('checkout');
        let modulo = await import('../views/checkout/Checkout.js');
        modulo.default.render(d, data);
    });

    router.get('#/checkout/success', async function() {
        let modulo = await import('../views/checkout/estados/Success.js');
        modulo.default.render(d, data);
    });

}

export default Obj_router;