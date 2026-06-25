import type { JSX } from "react";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import Header from "@/app/_components/Header";
import BlockViewer, { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/sidebar/desktop/Sidebar.tsx",        code: readSrc("src/blocks/sidebar/desktop/Sidebar.tsx") },
  { path: "src/blocks/sidebar/desktop/SidebarItem.tsx",    code: readSrc("src/blocks/sidebar/desktop/SidebarItem.tsx") },
  { path: "src/blocks/sidebar/desktop/SidebarSubItem.tsx", code: readSrc("src/blocks/sidebar/desktop/SidebarSubItem.tsx") },
  { path: "src/blocks/sidebar/desktop/SidebarHeader.tsx",  code: readSrc("src/blocks/sidebar/desktop/SidebarHeader.tsx") },
  { path: "src/blocks/sidebar/desktop/SidebarBanner.tsx",  code: readSrc("src/blocks/sidebar/desktop/SidebarBanner.tsx") },
];

// Componentes que usa el bloque (iconos de navegación) → aparecen bajo src/components/
const USED_COMPONENTS = ["TodayIcon", "OfferIcon", "CategoryIcon", "BusinessIcon", "ServiceCenterIcon"];
const COMPONENT_FILES: BlockFile[] = USED_COMPONENTS.map(function toFile(name) {
  const rel = `src/components/${name}.tsx`;
  return { path: rel, code: readSrc(rel) };
});

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES];

export default function SidebarBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <BlockViewer
        id="sidebar"
        description="Sidebar de navegación lateral del dashboard."
        width={SIDEBAR_WIDTH}
        height={SIDEBAR_HEIGHT}
        canvas={<Sidebar />}
        files={FILES}
      />
    </div>
  );
}
