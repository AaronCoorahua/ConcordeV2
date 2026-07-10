import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import PromoBanner from "@/src/blocks/banners/desktop/PromoBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/en-vivo — banner 766×192 de la página En Vivo.
 * Base: variantes A y B de la referencia Subaspass. Sobre esa base, variantes
 * modernas con los tokens del DS (live = vault gradiente #ed8936→#8460e5),
 * glass y luces/formas de fondo. Legacy al final.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "promo-a",
    name: "A · Foto izq. + naranja",
    description: "Background naranja de la referencia (#E8732A→#C85A1E), foto a la izquierda con fundido, título con acento crema y contador con luces de fondo.",
    node: <PromoBanner layout="photo-left" pillText="EN VIVO" pillIcon titlePre="Subastas de autos" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "promo-b",
    name: "B · Degradado morado→naranja",
    description: "Background morado→naranja de la referencia con glow, anillos y dots de fondo.",
    node: <PromoBanner layout="plum-counter" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={38} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "flip",
    name: "Gradiente invertido",
    description: "El degradado B volteado (naranja→morado) con el contador a la IZQUIERDA y el contenido alineado a la derecha — espejo moderno de la B.",
    node: <PromoBanner layout="flip" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "center-glass",
    name: "Centrado glass",
    description: "Todo el contenido dentro de un panel GLASS centrado (blur + borde claro + inset) sobre el degradado, con separador y contador.",
    node: <PromoBanner layout="center-glass" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={38} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "token",
    name: "Vault gradiente (token primary)",
    description: "Fondo con el gradiente del Button primary del DS (#ED8936→#8460E5) — el token live — con anillos, arco y glow.",
    node: <PromoBanner layout="token" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "gem-outline",
    name: "Gema outline de fondo",
    description: "La gema SubasCoin en SOLO BORDES blancos como forma decorativa gigante detrás del contador, sobre el naranja de la referencia.",
    node: <PromoBanner layout="gem-outline" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "mega",
    name: "Número mega blanco",
    description: "El contador BLANCO a 148px con glow del tono y «Ofertas» en vertical; fondo plum→naranja con bandas diagonales glass.",
    node: <PromoBanner layout="mega" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "glass-tint",
    name: "Glass teñido naranja",
    description: "Contador en tarjeta glass TEÑIDA del tono (naranja translúcido + blur) sobre plum profundo, con cuarto de círculo, arcos y dots de fondo.",
    node: <PromoBanner layout="glass-tint" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={38} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "wave-split",
    name: "Onda dividida",
    description: "Divisor de onda curva: mitad plum profundo con el contenido, mitad con el gradiente vault del tono y el número blanco con glow, filo claro en la curva.",
    node: <PromoBanner layout="wave-split" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "orbit",
    name: "Órbitas",
    description: "El número al centro de anillos concéntricos con dots orbitando (naranja, blanco, lila) y glow central — como una diana de subasta.",
    node: <PromoBanner layout="orbit" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={38} timer="Hoy · 6:01 PM" />,
  },
  {
    id: "echo",
    name: "Eco tipográfico",
    description: "El número duplicado: contorno gigante detrás + sólido crema delante, desplazados — efecto de profundidad sobre el naranja.",
    node: <PromoBanner layout="echo" tone="live" pillText="EN VIVO" pillIcon titlePre="Subastas" titleAccent="en vivo" count={23} timer="Hoy · 6:01 PM" />,
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
        description="Banner hero de la página de subastas En Vivo. Base A/B de la referencia Subaspass + variantes modernas con los tokens del DS (vault gradiente del Button primary), paneles glass, luces y formas de fondo. La referencia legacy va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
