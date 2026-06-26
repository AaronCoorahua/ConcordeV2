import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/detalle/desktop/Detalle";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import Header from "@/app/_components/Header";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";

/**
 * /blocks/detalle — Visor del bloque Detalle (estilo shadcn).
 * Se compone con el Sidebar pegado a la izquierda; el Detalle arranca a la
 * altura del bottom del header del sidebar (60px).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

// Componentes que necesita el bloque → cards bajo el visor
const REQUIRED: RequiredItem[] = [
  { name: "AuctionStatus", path: "/handoff/auctionstatus", role: "Estado de la subasta (arriba a la izquierda)" },
  { name: "CardViewer",    path: "/handoff/cardviewer",    role: "Visor de imágenes + filmstrip de miniaturas" },
  { name: "Accordion",     path: "/handoff/accordion",     role: "Secciones colapsables (Información general, Condiciones de ofrecimiento)" },
  { name: "DetailCard",    path: "/handoff/detailcard",    role: "Tarjeta de detalle de la oferta (columna derecha): fecha, stats, Participa, precio base" },
  { name: "ConditionPill", path: "/handoff/conditionpill", role: "Píldoras de condiciones (Con Precio Reserva, Con Comisión…)" },
  { name: "OfferCard",     path: "/handoff/offercard",     role: "Cards de OFERTAS RELACIONADAS (Audi Q3) — live y negotiable" },
  { name: "Button",        path: "/handoff/button",        role: "CTA «Ingresa» (header) y «Agenda tu visita» (variante secondary-sm en VISITAS)" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/detalle/desktop/Detalle.tsx", code: readSrc("src/blocks/detalle/desktop/Detalle.tsx") },
];

// Componentes que usa el bloque → aparecen bajo src/components/
const USED_COMPONENTS = ["AuctionStatus", "CardViewer", "Accordion", "CardTitle", "DetailCard", "ConditionPill", "LikeButton", "PriceIcon", "OfferCard"];
const COMPONENT_FILES: BlockFile[] = USED_COMPONENTS.map(function toFile(name) {
  const rel = `src/components/${name}.tsx`;
  return { path: rel, code: readSrc(rel) };
});

// El bloque Sidebar (va pegado a la izquierda) → su código también aparece en /code
const SIDEBAR_BLOCK_PATHS = [
  "src/blocks/sidebar/desktop/Sidebar.tsx",
  "src/blocks/sidebar/desktop/SidebarItem.tsx",
  "src/blocks/sidebar/desktop/SidebarSubItem.tsx",
  "src/blocks/sidebar/desktop/SidebarHeader.tsx",
  "src/blocks/sidebar/desktop/SidebarBanner.tsx",
];
const SIDEBAR_ICONS = ["TodayIcon", "OfferIcon", "CategoryIcon", "BusinessIcon", "ServiceCenterIcon"];
const SIDEBAR_FILES: BlockFile[] = [
  ...SIDEBAR_BLOCK_PATHS.map(function toBlock(p) { return { path: p, code: readSrc(p) }; }),
  ...SIDEBAR_ICONS.map(function toIcon(name) {
    const rel = `src/components/${name}.tsx`;
    return { path: rel, code: readSrc(rel) };
  }),
];

// El bloque Header (barra superior) → su código también aparece en /code
const HEADER_FILES: BlockFile[] = [
  { path: "src/blocks/header/desktop/Header.tsx", code: readSrc("src/blocks/header/desktop/Header.tsx") },
  { path: "src/components/Button.tsx", code: readSrc("src/components/Button.tsx") },
];

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES, ...SIDEBAR_FILES, ...HEADER_FILES];

// ── Composición: Sidebar (izq) + [Header arriba + Detalle] (col. derecha) ──
const COMBINED_WIDTH = SIDEBAR_WIDTH + DETALLE_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, HEADER_HEIGHT + DETALLE_HEIGHT);

// Layout flex: al colapsar el Sidebar su width se anima y la columna lo sigue (queda pegada).
const CANVAS = (
  <div style={{ display: "flex", alignItems: "flex-start", width: COMBINED_WIDTH, height: COMBINED_HEIGHT, background: "#ffffff" }}>
    <Sidebar height={COMBINED_HEIGHT} />
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <AppHeader />
      <Detalle />
    </div>
  </div>
);

export default function DetalleBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <BlockViewer
        id="detalle"
        description="Página de detalle de una oferta."
        width={COMBINED_WIDTH}
        height={COMBINED_HEIGHT}
        canvas={CANVAS}
        files={FILES}
        previewBg={VAULT_PREVIEW_BG}
      />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
