import type { JSX } from "react";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import SidebarMobile from "@/src/blocks/sidebar/mobile/SidebarMobile";
import { SIDEBAR_MOBILE_WIDTH, SIDEBAR_MOBILE_HEIGHT } from "@/src/blocks/sidebar/mobile/dimensions";
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
  { path: "src/blocks/sidebar/desktop/dimensions.ts",      code: readSrc("src/blocks/sidebar/desktop/dimensions.ts") },
  // Variante mobile — drawer overlay que reutiliza el Sidebar desktop
  { path: "src/blocks/sidebar/mobile/SidebarMobile.tsx",   code: readSrc("src/blocks/sidebar/mobile/SidebarMobile.tsx") },
  { path: "src/blocks/sidebar/mobile/dimensions.ts",       code: readSrc("src/blocks/sidebar/mobile/dimensions.ts") },
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
        description="Sidebar de navegación lateral del dashboard. En mobile se abre como drawer overlay que oscurece el fondo."
        width={SIDEBAR_WIDTH}
        height={SIDEBAR_HEIGHT}
        canvas={<Sidebar />}
        canvasForViewport={{
          mobile: {
            node: (
              <SidebarMobile showTrigger frameHeight={SIDEBAR_MOBILE_HEIGHT}>
                <div
                  style={{
                    width: SIDEBAR_MOBILE_WIDTH,
                    height: SIDEBAR_MOBILE_HEIGHT,
                    background: "#f4f4f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "monospace",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: "#9AA1AC",
                  }}
                >
                  CONTENIDO · pulsa ☰ para abrir el menú
                </div>
              </SidebarMobile>
            ),
            width: SIDEBAR_MOBILE_WIDTH,
            height: SIDEBAR_MOBILE_HEIGHT,
          },
        }}
        files={FILES}
      />
    </div>
  );
}
