"use client";

/**
 * BannerSecundario — 766×100 · strip de navegación (slot "secondary-banner"
 * de Homepage y Zona). Variantes:
 *   · negociable — teal (sistema OfferType negotiable)
 *   · en-vivo    — naranja live con dot pulsante y contador
 *   · categoria  — morado marca con chip de ruta (p.ej. "Equipos diversos / Equipo de cómputo")
 *   · empresas   — claro con borde gradiente lila
 *   · subaspass  — gradiente morado→ámbar del SidebarBanner con CTA naranja
 */

import type { JSX } from "react";
import ChevronPattern from "./ChevronPattern";
import { BANNER_SECUNDARIO_WIDTH, BANNER_SECUNDARIO_HEIGHT } from "./dimensions";

export { BANNER_SECUNDARIO_WIDTH, BANNER_SECUNDARIO_HEIGHT } from "./dimensions";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BannerSecundarioVariant = "negociable" | "en-vivo" | "categoria" | "empresas" | "subaspass";

export interface BannerSecundarioProps {
  variant: BannerSecundarioVariant;
  /** Pill / texto pequeño superior (default según variante) */
  kicker?: string;
  /** Titular (default según variante) */
  title?: string;
  /** Chip de ruta a la derecha — solo lo pinta si hay texto (default en "categoria") */
  chip?: string;
  /** Texto del CTA pill (solo subaspass; el resto usa flecha circular) */
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

interface VariantCopy {
  kicker: string;
  title: string;
  chip?: string;
  ctaLabel: string;
}

const COPY: Record<BannerSecundarioVariant, VariantCopy> = {
  "negociable": { kicker: "NEGOCIABLE", title: "Propón tu precio y negocia",  ctaLabel: "Ver ofertas" },
  "en-vivo":    { kicker: "EN VIVO",    title: "38 subastas en curso",        ctaLabel: "Entrar" },
  "categoria":  { kicker: "CATEGORÍA",  title: "Equipos diversos",            chip: "Equipos diversos / Equipo de cómputo", ctaLabel: "Explorar" },
  "empresas":   { kicker: "EMPRESAS",   title: "Remates corporativos",        ctaLabel: "Ver empresas" },
  "subaspass":  { kicker: "¿Te tienta el riesgo alto?", title: "Compra Subaspass", ctaLabel: "Comprar ahora" },
};

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-bnsc-styles";

const BNSC_STYLES = `
.bnsc {
  position: relative;
  width: ${BANNER_SECUNDARIO_WIDTH}px;
  height: ${BANNER_SECUNDARIO_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  box-sizing: border-box;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  box-shadow: rgba(32, 0, 104, 0.08) 0px 2px 10px, rgba(32, 0, 104, 0.05) 0px 1px 3px;
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
  transform: translateZ(0);
}
.bnsc:hover {
  transform: translateY(-2px);
  box-shadow: rgba(32, 0, 104, 0.14) 0px 10px 24px, rgba(32, 0, 104, 0.07) 0px 3px 8px;
}
.bnsc:hover .bnsc-pattern { opacity: 0.13 !important; }

/* Glass highlight */
.bnsc::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 32px;
  background: linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Fondos por variante ── */
.bnsc--negociable { background: linear-gradient(90deg, #00EDEE 0%, #00D2D3 45%, #009597 100%); }
.bnsc--en-vivo    { background: linear-gradient(95deg, #FF9639 0%, #EF852E 45%, #BE3D00 100%); }
.bnsc--categoria  { background: linear-gradient(120deg, #5F3ED8 0%, #340091 55%, #140046 100%); }
.bnsc--empresas {
  border: 1px solid transparent;
  background-image:
    linear-gradient(160deg, #ffffff 0%, #f4f5f9 100%),
    linear-gradient(135deg, #9c96f8 0%, rgba(255,255,255,0.65) 38%, #7364de 70%, #9c96f8 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
}
.bnsc--empresas::before { background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%); }
.bnsc--subaspass { background: linear-gradient(100deg, #3B1A7A 0%, #3B1782 55%, #6E3E2A 100%); }

/* ── Contenido ── */
.bnsc-kicker {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  padding: 0 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}
.bnsc--negociable .bnsc-kicker { background: #2E0F70; color: #ffffff; }
.bnsc--en-vivo    .bnsc-kicker { background: #ffffff; color: #BE3E00; }
.bnsc--categoria  .bnsc-kicker { background: rgba(255,255,255,0.16); color: #ffffff; border: 1px solid rgba(255,255,255,0.28); }
.bnsc--empresas   .bnsc-kicker { background: #F1EDFF; color: #4F2ED8; }
/* Subaspass: kicker es texto suelto naranja, no pill */
.bnsc--subaspass  .bnsc-kicker {
  background: transparent;
  color: #F5A94E;
  padding: 0;
  height: auto;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: none;
}

.bnsc-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #E5484D;
  animation: bnsc-pulse 1.8s ease-out infinite;
}
@keyframes bnsc-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0.45); }
  70%  { box-shadow: 0 0 0 7px rgba(229, 72, 77, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 72, 77, 0); }
}

.bnsc-text {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.bnsc--subaspass .bnsc-text { flex-direction: row; align-items: baseline; gap: 12px; }

.bnsc-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-shadow: rgba(0,0,0,0.16) 0px 1px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bnsc--empresas .bnsc-title { color: #2E0F70; text-shadow: none; }

.bnsc-spacer { flex: 1; }

/* Chip de ruta (categoria) — mismo estilo que el chip del banner de zona */
.bnsc-chip {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  background: #2E0F70;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: rgba(0,0,0,0.2) 0px 2px 6px;
  flex-shrink: 0;
}

/* Flecha circular */
.bnsc-arrow {
  position: relative;
  z-index: 2;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: rgba(0,0,0,0.16) 0px 2px 8px;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
}
.bnsc--negociable .bnsc-arrow { background: #ffffff; color: #009699; }
.bnsc--en-vivo    .bnsc-arrow { background: #ffffff; color: #BE3E00; }
.bnsc--categoria  .bnsc-arrow { background: #ffffff; color: #4C1EBC; }
.bnsc--empresas   .bnsc-arrow { background: #2E0F70; color: #ffffff; }
.bnsc-arrow:hover  { transform: translateX(3px) scale(1.06); box-shadow: rgba(0,0,0,0.22) 0px 5px 14px; }
.bnsc-arrow:active { transform: scale(0.94); box-shadow: rgba(0,0,0,0.2) 0px 1px 4px inset; }
.bnsc-arrow:focus-visible {
  outline: 2px solid var(--vmc-color-vault-400, oklch(0.62 0.20 285));
  outline-offset: 3px;
}

/* CTA pill (subaspass) — gradiente naranja del SidebarBanner (#F5921E → #E15F2B) */
.bnsc-cta {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 24px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(180deg, #F5921E 0%, #E15F2B 100%);
  box-shadow: rgba(0,0,0,0.25) 0px 2px 8px, rgba(255,255,255,0.25) 0px 1px 0px inset;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
}
.bnsc-cta::after {
  content: "";
  position: absolute;
  top: 0; bottom: 0;
  left: -60%;
  width: 40%;
  background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
  transform: skewX(-18deg);
  transition: left 0.5s ease;
  pointer-events: none;
}
.bnsc-cta:hover { transform: translateY(-1px) scale(1.04); box-shadow: rgba(225,95,43,0.45) 0px 6px 16px, rgba(255,255,255,0.25) 0px 1px 0px inset; }
.bnsc-cta:hover::after { left: 120%; }
.bnsc-cta:active { transform: scale(0.96); box-shadow: rgba(0,0,0,0.25) 0px 1px 4px inset; }
.bnsc-cta:focus-visible {
  outline: 2px solid #F5A94E;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .bnsc, .bnsc-arrow, .bnsc-cta, .bnsc-cta::after { transition: none; }
  .bnsc-dot { animation: none; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerSecundario({
  variant,
  kicker,
  title,
  chip,
  ctaLabel,
  onCta,
  className = "",
}: BannerSecundarioProps): JSX.Element {
  const copy = COPY[variant];
  const chipText = chip ?? copy.chip;

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BNSC_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const patternColor = variant === "empresas" ? "#4C1EBC" : "#ffffff";
  const patternOpacity = variant === "empresas" ? 0.04 : 0.08;

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BNSC_STYLES }} />
      <div data-slot="banner-secundario" className={`bnsc bnsc--${variant} ${className}`.trim()}>
        <ChevronPattern className="bnsc-pattern" color={patternColor} opacity={patternOpacity} size={44} />

        <span className="bnsc-kicker">
          {variant === "en-vivo" && <span className="bnsc-dot" aria-hidden="true" />}
          {kicker ?? copy.kicker}
        </span>

        <div className="bnsc-text">
          <h4 className="bnsc-title">{title ?? copy.title}</h4>
        </div>

        <div className="bnsc-spacer" />

        {chipText && <span className="bnsc-chip">{chipText}</span>}

        {variant === "subaspass" ? (
          <button type="button" className="bnsc-cta" onClick={onCta}>
            {ctaLabel ?? copy.ctaLabel}
          </button>
        ) : (
          <button
            type="button"
            className="bnsc-arrow"
            onClick={onCta}
            aria-label={ctaLabel ?? copy.ctaLabel}
            title={ctaLabel ?? copy.ctaLabel}
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </>
  );
}
