import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import EmpresaBanner from "@/src/blocks/banners/desktop/EmpresaBanner";
import EmpresaBannerAlt from "@/src/blocks/banners/desktop/EmpresaBannerAlt";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/empresas — banner 766×272 de la página de empresa/vendedor.
 * 01 = asset real de producción (header_empresa); 02+ = variantes de layout
 * sin personaje (solo logo, rating, reseña y stats en distintas posiciones).
 */

const DEMO = {
  nombre: "Maquisistema",
  rating: "3.8",
  ratingLabel: "Buen Vendedor",
  opiniones: "44 opiniones",
  descripcion: "Es una de las principales empresas administradoras de Fondos Colectivos del país. Con 28 años en el mercado ayudando a cumplir el sueño del AUTO o CASA PROPIA.",
  ventas: "365",
  participantes: "3,245",
};

const TEMPLATES: BannerTemplate[] = [
  {
    id: "asset",
    name: "Maquisistema (asset)",
    description: "Banner real de vmcsubastas (personaje, círculo del logo y cajas Ventas/Participantes ya vienen en el PNG). Se sobreponen logo, nombre, rating, reseña y los valores de stats.",
    node: <EmpresaBanner {...DEMO} logoText="Maquisistema" />,
  },
  {
    id: "logo-left",
    name: "Logo grande a la izquierda",
    description: "Sin personaje. Logo circular grande a la izquierda, datos al centro y stats en fila a la derecha.",
    node: <EmpresaBannerAlt {...DEMO} logoText="Maquisistema" layout="logo-left" />,
  },
  {
    id: "stats-bottom",
    name: "Stats en franja inferior",
    description: "Sin personaje. Nombre y rating arriba a la izquierda; las stats ocupan una franja inferior de ancho completo.",
    node: <EmpresaBannerAlt {...DEMO} logoText="Maquisistema" layout="stats-bottom" />,
  },
];

export default function BannerEmpresasPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner Empresas"
        format={`${BANNER_WIDTH} × ${BANNER_HEIGHT}`}
        slot="Página de empresa / vendedor"
        description="Banner hero de la página de una empresa vendedora: logo, rating con opiniones, reseña y stats de Ventas y Participantes. La primera usa el asset real de producción; el resto son variantes de layout sin personaje. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
