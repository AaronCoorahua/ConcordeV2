/**
 * reportData.ts — Bitácora de correcciones Original ↔ Concorde.
 *
 * Módulo plano (sin "use client"): lo importa la página server/client sin cruzar
 * la barrera de cliente. Cada entrada del array es UNA corrección.
 *
 * Cómo agregar una corrección:
 *  1. Guarda las 2 imágenes en  public/assets/reporte/<slug>-original.png
 *     y  public/assets/reporte/<slug>-concorde.png
 *  2. Añade un objeto ReportEntry al array REPORT_ENTRIES (el más nuevo arriba).
 *  3. Rellena problem (qué está mal), fix (cómo se corrige) y los dos bloques de código.
 */

export type ReportEntry = {
  /** Identificador único, kebab-case. Se usa como ancla (#slug) y para el nombre de las imágenes. */
  slug: string;
  /** Título corto de la corrección. */
  title: string;
  /** Fecha en formato legible, e.g. "17 jul 2026". */
  date: string;
  /** Etiqueta de estado. */
  status: "corregido" | "en-progreso" | "pendiente";
  /** Imagen(es) de referencia (original / bitácora). Ruta pública o array si son varias. */
  originalImage: string | string[];
  /** Imagen(es) del resultado en Concorde. Ruta pública o array si son varias. */
  concordeImage: string | string[];
  /** Ruta de un bloque real a embeber en iframe en el lado Concorde, EN LUGAR de la imagen. */
  concordeEmbed?: string;
  /** Qué está mal — descripción del problema. Soporta varios párrafos (array de strings). */
  problem: string[];
  /** Cómo se corrige — explicación redactada de la solución. Varios párrafos. */
  fix: string[];
  /** Lenguaje para el resaltado visual del bloque de código, e.g. "tsx", "css". */
  codeLang?: string;
  /** Código original / de referencia. */
  codeOriginal?: string;
  /** Código de Concorde (el que se corrige / corrigió). */
  codeConcorde?: string;
  /** Link al bloque Concorde. Se muestra como "ver código Concorde" en el lado Concorde. */
  codeLink?: string;
};

export const REPORT_ENTRIES: ReportEntry[] = [
  // ────────────────────────────────────────────────────────────────
  // Las entradas se agregan aquí. La más reciente va PRIMERO (arriba).
  // Envíame las imágenes + explicación + código y yo relleno esto.
  // ────────────────────────────────────────────────────────────────
  {
    slug: "register-boton-press-e-input-gradiente",
    title: "Register — botón «Regístrate» sin press e input con gradiente de border distinto",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/register-boton-press-e-input-gradiente-original.png",
    concordeImage: "/assets/reporte/register-boton-press-e-input-gradiente-concorde.png",
    problem: [
      "El botón «Regístrate» (outline) no tiene efecto press: al pulsarlo no cambia de estado.",
      "El gradiente del border de los inputs (Correo/Contraseña) es distinto al de Concorde.",
    ],
    fix: [
      "Usar el botón outline de Concorde (.poutline), que sí trae :active con relleno naranja oscuro.",
      "Aplicar el gradiente de border del input de Concorde: default 338deg #8460E5→#FFF8F1, focus 148deg #ED8936→#8460E5.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — botón e input con clases propias (sin :active, gradiente distinto)
<button type="button" className="login-form__register-link">Regístrate</button>

<div className="relative">
  <input id="email" className="login-form__input" type="email" />
</div>`,
    codeConcorde: `// Concorde — botón .poutline (CON press) + input .pinput (gradiente exacto)
<button className="poutline" type="button" style={{ width: 296 }}>Regístrate</button>

<div className="pinput-root">
  <div className="pinput">
    <input className="pinput__field" type="email" placeholder="tucorreo@gmail.com" />
  </div>
</div>

/* Button.tsx — el press del outline */
.poutline:active {
  background-image:
    linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 55%),
    linear-gradient(156deg, #D46E20 0%, #B73700 100%);   /* relleno pressed */
}

/* Input.tsx — gradiente del border */
.pinput {
  border: 1px solid transparent;
  background-image:
    linear-gradient(#fff, #fff),
    linear-gradient(338deg, #8460E5 0%, #FFF8F1 100%);   /* default */
}
.pinput:focus-within {
  border-width: 2px;
  background-image:
    linear-gradient(#fff, #fff),
    linear-gradient(148deg, #ED8936 0%, #8460E5 100%);   /* focus */
}`,
    codeLink: "/blocks/login",
  },
  {
    slug: "relacionadas-titulo-y-card",
    title: "Ofertas relacionadas — brackets del título mal encajados y cards de otro tamaño",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/relacionadas-titulo-y-card-original.png",
    concordeImage: "/assets/reporte/relacionadas-titulo-y-card-concorde.png",
    problem: [
      "Los brackets (esquinas) del título «OFERTAS RELACIONADAS» no encajan alrededor del texto: el wrapper del título tiene distinto padding que en Concorde.",
      "Las cards internas tienen tamaños distintos: Producción usa grid fluido (pcard--compact), Concorde usa cards fijas 134×170 (pcard--short).",
    ],
    fix: [
      "Igualar el padding del wrapper del título (8px 12px) para que los brackets encajen en las esquinas del texto.",
      "Usar el tamaño de card fijo de Concorde (134×170, imagen 134×112) en un grid de 134px por columna.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — título con padding px-3 py-2 y brackets sueltos + cards en grid fluido
<div className="relative inline-flex flex-col items-start gap-0 px-3 py-2">
  <svg className="absolute left-0 top-0 h-2.5 w-2.5">…bracket tl…</svg>
  <svg className="absolute bottom-0 right-0 h-2.5 w-2.5">…bracket br…</svg>
  <h3 className="text-[14px] font-semibold uppercase">Ofertas relacionadas</h3>
</div>

<div className="grid grid-cols-2 gap-4">
  <article className="pcard pcard--compact">…</article>   {/* tamaño fluido */}
</div>`,
    codeConcorde: `// Concorde — CardTitle (padding 8px 12px, brackets --tl/--br) + cards fijas
<div className="cardtitle">   {/* padding: 8px 12px → brackets encajan */}
  <svg className="cardtitle__bracket cardtitle__bracket--tl">…</svg>
  <h3 className="cardtitle__title">OFERTAS RELACIONADAS</h3>
  <svg className="cardtitle__bracket cardtitle__bracket--br">…</svg>
</div>

<div style={{ display: "grid", gridTemplateColumns: "134px 134px",
              justifyContent: "space-between", rowGap: 8 }}>
  <article className="pcard pcard--short">…</article>   {/* 134×170 · img 134×112 */}
</div>

/* .pcard--short { width: 134px; height: 170px; }
   .pcard--short .pcard__img { height: 112px; } */`,
    codeLink: "/blocks/detalle",
  },
  {
    slug: "detalle-columnas-ancho",
    title: "Detalle — reparto de ancho de columnas distinto al de Concorde",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: [
      "/assets/reporte/detalle-columnas-ancho-original-1.png",
      "/assets/reporte/detalle-columnas-ancho-original-2.png",
      "/assets/reporte/detalle-columnas-ancho-original-3.png",
    ],
    concordeImage: "/assets/reporte/detalle-columnas-ancho-concorde.png",
    problem: [
      "En Producción la columna izquierda (galería) es ~10px más ancha y la derecha (participación) ~10px más angosta de lo que deberían.",
      "El reparto correcto es el de Concorde: izquierda con 10px menos y derecha con 10px más.",
    ],
    fix: [
      "Ajustar el grid para restar 10px a la columna izquierda y sumárselos a la derecha.",
      "En Concorde el reparto ya deja la izquierda −10px y la derecha +10px respecto a Producción.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — grid con fracciones fluidas 3fr / 2fr
<div className="grid grid-cols-1 gap-3
                md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]
                md:items-start">
  <div className="md:col-start-1">…galería (izquierda)…</div>
  <div>…participación (derecha)…</div>
</div>
// las fracciones no dan 443/311 → izquierda ~10px de más, derecha ~10px de menos`,
    codeConcorde: `// Concorde — columnas con ANCHO FIJO: izquierda 443px, derecha 311px
<div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 443 }}>
    {/* galería (AuctionStatus + CardViewer + accordions) */}
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 311 }}>
    {/* participación (DetailCard + pills + banner) */}
  </div>
</div>
// 443 / 311 fijos → izquierda −10px y derecha +10px respecto a PROD`,
    codeLink: "/blocks/detalle",
  },
  {
    slug: "detalle-like-subascoin-pequenos",
    title: "Detalle — like button e ícono Subascoin más pequeños que Concorde",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/detalle-like-subascoin-pequenos-original.png",
    concordeImage: "/assets/reporte/detalle-like-subascoin-pequenos-concorde.png",
    problem: [
      "El like button (♡) de la cabecera es más pequeño: en Producción usa like-button--md con el SVG a 14×14.",
      "El ícono de Subascoin del Precio Base se ve pequeño y comprimido: el SVG usa viewBox con margen negativo (-6 -12 48 56).",
    ],
    fix: [
      "Usar el tamaño grande del like (plike--lg, 40×40) con el corazón a ~21×21.",
      "Ajustar el viewBox del ícono al contenido real (0 0 36 38) y dar width/height fijos, sin margen negativo.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — like chico (md, svg 14) + subascoin con viewBox negativo
<button className="like-button like-button--md">
  <svg width="14" height="14" viewBox="0 0 24 24">♡</svg>
</button>

<div className="… size-10 …">
  <svg className="size-7" viewBox="-6 -12 48 56" overflow="visible">
    {/* margen negativo → ícono chico y comprimido */}
  </svg>
</div>`,
    codeConcorde: `// Concorde — like grande (lg, 40×40) + subascoin con viewBox ajustado
<button className="plike plike--lg" style={{ width: 40, height: 40 }}>
  <svg width="21" height="21" viewBox="0 0 24 24">♡</svg>
</button>

<span className="priceicon">
  <svg width="36" height="38" viewBox="0 0 36 38">
    {/* tamaño real, sin margen negativo → ícono a escala */}
  </svg>
</span>`,
    codeLink: "/blocks/detalle",
  },
  {
    slug: "offercard-viewer-imagen-hover-live",
    title: "OfferCard viewer — tamaño de imagen, hover en miniaturas y color live",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/offercard-viewer-imagen-hover-live-original.png",
    concordeImage: "/assets/reporte/offercard-viewer-imagen-hover-live-concorde.png",
    problem: [
      "La imagen principal no tiene el mismo tamaño: en Producción es h-[362px] fija.",
      "El film de miniaturas no tiene efecto de hover.",
      "La miniatura seleccionada/presionada no tiene el mismo borde naranja (live) que en Concorde.",
    ],
    fix: [
      "Fijar la altura de la imagen principal a 362px, igual que Producción.",
      "Añadir un estado :hover a las miniaturas (borde/ring al pasar el cursor).",
      "Igualar el borde naranja de la miniatura seleccionada/presionada al de Concorde.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — imagen principal 362px fija; miniaturas solo con transition-colors
<div className="relative h-[362px] overflow-hidden rounded-b-[8px] border">
  <img className="h-full w-full object-cover" />
  …flechas · fullscreen · contador 1/21…
</div>

// miniatura: sin hover; el borde de la seleccionada no coincide con Concorde
<button className="aspect-[106/98] rounded-[6px] border border-[#d8d9e3]
                   transition-colors
                   /* seleccionada: */ border-[#ED8936] ring-2 ring-[#F99845]/40">
  <img className="h-full w-full object-cover" />
</button>`,
    codeConcorde: `// Concorde — viewer con altura fija, hover y borde naranja al seleccionar
<div className="pcardv pcardv--live">
  <div className="pcardv__viewer">
    <img className="pcardv__img" />      {/* height: 362px */}
    …prev · next · expand · count…
  </div>
  <div className="pcardv__strip">
    <button className="pcardv__thumb pcardv__thumb--selected"><img/></button>
    <button className="pcardv__thumb"><img/></button>
  </div>
</div>

/* CSS clave */
.pcardv__img   { height: 362px; width: 100%; object-fit: cover; }
.pcardv__thumb { border: 1px solid #d8d9e3; transition: border-color .18s, box-shadow .18s; }
.pcardv__thumb:hover { border-color: #ED8936; box-shadow: 0 0 0 2px rgba(249,152,69,.4); }
/* seleccionada/presionada = borde naranja (live) */
.pcardv__thumb--selected { border-color: #ED8936; box-shadow: 0 0 0 2px rgba(249,152,69,.4); }`,
    codeLink: "/blocks/detalle",
  },
  {
    slug: "pcard-subascoin-alineacion",
    title: "OfferCard — ícono Subascoin pequeño y desalineado del precio",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/pcard-subascoin-alineacion-original.png",
    concordeImage: "/assets/reporte/pcard-subascoin-alineacion-concorde.png",
    problem: [
      "El ícono de Subascoin se ve pequeño y no queda alineado verticalmente con el precio ni con el like button.",
      "El SVG usa un viewBox con margen negativo (-6 -12 48 56) para acomodar filtros/sombras, lo que descentra el ícono dentro de su caja.",
    ],
    fix: [
      "Ajustar el viewBox al contenido real y dar al SVG un width/height fijos, sin margen negativo.",
      "Envolver ícono + precio en un contenedor flex con align-items:center para que ícono, precio y like queden en el mismo eje vertical.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — SVG con viewBox de margen negativo + filtros → ícono chico y descentrado
<div className="pcard__price-row">
  <div className="pcard__price-group">
    <div className="pcard__price-icon-wrap">
      <svg viewBox="-6 -12 48 56" overflow="visible">  {/* ← descentra */}
        …filtros/sombras que agrandan la caja…
      </svg>
    </div>
    <p className="pcard__price">US$ 5,399</p>
  </div>
  <button className="like-button">♡</button>
</div>`,
    codeConcorde: `// Concorde — SVG con viewBox ajustado + flex alineado al centro
<div className="pcard__price-row">
  <div className="pcard__price-left">   {/* flex; align-items:center */}
    <div className="pcard-pprice" aria-hidden="true">
      <svg width="30" height="32" viewBox="30 199 28 30">  {/* ← ajustado */}
        …
      </svg>
    </div>
    <span className="pcard__price-text">US$ 9,999</span>
  </div>
  <button className="pcard-like" aria-label="Agregar a favoritos">♡</button>
</div>

/* CSS clave */
.pcard__price-left { display: flex; align-items: center; gap: 8px; }
// → ícono, precio y like alineados en el mismo eje vertical`,
    codeLink: "/blocks/homepage",
  },
  {
    slug: "card-rounded-border-distinto",
    title: "Cards — border-radius de fondo distintos",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/card-rounded-border-distinto-original.png",
    concordeImage: "/assets/reporte/card-rounded-border-distinto-concorde.png",
    problem: [
      "El border-radius del contenedor de la card no coincide entre superficies: en Producción es 8px y en Concorde 16px.",
      "Al no calzar, las esquinas redondeadas del fondo se ven distintas entre secciones.",
    ],
    fix: [
      "Unificar el radius del contenedor a un solo valor en ambas superficies.",
      "Concorde usa 16px; Producción usa rounded-[8px]. Alinear ambos al mismo token de radius.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — contenedor de la card con radius 8px
<div className="mx-auto mb-4 w-full py-0 md:py-4
                rounded-[8px]           /* ← 8px */
                border border-[rgba(32,0,104,0.07)]
                bg-white shadow-[0_2px_10px_rgba(32,0,104,0.06)]">
  {/* Tipo de oferta + Categorías */}
</div>`,
    codeConcorde: `// Concorde — el mismo contenedor con radius 16px
<section style={{
  width: 766,
  height: 184,
  background: "#ffffff",
  borderRadius: 16,          /* ← 16px (distinto de PROD) */
  boxShadow: "rgba(0,0,0,0.07) 0px 0px 16px 4px",
  padding: "12px 20px",
  display: "flex",
  alignItems: "center",
}}>
  {/* Tipo de oferta */}
  <div>…</div>

  {/* divisor vertical del medio */}
  <div style={{ width: 1, height: 143, background: "#E5E7EB" }} />

  {/* Categorías */}
  <div>…</div>
</section>

// Fix: unificar borderRadius al mismo valor en ambas superficies.`,
    codeLink: "/blocks/homepage",
  },
  {
    slug: "sidebar-delay-colapso",
    title: "Sidebar — la sección no se queda seleccionada en naranja",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/sidebar-delay-colapso-original-3.png",
    concordeImage: "/assets/reporte/sidebar-delay-colapso-concorde.png",
    concordeEmbed: "/blocks/sidebar/embed",
    problem: [
      "En Producción, al hacer click en una subsección el ítem no se queda en naranja (estado seleccionado): el naranja solo aparece mientras está presionado y se pierde al soltar.",
      "En Concorde el ítem sí conserva el estado seleccionado (naranja) tras el click.",
    ],
    fix: [
      "Guardar el ítem activo en estado y aplicarle el estilo naranja de forma persistente, no solo en :active.",
      "Pruébalo en el iframe de al lado: al pulsar un ítem se queda seleccionado en naranja.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — el naranja solo existe en :active (mientras se presiona)
<a className="… active:bg-[linear-gradient(to_bottom,#ff9639,#ef852e,#be3d00)]
              active:text-white">
  {/* al soltar el click, vuelve al estado por defecto → no se queda naranja */}
</a>`,
    codeConcorde: `// Concorde — el ítem activo se guarda en estado y conserva el naranja
const [activeId, setActiveId] = useState(defaultActiveId);

<SidebarItem
  isActive={activeId === item.id}       // ← selección persistente
  onClick={handleItemClick}             // setActiveId(id)
/>

/* estilo del seleccionado (no depende de :active) */
.sbi-item--active {
  background: linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%);
}
.sbi-item--active .sbi-label { color: #FFFFFF; }
// → tras el click el ítem se queda seleccionado en naranja. Compruébalo en el iframe.`,
    codeLink: "/blocks/sidebar",
  },
  {
    slug: "homepage-padding-entre-secciones",
    title: "Homepage — padding entre secciones inconsistente y mayor a 16px",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: [
      "/assets/reporte/homepage-padding-entre-secciones-original-1.png",
      "/assets/reporte/homepage-padding-entre-secciones-original-2.png",
    ],
    concordeImage: "/assets/reporte/homepage-padding-entre-secciones-concorde.png",
    problem: [
      "El contenedor ya aporta gap-4 (16px), pero además cada sección lleva su propio mb-3/mb-4 → los espacios se suman y superan los 16px.",
      "La separación mezcla mb-3 (12px) en los banners y mb-4 (16px) en las secciones de ofertas, así que no es consistente entre bloques.",
    ],
    fix: [
      "Dejar UNA sola fuente de separación: el gap del contenedor. Quitar el mb-3/mb-4 de cada <section>.",
      "Con gap-4 en el padre y sin margin en las secciones, la separación es 16px iguales en todo el homepage.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — el contenedor ya tiene gap-4, y ADEMÁS cada sección lleva mb
<div className="flex flex-1 flex-col gap-4 px-4 pt-4">
  <section className="... mb-3 ...">Banner principal</section>   {/* 16 + 12 */}
  <section className="... mb-3 ...">Subaspass</section>          {/* 16 + 12 */}
  <section className="mb-4 ...">Tipo de oferta / Categorías</section>  {/* 16 + 16 */}
  <section className="mb-4 ...">Empresa industrial</section>    {/* 16 + 16 */}
</div>
// gap (16) + mb-3 (12) = 28px entre banners  ❌
// gap (16) + mb-4 (16) = 32px entre ofertas  ❌  → inconsistente`,
    codeConcorde: `// Concorde — una sola fuente de separación: el gap del padre
<div className="flex flex-1 flex-col gap-4 px-4 pt-4">
  <section>Banner principal</section>
  <section>Subaspass</section>
  <section>Tipo de oferta / Categorías</section>
  <section>Empresa industrial</section>
</div>
// sin mb en las secciones → 16px exactos entre TODAS  ✅`,
    codeLink: "/blocks/homepage",
  },
  {
    slug: "sidebar-alineacion-burger-y-top",
    title: "Sidebar — burger/iconos y top no alineados con el contenido",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/sidebar-alineacion-burger-y-top-original.png",
    concordeImage: "/assets/reporte/sidebar-alineacion-burger-y-top-concorde.png",
    problem: [
      "La hamburguesa (☰) del header no queda alineada con la columna de iconos del sidebar colapsado: caen en ejes X distintos.",
      "El borde superior del marco del sidebar no coincide con el top del contenido/banner de la derecha.",
    ],
    fix: [
      "Alinear el centro de la hamburguesa con la columna de iconos: paddingLeft del header = 20 + medio botón (18) = 38px, mismo centro que el icono colapsado.",
      "Pasar al sidebar el mismo headerHeight del contenido para que el top del marco arranque a la misma altura.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — header con su propio padding, sin coordinar con el sidebar
<div className="mx-auto flex h-14 items-center px-4">
  <label className="h-10 w-10 ...">☰</label>   {/* burger a la izquierda del header */}
  <img src="/logo-voyager.svg" />
</div>

// el sidebar arranca en top:0 con su propio alto de cabecera,
// sin recibir el height del contenido → top desalineado
<aside className="absolute inset-y-0 left-0">
  <nav>…iconos…</nav>
</aside>`,
    codeConcorde: `// Concorde — 1) burger centrada sobre la columna de iconos (SidebarHeader.tsx)
<div
  data-slot="sidebar-header"
  style={{
    height: headerHeight,
    paddingLeft: 20,   // 20 + medio botón (18) = centro 38px = icono colapsado
    paddingRight: 14,
  }}
>
  <button className="psb-toggle">☰</button>
  <div className="sbh-logo">{logo}</div>
</div>

// 2) el Sidebar recibe headerHeight del contenido → top alineado (Sidebar.tsx)
<Sidebar
  height={canvasHeight}
  headerHeight={HEADER_HEIGHT * scale}   // mismo top que el contenido
/>`,
    codeLink: "/blocks/sidebar",
  },
  {
    slug: "sidebar-logo-y-conteo",
    title: "Sidebar — logo pegado al top y sin conteo de ítems",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: "/assets/reporte/sidebar-logo-y-conteo-original.png",
    concordeImage: "/assets/reporte/sidebar-logo-y-conteo-concorde.png",
    problem: [
      "Logo pegado al borde superior del sidebar.",
      "Los ítems padre (Tipo de oferta, Categorías, Empresas) no muestran su conteo: el badge solo aparece en los subítems.",
    ],
    fix: [
      "Dar padding-top al header para separar el logo del top.",
      "Renderizar el badge también en el ítem padre, no solo en subítems.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — 1) HEADER: solo px-4, sin padding vertical → logo pegado al top
<div className="mx-auto flex h-14 items-center justify-between px-4">
  <a href="/" aria-label="Ir al inicio">
    <img src="/assets/brand/logo-voyager.svg" className="h-auto w-[120px]" />
  </a>
</div>

// 2) ÍTEM PADRE: no lleva badge de conteo
<button type="button" aria-label="Tipo de oferta">
  <span>Tipo de oferta</span>
  {/* ❌ sin badge */}
</button>

// el badge solo existe dentro del subítem:
<a href="/en-vivo.html">
  <span>En vivo</span>
  <span className="badge">5</span>
</a>`,
    codeConcorde: `// Concorde — 1) HEADER: pt-3 (padding-top) separa el logo del borde
<div className="mx-auto flex h-14 items-center justify-between px-4 pt-3">
  <a href="/" aria-label="Ir al inicio">
    <img src="/assets/brand/logo-voyager.svg" className="h-auto w-[120px]" />
  </a>
</div>

// 2) ÍTEM PADRE: el badge se emite en el propio ítem (padre incluido)
function SidebarItem({ label, count, isActive }) {
  return (
    <div className="sbi-item">
      <span className="sbi-label">{label}</span>
      {count != null && (
        <SidebarBadge count={count} active={isActive} />  // ✅
      )}
    </div>
  );
}

// dato por ítem:
{ label: "Tipo de oferta", count: 2 }`,
    codeLink: "/blocks/sidebar",
  },
];

/** Busca una entrada por su slug. */
export function getReportEntry(slug: string): ReportEntry | undefined {
  return REPORT_ENTRIES.find((e) => e.slug === slug);
}
