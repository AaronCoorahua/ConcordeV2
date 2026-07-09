import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/negociable — banner 766×192 de la página Negociable (sistema teal).
 * Variantes modernas con los ESTILOS del DS (gradiente del Button negotiable en
 * la pill, borde/glass del StatPill en el contador) — sin botones. Legacy al final.
 */

const TITLE = "Subasta negociable de autos, maquinaria y más";

const TEMPLATES: BannerTemplate[] = [
  {
    id: "hero",
    name: "Hero — número a la derecha",
    description: "Pill «NEGOCIABLE» con el gradiente del Button negotiable (anillo teal + fill #00aeb1→#8460e5), chip de horario con TimerIcon y el número gigante a la derecha.",
    node: <LayoutBanner tone="teal" layout="hero" pillText="NEGOCIABLE" pillIcon count={11} title={TITLE} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "panel-morado",
    name: "Panel morado",
    description: "Fondo con el gradiente del header de DetailCard + contador con los estilos del StatPill (dark glass + borde VYStrokes).",
    node: <LayoutBanner tone="teal" layout="panel" pillText="NEGOCIABLE" pillIcon count={13} title="Negocia tu precio" timer="Propuestas hasta 6:01 PM" />,
  },
  {
    id: "primary",
    name: "Fondo negotiable + SubasCoins",
    description: "Todo el fondo con el fill del Button negotiable (#00aeb1→#8460e5) y las SubasCoins grandes del OfferCard flotando.",
    node: <LayoutBanner tone="teal" layout="primary" pillText="NEGOCIABLE" pillIcon count={11} title={TITLE} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "photo",
    name: "Con imagen (placeholder)",
    description: "Placeholder de imagen detrás + gradiente de opacidad del tono encima — para banners con foto del lote/campaña.",
    node: <LayoutBanner tone="teal" layout="photo" pillText="NEGOCIABLE" pillIcon count={11} title={TITLE} />,
  },
  {
    id: "big-number",
    name: "Número gigante a la izquierda",
    description: "El contador domina a la izquierda con borde gradiente negotiable (#00aeb1→#8460e5); pill gradiente y título a la derecha.",
    node: <LayoutBanner tone="teal" layout="big-number" pillText="NEGOCIABLE" pillIcon count={11} title="Negocia autos, maquinaria y equipos" subtitle="Propón tu precio" />,
  },
  {
    id: "centered-stack",
    name: "Centrado simple",
    description: "Solo los títulos, todo apilado y bien centrado: pill gradiente, título y «N ofertas disponibles».",
    node: <LayoutBanner tone="teal" layout="centered-stack" pillText="NEGOCIABLE" pillIcon count={5} title="Subasta negociable" />,
  },
  {
    id: "centered",
    name: "Centrado con separador",
    description: "Composición simétrica: pill gradiente + título a un lado, separador y contador «OFERTAS N» gigante al otro.",
    node: <LayoutBanner tone="teal" layout="centered" pillText="NEGOCIABLE" pillIcon count={5} title="Subasta negociable" />,
  },
  {
    id: "outline-number",
    name: "Número contorno de fondo",
    description: "El número gigante en contorno detrás del contenido — efecto tipográfico sobre el gradiente negotiable.",
    node: <LayoutBanner tone="teal" layout="outline-number" pillText="NEGOCIABLE" pillIcon count={13} title="Subasta negociable" />,
  },
  {
    id: "legacy",
    name: "Asset de producción (legacy)",
    description: "Referencia del banner actual en vmcsubastas — estilo con ilustraciones que ya no se usa.",
    node: <AssetBanner kind="negociable" count={11} />,
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
        description="Banner hero de la página de ofertas negociables, con la nueva propuesta del design system: gradiente negotiable de OfferType, pill con los colores del Button negotiable, contador con los estilos del StatPill, TimerIcon y gema SubasCoin. La referencia legacy (ilustraciones) va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
