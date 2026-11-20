import type { JSX } from "react";
import Header from "@/app/_components/Header";
import BannerGallery, { type BannerTemplate } from "@/app/banners/_components/BannerGallery";
import { LANDING_SUBASCARS_WIDTH, LANDING_SUBASCARS_HEIGHT } from "@/src/blocks/banners/desktop/LandingSubascarsBanner";
import { isBadgeStyle, type BadgeStyle } from "@/src/blocks/banners/desktop/LandingSubascarsBadges";
import LandingSubascarsPhoto from "@/src/blocks/banners/desktop/LandingSubascarsPhoto";
import LandingSubascarsPhotoMobile, { LANDING_SUBASCARS_MOBILE_WIDTH, LANDING_SUBASCARS_MOBILE_HEIGHT } from "@/src/blocks/banners/mobile/LandingSubascarsPhotoMobile";
import BadgeTabs, { type Screen } from "./BadgeTabs";

/**
 * /banners/landing-subascars — hero de la landing de Subascars con foto: cinco versiones, una por foto (20/11),
 * con selector. ?v=<id> abre una versión, ?d=mobile muestra la versión mobile (400×616) y ?b=<estilo> cambia los precios.
 * Las versiones anteriores (producción y las cuatro glass) se quitaron a pedido.
 */

/** Una versión por foto: la foto entera a la derecha y encima solo titular, botón y tres propuestas. */
const PHOTO_VERSIONS: [string, string, string][] = [
  ["camioneta", "Camioneta · Foto naranja", "Él entrega la llave sentado en la tolva de una camioneta blanca, fondo naranja con luces. El texto va sobre el naranja vacío de la izquierda."],
  ["suv", "SUV · Foto teal", "Ella con la llave junto a una SUV roja, fondo teal y lila. Las propuestas flotan en el aire libre, sin taparle la cara."],
  ["sedan", "Sedán · Foto verde", "Él ofrece la llave apoyado en un sedán oscuro, fondo verde con luces violetas."],
  ["van", "Van · Foto morada", "Ella ofrece la llave saliendo de una van, fondo morado con luces rosadas."],
  ["plateado", "Plateado · Foto lila", "Ella camina con la llave junto a un carro plateado, fondo lila con luces naranjas."],
];

const templates = (b: BadgeStyle, d: Screen): BannerTemplate[] =>
  PHOTO_VERSIONS.map(function toTemplate([id, name, description], i) {
    const photo = (i + 1) as 1 | 2 | 3 | 4 | 5;
    return { id, name, description, node: d === "mobile" ? <LandingSubascarsPhotoMobile photo={photo} badges={b} /> : <LandingSubascarsPhoto photo={photo} badges={b} /> };
  });

export default async function BannerLandingSubascarsPage({ searchParams }: { searchParams: Promise<{ b?: string; d?: string }> }): Promise<JSX.Element> {
  const { b, d } = await searchParams;
  const badges: BadgeStyle = isBadgeStyle(b) ? b : "original";
  const screen: Screen = d === "mobile" ? "mobile" : "desktop";
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />
      <BannerGallery
        title="Banner landing Subascars"
        format={screen === "mobile" ? `${LANDING_SUBASCARS_MOBILE_WIDTH} × ${LANDING_SUBASCARS_MOBILE_HEIGHT}` : `${LANDING_SUBASCARS_WIDTH} × ${LANDING_SUBASCARS_HEIGHT}`}
        slot={screen === "mobile" ? "Landing Subascars → hero (mobile)" : "Landing Subascars → hero (escritorio)"}
        description="Hero de la landing de Subascars con foto: cinco versiones, una por foto, con el titular, el botón y tres propuestas, en escritorio y mobile. Elige la versión arriba."
        templates={templates(badges, screen)}
        selectable
        toolbar={<BadgeTabs active={badges} screen={screen} />}
      />
    </div>
  );
}
