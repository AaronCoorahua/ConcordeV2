/**
 * LandingSubascarsPhoto — versiones con foto (20/11): la foto completa de fondo y encima solo el titular, el botón
 * «¡Publica ahora!» y tres propuestas. El texto va a la izquierda, donde la foto está vacía, con un velo del color
 * de la foto para que se lea; las propuestas van en el aire libre alrededor de la persona, sin taparle la cara.
 * Fotos (Descargas, 2752×1536) reducidas a 1600 px en /public/banners/landing-subascars/fotos/.
 */
import type { CSSProperties, JSX } from "react";
import GlassButton from "@/src/components/GlassButton";
import { ACCENT, CTA_CSS, IMG, LANDING_SUBASCARS_HEIGHT, LANDING_SUBASCARS_WIDTH, MoneyIcon, jakarta } from "./LandingSubascarsBanner";
import { PriceBadges, type BadgeStyle, type Item } from "./LandingSubascarsBadges";

type Photo = {
  src: string;
  /** Alto de la foto: entra casi entera a la derecha (la foto es 16:9 y el banner, más ancho). */
  h: number;
  /** Corrimiento vertical de la foto (negativo = recorta arriba). */
  top: number;
  /** Velo de la izquierda, del color de la foto. */
  veil: string;
  places: Item[];
};

const amounts = ["US$ 19,850", "US$ 13,200", "US$ 20,550"];
const at = (p: [number, number, number, number][]): Item[] =>
  p.map(([left, top, r, s], i) => ({ amount: amounts[i], left, top, r, s, d: ["0s", "-1.4s", "-2.6s"][i] }));

export const PHOTOS: Record<number, Photo> = {
  1: { src: "foto-1", h: 290, top: -8, veil: "rgba(140, 52, 6, 0.5)", places: at([[606, 8, -6, 0.88], [392, 66, 5, 0.9], [626, 128, 6, 0.86]]) },
  2: { src: "foto-2", h: 290, top: -8, veil: "rgba(0, 86, 100, 0.6)", places: at([[396, 18, -6, 0.88], [372, 150, 5, 0.9], [628, 100, 6, 0.86]]) },
  3: { src: "foto-3", h: 290, top: -8, veil: "rgba(0, 70, 36, 0.55)", places: at([[628, 6, -6, 0.88], [404, 60, 5, 0.9], [412, 180, 6, 0.86]]) },
  4: { src: "foto-4", h: 290, top: -8, veil: "rgba(34, 6, 100, 0.6)", places: at([[408, 20, -6, 0.88], [384, 150, 5, 0.9], [626, 70, 6, 0.86]]) },
  5: { src: "foto-5", h: 290, top: -8, veil: "rgba(52, 18, 116, 0.6)", places: at([[624, 8, -6, 0.88], [416, 60, 5, 0.9], [410, 172, 6, 0.86]]) },
};

/** Propuesta plana (estilo «Planos»), con la inclinación de su lugar. */
function Flat({ it, id }: { it: Item; id: string }): JSX.Element {
  return (
    <span style={{ position: "absolute", left: it.left, top: it.top, height: 34, display: "inline-flex", alignItems: "center", gap: 4, borderRadius: 9999, background: "#fff",
      padding: "0 11px 0 8px", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", boxShadow: "0 6px 16px 0 rgba(34,0,92,0.28)", transform: `rotate(${it.r}deg) scale(${it.s})` }}>
      <MoneyIcon id={id} />
      <span style={{ background: "linear-gradient(193deg, rgb(174, 142, 255) 0%, rgb(90, 53, 194) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{it.amount}</span>
    </span>
  );
}

export default function LandingSubascarsPhoto({ photo, href, badges = "original" }: { photo: 1 | 2 | 3 | 4 | 5; href?: string; badges?: BadgeStyle }): JSX.Element {
  const p = PHOTOS[photo];
  const idp = `lsp${photo}`;
  const shadow: CSSProperties = { textShadow: "0 2px 14px rgba(0,0,0,0.25)" };
  return (
    <section className={jakarta.className} style={{ position: "relative", width: LANDING_SUBASCARS_WIDTH, height: LANDING_SUBASCARS_HEIGHT, overflow: "hidden", borderRadius: 16,
      background: "#22005C", fontFamily: jakarta.style.fontFamily }}>
      <style href="landing-subascars-cta" precedence="default">{CTA_CSS}</style>
      {/* Sin zoom: la foto entra casi entera a la derecha (se ven la llave y el carro); el resto del ancho lo llena
          la misma foto desenfocada, y la foto se funde con ella por la izquierda. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden="true" src={`${IMG}/fotos/${p.src}.jpg`} style={{ position: "absolute", left: -40, top: -40, width: "calc(100% + 80px)", height: "calc(100% + 80px)",
        objectFit: "cover", objectPosition: "0% 50%", filter: "blur(28px)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Persona entregando la llave de su carro" src={`${IMG}/fotos/${p.src}.jpg`} style={{ position: "absolute", right: 0, top: p.top, height: p.h, width: Math.round((p.h * 1600) / 893),
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 30%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 30%)" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${p.veil} 0%, ${p.veil} 28%, transparent 56%)`, pointerEvents: "none" }} />
      <h1 style={{ position: "absolute", left: 36, top: 32, width: 336, margin: 0, color: "#fff", fontSize: 28, lineHeight: "36px", fontWeight: 800, letterSpacing: "-0.0255em", ...shadow }}>
        <span style={ACCENT}>¡Publica tu carro</span> y recibe propuestas hoy, <span style={ACCENT}>véndelo al mejor postor!</span>
      </h1>
      <div style={{ position: "absolute", left: 36, top: 184 }}>
        {href
          ? <GlassButton href={href} className="lsc-cta">¡Publica ahora!</GlassButton>
          : <GlassButton className="lsc-cta">¡Publica ahora!</GlassButton>}
      </div>
      {badges === "original"
        ? p.places.map((it, i) => <Flat key={i} it={it} id={`${idp}-${i}`} />)
        : <PriceBadges style={badges} idp={idp} places={badges === "fondo"
          // En la foto no hay capa «detrás de la persona»: las fichas grandes van delante, más chicas y sin salirse.
          ? p.places.map((it) => ({ ...it, s: it.s * 0.74, left: it.left > 560 ? it.left - 28 : it.left }))
          : p.places} />}
    </section>
  );
}
