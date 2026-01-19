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
 
         await axios.get(BASE_API + 'logistica/orden_compra/imprimir/'+id)
         .then(function (response) {
             
            let data = response.data;

            Componente.print_a4(data);
 
         }).catch(error => {
             console.log(error);
         }); 
     },

     print_a4: (data) => {
 
        let html = `
            <style>
                div, th, td{
                    font-size:10px !important;
                }
            </style>
            <div style="max-width:842px; margin:auto;"> 
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
                                <div style="font-weight:bold; font-size:18px !important;">ORDEN DE COMPRA</div>
                                <div  style="font-weight:bold; font-size:18px !important;"><strong>`+data.serie+`-`+data.numero+`</strong></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:65%; vertical-align:top;">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:110px;">
                                <table style="width:100%;">
                                    <tr>
                                        <td colspan="2"><strong>DATOS DEL SOLICITANTE</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">`+data.solicitante+`</td>
                                    </tr>
                                    <tr>
                                        <td style="width:150px; vertical-align:top;"><strong>MOTIVO</strong></td>
                                        <td style="vertical-align:top;">`+data.motivo+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>LUGAR DE ENTREGA</strong></td>
                                        <td style="vertical-align:top;">`+data.lugar_entrega+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>PRIORIDAD</strong></td>
                                        <td style="vertical-align:top;">`+data.prioridad+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>PROVEEDOR</strong></td>
                                        <td style="vertical-align:top;">`+data.proveedor+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>CUENTA BANCARIA</strong></td>
                                        <td style="vertical-align:top;">`+data.cuenta_bancaria_proveedor+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>CONTACTO</strong></td>
                                        <td style="vertical-align:top;">`+data.contacto_proveedor+`</td>
                                    </tr>
                                </table>
                            </div>                    
                        </td>
                        <td style="width:35%; vertical-align:top;">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:110px;">
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
                                        <td><strong>NÚMERO COTIZACIÓN</strong></td>
                                        <td>`+data.numero_cotizacion+`</td>
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
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">P.U.</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 0 !important; width:100px !important; text-align:right;">IMPORTE</th>                                
                                    </tr>
                                </thead>                            
                                <tbody>`;
    
                                data.detalle.forEach(row => {
                                    html += `
                                        <tr>
                                            <td style="text-align:center;">`+row.cantidad+`</td>
                                            <td>`+row.articulo+`</td>
                                            <td style="text-align:right;">`+row.precio_unitario+`</td>
                                            <td style="text-align:right;">`+row.importe+`</td>
                                        </tr>
                                    `;
                                });
                                    
                            html += `</tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2"></td>
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
                                        <td colspan="8" align="center" style="padding-bottom:10px;">
                                            <strong>IMPORTE EN LETRAS: </strong> `+Numero_letra.convertir(data.total_importe, data.moneda)+`
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="8" style="padding-bottom:10px;">
                                            <strong>OBSERVACIONES: </strong> `+data.observacion+`
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="8" align="center">
                                            <table style="width:400px; text-align:center;">
                                                <tr>
                                                    <td style="width:180px;">
                                                        <div style="margin-bottom:5px; height:60px;">
                                                            `+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`
                                                        </div>
                                                        <div style="border-top:solid; border-width:1px;">Creado por:<br> `+data.nombre_usuario+`</div>
                                                    </td>
                                                    <td style="width:40px;"></td>
                                                    <td>
                                                        <div style="height:60px;"></div>
                                                        <div style="border-top:solid; border-width:1px;">Autorizado por:<br> `+data.persona_autoriza+`</div>
                                                    </td>
                                                </tr>
                                            </table>
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
 
     }
 } 
 
 export default Componente;