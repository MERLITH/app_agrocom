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
 
         await axios.get(BASE_API + 'operacion/proforma/imprimir/'+id)
         .then(function (response) {
             
            let data = response.data;
            Customer.print_a4(data);
 
         }).catch(error => {
             console.log(error);
         }); 
     },

     print_a4: (data) => {
        
        let html = '<div style="max-width:842px; margin:auto;">';
    
        let titulo = 'COTIZACIÓN';

        if (data.fl_estado == 2) {
            
          titulo = 'ORDEN DE SERVICIO';
          
        }

        
        if(data.fl_estado == 0)
        {
            html += `
            
            <style>
                #marca_agua_anulado {
                    position: relative;
                }

                .rotar_texto
                {                
                    position: absolute;
                    margin-top:30%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size:60px;
                    opacity: 0.5;
                }
            </style>       

            <div id="marca_agua_anulado">
                <span class="rotar_texto" style="color:#d5062a; font-weight:bold;">ANULADO</span>
            </div>`;
        }      

        html += `
            <style>

                #tabla_detalle > tbody td, #tabla_detalle > thead th {
                    padding:5px;
                    height:23px;
                }

                #tabla_detalle > tbody tr:nth-child(even) {
                    background-color: #f3f3f3;
                }

            </style>

            <!--<div style="height:15px; background-color:#00b2f0;"></div> -->

                <table  style="width:100%; border-collapse:collapse;">
                    <!-- <tr>
                        <td style="width:30%; background-color:#fce4d6; border-collapse:collapse;">
                            
                            <img src="`+BASE_FILES+`images/`+data.empresa.logo+`" style="max-height:70px;" width="250px"/>
                        </td>
                        <td style="width:40%; background-color:#fce4d6; border-collapse:collapse; padding:10px;">
                            <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                            <div style="font-weight:bold;">Dirección: `+data.empresa.direccion+`</div>
                            <div style="font-weight:bold;">Teléfono: `+data.empresa.telefono+`</div>
                            <div style="font-weight:bold;">Email: `+data.empresa.email+`</div>
                            <div style="font-weight:bold;">RUC: `+data.empresa.numero_documento+`</div>
                        </td>
                        <td style="width:30%; background-color:#fce4d6; border-collapse:collapse;">
                            <div style="text-align:center; padding:8px;">
                                <div style="font-weight:bold; font-size:20px; color:#ff0000; font-weight:bold; padding-top:10px;">`+data.comprobante+`</div>
                                <div style="font-weight:bold; font-size:14px; color:#1f3864; padding-top:10px;">`+HELPER.fecha(data.fecha)+`</div>
                                <div  style="font-weight:bold; font-size:18px; color:#1f3864; padding-top:10px;"><strong>`+data.proforma+`</strong></div>
                            </div>
                        </td>
                    </tr> -->
                    <tr>
                        <td style="width:24%;">
                            <img src="`+BASE_FILES+`images/`+data.empresa.logo+`"style="width:100%;"/>
                
                        </td>
                        <td style="width:41%;">
                        
                            <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                            <div>`+data.empresa.direccion+`</div>
                            <div>`+data.empresa.telefono+`</div>
                            <div>`+data.empresa.email+`</div>
                        </td>
                        <td style="width:33%;">

                            <table    style="width:100%;border-collapse: collapse;border: 1px solid #bebdbd;font-size: 10px; text-align:center;border-radius:8px; padding:8px;-moz-border-radius: 20px; 
                                -webkit-border-radius: 20px; ">
                                <tr>
                                    <td     style="height: 20px;text-align:left;font-size: 12px;">
                                        <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">RUC N° : `+data.empresa.numero_documento+`</strong></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td     style="height: 20px;text-align:left;font-size: 12px; background-color: black;color: rgb(251, 255, 255);">
                                        <div style="font-weight:bold; font-size:18px; text-align:center;">`+titulo+`</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td     style="height: 20px;text-align:left;font-size: 12px;">
                                        <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.proforma+`</strong></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha_mes_letra(data.fecha_ano,data.fecha_mes,data.fecha_dia)+`</td>
                                </tr>
                            
                            </table>






                         
                        </td>
                    </tr>
                    <tr>
                        <td style="width:65%; vertical-align:top; " colspan="3">
                            <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                <table style="width:100%;">
                                    <tr>
                                        <td colspan="2"><strong>DATOS DEL CLIENTE</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="width:150px;"><strong>NOMBRE DE CONTACTO</strong></td>
                                        <td>`+((data.nombre_contacto != null) ? data.nombre_contacto : data.empresa_proforma)+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>EMPRESA</strong></td>
                                        <td style="vertical-align:top;">`+data.empresa_proforma+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>DIRECCIÓN</strong></td>
                                        <td style="vertical-align:top;">`+data.direccion+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>TELÉFONO</strong></td>
                                        <td style="vertical-align:top;">`+data.telefono+`</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"><strong>EMAIL</strong></td>
                                        <td style="vertical-align:top;">`+data.email+`</td>
                                    </tr>
                                </table>
                            </div>                    
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <table id="tabla_detalle" class="detalle" style="width:100%; margin-top:10px; border-collapse:collapse;">
                                <thead>
                                    <tr>
                                        <th style="font-weight:bold; background-color:#000; text-align:center; min-width:250px !important; color:#fff;">DESCRIPCIÓN</th>
                                        <th style="font-weight:bold;  width:50px; background-color:#000; text-align:left; color:#fff;">CANTIDAD</th>                                        
                                        <th style="font-weight:bold; width:130px; background-color:#000; width:150px !important; text-align:right; color:#fff;">PRECIO UNITARIO</th>
                                        <th style="font-weight:bold; width:130px; background-color:#000; width:100px !important; text-align:right; color:#fff;">IMPORTE</th>                                
                                    </tr>
                                </thead>                            
                                <tbody>`;

                                let contador = 0;

                                data.detalle.forEach(row => {
                                    contador++;

                                    html += `
                                        <tr>
                                            <td>`+row.descripcion+`</td>
                                            <td style="text-align:center;">`+row.cantidad+`</td>
                                            <td style="text-align:right;">`+parseFloat(row.precio_unitario).toFixed(2)+`</td>
                                            <td style="text-align:right;">`+parseFloat(row.importe).toFixed(2)+`</td>
                                        </tr>
                                    `;
                                });

                                while (contador <= 3) {
                                    
                                    html += `
                                        <tr>
                                            <td></td>
                                            <td style="text-align:center;"></td>
                                            <td style="text-align:right;"></td>
                                            <td style="text-align:right;"></td>
                                        </tr>
                                    `;
                                    contador++;
                                }
                                    
                            html += `</tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="padding-top:10px;">
                                            <div style="font-weight:bold; text-decoration:underline;">CONDICIONES COMERCIALES:</div>
                                            <table style="width:100%;">                            
                                                <tr>
                                                    <td><strong>CONDICIÓN DE PAGO : `+data.condicion_pago+ ((data.dias_pagar != null) ? ` / `+data.dias_pagar+` DIAS` : '')+ `</strong></td>
                                                    <td><strong>MONEDA</strong>: `+data.moneda+`</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>VALID. DE LA OFERTA </strong>: `+data.dias_oferta+ ` DÍAS ÚTILES</td>
                                                    <td><strong>MEDIDA</strong>: `+data.medida+ `</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><strong>SALIDA: `+data.salida+ `</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><strong>LLEGADA: `+data.llegada+ `</strong></td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td colspan="3" valign="top">
                                            <div style="border:none;  margin-top:5px;">
                                                <table style="width:100%; border-collapse:collapse;">
                                                    <tr>
                                                        <td style="font-weight:bold; font-size:11px !important; border-collapse:collapse;" align="left">
                                                            <div><strong>SUBTOTAL:</strong></div>
                                                            <div><strong>ITBMS <span id="fact-igv_porcenataje"></span>:</strong></div>
                                                            <div><strong>`+data.comprobante+` TOTAL:</strong></div>
                                                        </td>
                                                        <td  align="right" style="font-size:11px !important; border-collapse:collapse;">
                                                            <div>`+data.moneda_simbolo+` `+parseFloat(data.total_gravada).toLocaleString('en-US')+`</div>
                                                            <div>`+data.moneda_simbolo+` `+parseFloat(data.total_igv).toLocaleString('en-US')+`</div>
                                                            <div style="font-size:15px; font-weight:bold; border-top:solid; border-width:1px; background-color:#fce4d6; padding:5px;">`+data.moneda_simbolo+` `+parseFloat(data.total_importe).toFixed(2)+`</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" align="right">
                                            <strong>IMPORTE EN LETRAS: </strong> `+Numero_letra.convertir(data.total_importe,'DOLARES')+`
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                             
                                                    <!--   `+data.termino_condicion_proforma+`-->
                                           
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" style="padding-top:10px;">
                                            <strong>OBSERVACIONES: `+data.observacion+ `</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="padding-top:10px;">
                                            <div><strong>USUARIO</strong></div>
                                      
                                            <div>Nombre: `+data.usuario_nombre+`</div>
                                        </td>
                                        <td colspan="2" style="padding-top:10px; text-align:center;">
                                            
                                            <img src="`+BASE_FILES+`images/`+data.usuario_firma+`" style="height:70px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" style="padding-top:15px;">
                                            <table style="width:100%;">
                                                <tr>
                                                   
                                                        <td style="width:50%;">
                                                            <div style="text-decoration:underline; font-weight:bold;">N° DE CUENTAS CORRIENTES DOLARES</div>
                                                            <table style="width:100%;" name="detalle-cuenta_bancaria_empresa_soles">
                                                            <tr>
                                                                    <th style="font-size: 10px;text-align: left;">NOMBRE</th>
                                                                    <th style="font-size: 10px;text-align: left;">NÚMERO</th>
                                                                  <!--   <th style="font-size: 10px;text-align: left;">CCI</th>
                                                                    <th style="font-size: 10px;text-align: left;">SWIFT</th> -->
                                                                </tr>
                                                            `;
                
                                                            
                                                            data.cuentas_bancarias.forEach(row => {
                                                                if(row.id_moneda == 1 && row.fl_publico == 1)
                                                                {
                                                                    html += `
                                                                        <tr>
                                                                            <td style="font-size: 10px;">`+row.banco+`</td>
                                                                            <td style="font-size: 10px;">`+row.numero+`</td>
                                                                          
                                                                        </tr>
                                                                    `;
                                                                }
                                                                
                                                            });
                                                            
                                                                html += `
                                                            </table>
                                                        </td>
                                                        <td style="width:50%;"></td>
                                                        <td colspan="2" style="padding-top:15px;">
                                                            
                                                             
                                                        </td>
                                                     
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6"  style="padding-top: 60px;">
                                <table class="detalle"   style="width:100%; margin-top:10px; border-collapse:collapse;">
                                    <tr>
                                        <td style="vertical-align:top;width: 65%"> </td>
                                        <td style="vertical-align:top;width: 35%"> </td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;"></td>
                                        <td style="vertical-align:top; border-top: 1px solid black;text-align: center;font-size: 11px;">
                                            <div style="font-weight:bold; text-align: center;">FIRMA</div>
                                            <div style="font-weight:bold;text-align: left;">CONFIRMACIÓN:</div>
                                            <div style="font-weight:bold;text-align: left;">NOMBRE Y APELLIDO:</div>
                                            <div style="font-weight:bold;text-align: left;">CARGO:</div>
                                        </td>
                                    </tr>
                                </table>
                        </td>
                    </tr>
                </table>  

                <div style="height:15px; background-color:#000;"></div>
            </div>
        `;
 
         HELPER.print(html);
 
     }
 } 
 
 export default Componente;