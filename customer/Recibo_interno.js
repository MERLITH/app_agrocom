/**
 * @author Daniel Gómez
 * @email caleb.gb97@gmail.com
 * @create date 2024-01-01 8:05:19
 * @modify date 2024-01-01 8:05:19
 * @desc [description]
 */

import Numero_letra from '../app/views/recursivo/Numero_letras.js'

let Componente = {

    print: async (id) => {
        console.log('dffffffff');
        await axios.get(BASE_API + 'facturacion/factura/imprimir/'+id)
        .then(function (response) {
            
            let data = response.data;
            Componente.print_a4(data);
            console.log(data);
        }).catch(error => {
            console.log(error);
        }); 
    },
    
    print_a4: (data) => {

            let html = `<div style="max-width:842px; margin:auto;">

            <table  style="width:100%;">
                <tr>
                    <td style="width:65%;">
                        <img src="`+BASE_FILES+`images/`+data.empresa.logo+`" style="max-height:70px;"/>
                        <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                        <div>`+data.empresa.direccion+`</div>
                        <div>`+data.empresa.telefono+`</div>
                        <div>`+data.empresa.email+`</div>
                    </td>
                    <td style="width:35%;">
                        <div style="text-align:center; background-color:#eeeeee !important; border: 1px solid #bebdbd !important; border-radius:8px; padding:8px;">
                            <div style="font-size:18px;" ><strong style="font-size:14px">RUC : `+data.empresa.numero_documento+`</strong></div>
                            <div style="font-weight:bold; font-size:18px;">`+data.comprobante+`</div>
                            <div  style="font-weight:bold; font-size:18px;"><strong>`+data.factura+`</strong></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="width:65%; vertical-align:top;">
                        <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                            <table style="width:100%;">
                                <tr>
                                    <td colspan="2"><strong>DATOS DEL CLIENTE</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>`+data.documento+`</strong></td>
                                    <td>`+data.cliente_numero_documento+`</td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:top;"><strong>CLIENTE</strong></td>
                                    <td style="vertical-align:top;">`+data.cliente_razon_social+`</td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:top;"><strong>DIRECCIÓN</strong></td>
                                    <td style="vertical-align:top;">`+data.cliente_direccion+`</td>
                                </tr>
                            </table>
                        </div>                    
                    </td>
                    <td style="width:35%; vertical-align:top;">
                        <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                            <table style="width:100%;">                            
                                <tr>
                                    <td><strong>FECHA EMISIÓN</strong></td>
                                    <td>`+HELPER.fecha(data.fecha)+`</td>
                                </tr>
                                <tr>
                                    <td><strong>MONEDA</strong></td>
                                    <td>`+data.moneda+`</td>
                                </tr>
                                <tr>
                                    <td><strong>CONDICIÓN DE PAGO</strong></td>
                                    <td>`+data.condicion_pago+ ((data.dias_pagar != null) ? ` / `+data.dias_pagar+` DIAS` : '')+ `</td>
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
                                    <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">PRECIO.</th>
                                    <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 0 !important; width:100px !important; text-align:right;">IMPORTE</th>                                
                                </tr>
                            </thead>                            
                            <tbody>`;

                            data.detalle.forEach(row => {
                                html += `
                                    <tr>
                                        <td style="text-align:center;">`+row.cantidad+`</td>
                                        <td>`+row.descripcion+`</td>
                                        <td style="text-align:right;">`+row.precio_unitario+`</td>
                                        <td style="text-align:right;">`+row.importe+`</td>
                                    </tr>
                                `;
                            });
                                
                        html += `</tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" name="informacion_adicional"></td>
                                    <td colspan="2" valign="top">
                                        <div style="border:none;  margin-top:5px;">
                                            <table style="width:100%; border-collapse:collapse;">
                                                <tr>
                                                    <td style="font-weight:bold; font-size:11px !important; border-collapse:collapse;" align="left">
                                                        <div><strong>TOTAL:</strong></div>
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
                                    <td colspan="8" align="center" style="padding-bottom:10px;">
                                        <strong>IMPORTE EN LETRAS: </strong> `+Numero_letra.convertir(data.total_importe)+`
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8" align="center">`+data.comentario+`</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
            

            `;

        HELPER.print(html);

    }
} 

export default Componente;