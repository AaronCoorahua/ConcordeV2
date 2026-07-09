import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import BannerPrincipal from "@/src/blocks/banners/desktop/BannerPrincipal";
import { BANNER_PRINCIPAL_WIDTH, BANNER_PRINCIPAL_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/principal — plantillas del Banner Principal (766×272).
 * Slot: Homepage `data-slot="principal-banner"`.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "negociable",
    name: "Negociable",
    description: "Navega a Tipo de oferta → Negociable. Sistema teal de OfferType/DetailCard (negotiable) con chevrones del logo >vmc<.",
    node: <BannerPrincipal variant="negociable" />,
  },
  {
    id: "en-vivo",
    name: "En Vivo",
    description: "Navega a Tipo de oferta → En Vivo. Sistema naranja live con dot pulsante y anillos animados.",
    node: <BannerPrincipal variant="en-vivo" />,
  },
  {
    id: "categorias",
    name: "Categorías",
    description: "Navega a Categorías. Morado marca (gradiente del header de DetailCard) con CategoryCards reales flotando — interactivas al hover.",
    node: <BannerPrincipal variant="categorias" />,
  },
  {
    id: "empresas",
    name: "Empresas",
    description: "Navega a Empresas. Fondo claro con borde gradiente lila (sistema CategoryCard) y tile glass con BusinessIcon.",
    node: <BannerPrincipal variant="empresas" />,
  },
];

export default function BannerPrincipalPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Principal"
        format={`${BANNER_PRINCIPAL_WIDTH} × ${BANNER_PRINCIPAL_HEIGHT}`}
        slot='data-slot="principal-banner"'
        description="Banner hero del Homepage. Cada plantilla lleva a una sección del sidebar (tipo de oferta, categorías, empresas) reutilizando el sistema de color de sus componentes: teal negociable, naranja en vivo y morado marca."
        templates={TEMPLATES}
      />
    </div>
  );
}
