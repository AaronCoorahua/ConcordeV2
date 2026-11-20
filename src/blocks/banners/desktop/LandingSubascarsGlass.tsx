/**
 * LandingSubascarsGlass — versiones «más glass» del banner landing Subascars (19/11), sobre la V1 (LandingSubascarsBanner).
 * Mismo texto, misma persona y mismas propuestas; cambia cómo se usa el vidrio:
 *   2 · Panel      el texto dentro de un panel de vidrio esmerilado; propuestas en píldoras de vidrio.
 *   3 · Halo       un orbe de vidrio detrás de la persona; el texto suelto como en la V1.
 *   4 · Noche      fondo morado profundo con luces teal y naranja; panel y píldoras de vidrio oscuro.
 *   5 · Tarjeta    todo dentro de una tarjeta de vidrio; la persona sale por arriba de la tarjeta.
 * El vidrio es backdrop-filter sobre el degradado y las luces del fondo (lo que hay detrás se ve desenfocado),
 * con el borde degradado de los botones glass (blanco → naranja → violeta → blanco) y un brillo interior arriba.
 */
import type { CSSProperties, JSX, ReactNode } from "react";
import GlassButton from "@/src/components/GlassButton";
import { PriceBadges, type BadgeStyle } from "./LandingSubascarsBadges";
import { ACCENT, CTA_CSS, GLOW, IMG, LANDING_SUBASCARS_HEIGHT, LANDING_SUBASCARS_WIDTH, MoneyIcon, jakarta } from "./LandingSubascarsBanner";

export type GlassVersion = 2 | 3 | 4 | 5;

const GLASS_CSS = String.raw`
.lsg-glass { position: absolute; isolation: isolate;
  background: linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.07) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(150%); backdrop-filter: blur(18px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), 0 18px 40px -14px rgba(34,0,92,0.45); }
.lsg-glass::before { content: ""; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(244,172,89,0.7) 30%, rgba(132,96,229,0.6) 70%, rgba(255,255,255,0.7) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
.lsg-glass--dark { background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 18px 40px -14px rgba(0,0,0,0.55); }
.lsg-glass--dark::before { opacity: 0.6; }
.lsg-pill { position: absolute; height: 32px; display: inline-flex; align-items: center; gap: 5px; padding: 0 12px 0 9px; border-radius: 9999px;
  font-size: 12px; font-weight: 800; color: #fff; white-space: nowrap; text-shadow: 0 1px 2px rgba(34,0,92,0.35);
  background: linear-gradient(135deg, rgba(59,23,130,0.42) 0%, rgba(59,23,130,0.22) 100%);
  -webkit-backdrop-filter: blur(14px) saturate(160%); backdrop-filter: blur(14px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.35), 0 8px 20px -6px rgba(34,0,92,0.45); }
.lsg-pill--dark { background: linear-gradient(135deg, rgba(34,0,92,0.55) 0%, rgba(34,0,92,0.3) 100%); }
`;

/** Acento teal para la versión de noche (el teal del degradado de la V1, aclarado para leerse sobre morado oscuro). */
const ACCENT_TEAL: CSSProperties = {
  background: "linear-gradient(135deg, #D9FEFF 0%, #7FF0F2 45%, #00C9CC 75%, #AE8EFF 100%)",
  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
};

/** Acento cálido para la tarjeta (lila sobre vidrio lila no se lee): blanco → naranja 400 de Concorde. */
const ACCENT_WARM: CSSProperties = {
  background: "linear-gradient(135deg, #FFFFFF 0%, #FFE3C2 45%, #FBC47D 100%)",
  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
};

const TITLE: CSSProperties = { position: "absolute", margin: 0, color: "#fff", fontWeight: 800, letterSpacing: "-0.0255em" };

function Title({ accent = ACCENT, style }: { accent?: CSSProperties; style: CSSProperties }): JSX.Element {
  return (
    <h1 style={{ ...TITLE, ...style }}>
      <span style={accent}>¡Publica tu carro</span> y recibe propuestas hoy, <span style={accent}>véndelo al mejor postor!</span>
    </h1>
  );
}

function Pill({ id, left, top, amount, dark }: { id: string; left: number; top: number; amount: string; dark?: boolean }): JSX.Element {
  return (
    <span className={`lsg-pill${dark ? " lsg-pill--dark" : ""}`} style={{ left, top }}>
      <MoneyIcon id={id} from="#FFFFFF" to="#E8DEFF" />{amount}
    </span>
  );
}

function Person({ top = 28, left = 378.27 }: { top?: number; left?: number }): JSX.Element {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="Persona señalando ofertas recibidas en su celular" src={`${IMG}/hero-car.png`} style={{ position: "absolute", left, top, width: 360, height: 250, objectFit: "cover" }} />;
}

function Cta({ href, style }: { href?: string; style: CSSProperties }): JSX.Element {
  return (
    <div style={{ position: "absolute", ...style }}>
      {href ? <GlassButton href={href} className="lsc-cta">¡Publica ahora!</GlassButton> : <GlassButton className="lsc-cta">¡Publica ahora!</GlassButton>}
    </div>
  );
}

function Curve({ opacity = 0.3 }: { opacity?: number }): JSX.Element {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" aria-hidden="true" src={`${IMG}/hero-curve.svg`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity, pointerEvents: "none" }} />;
}

const Blob = ({ style }: { style: CSSProperties }): JSX.Element => <div aria-hidden="true" style={{ ...GLOW, ...style }} />;

function Frame({ v, background, children }: { v: GlassVersion; background: string; children: ReactNode }): JSX.Element {
  return (
    <section className={jakarta.className} data-version={v} style={{ position: "relative", width: LANDING_SUBASCARS_WIDTH, height: LANDING_SUBASCARS_HEIGHT,
      overflow: "hidden", borderRadius: 16, background, fontFamily: jakarta.style.fontFamily }}>
      <style href="landing-subascars-cta" precedence="default">{CTA_CSS}</style>
      <style href="landing-subascars-glass-v" precedence="default">{GLASS_CSS}</style>
      {children}
    </section>
  );
}

const V1_BG = "linear-gradient(164deg, rgb(0, 174, 177) 0%, rgb(132, 96, 229) 100%)";

export default function LandingSubascarsGlass({ version, href, badges = "original" }: { version: GlassVersion; href?: string; badges?: BadgeStyle }): JSX.Element {
  // Con otro estilo de precios, las tres píldoras de la versión se reemplazan por las de LandingSubascarsBadges.
  const alt = badges === "original" ? null : badges === "fondo" ? <></> : <PriceBadges style={badges} idp={`lsg${version}`} />;
  // «Al fondo» va antes que la foto, para que la persona quede delante.
  const back = badges === "fondo" ? <PriceBadges style="fondo" idp={`lsg${version}`} /> : null;
  if (version === 2) return (
    <Frame v={2} background={V1_BG}>
      <Blob style={{ left: 555, top: -124 }} /><Blob style={{ left: -176, top: -15 }} />
      <Blob style={{ left: 180, top: 120, background: "rgba(0, 174, 177, 0.45)" }} />
      <Curve />
      <div className="lsg-glass" style={{ left: 20, top: 20, width: 420, height: 232, borderRadius: 22 }} />
      <Title style={{ left: 42, top: 38, width: 380, fontSize: 30, lineHeight: "38px" }} />
      <Cta href={href} style={{ left: 42, top: 182 }} />
      {back}
      <Person />
      {alt ?? <>
      <Pill id="lsg2-a" left={452} top={38} amount="US$ 19,850" />
      <Pill id="lsg2-b" left={486} top={212} amount="US$ 13,200" />
      <Pill id="lsg2-c" left={636} top={96} amount="US$ 20,550" /></>}
    </Frame>
  );
  if (version === 3) return (
    <Frame v={3} background={V1_BG}>
      <Blob style={{ left: 555, top: -124 }} /><Blob style={{ left: -176, top: -15 }} />
      <Curve opacity={0.22} />
      {/* Orbe de vidrio detrás de la persona y uno chico arriba a la derecha. */}
      <div className="lsg-glass" style={{ left: 432, top: 22, width: 270, height: 270, borderRadius: "50%" }} />
      <div className="lsg-glass" style={{ left: 690, top: -36, width: 110, height: 110, borderRadius: "50%" }} />
      <div className="lsg-glass" style={{ left: 392, top: 196, width: 46, height: 46, borderRadius: "50%" }} />
      <Title style={{ left: 36, top: 30, width: 407, fontSize: 32, lineHeight: "42px" }} />
      <Cta href={href} style={{ left: 36, top: 192 }} />
      {back}
      <Person />
      {alt ?? <>
      <Pill id="lsg3-a" left={452} top={38} amount="US$ 19,850" />
      <Pill id="lsg3-b" left={486} top={212} amount="US$ 13,200" />
      <Pill id="lsg3-c" left={636} top={96} amount="US$ 20,550" /></>}
    </Frame>
  );
  if (version === 4) return (
    <Frame v={4} background="linear-gradient(135deg, #22005C 0%, #3B1782 55%, #5A35C2 100%)">
      <Blob style={{ left: 520, top: -150, background: "rgba(0, 174, 177, 0.55)" }} />
      <Blob style={{ left: -150, top: 80, background: "rgba(237, 137, 54, 0.38)" }} />
      <Blob style={{ left: 600, top: 140, background: "rgba(132, 96, 229, 0.6)" }} />
      <Curve opacity={0.18} />
      <div className="lsg-glass lsg-glass--dark" style={{ left: 20, top: 20, width: 420, height: 232, borderRadius: 22 }} />
      <Title accent={ACCENT_TEAL} style={{ left: 42, top: 38, width: 380, fontSize: 30, lineHeight: "38px" }} />
      <Cta href={href} style={{ left: 42, top: 182 }} />
      {back}
      <Person />
      {alt ?? <>
      <Pill id="lsg4-a" left={452} top={38} amount="US$ 19,850" dark />
      <Pill id="lsg4-b" left={486} top={212} amount="US$ 13,200" dark />
      <Pill id="lsg4-c" left={636} top={96} amount="US$ 20,550" dark /></>}
    </Frame>
  );
  return (
    <Frame v={5} background="linear-gradient(120deg, #00AEB1 0%, #6B48DD 55%, #8460E5 100%)">
      <Blob style={{ left: 470, top: -140, background: "rgba(237, 137, 54, 0.55)" }} />
      <Blob style={{ left: -140, top: 60, background: "rgba(0, 210, 211, 0.5)" }} />
      <Blob style={{ left: 300, top: 150, background: "rgba(174, 142, 255, 0.55)" }} />
      {/* Tarjeta de vidrio con todo adentro; empieza más abajo para que la cabeza de la persona salga por arriba. */}
      <div className="lsg-glass" style={{ left: 14, top: 72, width: 738, height: 186, borderRadius: 24 }} />
      <Title accent={ACCENT_WARM} style={{ left: 38, top: 88, width: 380, fontSize: 26, lineHeight: "33px" }} />
      <Cta href={href} style={{ left: 38, top: 196 }} />
      {back}
      <Person top={22} left={386} />
      {alt ?? <>
      <Pill id="lsg5-a" left={452} top={30} amount="US$ 19,850" />
      <Pill id="lsg5-b" left={494} top={206} amount="US$ 13,200" />
      <Pill id="lsg5-c" left={636} top={92} amount="US$ 20,550" /></>}
    </Frame>
  );
}
