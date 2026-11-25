/**
 * Campaña «Valoriza y Vende» — 6 boletines, uno por tema:
 *   1. Antes de comprar, valoriza          4. ¿Sabes que puedes valorizar y luego publicar?
 *   2. Antes de vender, valoriza           5. ¡Un nuevo canal de venta para ti!
 *   3. ¿Por qué es bueno valorizar?        6. ¿Sabías que ahora puedes vender en VMC?
 *
 * DESIGN SYSTEM VMC (../vmc-index-lab): tokens de @vmc/concorde-adapter, Button
 * primario Concorde, tarjeta de campaña (HomeCampaignBanner / anuncio «Valoriza tu
 * auto en VMC»), filas del Index, cards tipo OfferCard e íconos de vidrio esmerilado
 * (Vidrio.tsx) exportados a PNG 3x — Gmail no muestra SVG.
 *
 * COPY: una idea por correo, CTA corto sin flecha, P.D. al cierre. Regla de Stage 1:
 * la valorización es un valor REFERENCIAL con fecha, nunca un precio fijo de venta.
 *
 * Técnica: footer/legal reusan la plantilla glass (glassNegociableEmail); el cuerpo
 * es HTML propio que entra por un marcador. Sin animaciones: HTML de correo estático.
 */

import type { Section } from '../prodEmailTemplates';
import type { EmailTemplate } from '../prodEmails';
import { glassNegociableEmail } from './glassNegociable';

// ponytail: placeholders hasta tener las URLs reales (ver PENDIENTES en revisionStatus.ts)
const VALORIZA_URL = 'https://www.vmcsubastas.com/zona/valorizar';
const PUBLICAR_URL = 'https://www.vmcsubastas.com/login?redirect_after_to=/zona';
const PUBLICAR_DIRECTO_URL = 'https://www.vmcsubastas.com/zona/publicar';

const CATEGORIA = 'Campaña Valoriza';

// Dominio de producción que sirve los assets de la campaña en los emails.
// En un deploy de Vercel los assets se sirven desde el propio sitio (public/), así las fotos nuevas
// nunca apuntan a un dominio que no las tiene; fuera de Vercel se mantiene el dominio de revisión.
const CDN = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://concorde-v2-theta.vercel.app';
// En la revisión local los assets viven en /public; en producción conservan su CDN.
const ASSET_ORIGIN = process.env.NODE_ENV === 'development' ? '' : CDN;
const IMG = `${ASSET_ORIGIN}/correos/campana-valoriza`;
const LOGO = `${ASSET_ORIGIN}/logo-vmc@3x.png`; // blanco

const F = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
const DS = {
  ink: '#191c1c', muted: '#667085', v500: '#8460e5', v700: '#3b1782',
  v900: '#22005c', orange: '#ed8936', divider: '#e8ddff', lav: '#f5f0ff',
};
const DS_SHADOW = '0 0 16px 4px rgba(32,0,104,0.10)';

// ─── primitivas ──────────────────────────────────────────────────────────────
const T = (attrs = '') => `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" ${attrs}>`;
const row = (inner: string, pad = '0 16px') => `<tr><td style="padding:${pad};">${inner}</td></tr>`;
export const gap = (h: number) => `<tr><td height="${h}" style="height:${h}px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
const logo = (w: number) => `<img src="${LOGO}" width="${w}" alt="vmc Subastas" border="0" style="display:block;width:${w}px;height:auto;">`;

export type Icono = 'compras' | 'vender' | 'billetera' | 'auto' | 'valorizaciones' | 'docs' | 'km' | 'verificado' | 'fecha' | 'publicar' | 'precio' | 'negociaciones' | 'crecimiento';
const icon = (s: Icono, px = 44) => `<img src="${IMG}/iconos/${s}.png" width="${px}" height="${px}" alt="" border="0" style="display:block;width:${px}px;height:${px}px;">`;

// ─── piezas del design system ────────────────────────────────────────────────

/** Botón primario Concorde: naranja→violeta, borde degradado (estático). */
function button(text: string, url: string): string {
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius:9999px;box-shadow:0 2px 6px rgba(237,137,54,0.30),0 12px 28px rgba(132,96,229,0.26);"><tr>
<td bgcolor="#fbc47d" style="padding:2px;border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%);">
<a class="ds-cta" href="${url}" target="_blank" style="display:inline-block;padding:16px 40px;white-space:nowrap;border-radius:9999px;background-color:${DS.orange};background-image:linear-gradient(rgba(255,255,255,0.17) 0%,rgba(255,255,255,0) 55%),linear-gradient(135deg,#ed8936 0%,#ed8936 40%,#8460e5 100%);font-family:${F};font-size:17px;line-height:22px;font-weight:700;letter-spacing:-0.01em;color:#ffffff;text-decoration:none;text-shadow:0 1px 3px rgba(0,0,0,0.25);">${text}</a>
</td></tr></table>`;
}

/** CTA reducido para el cierre gráfico: acompaña el mensaje, no compite con él. */
function buttonCompact(text: string, url: string): string {
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius:9999px;box-shadow:0 4px 12px rgba(76,31,146,0.20);"><tr>
<td bgcolor="#fbc47d" style="padding:1px;border-radius:9999px;background-image:linear-gradient(135deg,#ffffff 0%,#fbc47d 26%,#ae8eff 74%,#ffffff 100%);">
<a href="${url}" target="_blank" style="display:inline-block;padding:10px 20px;white-space:nowrap;border-radius:9999px;background-color:${DS.orange};background-image:linear-gradient(135deg,#ed8936 0%,#ed8936 40%,#8460e5 100%);font-family:${F};font-size:13px;line-height:18px;font-weight:800;letter-spacing:-0.01em;color:#ffffff;text-decoration:none;text-shadow:0 1px 2px rgba(0,0,0,0.20);">${text}</a>
</td></tr></table>`;
}

/** Palabra clave del título en naranja de marca. */
export const acc = (t: string) => `<span style="color:${DS.orange};">${t}</span>`;

/**
 * Hero póster («efecto profundidad»): palabra gigante DETRÁS de las personas y la
 * foto fundida hacia abajo en el morado de marca, donde sigue el texto vivo.
 * El efecto está horneado en la imagen (hero/valoriza-N.jpg, recortes de Abraham +
 * ~/Desktop/recortes-valoriza/poster.py), así que se ve igual en Gmail, Apple Mail y Outlook.
 */
type HeroOpts = { img: string; alt: string; eyebrow?: string; title: string; text: string; cta: string; url: string; perks?: [string, string, string]; titleSize?: number; titleLineHeight?: number; titleLetterSpacing?: string; titleLong?: boolean; imgM?: string; bg?: string; layout?: 'left' | 'center' };
export function hero(o: HeroOpts): string {
  const imgStyle = 'display:block;width:100%;max-width:100%;height:auto;border-radius:24px 24px 0 0;';
  const url = (f: string) => (f.includes('/') ? f : `${IMG}/hero/${f}`); // Revendedores pasa rutas completas
  const bg = o.bg ?? DS.v900; // bg = color al que funde la foto del hero (Revendedores: uno por foto)
  const [r, g, bl] = [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16)); // sombra del mismo tono que la tarjeta
  // imgM: recorte móvil (≤480 px) centrado en persona + carro; Outlook (mso) nunca lo ve y se queda con el de escritorio.
  const mob = o.imgM ? `<!--[if !mso]><!--><div class="ds-hero-m" style="display:none;max-height:0;overflow:hidden;mso-hide:all;"><img src="${url(o.imgM)}" alt="${o.alt}" width="600" border="0" style="${imgStyle}"></div><!--<![endif]-->` : '';
  // layout: left = original; center = póster centrado (texto y CTA centrados, como la foto).
  const c = o.layout === 'center'; const al = c ? 'center' : 'left';
  const eyebrow = o.eyebrow ? `<span style="font-family:${F};font-size:11px;line-height:14px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${DS.orange};">${o.eyebrow}</span>` : '';
  const head = c
    ? `<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${logo(68)}</td></tr>${eyebrow ? `<tr><td align="center" style="padding-top:12px;">${eyebrow}</td></tr>` : ''}</table>`
    : `${T()}<tr><td valign="middle">${logo(68)}</td>${eyebrow ? `<td align="right" valign="middle">${eyebrow}</td>` : ''}</tr></table>`;
  const copy = `${head}
<h1 class="ds-h1${o.titleLong ? ' ds-h1-l' : ''}" style="margin:18px 0 0;font-family:${F};font-size:${o.titleSize ?? 38}px;line-height:${o.titleLineHeight ?? 42}px;font-weight:800;letter-spacing:${o.titleLetterSpacing ?? "-0.04em"};color:#ffffff;text-align:${al};">${o.title}</h1>
<p style="margin:14px 0 24px;font-size:17px;line-height:26px;color:#e8ddff;text-align:${al};">${o.text}</p>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="${al}"><tr><td>${button(o.cta, o.url)}</td></tr></table>
${o.perks ? `<p style="clear:both;margin:0;padding-top:16px;font-size:13px;line-height:18px;font-weight:600;color:#cfbaff;text-align:${al};">${o.perks.join(' &nbsp;·&nbsp; ')}</p>` : ''}`;
  const body = `<td class="ds-hero-copy" style="padding:4px 32px 32px;font-family:${F};">${copy}</td>`;
  return `${T(`bgcolor="${bg}" style="border-radius:24px;background-color:${bg};box-shadow:0 18px 40px rgba(${r},${g},${bl},0.28);"`)}
<tr><td style="font-size:0;line-height:0;border-radius:24px 24px 0 0;overflow:hidden;"><img${o.imgM ? ' class="ds-hero-d"' : ''} src="${url(o.img)}" alt="${o.alt}" width="600" border="0" style="${imgStyle}">${mob}</td></tr>
<tr>${body}</tr></table>`;
}

/** Cierre: tarjeta lavanda centrada con ícono grande, título y CTA. */
export function closing(ic: Icono, head: string, text: string, label: string, url: string): string {
  return row(`${T(`bgcolor="${DS.lav}" style="border-radius:24px;background-image:linear-gradient(180deg,#f5f0ff 0%,#ffffff 100%);border:1px solid ${DS.divider};"`)}<tr><td align="center" style="padding:30px 24px 32px;font-family:${F};">
<div style="display:inline-block;">${icon(ic, 64)}</div>
<h2 style="margin:14px 0 0;font-family:${F};font-size:24px;line-height:30px;font-weight:800;letter-spacing:-0.025em;color:${DS.v700};">${head}</h2>
<p style="margin:8px 0 22px;font-size:15px;line-height:22px;color:${DS.muted};">${text}</p>
${T()}<tr><td align="center">${button(label, url)}</td></tr></table>
</td></tr></table>`);
}

/** Cierre gráfico compacto para Valoriza 2: venta y valorización en una sola pieza. */
function closingVentaBanner(): string {
  const image = `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/banner/valoriza-2-cierre-corolla-casual.png`;
  return row(`${T(`bgcolor="#f5f0ff" style="border-radius:20px;border-collapse:separate;background-color:#f5f0ff;box-shadow:0 12px 26px rgba(72,35,132,0.12);"`)}<tr>
<td background="${image}" style="padding:24px 18px 22px;border-radius:20px;overflow:hidden;font-family:${F};background-image:url('${image}');background-repeat:no-repeat;background-position:center;background-size:cover;">
${T()}<tr>
<td width="48%" valign="top" style="padding:0 0 0 4px;font-family:${F};">
<p style="display:inline-block;margin:0 0 9px;padding:4px 10px;border:1px solid rgba(255,255,255,0.56);border-radius:9999px;background-color:rgba(255,255,255,0.16);background-image:linear-gradient(180deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.08) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.34);font-size:11px;line-height:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;">¡Valoriza en VMC!</p>
<h2 style="margin:0;font-family:${F};font-size:24px;line-height:28px;font-weight:800;letter-spacing:-0.035em;color:#ffffff;text-shadow:0 2px 5px rgba(20,0,70,0.38);">Dale a tu vehículo el <span style="color:${DS.orange};">precio que se merece</span></h2>
<div style="margin-top:14px;">${buttonCompact('¡Valoriza y publica ahora!', PUBLICAR_DIRECTO_URL)}</div>
</td>
<td width="52%" style="font-size:0;line-height:0;">&nbsp;</td>
</tr></table>
</td>
</tr></table>`, '0 16px');
}

/** Cierre de Valoriza 4: lleva la valorización directamente a la publicación. */
function closingPublicaConVentajaBanner(): string {
  const image = `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/banner/valoriza-4-cierre-mujer-seminuevo.png`;
  return row(`${T(`bgcolor="#f5f0ff" style="border-radius:20px;border-collapse:separate;background-color:#f5f0ff;box-shadow:0 12px 26px rgba(72,35,132,0.12);"`)}<tr>
<td background="${image}" style="padding:24px 18px 22px;border-radius:20px;overflow:hidden;font-family:${F};background-image:url('${image}');background-repeat:no-repeat;background-position:center;background-size:cover;">
${T()}<tr>
<td width="48%" valign="top" style="padding:0 0 0 4px;font-family:${F};">
<p style="display:inline-block;margin:0 0 9px;padding:4px 10px;border:1px solid rgba(255,255,255,0.56);border-radius:9999px;background-color:rgba(255,255,255,0.16);background-image:linear-gradient(180deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.08) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.34);font-size:11px;line-height:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;">Decide con información</p>
<h2 style="margin:0;font-family:${F};font-size:24px;line-height:28px;font-weight:800;letter-spacing:-0.035em;color:#ffffff;text-shadow:0 2px 5px rgba(20,0,70,0.38);">Tu próxima gran venta<br><span style="color:${DS.orange};">está a un paso</span></h2>
<div style="margin-top:14px;">${buttonCompact('¡Valoriza y publica ahora!', PUBLICAR_DIRECTO_URL)}</div>
</td>
<td width="52%" style="font-size:0;line-height:0;">&nbsp;</td>
</tr></table>
</td>
</tr></table>`, '0 16px');
}

/** Cierre gráfico de compra: refuerza el precio justo antes de ofertar. */
function closingCompraBanner(): string {
  const image = `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/banner/valoriza-1-cierre-compra.png`;
  return row(`${T(`bgcolor="#f5f0ff" style="border-radius:20px;border-collapse:separate;background-color:#f5f0ff;box-shadow:0 12px 26px rgba(72,35,132,0.12);"`)}<tr>
<td background="${image}" style="padding:24px 18px 22px;border-radius:20px;overflow:hidden;font-family:${F};background-image:url('${image}');background-repeat:no-repeat;background-position:center top;background-size:cover;">
${T()}<tr>
<td width="48%" valign="top" style="padding:0 0 0 4px;font-family:${F};">
<p style="display:inline-block;margin:0 0 9px;padding:4px 10px;border:1px solid rgba(255,255,255,0.56);border-radius:9999px;background-color:rgba(255,255,255,0.16);background-image:linear-gradient(180deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.08) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.34);font-size:11px;line-height:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;">¡Compra con información!</p>
<h2 style="margin:0;font-family:${F};font-size:20px;line-height:23px;font-weight:800;letter-spacing:-0.035em;color:#ffffff;text-shadow:0 2px 5px rgba(20,0,70,0.38);">El vehículo que deseas,<br><span style="color:${DS.orange};">al precio justo</span></h2>
<div style="margin-top:14px;">${buttonCompact('¡Valoriza ahora!', VALORIZA_URL)}</div>
</td>
<td width="52%" style="font-size:0;line-height:0;">&nbsp;</td>
</tr></table>
</td>
</tr></table>`, '0 16px');
}

export const p = (html: string, o: { size?: number; color?: string; align?: string } = {}) =>
  row(`<p style="margin:0;font-family:${F};font-size:${o.size ?? 16}px;line-height:${(o.size ?? 16) < 15 ? 21 : 25}px;color:${o.color ?? DS.ink};text-align:${o.align ?? 'left'};">${html}</p>`, '0 28px');
export const b = (t: string) => `<b style="color:${DS.v700};">${t}</b>`;
export const HOLA = p('Hola {{Nombre usuario.Ejem: Gabriel Bruno}},');

/**
 * Celular con una pantalla REAL de VMC (capturas del flujo, cel/*.png) junto a la lista:
 * el producto se ve, no se describe. En móvil el celular queda arriba, centrado.
 */
export function cel(img: string, alt: string, kicker: string, head: string, items: [Icono, string, string][]): string {
  const li = items.map(([ic, t, d], i) => `<tr><td style="padding:${i ? 14 : 0}px 0 0;">${T()}<tr>
<td width="44" valign="top"><div style="display:inline-block;padding:4px;border-radius:12px;background-color:${DS.lav};">${icon(ic, 32)}</div></td>
<td valign="top" style="padding-left:12px;font-family:${F};"><div style="font-size:15px;line-height:20px;font-weight:800;color:${DS.v700};">${t}</div><div style="margin-top:2px;font-size:14px;line-height:20px;color:${DS.muted};">${d}</div></td>
</tr></table></td></tr>`).join('');
  return row(`${T(`bgcolor="${DS.lav}" style="border-radius:24px;background-image:linear-gradient(135deg,#f5f0ff 0%,#ffffff 70%);border:1px solid ${DS.divider};"`)}<tr>
<td class="ds-stack ds-cel" width="46%" align="center" valign="middle" style="padding:20px 0 12px 12px;"><img src="${img.includes('/') ? img : `${IMG}/cel/${img}`}" alt="${alt}" width="230" border="0" style="display:block;width:230px;max-width:100%;height:auto;margin:0 auto;"></td>
<td class="ds-stack ds-cel-copy" width="54%" valign="middle" style="padding:24px 24px 24px 8px;font-family:${F};">
${kicker ? `<p style="margin:0;font-size:12px;line-height:16px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${DS.orange};">${kicker}</p>` : ''}
<h2 style="margin:6px 0 18px;font-family:${F};font-size:22px;line-height:28px;font-weight:800;letter-spacing:-0.02em;color:${DS.v700};">${head}</h2>
${T()}${li}</table>
</td></tr></table>`, '0 16px');
}

/** Tira de 3 celulares: el recorrido completo en pantallas reales, paso a paso. */
export function cels(items: [string, string, string, string][]): string {
  const c = items.map(([img, alt, t, d], i) => `<td width="33%" align="center" valign="top" style="padding:0 4px;font-family:${F};">
<img src="${img.includes('/') ? img : `${IMG}/cel/${img}`}" alt="${alt}" width="176" border="0" style="display:block;width:100%;max-width:176px;height:auto;margin:0 auto;">
<div style="margin-top:6px;font-size:11px;line-height:14px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${DS.orange};">Paso ${i + 1}</div>
<div style="margin-top:3px;font-size:16px;line-height:21px;font-weight:800;color:${DS.v700};">${t}</div>
<div style="margin-top:3px;font-size:13px;line-height:18px;color:${DS.muted};">${d}</div></td>`).join('');
  return row(`${T()}<tr>${c}</tr></table>`, '0 12px');
}

/** Nota referencial: ícono de fecha + texto, en lavanda. */
export const note = (html: string) => row(`${T(`bgcolor="${DS.lav}" style="border-radius:14px;"`)}<tr><td width="52" valign="middle" style="padding:14px 0 14px 16px;">${icon('fecha', 36)}</td><td valign="middle" style="padding:14px 18px 14px 12px;font-family:${F};font-size:14px;line-height:21px;color:${DS.v700};">${html}</td></tr></table>`, '0 28px');
const REF = 'Es un <b>valor referencial con fecha</b>: te dice cuánto vale hoy para que decidas con datos. No es un precio fijo de venta.';

/** Dos cards tipo OfferCard: mismo auto, distinto estado y recorrido. */
function compare(cards: { tag: string; chips: string[]; value: string; pct: number; high: boolean; image: string; alt: string }[]): string {
  const card = (c: (typeof cards)[number]) => `<td class="ds-stack" width="48%" valign="top" bgcolor="#ffffff" style="border-radius:20px;border:1px solid ${DS.divider};box-shadow:${DS_SHADOW};">
<img src="${IMG}/${c.image}" alt="${c.alt}" width="260" border="0" style="display:block;width:100%;height:auto;border-radius:20px 20px 0 0;">
<div style="padding:16px 16px 20px;font-family:${F};">
<span style="display:inline-block;border-radius:9999px;padding:4px 12px;background-color:${c.high ? DS.v700 : DS.orange};font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;">${c.tag}</span>
<div style="margin-top:10px;font-size:17px;line-height:22px;font-weight:800;letter-spacing:-0.01em;color:${DS.v700};">2018 · Mismo modelo</div>
<div style="margin-top:8px;">${c.chips.map((x) => `<span style="display:inline-block;margin:0 4px 6px 0;border-radius:9999px;padding:3px 10px;background-color:#f2f4f7;font-size:12px;line-height:16px;color:${DS.muted};">${x}</span>`).join('')}</div>
<div style="margin-top:10px;font-size:11px;line-height:14px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${DS.muted};">Valor referencial</div>
<div style="margin-top:2px;font-size:24px;line-height:30px;font-weight:800;letter-spacing:-0.02em;color:${c.high ? DS.v700 : DS.orange};">${c.value}</div>
<div style="margin-top:10px;height:8px;border-radius:9999px;background-color:#eef0f3;font-size:0;line-height:0;"><div style="width:${c.pct}%;height:8px;border-radius:9999px;background-color:${DS.orange};background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 100%);">&nbsp;</div></div>
</div></td>`;
  return row(`${T()}<tr>${card(cards[0])}<td class="ds-stack" width="4%" style="font-size:0;">&nbsp;</td>${card(cards[1])}</tr></table>`, '0 16px');
}

export const ps = (html: string) => p(`<b style="color:${DS.v500};">P.D.</b> ${html}`, { size: 14, color: DS.muted });
export const link = (text: string, url: string) => p(`<a href="${url}" target="_blank" style="font-weight:700;color:${DS.v500};text-decoration:underline;">${text}</a>`, { size: 14, align: 'center', color: DS.muted });

// ─── movimiento + responsive (cada <style> aparte: si un cliente descarta uno, no se lleva el otro) ──
const RESPONSIVE = `<style>
@media only screen and (max-width:480px){
table[width="600"],td[width="600"]{width:100%!important;box-sizing:border-box}
.ds-hero-copy{padding:4px 22px 28px!important}
.ds-stack{display:block!important;width:100%!important;box-sizing:border-box}
.ds-cta{padding:14px 18px!important;font-size:15px!important;white-space:normal!important;text-align:center}
.ds-cel{padding:24px 0 0!important}
.ds-cel-copy{padding:16px 24px 26px!important}
.ds-sale-copy{display:block!important;width:auto!important;padding:22px!important}
.ds-sale-visual{display:none!important}
td.ds-stack[width="4%"]{height:14px!important}
.ds-h1{font-size:30px!important;line-height:34px!important}
.ds-h1-l{font-size:23px!important;line-height:28px!important}
.ds-hero-d{display:none!important}
.ds-hero-m{display:block!important;max-height:none!important;overflow:visible!important}
}
</style>`;

// ─── armado ──────────────────────────────────────────────────────────────────
const MARK = 'VMCVALORIZABODYMARK';

export interface Def {
  id: string; name: string; subject: string; preheader: string; stage: string;
  leadsTo?: string[]; hero: string; body: string[];
}

export function build(d: Def): string {
  const marker: Section = { id: 'body', type: 'text', content: { text: MARK } };
  const body = [gap(28), ...d.body, gap(36)].join('\n');
  const html = glassNegociableEmail([marker], d.subject, d.preheader, d.hero)
    .replace('</head>', `${RESPONSIVE}\n</head>`)
    .replace(new RegExp(`<tr><td[^>]*>${MARK}</td></tr>`), body);
  // Destino vigente, verificado en el footer de VMC y en SubasBlog (12/11/2026).
  return ['valoriza-1-antes-de-comprar', 'valoriza-2-antes-de-vender', 'valoriza-4-valorizar-y-publicar'].includes(d.id)
    ? html.replaceAll('https://blog.subascars.com/', 'https://blog.vmcsubastas.com/')
      .replaceAll(`${IMG}/cel/resultado.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/cel/resultado-avt-verificado.png`)
      .replaceAll(`${IMG}/cel/formulario.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/cel/formulario-avt-verificado.png`)
      .replaceAll(`${IMG}/cel/propuestas.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/cel/propuestas-avt-ilustrativas.png`)
    : html;
}

// Heros finales (dueño + Julio 25/11): foto Flow centrada con frase grande horneada + copy centrado; -m = recorte ≤480 px.
// Imágenes: ~/Downloads/ss-silvana/v3/armar.py final.
const HERO_OPTS_3: HeroOpts = { img: 'valoriza-3-hero.jpg', imgM: 'valoriza-3-hero-m.jpg', layout: 'center', alt: '¡Valorizar es clave! — Persona junto a su auto y un velocímetro', eyebrow: '¿Por qué valorizar?', title: `¿Adivinas ${acc('o inviertes?')}`, perks: ['Recorrido', 'Estado', 'Mantenimiento'], text: 'El mercado real se mueve con datos. Con el AVT conoce cuánto vale un vehículo hoy y decide con información.', cta: 'Valoriza tu auto aquí', url: VALORIZA_URL };
const HERO_OPTS_7: HeroOpts = { img: 'valoriza-7-hero.jpg', imgM: 'valoriza-7-hero-m.jpg', layout: 'center', alt: '¿A cuánto? — Vendedora junto a su sedán revisando propuestas en el celular', eyebrow: 'Vende con información', title: `El secreto para cerrar ventas más rápido ${acc('en VMC Subastas')}`, text: 'Deja de adivinar el valor de tu activo. Con la Valorización Referencial AVT, configura tu publicación con una referencia clara y atrae postores serios desde el primer minuto.', cta: '¡Valoriza tu carro hoy!', url: VALORIZA_URL };

// ─── LOS 6 BOLETINES ─────────────────────────────────────────────────────────
/*
 * COPY CON ENFOQUE DE VENTA (pedido de Julio). Palancas, todas sobre hechos reales del producto:
 *  · Aversión a la pérdida: «no pagues de más», «plata sobre la mesa», «mañana vale menos».
 *  · FOMO honesto: otros compradores también proponen; miles de compradores ya están en VMC.
 *  · Presuposición y futuro: «cuando envíes tu próxima propuesta, ya sabrás…».
 *  · Especificidad: «1 minuto» (lo dice el formulario), gratis, sin compromiso.
 *  · CTA en primera persona: «Quiero saber cuánto vale».
 * Límite (Stage 1): la valorización es REFERENCIAL y con fecha; nada de precios prometidos
 * ni urgencias inventadas (sin plazos ni cupos falsos).
 */
const DEFS: Def[] = [
  {
    id: 'valoriza-1-antes-de-comprar',
    name: 'Valoriza 1 — antes de comprar, valoriza',
    subject: '¿Vas a pagar de más por ese vehículo?',
    preheader: 'Compara el precio pedido con un valor estimado de referencia. Gratis.',
    stage: 'Valoriza', leadsTo: ['valoriza-2-antes-de-vender'],
    hero: hero({ img: 'valoriza-1-precio-justo-v6.png', alt: 'Comprador y vendedora de un vehículo, junto al mensaje Tu decisión merece el precio justo', title: `¡Espera! Podrías estar ${acc('pagando de más')} por ese vehículo`, text: 'Antes de hacer una propuesta, compara el precio pedido con un valor estimado de referencia. Valoriza gratis y decide con más información.', cta: 'Quiero saber cuánto vale', url: VALORIZA_URL }).replace(`${IMG}/hero/valoriza-1-precio-justo-v6.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/hero/valoriza-1-precio-justo-v6.png`),
    body: [
      p(b('Hola {{Nombre usuario.Ejem: Gabriel Bruno}},')), gap(8),
      p(`Encontrar un vehículo que te interesa es solo el inicio. Antes de hacer una propuesta, ${b('compara el precio pedido con un valor estimado de referencia')}. Así tendrás un punto de partida para evaluar tu propuesta.`),
      gap(16),
      p(`Con ${b('AVT, el valorizador gratuito de VMC Subastas')}, obtén una estimación del valor del vehículo que te interesa en pocos pasos. Evalúa la propuesta con más información antes de decidir.`),
      gap(28), cel('resultado.png', 'Pantalla de resultado de una valorización en VMC', 'Tu ventaja', 'Los números, en la palma de tu mano', [['precio', 'Propón con números', 'Tu propuesta parte de un valor de referencia, no de una corazonada.'], ['compras', 'Compara el precio', 'Contrasta el precio pedido con un valor estimado de referencia.'], ['negociaciones', 'Evalúa tu siguiente paso', 'Si llega una contrapropuesta, tendrás una referencia más para decidir.']]),
      gap(12), p('Recreación ilustrativa basada en una consulta AVT de ejemplo. La estimación y la proyección son referenciales; no garantizan un precio de venta.', { size: 12, color: DS.muted }),
      gap(32), closingCompraBanner(),
    ],
  },
  {
    id: 'valoriza-2-antes-de-vender',
    name: 'Valoriza 2 — antes de vender, valoriza',
    subject: '¿Cuánta plata estás dejando sobre la mesa?',
    preheader: 'Si no sabes cuánto vale tu auto, alguien más lo decide por ti.',
    stage: 'Valoriza', leadsTo: ['valoriza-3-por-que-valorizar'],
    hero: hero({ img: 'valoriza-2-texto-v3.png', alt: '¡Antes de vender, valoriza! — Mujer con la llave de su vehículo, lista para vender', title: `¿Y si estás ofreciendo tu vehículo <span style="color:${DS.orange};">por menos de lo que vale?</span>`, text: '¡Cada dólar cuenta! Valoriza tu vehículo gratis y conoce su valor estimado antes de definir tu expectativa de venta.', cta: '¡Quiero valorizar GRATIS!', url: VALORIZA_URL }).replace(`${IMG}/hero/valoriza-2-texto-v3.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/hero/valoriza-2-texto-v3.png`),
    body: [
      p(b('Hola {{Nombre usuario.Ejem: Gabriel Bruno}},')), gap(8),
      p(`Seguro te ha pasado que cuando quieres vender tu vehículo, te surge una duda: ${b('¿y si estoy pidiendo menos de lo que vale?')} El año, el kilometraje y sus características pueden hacer que su valor sea distinto al de otros vehículos similares.`),
      gap(16),
      p(`Con ${b('AVT, el valorizador gratuito de VMC Subastas')}, obtén una referencia para definir tu expectativa de venta y dar el siguiente paso con más información, en pocos pasos.`),
      gap(28), cel('resultado.png', 'Pantalla de resultado de una valorización en VMC, con el botón Publicar', 'En pocos pasos', 'Esto es lo que vas a descubrir', [['valorizaciones', 'Su valor de hoy', 'Una estimación según los datos de tu vehículo.'], ['crecimiento', 'Tu referencia para decidir', 'Un punto de partida para definir tu expectativa de venta.'], ['vender', 'Tu siguiente paso', 'Guarda tu valorización y publica cuando estés listo.']]),
      gap(12), p('Recreación ilustrativa basada en una consulta AVT de ejemplo. La estimación y la proyección son referenciales; no garantizan un precio de venta.', { size: 12, color: DS.muted }),
      gap(32), closingVentaBanner(),
      gap(12), p('Montos y propuestas ilustrativos. Publicar no garantiza recibir propuestas ni concretar una venta.', { size: 12, color: DS.muted }),
    ],
  },
  {
    id: 'valoriza-3-por-que-valorizar',
    name: 'Valoriza 3 — ¿por qué es bueno valorizar?',
    subject: '¿Adivinas o inviertes? Domina los precios con el AVT',
    preheader: 'Conoce cuánto vale un vehículo hoy y decide con datos.',
    stage: 'Valoriza', leadsTo: ['valoriza-4-valorizar-y-publicar'],
    hero: hero(HERO_OPTS_3),
    body: [
      HOLA, gap(8),
      p(`El mayor error en las negociaciones es asumir precios. ${b('El mercado real se mueve con datos.')}`),
      gap(16),
      p(`Para darte una ventaja al decidir, la ${b('Valorización Referencial AVT')} te dice cuánto vale un vehículo hoy.`),
      gap(22),
      compare([
        { tag: 'Auto A', chips: ['45,000 km', 'Mantenimiento al día', 'Sin choques'], value: 'Más alto', pct: 86, high: true, image: 'yaris-2018-seminuevo-front-v2.png', alt: 'Hatchback blanco 2018 seminuevo usado, vista frontal' },
        { tag: 'Auto B', chips: ['140,000 km', 'Sin historial', 'Golpes por reparar'], value: 'Más bajo', pct: 46, high: false, image: 'yaris-2018-seminuevo-rear-workshop.png', alt: 'Hatchback gris 2018 seminuevo usado, vista posterior junto a un taller' },
      ]),
      gap(28), cel('formulario.png', 'Formulario de valorización de VMC con año y kilómetros', 'Decide con datos', 'El AVT te da una referencia para negociar', [['km', 'Si vas a vender', 'Un precio aterrizado atrae más ofertas, más rápido.'], ['verificado', 'Cierre perfecto', 'Fija un precio “Gana Ya” estratégico e irresistible.'], ['fecha', 'Si vas a comprar', 'Conoce el valor real y define tu límite máximo para no pagar de más.']]),
      gap(32), closing('km', '¿Cuánto vale hoy?', 'Valoriza tu auto y decide con una referencia clara.', 'Valoriza tu auto aquí', VALORIZA_URL),
      gap(24), ps('Tener el AVT en tu pantalla te da la seguridad para decidir al instante.'),
    ],
  },
  {
    id: 'valoriza-4-valorizar-y-publicar',
    name: 'Valoriza 4 — valorizar y luego publicar',
    subject: 'Valoriza tu vehículo y publícalo con ventaja',
    preheader: 'Conoce su valor hoy y publica con una expectativa clara cuando estés listo para venderlo.',
    stage: 'Valoriza', leadsTo: ['valoriza-5-nuevo-canal-de-venta'],
    hero: hero({ img: 'hero4-seam.png', alt: 'Hombre peruano joven valorizando su vehículo desde el celular, junto al mensaje Valorizar antes de vender es clave', title: `Valoriza tu vehículo y publica<br>${acc('con una referencia clara')}`, text: 'Conoce su valor, guárdalo y publica con una expectativa clara cuando estés listo para venderlo.', cta: 'Quiero valorizar mi vehículo', url: VALORIZA_URL }).replace(`${IMG}/hero/hero4-seam.png`, `${process.env.NODE_ENV === 'development' ? '' : CDN}/correos/campana-valoriza/hero/hero4-seam.png`),
    body: [
      p(b('Hola {{Nombre usuario.Ejem: Gabriel Bruno}},')), gap(8),
      p(`Imagina que llega el momento de vender y ya tienes el paso más importante resuelto: ${b('una referencia clara del valor de tu vehículo.')} ${b('Valoriza hoy')}, guarda el resultado en Mi Garaje y deja lista la base para definir tu expectativa de venta.`),
      gap(16),
      p(`Cuando decidas publicar, avanzarás con mayor seguridad: ${b('presenta tu vehículo con una expectativa clara, recibe propuestas')} y elige cómo continuar. ${b('Empieza en pocos pasos y usa tu valorización como referencia para publicar.')}`),
      gap(24),
      cels([['formulario.png', 'Formulario de valorización', 'Valoriza', 'En pocos pasos, gratis.'], ['resultado.png', 'Resultado de la valorización con Guardar y Publicar', 'Guarda', 'Queda en Mi Garaje.'], ['propuestas.png', 'Propuestas recibidas en Mi Garaje', 'Publica', 'Y abre la posibilidad de recibir propuestas.']]),
      gap(12), `<tr><td align="center" style="padding:0 28px;text-align:center;"><p align="center" style="display:block;width:100%;margin:0 auto;font-family:${F};font-size:11px;line-height:16px;font-weight:400;text-align:center!important;color:${DS.muted};">Recreaciones ilustrativas del recorrido, no capturas de una operación real. Los vehículos, montos, propuestas y saldos son ejemplos; publicar no garantiza propuestas inmediatas ni una venta. La estimación no es una oferta ni garantiza un precio de venta o recompra.</p></td></tr>`,
      gap(32), closingPublicaConVentajaBanner(),
    ],
  },
  {
    id: 'valoriza-5-nuevo-canal-de-venta',
    name: 'Vende 5 — un nuevo canal de venta para ti',
    subject: '¿Compras autos? Ahora también véndelos aquí',
    preheader: 'Miles de compradores ya entran a VMC. Pon tu auto frente a ellos.',
    stage: 'Vende', leadsTo: ['valoriza-6-vender-en-vmc'],
    hero: hero({ img: 'valoriza-5.jpg', alt: 'Revende — Comprador y vendedor cerrando un trato junto a una camioneta', eyebrow: 'Un nuevo canal de venta', title: `¿Compras en VMC? ${acc('Sé revendedor.')}`, perks: ['Publica', 'Recibe propuestas', 'Tú decides'], text: 'Ya sabes encontrar buenas oportunidades. Ahora cierra el ciclo: publica en VMC y recibe propuestas de miles de compradores que ya buscan aquí.', cta: 'Quiero publicar mi auto', url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Tú ya sabes cómo se mueve el mercado. ${b('Ahora úsalo a tu favor')}: compra, valoriza y revende en un solo lugar.`),
      gap(28), cel('mi-garaje.png', 'Mi Garaje en VMC con Publica tu vehículo y Valoriza tu vehículo', 'Tu nuevo negocio', 'Compra, valoriza y revende', [['compras', 'Compra', 'Encuentra la oportunidad en VMC.'], ['valorizaciones', 'Valoriza', 'Conoce su valor y define tu margen.'], ['crecimiento', 'Revende', 'Publícalo y deja que las propuestas lleguen.']]),
      gap(32), closing('crecimiento', 'Tu próximo auto puede ser tu próxima venta', 'Publícalo frente a miles de compradores en VMC.', 'Quiero publicar mi auto', PUBLICAR_URL),
      gap(24), ps('Antes de publicar, valoriza: un precio con sustento atrae mejores propuestas.'),
    ],
  },
  {
    id: 'valoriza-6-vender-en-vmc',
    name: 'Vende 6 — ¿sabías que ahora puedes vender en VMC?',
    subject: 'Deja que los compradores vengan a ti',
    preheader: 'Publica tu auto en VMC y recibe propuestas en Mi Garaje.',
    stage: 'Vende', leadsTo: ['valoriza-7-vende-y-valoriza'],
    hero: hero({ img: 'valoriza-6.jpg', alt: 'Propuestas — Vendedor con su auto en venta', eyebrow: 'Ahora puedes vender en VMC', title: `Tu auto, frente a ${acc('miles de compradores')}`, perks: ['Recibe propuestas', 'Tú decides', 'Sin llamadas'], text: 'Olvídate de anuncios que nadie ve y de llamadas a cualquier hora. Publica en VMC y las propuestas llegan directo a Mi Garaje. Tú decides.', cta: 'Quiero publicar mi auto', url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Así se ve cuando llega una propuesta. ${b('La última palabra siempre es tuya')}:`),
      gap(18),
      cel('responder.png', 'Pantalla de una propuesta con Aceptar y Contraproponer', 'Así funciona', 'Tú pones las reglas', [['precio', 'Recibe propuestas', 'Los compradores te dicen cuánto pagarían.'], ['verificado', 'Tú decides', 'Acepta, rechaza o contrapropón.'], ['negociaciones', 'Resuelve dudas', 'Te escriben antes de proponer, así llegan más decididos.']]),
      gap(32), closing('publicar', 'Tu auto podría estar recibiendo propuestas hoy', 'Publícalo en VMC y negocia desde Mi Garaje.', 'Publicar mi auto ahora', PUBLICAR_URL),
      gap(16), link('¿No sabes a cuánto publicarlo? Valorízalo gratis', VALORIZA_URL),
    ],
  },
  {
    id: 'valoriza-7-vende-y-valoriza',
    name: 'Vende 7 — ¿sabías que en VMC puedes vender? Valoriza primero',
    subject: 'El secreto para cerrar ventas más rápido en VMC Subastas',
    preheader: 'Publica con una referencia clara y atrae postores serios desde el inicio.',
    stage: 'Vende',
    hero: hero(HERO_OPTS_7),
    body: [
      HOLA, gap(8),
      p(`El mercado de subastas se mueve rápido. ${b('¿Sabías que los vehículos con precios alineados a la realidad del mercado reciben hasta 3 veces más ofertas en sus primeros dos días?')}`),
      gap(16),
      p(`Con la ${b('Valorización Referencial AVT')}, configura tu publicación con un precio exacto y atrae postores serios desde el primer minuto.`),
      gap(28), cel('formulario.png', 'Formulario de valorización de VMC', 'Tu estrategia de venta', '¿Por qué integrar el AVT a tu estrategia de venta?', [['precio', 'Define a qué precio vender', 'Parte del valor estimado de tu carro hoy.'], ['crecimiento', 'Descubre cuánto podría valer si esperas', 'AVT proyecta su valor para los próximos meses.'], ['fecha', 'Elige cuándo ponerlo en venta', 'Compara el valor de hoy con la proyección antes de publicar.']]),
      gap(32), closing('precio', 'Asegura el éxito de tu publicación', 'Vende más rápido y de forma inteligente.', '¡Valoriza tu carro hoy!', VALORIZA_URL),
      gap(16), link('¿Ya sabes tu precio? Publica tu auto aquí', PUBLICAR_URL),
    ],
  },
];

export const CAMPANA_VALORIZA: EmailTemplate[] = DEFS.map((d) => ({
  id: d.id, name: d.name, subject: d.subject, category: CATEGORIA, stage: d.stage, leadsTo: d.leadsTo,
  sections: [],
  html: build(d),
}));
