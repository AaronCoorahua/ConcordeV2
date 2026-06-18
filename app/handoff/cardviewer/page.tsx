/**
 * /handoff/cardviewer
 * Generado por Concorde — NO EDITAR (regenerar con /concorde CardViewer)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CardViewer from "@/src/components/CardViewer/CardViewer";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

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

const USAGE = `import CardViewer from "@/components/CardViewer/CardViewer";

// No controlado · arranca en defaultIndex (0)
<CardViewer images={["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg"]} />

// Variante negotiable · índice inicial 2 · callback de selección
<CardViewer
  variant="negotiable"
  images={["/a.jpg", "/b.jpg", "/c.jpg"]}
  defaultIndex={2}
  onSelect={(i) => console.log("seleccionada", i)}
/>

// Controlado · el padre dueño del índice + expandir
<CardViewer
  images={imgs}
  selectedIndex={current}
  onSelect={setCurrent}
  onExpand={() => openLightbox()}
/>`;

const HTML_TREE = `div.pcardv
├─ div.pcardv__viewer
│  ├─ img.pcardv__img
│  ├─ button.pcardv__expand   (glass · ampliar)
│  ├─ button.pcardv__prev     (glass · ‹)
│  ├─ button.pcardv__next     (glass · ›)
│  └─ span.pcardv__count      (n/total)
└─ div.pcardv__strip          (drag-to-scroll)
   └─ button.pcardv__thumb[]  (miniatura · activa = aro gradiente)`;

const DEMO_IMAGES = ["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"];

export default function CardViewerHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "CardViewer",
    description:
      "Visor de imagen 443×362 con esquinas superiores rectas y inferiores redondeadas 16px, controles glass (expandir · ‹ · › · contador) y filmstrip de miniaturas drag-to-scroll debajo; click en miniatura cambia la imagen grande, la activa lleva aro gradiente. Compone ImageViewer + Filmstrip del Figma VOYAGER en una sola unidad.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "CardViewer.tsx",
        code: source,
        level: "must",
        desc: "Visor + filmstrip self-contained (CSS-in-JS); drag-scroll, selección controlada/no controlada, top recto + bottom 16px",
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
    htmlTree: HTML_TREE,
    props: [
      { prop: "variant", type: '"live" | "negotiable"', def: '"live"', note: "Color del aro de selección" },
      { prop: "images", type: "string[]", def: "[]", note: "URLs del visor + miniaturas" },
      { prop: "imageAlt", type: "string", def: '""', note: "Alt de la imagen grande" },
      { prop: "selectedIndex", type: "number", def: "—", note: "Índice controlado (0-based)" },
      { prop: "defaultIndex", type: "number", def: "0", note: "Índice inicial (no controlado)" },
      { prop: "onSelect", type: "(index: number) => void", def: "—", note: "Cambio de imagen (miniatura o ‹/›)" },
      { prop: "onExpand", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click en botón expandir" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pcardv" },
    ],
    variants: [
      {
        name: "live",
        cssClass: ".pcardv--live",
        size: "443×362",
        note: "Aro de la miniatura activa: gradiente naranja→lila (white → #F4AC59 → #8460E5 → white).",
      },
      {
        name: "negotiable",
        cssClass: ".pcardv--negotiable",
        size: "443×362",
        note: "Aro de la miniatura activa: gradiente teal→lila (white → #4DDCDC → #6445DF → white).",
      },
    ],
    states: [
      { state: "Default", selector: ".pcardv__thumb", transform: "—", effects: "Miniatura sin aro; visor muestra la imagen activa." },
      { state: "Hover miniatura", selector: ".pcardv__thumb:hover", transform: "—", effects: "Ring de preview (inset) indicando que es clicable." },
      { state: "Selected", selector: ".pcardv__thumb--selected", transform: "—", effects: "Aro gradiente de 3px encima (no cambia tamaño)." },
      { state: "Drag-to-scroll", selector: ".pcardv__strip--dragging", transform: "scrollLeft", effects: "Arrastre horizontal del filmstrip; no dispara click." },
      { state: "Flechas ‹/›", selector: ".pcardv__prev / .pcardv__next", transform: "scale(0.92) active", effects: "Ciclan la imagen (wrap-around módulo total)." },
      { state: "Focus", selector: ":focus-visible", transform: "—", effects: "Outline accesible en botones y miniaturas." },
    ],
    tokens: [
      { zone: "Visor", token: "443×362 · radius 0 0 16px 16px" },
      { zone: "Miniatura", token: "113×84 · radius 4px" },
      { zone: "Sombra", token: "rgba(0,0,0,0.1) 0px 0px 16px 4px" },
      { zone: "Controles glass", token: "rgba(0,0,0,0.5) + backdrop-blur 2px" },
      { zone: "Aro live", token: "linear-gradient(120deg, #fff, #F4AC59 25%, #8460E5 75%, #fff)" },
      { zone: "Aro negotiable", token: "linear-gradient(120deg, #fff, #4DDCDC 25%, #6445DF 75%, #fff)" },
    ],
    qa: [
      "Esquinas superiores rectas + inferiores redondeadas 16px en el visor.",
      "Controles glass (expandir · ‹ · › · contador) visibles con blur sobre la imagen.",
      "Contador n/total correcto y sincronizado con la imagen activa.",
      "Click en miniatura cambia la imagen grande y mueve el aro gradiente.",
      "Drag-to-scroll en el filmstrip no dispara el click de la miniatura.",
      "Flechas ‹/› ciclan (wrap-around) en ambos extremos.",
      "Foco accesible (outline) en botones y miniaturas.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/CardViewer/CardViewer.tsx",
  };

  const previewBg = "#f8fafc";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>CardViewer</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — visor 443×362 (top recto + bottom 16px) con controles glass y filmstrip drag-to-scroll; la miniatura activa lleva aro gradiente (live / negotiable). Extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · CardViewer
          </code>
        </p>
      </div>

      {/* Preview — CardViewer es "use client", se renderiza directo en el page server */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo claro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>click en miniatura · arrastra el filmstrip · live · negotiable</span>
        </div>
        <div style={{ padding: "40px 32px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>variant=&quot;live&quot;</span>
            <CardViewer images={DEMO_IMAGES} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>variant=&quot;negotiable&quot;</span>
            <CardViewer variant="negotiable" images={DEMO_IMAGES} />
          </div>
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="CardViewer.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde (visor + filmstrip enlazados). Pégalo como src/components/CardViewer/CardViewer.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
