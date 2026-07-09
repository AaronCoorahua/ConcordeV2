import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import EmpresaBanner from "@/src/blocks/banners/desktop/EmpresaBanner";
import EmpresaBannerAlt from "@/src/blocks/banners/desktop/EmpresaBannerAlt";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners/empresas — banner 766×192 de la página de empresa/vendedor.
 * Variantes modernas con los componentes reales (StatPill, StarIcon,
 * BusinessIcon, bordes gradiente); la referencia legacy va al final.
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
    id: "panel-morado",
    name: "Panel morado",
    description: "Fondo con el gradiente del header de DetailCard, logo circular blanco y las stats con los estilos del StatPill del bloque Sala (dark glass + borde VYStrokes).",
    node: <EmpresaBannerAlt {...DEMO} logoText="Maquisistema" layout="panel" />,
  },
  {
    id: "logo-left",
    name: "Logo grande a la izquierda",
    description: "Fondo claro: logo con gradiente de marca, rating con StarIcon del DS y cajas de stats con borde gradiente estilo CategoryCard.",
    node: <EmpresaBannerAlt {...DEMO} logoText="Maquisistema" layout="logo-left" />,
  },
  {
    id: "stats-bottom",
    name: "Stats en franja inferior",
    description: "Nombre y rating arriba con BusinessIcon del sidebar; las stats ocupan una franja inferior de ancho completo.",
    node: <EmpresaBannerAlt {...DEMO} logoText="Maquisistema" layout="stats-bottom" />,
  },
  {
    id: "legacy",
    name: "Maquisistema (legacy)",
    description: "Referencia del banner actual en vmcsubastas — estilo con ilustraciones que ya no se usa.",
    node: <EmpresaBanner {...DEMO} logoText="Maquisistema" />,
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
        description="Banner hero de la página de una empresa vendedora, con la nueva propuesta del design system: stats con los estilos del StatPill del bloque Sala, StarIcon, BusinessIcon y bordes gradiente. La referencia legacy (ilustraciones) va al final. Estático, sin efectos."
        templates={TEMPLATES}
      />
    </div>
  );
}
