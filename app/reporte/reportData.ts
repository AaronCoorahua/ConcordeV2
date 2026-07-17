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
  /** Imagen de referencia (la original / bitácora). Ruta pública, e.g. "/assets/reporte/foo-original.png". */
  originalImage: string;
  /** Imagen del resultado en Concorde. Ruta pública. */
  concordeImage: string;
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
