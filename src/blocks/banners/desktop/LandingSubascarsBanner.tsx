/**
 * LandingSubascarsBanner — hero de vmcsubastas.com/landing-subascars, copiado tal cual (19/11) del HTML de producción.
 * 766×272, degradado teal→violeta, dos luces naranjas, anillo, curva de fondo, titular con acentos en degradado lila,
 * botón de vidrio «¡Publica ahora!», la persona señalando (hero-car.png) y tres píldoras de propuestas.
 * Imágenes descargadas del CDN de producción a /public/banners/landing-subascars/.
 * Correcciones de Julio (19/11): «carro» en vez de «auto»; el botón es GlassButton de Concorde (hover, active y foco)
 * y más grande (48 px, 16 px de texto); las burbujas de propuesta más grandes (32 px de alto, 12 px de texto).
 */
import type { CSSProperties, JSX } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import GlassButton from "@/src/components/GlassButton";
import { PriceBadges, type BadgeStyle } from "./LandingSubascarsBadges";

// Concorde carga Plus Jakarta solo en 600 (app/layout.tsx); producción usa 800 en el titular y 700 en las píldoras.
export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });

export const LANDING_SUBASCARS_WIDTH = 766;
export const LANDING_SUBASCARS_HEIGHT = 272;

export const IMG = "/banners/landing-subascars";

/** GlassButton de Concorde con más presencia: solo cambia la medida, los efectos son los suyos. */
export const CTA_CSS = String.raw`.hib-glass.lsc-cta { height: 48px; padding: 0 36px; font-family: inherit; font-size: 16px; font-weight: 700; }`;

/** Acento del titular: degradado lila recortado al texto. */
export const ACCENT: CSSProperties = {
  background: "linear-gradient(135deg, rgb(232, 222, 255) 0%, rgb(255, 255, 255) 40%, rgb(207, 186, 255) 75%, rgb(174, 142, 255) 100%)",
  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
};

export const GLOW: CSSProperties = { position: "absolute", width: 320, height: 320, borderRadius: "9999px", background: "rgba(237, 137, 54, 0.3)", filter: "blur(60px)", pointerEvents: "none" };

/** Ícono de billetes de las píldoras (con su degradado #AE8EFF→#5A35C2). */
export function MoneyIcon({ id, from = "#AE8EFF", to = "#5A35C2" }: { id: string; from?: string; to?: string }): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11.5 11C10.8056 11 10.2153 10.7569 9.72917 10.2708C9.24306 9.78472 9 9.19444 9 8.5C9 7.80556 9.24306 7.21528 9.72917 6.72917C10.2153 6.24306 10.8056 6 11.5 6C12.1944 6 12.7847 6.24306 13.2708 6.72917C13.7569 7.21528 14 7.80556 14 8.5C14 9.19444 13.7569 9.78472 13.2708 10.2708C12.7847 10.7569 12.1944 11 11.5 11ZM5.5 13C5.0875 13 4.73438 12.853 4.44062 12.559C4.14687 12.2651 4 11.9117 4 11.4988V5.49417C4 5.08139 4.14687 4.72917 4.44062 4.4375C4.73438 4.14583 5.0875 4 5.5 4H17.5C17.9125 4 18.2656 4.14701 18.5594 4.44104C18.8531 4.73493 19 5.08833 19 5.50125V11.5058C19 11.9186 18.8531 12.2708 18.5594 12.5625C18.2656 12.8542 17.9125 13 17.5 13H5.5ZM7 11.5H16C16 11.0833 16.1469 10.7283 16.4406 10.435C16.7344 10.1418 17.0875 9.99521 17.5 9.99521V7C17.0875 7 16.7344 6.85312 16.4406 6.55937C16.1469 6.26562 16 5.9125 16 5.5H7C7 5.91667 6.85313 6.27167 6.55938 6.565C6.26563 6.85819 5.9125 7.00479 5.5 7.00479V10C5.9125 10 6.26563 10.1469 6.55938 10.4406C6.85313 10.7344 7 11.0875 7 11.5ZM16.5 16H2.5C2.0875 16 1.73438 15.8531 1.44063 15.5594C1.14688 15.2656 1 14.9125 1 14.5V6H2.5V14.5H16.5V16Z" fill={`url(#${id})`} />
      <defs>
        <linearGradient id={id} x1="14.8971" y1="-4.63092" x2="-4.43805" y2="4.56054" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} /><stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Pill({ id, left, top, amount }: { id: string; left: number; top: number; amount: string }): JSX.Element {
  return (
    <span style={{ position: "absolute", left, top, height: 32, display: "inline-flex", alignItems: "center", gap: 4, borderRadius: 9999, background: "#fff",
      padding: "0 10px 0 8px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap", boxShadow: "0 4px 12px 0 rgba(34,0,92,0.16)" }}>
      <MoneyIcon id={id} />
      <span style={{ background: "linear-gradient(193deg, rgb(174, 142, 255) 0%, rgb(90, 53, 194) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{amount}</span>
    </span>
  );
}

export interface LandingSubascarsBannerProps {
  /** Destino del botón; sin él es un <button> como en producción. */
  href?: string;
}

export default function LandingSubascarsBanner({ href, badges = "original" }: LandingSubascarsBannerProps & { badges?: BadgeStyle }): JSX.Element {
  return (
    <section className={jakarta.className} style={{ position: "relative", width: LANDING_SUBASCARS_WIDTH, height: LANDING_SUBASCARS_HEIGHT, overflow: "hidden", borderRadius: 16,
      background: "linear-gradient(164deg, rgb(0, 174, 177) 0%, rgb(132, 96, 229) 100%)", fontFamily: jakarta.style.fontFamily }}>
      <style href="landing-subascars-cta" precedence="default">{CTA_CSS}</style>
      <div aria-hidden="true" style={{ position: "absolute", left: -110, top: -130, width: 300, height: 300, borderRadius: 9999, border: "2px solid rgba(255, 255, 255, 0.08)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ ...GLOW, left: 555, top: -124 }} />
      <div aria-hidden="true" style={{ ...GLOW, left: -176, top: -15 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden="true" src={`${IMG}/hero-curve.svg`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, pointerEvents: "none" }} />
      <h1 style={{ position: "absolute", left: 36, top: 30, width: 407, margin: 0, color: "#fff", fontSize: 32, lineHeight: "42px", fontWeight: 800, letterSpacing: "-0.0255em" }}>
        <span style={ACCENT}>¡Publica tu carro</span> y recibe propuestas hoy, <span style={ACCENT}>véndelo al mejor postor!</span>
      </h1>
      <div style={{ position: "absolute", left: 36, top: 192 }}>
        {href
          ? <GlassButton href={href} className="lsc-cta">¡Publica ahora!</GlassButton>
          : <GlassButton className="lsc-cta">¡Publica ahora!</GlassButton>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {badges === "fondo" ? <PriceBadges style="fondo" idp="lsc" /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Persona señalando ofertas recibidas en su celular" src={`${IMG}/hero-car.png`} style={{ position: "absolute", left: 378.27, top: 28, width: 360, height: 250, objectFit: "cover" }} />
      {/* Más grandes que en producción (pedido de Julio): se corren un poco para no tapar la cara ni salirse del banner. */}
      {badges === "fondo" ? null : badges !== "original" ? <PriceBadges style={badges} idp="lsc" /> : <>
      <Pill id="lsc-g1" left={452} top={38} amount="US$ 19,850" />
      <Pill id="lsc-g2" left={486} top={212} amount="US$ 13,200" />
      <Pill id="lsc-g3" left={640} top={96} amount="US$ 20,550" /></>}
    </section>
  );
}
