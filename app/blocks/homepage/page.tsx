import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import HomepageViewer from "./HomepageViewer";

/**
 * /blocks/homepage — Visor del bloque Homepage (desktop + mobile).
 * El estado (colapsar sidebar → escalar contenido) lo maneja HomepageViewer.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "CardTitle", path: "/handoff/cardtitle", role: "Títulos de sección con corchetes (TIPO DE OFERTA, SANTANDER…)" },
  { name: "OfferCard", path: "/handoff/offercard", role: "Cards de oferta del subastador (imagen + precio + like)" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pills de estado EN VIVO / PRÓXIMA sobre las cards" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "CTA «Ir al Perfil»" },
  { name: "OfferType", path: "/handoff/offertype", role: "NEGOCIABLE / EN VIVO + «VER TODAS»" },
  { name: "CategoryCard", path: "/handoff/categorycard", role: "Categorías (vehicular, maquinaria, equipos, artículos)" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/homepage/desktop/Homepage.tsx", code: readSrc("src/blocks/homepage/desktop/Homepage.tsx") },
  { path: "src/blocks/homepage/desktop/CategoriesSection.tsx", code: readSrc("src/blocks/homepage/desktop/CategoriesSection.tsx") },
  { path: "src/blocks/homepage/desktop/AuctioneerSection.tsx", code: readSrc("src/blocks/homepage/desktop/AuctioneerSection.tsx") },
  { path: "src/blocks/homepage/mobile/HomepageMobile.tsx", code: readSrc("src/blocks/homepage/mobile/HomepageMobile.tsx") },
];

// Componentes que usa el bloque (derivados de REQUIRED) → aparecen bajo src/components/
const COMPONENT_FILES: BlockFile[] = REQUIRED.map(function toFile(r) {
  const rel = `src/components/${r.name}.tsx`;
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

export default function HomepageBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <HomepageViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
