import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import BannerSidebar from "@/src/blocks/banners/desktop/BannerSidebar";
import { BANNER_SIDEBAR_WIDTH, BANNER_SIDEBAR_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/sidebar — plantillas del Banner Sidebar (200×264).
 * Slot: SidebarBanner del bloque Sidebar.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "subaspass",
    name: "Subaspass",
    description: "La promo del sidebar en producción: «¿Te tienta el riesgo alto? Compra Subaspass», gradiente #3B1A7A→#3B1782→#6E3E2A y CTA pill 31px #F5921E→#E15F2B.",
    node: <BannerSidebar variant="subaspass" />,
  },
  {
    id: "vende-tu-auto",
    name: "Vende tu auto",
    description: "Variante con cierre teal (sistema negotiable) y CTA #00DAE0→#008688 — navega a Vende tu auto.",
    node: <BannerSidebar variant="vende-tu-auto" />,
  },
  {
    id: "centro-ayuda",
    name: "Centro de ayuda",
    description: "Variante morado marca con CTA blanco — navega al Centro de Ayuda.",
    node: <BannerSidebar variant="centro-ayuda" />,
  },
];

export default function BannerSidebarPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Sidebar"
        format={`${BANNER_SIDEBAR_WIDTH} × ${BANNER_SIDEBAR_HEIGHT}`}
        slot="SidebarBanner (bloque Sidebar)"
        description="Banner CTA inferior del Sidebar. Mismas medidas y sistema del SidebarBanner de Figma (fondo morado→ámbar, CTA pill de 31px). Se le pasa como children al slot del Sidebar."
        templates={TEMPLATES}
      />
    </div>
  );
}
