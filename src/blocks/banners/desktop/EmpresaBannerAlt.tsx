/**
 * EmpresaBannerAlt — 766×272 · variantes de banner de empresa SIN personaje.
 * Mismo contenido (logo, rating, reseña, stats) en distintas posiciones.
 * Fondo blanco con acentos morados. Estático, sin efectos.
 */

import type { CSSProperties, JSX } from "react";
import { Sparkle } from "./decor";
import { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

export { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

export type EmpresaAltLayout = "logo-left" | "stats-bottom";

export interface EmpresaBannerAltProps {
  nombre: string;
  logoText?: string;
  rating: string;
  ratingLabel: string;
  opiniones: string;
  descripcion: string;
  ventas: string;
  participantes: string;
  layout: EmpresaAltLayout;
  className?: string;
}

function Star(): JSX.Element {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 1.8 L15.1 8.3 L22.2 9.2 L17 14.1 L18.3 21.2 L12 17.7 L5.7 21.2 L7 14.1 L1.8 9.2 L8.9 8.3 Z" fill="#F5B01E" />
    </svg>
  );
}

function LogoCircle({ text, size = 108 }: { text: string; size?: number }): JSX.Element {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#3B1782",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: 800,
        lineHeight: 1.15,
        padding: 12,
        boxSizing: "border-box",
        flexShrink: 0,
        boxShadow: "rgba(46,15,112,0.18) 0 4px 12px",
      }}
    >
      {text}
    </div>
  );
}

function Rating({ rating, ratingLabel, opiniones }: { rating: string; ratingLabel: string; opiniones: string }): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: "#241A3F" }}>{rating}</span>
      <Star />
      <span style={{ fontSize: 14, fontWeight: 700, color: "#241A3F" }}>{ratingLabel}</span>
      <span style={{ color: "#B9B0CC", fontWeight: 700 }}>·</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#6B6180" }}>{opiniones}</span>
    </div>
  );
}

function StatPill({ label, value, wide = false }: { label: string; value: string; wide?: boolean }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: wide ? 200 : 148 }}>
      <span style={{ position: "relative", zIndex: 1, background: "#3B1782", color: "#FFFFFF", borderRadius: 9999, padding: "7px 24px", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ marginTop: -13, width: "100%", background: "#FFFFFF", border: "2px solid #3B1782", borderRadius: 12, padding: "18px 10px 10px", textAlign: "center", fontSize: 18, fontWeight: 800, color: "#3B1782" }}>
        {value}
      </div>
    </div>
  );
}

const shell: CSSProperties = {
  position: "relative",
  width: BANNER_WIDTH,
  height: BANNER_HEIGHT,
  background: "#FFFFFF",
  overflow: "hidden",
  fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
  flexShrink: 0,
  boxSizing: "border-box",
};

export default function EmpresaBannerAlt({
  nombre,
  logoText,
  rating,
  ratingLabel,
  opiniones,
  descripcion,
  ventas,
  participantes,
  layout,
  className = "",
}: EmpresaBannerAltProps): JSX.Element {
  const logo = logoText ?? nombre;

  if (layout === "stats-bottom") {
    return (
      <div data-slot="empresa-banner-alt" className={className} style={shell}>
        <Sparkle size={18} color="#3B1782" outline style={{ position: "absolute", right: 40, top: 26 }} />
        {/* Cabecera: logo + nombre + rating + reseña */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 168, display: "flex", alignItems: "center", gap: 20, padding: "0 32px", boxSizing: "border-box" }}>
          <LogoCircle text={logo} size={96} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: "#241A3F", letterSpacing: "-0.01em" }}>{nombre}</h3>
            <div style={{ marginTop: 6 }}><Rating rating={rating} ratingLabel={ratingLabel} opiniones={opiniones} /></div>
            <p style={{ margin: "8px 0 0", fontSize: 12.5, fontWeight: 500, lineHeight: 1.5, color: "#6B6180" }}>{descripcion}</p>
          </div>
        </div>
        {/* Franja de stats inferior */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 104, background: "#F4F1FB", display: "flex", alignItems: "center", justifyContent: "center", gap: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6180", textTransform: "uppercase", letterSpacing: "0.04em" }}>Ventas</span>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#3B1782" }}>{ventas}</span>
          </div>
          <div style={{ width: 1, height: 44, background: "#D8CEF0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6180", textTransform: "uppercase", letterSpacing: "0.04em" }}>Participantes</span>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#3B1782" }}>{participantes}</span>
          </div>
        </div>
      </div>
    );
  }

  // logo-left
  return (
    <div data-slot="empresa-banner-alt" className={className} style={{ ...shell, display: "flex", alignItems: "center", gap: 24, padding: "0 32px" }}>
      <Sparkle size={18} color="#3B1782" outline style={{ position: "absolute", left: 128, top: 40 }} />
      <LogoCircle text={logo} size={116} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#241A3F", letterSpacing: "-0.01em" }}>{nombre}</h3>
        <div style={{ marginTop: 8 }}><Rating rating={rating} ratingLabel={ratingLabel} opiniones={opiniones} /></div>
        <p style={{ margin: "12px 0 0", fontSize: 12.5, fontWeight: 500, lineHeight: 1.5, color: "#6B6180", maxWidth: 320 }}>{descripcion}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flexShrink: 0 }}>
        <StatPill label="Ventas" value={ventas} />
        <StatPill label="Participantes" value={participantes} />
      </div>
    </div>
  );
}
