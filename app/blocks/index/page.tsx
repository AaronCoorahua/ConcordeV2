import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import IndexComparison from "./IndexComparison";
import IndexViewer from "./IndexViewer";
import { indexFont } from "./font";

/**
 * /blocks/index — Visor del bloque Index (escritorio + celular), la evolución de Homepage.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "HeroCarousel", path: "/handoff/herocarousel", role: "Banner principal con 3 campañas e indicador de vidrio (nuevo)" },
  { name: "VmcAhora", path: "/handoff/vmcahora", role: "Feed en vivo a la derecha del banner (nuevo)" },
  { name: "OfferTypeCards", path: "/handoff/offertypecards", role: "Tipo de oferta: Recibe ofertas y En vivo con foto (nuevo)" },
  { name: "LotGallery", path: "/handoff/lotgallery", role: "Galería de cada tienda: destacada + 6 lotes en filas (nuevo)" },
  { name: "CategoryRail", path: "/handoff/categoryrail", role: "Explora por categoría: 6 tarjetas con foto e ícono de vidrio (nuevo)" },
  { name: "FeaturedCard", path: "/handoff/featuredcard", role: "Carta destacada de la tienda (nuevo)" },
  { name: "LightBar", path: "/handoff/lightbar", role: "Barra de luz al pie de la carta destacada (nuevo)" },
  { name: "GlassButton", path: "/handoff/glassbutton", role: "Botón de vidrio del banner, la campaña y SubasCars (nuevo)" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de vidrio de las categorías (nuevo)" },
  { name: "LogoMarquee", path: "/handoff/logomarquee", role: "Empresas que publican en VMC, en movimiento (nuevo)" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Ver todo el lote, Ver todas las categorías, Publica tu auto" },
];

const BLOCK_PATHS = [
  "src/blocks/index/desktop/Index.tsx",
  "src/blocks/index/desktop/dimensions.ts",
  "src/blocks/index/desktop/IndexHero.tsx",
  "src/blocks/index/desktop/StoreLots.tsx",
  "src/blocks/index/desktop/AdStrip.tsx",
  "src/blocks/index/desktop/CategoryRail.tsx",
  "src/blocks/index/desktop/CampaignBanner.tsx",
  "src/blocks/index/desktop/SellSection.tsx",
  "src/blocks/index/desktop/CompaniesMarquee.tsx",
  "src/blocks/index/desktop/SectionHead.tsx",
  "src/blocks/index/shared/data.ts",
  "src/blocks/index/mobile/IndexMobile.tsx",
  "src/blocks/index/mobile/dimensions.ts",
];
const COMPONENT_PATHS = [
  "src/components/HeroCarousel.tsx",
  "src/components/LogoMarquee.tsx",
  "src/components/VmcAhora/VmcAhora.tsx",
  "src/components/VmcAhora/feedPlan.ts",
  "src/components/OfferTypeCards.tsx",
  "src/components/LotGallery.tsx",
  "src/components/CategoryRail.tsx",
  "src/components/FeaturedCard.tsx",
  "src/components/LightBar.tsx",
  "src/components/GlassButton.tsx",
  "src/components/Vidrio.tsx",
  "src/components/ProfileButton.tsx",
];
// Bloques de Concorde que lo enmarcan (sin cambios).
const FRAME_PATHS = [
  "src/blocks/sidebar/desktop/Sidebar.tsx",
  "src/blocks/sidebar/mobile/SidebarMobile.tsx",
  "src/blocks/header/desktop/Header.tsx",
];

const FILES: BlockFile[] = [...BLOCK_PATHS, ...COMPONENT_PATHS, ...FRAME_PATHS].map(function toFile(p) {
  return { path: p, code: readSrc(p) };
});

export default function IndexBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <IndexViewer files={FILES} fontClass={indexFont.variable} />
      <IndexComparison />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
