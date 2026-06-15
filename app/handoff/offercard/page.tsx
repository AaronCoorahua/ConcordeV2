/**
 * /handoff/offercard
 * Generado por Concorde — NO EDITAR (regenerar con /concorde OfferCard)
 */

import type { CSSProperties, JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import OfferCard from "@/src/components/OfferCard/OfferCard";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";
import OfferCardInteractivePreview from "./Preview";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/OfferCard/OfferCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer OfferCard.tsx en build.";
  }
}

const INDEX_TS = `export { default as OfferCard } from "./OfferCard";
export type { OfferCardProps, OfferCardVariant } from "./OfferCard";
`;

const USAGE = `import OfferCard from "@/components/OfferCard/OfferCard";
import BadgeStatus from "@/components/BadgeStatus/BadgeStatus";

// EN VIVO — pprice + precio + like
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  badge={<BadgeStatus variant="live" />}
  imageSrc="/img/bronco.jpg"
  onClick={() => router.push("/subasta/123")}
/>

// NEGOCIABLE — solo like, sin precio
<OfferCard
  variant="negotiable"
  name="Toyota Hilux"
  year="2022"
  badge={<BadgeStatus variant="proxima" />}
  onClick={() => router.push("/subasta/456")}
/>

// ELEVATED — sombra "card" de Figma (Blur 16 · Spread 4 · #000 10%)
<OfferCard
  variant="live"
  name="Audi Q3"
  year="2026"
  price="US$ 9,999"
  elevated
/>

// Like controlado
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  liked={liked}
  onLikeChange={setLiked}
/>`;

const HTML_TREE = `<article class="pcard pcard--live">       ← card (170×220, shadow base 7%)
  <div class="pcard__img">                ← imagen 112px + badge slot
    <img />
    <div class="pcard__img-badge">…</div>
  </div>
  <div class="pcard__body">
    <div class="pcard__meta">
      <h3 class="pcard__name">…</h3>
      <p class="pcard__year">…</p>
    </div>
    <div class="pcard__price-row">         ← live: pprice + precio + like
      …
    </div>
    <!-- o, en negotiable: -->
    <div class="pcard__like-row">…</div>    ← solo like
  </div>
</article>`;

function buildSpec(source: string): SpecPanelData {
  return {
    name: "OfferCard",
    description: "Card de oferta de vehículo — variantes live (barra naranja, pprice + precio + like) y negotiable (barra teal, solo like). Self-contained, CSS-in-JS, zero deps.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "OfferCard.tsx",
        code: source,
        level: "must",
        desc: "Componente principal — visual de Figma + interacción de Concorde",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      `import OfferCard from "@/components/OfferCard/OfferCard";`,
      `import { OfferCard } from "@/components/OfferCard";`,
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "variant", type: `"live" | "negotiable"`, note: "Barra inferior + fila precio vs fila like" },
      { prop: "name", type: "string", note: "Nombre del vehículo (truncado con ellipsis)" },
      { prop: "year", type: "string | number", note: "Año (uppercase, letter-spacing)" },
      { prop: "price", type: "string", def: "—", note: 'Precio formateado ("US$ 9,999"). Solo se muestra en live' },
      { prop: "imageSrc", type: "string", def: "—", note: "URL imagen (object-fit: cover)" },
      { prop: "imageAlt", type: "string", def: "name", note: "Alt text de la imagen" },
      { prop: "badge", type: "JSX.Element", def: "—", note: "Pill BadgeStatus en img-badge slot" },
      { prop: "liked", type: "boolean", def: "—", note: "Estado like controlado" },
      { prop: "onLikeChange", type: "(liked: boolean) => void", def: "—", note: "Callback al alternar like" },
      { prop: "onClick", type: "() => void", def: "—", note: "Click en la card (role=button + Enter/Space)" },
      { prop: '"aria-label"', type: "string", def: "name", note: "Aria label de la card" },
      { prop: "interactive", type: "boolean", def: "true", note: "false → showcase estático, sin hover/press" },
      { prop: "elevated", type: "boolean", def: "false", note: "Sombra card de Figma (Blur16 · Spread4 · #000 10%)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra" },
    ],
    variants: [
      { name: "live", cssClass: ".pcard--live", size: "170×220", note: "Barra naranja · pprice + precio + like" },
      { name: "negotiable", cssClass: ".pcard--negotiable", size: "170×220", note: "Barra teal · solo like (sin precio)" },
      { name: "elevated", cssClass: ".pcard--elevated", size: "170×220", note: "Sombra 10% · box-shadow 0 0 16px 4px rgba(0,0,0,0.1)" },
      { name: "static", cssClass: ".pcard--static", size: "170×220", note: "interactive=false · sin hover/press" },
    ],
    states: [
      { state: "hover (card)", selector: ".pcard:hover", transform: "translateY(-3px)", effects: "box-shadow oklch(0.22 0.18 285 / 0.12) 0 12px 20px" },
      { state: "hover (like)", selector: ".pcard-like:hover", transform: "scale(1.1) translateY(-1px)", effects: "box-shadow rgba(32,0,104,0.2) 0 6px 14px" },
      { state: "active (like)", selector: ".pcard-like:active", transform: "scale(0.92)", effects: "press feedback" },
      { state: "liked", selector: ".pcard-like--active", effects: "fill morado + heart-pop 0.38s + glow" },
      { state: "focus-visible (like)", selector: ".pcard-like:focus-visible", effects: "outline 2px oklch(0.62 0.20 285)" },
    ],
    tokens: [
      { zone: "Sombra base (card)", token: "rgba(0,0,0,0.07) 0 0 16px 4px" },
      { zone: "Sombra elevated", token: "rgba(0,0,0,0.1) 0 0 16px 4px" },
      { zone: "Sombra hover", token: "oklch(0.22 0.18 285 / 0.12) 0 12px 20px" },
      { zone: "Barra live", token: "linear-gradient(90deg, #ff9639, #ef852e, #be3d00)" },
      { zone: "Barra negotiable", token: "linear-gradient(90deg, #00edee, #00d2d3, #009597)" },
      { zone: "Nombre / precio", token: "#4c1ebc" },
      { zone: "Año", token: "#191c1c" },
      { zone: "Like activo", token: "linear-gradient(135deg, #8460e5, #3b1782)" },
    ],
    qa: [
      "Render: live muestra pprice + precio + like; negotiable solo like.",
      "Hover de card: translateY(-3px) y sombra azulada (solo con interactive=true).",
      "Sombra base: box-shadow 0 0 16px 4px rgba(0,0,0,0.07) en reposo.",
      "Sombra elevated: con elevated, box-shadow pasa a rgba(0,0,0,0.1) y se mantiene en hover.",
      "Like toggle: anima heart-pop y alterna fill morado; respeta liked/onLikeChange controlados.",
      "onClick: la card recibe role=button, tabIndex y dispara con Enter/Space.",
      "interactive=false: sin hover/press y like no responde (pointer-events: none).",
      "Accesibilidad: aria-label de card y aria-pressed del like; prefers-reduced-motion desactiva animaciones.",
    ],
    sourcePath: "src/components/OfferCard/OfferCard.tsx",
  };
}

const SECTION_LABEL: CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#64748b",
};

export default function OfferCardHandoffPage(): JSX.Element {
  const source = readComponentSource();
  const spec = buildSpec(source);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>OfferCard</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — card de oferta con 2 variantes (live · negotiable) extraídas de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            voyager-ds.vercel.app
          </code>
        </p>
      </div>

      {/* Preview — publicada (static, sin imagen) */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={SECTION_LABEL}>preview · publicada</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live · negotiable (sin imagen)</span>
        </div>
        <div style={{ padding: "36px 32px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" interactive={false} />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <OfferCard variant="negotiable" name="Audi Q3" year="2026" interactive={false} />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>negotiable</span>
          </div>
        </div>
      </div>

      {/* Preview — elevated */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={SECTION_LABEL}>preview · elevated</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sombra card · X0 Y0 · Blur 16 · Spread 4 · #000 10%</span>
        </div>
        <div style={{ padding: "48px 40px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated interactive={false} />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>elevated (10%)</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/demo/bronco.jpg" interactive={false} />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default (7%)</span>
          </div>
        </div>
      </div>

      {/* Preview — interactivo (hover + like toggle + badge) */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={SECTION_LABEL}>preview · interactivo</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>hover + like toggle + badge</span>
        </div>
        <div style={{ padding: "36px 32px", background: "#f1f5f9" }}>
          <OfferCardInteractivePreview />
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={SECTION_LABEL}>Código del componente</span>
      </div>
      <CodeViewer
        code={source}
        filename="OfferCard.tsx"
        note="Visual de Figma + interacción de Concorde. Pégalo como src/components/OfferCard/OfferCard.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
