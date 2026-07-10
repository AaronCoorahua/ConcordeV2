import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import PromoBanner from "@/src/blocks/banners/desktop/PromoBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/negociable — banner 766×192 de la página Negociable.
 * Base: variantes A y B de la referencia Subaspass. Sobre esa base, variantes
 * modernas con los tokens del DS (negotiable = CELESTE #00D2D3/#00AEB1 → #8460E5),
 * glass y luces/formas de fondo. Legacy al final.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "promo-a",
    name: "A · Foto izq. + naranja",
    description: "Background naranja de la referencia, foto a la izquierda con fundido, título con acento crema y contador con luces de fondo.",
    node: <PromoBanner layout="photo-left" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={11} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "promo-b",
    name: "B · Degradado morado→naranja",
    description: "Background morado→naranja de la referencia con glow, anillos y dots de fondo.",
    node: <PromoBanner layout="plum-counter" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={13} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "flip",
    name: "Celeste invertido",
    description: "El degradado volteado con el CELESTE negociable (#00D2D3→#00AEB1) hacia el morado, contador a la izquierda y contenido a la derecha.",
    node: <PromoBanner layout="flip" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={11} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "center-glass",
    name: "Centrado glass",
    description: "Panel GLASS centrado (blur + borde claro) sobre el degradado morado→celeste, con separador y contador.",
    node: <PromoBanner layout="center-glass" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={13} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "token",
    name: "Celeste→vault (token negotiable)",
    description: "Fondo con el gradiente del Button negotiable del DS (#00D2D3→#00AEB1→#8460E5) — el token celeste — con anillos, arco y glow.",
    node: <PromoBanner layout="token" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={11} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "gem-outline",
    name: "Gema outline de fondo",
    description: "La gema SubasCoin en SOLO BORDES blancos como forma decorativa gigante detrás del contador, sobre el celeste negociable.",
    node: <PromoBanner layout="gem-outline" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={11} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "mega",
    name: "Número mega blanco",
    description: "El contador BLANCO a 148px con glow celeste y «Ofertas» en vertical; fondo plum→teal con bandas diagonales glass.",
    node: <PromoBanner layout="mega" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={11} timer="Cierra hoy · 6:01 PM" />,
  },
  {
    id: "glass-tint",
    name: "Glass teñido celeste",
    description: "Contador en tarjeta glass TEÑIDA celeste (translúcido + blur) sobre plum profundo, con cuarto de círculo, arcos y dots de fondo.",
    node: <PromoBanner layout="glass-tint" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Subasta" titleAccent="negociable" count={13} timer="Cierra hoy · 6:01 PM" />,
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
        description="Banner hero de la página de ofertas negociables. Base A/B de la referencia Subaspass + variantes modernas con los tokens del DS (el celeste negociable #00D2D3 hacia vault), paneles glass, luces y formas de fondo. La referencia legacy va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
