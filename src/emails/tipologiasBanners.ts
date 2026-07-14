/**
 * Tipologías BÁSICAS de banner (A–G) — módulo plano (sin "use client").
 *
 * A diferencia de las "variantes" (src/emails/tipologias.ts, correos reales por
 * tema), las tipologías básicas describen el LAYOUT del banner HEADER real de los
 * correos VMC: el panel GLASS sobre el band morado con el asset de marca
 * (logo »vmc« Subastas + chevrons + el ícono «¡CON TODO!» del choque de puños).
 *
 * NO son banners inventados: reutilizan los assets REALES del CDN que usan los
 * correos en producción (concorde-email.vercel.app):
 *   · header completo  → cdn.vmcsubastas.com/.../vmcsubastas-mail-header.png
 *   · ícono «CON TODO» → cdn.vmcsubastas.com/.../con-todo-footer.png
 *
 * Lo que varía entre tipologías es la POSICIÓN logo↔ilustración dentro del panel
 * glass (idea original de Abraham, texto↔imagen, pero con los assets de marca):
 *   A — header canónico: logo izq + chevrons + puño der (el asset completo)
 *   B — espejo: ícono «CON TODO» a la izquierda, wordmark a la derecha
 *   C — asset de header sobre panel glass teñido (overlay), alineado a la izq
 *   D — todo centrado: wordmark arriba, ícono «CON TODO» debajo
 *   E — apilado: wordmark en el panel glass + franja del header full-width abajo
 *   F — bloque partido: panel glass con wordmark + banda del header pegada abajo
 *   G — acción directa: wordmark a la izq + botón CTA a la der (sin ilustración)
 *
 * HTML email-safe (tablas anidadas + estilos inline + bgcolor de respaldo, sin
 * flexbox/grid/JS), 600px, mismo lenguaje glass de emailBanners.ts.
 */

export const TIPO_WIDTH = 600;

/** Assets REALES de marca (los mismos que usan los correos en producción). */
const ASSET_HEADER = "https://cdn.vmcsubastas.com/services/mailing/images/vmcsubastas-mail-header.png";
const ASSET_CON_TODO = "https://cdn.vmcsubastas.com/services/mailing/inhabilitacion-cuenta/con-todo-footer.png";

/** Gradiente del band hero (morado marca — idéntico al header de los correos). */
const BAND = "linear-gradient(157deg,#5F3ED8 0%,#340091 50%,#140046 100%)";
const BAND_FALLBACK = "#3b1782";
const STRIP = "linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)";
const STRIP_FALLBACK = "#ed8936";

export interface TipoBasica {
  id: string;
  letra: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  label: string;
  descripcion: string;
  /** Placeholder del título de campaña (editable por correo). */
  titulo: string;
  /** Placeholder de la bajada de campaña (editable por correo). */
  subtitulo: string;
}

/** Título/bajada placeholder comunes — se ven como texto de muestra editable. */
const T_TITULO = "{{ Título del correo }}";
const T_SUB = "{{ Bajada breve del correo va aquí }}";

export const TIPOLOGIAS_BASICAS: TipoBasica[] = [
  {
    id: "tipologia-a",
    letra: "A",
    label: "Tipología A",
    descripcion: "Texto a la izquierda, marca a la derecha: el copy (título + bajada) abre la lectura y el header »vmc« Subastas / «¡CON TODO!» acompaña a la derecha.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-b",
    letra: "B",
    label: "Tipología B",
    descripcion: "Espejo de la A: la marca »vmc« Subastas / «¡CON TODO!» abre a la izquierda y el copy (título + bajada) se lee a la derecha.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-c",
    letra: "C",
    label: "Tipología C",
    descripcion: "El header »vmc« Subastas arriba y, debajo, el copy (título + bajada) a todo el ancho sobre el band morado. Máximo peso visual para lanzamientos.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-d",
    letra: "D",
    label: "Tipología D",
    descripcion: "Todo centrado: marca »vmc« Subastas arriba y el copy (título + bajada) centrado debajo. Layout simétrico, el que mejor rinde en clientes antiguos.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-e",
    letra: "E",
    label: "Tipología E",
    descripcion: "Apilado vertical: el copy (título + bajada) arriba y la franja completa del header »vmc« Subastas / «¡CON TODO!» full-width debajo. Pensado mobile-first.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-f",
    letra: "F",
    label: "Tipología F",
    descripcion: "Bloque partido: banda con el copy (título + bajada) sobre el band morado y, pegada, la banda de marca con el ícono «¡CON TODO!».",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-g",
    letra: "G",
    label: "Tipología G",
    descripcion: "Acción directa: copy (título + bajada) a la izquierda y un botón CTA a la derecha, sin ilustración. El más compacto — para avisos transaccionales.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
];

/**
 * Wordmark »vmc« Subastas tipográfico (para cuando el layout separa el logo de
 * la ilustración y el asset completo no sirve). Reproduce el lockup del correo:
 * «›vmc‹» en blanco + «Subastas» en lila + «powered by SUBASTOP.co».
 */
function wordmark(align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ""}>
<tr><td align="${align}" style="font-family:'Poppins','Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:30px;font-weight:700;letter-spacing:-0.01em;line-height:1;color:#FFFFFF;">›vmc‹</td></tr>
<tr><td height="2" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Poppins','Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.01em;line-height:1;color:#B9A7EA;">Subastas</td></tr>
<tr><td height="6" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.02em;line-height:1;color:#8E7CC3;">powered by <b style="color:#B9A7EA;">SUBASTOP</b> .Co</td></tr>
</table>`;
}

/**
 * Bloque de copy placeholder (título + subtítulo) alineado a `align`. Se ve como
 * texto de muestra editable: el título en blanco bold y la bajada en lila suave,
 * con las llaves {{ }} para dejar claro que es un placeholder de campaña.
 */
function copyBlock(t: TipoBasica, align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;color:#FFFFFF;">${t.titulo}</td></tr>
<tr><td height="7" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:13px;font-weight:500;line-height:1.5;color:rgba(255,255,255,0.82);">${t.subtitulo}</td></tr>
</table>`;
}

/**
 * Wordmark con colores custom (para fondos que no son morado: el «Subastas» y el
 * «powered by» necesitan otro tono para contrastar sobre naranja/teal).
 */
export function wordmarkTinted(align: "left" | "center", sub: string, powered: string, poweredBrand: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ""}>
<tr><td align="${align}" style="font-family:'Poppins','Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:28px;font-weight:700;letter-spacing:-0.01em;line-height:1;color:#FFFFFF;">›vmc‹</td></tr>
<tr><td height="2" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Poppins','Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.01em;line-height:1;color:${sub};">Subastas</td></tr>
<tr><td height="6" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.02em;line-height:1;color:${powered};">powered by <b style="color:${poweredBrand};">SUBASTOP</b> .Co</td></tr>
</table>`;
}

/** Ícono «¡CON TODO!» real (choque de puños entre chevrons) a `w` px. */
export function conTodo(w: number): string {
  return `<img src="${ASSET_CON_TODO}" width="${w}" alt="¡Con todo!" style="border:0;display:block;width:100%;max-width:${w}px;height:auto;">`;
}

/** Franja del header completa real (logo + chevrons + puño) a `w` px. */
function headerAsset(w: number): string {
  return `<img src="${ASSET_HEADER}" width="${w}" alt="VMC Subastas — ¡Con todo!" style="border:0;display:block;width:100%;max-width:${w}px;height:auto;">`;
}

/** Botón CTA glass (mismo lenguaje que el «¡Vamos!» del footer de los correos). */
function ctaButton(text: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0" style="border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%);box-shadow:rgba(237,137,54,0.3) 0 2px 6px;"><tr><td style="padding:2px;"><table border="0" cellspacing="0" cellpadding="0"><tr><td height="42" bgcolor="#3b1782" style="border-radius:9999px;background-image:linear-gradient(135deg,#ed8936 0%,#8460e5 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);padding:0 30px;font-family:'Plus Jakarta Sans', Arial, Helvetica, sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:rgba(0,0,0,0.25) 0 1px 3px;" align="center" valign="middle"><b>${text}</b></td></tr></table></td></tr></table>`;
}

/** Strip de acento de 4px (cierre de banner, idéntico al de los correos). */
const STRIP_ROW = `<tr><td height="4" bgcolor="${STRIP_FALLBACK}" style="background-image:${STRIP};font-size:1px;line-height:1px;">&nbsp;</td></tr>`;

/**
 * Abre el band morado + el panel glass (el marco real del header de los correos)
 * y devuelve la apertura; cierra con GLASS_CLOSE. `pad` es el padding interno del
 * glass; `bandPad` el del band.
 */
function glassOpen(bandPad: string, pad: string, valign: "middle" | "top"): string {
  return `<tr><td align="center" valign="${valign}" bgcolor="${BAND_FALLBACK}" style="background-color:${BAND_FALLBACK};background-image:${BAND};padding:${bandPad};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:20px;background-image:linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%);"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="${valign}" style="border-radius:19px;background-color:rgba(255,255,255,0.10);background-image:linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.10);padding:${pad};">`;
}
const GLASS_CLOSE = `</td></tr></table>
</td></tr></table></td></tr>`;

/** Band morado abierto SIN glass (contenido directo). Cierra con BAND_CLOSE. */
function bandOpen(bandPad: string, valign: "middle" | "top"): string {
  return `<tr><td align="center" valign="${valign}" bgcolor="${BAND_FALLBACK}" style="background-color:${BAND_FALLBACK};background-image:${BAND};padding:${bandPad};">`;
}
const BAND_CLOSE = `</td></tr>`;

/** Filas <tr> del banner según la tipología (A–G). Todas llevan copy placeholder. */
export function tipoBannerRows(t: TipoBasica): string {
  // A — texto izq + header »vmc« completo der. Sobre band (SIN glass: el PNG ya trae marco).
  if (t.letra === "A") {
    return `${bandOpen("26px 24px", "middle")}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td valign="middle" width="300" style="padding-right:16px;">${copyBlock(t, "left")}</td>
<td valign="middle" align="right">${headerAsset(240)}</td>
</tr></table>
${BAND_CLOSE}
${STRIP_ROW}`;
  }

  // B — espejo: marca (ícono «CON TODO» + wordmark) izq + texto der. En glass (contiene el copy).
  if (t.letra === "B") {
    return `${glassOpen("26px 24px", "20px 22px", "middle")}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td valign="middle" width="160" align="left" style="padding-right:18px;">
<table border="0" cellpadding="0" cellspacing="0"><tr><td>${conTodo(150)}</td></tr>
<tr><td height="10" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td>${wordmark("left")}</td></tr></table>
</td>
<td valign="middle" align="left">${copyBlock(t, "left")}</td>
</tr></table>
${GLASS_CLOSE}
${STRIP_ROW}`;
  }

  // C — header »vmc« completo arriba + texto full-width abajo. Sobre band (SIN glass).
  if (t.letra === "C") {
    return `${bandOpen("26px 24px", "middle")}
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${headerAsset(520)}</td></tr>
<tr><td height="18" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td>${copyBlock(t, "center")}</td></tr></table>
${BAND_CLOSE}
${STRIP_ROW}`;
  }

  // D — todo centrado: marca arriba + texto centrado debajo. En glass.
  if (t.letra === "D") {
    return `${glassOpen("30px 24px", "24px 22px", "middle")}
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${wordmark("center")}</td></tr>
<tr><td height="8" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${conTodo(180)}</td></tr>
<tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td>${copyBlock(t, "center")}</td></tr></table>
${GLASS_CLOSE}
${STRIP_ROW}`;
  }

  // E — apilado: texto arriba + franja del header »vmc« full-width abajo. Sobre band (SIN glass).
  if (t.letra === "E") {
    return `${bandOpen("26px 28px 0", "top")}
${copyBlock(t, "left")}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="20" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
${BAND_CLOSE}
<tr><td align="center" bgcolor="${BAND_FALLBACK}" style="background-color:${BAND_FALLBACK};background-image:${BAND};padding:0 24px 22px;font-size:0;line-height:0;">${headerAsset(552)}</td></tr>
${STRIP_ROW}`;
  }

  // F — bloque partido: texto sobre band en glass + banda lila con el ícono «CON TODO» abajo.
  if (t.letra === "F") {
    return `${glassOpen("26px 28px 22px", "20px 22px", "middle")}
${copyBlock(t, "left")}
${GLASS_CLOSE}
<tr><td align="center" bgcolor="#EDE9FE" style="background-color:#EDE9FE;padding:14px 24px;font-size:0;line-height:0;">${conTodo(220)}</td></tr>
${STRIP_ROW}`;
  }

  // G — acción directa: texto izq + botón CTA der (sin ilustración). En glass.
  return `${glassOpen("26px 24px", "20px 22px", "middle")}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td valign="middle" style="padding-right:16px;">${copyBlock(t, "left")}</td>
<td valign="middle" width="150" align="right">${ctaButton("¡VAMOS!")}</td>
</tr></table>
${GLASS_CLOSE}
${STRIP_ROW}`;
}

/** El banner como bloque suelto (table de 600) listo para pegar como header. */
export function buildTipoBanner(t: TipoBasica): string {
  return `<!-- Tipología ${t.letra}: ${t.label} (${t.id}) — Concorde -->
<table border="0" width="${TIPO_WIDTH}" cellspacing="0" cellpadding="0" align="center">
${tipoBannerRows(t)}
</table>`;
}

/** Documento HTML mínimo para previsualizar el banner en un iframe. */
export function wrapTipoPreview(inner: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
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
