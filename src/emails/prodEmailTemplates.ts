/* ─────────────────────────────────────────────────────────────────────────────
   PORTADO desde el repo Concorde-Email (github.com/Jarbram/Concorde-Email),
   archivo `lib/email-templates.ts`, SIN modificaciones.

   Es el renderer real de los correos de producción: generateEmail(sections,
   subject) devuelve el HTML email-safe completo. Lo consume prodEmails.ts.
   No editar a mano — si Concorde-Email cambia, volver a copiar.
   ───────────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════════
   Secciones de correo VMC Subastas — layout original + estilo Concorde
   Tokens y distancias según patrones.md. Acento naranja solo en palabras clave.
   Marcadores de resaltado: **acento 800** · [[número morado 800]]
   Los merge tags {{variable}} pasan LITERALES (no se tocan) para tu plataforma de envío.
   ═══════════════════════════════════════════════════════════════════════════ */

const FONT_BODY = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
const FONT_HEADING = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
const FONT_NUMBER = "'Poppins', 'Plus Jakarta Sans', Arial, Helvetica, sans-serif"; // números
const C = {
  purple: '#3b1782', dark: '#0E016C', body: '#5a4d75',
  lavender: '#f5f3fe', accent: '#ed8936', divider: '#d5cfe8',
  navy: '#22005c', footerLink: '#A298B3', white: '#FFFFFF', bg: '#FAFAFA', // navy = vault-900 — concorde/components/Button.tsx (--vmc-color-vault-900)
  border: '#e7e1f7',
};
const G_VAULT = 'linear-gradient(135deg,#8460e5 0%,#3b1782 100%)';   // badges (vault)
const G_PRIMARY = 'linear-gradient(135deg,#ed8936 0%,#8460e5 100%)'; // botón Concorde (orange→vault) — flujo "En vivo"
const G_NEGOTIABLE = 'linear-gradient(125deg,#00aeb1 0%,#00aeb1 40%,#8460e5 100%)'; // botón teal — flujo "Negociable"
const G_PANEL = 'linear-gradient(135deg,#f6f3fe 0%,#efe9fb 100%)';
const GLOSS = 'inset 0 1px 0 rgba(255,255,255,0.35)';
const CONTAINER_W = '600';
const TEAL = '#00aeb1';
const SLATE = '#99a1af'; // neutral-700 — concorde/components/BidPosition.tsx (borde fila vault)
const G_ROW_VAULT = 'linear-gradient(90deg,#19004A 0%,#3B1782 50%,#2E0F70 100%)'; // fila "vault" — concorde/components/BidPosition.tsx (.pbidpos__row--vault)
const G_TEAL_BAR = 'linear-gradient(90deg,#00edee 0%,#00d2d3 50%,#009597 100%)'; // OfferCard variant="negotiable" — concorde/components/OfferCard.tsx
const G_LIVE = 'linear-gradient(180deg,#FF9639 0%,#EF852E 40%,#BE3D00 100%)'; // fila "1ª posición" — concorde/components/BidPosition.tsx (.pbidpos__row--live)
const WBC_SHADOW = '0 0 8px 4px rgba(0,0,0,0.08)'; // sombra de card — concorde/components/WalletBalanceCard.tsx (.wbc)
// bordes gradiente Concorde (capa border-box) — se emulan email-safe con tabla wrapper de padding 2px
const B_PRIMARY = 'linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%)';    // Button.tsx .pvbtn
const B_NEGOTIABLE = 'linear-gradient(135deg,#ffffff 0%,#4ddcdc 25%,#6445df 75%,#ffffff 100%)'; // Button.tsx .pneg
const B_STAT = 'linear-gradient(125deg,#ffffff 0%,#F4AC59 22%,#8460E5 74.5%,#ffffff 100%)';     // StatPill.tsx borde glass
const TXT_SHADOW = 'rgba(0,0,0,0.25) 0 1px 3px';        // Button.tsx text-shadow
const GLOW_PRIMARY = 'rgba(237,137,54,0.3) 0 2px 6px';  // Button.tsx .pvbtn box-shadow glow
const GLOW_NEGOTIABLE = 'rgba(0,174,177,0.35) 0 2px 6px'; // Button.tsx .pneg box-shadow glow
const GLASS_SHEEN = 'linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%)'; // StatPill.tsx glass base
const G_CONSOLE = 'linear-gradient(157deg,#5F3ED8 0%,#340091 50%,#140046 100%)';      // DetailCard.tsx .pdetail__head
const G_CONSOLE_NAVY = 'linear-gradient(157deg,#22005c 0%,#00005E 55%,#000042 100%)'; // variante navy, mismo ángulo
const B_GLASS_EDGE = 'linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%)'; // canto de vidrio iluminado (::before glass de Concorde)
const G_STRIPE = 'linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)'; // franja firma orange→vault (barra inferior de OfferCard)
const GREEN = '#32BA7C'; // verde éxito ya usado en quote/won-vehicle
const WBC_VALUE = '#3B1782'; // label/value morado — concorde/components/WalletBalanceCard.tsx (.wbc__row-label/value)
const PCARD_NAME = '#4c1ebc';  // OfferCard .pcard__name
const PCARD_YEAR = '#191c1c';  // OfferCard .pcard__year
const HEART_PATH = 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'; // LikeButton.tsx

// corazón de OfferCard/LikeButton — círculo blanco, borde lila, heart outline vault-600
function likeBadge(): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="22" height="22" bgcolor="#ffffff" style="border-radius:50%;border:1.5px solid #cfbaff;"><tr><td align="center" valign="middle" width="22" height="22"><svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff" stroke="#5a35c2" stroke-width="2"><path d="${HEART_PATH}"/></svg></td></tr></table>`;
}

export interface Section {
  id: string;
  type: 'title' | 'text' | 'panel' | 'features' | 'icon-text' | 'stats' | 'cta' | 'image' | 'spacer' | 'table' | 'details' | 'divider' | 'note' | 'amount' | 'offers' | 'vehicle' | 'negotiation' | 'quote' | 'won-vehicle' | 'costs' | 'list' | 'success' | 'columns';
  content: Record<string, string>;
}

export const SECTION_LABELS: Record<Section['type'], string> = {
  title: 'Título',
  text: 'Párrafo',
  panel: 'Panel card',
  features: 'Fila de 3 features',
  'icon-text': 'Icono + texto',
  stats: 'Estadísticas',
  cta: 'Botón CTA',
  image: 'Imagen',
  spacer: 'Espaciador',
  table: 'Tabla datos',
  details: 'Lista de datos',
  divider: 'Divisor',
  note: 'Nota / aviso',
  amount: 'Monto destacado',
  offers: 'Grilla de ofertas (4)',
  vehicle: 'Foto de vehículo + miniaturas',
  negotiation: 'Barra de ronda de negociación',
  quote: 'Propuesta + garantía',
  'won-vehicle': 'Vehículo ganado (banner + conteo)',
  costs: 'Desglose de costos (3 cajas)',
  list: 'Lista con viñetas',
  success: 'Confirmación con check',
  columns: 'Dos columnas de texto',
};

export function createSection(type: Section['type']): Section {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const defaults: Record<Section['type'], Record<string, string>> = {
    title: { eyebrow: '', text: 'Título de la sección' },
    text: { text: 'Escribe tu contenido aquí. Usa **palabra** para acento o [[123]] para número.' },
    panel: { title: 'Título del panel', body: 'Contenido del panel.', iconUrl: '', badge: '', imageUrl: '', imageW: '85', imageH: '57' },
    features: { heading: '¿Qué debes tener en cuenta?', i1: '', t1: 'Texto 1', i2: '', t2: 'Texto 2', i3: '', t3: 'Texto 3' },
    'icon-text': { icon: '📌', title: 'Título del item', text: 'Descripción del item.' },
    stats: { s1v: '99', s1l: 'Etiqueta 1', s2v: '99', s2l: 'Etiqueta 2', s3v: '99', s3l: 'Etiqueta 3' },
    cta: { text: 'Click aquí', url: 'https://', variant: '' },
    image: { url: 'https://', alt: 'Imagen' },
    spacer: { height: '20' },
    table: { r1k: 'Concepto 1', r1v: 'Valor 1', r2k: 'Concepto 2', r2v: 'Valor 2', r3k: 'Concepto 3', r3v: 'Valor 3' },
    details: { l1: 'Etiqueta 1:', v1: 'Valor 1', l2: 'Etiqueta 2:', v2: 'Valor 2', l3: '', v3: '' },
    divider: {},
    note: { title: 'Recuerda:', body: 'Texto del aviso importante para el usuario.' },
    amount: { label: 'Monto:', value: 'US$ 0' },
    offers: {
      heading: '¡Tenemos más oportunidades negociables!', sub: 'Estas son algunas ofertas especiales para ti:',
      c1img: '', c1name: 'Vehículo', c1year: '2020',
      c2img: '', c2name: 'Vehículo', c2year: '2020',
      c3img: '', c3name: 'Vehículo', c3year: '2020',
      c4img: '', c4name: 'Vehículo', c4year: '2020',
    },
    vehicle: { img: '', tag: 'Vehículo', caption: 'Vendedor', thumb1: '', thumb2: '', thumb3: '' },
    negotiation: {
      round: '1°', roundLabel: 'Ronda de negociación.',
      yourLabel: 'Tu propuesta:', yourValue: 'US$ 0',
      sellerLabel: 'Vendedor propone:', sellerValue: 'US$ 0',
      expiresLabel: 'Vence', expiresValue: '',
    },
    quote: {
      proposalLabel: 'Tu propuesta:', proposalValue: 'US$ 0', expiresLabel: 'Vence', expiresValue: '',
      guaranteeLabel: 'En garantía:', guaranteeValue: '0', pctLabel: '', pctValue: '',
    },
    'won-vehicle': {
      img: '', tag: 'Vehículo', statLabel: 'Propuestas', statValue: '0',
      winLabel: 'Tu propuesta ganadora:', winValue: 'US$ 0', pctLabel: '', pctValue: '',
    },
    costs: { l1: 'Comisión:', v1: 'US$ 0', l2: 'En garantía:', v2: 'US$ 0', l3: 'Deuda:', v3: 'US$ 0' },
    list: { title: '', i1: 'Item 1', i2: '', i3: '' },
    success: { title: '¡Listo!', value: '', caption: '' },
    columns: { h1: 'Columna 1', body1: 'Texto 1', h2: 'Columna 2', body2: 'Texto 2' },
  };
  return { id, type, content: { ...defaults[type] } };
}

function esc(s: string) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/** Escapa y aplica resaltado: **acento naranja 800** · __negrita oscura 700__ · [[número Poppins 800]].
    Los merge tags {{variable}} quedan intactos. */
function hl(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight:800;color:${C.accent};">$1</strong>`)
    .replace(/__(.+?)__/g, `<strong style="font-weight:700;color:${C.dark};">$1</strong>`)
    .replace(/\[\[(.+?)\]\]/g, `<strong style="font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">$1</strong>`);
}

// panel lavanda Concorde (gradiente + borde + radio) — patrones: max-width 500
const panelOpen = `<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" bgcolor="${C.lavender}" style="border-radius:16px;border:1px solid ${C.border};background-image:${G_PANEL};max-width:500px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.6), ${WBC_SHADOW};"><tr><td style="padding:16px 16px;">`;
const panelClose = `</td></tr></table>`;

function badgeCell(iconUrl: string, white: boolean): string {
  const box = white
    ? `bgcolor="#FFFFFF" style="border-radius:50%;border:1px solid ${C.border};box-shadow:inset 0 1px 0 rgba(255,255,255,0.6);"`
    : `bgcolor="${C.purple}" style="border-radius:50%;background-image:${G_VAULT};box-shadow:${GLOSS};"`;
  return `<td width="48" valign="middle"><table border="0" cellpadding="0" cellspacing="0" width="48" height="48" ${box}><tr><td align="center" valign="middle" width="48" height="48"><img src="${esc(iconUrl)}" width="30" height="30" alt="" border="0" style="display:block;"></td></tr></table></td>`;
}

function chipCell(iconUrl: string): string {
  return `<td width="32%" align="center" style="padding:0 6px;"><table border="0" cellpadding="0" cellspacing="0" width="58" height="58" align="center" bgcolor="${C.lavender}" style="border-radius:50%;border:1px solid ${C.border};box-shadow:inset 0 1px 0 rgba(255,255,255,0.6);"><tr><td align="center" valign="middle" width="58" height="58"><img src="${esc(iconUrl)}" width="34" height="34" alt="" border="0" style="display:block;margin:0 auto;"></td></tr></table></td>`;
}

const vDivider = `<table border="0" cellpadding="0" cellspacing="0" width="1" height="40" bgcolor="${C.divider}"><tr><td></td></tr></table>`;

function renderSection(s: Section): string {
  const c = s.content;
  switch (s.type) {
    case 'title': {
      const eyebrow = c.eyebrow
        ? `<tr><td align="center" style="padding:0 16px 12px;font-family:${FONT_HEADING};"><table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td bgcolor="#fff0e2" style="border-radius:9999px;padding:5px 13px;"><span style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.accent};font-family:${FONT_HEADING};">${esc(c.eyebrow)}</span></td></tr></table></td></tr>`
        : '';
      return `${eyebrow}<tr><td align="center" style="font-size:24px;font-weight:800;line-height:1.25;color:${C.purple};letter-spacing:-0.02em;font-family:${FONT_HEADING};padding:0 16px;"><b>${esc(c.text)}</b></td></tr>`;
    }
    case 'text':
      return `<tr><td align="${c.align || 'left'}" style="font-size:14px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};padding:0 16px;">${hl(c.text)}</td></tr>`;
    case 'panel': {
      const titleP = c.title ? `<p style="margin:0${(c.body || c.iconUrl || c.imageUrl) ? ' 0 12px' : ''};font-size:14px;font-weight:700;line-height:1.35;color:${C.purple};font-family:${FONT_HEADING};">${hl(c.title)}</p>` : '';
      const bodyP = `<p style="margin:0;font-size:14px;line-height:1.45;color:${C.body};font-family:${FONT_HEADING};">${hl(c.body)}</p>`;
      const inner = (c.iconUrl || c.imageUrl)
        ? `${titleP}<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>${c.iconUrl ? badgeCell(c.iconUrl, c.badge === 'white') + '<td width="14"></td>' : ''}<td valign="middle">${bodyP}</td>${c.imageUrl ? `<td width="8"></td><td width="${esc(c.imageW || '85')}" valign="middle" align="right"><img src="${esc(c.imageUrl)}" width="${esc(c.imageW || '85')}" height="${esc(c.imageH || '57')}" alt="" border="0" style="display:block;"></td>` : ''}</tr></table>`
        : `${titleP}${bodyP}`;
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">${panelOpen}${inner}${panelClose}</td></tr>`;
    }
    case 'features':
      return `<tr><td align="center" style="padding:4px 16px 0;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
<tr><td align="center" style="padding-bottom:14px;"><span style="font-size:14px;font-weight:800;line-height:1.3;color:${C.purple};font-family:${FONT_HEADING};"><b>${esc(c.heading)}</b></span></td></tr>
<tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>${chipCell(c.i1)}<td width="2%"></td>${chipCell(c.i2)}<td width="2%"></td>${chipCell(c.i3)}</tr>
<tr><td height="12" colspan="5"></td></tr>
<tr>
<td width="32%" align="center" valign="top" style="padding:0 6px;font-size:12px;line-height:1.35;color:${C.body};font-family:${FONT_HEADING};">${hl(c.t1)}</td>
<td width="2%" align="center" valign="top">${vDivider}</td>
<td width="32%" align="center" valign="top" style="padding:0 6px;font-size:12px;line-height:1.35;color:${C.body};font-family:${FONT_HEADING};">${hl(c.t2)}</td>
<td width="2%" align="center" valign="top">${vDivider}</td>
<td width="32%" align="center" valign="top" style="padding:0 6px;font-size:12px;line-height:1.35;color:${C.body};font-family:${FONT_HEADING};">${hl(c.t3)}</td>
</tr></table></td></tr></table></td></tr>`;
    case 'icon-text':
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">${panelOpen}
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td width="48" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="48" height="48" bgcolor="${C.purple}" style="border-radius:50%;background-image:${G_VAULT};box-shadow:${GLOSS};"><tr><td align="center" valign="middle"><span style="font-size:22px;">${esc(c.icon)}</span></td></tr></table></td>
<td width="14"></td>
<td valign="top"><p style="margin:0;font-size:14px;line-height:1.45;color:${C.body};font-family:${FONT_HEADING};">${c.title ? `<b style="color:${C.purple};">${esc(c.title)}</b><br>` : ''}${hl(c.text).replace(/\n/g, '<br>')}</p></td>
</tr></table>${panelClose}</td></tr>`;
    case 'stats':
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">${panelOpen}
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td width="32%" align="center"><span style="display:block;font-size:20px;font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">${esc(c.s1v)}</span><span style="font-size:10px;color:${C.body};text-transform:uppercase;">${esc(c.s1l)}</span></td>
<td width="2%">${vDivider}</td>
<td width="32%" align="center"><span style="display:block;font-size:20px;font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">${esc(c.s2v)}</span><span style="font-size:10px;color:${C.body};text-transform:uppercase;">${esc(c.s2l)}</span></td>
<td width="2%">${vDivider}</td>
<td width="32%" align="center"><span style="display:block;font-size:20px;font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">${esc(c.s3v)}</span><span style="font-size:10px;color:${C.body};text-transform:uppercase;">${esc(c.s3l)}</span></td>
</tr></table>${panelClose}</td></tr>`;
    case 'cta': {
      const neg = c.variant === 'negotiable';
      const gradient = neg ? G_NEGOTIABLE : G_PRIMARY;
      const border = neg ? B_NEGOTIABLE : B_PRIMARY;
      const glow = neg ? GLOW_NEGOTIABLE : GLOW_PRIMARY;
      // borde gradiente de Button.tsx emulado con tabla wrapper (padding 2px = border-width)
      return `<tr><td align="center"><table border="0" cellpadding="0" cellspacing="0" align="center" style="border-radius:9999px;background-image:${border};box-shadow:${glow};"><tr><td style="padding:2px;"><a href="${esc(c.url)}" target="_blank" style="display:inline-block;background:${C.purple};background-image:${gradient};color:${C.white};border-radius:9999px;padding:13px 44px;font-family:${FONT_HEADING};font-size:15px;font-weight:700;text-decoration:none;text-shadow:${TXT_SHADOW};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);">${esc(c.text)}</a></td></tr></table></td></tr>`;
    }
    case 'image':
      return `<tr><td align="center" style="padding:0 16px;"><img src="${esc(c.url)}" alt="${esc(c.alt)}" style="display:block;margin:0 auto;max-width:100%;height:auto;border-radius:12px;"></td></tr>`;
    case 'spacer':
      return `<tr><td height="${esc(c.height)}"></td></tr>`;
    case 'table':
      return `<tr><td align="center" style="padding:0 16px;">${panelOpen}
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td style="font-size:12px;color:${C.body};padding-bottom:8px;border-bottom:1px solid ${C.divider};font-family:${FONT_HEADING};">${esc(c.r1k)}</td><td style="font-size:12px;color:${C.purple};text-align:right;font-weight:700;padding-bottom:8px;border-bottom:1px solid ${C.divider};font-family:${FONT_NUMBER};">${esc(c.r1v)}</td></tr>
<tr><td style="font-size:12px;color:${C.body};padding:8px 0;border-bottom:1px solid ${C.divider};font-family:${FONT_HEADING};">${esc(c.r2k)}</td><td style="font-size:12px;color:${C.purple};text-align:right;font-weight:700;padding:8px 0;border-bottom:1px solid ${C.divider};font-family:${FONT_NUMBER};">${esc(c.r2v)}</td></tr>
<tr><td style="font-size:12px;color:${C.body};padding-top:8px;font-family:${FONT_HEADING};">${esc(c.r3k)}</td><td style="font-size:12px;color:${C.purple};text-align:right;font-weight:700;padding-top:8px;font-family:${FONT_NUMBER};">${esc(c.r3v)}</td></tr>
</table>${panelClose}</td></tr>`;
    case 'details': {
      const row = (l: string, v: string) => (l || v)
        ? `<tr><td valign="top" width="38%" style="font-size:14px;font-weight:600;color:${C.accent};font-family:${FONT_HEADING};padding:7px 12px 7px 0;line-height:1.4;">${esc(l)}</td><td valign="top" style="font-size:14px;font-weight:700;color:${C.purple};font-family:${FONT_HEADING};padding:7px 0;line-height:1.4;">${hl(v)}</td></tr>`
        : '';
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="max-width:500px;">${row(c.l1, c.v1)}${row(c.l2, c.v2)}${row(c.l3, c.v3)}</table></td></tr>`;
    }
    case 'divider':
      return `<tr><td align="center" style="padding:0 16px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="max-width:500px;"><tr><td style="border-top:1px solid ${C.border};font-size:1px;line-height:1px;height:1px;">&nbsp;</td></tr></table></td></tr>`;
    case 'note':
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" bgcolor="#FFFFFF" style="max-width:500px;border:1px solid ${C.border};border-radius:12px;box-shadow:${WBC_SHADOW};"><tr><td style="padding:14px 14px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td width="32" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="30" height="30" bgcolor="#fff0e2" style="border-radius:8px;"><tr><td align="center" valign="middle" width="30" height="30" style="font-size:17px;font-weight:800;color:${C.accent};font-family:${FONT_HEADING};line-height:1;">!</td></tr></table></td>
<td width="10"></td>
<td valign="middle"><p style="margin:0;font-size:13px;line-height:1.5;color:${C.body};font-family:${FONT_HEADING};">${c.title ? `<b style="color:${C.purple};">${esc(c.title)}</b> ` : ''}${hl(c.body)}</p></td>
</tr></table></td></tr></table></td></tr>`;
    case 'amount':
      // borde gradiente de StatPill.tsx emulado con tabla wrapper (padding 1.5px ≈ 2px)
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" align="center" style="border-radius:16px;background-image:${B_STAT};box-shadow:${WBC_SHADOW};"><tr><td style="padding:2px;">
<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="${C.lavender}" style="border-radius:14px;background-image:${G_PANEL};"><tr><td align="center" style="padding:14px 26px;">
<p style="margin:0 0 4px;font-size:12px;color:${C.body};font-family:${FONT_HEADING};">${esc(c.label)}</p>
<p style="margin:0;font-size:24px;font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">${esc(c.value)}</p>
</td></tr></table></td></tr></table></td></tr>`;
    case 'offers': {
      const card = (img: string, name: string, year: string) => `<td width="24%" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:8px;box-shadow:0 0 16px 4px rgba(0,0,0,0.07);">
<tr><td>${img ? `<img src="${esc(img)}" width="100%" alt="" style="display:block;height:70px;object-fit:cover;border-radius:8px 8px 0 0;">` : `<div style="height:70px;background:${C.lavender};border-radius:8px 8px 0 0;"></div>`}</td></tr>
<tr><td style="padding:8px 8px 2px;"><span style="display:block;font-size:13px;font-weight:700;color:${PCARD_NAME};font-family:${FONT_HEADING};">${esc(name)}</span><span style="display:block;font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:${PCARD_YEAR};font-family:${FONT_HEADING};">${esc(year)}</span></td></tr>
<tr><td align="right" style="padding:4px 8px 8px;">${likeBadge()}</td></tr>
<tr><td height="6" style="background-image:${G_TEAL_BAR};font-size:1px;line-height:1px;border-radius:0 0 8px 8px;">&nbsp;</td></tr>
</table></td>`;
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<span style="display:block;font-size:16px;font-weight:800;color:${C.purple};text-align:center;margin-bottom:6px;">${esc(c.heading)}</span>
<span style="display:block;font-size:12px;color:${C.body};text-align:center;margin-bottom:14px;">${esc(c.sub)}</span>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
${card(c.c1img, c.c1name, c.c1year)}<td width="2%"></td>${card(c.c2img, c.c2name, c.c2year)}<td width="2%"></td>${card(c.c3img, c.c3name, c.c3year)}<td width="2%"></td>${card(c.c4img, c.c4name, c.c4year)}
</tr></table></td></tr>`;
    }
    case 'vehicle': {
      // 3 columnas (main + thumbs) comparten la misma altura total para que los bordes inferiores queden alineados
      const MAIN_H = 228;
      const thumbCount = c.thumb3 ? 3 : c.thumb2 ? 2 : 1;
      const thumbH = Math.round((MAIN_H - (thumbCount - 1) * 6) / thumbCount);
      const thumbRow = (src: string) => `<tr><td>${src ? `<img src="${esc(src)}" width="100%" alt="" style="display:block;height:${thumbH}px;object-fit:cover;border-radius:8px;">` : `<div style="width:100%;height:${thumbH}px;background:${C.lavender};border-radius:8px;"></div>`}</td></tr>`;
      const spacer = `<tr><td height="6"></td></tr>`;
      return `<tr><td style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td width="70%" valign="top" style="position:relative;">
<div style="position:relative;border-radius:12px;overflow:hidden;line-height:0;">
${c.img ? `<img src="${esc(c.img)}" width="100%" alt="" style="display:block;height:${MAIN_H}px;object-fit:cover;border-radius:12px;">` : `<div style="width:100%;height:${MAIN_H}px;background:${C.lavender};border-radius:12px;"></div>`}
<span style="position:absolute;top:10px;left:10px;display:inline-block;white-space:nowrap;line-height:1;background:${TEAL};background-image:${G_TEAL_BAR};color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:9999px;font-family:${FONT_HEADING};">${esc(c.tag)}</span>
${c.caption ? `<span style="position:absolute;bottom:10px;left:10px;display:inline-block;white-space:nowrap;line-height:1;background:rgba(34,0,92,0.72);color:#fff;font-size:11px;font-weight:600;padding:6px 12px;border-radius:9999px;font-family:${FONT_HEADING};">Ofrecido por ${esc(c.caption)}</span>` : ''}
</div>
</td>
<td width="4%"></td>
<td width="26%" valign="top">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
${thumbRow(c.thumb1)}${spacer}${thumbRow(c.thumb2)}${c.thumb3 ? spacer + thumbRow(c.thumb3) : ''}
</table>
</td>
</tr></table></td></tr>`;
    }
    case 'negotiation':
      // colores 1:1 con concorde/components/BidPosition.tsx: fila "vault" (morado + borde slate)
      // para tu propuesta, fila "live" (gradiente naranja, ya usado como G_LIVE en 'quote') para
      // la propuesta que manda — antes esta última usaba un coral (#f1705d) fuera del sistema
      return `<tr><td style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:10px;overflow:hidden;"><tr>
<td width="30%" bgcolor="${TEAL}" valign="middle" style="background-image:${G_TEAL_BAR};padding:12px 10px;">
<table border="0" cellpadding="0" cellspacing="0"><tr>
<td width="26" valign="middle"><table border="0" cellpadding="0" cellspacing="0" width="26" height="26" bgcolor="#ffffff" style="border-radius:50%;"><tr><td align="center" valign="middle" style="font-size:12px;font-weight:800;color:${TEAL};font-family:${FONT_NUMBER};">${esc(c.round)}</td></tr></table></td>
<td width="8"></td>
<td style="font-size:11px;font-weight:700;color:#fff;line-height:1.3;font-family:${FONT_HEADING};">${esc(c.roundLabel)}</td>
</tr></table>
</td>
<td width="35%" bgcolor="${C.navy}" align="center" valign="middle" style="background-image:${G_ROW_VAULT};border-top:1px solid ${SLATE};border-bottom:1px solid ${SLATE};padding:12px 6px;">
<span style="display:block;font-size:11px;color:#fff;font-family:${FONT_HEADING};">${esc(c.yourLabel)}</span>
<span style="display:block;font-size:16px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.yourValue)}</span>
</td>
<td width="35%" valign="top">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td bgcolor="#EF852E" align="center" style="background-image:${G_LIVE};padding:8px 6px 4px;">
<span style="display:block;font-size:11px;color:#fff;font-family:${FONT_HEADING};">${esc(c.sellerLabel)}</span>
<span style="display:block;font-size:16px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.sellerValue)}</span>
</td></tr>
<tr><td bgcolor="${C.navy}" align="center" style="padding:4px 6px;"><span style="font-size:10px;font-weight:700;color:#fff;font-family:${FONT_HEADING};">${esc(c.expiresLabel)} ${esc(c.expiresValue)}</span></td></tr>
</table>
</td>
</tr></table></td></tr>`;
    case 'quote': {
      // altura fija (atributo height, no %) igual al alto natural del card de propuesta — más
      // confiable en clientes de email que depender del contenido; adentro, todo centrado verticalmente
      const QUOTE_SIDE_H = 92;
      const quoteSideCard = (w: string, label: string, value: string) => `<td width="${w}" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="border-radius:16px;overflow:hidden;box-shadow:${WBC_SHADOW};"><tr>
<td height="${QUOTE_SIDE_H}" align="center" valign="middle" style="padding:10px;">
<span style="display:block;font-size:12px;font-weight:600;letter-spacing:0.02em;color:${C.body};font-family:${FONT_HEADING};">${esc(label)}</span>
<span style="display:block;margin-top:6px;font-size:26px;font-weight:800;color:${WBC_VALUE};font-family:${FONT_NUMBER};">${esc(value)}</span>
</td></tr></table></td>`;
      const hasPct = !!c.pctValue;
      const w = hasPct ? '32%' : '48%';
      const pctBox = hasPct ? `<td width="4%"></td><td width="${w}" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" bgcolor="#32BA7C" style="border-radius:14px;box-shadow:${WBC_SHADOW};"><tr><td align="center" style="padding:14px 6px;">
<span style="display:block;font-size:11px;color:#fff;font-family:${FONT_HEADING};">${esc(c.pctLabel)}</span><span style="display:block;font-size:19px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.pctValue)}</span>
</td></tr></table></td>` : '';
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;"><tr>
<td width="${w}" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:14px;overflow:hidden;box-shadow:${WBC_SHADOW};"><tr>
<td bgcolor="#EF852E" align="center" style="padding:12px 10px 10px;background-image:${G_LIVE};"><span style="display:block;font-size:11px;color:#fff;font-family:${FONT_HEADING};">${esc(c.proposalLabel)}</span><span style="display:block;font-size:19px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.proposalValue)}</span></td>
</tr><tr><td bgcolor="${C.navy}" align="center" style="padding:5px 10px;"><span style="font-size:10px;font-weight:700;color:#fff;font-family:${FONT_HEADING};">${esc(c.expiresLabel)} ${esc(c.expiresValue)}</span></td></tr>
</table></td>
<td width="4%"></td>
${quoteSideCard(w, c.guaranteeLabel, c.guaranteeValue)}
${pctBox}
</tr></table></td></tr>`;
    }
    case 'won-vehicle':
      return `<tr><td style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td width="74%" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:12px;overflow:hidden;">
<tr><td style="position:relative;line-height:0;">
${c.img ? `<img src="${esc(c.img)}" width="100%" alt="" style="display:block;">` : `<div style="width:100%;height:150px;background:${C.lavender};"></div>`}
<span style="position:absolute;top:10px;left:10px;display:inline-block;white-space:nowrap;line-height:1;background:${TEAL};background-image:${G_TEAL_BAR};color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:9999px;font-family:${FONT_HEADING};">${esc(c.tag)}</span>
</td></tr>
<tr><td bgcolor="${C.navy}" style="padding:10px 12px;"><table border="0" cellpadding="0" cellspacing="0"><tr>
<td width="26" valign="middle"><table border="0" cellpadding="0" cellspacing="0" width="26" height="26" bgcolor="#ffffff" style="border-radius:50%;"><tr><td align="center" valign="middle" width="26" height="26" style="font-size:13px;line-height:1;">🏆</td></tr></table></td>
<td width="8"></td>
<td valign="middle"><span style="display:block;font-size:10px;color:#d8d2ec;font-family:${FONT_HEADING};">${esc(c.winLabel)}</span><span style="display:block;font-size:14px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.winValue)}</span></td>
</tr></table></td></tr>
</table></td>
<td width="4%"></td>
<td width="22%" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="${C.purple}" style="border-radius:12px;background-image:${G_VAULT};box-shadow:${GLOSS};padding:12px 6px;" align="center">
<span style="display:block;font-size:11px;color:#d8d2ec;font-family:${FONT_HEADING};">${esc(c.statLabel)}</span><span style="display:block;font-size:18px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.statValue)}</span>
</td></tr>${c.pctValue ? `<tr><td height="6"></td></tr><tr><td bgcolor="#32BA7C" style="border-radius:12px;box-shadow:${GLOSS};padding:12px 6px;" align="center">
<span style="display:block;font-size:11px;color:#eafff3;font-family:${FONT_HEADING};">${esc(c.pctLabel)}</span><span style="display:block;font-size:16px;font-weight:800;color:#fff;font-family:${FONT_NUMBER};">${esc(c.pctValue)}</span>
</td></tr>` : ''}</table></td>
</tr></table></td></tr>`;
    case 'costs': {
      const box = (l: string, v: string, accent?: boolean) => `<td width="32%" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${accent ? '#EF852E' : C.lavender}" style="border-radius:12px;${accent ? `background-image:${G_LIVE};` : `border:1px solid ${C.border};`}"><tr><td align="center" style="padding:12px 6px;">
<span style="display:block;font-size:11px;color:${accent ? '#fff' : C.body};font-family:${FONT_HEADING};">${esc(l)}</span>
<span style="display:block;font-size:16px;font-weight:800;color:${accent ? '#fff' : C.purple};font-family:${FONT_NUMBER};">${esc(v)}</span>
</td></tr></table></td>`;
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;"><tr>${box(c.l1, c.v1)}<td width="2%"></td>${box(c.l2, c.v2)}<td width="2%"></td>${box(c.l3, c.v3, true)}</tr></table></td></tr>`;
    }
    case 'success':
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="${C.lavender}" style="border-radius:14px;border:1px solid ${C.border};"><tr><td align="center" style="padding:20px 26px;">
<table border="0" cellpadding="0" cellspacing="0" width="46" height="46" bgcolor="${GREEN}" style="border-radius:50%;box-shadow:${GLOSS};"><tr><td align="center" valign="middle" width="46" height="46"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td></tr></table>
<p style="margin:10px 0 0;font-size:13px;font-weight:600;color:${C.purple};font-family:${FONT_HEADING};">${esc(c.title)}</p>
<p style="margin:2px 0 0;font-size:26px;font-weight:800;color:${C.purple};font-family:${FONT_NUMBER};">${esc(c.value)}</p>
<p style="margin:4px 0 0;font-size:12px;color:${C.body};font-family:${FONT_HEADING};">${esc(c.caption)}</p>
</td></tr></table></td></tr>`;
    case 'columns':
      return `<tr><td align="center" style="padding:0 16px;font-family:${FONT_HEADING};">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;"><tr>
<td width="48%" valign="top" align="center" style="padding:0 6px;">
<p style="margin:0 0 8px;font-size:12px;font-weight:800;color:${C.accent};font-family:${FONT_HEADING};">${esc(c.h1)}</p>
<p style="margin:0;font-size:11px;line-height:1.6;color:${C.body};font-family:${FONT_HEADING};">${hl(c.body1)}</p>
</td>
<td width="4%"></td>
<td width="48%" valign="top" align="center" style="padding:0 6px;">
<p style="margin:0 0 8px;font-size:12px;font-weight:800;color:${C.accent};font-family:${FONT_HEADING};">${esc(c.h2)}</p>
<p style="margin:0;font-size:11px;line-height:1.6;color:${C.body};font-family:${FONT_HEADING};">${hl(c.body2)}</p>
</td>
</tr></table></td></tr>`;
    case 'list': {
      const item = (v: string) => v ? `<tr><td width="14" valign="top" style="font-size:13px;color:${C.dark};font-family:${FONT_HEADING};">•</td><td style="font-size:13px;line-height:1.6;color:${C.dark};font-family:${FONT_HEADING};">${hl(v)}</td></tr>` : '';
      return `<tr><td style="padding:0 16px;font-family:${FONT_HEADING};">
${c.title ? `<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${C.purple};font-family:${FONT_HEADING};">${esc(c.title)}</p>` : ''}
<table border="0" cellpadding="0" cellspacing="0" width="100%">${item(c.i1)}${item(c.i2)}${item(c.i3)}</table>
</td></tr>`;
    }
    default: return '';
  }
}

// ─── Header glass (gradiente consola DetailCard + panel con canto de vidrio) ───
function glassHeader(): string {
  return `<tr><td align="center" valign="middle" bgcolor="${C.purple}" style="background-color:${C.purple};background-image:${G_CONSOLE};padding:30px 24px 26px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:20px;background-image:${B_GLASS_EDGE};"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="middle" style="border-radius:19px;background-color:rgba(255,255,255,0.10);background-image:${GLASS_SHEEN};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.10);padding:26px 22px;">
<img src="https://cdn.vmcsubastas.com/services/mailing/images/vmcsubastas-mail-header.png" style="display:block;margin:0 auto;max-width:100%;height:auto;" alt="VMC Subastas">
</td></tr></table>
</td></tr></table></td></tr>
<tr><td height="4" bgcolor="#ed8936" style="background-image:${G_STRIPE};font-size:1px;line-height:1px;">&nbsp;</td></tr>`;
}

// ─── Pre-footer glass + footer completo (layout original) ───────────────────
function glassFooter(): string {
  const miniRule = (align: string) => `<table border="0" cellpadding="0" cellspacing="0" width="36" align="${align}" style="border-radius:2px;background-image:${G_STRIPE};"><tr><td height="3" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>`;
  const vamosBtn = `<a href="https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador" target="_blank" style="text-decoration:none;"><table border="0" cellspacing="0" cellpadding="0" align="right" style="border-radius:9999px;background-image:${B_PRIMARY};box-shadow:${GLOW_PRIMARY};"><tr><td style="padding:2px;"><table border="0" width="140" cellspacing="0" cellpadding="0"><tr><td width="140" height="38" bgcolor="#3b1782" style="border-radius:9999px;background-image:${G_PRIMARY};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);font-family:${FONT_HEADING};font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:${TXT_SHADOW};" align="center" valign="middle"><b>¡Vamos!</b></td></tr></table></td></tr></table></a>`;
  // consola única compacta (DetailCard): un solo card glass, marca | imagen arriba,
  // hairline interno (.pdetail__hline) y fila de acción con CTA abajo
  return `<tr><td height="4" bgcolor="#ed8936" style="background-image:${G_STRIPE};font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center" width="600" bgcolor="${C.purple}" style="background-color:${C.purple};background-image:${G_CONSOLE};padding:16px 20px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;background-image:${B_GLASS_EDGE};"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-radius:17px;background-color:rgba(255,255,255,0.10);background-image:${GLASS_SHEEN};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);padding:16px 20px;">
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="left" style="font-family:${FONT_HEADING};font-size:20px;font-weight:800;letter-spacing:-0.01em;line-height:1.2;color:#FFFFFF;">VMC Subastas</td></tr>
<tr><td height="8" align="left" valign="bottom">${miniRule('left')}</td></tr>
<tr><td height="5"></td></tr>
<tr><td align="left" style="font-family:${FONT_HEADING};font-size:13px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Despierta al cazador de ofertas que hay en ti!</td></tr>
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
<span style="display:block;font-family:${FONT_HEADING};font-size:15px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:#FFFFFF;">¿Quieres saber más?</span>
<span style="display:block;margin-top:2px;font-family:${FONT_HEADING};font-size:12px;font-weight:500;line-height:1.4;color:#d8d2ec;">¡Visita nuestro <b style="color:#FFFFFF;">Centro de Ayuda!</b></span>
</td>
<td width="14"></td>
<td width="146" valign="middle" align="right">${vamosBtn}</td>
</tr></table>
</td></tr></table>
</td></tr></table>
</td></tr>
<tr bgcolor="#FFFFFF"><td align="center" width="600">
<table border="0" cellpadding="0" cellspacing="0" width="600" align="center"><tr><td width="28"></td><td>
<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
<tr><td height="26"></td></tr>
<tr><td align="center"><a href="https://www.vmcsubastas.com/" target="_blank" style="font-size:24px;font-family:${FONT_BODY};line-height:28px;color:${C.footerLink};text-decoration:none;"><b>www.vmcsubastas.com</b></a></td></tr>
<tr><td height="20"></td></tr>
<tr><td><table width="100%" cellpadding="0" cellspacing="0"><tr>
<td valign="top"><table cellpadding="0" cellspacing="0">
<tr><td><a href="https://www.subascars.com/quienes-somos" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};text-decoration:none;font-weight:700;">Quienes somos</a></td></tr>
<tr><td><a href="https://www.subascars.com/" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};text-decoration:none;font-weight:700;">SubasCars</a></td></tr>
<tr><td><a href="https://www.subascars.com/como-vender-mi-auto-en-peru" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};text-decoration:none;font-weight:700;">¿Cómo vender?</a></td></tr>
<tr><td><a href="https://www.vmcsubastas.com/login?redirect_after_to=/zona" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};text-decoration:none;font-weight:700;">¿Cómo obtener acceso ilimitado a las subastas?</a></td></tr>
<tr><td><a href="https://blog.subascars.com/" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};text-decoration:none;font-weight:700;">SubasBlog: La guía definitiva de subastas y venta de autos</a></td></tr>
</table></td>
<td width="15%"></td>
<td valign="top"><table cellpadding="0" cellspacing="0">
<tr><td align="right"><a href="https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:28px;color:${C.dark};text-decoration:none;font-weight:700;">Contáctanos</a></td></tr>
<tr><td align="right"><a href="https://www.vmcsubastas.com/condiciones-y-terminos" target="_blank" style="font-size:9px;font-family:${FONT_BODY};line-height:28px;color:${C.dark};text-decoration:none;font-weight:700;">Condiciones y Términos</a></td></tr>
<tr><td align="center" style="font-size:9px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};font-weight:400;">Encuéntranos en:</td></tr>
<tr align="right"><td>
<a href="https://www.facebook.com/vmcsubastas" target="_blank"><img src="https://cdn.vmcsubastas.com/services/boletin/2025-09-08/assets/facebook.png" style="max-width:20px;height:auto;margin-right:5px;" alt="VMC"></a>
<a href="https://www.youtube.com/channel/UCedBvYb6zP27x2u-t-Wk-qQ" target="_blank"><img src="https://cdn.vmcsubastas.com/services/boletin/2025-09-08/assets/youtube.png" style="max-width:20px;height:auto;margin-right:5px;" alt="VMC"></a>
<a href="https://x.com/vmcsubastas" target="_blank"><img src="https://cdn.vmcsubastas.com/services/boletin/2025-09-08/assets/twitter.png" style="max-width:20px;height:auto;margin-right:5px;" alt="VMC"></a>
<a href="https://www.instagram.com/vmcsubastas/" target="_blank"><img src="https://cdn.vmcsubastas.com/services/boletin/2025-09-08/assets/instagram.png" style="max-width:20px;height:auto;" alt="VMC"></a>
</td></tr>
</table></td>
</tr></table></td></tr>
<tr><td height="20"></td></tr>
<tr><td align="center" style="font-size:8px;font-family:${FONT_BODY};line-height:13px;color:${C.dark};">El presente correo se envía de acuerdo a la Ley N° 28493 que regula el Uso de Correo Comercial sin ser solicitado y su reglamento. Si deseas dejar de recibir estos correos, haz clic en: <a href="https://services.subastop.com/subscribers/unsubscribe" style="font-weight:bold;text-decoration:none;color:${C.dark};" target="_blank">REMOVER SUSCRIPCIÓN</a></td></tr>
<tr><td height="8"></td></tr>
<tr><td align="center" style="font-size:8px;font-family:${FONT_BODY};line-height:22px;color:${C.dark};">2026 VMC Subastas. Todos los derechos reservados.</td></tr>
<tr><td height="24"></td></tr>
</table></td><td width="28"></td></tr></table></td></tr>`;
}

export function generateEmail(sections: Section[], title: string = 'VMC Subastas'): string {
  const body = sections.map(renderSection).join('\n');
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta property="og:title" content="${esc(title)}">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color:${C.bg}!important;margin:0;padding:0;">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0;padding:0;width:100%;">
<tr><td align="center" valign="top">
<table border="0" width="${CONTAINER_W}" cellspacing="0" cellpadding="0" align="center" bgcolor="${C.white}" style="padding:20px;">
${glassHeader()}
<tr><td height="20"></td></tr>
${body}
${glassFooter()}
</table>
</td></tr>
</table>
</center>
</body>
</html>`;
}
