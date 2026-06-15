/**
 * /handoff/imageviewer
 * Generado por Concorde — NO EDITAR (regenerar con /concorde ImageViewer)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import Preview from "./Preview";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ImageViewer/ImageViewer.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ImageViewer.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./ImageViewer";
export type { ImageViewerProps } from "./ImageViewer";
`;

const USAGE = `<ImageViewer
  imageSrc="/foto.jpg"
  imageAlt="Ford Bronco"
  current={1}
  total={11}
  onPrev={prev}
  onNext={next}
  onExpand={openLightbox}
/>`;

export default function ImageViewerHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>ImageViewer</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec & Handoff — visor de imágenes 443×362 con botones glass (expand · prev · next) y contador{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            current/total
          </code>
          . Fuente Figma VOYAGER.
        </p>
      </div>

      {/* Preview — interactivo (client component) */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="ImageViewer.tsx"
        note="Visual de Figma + controles glass de Concorde. Pégalo como src/components/ImageViewer/ImageViewer.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel
        name="ImageViewer"
        description="Visor de imágenes 443×362 con botones glass expand/prev/next y contador current/total."
        source="Figma VOYAGER"
        files={[
          {
            filename: "ImageViewer.tsx",
            code: source,
            level: "must",
            desc: "Componente self-contained (CSS-in-JS, zero deps).",
          },
          {
            filename: "index.ts",
            code: INDEX_TS,
            level: "opt",
            desc: "Barrel export",
          },
        ]}
        imports={[
          'import ImageViewer from "@/src/components/ImageViewer/ImageViewer";',
          'import ImageViewer, { type ImageViewerProps } from "@/src/components/ImageViewer";',
        ]}
        usage={USAGE}
        props={[
          { prop: "imageSrc", type: "string", def: "—", note: "URL de la imagen" },
          { prop: "imageAlt", type: "string", def: '""', note: "Alt de la imagen" },
          { prop: "current", type: "number", def: "1", note: "Índice actual (1-based) para el contador" },
          { prop: "total", type: "number", def: "11", note: "Total de imágenes" },
          { prop: "onPrev", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click en flecha ‹" },
          { prop: "onNext", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click en flecha ›" },
          { prop: "onExpand", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click en botón maximize" },
          { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pviewer" },
        ]}
        states={[
          { state: "hover", selector: ".pviewer__btn:hover", transform: "—", effects: "background rgba(0,0,0,0.65)" },
          { state: "active", selector: ".pviewer__btn:active", transform: "scale(0.92)", effects: "feedback al pulsar" },
          { state: "active (flechas)", selector: ".pviewer__prev:active / .pviewer__next:active", transform: "translateY(-50%) scale(0.92)", effects: "mantiene centrado vertical" },
          { state: "focus-visible", selector: ".pviewer__btn:focus-visible", transform: "—", effects: "outline 2px #fff, offset 2px" },
        ]}
        tokens={[
          { zone: "Botones / contador (glass)", token: "rgba(0,0,0,0.5) + backdrop-blur(2px)" },
          { zone: "Botón hover", token: "rgba(0,0,0,0.65)" },
          { zone: "Fondo placeholder", token: "#F2F4F3" },
          { zone: "Texto / íconos", token: "#ffffff" },
          { zone: "Sombra", token: "rgba(0,0,0,0.1) 0 0 16px 4px" },
        ]}
        qa={[
          "Renderiza el contenedor 443×362 con radius 0 0 4px 4px y la sombra glass.",
          "Con imageSrc, la imagen llena el visor con object-fit: cover; sin imageSrc no rompe.",
          "onPrev se dispara al pulsar la flecha ‹ y onNext al pulsar la flecha ›.",
          "El contador muestra current/total (ej. 1/11) en la esquina inferior derecha.",
          "onExpand se dispara al pulsar el botón maximize (esquina superior derecha).",
          "Los botones glass muestran hover (rgba 0.65) y active (scale 0.92).",
          "focus-visible muestra outline blanco visible vía teclado en los 3 botones.",
          "aria-labels presentes: Ampliar imagen / Imagen anterior / Imagen siguiente.",
        ]}
        sourcePath="src/components/ImageViewer/ImageViewer.tsx"
      />

    </main>
  );
}
