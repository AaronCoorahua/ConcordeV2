import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import DetalleViewer from "./DetalleViewer";

/**
 * /blocks/detalle — Visor del bloque Detalle (desktop + mobile).
 * El estado (tabs En vivo / Negociable) lo maneja DetalleViewer.
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
  { name: "AuctionStatus", path: "/handoff/auctionstatus", role: "Estado de la subasta (cambia live/negotiable)" },
  { name: "CardViewer",    path: "/handoff/cardviewer",    role: "Visor de imágenes + filmstrip de miniaturas" },
  { name: "Accordion",     path: "/handoff/accordion",     role: "Secciones colapsables (Información general, Condiciones, Visitas)" },
  { name: "DetailCard",    path: "/handoff/detailcard",    role: "Tarjeta de detalle de la oferta (live / negotiable)" },
  { name: "ConditionPill", path: "/handoff/conditionpill", role: "Píldoras de condiciones (filled «Con…» / outline «Sin…»)" },
  { name: "OfferCard",     path: "/handoff/offercard",     role: "Cards de OFERTAS RELACIONADAS (Audi Q3) — live y negotiable" },
  { name: "Button",        path: "/handoff/button",        role: "CTA «Ingresa» (header) y «Agenda tu visita» (secondary-sm en VISITAS)" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/detalle/desktop/Detalle.tsx", code: readSrc("src/blocks/detalle/desktop/Detalle.tsx") },
  { path: "src/blocks/detalle/mobile/DetalleMobile.tsx", code: readSrc("src/blocks/detalle/mobile/DetalleMobile.tsx") },
  { path: "src/blocks/detalle/pills.ts", code: readSrc("src/blocks/detalle/pills.ts") },
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

export default function DetalleBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <DetalleViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
