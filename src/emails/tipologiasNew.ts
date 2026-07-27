/**
 * Tipologías de correo — construidas DE CERO — módulo plano (sin "use client").
 *
 * Modelo: cada tipología es UN banner completo (fondo + copy + marca), clonado
 * TAL CUAL de su SVG de Figma. NO hay «tab de fondos»: cada tono/estilo es su
 * propia tipología y se van creando una por una.
 *
 * La marca no se reconstruye con CSS: se usa el LOGO REAL
 * `public/logo-correos.png` (»vmc« + barra + SUBASTAS + powered by) como <img>.
 *
 * Coordenadas ABSOLUTAS del SVG (viewBox 600×214). Anillos, glows, dots y pill
 * salen de los `<circle>`, `<filter>` y `<rect>`/`paint*` de cada SVG.
 *
 * Tipologías actuales:
 *   01 · En Vivo (naranja) — «Header — En Vivo VOYAGER.svg»
 *   02 · Morado            — «Header — Morado VOYAGER v1.svg»
 */

export const TIPO_WIDTH = 600;
export const TIPO_HEIGHT = 214;
/** Alto del banner CENTRADO (los SVG «Centrado» miden 600×340). */
export const TIPO_CENTERED_HEIGHT = 340;
/** Alto del banner APILADO (los SVG «Apilada» miden 600×260). */
export const TIPO_STACKED_HEIGHT = 260;

/**
 * Layout = composición marca↔copy:
 *   · text-left  — copy a la izquierda, marca a la derecha (anillos der).
 *   · text-right — ESPEJO: copy a la derecha, marca a la izquierda (anillos izq).
 *   · centered   — todo apilado y centrado: logo → pill → título → bajada (600×340).
 *   · stacked    — apilado a la IZQUIERDA: logo → pill → título → bajada, columna
 *                  izquierda; anillos a la derecha (600×260).
 */
export type TipoLayout = "text-left" | "text-right" | "centered" | "stacked";

/** Estilo de pill: glass (naranja) o sólida de color (morado). */
export type PillStyle = "glass" | "solid";

export interface TipoNew {
  id: string;
  letra: string;
  label: string;
  descripcion: string;
  layout: TipoLayout;
  style: TipoStyle;
}

/** Ruta del logo real (»vmc« + barra + SUBASTAS + powered by). */
export const LOGO_CORREOS = "/logo-correos.png";

// ─── Estilo visual de cada tipología (fondo + formas + pill) ────────────────────

export interface TipoStyle {
  /** Gradiente de fondo (background-image), dirección/paradas exactas del SVG. */
  bg: string;
  /**
   * Fondo como capa SVG inline (opcional) — el `paint0` COPIADO TAL CUAL del
   * Figma, con `gradientUnits="userSpaceOnUse"`. Cuando existe, se usa en vez de
   * `bg`: garantiza el gradiente idéntico píxel a píxel, sin aproximar con CSS.
   * Debe ser el markup de un `<linearGradient id="tipoBg">…</linearGradient>`.
   */
  bgSvgGradient?: string;
  /** Color plano de respaldo (bgcolor). */
  bgFallback: string;
  /** Glows difusos de color: [hex, opacity, {left|right, top}, r] fuera del banner. */
  glows: Array<{ hex: string; op: number; x: number; y: number; r: number }>;
  /** Centro X de los anillos (cx del SVG). El cy es 112 (izq/der) o 8 (centrado). */
  ringsCx: number;
  /** Centro Y de los anillos (cy del SVG). Def: 112 (izq/der). Centrado: 8. */
  ringsCy?: number;
  /** Multiplicador de opacidad de los anillos (Dark los pone al 0.5). Def: 1. */
  ringsOpacityMul?: number;
  /** Dots exactos del SVG: [cx, cy, r, opacity]. */
  dots: Array<[number, number, number, number]>;
  /**
   * Chevrons laterales (los `<path opacity="0.7" stroke=white 0.12>` con forma de
   * flecha `<` / `>` que salen por los bordes). Se pintan como capa SVG inline con
   * los paths COPIADOS TAL CUAL del Figma. Vacío = sin flechas.
   */
  chevrons?: string[];
  /**
   * Chevron RELLENO (el `<path fill=white 0.04-0.07>` con forma `>` que asoma por
   * el borde derecho en el layout apilado). Opacidad exacta del SVG por tono.
   */
  chevronFillOpacity?: number;
  /** Desplazamiento vertical del logo respecto al centro (px). El morado baja. */
  logoDy: number;
  /** Estilo de la pill. */
  pill: PillStyle;
  /** Pill glass: gradiente del borde 1px. Pill solid: se ignora (usa pillFill+pillBorder). */
  pillBorder: string;
  /** Pill solid: gradiente de relleno. */
  pillFill: string;
  /** Sombra de la pill (drop). */
  pillShadow: string;
}

// ─── Piezas email-safe — coordenadas ABSOLUTAS del SVG (viewBox 600×214) ────────

/**
 * Anillos concéntricos + dots — TAL CUAL el SVG. Centro (cx, 112); radios
 * 149.4 / 114.4 / 79.4; stroke blanco 0.12/0.16/0.10; grosor 1.2px. Dots en sus
 * posiciones exactas.
 */
function ringsAndDots(cx: number, dots: Array<[number, number, number, number]>, opMul: number = 1, cy: number = 112): string {
  const ring = (r: number, op: number): string =>
    `<div style="position:absolute;left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;border:1.2px solid rgba(255,255,255,${(op * opMul).toFixed(3)});pointer-events:none;"></div>`;
  const dot = ([dx, dy, r, op]: [number, number, number, number]): string =>
    `<div style="position:absolute;left:${dx - r}px;top:${dy - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;background:rgba(255,255,255,${op});pointer-events:none;"></div>`;
  return `<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
${ring(149.4, 0.12)}
${ring(114.4, 0.16)}
${ring(79.4, 0.1)}
${dots.map(dot).join("\n")}
</div>`;
}

/**
 * Glows difusos de color — filter*_f del SVG: círculos de color con blur grande
 * que asoman por los bordes. `x`/`y` son el centro; negativos = fuera del banner.
 */
function glowLayers(glows: TipoStyle["glows"]): string {
  return glows
    .map(function toGlow(g) {
      return `<div style="position:absolute;left:${g.x - g.r}px;top:${g.y - g.r}px;width:${2 * g.r}px;height:${2 * g.r}px;border-radius:50%;background:radial-gradient(closest-side,${g.hex} 0%,rgba(0,0,0,0) 100%);opacity:${g.op};pointer-events:none;"></div>`;
    })
    .join("\n");
}

/** Sheen superior sutil. */
const SHEEN = `<div style="position:absolute;top:0;left:0;right:0;height:40px;background:linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0) 100%);pointer-events:none;"></div>`;

/**
 * Chevrons laterales — los `<path opacity="0.7" stroke=white 0.12 width=1.2>` con
 * forma de flecha `<`/`>` que asoman por los bordes. Se pintan como una capa SVG
 * cuyo viewBox = el tamaño del banner, así los paths (coords absolutas del Figma,
 * que se extienden fuera del box) calzan exactamente y se recortan con el overflow.
 */
function chevronLayer(paths: string[] | undefined, w: number, h: number): string {
  if (!paths || paths.length === 0) return "";
  const p = paths
    .map((d) => `<path d="${d}" stroke="white" stroke-opacity="0.12" stroke-width="1.2" fill="none"/>`)
    .join("");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;overflow:visible;pointer-events:none;"><g opacity="0.7">${p}</g></svg>`;
}

/**
 * Pill {{ PILL }} — dos variantes según el SVG:
 *   · glass (En Vivo): interior cristal (backdrop-blur + fill blanco 10%→0%),
 *     el color va SOLO en el borde de 1px (técnica mask-composite).
 *   · solid (Morado): relleno de gradiente sólido (paint2) + borde de gradiente
 *     (paint3) con un pseudo-borde por mask.
 * Ambas: rect 91×22 rx11 en (x=48, y=Ypill). Sombra drop + inner blanco 10%.
 */
/**
 * Pill {{ PILL }} EN FLUJO (no posicionada) — para colocarla dentro del bloque
 * de copy y que quede alineada al mismo eje izquierdo que el título y la bajada.
 */
function pill(s: TipoStyle): string {
  if (s.pill === "glass") {
    return `<div style="width:91px;height:22px;box-sizing:border-box;border-radius:11px;position:relative;background:linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0) 100%);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);box-shadow:${s.pillShadow},inset 0 1px 0 rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;">
<div style="position:absolute;inset:0;border-radius:11px;padding:1px;background:${s.pillBorder};-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;"></div>
<span style="position:relative;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.06em;color:#FFFFFF;white-space:nowrap;">{{ PILL }}</span>
</div>`;
  }
  // solid — relleno de color (paint2) + borde de gradiente (paint3) + sheen glass.
  return `<div style="width:91px;height:22px;box-sizing:border-box;border-radius:11px;position:relative;overflow:hidden;background:${s.pillFill};box-shadow:${s.pillShadow},inset 0 1px 0 rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;">
<div style="position:absolute;top:0;left:0;right:0;height:50%;border-radius:11px 11px 0 0;background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0) 100%);pointer-events:none;"></div>
<div style="position:absolute;inset:0;border-radius:11px;padding:1px;background:${s.pillBorder};-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;"></div>
<span style="position:relative;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.06em;color:#FFFFFF;white-space:nowrap;">{{ PILL }}</span>
</div>`;
}

/**
 * Copy — un ÚNICO bloque (pill + título + bajada) alineado a su borde izquierdo,
 * anclado a la izquierda (`text-left`) o a la derecha (`text-right`). Así la
 * pill queda alineada con el título y la bajada, como en Figma.
 */
function copyBlock(s: TipoStyle, yPill: number, side: "left" | "right"): string {
  // El bloque se ajusta al contenido (inline-block); en text-right lo pegamos al
  // borde derecho (right:40, la pill casi toca el borde como en el SVG Var A) con
  // la pill alineada a la derecha del bloque y el texto a la izquierda.
  const pos = side === "left" ? "left:48px" : "right:40px";
  // En el ESPEJO (side=right) todo se alinea a la DERECHA — pill, título y bajada
  // pegados al borde derecho, coherentes entre sí. En text-left, a la izquierda.
  const align = side === "left" ? "left" : "right";
  const pillAlign = side === "left" ? "" : "margin-left:auto;";
  // El copy va a la IZQUIERDA (o derecha, espejo) y la marca ocupa ~186px del lado
  // opuesto: acotamos el ancho a 300px para que un título largo (el asunto real
  // del correo) ENVUELVA en 2-3 líneas en vez de desbordar sobre el logo. El bloque
  // se CENTRA verticalmente (top:50%) para que, crezca lo que crezca el título, no
  // rebase el banner por abajo. Con el placeholder corto de /tipologias queda como
  // el SVG (pill+título+bajada alineados en su columna). yPill queda como fallback
  // de referencia pero ya no fija el top.
  void yPill;
  return `<div style="position:absolute;${pos};top:50%;transform:translateY(-50%);width:300px;max-width:300px;text-align:${align};">
<div style="width:91px;${pillAlign}">${pill(s)}</div>
<div style="height:12px;line-height:12px;font-size:1px;">&nbsp;</div>
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;color:#FFFFFF;">{{ Título del correo }}</div>
<div style="height:10px;line-height:10px;font-size:1px;">&nbsp;</div>
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;line-height:1.4;color:rgba(255,255,255,0.86);">{{ Bajada breve del correo va aquí }}</div>
</div>`;
}

/**
 * Marca real — el logo PNG. En `text-left` va anclado a la derecha (right≈24);
 * en `text-right` (espejo) a la izquierda (left≈24). Centrado vertical con
 * el desplazamiento `logoDy` del SVG.
 */
function brandLogo(dy: number, side: "left" | "right"): string {
  const pos = side === "right" ? "right:24px" : "left:24px";
  return `<img src="${LOGO_CORREOS}" alt="vmc Subastas — powered by SUBASTOP .Co" style="position:absolute;${pos};top:calc(50% + ${dy}px);transform:translateY(-50%);width:186px;height:auto;border:0;display:block;">`;
}

/**
 * Composición CENTRADA (SVG «Centrado», 600×340). Todo apilado y centrado:
 *   · logo (vmc SUBASTAS) arriba — PNG 186px, centrado (x≈207, y≈30 del SVG).
 *   · pill al medio (rect 91×22 centrado, y≈158 del SVG).
 *   · título grande centrado (y≈203 del SVG).
 *   · bajada centrada (y≈242 del SVG).
 * Coordenadas absolutas del SVG, con el bloque como columna centrada.
 */
function centeredContent(s: TipoStyle): string {
  // Logo: top 30 del SVG (los glifos VMC arrancan en y≈30). El PNG incluye la
  // barra de marca + «powered by» debajo, así que ocupa hasta ~y=108.
  const logo = `<img src="${LOGO_CORREOS}" alt="vmc Subastas — powered by SUBASTOP .Co" style="position:absolute;top:30px;left:50%;transform:translateX(-50%);width:186px;height:auto;border:0;display:block;">`;
  // Pill centrada — rect del SVG en y=158 (todas las variantes ~158-159).
  const pillBlock = `<div style="position:absolute;top:158px;left:50%;transform:translateX(-50%);width:91px;">${pill(s)}</div>`;
  // Título + bajada en un bloque de FLUJO (padding-top:196 reserva logo+pill),
  // centrados y acotados: el título largo envuelve, la bajada baja sola y el banner
  // CRECE (min-height) en vez de cortar. Con el placeholder corto queda como el SVG.
  const copy = `<div style="position:relative;padding:196px 40px 24px;text-align:center;">
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;color:#FFFFFF;">{{ Título del correo }}</div>
<div style="height:10px;line-height:10px;font-size:1px;">&nbsp;</div>
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;line-height:1.4;color:rgba(255,255,255,0.86);">{{ Bajada breve del correo va aquí }}</div>
</div>`;
  return `${logo}${pillBlock}${copy}`;
}

/**
 * Composición APILADA (SVG «Apilada», 600×260). Todo apilado a la IZQUIERDA:
 *   · logo (vmc SUBASTAS) arriba-izquierda — PNG 186px (x≈40, y≈42 del SVG).
 *   · pill debajo del logo (rect 91×22 en x≈45, y≈125 del SVG).
 *   · título grande a la izquierda (y≈171 del SVG).
 *   · bajada a la izquierda (y≈210 del SVG).
 * Los anillos van a la derecha (cx=470); el chevron relleno asoma por el borde der.
 */
function stackedContent(s: TipoStyle): string {
  const L = "40px"; // eje izquierdo común del logo/pill/título/bajada.
  // Logo: arriba-izquierda. El PNG incluye VMC + barra + «powered by»; a 158px de
  // ancho su alto es ~89px, así que de top:32 baja hasta ~121 y la pill (top:132)
  // queda LIBRE debajo, sin solaparse con «powered by» (como en el SVG).
  const logo = `<img src="${LOGO_CORREOS}" alt="vmc Subastas — powered by SUBASTOP .Co" style="position:absolute;top:32px;left:${L};width:158px;height:auto;border:0;display:block;">`;
  // Pill — debajo del logo, misma columna izquierda.
  const pillBlock = `<div style="position:absolute;top:132px;left:${L};width:91px;">${pill(s)}</div>`;
  // Título + bajada en un bloque de FLUJO (no absoluto): un padding-top reserva el
  // espacio del logo+pill (que sí son absolutos) y el copy fluye debajo. Al ser
  // flujo, EMPUJA el min-height del banner: si el título envuelve en 2-3 líneas, el
  // banner CRECE en vez de cortar la bajada. Con el placeholder corto queda a la
  // misma altura del SVG (top≈174).
  const copy = `<div style="position:relative;padding:174px 24px 22px ${L};text-align:left;">
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;color:#FFFFFF;">{{ Título del correo }}</div>
<div style="height:8px;line-height:8px;font-size:1px;">&nbsp;</div>
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;line-height:1.4;color:rgba(255,255,255,0.86);">{{ Bajada breve del correo va aquí }}</div>
</div>`;
  return `${logo}${pillBlock}${copy}`;
}

/**
 * Chevron RELLENO `>` del layout apilado — `<path d="M580 -20…" fill=white op>`.
 * Es una sola flecha muy sutil que asoma por el borde derecho, recortada por el
 * overflow del banner. Opacidad exacta del SVG (0.04–0.07 según tono).
 */
function chevronFillLayer(op: number | undefined, w: number, h: number): string {
  if (!op) return "";
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;overflow:visible;pointer-events:none;"><path d="M580 -20L665 130L580 280H630L715 130L630 -20H580Z" fill="white" fill-opacity="${op}"/></svg>`;
}

// ─── Ensamblado ───────────────────────────────────────────────────────────────

/** Alto real del banner según su layout (214 izq/der · 340 centrado · 260 apilado). */
export function tipoNewHeight(layout: TipoLayout = "text-left"): number {
  if (layout === "centered") return TIPO_CENTERED_HEIGHT;
  if (layout === "stacked") return TIPO_STACKED_HEIGHT;
  return TIPO_HEIGHT;
}

/**
 * Banner de una tipología, clonado de su SVG. Todo el contenido va en absoluto
 * dentro del div relativo. Bordes 18px (rx del SVG).
 */
export function buildTipoNewBanner(t: TipoNew): string {
  const s = t.style;
  const centered = t.layout === "centered";
  const stacked = t.layout === "stacked";
  const H = tipoNewHeight(t.layout);
  const yPill = Math.round((TIPO_HEIGHT - 22) / 2 - 32); // pill sobre el centro (izq/der)
  // Fondo: si hay bgSvgGradient, se pinta con una capa SVG IDÉNTICA al Figma
  // (rect con paint0 en userSpaceOnUse). Si no, se usa el CSS `bg`.
  const uid = `tipoBg_${t.id.replace(/[^a-z0-9]/gi, "")}`;
  const bgSvgLayer = s.bgSvgGradient
    ? `<svg width="${TIPO_WIDTH}" height="${H}" viewBox="0 0 ${TIPO_WIDTH} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;inset:0;display:block;"><defs>${s.bgSvgGradient.replace(/id="[^"]*"/, `id="${uid}"`)}</defs><rect width="${TIPO_WIDTH}" height="${H}" fill="url(#${uid})"/></svg>`
    : "";
  const tdBg = s.bgSvgGradient ? "" : `background-image:${s.bg};`;
  // Espejo: en text-right el copy va a la derecha y la marca a la izquierda.
  const copySide = t.layout === "text-right" ? "right" : "left";
  const brandSide = t.layout === "text-right" ? "left" : "right";
  const ringsCy = s.ringsCy ?? (centered ? 8 : stacked ? 125 : 112);
  const bg = `${bgSvgLayer}${glowLayers(s.glows)}${chevronFillLayer(s.chevronFillOpacity, TIPO_WIDTH, H)}${ringsAndDots(s.ringsCx, s.dots, s.ringsOpacityMul ?? 1, ringsCy)}${chevronLayer(s.chevrons, TIPO_WIDTH, H)}`;
  const content = centered
    ? centeredContent(s)
    : stacked
      ? stackedContent(s)
      : `${copyBlock(s, yPill, copySide)}${brandLogo(s.logoDy, brandSide)}`;
  return `<!-- Tipología: ${t.label} (${t.id}) — Concorde -->
<table border="0" width="${TIPO_WIDTH}" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;">
<tr><td bgcolor="${s.bgFallback}" style="background-color:${s.bgFallback};${tdBg}padding:0;border-radius:18px;">
<div style="position:relative;width:${TIPO_WIDTH}px;min-height:${H}px;overflow:hidden;border-radius:18px;">
${bg}
${SHEEN}
${content}
</div>
</td></tr>
</table>`;
}

/** Documento HTML para previsualizar la tipología en un iframe. */
export function wrapTipoPreview(inner: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
</head><body style="background-color:#FAFAFA;margin:0;padding:0;"><center>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
${inner}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
</center></body></html>`;
}

// ─── Catálogo de tipologías (crece una por una) ─────────────────────────────────

/** 01 · En Vivo (naranja) — «Header — En Vivo VOYAGER.svg». */
const STYLE_EN_VIVO: TipoStyle = {
  // paint0: #FF9639 → #EF852E(50%) → #BE3D00, de (101,-113)→(539,281) ≈ 132°.
  bg: "linear-gradient(132deg,#FF9639 0%,#EF852E 50%,#BE3D00 100%)",
  bgFallback: "#EF852E",
  // filter1_f: #FF6A3D 0.35 en (60,10) r100.
  glows: [{ hex: "#FF6A3D", op: 0.35, x: 60, y: 10, r: 100 }],
  ringsCx: 510,
  // dots del SVG naranja.
  dots: [
    [18.5, 163.5, 2.5, 0.55],
    [218, 68, 2, 0.6],
    [375.135, 163.427, 2.5, 0.55],
    [536.824, 12.5, 2, 0.6],
  ],
  logoDy: 0,
  pill: "glass",
  // paint3 naranja: blanco→#F4AC59(22%)→#8460E5(74.5%)→blanco ≈ 127°.
  pillBorder: "linear-gradient(127deg,#FFFFFF 0%,#F4AC59 22.1%,#8460E5 74.5%,#FFFFFF 100%)",
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 02 · Morado — «Header — Morado VOYAGER v1.svg». */
const STYLE_MORADO: TipoStyle = {
  // Fondo COPIADO TAL CUAL del SVG (paint0_linear_5888_19336): mismo eje
  // userSpaceOnUse (600,22.5)→(93.08,-407.688) y las 3 paradas exactas. Se pinta
  // como capa SVG, así el gradiente es idéntico píxel a píxel al Figma.
  bg: "linear-gradient(130deg,#340091 0%,#8460E5 83%,#ED8936 96%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="600" y1="22.5" x2="93.0801" y2="-407.688" gradientUnits="userSpaceOnUse"><stop offset="0.11131" stop-color="#340091"/><stop offset="0.833927" stop-color="#8460E5"/><stop offset="0.959518" stop-color="#ED8936"/></linearGradient>`,
  bgFallback: "#3B1C86",
  // filter0_f + filter1_f: dos glows #ED8936 0.3, blur60, en (-66,70) y (701,78) r160.
  glows: [
    { hex: "#ED8936", op: 0.3, x: -66, y: 70, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 701, y: 78, r: 160 },
  ],
  ringsCx: 480,
  // dots del SVG morado (solo 2).
  dots: [
    [362.5, 152.5, 2.5, 0.55],
    [562, 57, 2, 0.6],
  ],
  logoDy: 6, // el logo del morado va ~6px más abajo.
  pill: "solid",
  // paint3 morado: #8776FF → white 40%(38%) → #532BC7(68%) → #8776FF.
  pillBorder: "linear-gradient(139deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)",
  // paint2 morado: #8460E5 → #3B1782.
  pillFill: "linear-gradient(137deg,#8460E5 0%,#3B1782 100%)",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 03 · Negociable — «Header — Negociable VOYAGER v1.svg». */
const STYLE_NEGOCIABLE: TipoStyle = {
  // paint0: teal #00DAE0 → #008688, horizontal (0,107)→(600,107) = 90deg.
  bg: "linear-gradient(90deg,#00DAE0 0%,#008688 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="0" y1="107" x2="600" y2="107" gradientUnits="userSpaceOnUse"><stop stop-color="#00DAE0"/><stop offset="1" stop-color="#008688"/></linearGradient>`,
  bgFallback: "#00A6A8",
  // filter0_f + filter1_f: dos glows #ED8936 0.3, blur60, en (-66,70) y (94,42) r160.
  glows: [
    { hex: "#ED8936", op: 0.3, x: -66, y: 70, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 94, y: 42, r: 160 },
  ],
  ringsCx: 480,
  dots: [
    [362.5, 152.5, 2.5, 0.55],
    [562, 57, 2, 0.6],
  ],
  logoDy: 6,
  // Pill GLASS: paint2 del SVG es white 10%→0% (cristal, se ve el teal detrás);
  // el color va SOLO en el borde (paint3 morado).
  pill: "glass",
  pillBorder: "linear-gradient(139deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)",
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 04 · SubasCoins — «Header — SubasCoins VOYAGER.svg». */
const STYLE_SUBASCOINS: TipoStyle = {
  // paint0: gradiente de MARCA blanco→#F4AC59(22%)→#8460E5(74.5%)→blanco, eje
  // (101.764,-112.87)→(539.155,281.485) — mismo eje que la pill glass del naranja.
  bg: "linear-gradient(132deg,#FFFFFF 0%,#F4AC59 22%,#8460E5 74.5%,#FFFFFF 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.221154" stop-color="#F4AC59"/><stop offset="0.745192" stop-color="#8460E5"/><stop offset="1" stop-color="white"/></linearGradient>`,
  bgFallback: "#B58BC0",
  // filter0/1: #FFC53D 0.5 blur40 en (0,214) y (590,3) r120 · filter2: #8460E5 0.3 en (580,40) r110.
  glows: [
    { hex: "#FFC53D", op: 0.5, x: 0, y: 214, r: 120 },
    { hex: "#FFC53D", op: 0.5, x: 590, y: 3, r: 120 },
    { hex: "#8460E5", op: 0.3, x: 580, y: 40, r: 110 },
  ],
  ringsCx: 510,
  dots: [], // SubasCoins no tiene dots.
  logoDy: 0,
  pill: "glass",
  // paint2 pill: white→#F4AC59(22%)→#8460E5(74.5%)→white (misma que la del naranja).
  pillBorder: "linear-gradient(127deg,#FFFFFF 0%,#F4AC59 22.1%,#8460E5 74.5%,#FFFFFF 100%)",
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 05 · Dark — «Header — Dark VOYAGER.svg». */
const STYLE_DARK: TipoStyle = {
  // paint0: #0E0524 → #1A0B3D(50%) → #2C165E, eje (-180,149.8)→(33.06,508.215).
  bg: "linear-gradient(120deg,#0E0524 0%,#1A0B3D 50%,#2C165E 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-180" y1="149.8" x2="33.0581" y2="508.215" gradientUnits="userSpaceOnUse"><stop stop-color="#0E0524"/><stop offset="0.5" stop-color="#1A0B3D"/><stop offset="1" stop-color="#2C165E"/></linearGradient>`,
  bgFallback: "#1A0B3D",
  // filter1_f: #6E4BD6 0.35 blur45 en (580,40) r110 · filter2_f: #3B1782 0.4 en (60,220) r100.
  glows: [
    { hex: "#6E4BD6", op: 0.35, x: 580, y: 40, r: 110 },
    { hex: "#3B1782", op: 0.4, x: 60, y: 220, r: 100 },
  ],
  ringsCx: 510,
  ringsOpacityMul: 0.5, // los anillos del Dark van al 50%.
  dots: [], // Dark no tiene dots.
  logoDy: 0,
  pill: "solid",
  pillBorder: "linear-gradient(139deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)",
  pillFill: "linear-gradient(137deg,#8460E5 0%,#3B1782 100%)",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

// ─── Tonos de la DERECHA (espejo Var A) — «Header — Var A · … VOYAGER.svg» ──────
// Comparten: anillos cx=-20 (a la izquierda, tras la marca), pill en right:48,
// eje de borde de pill (485,31)→(535,89), y los dots base (472.5,52.5)/(522,152).

const R_DOTS_BASE: Array<[number, number, number, number]> = [
  [472.5, 52.5, 2.5, 0.55],
  [522, 152, 2, 0.6],
];
// Borde de pill (paint3) espejo: mismo gradiente, eje (485,31)→(535,89) ≈ 49°.
const R_PILL_BORDER = "linear-gradient(49deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)";
const R_PILL_BORDER_BRAND = "linear-gradient(53deg,#FFFFFF 0%,#F4AC59 22.1%,#8460E5 74.5%,#FFFFFF 100%)";
const R_PILL_FILL = "linear-gradient(47deg,#8460E5 0%,#3B1782 100%)";

/** 01 · En Vivo (naranja) espejo — «Var A · Espejo». */
const STYLE_R_EN_VIVO: TipoStyle = {
  bg: "linear-gradient(132deg,#FF9639 0%,#EF852E 50%,#BE3D00 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9639"/><stop offset="0.5" stop-color="#EF852E"/><stop offset="1" stop-color="#BE3D00"/></linearGradient>`,
  bgFallback: "#EF852E",
  glows: [
    { hex: "#ED8936", op: 0.3, x: 52, y: 12, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 600, y: 212, r: 160 },
  ],
  ringsCx: -20,
  dots: [...R_DOTS_BASE, [128, 192, 2, 0.6], [494, 32, 2, 0.6], [62, 34, 2, 0.6]],
  logoDy: 0,
  pill: "glass",
  pillBorder: R_PILL_BORDER_BRAND,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 02 · Morado espejo — «Var A · Espejo VOYAGER». */
const STYLE_R_MORADO: TipoStyle = {
  bg: "linear-gradient(120deg,#340091 0%,#8460E5 56%,#ED8936 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="53" y1="159" x2="598.207" y2="588.601" gradientUnits="userSpaceOnUse"><stop stop-color="#340091"/><stop offset="0.559582" stop-color="#8460E5"/><stop offset="1" stop-color="#ED8936"/></linearGradient>`,
  bgFallback: "#5A35C2",
  glows: [
    { hex: "#ED8936", op: 0.3, x: 52, y: 12, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 600, y: 212, r: 160 },
  ],
  ringsCx: -20,
  dots: R_DOTS_BASE,
  logoDy: 0,
  pill: "solid",
  pillBorder: R_PILL_BORDER,
  pillFill: R_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 03 · Negociable espejo — «Var A · VOYAGER». */
const STYLE_R_NEGOCIABLE: TipoStyle = {
  bg: "linear-gradient(90deg,#00EDEE 0%,#00D2D3 50%,#009597 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="0" y1="107.001" x2="600" y2="107.001" gradientUnits="userSpaceOnUse"><stop stop-color="#00EDEE"/><stop offset="0.5" stop-color="#00D2D3"/><stop offset="1" stop-color="#009597"/></linearGradient>`,
  bgFallback: "#00C2C4",
  glows: [
    { hex: "#ED8936", op: 0.3, x: 52, y: 12, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 600, y: 212, r: 160 },
  ],
  ringsCx: -20,
  dots: R_DOTS_BASE,
  logoDy: 0,
  pill: "glass",
  pillBorder: R_PILL_BORDER,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 04 · SubasCoins espejo — «Var A · VOYAGER-1» (fondo de marca). */
const STYLE_R_SUBASCOINS: TipoStyle = {
  bg: "linear-gradient(132deg,#FF9639 0%,#EF852E 50%,#BE3D00 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9639"/><stop offset="0.5" stop-color="#EF852E"/><stop offset="1" stop-color="#BE3D00"/></linearGradient>`,
  bgFallback: "#EF852E",
  glows: [
    { hex: "#ED8936", op: 0.3, x: 52, y: 12, r: 160 },
    { hex: "#ED8936", op: 0.3, x: 600, y: 212, r: 160 },
  ],
  ringsCx: -20,
  dots: [...R_DOTS_BASE, [128, 192, 2, 0.6], [494, 32, 2, 0.6], [62, 34, 2, 0.6]],
  logoDy: 0,
  pill: "glass",
  pillBorder: R_PILL_BORDER_BRAND,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** 05 · Dark espejo — «Var A · VOYAGER-2». */
const STYLE_R_DARK: TipoStyle = {
  bg: "linear-gradient(95deg,#0E0524 0%,#1A0B3D 50%,#2C165E 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-53.5" y1="127" x2="434.77" y2="163.336" gradientUnits="userSpaceOnUse"><stop stop-color="#0E0524"/><stop offset="0.5" stop-color="#1A0B3D"/><stop offset="1" stop-color="#2C165E"/></linearGradient>`,
  bgFallback: "#1A0B3D",
  // filter3_f: #6E4BD6 0.35 en (611,8) r110 · filter4_f: #6E4BD6 0.35 en (0,220) r110.
  glows: [
    { hex: "#6E4BD6", op: 0.35, x: 611, y: 8, r: 110 },
    { hex: "#6E4BD6", op: 0.35, x: 0, y: 220, r: 110 },
  ],
  ringsCx: -20,
  dots: R_DOTS_BASE,
  logoDy: 0,
  pill: "solid",
  pillBorder: R_PILL_BORDER,
  pillFill: R_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

// ─── Tonos CENTRADOS — «Header — Centrado · … VOYAGER.svg» (600×340) ─────────────
// Comparten: anillos cx=302, cy=8 (arriba-centro, tras el logo); pill centrada;
// pill border morada eje (270,144)→(320,202)≈130° / marca (269.4,147.4)→(312.9,205.2)≈127°.
// Sin dots (los SVG centrados no tienen puntitos).

const C_PILL_BORDER = "linear-gradient(130deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)";
const C_PILL_BORDER_BRAND = "linear-gradient(127deg,#FFFFFF 0%,#F4AC59 22.1%,#8460E5 74.5%,#FFFFFF 100%)";
const C_PILL_FILL = "linear-gradient(130deg,#8460E5 0%,#3B1782 100%)";

// Chevrons laterales «Centrado» — paths COPIADOS TAL CUAL de los SVG.
// La flecha IZQUIERDA (`<`) es idéntica en los 5 tonos.
const C_CHEV_LEFT =
  "M167.307 143.354L24.5226 0.569767C2.58505 -21.3677 -32.983 -21.3676 -54.9206 0.569767C-76.8582 22.5074 -76.8582 58.0753 -54.9206 80.0129L41.7645 176.698L-65.2731 283.736C-85.968 304.431 -85.968 337.984 -65.2731 358.679C-44.5779 379.374 -11.024 379.375 9.67126 358.68L167.307 201.044C183.237 185.114 183.237 159.285 167.307 143.354Z";
// La flecha DERECHA (`>`) existe en En Vivo / Morado / Dark, con offset propio.
const C_CHEV_RIGHT_ENVIVO =
  "M435.693 206.646L578.477 349.43C600.415 371.368 635.983 371.368 657.921 349.43C679.858 327.493 679.858 291.925 657.921 269.987L561.235 173.302L668.273 66.2644C688.968 45.5691 688.968 12.0159 668.273 -8.67929C647.578 -29.3744 614.024 -29.375 593.329 -8.67998L435.693 148.956C419.763 164.886 419.763 190.715 435.693 206.646Z";
const C_CHEV_RIGHT_MORADO =
  "M432.693 211.646L575.477 354.43C597.415 376.368 632.983 376.368 654.921 354.43C676.858 332.493 676.858 296.925 654.921 274.987L558.235 178.302L665.273 71.2644C685.968 50.5691 685.968 17.0159 665.273 -3.67929C644.578 -24.3744 611.024 -24.375 590.329 -3.67998L432.693 153.956C416.763 169.886 416.763 195.715 432.693 211.646Z";
const C_CHEV_RIGHT_DARK =
  "M428.693 204.646L571.477 347.43C593.415 369.368 628.983 369.368 650.921 347.43C672.858 325.493 672.858 289.925 650.921 267.987L554.235 171.302L661.273 64.2644C681.968 43.5691 681.968 10.0159 661.273 -10.6793C640.578 -31.3744 607.024 -31.375 586.329 -10.68L428.693 146.956C412.763 162.886 412.763 188.715 428.693 204.646Z";

/** Centrado · En Vivo — «Header — Centrado · En Vivo VOYAGER.svg». */
const STYLE_C_EN_VIVO: TipoStyle = {
  // paint0: #FF9639 → #EF852E(50%) → #BE3D00, eje (101.764,-179.326)→(701.554,161.044).
  bg: "linear-gradient(150deg,#FF9639 0%,#EF852E 50%,#BE3D00 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-179.326" x2="701.554" y2="161.044" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9639"/><stop offset="0.5" stop-color="#EF852E"/><stop offset="1" stop-color="#BE3D00"/></linearGradient>`,
  bgFallback: "#EF852E",
  // filter1_f #FF6A3D 0.35 (60,58) r100 · filter2_f #FF6A3D 0.35 (550,296) r100.
  glows: [
    { hex: "#FF6A3D", op: 0.35, x: 60, y: 58, r: 100 },
    { hex: "#FF6A3D", op: 0.35, x: 550, y: 296, r: 100 },
  ],
  ringsCx: 302,
  ringsCy: 8,
  dots: [],
  chevrons: [C_CHEV_RIGHT_ENVIVO, C_CHEV_LEFT],
  logoDy: 0,
  pill: "glass",
  pillBorder: C_PILL_BORDER_BRAND,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Centrado · Morado — «Header — Centrado · Morado VOYAGER.svg». */
const STYLE_C_MORADO: TipoStyle = {
  // paint0: #2E0F70 → #5F3ED8(50%) → #8460E5, eje (-180,238)→(204.705,645.334).
  bg: "linear-gradient(133deg,#2E0F70 0%,#5F3ED8 50%,#8460E5 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-180" y1="238" x2="204.705" y2="645.334" gradientUnits="userSpaceOnUse"><stop stop-color="#2E0F70"/><stop offset="0.5" stop-color="#5F3ED8"/><stop offset="1" stop-color="#8460E5"/></linearGradient>`,
  bgFallback: "#5F3ED8",
  // filter0_f #7A50E0 0.45 blur42.5 (50,220) r120 · filter1_f #AE8EFF 0.3 blur40 (530,40) r100.
  glows: [
    { hex: "#7A50E0", op: 0.45, x: 50, y: 220, r: 120 },
    { hex: "#AE8EFF", op: 0.3, x: 530, y: 40, r: 100 },
  ],
  ringsCx: 302,
  ringsCy: 8,
  dots: [],
  chevrons: [C_CHEV_RIGHT_MORADO, C_CHEV_LEFT],
  logoDy: 0,
  pill: "solid",
  // paint2 morado: #8776FF → white40%(38%) → #532BC7(68%) → #8776FF.
  pillBorder: C_PILL_BORDER,
  // paint1 morado: #8460E5 → #3B1782.
  pillFill: C_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Centrado · Negociable — «Header — Centrado · Negociable VOYAGER.svg». */
const STYLE_C_NEGOCIABLE: TipoStyle = {
  // paint0: #0FA38C → #2E7DA8(40%) → #5B3EC8(72%) → #340091, eje (-150,255)→(271.693,627.082).
  bg: "linear-gradient(139deg,#0FA38C 0%,#2E7DA8 40%,#5B3EC8 72%,#340091 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-150" y1="255" x2="271.693" y2="627.082" gradientUnits="userSpaceOnUse"><stop stop-color="#0FA38C"/><stop offset="0.4" stop-color="#2E7DA8"/><stop offset="0.72" stop-color="#5B3EC8"/><stop offset="1" stop-color="#340091"/></linearGradient>`,
  bgFallback: "#2E7DA8",
  // filter0_f #17C2A6 0.4 blur40 (40,230) r120 · filter1_f #8460E5 0.3 blur40 (530,40) r100.
  glows: [
    { hex: "#17C2A6", op: 0.4, x: 40, y: 230, r: 120 },
    { hex: "#8460E5", op: 0.3, x: 530, y: 40, r: 100 },
  ],
  ringsCx: 302,
  ringsCy: 8,
  dots: [],
  chevrons: [C_CHEV_LEFT], // Negociable centrado solo lleva la flecha izquierda.
  logoDy: 0,
  // Pill GLASS: paint2 white 10%→0% (cristal); color solo en el borde (paint3 morado).
  pill: "glass",
  pillBorder: C_PILL_BORDER,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Centrado · SubasCoins — «Header — Centrado · SubasCoins VOYAGER.svg». */
const STYLE_C_SUBASCOINS: TipoStyle = {
  // paint0: white → #F4AC59(22%) → #8460E5(74.5%) → white, eje (101.764,-179.326)→(701.554,161.044).
  bg: "linear-gradient(150deg,#FFFFFF 0%,#F4AC59 22%,#8460E5 74.5%,#FFFFFF 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-179.326" x2="701.554" y2="161.044" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.221154" stop-color="#F4AC59"/><stop offset="0.745192" stop-color="#8460E5"/><stop offset="1" stop-color="white"/></linearGradient>`,
  bgFallback: "#B58BC0",
  // filter0_f #FFC53D 0.45 blur40 (50,230) r120 · filter1_f #8460E5 0.3 blur40 (530,40) r100.
  glows: [
    { hex: "#FFC53D", op: 0.45, x: 50, y: 230, r: 120 },
    { hex: "#8460E5", op: 0.3, x: 530, y: 40, r: 100 },
  ],
  ringsCx: 302,
  ringsCy: 8,
  dots: [],
  chevrons: [C_CHEV_RIGHT_ENVIVO, C_CHEV_LEFT], // mismo eje que En Vivo: flecha der + izq.
  logoDy: 0,
  pill: "glass",
  pillBorder: C_PILL_BORDER,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Centrado · Dark — «Header — Centrado · Dark VOYAGER.svg». */
const STYLE_C_DARK: TipoStyle = {
  // paint0: #0E0524 → #1A0B3D(50%) → #2C165E, eje (-180,238)→(204.705,645.334).
  bg: "linear-gradient(133deg,#0E0524 0%,#1A0B3D 50%,#2C165E 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-180" y1="238" x2="204.705" y2="645.334" gradientUnits="userSpaceOnUse"><stop stop-color="#0E0524"/><stop offset="0.5" stop-color="#1A0B3D"/><stop offset="1" stop-color="#2C165E"/></linearGradient>`,
  bgFallback: "#1A0B3D",
  // filter0_f #6E4BD6 0.35 blur45 (550,50) r110 · filter1_f #3B1782 0.4 blur45 (50,250) r100.
  glows: [
    { hex: "#6E4BD6", op: 0.35, x: 550, y: 50, r: 110 },
    { hex: "#3B1782", op: 0.4, x: 50, y: 250, r: 100 },
  ],
  ringsCx: 302,
  ringsCy: 8,
  dots: [],
  chevrons: [C_CHEV_RIGHT_DARK, C_CHEV_LEFT],
  logoDy: 0,
  // Pill del Dark centrado: paint1 #8460E5→#3B1782 (sólida), borde morado.
  pill: "solid",
  pillBorder: C_PILL_BORDER,
  pillFill: C_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

// ─── Tonos APILADOS — «Header — Apilada · … VOYAGER.svg» (600×260) ───────────────
// Comparten: logo/pill/título/bajada apilados a la izquierda (x≈40); anillos a la
// derecha en (470,125); dots (454.5,94.5)/(562,177); pill border morada
// (59.4,114.4)→(112.8,171.6)≈47° / marca (60.4,113.4)→(103.9,171.2)≈53°; y el
// chevron relleno `>` que asoma por el borde derecho (opacidad por tono).

const S_DOTS: Array<[number, number, number, number]> = [
  [454.5, 94.5, 2.5, 0.6],
  [562, 177, 2, 0.6],
];
const S_PILL_BORDER = "linear-gradient(47deg,#8776FF 0%,rgba(255,255,255,0.4) 38%,#532BC7 68%,#8776FF 100%)";
const S_PILL_BORDER_BRAND = "linear-gradient(53deg,#FFFFFF 0%,#F4AC59 22.1%,#8460E5 74.5%,#FFFFFF 100%)";
const S_PILL_FILL = "linear-gradient(47deg,#8460E5 0%,#3B1782 100%)";

/** Apilada · En Vivo — «Header — Apilada · En Vivo VOYAGER.svg». */
const STYLE_S_EN_VIVO: TipoStyle = {
  // paint0: #FF9639 → #EF852E(50%) → #BE3D00, eje (101.764,-137.131)→(613.11,242.334).
  bg: "linear-gradient(143deg,#FF9639 0%,#EF852E 50%,#BE3D00 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-137.131" x2="613.11" y2="242.334" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9639"/><stop offset="0.5" stop-color="#EF852E"/><stop offset="1" stop-color="#BE3D00"/></linearGradient>`,
  bgFallback: "#EF852E",
  // filter3_f #FF3B4E 0.4 blur40 (-16,277) r100.
  glows: [{ hex: "#FF3B4E", op: 0.4, x: -16, y: 277, r: 100 }],
  ringsCx: 470,
  ringsCy: 125,
  dots: S_DOTS,
  chevronFillOpacity: 0.06,
  logoDy: 0,
  pill: "glass",
  pillBorder: S_PILL_BORDER_BRAND,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Apilada · Morado — «Header — Apilada · Morado VOYAGER.svg». */
const STYLE_S_MORADO: TipoStyle = {
  // paint0: #2E0F70 → #5F3ED8(50%) → #8460E5, eje (-180,182)→(99.7241,569.31).
  bg: "linear-gradient(133deg,#2E0F70 0%,#5F3ED8 50%,#8460E5 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-180" y1="182" x2="99.7241" y2="569.31" gradientUnits="userSpaceOnUse"><stop stop-color="#2E0F70"/><stop offset="0.5" stop-color="#5F3ED8"/><stop offset="1" stop-color="#8460E5"/></linearGradient>`,
  bgFallback: "#5F3ED8",
  // filter3_f #AE8EFF 0.35 blur42.5 (470,125) r120 · filter4_f #7A50E0 0.4 blur42.5 (40,220) r100.
  glows: [
    { hex: "#AE8EFF", op: 0.35, x: 470, y: 125, r: 120 },
    { hex: "#7A50E0", op: 0.4, x: 40, y: 220, r: 100 },
  ],
  ringsCx: 470,
  ringsCy: 125,
  dots: S_DOTS,
  chevronFillOpacity: 0.07,
  logoDy: 0,
  pill: "solid",
  pillBorder: S_PILL_BORDER,
  pillFill: S_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Apilada · Negociable — «Header — Apilada · Negociable VOYAGER.svg». */
const STYLE_S_NEGOCIABLE: TipoStyle = {
  // paint0: #0FA38C → #2E7DA8(40%) → #5B3EC8(72%) → #340091, eje (-150,195)→(171.701,566.193).
  bg: "linear-gradient(139deg,#0FA38C 0%,#2E7DA8 40%,#5B3EC8 72%,#340091 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-150" y1="195" x2="171.701" y2="566.193" gradientUnits="userSpaceOnUse"><stop stop-color="#0FA38C"/><stop offset="0.4" stop-color="#2E7DA8"/><stop offset="0.72" stop-color="#5B3EC8"/><stop offset="1" stop-color="#340091"/></linearGradient>`,
  bgFallback: "#2E7DA8",
  // filter0_f #8460E5 0.32 blur42.5 (470,126) r120 · filter1_f #17C2A6 0.4 blur40 (40,220) r100.
  glows: [
    { hex: "#8460E5", op: 0.32, x: 470, y: 126, r: 120 },
    { hex: "#17C2A6", op: 0.4, x: 40, y: 220, r: 100 },
  ],
  ringsCx: 470,
  ringsCy: 125,
  dots: S_DOTS,
  chevronFillOpacity: 0.06,
  logoDy: 0,
  pill: "glass",
  pillBorder: S_PILL_BORDER,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Apilada · SubasCoins — «Header — Apilada · SubasCoins VOYAGER.svg». */
const STYLE_S_SUBASCOINS: TipoStyle = {
  // paint0: white → #F4AC59(22%) → #8460E5(74.5%) → white, eje (101.764,-137.131)→(613.11,242.334).
  bg: "linear-gradient(143deg,#FFFFFF 0%,#F4AC59 22%,#8460E5 74.5%,#FFFFFF 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="101.764" y1="-137.131" x2="613.11" y2="242.334" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.221154" stop-color="#F4AC59"/><stop offset="0.745192" stop-color="#8460E5"/><stop offset="1" stop-color="white"/></linearGradient>`,
  bgFallback: "#B58BC0",
  // filter0_f #8460E5 0.3 blur42.5 (465,130) r120 · filter1_f #FFC53D 0.4 blur40 (40,220) r100.
  glows: [
    { hex: "#8460E5", op: 0.3, x: 465, y: 130, r: 120 },
    { hex: "#FFC53D", op: 0.4, x: 40, y: 220, r: 100 },
  ],
  ringsCx: 470,
  ringsCy: 125,
  dots: S_DOTS,
  chevronFillOpacity: 0.05,
  logoDy: 0,
  pill: "glass",
  pillBorder: S_PILL_BORDER,
  pillFill: "",
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

/** Apilada · Dark — «Header — Apilada · Dark VOYAGER.svg». */
const STYLE_S_DARK: TipoStyle = {
  // paint0: #0E0524 → #1A0B3D(50%) → #2C165E, eje (-180,182)→(99.7241,569.31).
  bg: "linear-gradient(133deg,#0E0524 0%,#1A0B3D 50%,#2C165E 100%)",
  bgSvgGradient: `<linearGradient id="tipoBg" x1="-180" y1="182" x2="99.7241" y2="569.31" gradientUnits="userSpaceOnUse"><stop stop-color="#0E0524"/><stop offset="0.5" stop-color="#1A0B3D"/><stop offset="1" stop-color="#2C165E"/></linearGradient>`,
  bgFallback: "#1A0B3D",
  // filter0_f #6E4BD6 0.35 blur45 (470,125) r110 · filter1_f #3B1782 0.4 blur45 (60,240) r100.
  glows: [
    { hex: "#6E4BD6", op: 0.35, x: 470, y: 125, r: 110 },
    { hex: "#3B1782", op: 0.4, x: 60, y: 240, r: 100 },
  ],
  ringsCx: 470,
  ringsCy: 125,
  ringsOpacityMul: 0.5, // el Apilada Dark pone los anillos al 50% (opacity 0.5 del SVG).
  dots: S_DOTS,
  chevronFillOpacity: 0.04,
  logoDy: 0,
  pill: "solid",
  pillBorder: S_PILL_BORDER,
  pillFill: S_PILL_FILL,
  pillShadow: "0 2px 5px rgba(32,0,104,0.5)",
};

// ─── Tonos (label + estilo por layout) y tipologías (layout + 5 tonos) ──────────

/** Un tono con su estilo para cada layout (izquierda, derecha, centrado, apilado). */
export interface TipoTone {
  id: string;
  label: string;
  left: TipoStyle;
  right: TipoStyle;
  center: TipoStyle;
  stack: TipoStyle;
}

/** Los 5 tonos, cada uno con su estilo izquierda, derecha, centrado y apilado. */
export const TONOS: TipoTone[] = [
  { id: "en-vivo", label: "En Vivo", left: STYLE_EN_VIVO, right: STYLE_R_EN_VIVO, center: STYLE_C_EN_VIVO, stack: STYLE_S_EN_VIVO },
  { id: "morado", label: "Morado", left: STYLE_MORADO, right: STYLE_R_MORADO, center: STYLE_C_MORADO, stack: STYLE_S_MORADO },
  { id: "negociable", label: "Negociable", left: STYLE_NEGOCIABLE, right: STYLE_R_NEGOCIABLE, center: STYLE_C_NEGOCIABLE, stack: STYLE_S_NEGOCIABLE },
  { id: "subascoins", label: "SubasCoins", left: STYLE_SUBASCOINS, right: STYLE_R_SUBASCOINS, center: STYLE_C_SUBASCOINS, stack: STYLE_S_SUBASCOINS },
  { id: "dark", label: "Dark", left: STYLE_DARK, right: STYLE_R_DARK, center: STYLE_C_DARK, stack: STYLE_S_DARK },
];

/** Una tipología = un LAYOUT (composición marca↔copy). */
export interface TipoLayoutDef {
  id: string;
  letra: string;
  label: string;
  descripcion: string;
  layout: TipoLayout;
}

/** Las 2 tipologías de layout. Cada una se ve sobre los 5 tonos (tab). */
export const TIPOLOGIAS_LAYOUT: TipoLayoutDef[] = [
  {
    id: "texto-izquierda",
    letra: "01",
    label: "Texto a la izquierda",
    descripcion:
      "Copy a la izquierda (pill + título + bajada) y la marca a la derecha, con anillos concéntricos tras el logo.",
    layout: "text-left",
  },
  {
    id: "texto-derecha",
    letra: "02",
    label: "Texto a la derecha",
    descripcion:
      "Espejo del anterior: la marca abre a la izquierda y el copy (pill + título + bajada) se lee a la derecha.",
    layout: "text-right",
  },
  {
    id: "texto-centrado",
    letra: "03",
    label: "Texto centrado",
    descripcion:
      "Composición vertical centrada (600×340): logo arriba, pill al medio, y título + bajada centrados debajo.",
    layout: "centered",
  },
  {
    id: "texto-apilado",
    letra: "04",
    label: "Texto apilado",
    descripcion:
      "Composición apilada a la izquierda (600×260): logo, pill, título y bajada en columna, con los anillos a la derecha.",
    layout: "stacked",
  },
];

/** Construye el banner de un tono para un layout dado. */
export function buildBanner(layout: TipoLayoutDef, tone: TipoTone): string {
  const style =
    layout.layout === "centered"
      ? tone.center
      : layout.layout === "stacked"
        ? tone.stack
        : layout.layout === "text-right"
          ? tone.right
          : tone.left;
  return buildTipoNewBanner({
    id: `${layout.id}-${tone.id}`,
    letra: layout.letra,
    label: `${layout.label} · ${tone.label}`,
    descripcion: layout.descripcion,
    layout: layout.layout,
    style,
  });
}
