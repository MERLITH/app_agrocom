<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<div style="width:100%; background-color:#fff; font-family:Tahoma; " id="impresion_orden" align="center">
  <table style="width:100%; font-size:10px !important;">
    <tr>
      <td colspan="2" name="empresa" style="text-align:center;"><?= $sucursal->razon_social; ?><br>RUC: <?= $sucursal->ruc; ?><br><?= $sucursal->direccion; ?></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align:center; padding-top:10px;"><strong>ORDEN DE SERVICIO</strong></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align:center; font-size:20px;" name="numero_orden"><?= $orden->serie; ?>-<?= $orden->numero; ?></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align:center; padding-top:5px; padding-bottom:10px;  font-size:20px;"><strong>SERVICIO: <span name="tipo_servicio"><?= $orden->tipo_servicio; ?></span></strong></td>
    </tr>
    <tr>
      <td>Fecha Emisión: </td>
      <td name="fecha_emision"><?= date("d-m-Y H:i:s", strtotime($orden->fecha_emision)); ?></td>
    </tr>
    <tr>
      <td>Suc. Origen: </td>
      <td name="origen"><?= $orden->sucursal_origen; ?></td>
    </tr>
    <tr>
      <td>Suc. Destino: </td>
      <td name="destino"><?= $orden->sucursal_destino; ?></td>
    </tr>
    <tr>
      <td>Lugar de Entrega: </td>
      <td name="entrega"><?= $orden->entrega; ?></td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top:10px;"><strong>REMITENTE</strong></td>
    </tr>
    <tr>
      <td colspan="2" name="remitente_razon_social"><?= $orden->remitente_razon_social; ?></td>
    </tr>
    <tr>
      <td>Dirección:</td>
      <td name="remitente_direccion"><?= $orden->direccion_remitente_delivery; ?></td>
    </tr>
    <tr>
      <td>Teléfono:</td>
      <td name="remitente_telefono"><?= $orden->remitente_telefono; ?></td>
    </tr>
    <tr>
      <td>Guía Remitente:</td>    
      <td name="guia_remitente"><?= $orden->guia_remitente; ?></td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top:10px;"><strong>DESTINATARIO</strong></td>
    </tr>
    <tr>
      <td colspan="2" name="destinatario_razon_social"><?= $orden->destinatario_razon_social; ?></td>
    </tr>
    <tr>
      <td>Teléfono:</td>
      <td name="destinatario_telefono"><?= $orden->destinatario_telefono; ?></td>
    </tr>
  </table>

  <table style="width:100%; font-size:10px !important; margin-top:10px; margin-bottom:10px;">
    <thead>
      <tr>
        <th>Cantidad</th>
        <th>Descripción</th>
        <th>Tipo Carga</th>
        <th>Peso</th>
        <th>Importe</th>
      </tr>
    </thead>
    <tbody name="detalle_impresion"></tbody>
    <?php foreach ($detalle as $row): ?>
        <tr>
            <td><?= $row->cantidad; ?></td>
            <td><?= $row->descripcion; ?></td>
            <td><?= $orden->tipo_carga; ?></td>
            <td><?= $row->peso; ?></td>
            <td align="right"><?= $row->importe; ?></td>
        </tr>
    <?php endforeach; ?>
    <tfoot>
      <tr>
        <th colspan="3" name="forma_pago"><?= $orden->forma_pago; ?></th>
        <th>Importe Total: </th>
        <th name="importe_total" align="right"><?= $orden->importe_total; ?></th>
      </tr>
    </tfoot>
  </table>

  <div style="font-size:14px; text-align:center;"><strong>Dirección de Destino</strong></div>
  <div style="font-size:12px; text-align:center;" name="direccion_entrega"><?= $orden->direccion_entrega; ?></div>

  <div style="font-size:14px; margin-top:15px;">
    <strong>Realizar su trekin en la web: <a href="<?= BASE_URL; ?>courier/consulta"><?= BASE_URL; ?>courier/consulta</a></strong> 
  </div>
</div>

</body>
</html>