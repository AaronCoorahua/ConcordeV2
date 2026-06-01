"use client";

/**
 * OfferType — Generado por Concorde
 * Fuente: https://voyager-ds.vercel.app/preview/components/pase1
 * Generado: 2026-05-28
 * EDITAR LIBREMENTE después de generar
 */

import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OfferTypeVariant = "negotiable" | "live";

export interface OfferTypeProps {
  /** Variante: "negotiable" = teal NEGOCIABLE · "live" = orange EN VIVO */
  variant: OfferTypeVariant;
  /** Texto del header (por defecto: NEGOCIABLE / EN VIVO) */
  label?: string;
  /** Texto del CTA inferior (por defecto: VER TODAS) */
  ctaLabel?: string;
  /** Callback al hacer click */
  onClick?: () => void;
  /** Aria label accesible */
  "aria-label"?: string;
  className?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const LABEL_DEFAULTS: Record<OfferTypeVariant, string> = {
  negotiable: "NEGOCIABLE",
  live:       "EN VIVO",
};

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-poftype-styles";

const POFTYPE_STYLES = `
.poftype {
  width: 110px;
  border-radius: var(--vmc-radius-md, 8px);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow:
    oklch(0 0 0 / 0.12) 0px 4px 16px,
    oklch(0 0 0 / 0.06) 0px 1px 4px;
  transition:
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
  outline: none;
  background: none;
  border: none;
  padding: 0;
  display: block;
  text-align: left;
}

/* ── Top (colored section) ── */
.poftype-top {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background 0.22s;
}

/* Top glass highlight */
.poftype-top::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(oklch(1 0 0 / 0.07) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}

/* Top bottom edge shadow */
.poftype-top::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(transparent 0%, oklch(0 0 0 / 0.08) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Label ── */
.poftype-label {
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", system-ui, sans-serif);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: oklch(1 0 0);
  text-shadow: oklch(0 0 0 / 0.25) 0px 1px 3px;
  position: relative;
  z-index: 2;
}

/* ── Bottom (white CTA section) ── */
.poftype-bottom {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: oklch(1 0 0);
}

/* ── CTA text ── */
.poftype-cta {
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", system-ui, sans-serif);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.22s;
}

/* ── NEGOTIABLE variant ── */
.poftype--negotiable {
  box-shadow:
    oklch(0.78 0.14 195 / 0.4) 0px 0px 0px 1.5px,
    oklch(0 0 0 / 0.1) 0px 4px 14px,
    oklch(0 0 0 / 0.06) 0px 1px 4px;
}

.poftype--negotiable .poftype-top {
  background: linear-gradient(180deg,
    oklch(0.84 0.13 195) 0%,
    var(--vmc-color-negotiable, oklch(0.78 0.14 195)) 100%
  );
}

.poftype--negotiable .poftype-bottom {
  background: color-mix(in oklch,
    oklch(1 0 0) 95%,
    var(--vmc-color-negotiable, oklch(0.78 0.14 195))
  );
}

.poftype--negotiable .poftype-cta {
  color: oklch(0.58 0.17 195);
}

.poftype--negotiable:hover {
  box-shadow:
    oklch(0.78 0.14 195 / 0.55) 0px 0px 0px 1.5px,
    oklch(0.22 0.18 285 / 0.11) 0px 10px 18px,
    oklch(0.22 0.18 285 / 0.08) 0px 3px 7px,
    oklch(0.22 0.18 285 / 0.05) 0px 1px 2px;
}

.poftype--negotiable.poftype--focus .poftype-top {
  background: linear-gradient(
    oklch(0.65 0.17 195) 0%,
    oklch(0.55 0.16 195) 100%
  );
}

/* ── LIVE / EN VIVO variant ── */
.poftype--live {
  box-shadow:
    oklch(0.72 0.16 55 / 0.4) 0px 0px 0px 1.5px,
    oklch(0 0 0 / 0.1) 0px 4px 14px,
    oklch(0 0 0 / 0.06) 0px 1px 4px;
}

.poftype--live .poftype-top {
  background: linear-gradient(180deg,
    oklch(0.78 0.17 55) 0%,
    var(--vmc-color-live, oklch(0.72 0.16 55)) 100%
  );
}

.poftype--live .poftype-bottom {
  background: color-mix(in oklch,
    oklch(1 0 0) 95%,
    var(--vmc-color-live, oklch(0.72 0.16 55))
  );
}

.poftype--live .poftype-cta {
  color: oklch(0.54 0.18 45);
}

.poftype--live:hover {
  box-shadow:
    oklch(0.72 0.16 55 / 0.55) 0px 0px 0px 1.5px,
    oklch(0.22 0.18 285 / 0.11) 0px 10px 18px,
    oklch(0.22 0.18 285 / 0.08) 0px 3px 7px,
    oklch(0.22 0.18 285 / 0.05) 0px 1px 2px;
}

.poftype--live.poftype--focus .poftype-top {
  background: linear-gradient(
    oklch(0.58 0.19 48) 0%,
    oklch(0.5 0.17 44) 100%
  );
}

/* ── Hover (shared) ── */
.poftype:hover:not(.poftype--focus):not(:active) {
  transform: translateY(-4px) scale(1.015);
}

.poftype:hover .poftype-top::before {
  background: linear-gradient(oklch(1 0 0 / 0.26) 0%, transparent 50%);
}

/* ── Focus/pressed (shared) ── */
.poftype:active,
.poftype--focus {
  opacity: 0.58 !important;
  transform: scale(0.97) !important;
  box-shadow:
    oklch(0 0 0 / 0.1) 0px 2px 8px,
    oklch(0 0 0 / 0.12) 0px 2px 6px inset !important;
}

/* ── Keyboard focus ring (WCAG) ── */
.poftype:focus-visible {
  outline: 2px solid var(--vmc-color-vault-400, oklch(0.62 0.20 285));
  outline-offset: 3px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .poftype,
  .poftype-top,
  .poftype-cta { transition: none; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function OfferType({
  variant,
  label,
  ctaLabel = "VER TODAS",
  onClick,
  "aria-label": ariaLabel,
  className = "",
}: OfferTypeProps): JSX.Element {
  const displayLabel = label ?? LABEL_DEFAULTS[variant];

  // Inyectar estilos una vez (SSR + CSR)
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = POFTYPE_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const classes = [
    "poftype",
    `poftype--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: POFTYPE_STYLES }}
      />
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel ?? `${displayLabel} — ${ctaLabel}`}
      >
        <div className="poftype-top">
          <span className="poftype-label">{displayLabel}</span>
        </div>
        <div className="poftype-bottom">
          <span className="poftype-cta">{ctaLabel}</span>
        </div>
      </button>
    </>
  );
}
