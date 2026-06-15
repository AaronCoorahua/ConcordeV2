/**
 * /handoff/cardviewer
 * Generado por Concorde — NO EDITAR (regenerar con /concorde CardViewer)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";
import Preview from "./Preview";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CardViewer/CardViewer.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CardViewer.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./CardViewer";
export type { CardViewerProps, CardViewerVariant } from "./CardViewer";
`;

const USAGE = `import CardViewer from "@/src/components/CardViewer";

const images = Array.from({ length: 11 }, () => "/foto-del-carro.jpg");

// No controlado — gestiona su propio índice
<CardViewer variant="live" images={images} />

// Controlado — tú manejas el índice
const [index, setIndex] = useState(0);
<CardViewer
  variant="negotiable"
  images={images}
  selectedIndex={index}
  onSelect={setIndex}
  onExpand={() => openLightbox(index)}
/>`;

export default function CardViewerHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "CardViewer",
    description:
      "Visor de imagen 443×362 (controles glass: ampliar · ‹ · › · contador) CON su tira de miniaturas debajo, como una sola unidad. Click en una miniatura cambia la imagen grande al instante (estado interno). 2 variantes por el borde de la miniatura seleccionada: live (naranja/lila) y negotiable (teal/lila).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "CardViewer.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, drag-to-scroll, estado interno, zero deps).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import CardViewer from "@/src/components/CardViewer/CardViewer";',
      'import CardViewer from "@/src/components/CardViewer";',
    ],
    usage: USAGE,
    htmlTree: `<div class="pcardv pcardv--live">
  <!-- visor de imagen -->
  <div class="pcardv__viewer">
    <img class="pcardv__img" />
    <button class="pcardv__btn pcardv__btn--round pcardv__expand"> <svg/> </button>
    <button class="pcardv__btn pcardv__btn--round pcardv__prev">   <svg/> </button>
    <button class="pcardv__btn pcardv__btn--round pcardv__next">   <svg/> </button>
    <span class="pcardv__count">1/11</span>
  </div>
  <!-- tira de miniaturas (drag-to-scroll) -->
  <div class="pcardv__strip">
    <button class="pcardv__thumb pcardv__thumb--selected"><img/></button>
    <button class="pcardv__thumb"><img/></button>
    ...
  </div>
</div>`,
    props: [
      { prop: "variant", type: '"live" | "negotiable"', def: '"live"', note: "Borde de la miniatura seleccionada" },
      { prop: "images", type: "string[]", def: '["","","",""]', note: "URLs (visor + miniaturas)" },
      { prop: "imageAlt", type: "string", def: '""', note: "Alt de la imagen grande" },
      { prop: "selectedIndex", type: "number", def: "—", note: "Controlado (0-based)" },
      { prop: "defaultIndex", type: "number", def: "0", note: "Índice inicial (no controlado)" },
      { prop: "onSelect", type: "(index: number) => void", def: "—", note: "Cambio de imagen (miniatura o ‹/›)" },
      { prop: "onExpand", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click en ampliar" },
      { prop: "className", type: "string", def: '""', note: "Clases extra" },
    ],
    variants: [
      { name: "live", cssClass: ".pcardv--live", size: "443 × 461", note: "Miniatura sel.: white → #F4AC59 → #8460E5 → white" },
      { name: "negotiable", cssClass: ".pcardv--negotiable", size: "443 × 461", note: "Miniatura sel.: white → #4DDCDC → #6445DF → white" },
    ],
    states: [
      { state: "thumb seleccionado", selector: ".pcardv__thumb--selected", transform: "—", effects: "padding 3px + borde gradiente (por variante) + sombra" },
      { state: "thumb hover", selector: ".pcardv__thumb:hover", transform: "translateY(-1px)", effects: "lift" },
      { state: "thumb active", selector: ".pcardv__thumb:active", transform: "scale(0.98)", effects: "press" },
      { state: "strip drag", selector: ".pcardv__strip--dragging", transform: "—", effects: "cursor grabbing, pointer-events off en thumbs (no selecciona al arrastrar)" },
      { state: "btn hover", selector: ".pcardv__btn:hover", transform: "—", effects: "glass background rgba(0,0,0,0.65)" },
      { state: "btn focus", selector: ".pcardv__btn:focus-visible", transform: "—", effects: "outline 2px #fff" },
    ],
    tokens: [
      { zone: "Fondo del visor", token: "#F2F4F3" },
      { zone: "Botones glass", token: "rgba(0,0,0,0.5) + backdrop-blur(2px)" },
      { zone: "Sombra (visor + thumb sel.)", token: "rgba(0,0,0,0.1) 0 0 16px 4px" },
      { zone: "Borde sel. live", token: "#ffffff → #F4AC59 → #8460E5 → #ffffff" },
      { zone: "Borde sel. negotiable", token: "#ffffff → #4DDCDC → #6445DF → #ffffff" },
      { zone: "Focus thumb", token: "#8460E5" },
    ],
    qa: [
      "Renderiza ambas variantes (live y negotiable) sin errores.",
      "Click en una miniatura cambia la imagen grande y el contador (n/total) al instante.",
      "Los chevrons ‹ › recorren las imágenes con wrap (vuelven al inicio/fin).",
      "La tira hace drag-to-scroll; arrastrar NO selecciona una miniatura (umbral 4px).",
      "La miniatura seleccionada muestra el borde gradiente correcto según la variante.",
      "Modo controlado (selectedIndex + onSelect) y no controlado (defaultIndex) funcionan.",
      "Botones glass: hover oscurece, focus-visible muestra outline blanco, active escala.",
      "prefers-reduced-motion: reduce desactiva transiciones de botones y miniaturas.",
      "Sin FOUC — estilos presentes en SSR vía dangerouslySetInnerHTML.",
    ],
    sourcePath: "src/components/CardViewer/CardViewer.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>CardViewer</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — visor de imagen + su tira de miniaturas como <strong>un solo componente</strong>:
          click en una miniatura cambia la imagen grande. 2 variantes: <strong>live</strong> y <strong>negotiable</strong>.
        </p>
      </div>

      {/* Preview interactivo (client component) */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="CardViewer.tsx"
        note="Visual de Figma + interacción de Concorde (visor + filmstrip enlazados). Pégalo como src/components/CardViewer/CardViewer.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
