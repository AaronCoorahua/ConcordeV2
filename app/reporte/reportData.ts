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
    title: "Sidebar — delay al colapsar/expandir",
    date: "17 jul 2026",
    status: "corregido",
    originalImage: [
      "/assets/reporte/sidebar-delay-colapso-original-1.png",
      "/assets/reporte/sidebar-delay-colapso-original-2.png",
      "/assets/reporte/sidebar-delay-colapso-original-3.png",
    ],
    concordeImage: "/assets/reporte/sidebar-delay-colapso-concorde.png",
    concordeEmbed: "/blocks/sidebar/embed",
    problem: [
      "El panel expandido lleva delay-[400ms] en su transición de opacidad: al volver a abrir, la opacidad espera 400ms antes de animar → ese retardo es el delay visible.",
      "Al cerrar usa delay-0 duration-0 (instantáneo) pero al abrir no, así que el colapso y la expansión no son simétricos.",
    ],
    fix: [
      "Quitar el delay-[400ms] de la transición de opacidad del panel (o dejarlo en 0) para que al expandir aparezca de inmediato.",
      "En Concorde el colapso/expansión anima solo el ancho, sincronizado, sin delay en la opacidad. Pruébalo en el iframe de al lado.",
    ],
    codeLang: "tsx",
    codeOriginal: `// PROD — el panel expandido tiene delay-[400ms] en la opacidad
<div className="opacity-100 transition-opacity duration-[250ms] delay-[400ms]
                peer-checked/dc:opacity-0 peer-checked/dc:delay-0 peer-checked/dc:duration-0">
//                            ▲ al ABRIR espera 400ms → delay visible
//   (al cerrar: delay-0 duration-0 = instantáneo → asimétrico)`,
    codeConcorde: `// Concorde — el colapso/expansión anima solo el ancho, sincronizado y sin delay
const EASE = "cubic-bezier(0.4,0,0.2,1)";

.sb-root      { transition: width 0.28s \${EASE}; }
.sbi-trailing { transition: opacity 0.28s \${EASE}, max-width 0.28s \${EASE}; }
//              ▲ sin delay → aparece a la vez que se expande el ancho

@media (prefers-reduced-motion: reduce) {
  .sb-root, .sbi-trailing { transition: none; }
}
// → abre y cierra simétrico, sin el salto de 400ms. Compruébalo en el iframe.`,
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
