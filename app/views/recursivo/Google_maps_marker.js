let DOM, DOM_ID ;

let geocoder;
let marker;
let latLng;
let latLng2;
let map;

let Componente = {

    render: () => {
        let html = `
        <div class="row" id="mapa_dom">
            <div class="col-md-12">
                <h4 style="margin:0; margin-bottom:10px; font-weight:bold;">Ubicación Geográfica</h4>
            </div>
            <div class="col-md-6">
                <div class="input-group" style="margin-bottom:0px;">
                    <span class="input-group-addon" style="width:100px;">Latitud</span>
                    <input type="text" name="mapa_latitud" class="form-control" autocomplete="off" >
                </div>
                <div class="input-group">
                    <span class="input-group-addon" style="width:100px;">Longitud</span>
                    <input type="text" name="mapa_longitud" class="form-control" autocomplete="off" >
                </div>
            </div>
            <div class="col-md-6"> 
                <div class="row">
                    <div class="col-xs-6">
                        <button type="button" name="get_coordenadas" class="btn btn-default" style="padding:8px 12px; "><i class="fa fa-search fa-2x"></i> <br> Coordenadas</button>                       
                    </div>
                    <div class="col-xs-6">
                        <button type="button" name="get_locacion" class="btn btn-default" style="padding:8px"><i class="fa fa-map-marker-alt fa-2x"></i> <br> Ubicación Actual</button>
                    </div>
                </div>
            </div>
            <div class="col-md-12" style="display:none;">
                <div class="form-group">
                    <label class="form-label">Dirección </label>
                    <input type="text" name="mapa_direccion" class="form-control" autocomplete="off" readonly>
                </div>
            </div>            
            <div class="col-md-12">
                <div>Ubicación en Mapa</div>
                <div id="mapCanvas" style="height:350px; margin-bottom:10px;"></div>
            </div>
        </div>
        `;

        return html;
    },

    initital: async (input_latitud = '36.7275974', input_longitud = '-4.4208521', d = 'mapa_dom') => {        

        DOM_ID = '#'+d; // NO ELIMINAR IMPORTANTE
        DOM = $(DOM_ID); // NO ELIMINAR IMPORTANTE

        DOM.find('input[name="mapa_longitud"]').val(input_longitud);
        DOM.find('input[name="mapa_latitud"]').val(input_latitud);

        geocoder = new google.maps.Geocoder();
        latLng = new google.maps.LatLng(input_latitud, input_longitud);

        map = new google.maps.Map(document.getElementById('mapCanvas'), {
            zoom:17,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP  
        });


        marker = new google.maps.Marker({
            position: latLng,
            title: 'Arrastra el marcador si quieres moverlo',
            map: map,
            draggable: true
        });

        google.maps.event.addListener(map, 'click', function(event) {
            Componente.updateMarker(event.latLng);
        });

        Componente.geocodePosition(latLng);

        google.maps.event.addListener(marker, 'dragstart', function() {
            Componente.updateMarkerAddress('Arrastrando...');
        });

        google.maps.event.addListener(marker, 'drag', function() {
            Componente.updateMarkerStatus('Arrastrando...');
            Componente.updateMarkerPosition(marker.getPosition());
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            Componente.updateMarkerStatus('Arrastre finalizado');
            Componente.geocodePosition(marker.getPosition());
        });



        
        /**** CLICK CORRDENADAS */
        DOM.on('click', 'button[name="get_coordenadas"]', function(e) {
            e.stopImmediatePropagation();

            let mapa_longitud = DOM.find('input[name="mapa_longitud"]').val();
            let mapa_latitud = DOM.find('input[name="mapa_latitud"]').val();


            Componente.initital(mapa_longitud, mapa_latitud);
        });

        /*** CLICK UBICACIÓN ACTUAL */
        DOM.on('click', 'button[name="get_locacion"]', function(e) {
            e.stopImmediatePropagation();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
        
                    Componente.initital(position.coords.latitude, position.coords.longitude);
                    
                    DOM.find('input[name="mapa_longitud"]').val(position.coords.longitude);
                    DOM.find('input[name="mapa_latitud"]').val(position.coords.latitude);
        
                });
        
            } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
            }
        });

    },
    
    geocodePosition : (pos) => {
        geocoder.geocode({
            latLng: pos
        }, function(responses) {
            if (responses && responses.length > 0) {
                Componente.updateMarkerAddress(responses[0].formatted_address);
            } else {
                Componente.updateMarkerAddress('No puedo encontrar esta direccion.');
            }
        });
    },

    codeLatLon: () => {

        let mapa_longitud = DOM.find('input[name="mapa_longitud"]').val();
        let mapa_latitud = DOM.find('input[name="mapa_latitud"]').val();

        str = mapa_longitud+" , "+mapa_latitud;
        latLng2 = new google.maps.LatLng(mapa_longitud ,mapa_latitud);
        marker.setPosition(latLng2);
        map.setCenter(latLng2);
        Componente.geocodePosition (latLng2);

    },

    codeAddress : () => {
        var address = DOM.find('input[name="mapa_direccion"]').val();
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            Componente.updateMarkerPosition(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
        } else {
            alert('La dirección escrita no existe o no fue válida');
        }
        });
    },

    codeAddress2 : (address) => {
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            Componente.updateMarkerPosition(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
            DOM.find('input[name="mapa_direccion"]').val(address);
        } else {
            alert('ERROR : ' + status);
        }
        });
    },

    updateMarkerStatus : (str) => {
        DOM.find('input[name="mapa_direccion"]').val(str);
    },

    updateMarkerPosition : (latLng) => {
        DOM.find('input[name="mapa_longitud"]').val(latLng.lng());
        DOM.find('input[name="mapa_latitud"]').val(latLng.lat());
    },

    updateMarkerAddress :(str) => {
        DOM.find('input[name="mapa_direccion"]').val(str);
    },

    updateMarker : (location) => {
        marker.setPosition(location);
        Componente.updateMarkerPosition(location);
        Componente.geocodePosition(location);
    }



};

export default Componente;