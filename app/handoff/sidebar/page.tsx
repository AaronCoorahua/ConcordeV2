/**
 * /handoff/sidebar
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Sidebar)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/sidebar/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Sidebar/Sidebar.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Sidebar.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./Sidebar";
export type { SidebarProps, SidebarSection, SidebarItem } from "./Sidebar";
`;

const USAGE = `// Data-driven: pasa tus secciones e ítems (icono + label + activo)
<Sidebar
  logo={<span style={{ fontWeight: 700 }}>Subastop</span>}
  sections={[
    {
      items: [
        { label: "Hoy", icon: <CalendarIcon />, active: true },
        { label: "Tienda", icon: <DollarIcon />, href: "/tienda" },
        { label: "Categorías", icon: <StarIcon /> },
      ],
    },
    {
      label: "Soporte",
      items: [{ label: "Centro de ayuda", icon: <HelpIcon />, href: "/ayuda" }],
    },
  ]}
/>

// Sin "sections" usa el set del diseño (Hoy · Tienda · Categorías · Empresas · Soporte)
<Sidebar logo="Subastop" />

// No controlado (estado interno)
<Sidebar defaultCollapsed />

// Controlado (collapsed + onToggle)
const [collapsed, setCollapsed] = useState(false);
<Sidebar collapsed={collapsed} onToggle={(c) => setCollapsed(c)} />`;

export default function SidebarHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Sidebar",
    description:
      "Nav lateral oscuro 226px colapsable a 64px. Header con botón hamburguesa + slot de logo; secciones con etiqueta opcional e ítems (icono + label + chevron). Ítem activo resaltado. Data-driven, controlado o no controlado.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Sidebar.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, data-driven, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import Sidebar from "@/src/components/Sidebar/Sidebar";',
      'import Sidebar from "@/src/components/Sidebar";',
    ],
    usage: USAGE,
    props: [
      { prop: "sections", type: "SidebarSection[]", def: "set del diseño", note: "Secciones del menú; si se omite usa el set del diseño (Hoy, Tienda, Categorías, Empresas, Soporte)." },
      { prop: "logo", type: "ReactNode", def: "—", note: "Contenido del logo en el header (texto, <img>, etc.). Se oculta al colapsar." },
      { prop: "collapsed", type: "boolean", def: "—", note: "Colapsado (controlado). Su presencia activa el modo controlado." },
      { prop: "defaultCollapsed", type: "boolean", def: "false", note: "Colapsado inicial (no controlado)." },
      { prop: "onToggle", type: "(collapsed: boolean) => void", def: "—", note: "Callback al pulsar la hamburguesa; recibe el próximo estado." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .psidebar." },
    ],
    variants: [
      { name: "expandido", cssClass: ".psidebar", size: "226px", note: "Labels, chevron y etiquetas de sección visibles." },
      { name: "colapsado", cssClass: ".psidebar--collapsed", size: "64px", note: "Solo iconos; oculta labels, chevron, etiquetas de sección y logo." },
    ],
    states: [
      { state: "item hover", selector: ".psidebar__item:hover", transform: "—", effects: "background rgba(255,255,255,0.06)." },
      { state: "item activo", selector: ".psidebar__item--active", transform: "—", effects: "background rgba(255,255,255,0.07) · borde rgba(174,142,255,0.55) · color #fff · icono opacity 1 · aria-current=\"page\"." },
      { state: "burger hover", selector: ".psidebar__burger:hover", transform: "—", effects: "background rgba(255,255,255,0.08)." },
      { state: "focus teclado", selector: ":focus-visible", transform: "—", effects: "outline 2px rgba(174,142,255,0.8) offset 2px (ítem y hamburguesa)." },
      { state: "colapsado", selector: ".psidebar--collapsed", transform: "width 226→64px", effects: "Oculta labels, chevron, etiquetas de sección y logo; ítems centrados · title con el label." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion)", transform: "—", effects: "transition: none." },
    ],
    tokens: [
      { zone: "Fondo", token: "linear-gradient(180deg, #2F2173 → #271A60)" },
      { zone: "Texto", token: "rgba(255,255,255,0.85)" },
      { zone: "Icono", token: "opacity 0.65 (activo 1)" },
      { zone: "Borde activo", token: "rgba(174,142,255,0.55)" },
      { zone: "Chevron", token: "opacity 0.4" },
      { zone: "Etiqueta de sección", token: "rgba(255,255,255,0.35)" },
      { zone: "Focus ring", token: "rgba(174,142,255,0.8)" },
    ],
    qa: [
      "Renderiza todas las secciones e ítems (icono + label + chevron) del set provisto o por defecto.",
      "Colapsar/expandir (hamburguesa) oculta/muestra labels, chevron y etiquetas de sección.",
      "El ítem con active resalta (fondo + borde lila + color #fff + icono opacity 1).",
      "Ítem con href renderiza <a> (con aria-current=\"page\" si activo); sin href renderiza <button>.",
      "Modo controlado (collapsed + onToggle) refleja el estado en el padre.",
      "Modo no controlado (defaultCollapsed) gestiona el estado interno sin onToggle.",
      "Navegación por teclado muestra el focus ring (focus-visible) en ítems y hamburguesa.",
      "aria-current=\"page\" en el ítem activo y aria-expanded coherente en la hamburguesa.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
    ],
    sourcePath: "src/components/Sidebar/Sidebar.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Sidebar</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — nav lateral oscuro{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>226px</code>{" "}
          colapsable a{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>64px</code>, data-driven, controlado o no controlado.
        </p>
      </div>

      {/* Preview interactivo */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="Sidebar.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/Sidebar/Sidebar.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
