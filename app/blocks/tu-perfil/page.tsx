import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import TuPerfilViewer from "./TuPerfilViewer";

/**
 * /blocks/tu-perfil — Visor del bloque «Tu Perfil»
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
  { name: "Input", path: "/handoff/input", role: "Campos de Información Personal y de Contacto (Nombres, Correo…)" },
  { name: "Button", path: "/handoff/button", role: "CTA «Canjear Puntos VMC», «Cerrar Sesión» y del header" },
  { name: "StarIcon", path: "/handoff/staricon", role: "Insignia de estrella junto a los Puntos VMC" },
  { name: "InfoIcon", path: "/handoff/infoicon", role: "Ícono de información ⓘ junto a los Puntos VMC" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/tu-perfil/desktop/TuPerfil.tsx", code: readSrc("src/blocks/tu-perfil/desktop/TuPerfil.tsx") },
  { path: "src/blocks/tu-perfil/desktop/ProfileCard.tsx", code: readSrc("src/blocks/tu-perfil/desktop/ProfileCard.tsx") },
  { path: "src/blocks/tu-perfil/desktop/dimensions.ts", code: readSrc("src/blocks/tu-perfil/desktop/dimensions.ts") },
  { path: "src/blocks/tu-perfil/mobile/TuPerfilMobile.tsx", code: readSrc("src/blocks/tu-perfil/mobile/TuPerfilMobile.tsx") },
  { path: "src/blocks/tu-perfil/mobile/ProfileCardMobile.tsx", code: readSrc("src/blocks/tu-perfil/mobile/ProfileCardMobile.tsx") },
  { path: "src/blocks/tu-perfil/mobile/dimensions.ts", code: readSrc("src/blocks/tu-perfil/mobile/dimensions.ts") },
];

// Componentes que usa el bloque (cards Tu Perfil + Contacto)
const USED_COMPONENTS = ["Input", "Button", "StarIcon", "InfoIcon"];
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

export default function TuPerfilBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <TuPerfilViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
