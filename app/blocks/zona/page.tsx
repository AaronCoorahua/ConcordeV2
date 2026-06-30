import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import ZonaViewer from "./ZonaViewer";

/**
 * /blocks/zona — Visor del bloque Zona de usuario (Header logueado + UserProfileCard).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "UserProfileCard", path: "/handoff/userprofilecard", role: "Tarjeta de perfil: saludo, riesgo, puntos VMC y accesos" },
  { name: "WalletBalanceCard", path: "/handoff/walletbalancecard", role: "Tarjeta «Billetera» (SubasCoins / Saldo + CTA)" },
  { name: "ActivityCard", path: "/handoff/activitycard", role: "Tarjeta «Tu actividad» (grid de pills Ganadas / Consignaciones…)" },
  { name: "OfferShelf", path: "/handoff/offershelf", role: "Estantes «Recomendados» / «Me interesa» (CardTitle + 4 OfferCards)" },
  { name: "OfferCard", path: "/handoff/offercard", role: "Cards de oferta (imagen + título/año + precio + like)" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pills EN VIVO / PRÓXIMA sobre las cards de oferta" },
  { name: "AvatarZone", path: "/handoff/avatarzone", role: "Avatar circular del usuario (izquierda de la 1ª fila)" },
  { name: "CardTitle", path: "/handoff/cardtitle", role: "Títulos con brackets (BILLETERA, TU ACTIVIDAD, RECOMENDADOS…)" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Accesos «Tu perfil», «Historial» y «Transacciones» con chevron" },
  { name: "StarIcon", path: "/handoff/staricon", role: "Insignia de estrella junto a los puntos VMC" },
  { name: "InfoIcon", path: "/handoff/infoicon", role: "Ícono de información ⓘ junto a los puntos VMC" },
  { name: "Button", path: "/handoff/button", role: "CTA del header «Bienvenido, …» y «Adquiere SubasCoins»" },
];

// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/zona/desktop/Zona.tsx", code: readSrc("src/blocks/zona/desktop/Zona.tsx") },
  { path: "src/blocks/zona/desktop/dimensions.ts", code: readSrc("src/blocks/zona/desktop/dimensions.ts") },
];

// Componentes que usa el bloque (UserProfileCard + sus dependencias transitivas)
const USED_COMPONENTS = ["UserProfileCard", "WalletBalanceCard", "ActivityCard", "OfferShelf", "OfferCard", "BadgeStatus", "AvatarZone", "CardTitle", "ProfileButton", "StarIcon", "InfoIcon"];
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

export default function ZonaBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <ZonaViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
