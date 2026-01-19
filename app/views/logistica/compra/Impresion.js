/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

 import Numero_letra from '../../recursivo/Numero_letras.js'
 
 let Componente = {
 
     print: async (id) => {
 
         await axios.get(BASE_API + 'logistica/compra/imprimir/'+id)
         .then(function (response) {
             
            let data = response.data;

            Componente.print_a4(data);
 
         }).catch(error => {
             console.log(error);
         }); 
     },

     print_a4: (data) => {
 
        let html = `
            <div style="max-width:842px; margin:auto;"> 
                <table  style="width:100%;">
                    <tr>
                        <td style="width:65%;">
                            <img src="`+BASE_FILES+`images/`+data.proveedor.imagen+`" style="max-height:70px;"/>
                            <div style="font-weight:bold; text-align:left;"><strong>`+data.proveedor.razon_social+`</strong></div>
                            <div>`+data.proveedor.direccion+`</div>
                        </td>
                        <td style="width:35%;">
                            <div style="text-align:center; background-color:#eeeeee !important; border: 1px solid #bebdbd !important; border-radius:8px; padding:8px;">
                                <div style="font-size:18px;" ><strong style="font-size:14px">RUC : `+data.proveedor.numero_documento+`</strong></div>
                                <div style="font-weight:bold; font-size:18px;">`+data.comprobante+`</div>
                                <div  style="font-weight:bold; font-size:18px;"><strong>`+data.serie+`-`+data.numero+`</strong></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:100%; vertical-align:top;" colspan="2">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                <table style="width:100%;">
                                    <tr>
                                        <td><strong>FECHA</strong></td>
                                        <td>`+HELPER.fecha(data.fecha)+`</td>
                                    </tr>
                                    <tr>
                                        <td><strong>MONEDA</strong></td>
                                        <td>`+data.moneda+`</td>
                                    </tr>
                                    <tr>
                                        <td><strong>TIPO CAMBIO</strong></td>
                                        <td>`+data.tipo_cambio+`</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CONDICIÓN DE PAGO</strong></td>
                                        <td>`+data.condicion_pago+ ((data.dias_pagar != null) ? ` / `+data.dias_pagar+` DIAS` : '')+ `</td>
                                    </tr>
                                    <tr>
                                        <td style="width:150px; vertical-align:top;"><strong>ORDEN DE COMPRA</strong></td>
                                        <td style="vertical-align:top;">`+data.orden_compra+`</td>
                                    </tr>
                                </table>
                            </div>                    
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table class="detalle" style="width:100%; margin-top:10px; border-collapse:collapse;">
                                <thead>
                                    <tr>
                                        <th style="font-weight:bold; width:50px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 1px !important; text-align:center;">CANT.</th>
                                        <th style="font-weight:bold; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; text-align:left; min-width:250px !important;">DESCRIPCIÓN</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">V.U.</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">P.U.</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">IGV.</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 0 !important; width:100px !important; text-align:right;">IMPORTE</th>                                
                                    </tr>
                                </thead>                            
                                <tbody>`;
    
                                data.detalle.forEach(row => {
                                    html += `
                                        <tr>
                                            <td style="text-align:center;">`+row.cantidad+`</td>
                                            <td>`+row.articulo+` `+row.descripcion+`</td>
                                            <td style="text-align:right;">`+row.valor_unitario+`</td>
                                            <td style="text-align:right;">`+row.precio_unitario+`</td>
                                            <td style="text-align:right;">`+row.igv+`</td>
                                            <td style="text-align:right;">`+row.importe+`</td>
                                        </tr>
                                    `;
                                });
                                    
                            html += `</tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4"></td>
                                        <td colspan="2" valign="top">
                                            <div style="border:none;  margin-top:5px;">
                                                <table style="width:100%; border-collapse:collapse;">
                                                    <tr>
                                                        <td style="font-weight:bold; font-size:11px !important; border-collapse:collapse;" align="left">
                                                            <div><strong>TOTAL: `+data.simbolo_moneda+`</strong></div>
                                                        </td>
                                                        <td  align="right" style="font-size:11px !important; border-collapse:collapse;">
                                                            <div>`+data.total_importe+`</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="8" align="center" style="padding-bottom:50px;">
                                            <strong>IMPORTE EN LETRAS: </strong> `+Numero_letra.convertir(data.total_importe, data.moneda)+`
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                </table>  
            </div>
            
        `;
 
         HELPER.print(html);
 
     },

     qr: (id) => {

        axios.get(BASE_API + 'logistica/compra/imprimir/'+id)
        .then(function (response) {
            
            let html = `
                <script src="assets/library/qrcode_generator/qrcode_generator.js"></script>

                <div style="max-width:842px; margin:auto;"> 
            `;
            
            let contador_articulo = 0;
            response.data.detalle.forEach(row => {
                
                contador_articulo++;

                let cantidad = parseInt(row.cantidad);
                let contador_qr = 0;

                while (contador_qr < cantidad) {
                                       
                    contador_qr++;

                    html += `

                        <div align="center">
                            <div data-id="`+row.id_articulo+contador_qr+`"></div>  
                            <div style="margin-top:5px;">`+row.articulo+`</div>
                        </div>

                        <script>
                            new QRCode(document.querySelector('div[data-id="`+row.id_articulo+contador_qr+`"]'), {
                                text: "`+row.codigo_barra+`",
                                width : 150,
                                height : 150
                            });

                        </script>
                    `;

                    if(contador_qr < cantidad)
                    {
                        html += `<div class="saltopagina"></div>`;
                    }
                    else
                    {
                        if(contador_articulo < response.data.detalle.length)
                        {
                            html += `<div class="saltopagina"></div>`;
                        }
                    }

                    /**** IMPRIMIR UN SOLO EJEMPLAR QR */
                    if(row.fl_cantidad_qr_unico == 1)
                    {
                        contador_qr = cantidad;
                    }
                }                

            });
           

            html += `
                </div>                
            `;

            HELPER.print(html);

        }).catch(error => {
            console.log(error);
        }); 

        

     }
 } 
 
 export default Componente;