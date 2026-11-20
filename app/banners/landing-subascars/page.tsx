import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import { LANDING_SUBASCARS_WIDTH, LANDING_SUBASCARS_HEIGHT } from "@/src/blocks/banners/desktop/LandingSubascarsBanner";
import { isBadgeStyle, type BadgeStyle } from "@/src/blocks/banners/desktop/LandingSubascarsBadges";
import LandingSubascarsPhoto, { type PhotoId } from "@/src/blocks/banners/desktop/LandingSubascarsPhoto";
import LandingSubascarsPhotoMobile, { LANDING_SUBASCARS_MOBILE_WIDTH, LANDING_SUBASCARS_MOBILE_HEIGHT } from "@/src/blocks/banners/mobile/LandingSubascarsPhotoMobile";
import BadgeTabs, { type Screen } from "./BadgeTabs";

/**
 * /banners/landing-subascars — hero de la landing de Subascars con foto: tres versiones, una por foto (20/11; se quitaron Camioneta y Sedán),
 * con selector. ?v=<id> abre una versión, ?d=mobile muestra la versión mobile (400×616) y ?b=<estilo> cambia los precios.
 * Las versiones anteriores (producción y las cuatro glass) se quitaron a pedido.
 */

/** Una versión por foto: la foto entera a la derecha y encima solo titular, botón y tres propuestas. */
const PHOTO_VERSIONS: [string, PhotoId, string, string][] = [
  ["van", 4, "Van · Foto morada", "Ella ofrece la llave saliendo de una van, fondo morado con luces rosadas. Es la que se abre por defecto."],
  ["suv", 2, "SUV · Foto teal", "Ella con la llave junto a una SUV roja, fondo teal y lila. Las propuestas flotan en el aire libre, sin taparle la cara."],
  ["plateado", 5, "Plateado · Foto lila", "Ella camina con la llave junto a un carro plateado, fondo lila con luces naranjas."],
];

const templates = (b: BadgeStyle, d: Screen): BannerTemplate[] =>
  PHOTO_VERSIONS.map(function toTemplate([id, photo, name, description]) {
    return { id, name, description, node: d === "mobile" ? <LandingSubascarsPhotoMobile photo={photo} badges={b} /> : <LandingSubascarsPhoto photo={photo} badges={b} /> };
  });

export default async function BannerLandingSubascarsPage({ searchParams }: { searchParams: Promise<{ b?: string; d?: string }> }): Promise<JSX.Element> {
  const { b, d } = await searchParams;
  const badges: BadgeStyle = isBadgeStyle(b) ? b : "colgante"; // por defecto: Van con Colgantes
  const screen: Screen = d === "mobile" ? "mobile" : "desktop";
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner landing Subascars"
        format={screen === "mobile" ? `${LANDING_SUBASCARS_MOBILE_WIDTH} × ${LANDING_SUBASCARS_MOBILE_HEIGHT}` : `${LANDING_SUBASCARS_WIDTH} × ${LANDING_SUBASCARS_HEIGHT}`}
        slot={screen === "mobile" ? "Landing Subascars → hero (mobile)" : "Landing Subascars → hero (escritorio)"}
        description="Hero de la landing de Subascars con foto: tres versiones, una por foto, con el titular, el botón y tres propuestas, en escritorio y mobile. Elige la versión arriba."
        templates={templates(badges, screen)}
        selectable
        toolbar={<BadgeTabs active={badges} screen={screen} />}
      />
    </div>
  );
}
