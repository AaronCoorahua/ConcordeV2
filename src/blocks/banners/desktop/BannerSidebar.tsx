"use client";

/**
 * BannerSidebar — 200×264 · banner CTA del sidebar (mismas medidas y sistema
 * que SidebarBanner: fondo morado→ámbar #3B1A7A→#3B1782→#6E3E2A, CTA pill 31px
 * #F5921E→#E15F2B). Variantes:
 *   · subaspass    — "Compra Subaspass" (CTA naranja)
 *   · vende-tu-auto — acento teal (sistema negotiable)
 *   · centro-ayuda  — morado marca con CTA blanco
 */

import type { JSX } from "react";
import ChevronPattern from "./ChevronPattern";
import { BANNER_SIDEBAR_WIDTH, BANNER_SIDEBAR_HEIGHT } from "./dimensions";

export { BANNER_SIDEBAR_WIDTH, BANNER_SIDEBAR_HEIGHT } from "./dimensions";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BannerSidebarVariant = "subaspass" | "vende-tu-auto" | "centro-ayuda";

export interface BannerSidebarProps {
  variant: BannerSidebarVariant;
  /** Texto pequeño superior (default según variante) */
  kicker?: string;
  /** Titular (default según variante) */
  title?: string;
  /** Cuerpo (default según variante) */
  body?: string;
  /** Texto del CTA (default según variante) */
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

interface VariantCopy {
  kicker: string;
  title: string;
  body: string;
  ctaLabel: string;
}

const COPY: Record<BannerSidebarVariant, VariantCopy> = {
  "subaspass": {
    kicker: "¿Te tienta el riesgo alto?",
    title: "Compra Subaspass",
    body: "Participa sin consignar y sin restricciones.",
    ctaLabel: "Comprar ahora",
  },
  "vende-tu-auto": {
    kicker: "¿Renovando tu auto?",
    title: "Vende tu auto",
    body: "Publícalo y véndelo en la próxima subasta.",
    ctaLabel: "Publicar ahora",
  },
  "centro-ayuda": {
    kicker: "¿Tienes dudas?",
    title: "Centro de ayuda",
    body: "Respuestas rápidas a todas tus dudas.",
    ctaLabel: "Ir al Centro de Ayuda",
  },
};

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-bnsb-styles";

const BNSB_STYLES = `
.bnsb {
  position: relative;
  width: ${BANNER_SIDEBAR_WIDTH}px;
  height: ${BANNER_SIDEBAR_HEIGHT}px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 20px 16px 16px;
  box-sizing: border-box;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  box-shadow: rgba(20, 0, 70, 0.30) 0px 4px 14px, rgba(20, 0, 70, 0.18) 0px 1px 4px;
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
  transform: translateZ(0);
}
.bnsb:hover {
  transform: translateY(-2px);
  box-shadow: rgba(20, 0, 70, 0.40) 0px 12px 26px, rgba(20, 0, 70, 0.2) 0px 3px 8px;
}
.bnsb:hover .bnsb-pattern { opacity: 0.12 !important; }

/* Glass highlight */
.bnsb::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 64px;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Fondos por variante ── */
.bnsb--subaspass     { background: linear-gradient(180deg, #3B1A7A 0%, #3B1782 55%, #6E3E2A 100%); }
.bnsb--vende-tu-auto { background: linear-gradient(180deg, #2E0F70 0%, #23217E 55%, #00696B 100%); }
.bnsb--centro-ayuda  { background: linear-gradient(180deg, #5F3ED8 0%, #340091 55%, #140046 100%); }

/* ── Contenido ── */
.bnsb-kicker {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
}
.bnsb-title {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: #ffffff;
  text-shadow: rgba(0,0,0,0.2) 0px 1px 3px;
}
.bnsb-body {
  position: relative;
  z-index: 2;
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.45;
  color: rgba(255,255,255,0.78);
}

/* ── CTA pill 31px ── */
.bnsb-cta {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  width: 100%;
  padding: 0 16px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  overflow: hidden;
  box-shadow: rgba(0,0,0,0.25) 0px 2px 8px, rgba(255,255,255,0.25) 0px 1px 0px inset;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
}
.bnsb--subaspass     .bnsb-cta { background: linear-gradient(180deg, #F5921E 0%, #E15F2B 100%); color: #ffffff; }
.bnsb--vende-tu-auto .bnsb-cta { background: linear-gradient(180deg, #00DAE0 0%, #008688 100%); color: #ffffff; }
.bnsb--centro-ayuda  .bnsb-cta { background: #ffffff; color: #4C1EBC; }

.bnsb-cta::after {
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
.bnsb-cta:hover { transform: translateY(-1px) scale(1.03); box-shadow: rgba(0,0,0,0.3) 0px 5px 14px, rgba(255,255,255,0.25) 0px 1px 0px inset; }
.bnsb-cta:hover::after { left: 120%; }
.bnsb-cta:active { transform: scale(0.96); box-shadow: rgba(0,0,0,0.28) 0px 1px 4px inset; }
.bnsb-cta:focus-visible {
  outline: 2px solid #F5A94E;
  outline-offset: 3px;
}
.bnsb--centro-ayuda .bnsb-cta:focus-visible,
.bnsb--vende-tu-auto .bnsb-cta:focus-visible {
  outline-color: #ffffff;
}

@media (prefers-reduced-motion: reduce) {
  .bnsb, .bnsb-cta, .bnsb-cta::after { transition: none; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerSidebar({
  variant,
  kicker,
  title,
  body,
  ctaLabel,
  onCta,
  className = "",
}: BannerSidebarProps): JSX.Element {
  const copy = COPY[variant];

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BNSB_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BNSB_STYLES }} />
      <div data-slot="banner-sidebar" className={`bnsb bnsb--${variant} ${className}`.trim()}>
        <ChevronPattern className="bnsb-pattern" color="#ffffff" opacity={0.07} size={40} />

        <p className="bnsb-kicker">{kicker ?? copy.kicker}</p>
        <h4 className="bnsb-title">{title ?? copy.title}</h4>
        <p className="bnsb-body">{body ?? copy.body}</p>
        <button type="button" className="bnsb-cta" onClick={onCta}>
          {ctaLabel ?? copy.ctaLabel}
        </button>
      </div>
    </>
  );
}
