/**
 * Piezas de marca compartidas por las tipologías — módulo plano (sin "use client").
 *
 * Vive aparte de tipologiasBanners.ts / tipologiasV2.ts a propósito: ambos lo
 * necesitan, y si colgara de cualquiera de los dos crearía un ciclo de imports
 * (tipologiasBanners → tipologiasV2 → tipologiasBanners).
 *
 * Usa los assets REALES del CDN que usan los correos en producción.
 */

/** Assets REALES de marca (los mismos que usan los correos en producción). */
export const ASSET_HEADER = "https://cdn.vmcsubastas.com/services/mailing/images/vmcsubastas-mail-header.png";
export const ASSET_CON_TODO = "https://cdn.vmcsubastas.com/services/mailing/inhabilitacion-cuenta/con-todo-footer.png";

/** Ícono «¡CON TODO!» real (choque de puños entre chevrons) a `w` px. */
export function conTodo(w: number): string {
  return `<img src="${ASSET_CON_TODO}" width="${w}" alt="¡Con todo!" style="border:0;display:block;width:100%;max-width:${w}px;height:auto;">`;
}

/** Franja del header completa real (logo + chevrons + puño) a `w` px. */
export function headerAsset(w: number): string {
  return `<img src="${ASSET_HEADER}" width="${w}" alt="VMC Subastas — ¡Con todo!" style="border:0;display:block;width:100%;max-width:${w}px;height:auto;">`;
}

/**
 * Wordmark »vmc« Subastas con colores custom: el «Subastas» y el «powered by»
 * necesitan otro tono para contrastar según el fondo (naranja/teal/morado).
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
