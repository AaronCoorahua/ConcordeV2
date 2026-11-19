import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import LandingSubascarsBanner, { LANDING_SUBASCARS_WIDTH, LANDING_SUBASCARS_HEIGHT } from "@/src/blocks/banners/desktop/LandingSubascarsBanner";

/**
 * /banners/landing-subascars — hero de vmcsubastas.com/landing-subascars, copiado tal cual de producción (19/11).
 */

const TEMPLATES: BannerTemplate[] = [
  {
    id: "produccion",
    name: "Producción · Publica tu auto",
    description: "Copia exacta del hero de vmcsubastas.com/landing-subascars: degradado teal→violeta, luces naranjas, curva de fondo, titular con acentos lila, botón de vidrio «¡Publica ahora!», la persona señalando y tres propuestas en píldoras. Imágenes del CDN de producción.",
    node: <LandingSubascarsBanner />,
  },
];

export default function BannerLandingSubascarsPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner landing Subascars"
        format={`${LANDING_SUBASCARS_WIDTH} × ${LANDING_SUBASCARS_HEIGHT}`}
        slot="Landing Subascars → hero (escritorio)"
        description="Hero de la landing de Subascars en producción, traído tal cual a Concorde."
        templates={TEMPLATES}
      />
    </div>
  );
}
