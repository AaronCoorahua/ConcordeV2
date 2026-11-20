/**
 * LandingSubascarsPhotoMobile — versión mobile (400×616, la medida del hero mobile de producción) de las cinco
 * versiones con foto. Arriba el titular y el botón; abajo la foto, recortada a lo ancho para que entren la persona,
 * la llave y parte del carro, fundida por arriba con la misma foto desenfocada. Tres propuestas alrededor de la persona.
 */
import type { CSSProperties, JSX } from "react";
import GlassButton from "@/src/components/GlassButton";
import { ACCENT, CTA_CSS, IMG, jakarta } from "../desktop/LandingSubascarsBanner";
import { PriceBadges, type BadgeStyle } from "../desktop/LandingSubascarsBadges";
import { Flat, PHOTOS, at } from "../desktop/LandingSubascarsPhoto";

export const LANDING_SUBASCARS_MOBILE_WIDTH = 400;
export const LANDING_SUBASCARS_MOBILE_HEIGHT = 616;

/** Alto de la foto (va pegada abajo); su ancho sale de la proporción 1600×893. */
const H = 400;
const W = Math.round((H * 1600) / 893);

/** Por foto: left = corrimiento horizontal (centra a la persona con la llave y deja ver el carro), y las propuestas. */
const MOBILE: Record<number, { left: number; places: ReturnType<typeof at> }> = {
  1: { left: -272, places: at([[226, 218, -6, 0.88], [14, 290, 5, 0.88], [262, 336, 6, 0.86]]) },
  2: { left: -272, places: at([[10, 214, -6, 0.88], [232, 236, 5, 0.88], [12, 330, 6, 0.86]]) },
  3: { left: -287, places: at([[226, 214, -6, 0.88], [8, 340, 5, 0.88], [258, 304, 6, 0.86]]) },
  4: { left: -294, places: at([[10, 226, -6, 0.88], [256, 226, 5, 0.88], [10, 350, 6, 0.86]]) },
  5: { left: -308, places: at([[8, 236, -6, 0.88], [240, 218, 5, 0.88], [256, 332, 6, 0.86]]) },
};

export default function LandingSubascarsPhotoMobile({ photo, href, badges = "original" }: { photo: 1 | 2 | 3 | 4 | 5; href?: string; badges?: BadgeStyle }): JSX.Element {
  const p = PHOTOS[photo];
  const m = MOBILE[photo];
  const idp = `lspm${photo}`;
  const shadow: CSSProperties = { textShadow: "0 2px 14px rgba(0,0,0,0.25)" };
  const fade = "linear-gradient(180deg, transparent 0%, #000 22%)";
  return (
    <section className={jakarta.className} style={{ position: "relative", width: LANDING_SUBASCARS_MOBILE_WIDTH, height: LANDING_SUBASCARS_MOBILE_HEIGHT, overflow: "hidden", borderRadius: 16,
      background: "#22005C", fontFamily: jakarta.style.fontFamily }}>
      <style href="landing-subascars-cta" precedence="default">{CTA_CSS}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden="true" src={`${IMG}/fotos/${p.src}.jpg`} style={{ position: "absolute", left: -40, top: -40, width: "calc(100% + 80px)", height: "calc(100% + 80px)",
        objectFit: "cover", objectPosition: "0% 50%", filter: "blur(28px)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Persona entregando la llave de su carro" src={`${IMG}/fotos/${p.src}.jpg`} style={{ position: "absolute", left: m.left, bottom: 0, height: H, width: W, maxWidth: "none",
        WebkitMaskImage: fade, maskImage: fade }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${p.veil} 0%, ${p.veil} 26%, transparent 46%)`, pointerEvents: "none" }} />
      <h1 style={{ position: "absolute", left: 24, top: 28, width: 352, margin: 0, color: "#fff", fontSize: 24, lineHeight: "32px", fontWeight: 800, letterSpacing: "-0.0255em", ...shadow }}>
        <span style={ACCENT}>¡Publica tu carro</span> y recibe propuestas hoy, <span style={ACCENT}>véndelo al mejor postor!</span>
      </h1>
      <div style={{ position: "absolute", left: 24, top: 144 }}>
        {href
          ? <GlassButton href={href} className="lsc-cta">¡Publica ahora!</GlassButton>
          : <GlassButton className="lsc-cta">¡Publica ahora!</GlassButton>}
      </div>
      {badges === "original"
        ? m.places.map((it, i) => <Flat key={i} it={it} id={`${idp}-${i}`} />)
        : <PriceBadges style={badges} idp={idp} hangFrom={196} places={badges === "fondo" ? m.places.map((it) => ({ ...it, s: it.s * 0.74 })) : m.places} />}
    </section>
  );
}
