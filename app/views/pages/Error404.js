
let Error404 = {

    render : async () => {
        let view =  /*html*/`
       

        <section class="content" style="margin-top:10%;">
            <div class="error-page">
                <h2 class="headline text-warning"> 404</h2>

                <div class="error-content">
                <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Página no encontrada.</h3>

                <p>
                No pudimos encontrar la página que buscaba. Haz <a href="`+BASE_URL+`">click aquí</a> para dirigirte a la página principal.
                </p>

                
                </div>
                <!-- /.error-content -->
            </div>
            <!-- /.error-page -->
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;