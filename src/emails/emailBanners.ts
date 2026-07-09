/**
 * Banners y plantillas de correo por tipología — módulo plano (sin "use client").
 *
 * Genera HTML **email-safe** (tablas anidadas + estilos inline + bgcolor de
 * respaldo, sin flexbox/grid/JS) con la estructura de las plantillas del
 * mailing en producción:
 *   · bannerRows()      — filas del header hero (band gradiente + glass + strip 4px)
 *   · buildEmailBanner() — el banner como bloque suelto listo para pegar
 *   · buildDemoEmail()  — correo COMPLETO estático: banner + cuerpo + CTA +
 *                         footer estándar VMC + footer legal
 */

import { EMAIL_ACCENTS, type EmailTipologia } from "./tipologias";

export const EMAIL_WIDTH = 600;

/** Gradiente del CTA del cuerpo por sistema (mismo patrón del botón VAMOS) */
const CTA_GRADIENTS: Record<string, string> = {
  live: "linear-gradient(135deg,#ed8936 0%,#8460e5 100%)",
  negotiable: "linear-gradient(135deg,#00AEB1 0%,#8460e5 100%)",
  coins: "linear-gradient(135deg,#F5921E 0%,#E15F2B 100%)",
  brand: "linear-gradient(135deg,#ed8936 0%,#8460e5 100%)",
  alert: "linear-gradient(135deg,#E5484D 0%,#8460e5 100%)",
  dark: "linear-gradient(135deg,#8460e5 0%,#3b1782 100%)",
};

/** Filas <tr> del banner hero (para componer dentro de la tabla de 600) */
export function bannerRows(t: EmailTipologia): string {
  const a = EMAIL_ACCENTS[t.system];
  return `<tr><td align="center" valign="middle" bgcolor="${a.bandFallback}" style="background-color:${a.bandFallback};background-image:${a.band};padding:26px 24px 22px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:20px;background-image:linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%);"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="middle" style="border-radius:19px;background-color:rgba(255,255,255,0.10);background-image:linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.10);padding:22px 20px 20px;">
<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="${a.pillBg}" style="border-radius:9999px;"><tr><td align="center" valign="middle" style="padding:6px 16px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:11px;font-weight:800;letter-spacing:0.08em;color:${a.pillColor};line-height:1;">${t.pill}</td></tr></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="12" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
<div style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;color:#FFFFFF;">${t.titulo}</div>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="6" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
<div style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:13px;font-weight:500;line-height:1.5;color:rgba(255,255,255,0.85);">${t.subtitulo}</div>
</td></tr></table>
</td></tr></table></td></tr>
<tr><td height="4" bgcolor="${a.stripFallback}" style="background-image:${a.strip};font-size:1px;line-height:1px;">&nbsp;</td></tr>`;
}

/** El banner como bloque suelto (table de 600) listo para pegar como header. */
export function buildEmailBanner(t: EmailTipologia): string {
  return `<!-- Banner tipología: ${t.label} (${t.id}) — Concorde -->
<table border="0" width="${EMAIL_WIDTH}" cellspacing="0" cellpadding="0" align="center">
${bannerRows(t)}
</table>`;
}

/** Footer estándar VMC (strip + bloque morado + footer legal) — verbatim de producción. */
const EMAIL_FOOTER = `<tr><td height="4" bgcolor="#ed8936" style="background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center" width="600" bgcolor="#3b1782" style="background-color:#3b1782;background-image:linear-gradient(157deg,#5F3ED8 0%,#340091 50%,#140046 100%);padding:16px 20px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;background-image:linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%);"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-radius:17px;background-color:rgba(255,255,255,0.10);background-image:linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);padding:16px 20px;">
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="left" style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.01em;line-height:1.2;color:#FFFFFF;">VMC Subastas</td></tr>
<tr><td height="8" align="left" valign="bottom"><table border="0" cellpadding="0" cellspacing="0" width="36" align="left" style="border-radius:2px;background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);"><tr><td height="3" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr>
<tr><td height="5"></td></tr>
<tr><td align="left" style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:13px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Despierta al cazador de ofertas que hay en ti!</td></tr>
</table>
</td>
<td width="16"></td>
<td width="160" valign="middle" align="right"><img src="https://cdn.vmcsubastas.com/services/mailing/inhabilitacion-cuenta/con-todo-footer.png" width="160" height="59" alt="VMC Subastas" style="border:0;display:block;max-width:100%;height:auto;"></td>
</tr></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td height="12"></td></tr>
<tr><td height="1" style="background-color:rgba(255,255,255,0.28);font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td height="12"></td></tr>
</table>
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">
<span style="display:block;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:15px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:#FFFFFF;">¿Quieres saber más?</span>
<span style="display:block;margin-top:2px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:12px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Visita nuestro <b style="color:#FFFFFF;">Centro de Ayuda!</b></span>
</td>
<td width="14"></td>
<td width="146" valign="middle" align="right"><a href="https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador" target="_blank" style="text-decoration:none;"><table border="0" cellspacing="0" cellpadding="0" align="right" style="border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%);box-shadow:rgba(237,137,54,0.3) 0 2px 6px;"><tr><td style="padding:2px;"><table border="0" width="140" cellspacing="0" cellpadding="0"><tr><td width="140" height="38" bgcolor="#3b1782" style="border-radius:9999px;background-image:linear-gradient(135deg,#ed8936 0%,#8460e5 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:rgba(0,0,0,0.25) 0 1px 3px;" align="center" valign="middle"><b>¡Vamos!</b></td></tr></table></td></tr></table></a></td>
</tr></table>
</td></tr></table>
</td></tr></table>
</td></tr>
<tr bgcolor="#FFFFFF"><td align="center" width="600">
<table border="0" cellpadding="0" cellspacing="0" width="600" align="center"><tr><td width="28"></td><td>
<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
<tr><td height="26"></td></tr>
<tr><td align="center"><a href="https://www.vmcsubastas.com/" target="_blank" style="font-size:24px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;line-height:28px;color:#A298B3;text-decoration:none;"><b>www.vmcsubastas.com</b></a></td></tr>
<tr><td height="20"></td></tr>
<tr><td align="center" style="font-size:8px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;line-height:13px;color:#0E016C;">El presente correo se envía de acuerdo a la Ley N° 28493 que regula el Uso de Correo Comercial sin ser solicitado y su reglamento. Si deseas dejar de recibir estos correos, haz clic en: <a href="https://services.subastop.com/subscribers/unsubscribe" style="font-weight:bold;text-decoration:none;color:#0E016C;" target="_blank">REMOVER SUSCRIPCIÓN</a></td></tr>
<tr><td height="8"></td></tr>
<tr><td align="center" style="font-size:8px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;line-height:22px;color:#0E016C;">2026 VMC Subastas. Todos los derechos reservados.</td></tr>
<tr><td height="24"></td></tr>
</table></td><td width="28"></td></tr></table></td></tr>`;

/** Correo completo estático: banner de la tipología + cuerpo demo + CTA + footer VMC. */
export function buildDemoEmail(t: EmailTipologia): string {
  const ctaGrad = CTA_GRADIENTS[t.system];
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta property="og:title" content="${t.titulo}">
<title>${t.titulo}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color:#FAFAFA!important;margin:0;padding:0;">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0;padding:0;width:100%;">
<tr><td align="center" valign="top">
<table border="0" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF" style="padding:20px;">
${bannerRows(t)}
<tr><td height="20"></td></tr>
<tr><td align="center" style="font-size:24px;font-weight:800;line-height:1.25;color:#3b1782;letter-spacing:-0.02em;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;padding:0 16px;"><b>${t.titulo}</b></td></tr>
<tr><td height="24"></td></tr>
<tr><td align="left" style="font-size:14px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;line-height:22px;color:#0E016C;padding:0 16px;">{{Nombre usuario .Ejem: Gabriel Bruno}},</td></tr>
<tr><td height="10"></td></tr>
<tr><td align="left" style="font-size:14px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;line-height:22px;color:#0E016C;padding:0 16px;">${t.subtitulo} <strong style="font-weight:700;color:#0E016C;">Ingresa a tu zona de usuario</strong> para ver el detalle.</td></tr>
<tr><td height="20"></td></tr>
<tr><td align="center"><table border="0" cellpadding="0" cellspacing="0" align="center" style="border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%);box-shadow:rgba(237,137,54,0.3) 0 2px 6px;"><tr><td style="padding:2px;"><a href="https://www.vmcsubastas.com/login?redirect_after_to=/zona" target="_blank" style="display:inline-block;background:#3b1782;background-image:${ctaGrad};color:#FFFFFF;border-radius:9999px;padding:13px 44px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:15px;font-weight:700;text-decoration:none;text-shadow:rgba(0,0,0,0.25) 0 1px 3px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);">VAMOS</a></td></tr></table></td></tr>
<tr><td height="30"></td></tr>
${EMAIL_FOOTER}
</table>
</td></tr>
</table>
</center>
</body>
</html>`;
}

/** Documento HTML mínimo para previsualizar un bloque suelto en un iframe. */
export function wrapEmailPreview(inner: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="background-color:#FAFAFA;margin:0;padding:0;">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
${inner}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
</center>
</body>
</html>`;
}
