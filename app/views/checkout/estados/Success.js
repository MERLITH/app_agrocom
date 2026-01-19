

 let DOM, DOM_ID,__idModal ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

            <style>

                .success-box {
                    display: inline-block;
                    padding: 30px 45px;
                    border: 2px solid #28a745;
                    border-radius: 15px;
                    background: #e8f9ee;
                    max-width: 600px;
                }

                .success-icon {
                    font-size: 80px;
                    color: #28a745;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .success-title {
                    font-size: 32px;
                    color: #28a745;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .success-text {
                    font-size: 18px;
                    color: #333;
                }


            </style>

            <section id="checkout" class="checkout section d-flex align-items-center justify-content-center" style="height: 600px;">
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <div class="row">
                        <div class="col-12 text-center">
                            
                            <div class="success-box">
                            <div class="success-icon">
                                ✓
                            </div>
                            <h2 class="success-title">¡Pago realizado con éxito!</h2>
                            <p class="success-text">Su pedido se ha procesado correctamente. ¡Gracias por su compra!</p>
                            </div>

                        </div>
                        <div class="col-12 text-center mt-5">  
                            <a href="#/tienda" class="btn btn-link w-100">
                                <i class="bi bi-arrow-left"></i> Continuar comprando
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </div>    
         `;
 
         await Componente.after_render();       
         
    },
 
    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);

        Componente.checkout_success();

        HELPER.load_component();
    },

    /**** Variables globales */
    id: null,
    id_persona: null,
    arrayItems: null,
    total_monto: null,
    obj_misdatos: null,

    checkout_success: async function () {


        let params = new URLSearchParams(window.location.href);

        if ([...params].length <= 1) {
            location.href = "#/inicio";
            return;
        } 

        let data = {
            collection_id:       params.get("collection_id"),
            collection_status:   params.get("collection_status"),
            payment_id:          params.get("payment_id"),
            status:              params.get("status"),
            external_reference:  params.get("external_reference"),
            payment_type:        params.get("payment_type"),
            merchant_order_id:   params.get("merchant_order_id"),
            preference_id:       params.get("preference_id"),
            site_id:             params.get("site_id"),
            processing_mode:     params.get("processing_mode"),
            merchant_account_id: params.get("merchant_account_id"),
        };

        console.log("🐱‍🏍 DATA COMPLETA DE MERCADOPAGO:", data);

        let row = await $.fetchData('get', 'orden/checkout/success', data);
        if ($.validarResp(row).ok) {

            if(row.codigo == 2){
                location.href = "#/inicio";
            }

            $.get_cantidades_Main();
            // setTimeout(() => {
            //     location.href = "#/inicio";
            // }, 3000);
        }
    },

 } 
 
 export default Componente;