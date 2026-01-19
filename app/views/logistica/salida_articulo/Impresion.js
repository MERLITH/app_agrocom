/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */
 
 let Componente = {
 
     print: async (id) => {
 
         await axios.get(BASE_API + 'logistica/salida_articulo/imprimir/'+id)
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
                            <img src="`+BASE_FILES+`images/`+data.empresa.logo+`" style="max-height:70px;"/>
                            <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                            <div>`+data.empresa.direccion+`</div>
                            <div>`+data.empresa.telefono+`</div>
                            <div>`+data.empresa.email+`</div>
                        </td>
                        <td style="width:35%;">
                            <div style="text-align:center; background-color:#eeeeee !important; border: 1px solid #bebdbd !important; border-radius:8px; padding:8px;">
                                <div style="font-size:18px;" ><strong style="font-size:14px">RUC : `+data.empresa.numero_documento+`</strong></div>
                                <div style="font-weight:bold; font-size:18px;">SALIDA DE ARTÍCULOS</div>
                                <div  style="font-weight:bold; font-size:18px;"><strong>`+data.serie+`-`+data.numero+`</strong></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:65%; vertical-align:top;">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                <table style="width:100%;">
                                   <tr>
                                        <td style="vertical-align:top; width:150px;"><strong>TIPO DESTINO</strong></td>
                                        <td style="vertical-align:top;">: `+data.tipo_destino+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>PERSONAL</strong></td>
                                        <td style="vertical-align:top;">: `+data.personal+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>PROVEEDOR</strong></td>
                                        <td style="vertical-align:top;">: `+data.proveedor+`</td>
                                    </tr>
                                </table>
                            </div>                    
                        </td>
                        <td style="width:35%; vertical-align:top;">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                <table style="width:100%;">                            
                                    <tr>
                                        <td><strong>FECHA</strong></td>
                                        <td>`+HELPER.fecha(data.fecha)+`</td>
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
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">COSTO UNIT.</th>
                                        <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 0 !important; width:100px !important; text-align:right;">IMPORTE</th>                                
                                    </tr>
                                </thead>                            
                                <tbody>`;
    
                                data.detalle.forEach(row => {
                                    html += `
                                        <tr>
                                            <td style="text-align:center;">`+row.cantidad+`</td>
                                            <td>`+row.articulo+`</td>
                                            <td style="text-align:right;">`+row.costo_unitario+`</td>
                                            <td style="text-align:right;">`+row.importe+`</td>
                                        </tr>
                                    `;
                                });
                                    
                            html += `</tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3"></td>
                                        <td colspan="2" valign="top">
                                            <div style="border:none;  margin-top:5px;">
                                                <table style="width:100%; border-collapse:collapse;">
                                                    <tr>
                                                        <td style="font-weight:bold; font-size:11px !important; border-collapse:collapse;" align="left">
                                                            <div><strong>TOTAL: </strong></div>
                                                        </td>
                                                        <td  align="right" style="font-size:11px !important; border-collapse:collapse;">
                                                            <div>`+data.total_importe+`</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                                <div style="font-weight:bold;">Observaciones:</div>
                                `+data.observacion+`
                        </td>
                    </tr>
                </table>  
            </div>
        `;
 
         HELPER.print(html);
 
     }
 } 
 
 export default Componente;