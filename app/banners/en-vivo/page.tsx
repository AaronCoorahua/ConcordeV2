import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/en-vivo — banner 766×272 de la página En Vivo (naranja).
 * 01 = asset real de producción; 02+ = variantes de LAYOUT sin personaje.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "asset",
    name: "Asset de producción",
    description: "Banner real de vmcsubastas (personaje, monedas, pill «EN VIVO» y «Ofertas» ya vienen en el PNG). Solo se sobrepone el número de ofertas.",
    node: <AssetBanner kind="en-vivo" count={23} />,
  },
  {
    id: "big-number",
    name: "Número gigante",
    description: "Sin personaje. El contador domina a la izquierda; pill y título a la derecha. Chevrón y moneda de acento.",
    node: <LayoutBanner tone="naranja" layout="big-number" pillText="EN VIVO" pillIcon count={23} title="Subastas de autos en vivo" subtitle="Puja en tiempo real" />,
  },
  {
    id: "centered",
    name: "Centrado",
    description: "Composición simétrica: pill + título centrados, «N ofertas disponibles» debajo, chevrones y monedas en las esquinas.",
    node: <LayoutBanner tone="naranja" layout="centered" pillText="EN VIVO" pillIcon count={38} title="Subastas de autos en vivo" />,
  },
  {
    id: "outline-number",
    name: "Número contorno de fondo",
    description: "El número gigante en contorno vive detrás del texto; contenido alineado a la izquierda con efecto tipográfico.",
    node: <LayoutBanner tone="naranja" layout="outline-number" pillText="EN VIVO" pillIcon count={45} title="Subastas de autos en vivo" />,
  },
  {
    id: "ticket",
    name: "Cinta",
    description: "La pill se vuelve una cinta diagonal; el número aparece en contorno alineado a la derecha.",
    node: <LayoutBanner tone="naranja" layout="ticket" pillText="EN VIVO" count={12} title="Subastas de autos en vivo" />,
  },
];

export default function BannerEnVivoPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner En Vivo"
        format={`${BANNER_WIDTH} × ${BANNER_HEIGHT}`}
        slot="Página Tipo de oferta → En Vivo"
        description="Banner hero de la página de subastas En Vivo (naranja). La primera es el asset real de producción; el resto son variantes de layout sin personaje — solo contenido, con distintas posiciones y tratamientos tipográficos. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
