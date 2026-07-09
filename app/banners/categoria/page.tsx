import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/categoria — banner 766×192 de las páginas de categoría.
 * Como En Vivo/Negociable + chip de ruta (estilo CategoryCard). Las categorías
 * son muchas: hay chip genérico «Categoría / Subcategoría» y uno con nombre.
 * La referencia legacy va al final.
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "hero",
    name: "Hero — número a la derecha",
    description: "Vehicular / Liviano en sistema live: pill gradiente del Button primary, TimerIcon, número gigante a la derecha y chip de ruta estilo CategoryCard (borde gradiente lila).",
    node: <LayoutBanner tone="naranja" layout="hero" pillText="EN VIVO" pillIcon count={13} title="Vehículos livianos en subasta" timer="Hoy · 6:01 PM" chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "panel-morado",
    name: "Panel morado",
    description: "Plantilla genérica para cualquier nodo del árbol: fondo DetailCard + contador con estilos del StatPill + chip «Categoría / Subcategoría».",
    node: <LayoutBanner tone="teal" layout="panel" pillText="NEGOCIABLE" pillIcon count={7} title="Explora esta categoría" timer="Cierra hoy · 6:01 PM" chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "photo",
    name: "Con imagen (placeholder)",
    description: "Placeholder de imagen detrás + gradiente de opacidad — para el banner de categoría con foto real de los lotes.",
    node: <LayoutBanner tone="naranja" layout="photo" pillText="EN VIVO" pillIcon count={13} title="Vehículos livianos en subasta" chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "big-number",
    name: "Número gigante",
    description: "Contador protagonista con borde gradiente live + chip de ruta con icono de auto (Vehicular / Seminuevo).",
    node: <LayoutBanner tone="naranja" layout="big-number" pillText="EN VIVO" pillIcon count={17} title="Vehicular · Seminuevo" chip={{ label: "Vehicular / Seminuevo", icon: "car" }} />,
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
        description="Banner hero de las páginas de categoría: la nueva propuesta del design system (pills con gradientes del Button, contador con estilos del StatPill, TimerIcon) más el chip de ruta estilo CategoryCard con la categoría y subcategoría (Vehicular → Liviano/Pesado, Equipos diversos, Materiales…). La referencia legacy va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
