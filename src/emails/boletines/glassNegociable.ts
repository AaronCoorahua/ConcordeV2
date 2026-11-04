/**
 * Banner + footer GLASS CLARO propios de «oferta-publicada-vendedor»: lavanda
 * esmerilado con halos teal y violeta muy suaves, láminas de vidrio blanco con
 * brillo arriba y borde luminoso. Todo el correo va en modo claro.
 *
 * ponytail: es de UN correo, así que no entra al sistema de tonos/tipologías
 * (headerSwap). Los tabs Banner/Fondo del detalle no lo cambian: sus
 * marcadores no están aquí y el swap no hace nada. Si otro correo lo quiere,
 * ahí sí se sube como tono «Glass».
 *
 * Sin backdrop-filter (ningún cliente de correo lo aplica): el vidrio se
 * finge con capas de gradiente translúcido. bgcolor plano para Outlook.
 */

import { generateEmail, type Section } from "../prodEmailTemplates";
import { swapEmailFooter, swapEmailHeader, stripBodyTitle } from "../headerSwap";

const FONT = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
/** Logo oficial de correos (blanco): va sobre una placa oscura, ver logoPlate(). */
const LOGO = "https://concorde-v2-theta.vercel.app/logo-correos.png";
const AYUDA = "https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador";

/** Fondo lavanda con halos. */
const MIST = "radial-gradient(circle at 92% 0%,rgba(0,174,177,0.26) 0%,rgba(0,174,177,0) 44%),radial-gradient(circle at 0% 100%,rgba(132,96,229,0.30) 0%,rgba(132,96,229,0) 52%),linear-gradient(160deg,#faf8ff 0%,#ebe4ff 100%)";
/** Lámina de vidrio blanco: brillo arriba que se apaga hacia abajo. */
const PANE = "background-color:rgba(255,255,255,0.62);background-image:linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.45) 100%);border:1px solid #ffffff;box-shadow:inset 0 1px 0 #ffffff,0 12px 30px rgba(59,23,130,0.12);";
const SHELL = `bgcolor="#f3efff" style="border-radius:24px;background-image:${MIST};border:1px solid rgba(132,96,229,0.18);"`;

/**
 * El logo es blanco: sobre lavanda no se lee. Va dentro de una placa de vidrio
 * oscuro (morado de marca → violeta, brillo arriba, borde claro) que le da
 * contraste sin oscurecer el resto del correo. bgcolor plano para Outlook.
 */
function logoPlate(w: number, align: "center" | "left"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" ${align === "center" ? 'align="center" style="margin:0 auto;"' : ""}><tr><td bgcolor="#3b1782" style="border-radius:16px;padding:12px 20px;background-image:linear-gradient(180deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 55%),linear-gradient(135deg,#3b1782 0%,#5a35c2 60%,#8460e5 100%);border:1px solid rgba(255,255,255,0.7);box-shadow:inset 0 1px 0 rgba(255,255,255,0.45),0 8px 20px rgba(59,23,130,0.28);"><img src="${LOGO}" width="${w}" alt="vmc Subastas" border="0" style="display:block;width:${w}px;height:auto;"></td></tr></table>`;
}

function banner(): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%" ${SHELL}>
<tr><td align="center" style="padding:26px 24px 28px;font-family:${FONT};">
${logoPlate(124, "center")}
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;border-radius:20px;${PANE}"><tr><td align="center" style="padding:22px 24px 26px;">
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td style="border-radius:9999px;padding:5px 14px;background-color:rgba(0,174,177,0.10);border:1px solid rgba(0,174,177,0.35);font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#00797b;">Ya está en Mi Garaje</td></tr></table>
<h1 style="margin:14px 0 0;font-size:28px;font-weight:800;line-height:1.2;letter-spacing:-0.02em;color:#3b1782;font-family:${FONT};">¡Publicación realizada<br><span style="color:#00898b;">con éxito!</span></h1>
</td></tr></table>
</td></tr></table>`;
}

const FOOTER = `<table border="0" cellpadding="0" cellspacing="0" width="100%" ${SHELL.replace('24px', '20px')}>
<tr><td style="padding:14px;font-family:${FONT};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:16px;${PANE}"><tr>
<td width="50%" valign="middle" style="padding:20px 20px 20px 24px;">
${logoPlate(88, "left")}
<p style="margin:10px 0 0;font-size:14px;line-height:1.4;font-weight:600;color:#3b1782;">¡Despierta al cazador de ofertas que hay en ti!</p>
</td>
<td width="1" style="background-color:rgba(132,96,229,0.20);"></td>
<td width="50%" align="center" valign="middle" style="padding:20px 24px 20px 20px;">
<p style="margin:0;font-size:16px;font-weight:800;color:#3b1782;">¿Quieres saber más?</p>
<p style="margin:4px 0 12px;font-size:14px;line-height:1.4;color:#5a4d75;">Visita nuestro <b style="color:#00797b;">Centro de Ayuda</b></p>
<a href="${AYUDA}" target="_blank" style="display:inline-block;border-radius:9999px;padding:10px 26px;background-color:#ffffff;border:1px solid rgba(132,96,229,0.40);box-shadow:inset 0 1px 0 #ffffff,0 2px 8px rgba(59,23,130,0.10);font-size:14px;font-weight:700;color:#3b1782;text-decoration:none;">¡Vamos!</a>
</td>
</tr></table>
</td></tr></table>`;

/**
 * Forzado a modo CLARO: sin esto Apple Mail y Outlook pueden oscurecer el
 * correo por su cuenta. Gmail invierte igual (no hay forma de impedirlo), por
 * eso el texto va en navy y no en negro puro.
 */
const LIGHT_HEAD = `<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<style>:root{color-scheme:light only;supported-color-schemes:light;}</style>`;

/** El correo completo: cuerpo del renderer + banner/footer glass. */
export function glassNegociableEmail(sections: Section[], subject: string, preheader: string): string {
  let html = swapEmailFooter(stripBodyTitle(swapEmailHeader(generateEmail(sections, subject), banner())), FOOTER);
  // Preheader: el texto gris que la bandeja muestra junto al asunto. Va oculto
  // al inicio del body; los &zwnj; evitan que el cliente rellene con el cuerpo.
  const pre = `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#ffffff;opacity:0;">${preheader}${"&zwnj;&nbsp;".repeat(60)}</div>`;
  html = html
    .replace("</head>", `${LIGHT_HEAD}\n</head>`)
    .replace(/(<body[^>]*>)/, `$1\n${pre}`)
    // tablas de maquetación: los lectores de pantalla no las anuncian como datos
    .replace(/<table /g, '<table role="presentation" ');
  return html;
}
