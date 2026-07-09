import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import AssetBanner from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/categoria — banner 766×272 de las páginas de categoría.
 * 01 = asset real de producción con el chip de ruta; 02+ = variantes de LAYOUT
 * sin personaje, con el chip de categoría. Como las categorías son muchas, la
 * plantilla usa un chip genérico «Categoría / Subcategoría».
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "asset",
    name: "Vehicular / Liviano (asset)",
    description: "Banner real de vmcsubastas (personaje llama, monedas, pill «EN VIVO») con el número de ofertas y el chip de ruta «Vehicular / Liviano» sobrepuestos.",
    node: <AssetBanner kind="categoria" count={13} chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "big-number",
    name: "Número gigante",
    description: "Sin personaje. Contador dominante a la izquierda, pill+título a la derecha y chip de ruta abajo.",
    node: <LayoutBanner tone="naranja" layout="big-number" pillText="EN VIVO" pillIcon count={13} title="Vehículos livianos en subasta" chip={{ label: "Vehicular / Liviano", icon: "car" }} />,
  },
  {
    id: "split-left",
    name: "Contador en tarjeta",
    description: "Texto a la izquierda, contador en tarjeta glass a la derecha, chip de ruta abajo. Plantilla genérica para cualquier categoría del árbol.",
    node: <LayoutBanner tone="teal" layout="split-left" pillText="NEGOCIABLE" pillIcon count={7} title="Explora esta categoría" chip={{ label: "Categoría / Subcategoría" }} />,
  },
  {
    id: "centered",
    name: "Centrado",
    description: "Pill + título centrados, «N ofertas» debajo y chip de ruta en la esquina.",
    node: <LayoutBanner tone="naranja" layout="centered" pillText="EN VIVO" pillIcon count={17} title="Vehicular · Seminuevo" chip={{ label: "Vehicular / Seminuevo", icon: "car" }} />,
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
        description="Banner hero de las páginas de categoría: como En Vivo/Negociable más el chip de ruta inferior derecha con la categoría y subcategoría (Vehicular → Liviano/Pesado, Equipos diversos, Materiales…). La primera es el asset real; el resto, variantes de layout sin personaje. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
