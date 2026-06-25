import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/homepage/desktop/Homepage";
import Header from "@/app/_components/Header";
import BlockViewer, { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";

/**
 * /blocks/homepage — Visor del bloque Homepage (estilo shadcn).
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

const FILES: BlockFile[] = [
  { path: "src/blocks/homepage/desktop/Homepage.tsx", code: readSrc("src/blocks/homepage/desktop/Homepage.tsx") },
  { path: "src/blocks/homepage/desktop/CategoriesSection.tsx", code: readSrc("src/blocks/homepage/desktop/CategoriesSection.tsx") },
  { path: "src/blocks/homepage/desktop/AuctioneerSection.tsx", code: readSrc("src/blocks/homepage/desktop/AuctioneerSection.tsx") },
];

export default function HomepageBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <BlockViewer
        id="homepage"
        description="Página de inicio: banners, subastador y categorías."
        width={HOMEPAGE_WIDTH}
        height={HOMEPAGE_HEIGHT}
        canvas={<Homepage />}
        files={FILES}
      />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
