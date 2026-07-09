import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/negociable — banner 766×272 de la página Negociable (teal).
 * 01 = asset real de producción; 02+ = variantes de LAYOUT sin personaje.
 */

const TITLE = "Subasta negociable de autos, maquinaria y más";

const TEMPLATES: BannerTemplate[] = [
  {
    id: "asset",
    name: "Asset de producción",
    description: "Banner real de vmcsubastas (personaje con lentes, monedas, pill «NEGOCIABLE» y «Ofertas» ya vienen en el PNG). Solo se sobrepone el número de ofertas.",
    node: <AssetBanner kind="negociable" count={11} />,
  },
  {
    id: "big-number",
    name: "Número gigante",
    description: "Sin personaje. El contador domina a la izquierda; pill y título a la derecha.",
    node: <LayoutBanner tone="teal" layout="big-number" pillText="NEGOCIABLE" pillIcon count={11} title="Negocia autos, maquinaria y equipos" subtitle="Propón tu precio" />,
  },
  {
    id: "split-left",
    name: "Contador en tarjeta",
    description: "Texto a la izquierda, contador «Ofertas N» en una tarjeta glass a la derecha.",
    node: <LayoutBanner tone="teal" layout="split-left" pillText="NEGOCIABLE" pillIcon count={5} title="Subasta negociable" subtitle="Autos, maquinaria, equipos y más" />,
  },
  {
    id: "centered",
    name: "Centrado",
    description: "Composición simétrica: pill + título centrados y «N ofertas disponibles» debajo.",
    node: <LayoutBanner tone="teal" layout="centered" pillText="NEGOCIABLE" pillIcon count={13} title="Subasta negociable" />,
  },
  {
    id: "ticket",
    name: "Cinta",
    description: "La pill se vuelve cinta diagonal; el número aparece en contorno a la derecha.",
    node: <LayoutBanner tone="teal" layout="ticket" pillText="NEGOCIABLE" count={7} title="Subasta negociable" />,
  },
];

export default function BannerNegociablePage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Negociable"
        format={`${BANNER_WIDTH} × ${BANNER_HEIGHT}`}
        slot="Página Tipo de oferta → Negociable"
        description="Banner hero de la página de ofertas negociables (teal). La primera es el asset real de producción; el resto son variantes de layout sin personaje — solo contenido, con distintas posiciones y tratamientos tipográficos. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
