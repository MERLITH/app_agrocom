<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
   </head>
   <body>
      <div>
         <style>
         </style>
         <div class="rps_b894">
            <div>
               <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  bgcolor="#ffffff"
                  align="center"
                  style="
                  font-family: Helvetica neue, Helvetica, Arial, Verdana, sans-serif;
                  "
                  >
                  <tbody>
                     <tr>
                        <td rowspan="1" colspan="1">
                           <table
                              width="520px"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              bgcolor="#ffffff"
                              align="center"
                              >
                              <tbody>
                                 <tr>
                                    <td valign="top" rowspan="1" colspan="1">
                                       <table
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          bgcolor="#ffffff"
                                          >
                                          <tbody>
                                             <tr>
                                                <td
                                                   valign="top"
                                                   align="left"
                                                   rowspan="1"
                                                   colspan="1"
                                                   style="
                                                   color: #007be8;
                                                   font-size: 20px;
                                                   line-height: 32px;
                                                   text-align: left;
                                                   font-weight: bold;
                                                   "
                                                   >
                                                   <span
                                                      ><?= $factura->comprobante; ?> <?= $factura->factura; ?></span
                                                      >
                                                </td>
                                             </tr>
                                             <tr>
                                                <td
                                                   valign="top"
                                                   rowspan="1"
                                                   colspan="1"
                                                   style="color: #cccccc; padding-bottom: 15px"
                                                   >
                                                   <hr color="#cccccc" size="1" />
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 10px 0">
                                                      Estimados <?= $factura->cliente_razon_social; ?>,
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 10px 0">
                                                      Se hace presente un comprobante electrónico
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 5px 0">
                                                      <ul>
                                                         <li>
                                                            <b
                                                               ><?= $factura->comprobante; ?>
                                                               <?= $factura->factura; ?>
                                                            </b>
                                                         </li>
                                                         <li>
                                                            Fecha de emisión: <b><?= date("d/m/Y", strtotime($factura->fecha)); ?></b>
                                                         </li>
                                                         <li>Total: <b><?= $factura->moneda_simbolo; ?> <?= $factura->total_importe; ?></b></li>
                                                      </ul>
                                                   </div>
                                                   <div style="padding: 5px 0"></div>
                                                   <div style="padding: 5px 0">
                                                      Puede ver el documento visitando el
                                                      siguiente link del Proveedor de Servicios Electrónicos.
                                                   </div>
                                                   <div style="padding: 5px 0">
                                                      <a
                                                         href="<?= $factura->enlace; ?>"
                                                         target="_blank"
                                                         rel="noopener noreferrer"
                                                         data-auth="NotApplicable"
                                                         style="
                                                         padding: 15px;
                                                         background: #007be8;
                                                         color: #ffffff;
                                                         text-align: center;
                                                         text-decoration: none;
                                                         display: inline-block;
                                                         border-radius: 25px;
                                                         "
                                                         data-linkindex="0"
                                                         >VER <?= $factura->comprobante; ?></a
                                                         >
                                                   </div>
                                                   <div style="padding: 5px 0">
                                                      Si el link no funciona, usa el siguiente
                                                      enlace en tu navegador:
                                                   </div>
                                                   <div
                                                      style="
                                                      margin: 15px 0;
                                                      padding: 10px;
                                                      text-align: center;
                                                      background: #ffffff;
                                                      border: 1px solid #dddddd;
                                                      "
                                                      >
                                                      <a
                                                         href="<?= $factura->enlace; ?>"
                                                         target="_blank"
                                                         rel="noopener noreferrer"
                                                         data-auth="NotApplicable"
                                                         style=""
                                                         data-linkindex="1"
                                                         ><?= $factura->enlace; ?></a
                                                         >
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div>
                                                      <table
                                                         width="100%"
                                                         cellpadding="0"
                                                         cellspacing="0"
                                                         border="0"
                                                         bgcolor="#ffffff"
                                                         >
                                                         <tbody>
                                                            <tr valign="top">
                                                               <td
                                                                  valign="top"
                                                                  align="left"
                                                                  rowspan="1"
                                                                  colspan="1"
                                                                  style="
                                                                  padding-top: 10px;
                                                                  text-align: left;
                                                                  "
                                                                  >
                                                                  <span>Atentamente,</span
                                                                     ><br clear="none" /><span
                                                                     ><b
                                                                     ><?= $factura->empresa; ?></b
                                                                     ></span
                                                                     ><br clear="none" /><span
                                                                     ><b>RUC <?= $factura->ruc_empresa; ?></b></span
                                                                     ><br clear="none" />
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td rowspan="1" colspan="1">
                                                   <table
                                                      width="100%"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      bgcolor="#ffffff"
                                                      align="center"
                                                      >
                                                      <tbody>
                                                         <tr>
                                                            <td
                                                               valign="top"
                                                               width="100%"
                                                               rowspan="1"
                                                               colspan="1"
                                                               style="color: #cccccc"
                                                               >
                                                               <hr color="#cccccc" size="1" />
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td rowspan="1" colspan="1">
                                                               <div>
                                                                  <table
                                                                     width="100%"
                                                                     cellpadding="0"
                                                                     cellspacing="0"
                                                                     border="0"
                                                                     bgcolor="#ffffff"
                                                                     align="center"
                                                                     >
                                                                     <tbody>
                                                                        <tr>
                                                                           <td
                                                                              valign="top"
                                                                              align="left"
                                                                              rowspan="1"
                                                                              colspan="1"
                                                                              style="
                                                                              padding-top: 10px;
                                                                              color: #707070;
                                                                              font-size: 12px;
                                                                              line-height: 14px;
                                                                              text-align: left;
                                                                              "
                                                                              >
                                                                              <span
                                                                                 style="
                                                                                 width: 100px !important;
                                                                                 "
                                                                                 ><a
                                                                                 href="https://www.titanicsoft.com"
                                                                                 target="_blank"
                                                                                 rel="noopener noreferrer"
                                                                                 data-auth="NotApplicable"
                                                                                 data-linkindex="2"
                                                                                 ><img
                                                                                 src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_login.png"
                                                                                 alt="TitanicSoft"
                                                                                 style="width: 100px"></a
                                                                                 ></span>
                                                                              <br clear="none" />
                                                                              <div style="color: #828282">
                                                                                 <b
                                                                                    >Software para transporte de carga pesada y Courier</b
                                                                                    >
                                                                              </div>
                                                                              <div>
                                                                                 <a
                                                                                    href="https://www.titanicsoft.com"
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    data-auth="NotApplicable"
                                                                                    style="color: #828282"
                                                                                    data-linkindex="3"
                                                                                    >www.titanicsoft.com</a
                                                                                    >
                                                                              </div>
                                                                              <br clear="none" />
                                                                           </td>
                                                                        </tr>
                                                                     </tbody>
                                                                  </table>
                                                               </div>
                                                            </td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </body>
</html>