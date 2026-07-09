import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import BannerSecundario from "@/src/blocks/banners/desktop/BannerSecundario";
import { BANNER_SECUNDARIO_WIDTH, BANNER_SECUNDARIO_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/secundario — plantillas del Banner Secundario (766×100).
 * Slots: Homepage/Zona `data-slot="secondary-banner"` y `data-slot="help-banner"`.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "negociable",
    name: "Negociable",
    description: "Strip teal hacia Tipo de oferta → Negociable, con pill morada y flecha circular.",
    node: <BannerSecundario variant="negociable" />,
  },
  {
    id: "en-vivo",
    name: "En Vivo",
    description: "Strip naranja live con dot pulsante y contador de subastas en curso.",
    node: <BannerSecundario variant="en-vivo" />,
  },
  {
    id: "categoria",
    name: "Categoría",
    description: "Strip morado hacia una categoría concreta, con chip de ruta (como el banner de zona: «Equipos diversos / Equipo de cómputo»).",
    node: <BannerSecundario variant="categoria" />,
  },
  {
    id: "empresas",
    name: "Empresas",
    description: "Strip claro con borde gradiente lila hacia el listado de empresas.",
    node: <BannerSecundario variant="empresas" />,
  },
  {
    id: "subaspass",
    name: "Subaspass",
    description: "Promo con el gradiente morado→ámbar del SidebarBanner y CTA pill naranja #F5921E→#E15F2B.",
    node: <BannerSecundario variant="subaspass" />,
  },
];

export default function BannerSecundarioPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Secundario"
        format={`${BANNER_SECUNDARIO_WIDTH} × ${BANNER_SECUNDARIO_HEIGHT}`}
        slot='data-slot="secondary-banner"'
        description="Strip de navegación usado en Homepage y Zona (secondary-banner y help-banner). Formato slim: pill de contexto, titular, chip de ruta opcional y CTA a la derecha."
        templates={TEMPLATES}
      />
    </div>
  );
}
