import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import LandingSubascarsBanner, { LANDING_SUBASCARS_WIDTH, LANDING_SUBASCARS_HEIGHT } from "@/src/blocks/banners/desktop/LandingSubascarsBanner";
import LandingSubascarsGlass from "@/src/blocks/banners/desktop/LandingSubascarsGlass";
import { isBadgeStyle, type BadgeStyle } from "@/src/blocks/banners/desktop/LandingSubascarsBadges";
import BadgeTabs from "./BadgeTabs";

/**
 * /banners/landing-subascars — hero de vmcsubastas.com/landing-subascars (V1, con las correcciones de Julio)
 * y cuatro versiones más glass (V2–V5), con selector. ?v=<id> abre una versión y ?b=<estilo> cambia los precios.
 */

const templates = (b: BadgeStyle): BannerTemplate[] => [
  {
    id: "produccion",
    name: "Producción · Publica tu carro",
    description: "El hero de vmcsubastas.com/landing-subascars con las correcciones de Julio: «carro», GlassButton de Concorde más grande y propuestas más grandes. Imágenes del CDN de producción.",
    node: <LandingSubascarsBanner badges={b} />,
  },
  {
    id: "panel",
    name: "Panel glass · El texto en vidrio",
    description: "El titular y el botón dentro de un panel de vidrio esmerilado: el degradado, las luces y la curva se ven desenfocados detrás. Las propuestas pasan a píldoras de vidrio con texto blanco.",
    node: <LandingSubascarsGlass version={2} badges={b} />,
  },
  {
    id: "halo",
    name: "Halo glass · Orbe detrás de la persona",
    description: "El texto suelto como en producción y un orbe de vidrio grande detrás de la persona, con dos burbujas chicas que acompañan. El vidrio enmarca a quien recibe las propuestas.",
    node: <LandingSubascarsGlass version={3} badges={b} />,
  },
  {
    id: "noche",
    name: "Noche glass · Vidrio oscuro",
    description: "Fondo morado profundo con luces teal, naranja y violeta; panel y píldoras de vidrio oscuro. Acento del titular en teal para que se lea sobre el morado.",
    node: <LandingSubascarsGlass version={4} badges={b} />,
  },
  {
    id: "tarjeta",
    name: "Tarjeta glass · La persona sale de la tarjeta",
    description: "Todo dentro de una tarjeta de vidrio sobre un fondo con luces más vivas; la tarjeta empieza más abajo y la cabeza de la persona sale por arriba, con la primera propuesta montada sobre el borde.",
    node: <LandingSubascarsGlass version={5} badges={b} />,
  },
];

export default async function BannerLandingSubascarsPage({ searchParams }: { searchParams: Promise<{ b?: string }> }): Promise<JSX.Element> {
  const { b } = await searchParams;
  const badges: BadgeStyle = isBadgeStyle(b) ? b : "original";
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner landing Subascars"
        format={`${LANDING_SUBASCARS_WIDTH} × ${LANDING_SUBASCARS_HEIGHT}`}
        slot="Landing Subascars → hero (escritorio)"
        description="Hero de la landing de Subascars (V1, producción con las correcciones de Julio) y cuatro versiones más glass para comparar. Elige la versión arriba."
        templates={templates(badges)}
        selectable
        toolbar={<BadgeTabs active={badges} />}
      />
    </div>
  );
}
