/**
 * Boletín «MAF viene con todo» — correo de maqueta a partir del Figma
 * "BOLETIN - MAF PERÚ.svg" (640px). NO se compone con las secciones del
 * renderer portado: lleva hero con foto de fondo + cards de unidad con CTA
 * propia, que no existen como `Section`. Por eso es HTML crudo y entra al
 * catálogo por el campo `html?` de EmailTemplate (ver registry.toReal).
 *
 * Assets en public/correos/boletin-maf-peru/ (extraídos del SVG).
 *  · Enlaces de las ofertas y de «Participa Ahora» / «Centro de Ayuda»: reales
 *    (vmcsubastas.com), definidos abajo en UNIDADES y URL_PARTICIPA.
 *  · Merge tags que quedan para la plataforma de envío: {{url_baja}} {{year}}.
 *  · Fechas y precios de cada unidad son los del boletín de ejemplo.
 *
 * DEV: antes de enviar, cambiar las rutas /correos/boletin-maf-peru/*.jpg por
 * URLs absolutas del CDN.
 */

const IMG = "/correos/boletin-maf-peru";

const CAL_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;"><rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="#99a1af" stroke-width="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4" stroke="#99a1af" stroke-width="2" stroke-linecap="round"/></svg>';
const USD_ICON =
  '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #99a1af;border-radius:9999px;font-family:\'Poppins\',Arial,sans-serif;font-size:11px;font-weight:700;line-height:15px;text-align:center;color:#99a1af;">$</span>';

interface Unidad {
  img: string;
  nombre: string;
  hora: string;
  precio: string;
  url: string;
}

const UNIDADES: Unidad[] = [
  { img: `${IMG}/yaris.jpg`, nombre: "Toyota Yaris 2024", hora: "Miércoles 09, 1:00 PM", precio: "USD 7,399", url: "https://www.vmcsubastas.com/oferta/63222" },
  { img: `${IMG}/corolla-cross.jpg`, nombre: "Toyota Corolla Cross 2024", hora: "Miércoles 09, 1:10 PM", precio: "USD 13,999", url: "https://www.vmcsubastas.com/oferta/63221" },
  { img: `${IMG}/hilux.jpg`, nombre: "Toyota Hilux 2024", hora: "Miércoles 09, 1:20 PM", precio: "USD 18,999", url: "https://www.vmcsubastas.com/oferta/63224" },
];

/** CTA «¡Participa Ahora!» del hero y del cierre — landing de ofertas MAF Perú. */
const URL_PARTICIPA = "https://www.vmcsubastas.com/mafperu.html";

function card(u: Unidad, first: boolean): string {
  return `  <tr><td class="px" style="padding-top:${first ? 26 : 22}px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FFFFFF" style="border-radius:16px;box-shadow:0 0 8px 4px rgba(0,0,0,0.08);">
      <tr><td style="padding:0;"><img src="${u.img}" width="552" alt="${u.nombre}" style="width:100%;max-width:552px;height:auto;border-radius:16px 16px 0 0;"></td></tr>
      <tr><td style="padding:20px 22px 22px;">
        <p style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:19px;font-weight:800;letter-spacing:-0.01em;color:#3b1782;">${u.nombre}</p>
        <p style="margin:8px 0 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:600;color:#4c1ebc;">Vendedor: MAF Perú</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top:12px;">
          <tr>
            <td width="24" valign="middle" style="padding-right:2px;">${CAL_ICON}</td>
            <td valign="middle" style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;color:#5a4d75;line-height:2;">Fecha: <b style="color:#3b1782;">${u.hora}</b></td>
          </tr>
          <tr>
            <td width="24" valign="middle" style="padding-right:2px;">${USD_ICON}</td>
            <td valign="middle" style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;color:#5a4d75;line-height:2;">Precio Base: <b style="color:#3b1782;font-family:'Poppins','Plus Jakarta Sans',Arial,sans-serif;">${u.precio}</b></td>
          </tr>
        </table>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin-top:16px;"><tr>
          <td bgcolor="#ed8936" style="border-radius:9999px;background-image:linear-gradient(135deg,#ed8936 0%,#8460e5 100%);box-shadow:0 2px 6px rgba(237,137,54,0.30);">
            <a href="${u.url}" target="_blank" style="display:inline-block;padding:11px 34px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:0 1px 3px rgba(0,0,0,0.25);">Ver subasta</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>`;
}

export const BOLETIN_MAF_PERU_HTML = `<!DOCTYPE html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Boletín — MAF Perú</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; width:100%; background-color:#FAFAFA; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; display:block; }
  a { text-decoration:none; }
  .px { padding-left:24px; padding-right:24px; }
  @media only screen and (max-width:600px) {
    .container { width:100% !important; }
    .px { padding-left:16px !important; padding-right:16px !important; }
    .hero-h1 { font-size:34px !important; line-height:1.05 !important; }
    .sec-h { font-size:22px !important; }
  }
</style>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="margin:0;padding:0;background-color:#FAFAFA;">
<center>
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#FAFAFA;opacity:0;">
  Esta semana MAF viene con todo — Toyota Yaris, Corolla Cross y Hilux 2024 salen a subasta el miércoles 09 desde la 01:00 PM.
</div>

<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FAFAFA;">
<tr><td align="center" valign="top" style="padding:0;">

<table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#FFFFFF" style="width:600px;background-color:#FFFFFF;">

  <!-- HERO -->
  <tr>
  <td align="center" valign="top" background="${IMG}/hero.jpg" bgcolor="#1c1330" style="background-image:url('${IMG}/hero.jpg');background-size:cover;background-position:center;background-color:#1c1330;">
    <!--[if gte mso 9]>
    <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" src="${IMG}/hero.jpg" style="width:600px;height:320px;" />
    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="position:absolute;width:600px;height:320px;">
    <v:fill opacity="42%" color="#000000" /><v:textbox inset="0,0,0,0"><![endif]-->
    <div>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;">
        <tr><td height="320" valign="top" style="background:linear-gradient(180deg,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.30) 45%,rgba(20,3,52,0.55) 100%);">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr><td class="px" style="padding-top:22px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
                <td align="left" valign="middle">
                  <img src="${IMG}/vmc-logo.png" width="118" alt="VMC Subastas" style="width:118px;height:auto;">
                </td>
                <td align="right" valign="middle">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" bgcolor="#FFFFFF" style="border-radius:9999px;"><tr>
                    <td width="52" height="52" align="center" valign="middle" style="border-radius:9999px;">
                      <img src="${IMG}/maf-logo.png" width="34" alt="MAF Innovación Financiera" style="width:34px;height:auto;">
                    </td>
                  </tr></table>
                </td>
              </tr></table>
            </td></tr>
            <tr><td class="px" style="padding-top:44px;">
              <p style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#c9b8f5;">Esta semana</p>
              <h1 class="hero-h1" style="margin:4px 0 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:40px;line-height:1.02;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF;text-shadow:0 2px 8px rgba(0,0,0,0.4);">MAF VIENE CON TODO</h1>
              <p style="margin:14px 0 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;font-weight:600;color:#f0ebff;text-shadow:0 1px 4px rgba(0,0,0,0.35);">Este miércoles 09 desde la <b>01:00 PM</b></p>
            </td></tr>
            <tr><td class="px" style="padding-top:20px;padding-bottom:26px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>
                <td bgcolor="#ed8936" style="border-radius:9999px;background-image:linear-gradient(135deg,#ed8936 0%,#8460e5 100%);box-shadow:0 2px 6px rgba(237,137,54,0.35);">
                  <a href="${URL_PARTICIPA}" target="_blank" style="display:inline-block;padding:12px 30px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;text-shadow:0 1px 3px rgba(0,0,0,0.25);">¡Participa Ahora!</a>
                </td>
              </tr></table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </div>
    <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
  </td>
  </tr>
  <tr><td height="4" bgcolor="#ed8936" style="background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);font-size:1px;line-height:1px;">&nbsp;</td></tr>

  <!-- INTRO -->
  <tr><td class="px" align="center" style="padding-top:34px;padding-bottom:8px;">
    <h2 class="sec-h" style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:25px;line-height:1.3;font-weight:800;letter-spacing:-0.01em;color:#3b1782;">Sus mejores unidades salen a subasta con precios base que no vas a dejar pasar</h2>
  </td></tr>

${UNIDADES.map((u, i) => card(u, i === 0)).join("\n\n")}

  <!-- CIERRE -->
  <tr><td class="px" align="center" style="padding-top:40px;">
    <h2 class="sec-h" style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:25px;line-height:1.3;font-weight:800;letter-spacing:-0.01em;color:#8460e5;">¡Descubre más oportunidades!</h2>
    <p style="margin:14px 0 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;line-height:1.6;color:#5a4d75;">Tenemos más unidades esperando por ti. Revisa el inventario, calcula tu inversión y participa por ganar la oportunidad de compra.</p>
  </td></tr>
  <tr><td align="center" style="padding-top:22px;padding-bottom:38px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>
      <td bgcolor="#8460e5" style="border-radius:9999px;background-image:linear-gradient(135deg,#8460e5 0%,#3b1782 100%);box-shadow:0 2px 8px rgba(59,23,130,0.35);">
        <a href="${URL_PARTICIPA}" target="_blank" style="display:inline-block;padding:13px 36px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;text-shadow:0 1px 3px rgba(0,0,0,0.25);">¡Participa Ahora!</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- CONSOLA CENTRO DE AYUDA -->
  <tr><td height="4" bgcolor="#ed8936" style="background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);font-size:1px;line-height:1px;">&nbsp;</td></tr>
  <tr><td align="center" bgcolor="#3b1782" style="background-color:#3b1782;background-image:linear-gradient(157deg,#5F3ED8 0%,#340091 50%,#140046 100%);padding:16px 20px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;"><tr><td style="border-radius:17px;background-color:rgba(255,255,255,0.10);padding:16px 20px;">
      <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
        <td valign="middle">
          <p style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.01em;line-height:1.2;color:#FFFFFF;">VMC Subastas</p>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="36" style="border-radius:2px;background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);margin-top:6px;"><tr><td height="3" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
          <p style="margin:8px 0 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Despierta al cazador de ofertas que hay en ti!</p>
        </td>
        <td width="16"></td>
        <td width="150" valign="middle" align="right"><img src="${IMG}/con-todo-footer.png" width="150" alt="VMC Subastas" style="width:150px;height:auto;"></td>
      </tr></table>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr><td height="12"></td></tr>
        <tr><td height="1" style="background-color:rgba(255,255,255,0.28);font-size:1px;line-height:1px;">&nbsp;</td></tr>
        <tr><td height="12"></td></tr>
      </table>
      <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
        <td valign="middle">
          <span style="display:block;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:#FFFFFF;">¿Quieres saber más?</span>
          <span style="display:block;margin-top:2px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Visita nuestro <b style="color:#FFFFFF;">Centro de Ayuda!</b></span>
        </td>
        <td width="14"></td>
        <td width="140" valign="middle" align="right">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="right" style="border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%);"><tr><td style="padding:2px;">
            <table role="presentation" border="0" width="132" cellspacing="0" cellpadding="0"><tr>
              <td width="132" height="38" bgcolor="#3b1782" align="center" valign="middle" style="border-radius:9999px;background-image:linear-gradient(135deg,#ed8936 0%,#8460e5 100%);font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:0 1px 3px rgba(0,0,0,0.25);">
                <a href="https://www.vmcsubastas.com/centro-de-ayuda" target="_blank" style="color:#FFFFFF;display:block;">¡Vamos!</a>
              </td>
            </tr></table>
          </td></tr></table>
        </td>
      </tr></table>
    </td></tr></table>
  </td></tr>

  <!-- FOOTER -->
  <tr bgcolor="#FFFFFF"><td align="center">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:544px;margin:0 auto;">
      <tr><td height="26"></td></tr>
      <tr><td align="center"><a href="https://www.vmcsubastas.com/" target="_blank" style="font-size:24px;font-family:'Plus Jakarta Sans',Arial,sans-serif;line-height:28px;color:#A298B3;font-weight:700;">www.vmcsubastas.com</a></td></tr>
      <tr><td height="18"></td></tr>
      <tr><td align="center" style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;font-weight:700;line-height:24px;color:#0E016C;">
        <a href="https://www.vmcsubastas.com/centro-de-ayuda" target="_blank" style="color:#0E016C;font-weight:700;">Contáctanos</a>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <a href="https://www.vmcsubastas.com/condiciones-y-terminos" target="_blank" style="color:#0E016C;font-weight:700;">Condiciones y Términos</a>
      </td></tr>
      <tr><td height="14"></td></tr>
      <tr><td align="center" style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;line-height:18px;color:#8b8398;padding:0 24px;">
        El presente correo se envía de acuerdo a la Ley N° 28493 que regula el Uso de Correo Comercial sin ser solicitado y su reglamento. Si deseas dejar de recibir estos correos, haz clic en:
        <a href="{{url_baja}}" target="_blank" style="color:#3b1782;font-weight:700;">REMOVER SUSCRIPCIÓN</a>
      </td></tr>
      <tr><td height="16"></td></tr>
      <tr><td align="center" style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:9px;line-height:20px;color:#8b8398;">{{year}} VMC Subastas. Todos los derechos reservados.</td></tr>
      <tr><td height="26"></td></tr>
    </table>
  </td></tr>

</table>

</td></tr>
</table>
</center>
</body>
</html>`;
