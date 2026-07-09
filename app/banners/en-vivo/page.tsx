import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/en-vivo — banner 766×192 de la página En Vivo (sistema live).
 * Variantes modernas con los ESTILOS del DS (gradientes del Button en la pill,
 * borde/glass del StatPill en el contador, TimerIcon, PriceIcon) — sin botones.
 * La referencia legacy va al final.
 */

const TITLE = "Subastas de autos en vivo";

const TEMPLATES: BannerTemplate[] = [
  {
    id: "hero",
    name: "Hero — número a la derecha",
    description: "Pill «EN VIVO» con el gradiente del Button primary (anillo + fill #ed8936→#8460e5), chip de horario con TimerIcon y el número gigante de ofertas a la derecha.",
    node: <LayoutBanner tone="naranja" layout="hero" pillText="EN VIVO" pillIcon count={23} title={TITLE} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "panel-morado",
    name: "Panel morado",
    description: "Fondo con el gradiente del header de DetailCard + contador con los estilos del StatPill (dark glass + borde VYStrokes) — el colorway premium.",
    node: <LayoutBanner tone="naranja" layout="panel" pillText="EN VIVO" pillIcon count={38} title={TITLE} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "primary",
    name: "Fondo primary + SubasCoins",
    description: "Todo el fondo con el fill del Button primary (#ed8936→#8460e5) y las SubasCoins grandes del OfferCard flotando.",
    node: <LayoutBanner tone="naranja" layout="primary" pillText="EN VIVO" pillIcon count={23} title={TITLE} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "photo",
    name: "Con imagen (placeholder)",
    description: "Placeholder de imagen detrás + gradiente de opacidad del tono encima — para banners con foto del lote/campaña.",
    node: <LayoutBanner tone="naranja" layout="photo" pillText="EN VIVO" pillIcon count={23} title={TITLE} />,
  },
  {
    id: "big-number",
    name: "Número gigante a la izquierda",
    description: "El contador domina a la izquierda con borde gradiente live (#ed8936→#8460e5); pill gradiente y título a la derecha.",
    node: <LayoutBanner tone="naranja" layout="big-number" pillText="EN VIVO" pillIcon count={23} title={TITLE} subtitle="Puja en tiempo real" />,
  },
  {
    id: "centered-stack",
    name: "Centrado simple",
    description: "Solo los títulos, todo apilado y bien centrado: pill gradiente, título y «N ofertas disponibles».",
    node: <LayoutBanner tone="naranja" layout="centered-stack" pillText="EN VIVO" pillIcon count={38} title={TITLE} />,
  },
  {
    id: "centered",
    name: "Centrado con separador",
    description: "Composición simétrica: pill gradiente + título a un lado, separador y el contador «OFERTAS N» gigante al otro.",
    node: <LayoutBanner tone="naranja" layout="centered" pillText="EN VIVO" pillIcon count={38} title={TITLE} />,
  },
  {
    id: "outline-number",
    name: "Número contorno de fondo",
    description: "El número gigante en contorno vive detrás del contenido — efecto tipográfico sobre el gradiente live.",
    node: <LayoutBanner tone="naranja" layout="outline-number" pillText="EN VIVO" pillIcon count={45} title={TITLE} />,
  },
  {
    id: "legacy",
    name: "Asset de producción (legacy)",
    description: "Referencia del banner actual en vmcsubastas — estilo con ilustraciones que ya no se usa.",
    node: <AssetBanner kind="en-vivo" count={23} />,
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
        description="Banner hero de la página de subastas En Vivo, con la nueva propuesta del design system: gradiente live de OfferType, pill con los colores del Button primary, contador con los estilos del StatPill, TimerIcon y gema SubasCoin. La referencia legacy (ilustraciones) va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
