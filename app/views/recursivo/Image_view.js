let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div id="image_view_dom">
            <div class="modal inmodal fade" name="modal-image_view" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Visualización de Imagen</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">                
                                <div class="col-md-12" style="text-align:center";">
                                    <img name="image_view" style="max-width:100%;" />
                                </div>
                            </div>                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return html;
    },

    initital: (image, d = 'image_view_dom') => {       
        
        DOM_ID = '#'+d; // NO ELIMINAR IMPORTANTE
        DOM = $(DOM_ID); // NO ELIMINAR IMPORTANTE

        DOM.find('img[name="image_view"]').attr('src', BASE_FILES+'images/'+image);
            
        DOM.find('div[name="modal-image_view"]').modal('show');

    },


};

export default Componente;