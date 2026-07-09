"use client";

/**
 * BannerPrincipal — 766×272 · banner hero de navegación (slot "principal-banner"
 * del Homepage). Cada variante navega a una sección del sidebar:
 *   · negociable — teal (mismo sistema que OfferType/DetailCard negotiable)
 *   · en-vivo    — naranja (sistema live) con dot pulsante
 *   · categorias — morado marca + CategoryCards flotantes reales
 *   · empresas   — claro con borde gradiente lila (sistema CategoryCard)
 */

import type { JSX } from "react";
import ChevronPattern from "./ChevronPattern";
import CategoryCard from "@/src/components/CategoryCard";
import BusinessIcon from "@/src/components/BusinessIcon";
import { BANNER_PRINCIPAL_WIDTH, BANNER_PRINCIPAL_HEIGHT } from "./dimensions";

export { BANNER_PRINCIPAL_WIDTH, BANNER_PRINCIPAL_HEIGHT } from "./dimensions";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BannerPrincipalVariant = "negociable" | "en-vivo" | "categorias" | "empresas";

export interface BannerPrincipalProps {
  variant: BannerPrincipalVariant;
  /** Texto de la pill superior (default según variante) */
  kicker?: string;
  /** Titular (default según variante) */
  title?: string;
  /** Bajada (default según variante) */
  subtitle?: string;
  /** Texto del CTA (default según variante) */
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

interface VariantCopy {
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

const COPY: Record<BannerPrincipalVariant, VariantCopy> = {
  "negociable": {
    kicker: "NEGOCIABLE",
    title: "Negocia tu precio",
    subtitle: "Haz tu propuesta y cierra el trato sin comisión.",
    ctaLabel: "Ver ofertas",
  },
  "en-vivo": {
    kicker: "EN VIVO",
    title: "Subastas en vivo",
    subtitle: "Lotes rematándose ahora mismo — entra y puja en tiempo real.",
    ctaLabel: "Entrar a la sala",
  },
  "categorias": {
    kicker: "CATEGORÍAS",
    title: "Explora por categoría",
    subtitle: "Vehicular, maquinaria, equipos y artículos diversos.",
    ctaLabel: "Ver categorías",
  },
  "empresas": {
    kicker: "EMPRESAS",
    title: "Empresas que rematan",
    subtitle: "Lotes corporativos publicados directo por cada empresa.",
    ctaLabel: "Ver empresas",
  },
};

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-bnpr-styles";

const BNPR_STYLES = `
.bnpr {
  position: relative;
  width: ${BANNER_PRINCIPAL_WIDTH}px;
  height: ${BANNER_PRINCIPAL_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  box-shadow: rgba(32, 0, 104, 0.10) 0px 4px 16px, rgba(32, 0, 104, 0.05) 0px 1px 4px;
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
  transform: translateZ(0);
}
.bnpr:hover {
  transform: translateY(-2px);
  box-shadow: rgba(32, 0, 104, 0.16) 0px 14px 32px, rgba(32, 0, 104, 0.08) 0px 4px 10px;
}
.bnpr:hover .bnpr-pattern { opacity: 0.14 !important; }

/* Glass highlight superior */
.bnpr::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 56px;
  background: linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Fondos por variante ── */
.bnpr--negociable { background: linear-gradient(100deg, #00EDEE 0%, #00D2D3 45%, #009597 100%); }
.bnpr--en-vivo    { background: linear-gradient(110deg, #FF9639 0%, #EF852E 45%, #BE3D00 100%); }
.bnpr--categorias { background: linear-gradient(135deg, #5F3ED8 0%, #340091 52%, #140046 100%); }
.bnpr--empresas {
  border: 1px solid transparent;
  background-image:
    linear-gradient(160deg, #ffffff 0%, #f4f5f9 100%),
    linear-gradient(135deg, #9c96f8 0%, rgba(255,255,255,0.65) 38%, #7364de 70%, #9c96f8 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
}
.bnpr--empresas::before { background: linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%); }

/* ── Contenido ── */
.bnpr-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding: 0 40px;
  max-width: 440px;
}

.bnpr-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.bnpr--negociable .bnpr-kicker { background: #2E0F70; color: #ffffff; }
.bnpr--en-vivo    .bnpr-kicker { background: #ffffff; color: #BE3E00; }
.bnpr--categorias .bnpr-kicker { background: rgba(255,255,255,0.16); color: #ffffff; border: 1px solid rgba(255,255,255,0.28); }
.bnpr--empresas   .bnpr-kicker { background: #F1EDFF; color: #4F2ED8; }

/* Dot pulsante (en-vivo) */
.bnpr-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #E5484D;
  animation: bnpr-pulse 1.8s ease-out infinite;
}
@keyframes bnpr-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.45); }
  70%  { box-shadow: 0 0 0 8px rgba(229, 72, 77, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0); }
}

.bnpr-title {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: rgba(0,0,0,0.18) 0px 1px 3px;
}
.bnpr--empresas .bnpr-title { color: #2E0F70; text-shadow: none; }

.bnpr-subtitle {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(255,255,255,0.88);
}
.bnpr--empresas .bnpr-subtitle { color: #5b5470; }

/* ── CTA ── */
.bnpr-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 24px;
  margin-top: 8px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
  box-shadow: rgba(0,0,0,0.16) 0px 2px 8px;
}
.bnpr--negociable .bnpr-cta { background: #ffffff; color: #009699; }
.bnpr--en-vivo    .bnpr-cta { background: #ffffff; color: #BE3E00; }
.bnpr--categorias .bnpr-cta { background: #ffffff; color: #4C1EBC; }
.bnpr--empresas   .bnpr-cta { background: #2E0F70; color: #ffffff; }

/* Shine sweep */
.bnpr-cta::after {
  content: "";
  position: absolute;
  top: 0; bottom: 0;
  left: -60%;
  width: 40%;
  background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
  transform: skewX(-18deg);
  transition: left 0.5s ease;
  pointer-events: none;
}
.bnpr-cta:hover { transform: translateY(-1px) scale(1.03); box-shadow: rgba(0,0,0,0.22) 0px 6px 16px; }
.bnpr-cta:hover::after { left: 120%; }
.bnpr-cta:active { transform: scale(0.97); box-shadow: rgba(0,0,0,0.2) 0px 1px 4px inset; }
.bnpr-cta:focus-visible {
  outline: 2px solid var(--vmc-color-vault-400, oklch(0.62 0.20 285));
  outline-offset: 3px;
}
.bnpr-cta-arrow { transition: transform 0.2s ease; }
.bnpr-cta:hover .bnpr-cta-arrow { transform: translateX(3px); }

/* ── Decoración derecha ── */
.bnpr-deco {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 320px;
  pointer-events: none;
  z-index: 1;
}

/* Chevrones gigantes (negociable) */
.bnpr-deco-chevrons { position: absolute; inset: 0; }

/* Anillos pulsantes (en-vivo) */
.bnpr-ring {
  position: absolute;
  top: 50%; left: 55%;
  border: 2px solid rgba(255,255,255,0.35);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: bnpr-ring 3.2s ease-out infinite;
}
@keyframes bnpr-ring {
  0%   { opacity: 0.7; scale: 0.55; }
  100% { opacity: 0;   scale: 1.35; }
}

/* CategoryCards flotantes (categorias) */
.bnpr-deco-cards {
  position: absolute;
  top: 50%;
  right: 56px;
  transform: translateY(-50%);
  display: flex;
  gap: 16px;
  pointer-events: auto;
}
.bnpr-deco-card--a { transform: rotate(-7deg) translateY(8px); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.bnpr-deco-card--b { transform: rotate(6deg) translateY(-6px);  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.bnpr:hover .bnpr-deco-card--a { transform: rotate(-3deg) translateY(2px); }
.bnpr:hover .bnpr-deco-card--b { transform: rotate(2deg)  translateY(-2px); }

/* Tile glass con icono (empresas) */
.bnpr-deco-tile {
  position: absolute;
  top: 50%;
  right: 72px;
  transform: translateY(-50%) rotate(4deg);
  width: 152px;
  height: 152px;
  border-radius: 24px;
  border: 1px solid rgba(132, 96, 229, 0.25);
  background: linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(244,245,249,0.7) 100%);
  box-shadow: rgba(32, 0, 104, 0.10) 0px 10px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4C1EBC;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.bnpr:hover .bnpr-deco-tile { transform: translateY(-50%) rotate(0deg) scale(1.03); }

@media (prefers-reduced-motion: reduce) {
  .bnpr, .bnpr-cta, .bnpr-cta::after, .bnpr-cta-arrow,
  .bnpr-deco-card--a, .bnpr-deco-card--b, .bnpr-deco-tile { transition: none; }
  .bnpr-dot, .bnpr-ring { animation: none; }
  .bnpr-ring { opacity: 0.35; scale: 1; }
}
`;

let _stylesInjected = false;

// ─── Decoraciones por variante ────────────────────────────────────────────────

function DecoChevrons(): JSX.Element {
  return (
    <svg className="bnpr-deco-chevrons" viewBox="0 0 320 272" fill="none" aria-hidden="true">
      <path d="M120 40 L200 136 L120 232" stroke="rgba(255,255,255,0.16)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M190 40 L270 136 L190 232" stroke="rgba(255,255,255,0.24)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M260 40 L340 136 L260 232" stroke="rgba(255,255,255,0.34)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DecoRings(): JSX.Element {
  return (
    <>
      <div className="bnpr-ring" style={{ width: 220, height: 220, animationDelay: "0s" }} />
      <div className="bnpr-ring" style={{ width: 220, height: 220, animationDelay: "1.1s" }} />
      <div className="bnpr-ring" style={{ width: 220, height: 220, animationDelay: "2.2s" }} />
      <svg
        aria-hidden="true"
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: "absolute", top: "50%", left: "55%", transform: "translate(-50%, -50%)" }}
      >
        <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="rgba(255,255,255,0.9)" />
      </svg>
    </>
  );
}

function DecoCategoryCards(): JSX.Element {
  return (
    <div className="bnpr-deco-cards">
      <div className="bnpr-deco-card--a"><CategoryCard category="vehicular" /></div>
      <div className="bnpr-deco-card--b"><CategoryCard category="equipos-diversos" /></div>
    </div>
  );
}

function DecoBusinessTile(): JSX.Element {
  return (
    <div className="bnpr-deco-tile">
      <BusinessIcon size={80} state="default" />
    </div>
  );
}

const DECO: Record<BannerPrincipalVariant, () => JSX.Element> = {
  "negociable": DecoChevrons,
  "en-vivo":    DecoRings,
  "categorias": DecoCategoryCards,
  "empresas":   DecoBusinessTile,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerPrincipal({
  variant,
  kicker,
  title,
  subtitle,
  ctaLabel,
  onCta,
  className = "",
}: BannerPrincipalProps): JSX.Element {
  const copy = COPY[variant];
  const Deco = DECO[variant];

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BNPR_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const patternColor = variant === "empresas" ? "#4C1EBC" : "#ffffff";
  const patternOpacity = variant === "empresas" ? 0.04 : 0.09;

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BNPR_STYLES }} />
      <div data-slot="banner-principal" className={`bnpr bnpr--${variant} ${className}`.trim()}>
        <ChevronPattern className="bnpr-pattern" color={patternColor} opacity={patternOpacity} size={64} />

        <div className="bnpr-deco">
          <Deco />
        </div>

        <div className="bnpr-content">
          <span className="bnpr-kicker">
            {variant === "en-vivo" && <span className="bnpr-dot" aria-hidden="true" />}
            {kicker ?? copy.kicker}
          </span>
          <h3 className="bnpr-title">{title ?? copy.title}</h3>
          <p className="bnpr-subtitle">{subtitle ?? copy.subtitle}</p>
          <button type="button" className="bnpr-cta" onClick={onCta}>
            {ctaLabel ?? copy.ctaLabel}
            <span className="bnpr-cta-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </>
  );
}
