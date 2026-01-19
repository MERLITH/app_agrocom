let Componente = {

    articulo_unico: (data, cantidad, ancho, altura) => {

        let html = `
            <script src="assets/library/qrcode_generator/qrcode_generator.js"></script>
            <div style="max-width:842px; margin:auto;"> 
        `;
                    
        let contador_qr = 0;

        while (contador_qr < cantidad) {
                                
            contador_qr++;

            html += `

                <div align="center">
                    <div data-id="`+data.id+contador_qr+`"></div>  
                </div>

                <script>
                    new QRCode(document.querySelector('div[data-id="`+data.id+contador_qr+`"]'), {
                        text: "`+data.codigo_barra+`",
                        width : `+ancho+`,
                        height : `+altura+`
                    });

                </script>
            `;

            if(contador_qr < cantidad)
            {
                html += `<div class="saltopagina"></div>`;
            }
        }                
        

        html += `
            </div>                
        `;

        HELPER.print(html);
        

     }

};

export default Componente;