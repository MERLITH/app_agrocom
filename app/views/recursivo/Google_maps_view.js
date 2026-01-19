let DOM, DOM_ID ;

let Componente = {

    render: () => {
        let html = `
        <div id="mapa_view_dom">
            <div class="modal inmodal fade" name="modal-mapa_view" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Visualización Ubicación</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">                
                                <div class="col-md-12">
                                    <div id="mapa_view" style="height:500px; width:100%;"></div>
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

    initital: (array_latlng, d = 'mapa_view_dom') => {       
        
        console.log(array_latlng);

        DOM_ID = '#'+d; // NO ELIMINAR IMPORTANTE
        DOM = $(DOM_ID); // NO ELIMINAR IMPORTANTE
        
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();

        var map = new google.maps.Map(document.getElementById('mapa_view'), {
            zoom: 16,
            center: new google.maps.LatLng(array_latlng[0].latitud, array_latlng[0].longitud),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        for (let i = 0; i < array_latlng.length; i++) {
            
            var marker = new google.maps.Marker({
                animation: google.maps.Animation.BOUNCE,
                position: new google.maps.LatLng(array_latlng[i].latitud, array_latlng[i].longitud),
                map: map
            });
    
            bounds.extend(marker.position);
    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(array_latlng[i].contenido);
                    infowindow.open(map, marker);
                }
            })(marker, i));
            
        }

        map.fitBounds(bounds);

        var listener = google.maps.event.addListener(map, "idle", function () {
            map.setZoom(14);
            google.maps.event.removeListener(listener);
        });

        DOM.find('div[name="modal-mapa_view"]').modal('show');

    },


};

export default Componente;