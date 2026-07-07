import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import AgregarSubascoinsViewer from "./AgregarSubascoinsViewer";

/**
 * /blocks/agregar-subascoins — Visor del bloque «Agregar SubasCoins»
 * (Header logueado + área de contenido placeholder) con el Sidebar a la izquierda.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "AmountOptionGroup", path: "/handoff/amountoptiongroup", role: "Selector de montos de la columna derecha (30/50/80/130 + monto personalizado)" },
  { name: "AmountOption", path: "/handoff/amountoption", role: "Cada opción de monto (pill radio) dentro del grupo" },
  { name: "Button", path: "/handoff/button", role: "CTA «Sigamos» de la card y del header" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/agregar-subascoins/desktop/AgregarSubascoins.tsx", code: readSrc("src/blocks/agregar-subascoins/desktop/AgregarSubascoins.tsx") },
  { path: "src/blocks/agregar-subascoins/desktop/SubasCoinsCard.tsx", code: readSrc("src/blocks/agregar-subascoins/desktop/SubasCoinsCard.tsx") },
  { path: "src/blocks/agregar-subascoins/desktop/SubasCoinsInfoCard.tsx", code: readSrc("src/blocks/agregar-subascoins/desktop/SubasCoinsInfoCard.tsx") },
  { path: "src/blocks/agregar-subascoins/desktop/dimensions.ts", code: readSrc("src/blocks/agregar-subascoins/desktop/dimensions.ts") },
  { path: "src/blocks/agregar-subascoins/mobile/AgregarSubascoinsMobile.tsx", code: readSrc("src/blocks/agregar-subascoins/mobile/AgregarSubascoinsMobile.tsx") },
  { path: "src/blocks/agregar-subascoins/mobile/SubasCoinsCardMobile.tsx", code: readSrc("src/blocks/agregar-subascoins/mobile/SubasCoinsCardMobile.tsx") },
  { path: "src/blocks/agregar-subascoins/mobile/dimensions.ts", code: readSrc("src/blocks/agregar-subascoins/mobile/dimensions.ts") },
];

// Componentes que usa el bloque (columna derecha de la card)
const USED_COMPONENTS = ["AmountOptionGroup", "AmountOption", "Button"];
const COMPONENT_FILES: BlockFile[] = USED_COMPONENTS.map(function toFile(name) {
  const rel = `src/components/${name}.tsx`;
  return { path: rel, code: readSrc(rel) };
});

// El bloque Header (barra superior) → su código también aparece en /code
const HEADER_FILES: BlockFile[] = [
  { path: "src/blocks/header/desktop/Header.tsx", code: readSrc("src/blocks/header/desktop/Header.tsx") },
  { path: "src/blocks/header/desktop/dimensions.ts", code: readSrc("src/blocks/header/desktop/dimensions.ts") },
  { path: "src/components/Button.tsx", code: readSrc("src/components/Button.tsx") },
];

// El bloque Sidebar (va pegado a la izquierda) → su código también aparece en /code
const SIDEBAR_BLOCK_PATHS = [
  "src/blocks/sidebar/desktop/Sidebar.tsx",
  "src/blocks/sidebar/desktop/SidebarItem.tsx",
  "src/blocks/sidebar/desktop/SidebarSubItem.tsx",
  "src/blocks/sidebar/desktop/SidebarHeader.tsx",
  "src/blocks/sidebar/desktop/SidebarBanner.tsx",
  "src/blocks/sidebar/desktop/dimensions.ts",
];
const SIDEBAR_ICONS = ["TodayIcon", "OfferIcon", "CategoryIcon", "BusinessIcon", "ServiceCenterIcon"];
const SIDEBAR_FILES: BlockFile[] = [
  ...SIDEBAR_BLOCK_PATHS.map(function toBlock(p) { return { path: p, code: readSrc(p) }; }),
  ...SIDEBAR_ICONS.map(function toIcon(name) {
    const rel = `src/components/${name}.tsx`;
    return { path: rel, code: readSrc(rel) };
  }),
];

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES, ...HEADER_FILES, ...SIDEBAR_FILES];

export default function AgregarSubascoinsBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <AgregarSubascoinsViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
