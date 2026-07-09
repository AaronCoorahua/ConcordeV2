/**
 * Banners de correo por tipología — módulo plano (sin "use client").
 *
 * Genera bloques HTML **email-safe** (tablas anidadas + estilos inline +
 * bgcolor de respaldo, sin flexbox/grid/JS) que replican la estructura del
 * header de las plantillas de mailing en producción: band con gradiente +
 * tarjeta glass con borde gradiente de 1px + strip de acento de 4px.
 *
 * El bloque devuelto por `buildEmailBanner` es un `<table width="600">`
 * listo para pegar como header/hero en cualquier plantilla del mailing.
 */

import { EMAIL_ACCENTS, type EmailTipologia } from "./tipologias";

export const EMAIL_WIDTH = 600;

/** Band hero + strip de 4px — bloque completo listo para pegar en la plantilla. */
export function buildEmailBanner(t: EmailTipologia): string {
  const a = EMAIL_ACCENTS[t.system];
  return `<!-- Banner tipología: ${t.label} (${t.id}) — Concorde -->
<table border="0" width="${EMAIL_WIDTH}" cellspacing="0" cellpadding="0" align="center">
<tr><td align="center" valign="middle" bgcolor="${a.bandFallback}" style="background-color:${a.bandFallback};background-image:${a.band};padding:26px 24px 22px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:20px;background-image:linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%);"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="middle" style="border-radius:19px;background-color:rgba(255,255,255,0.10);background-image:linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.10);padding:22px 20px 20px;">
<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="${a.pillBg}" style="border-radius:9999px;"><tr><td align="center" valign="middle" style="padding:6px 16px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:11px;font-weight:800;letter-spacing:0.08em;color:${a.pillColor};line-height:1;">${t.pill}</td></tr></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="12" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
<div style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;color:#FFFFFF;">${t.titulo}</div>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="6" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
<div style="font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:13px;font-weight:500;line-height:1.5;color:rgba(255,255,255,0.85);">${t.subtitulo}</div>
</td></tr></table>
</td></tr></table></td></tr>
<tr><td height="4" bgcolor="${a.stripFallback}" style="background-image:${a.strip};font-size:1px;line-height:1px;">&nbsp;</td></tr>
</table>`;
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
