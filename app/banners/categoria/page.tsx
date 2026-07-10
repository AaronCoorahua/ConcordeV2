import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import PromoBanner from "@/src/blocks/banners/desktop/PromoBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/categoria — banner 766×192 de las páginas de categoría.
 * Base: variantes C y B de la referencia + variantes modernas con tokens del DS
 * y el chip de ruta. Legacy al final.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "promo-c",
    name: "C · Foto der. diagonal",
    description: "Background morado→naranja con foto a la derecha en corte diagonal; contador, horario y chip de ruta a la izquierda.",
    node: <PromoBanner layout="photo-right" pillText="EN VIVO" pillIcon titlePre="Vehicular" titleAccent="liviano" count={13} timer="6:01 PM" chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "promo-b",
    name: "B · Degradado morado→naranja",
    description: "Background morado→naranja de la referencia con luces de fondo, contador y chip de ruta.",
    node: <PromoBanner layout="plum-counter" pillText="NEGOCIABLE" pillIcon titlePre="Explora esta" titleAccent="categoría" count={7} chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "center-glass",
    name: "Centrado glass",
    description: "Panel GLASS centrado con el contenido y el chip de ruta, sobre el degradado morado→celeste negociable.",
    node: <PromoBanner layout="center-glass" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Explora esta" titleAccent="categoría" count={7} chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "gem-outline",
    name: "Gema outline de fondo",
    description: "La gema SubasCoin en bordes blancos como forma gigante de fondo, con el chip de ruta con icono de auto.",
    node: <PromoBanner layout="gem-outline" tone="live" pillText="EN VIVO" pillIcon titlePre="Vehicular" titleAccent="seminuevo" count={17} timer="Hoy · 6:01 PM" chip={{ label: "Vehicular / Seminuevo", icon: "car" }} />,
  },
  {
    id: "mega",
    name: "Número mega blanco",
    description: "Contador blanco 148px con glow y bandas diagonales glass, con el chip de ruta en el flujo.",
    node: <PromoBanner layout="mega" tone="live" pillText="EN VIVO" pillIcon titlePre="Vehicular" titleAccent="liviano" count={13} chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "glass-tint",
    name: "Glass teñido celeste",
    description: "Contador en tarjeta glass teñida celeste sobre plum profundo, con formas de fondo y chip de ruta.",
    node: <PromoBanner layout="glass-tint" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Explora esta" titleAccent="categoría" count={7} chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "wave-split",
    name: "Onda dividida",
    description: "Divisor de onda curva con el chip de ruta en el flujo; mitad plum con contenido, mitad vault con el número.",
    node: <PromoBanner layout="wave-split" tone="live" pillText="EN VIVO" pillIcon titlePre="Vehicular" titleAccent="liviano" count={13} chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "orbit",
    name: "Órbitas",
    description: "Número en anillos concéntricos con dots orbitando y chip de ruta.",
    node: <PromoBanner layout="orbit" tone="negotiable" pillText="NEGOCIABLE" pillIcon titlePre="Explora esta" titleAccent="categoría" count={7} chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "legacy",
    name: "Vehicular / Liviano (legacy)",
    description: "Referencia del banner actual en vmcsubastas — estilo con ilustraciones que ya no se usa.",
    node: <AssetBanner kind="categoria" count={13} chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
];

export default function BannerCategoriaPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Categoría"
        format={`${BANNER_WIDTH} × ${BANNER_HEIGHT}`}
        slot="Página de categoría (árbol del sidebar)"
        description="Banner hero de las páginas de categoría: base C/B de la referencia + variantes modernas (glass, tokens del DS, gema outline) con el chip de ruta (Vehicular → Liviano/Pesado, Equipos diversos, Materiales…). La referencia legacy va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
