/**
 * /handoff/detailcard
 * Generado por Concorde — NO EDITAR (regenerar con /concorde DetailCard)
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
    return readFileSync(join(process.cwd(), "src/components/DetailCard/DetailCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer DetailCard.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./DetailCard";
export type { DetailCardProps, DetailCardVariant } from "./DetailCard";
`;

const USAGE = `<DetailCard
  variant="live"
  day="LUNES 04"
  time="11:11 pm"
  views={11}
  likes={11}
  participants={11}
  title="¡Oportunidad para el que sabe!"
  priceLabel="Precio Base:"
  price="US$ 12,999"
  liked={liked}
  onLikeChange={setLiked}
  ctaLabel="Participa"
  onParticipate={() => join()}
/>

<DetailCard
  variant="negotiable"
  ctaLabel="Negocia ahora"
  liked={liked}
  onLikeChange={setLiked}
  onParticipate={() => negotiate()}
/>`;

export default function DetailCardHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "DetailCard",
    description:
      "Tarjeta de detalle de oferta: header oscuro (Inicia/Cierra + fecha/hora + LikeButton + 3 stats) sobre cuerpo blanco (título + botón Participa/Negocia + Precio Base con gema + comisión). En negotiable añade el banner teal automático y la etiqueta «Cierra». Precio en color gema #4C1EBC.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "DetailCard.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, 2 variantes, botón animado, LikeButton + PriceIcon).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import DetailCard from "@/src/components/DetailCard/DetailCard";',
      'import DetailCard, { type DetailCardProps } from "@/src/components/DetailCard";',
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: '"live" | "negotiable"', def: '"live"', note: "Acento del botón y banner" },
      { prop: "startLabel", type: "string", def: '"Inicia" / "Cierra"', note: "«Cierra» auto en negotiable" },
      { prop: "bannerText", type: "string", def: "auto / \"\"", note: 'Banner teal; "" lo oculta' },
      { prop: "day", type: "string", def: '"LUNES 04"', note: "Fecha del header" },
      { prop: "time", type: "string", def: '"11:11 pm"', note: "Hora del header" },
      { prop: "views", type: "number | string", def: "11", note: "Stat de vistas" },
      { prop: "likes", type: "number | string", def: "11", note: "Stat de likes" },
      { prop: "participants", type: "number | string", def: "11", note: "Stat de participantes" },
      { prop: "title", type: "string", def: '"¡Oportunidad para el que sabe!"', note: "Título del cuerpo" },
      { prop: "priceLabel", type: "string", def: '"Precio Base:"', note: "Etiqueta del precio" },
      { prop: "price", type: "string", def: '"US$ 12,999"', note: "Precio formateado" },
      { prop: "commission", type: "string", def: '"Comisión: 7.5%…"', note: "Texto de comisión" },
      { prop: "liked", type: "boolean", def: "—", note: "Estado controlado del like" },
      { prop: "onLikeChange", type: "(active: boolean) => void", def: "—", note: "Callback del LikeButton" },
      { prop: "ctaLabel", type: "string", def: '"Participa"', note: "Texto del botón" },
      { prop: "onParticipate", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Click del botón" },
    ],
    variants: [
      { name: "live", cssClass: ".pdetail--live", size: "311 × 390", note: "Botón naranja→lila, sin banner, «Inicia»" },
      { name: "negotiable", cssClass: ".pdetail--negotiable", size: "311 × 450", note: "Banner teal + «Cierra» + botón teal→lila" },
    ],
    states: [
      { state: "hover", selector: ".pdetail__cta:hover", transform: "translateY(-2px) scale(1.02)", effects: "Glow + giro de gradiente a 220deg" },
      { state: "active", selector: ".pdetail__cta:active", transform: "scale(0.97) translateY(1px)", effects: "Inset oscuro, color #d1d5dc" },
      { state: "focus-visible", selector: ".pdetail__cta:focus-visible", transform: "scale(0.98)", effects: "Ring 3px rgba(132,96,229,0.45)" },
    ],
    tokens: [
      { zone: "Header (gradiente)", token: "#5F3ED8 → #340091 → #140046" },
      { zone: "Botón live", token: "#ED8936 → #8460E5" },
      { zone: "Botón negotiable", token: "#00AEB1 → #8460E5" },
      { zone: "Banner teal", token: "#00DAE0 → #008688" },
      { zone: "Precio (gema)", token: "#4C1EBC" },
      { zone: "Título / comisión", token: "#191C1C" },
    ],
    qa: [
      "Renderiza ambas variantes (live y negotiable) sin errores.",
      "El banner teal aparece SOLO en negotiable (no en live).",
      "La etiqueta «Cierra» aparece en negotiable; «Inicia» en live.",
      "El LikeButton es clickeable y refleja el estado controlado `liked`.",
      "El botón Participa/Negocia responde a hover (glow) y press (inset).",
      "focus-visible muestra el ring de foco al navegar con teclado.",
      "Tipografía de título/precio/comisión: 12px / 400 / line-height 16px.",
      "El precio usa el color gema #4C1EBC junto al PriceIcon.",
    ],
    sourcePath: "src/components/DetailCard/DetailCard.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>DetailCard</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — tarjeta de detalle de oferta (311 de ancho) con header oscuro, LikeButton, 3 stats,
          botón animado Participa/Negocia y precio con gema. 2 variantes: <strong>live</strong> y <strong>negotiable</strong>.
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
        filename="DetailCard.tsx"
        note="Visual de Figma + animación de Concorde. Pégalo como src/components/DetailCard/DetailCard.tsx y úsalo tal cual (requiere LikeButton y PriceIcon)."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
