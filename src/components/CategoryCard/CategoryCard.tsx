"use client";

/**
 * CategoryCard — Generado por Concorde
 * Fuente: https://voyager-ds.vercel.app/preview/components/button-primary
 * Generado: 2026-05-28
 * EDITAR LIBREMENTE después de generar
 */

import { useId } from "react";
import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategoryCardCategory =
  | "vehicular"
  | "maquinaria"
  | "equipos-diversos"
  | "articulos-diversos";

export interface CategoryCardProps {
  /** Categoría — determina ícono y label por defecto */
  category: CategoryCardCategory;
  /** Override del label (default: nombre de categoría) */
  label?: string;
  /** Handler de click */
  onClick?: () => void;
  /** Aria label accesible */
  "aria-label"?: string;
  className?: string;
}

// ─── Label defaults ───────────────────────────────────────────────────────────

const LABEL_DEFAULTS: Record<CategoryCardCategory, string> = {
  "vehicular":         "VEHICULAR",
  "maquinaria":        "MAQUINARIA",
  "equipos-diversos":  "EQUIPOS\nDIVERSOS",
  "articulos-diversos":"ARTÍCULOS\nDIVERSOS",
};

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-pcatcard-styles";

const PCATCARD_STYLES = `
.pcatcard {
  width: 93px;
  height: 92px;
  border-radius: var(--vmc-radius-md, 8px);
  border: 1.5px solid transparent;
  background-image:
    linear-gradient(160deg, oklch(1 0 0) 0%, oklch(0.97 0.006 285) 100%),
    linear-gradient(135deg,
      oklch(0.72 0.14 285) 0%,
      oklch(1 0 0 / 0.65) 38%,
      oklch(0.58 0.18 285) 70%,
      oklch(0.72 0.14 285) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  gap: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow:
    oklch(0.22 0.18 285 / 0.08) 0px 2px 10px,
    oklch(0.22 0.18 285 / 0.05) 0px 1px 3px;
  transition:
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.22s,
    background-image 0.22s;
  transform: translateZ(0);
  outline: none;
  background-color: transparent;
  border-style: solid;
  text-align: center;
}

/* Glass highlight */
.pcatcard::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(160deg, oklch(1 0 0 / 0.55) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Radial glow below card */
.pcatcard::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  background: radial-gradient(at 50% 60%, oklch(0.4 0.2 285 / 0.22) 0%, transparent 70%);
  filter: blur(8px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.28s;
}

/* Icon wrapper */
.pcatcard-icon-wrap {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--vmc-color-vault, oklch(0.22 0.18 285));
  position: relative;
  z-index: 2;
}

/* Label */
.pcatcard-label {
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', system-ui, sans-serif);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vmc-color-vault, oklch(0.22 0.18 285));
  text-align: center;
  line-height: 1.35;
  position: relative;
  z-index: 2;
  white-space: pre-line;
}

/* Hover */
.pcatcard:hover {
  transform: translateY(-4px);
  box-shadow:
    oklch(0.22 0.18 285 / 0.14) 0px 12px 20px,
    oklch(0.22 0.18 285 / 0.1) 0px 4px 8px,
    oklch(0.22 0.18 285 / 0.06) 0px 1px 2px;
  background-image:
    linear-gradient(160deg, oklch(0.97 0.01 285) 0%, oklch(0.99 0.004 285) 100%),
    linear-gradient(135deg,
      oklch(0.52 0.22 285) 0%,
      oklch(1 0 0 / 0.8) 38%,
      oklch(0.4 0.24 285) 72%,
      oklch(0.52 0.22 285) 100%
    );
}

.pcatcard:hover::after {
  opacity: 0.3;
}

/* Focus / pressed */
.pcatcard:active {
  opacity: 0.58;
  transform: scale(0.96) !important;
  background-image:
    linear-gradient(160deg, oklch(0.94 0.012 285) 0%, oklch(0.9 0.018 285) 100%),
    linear-gradient(135deg,
      oklch(0.72 0.14 285) 0%,
      oklch(1 0 0 / 0.65) 38%,
      oklch(0.58 0.18 285) 70%,
      oklch(0.72 0.14 285) 100%
    ) !important;
  box-shadow:
    oklch(0.22 0.18 285 / 0.12) 0px 1px 5px,
    oklch(0.22 0.18 285 / 0.08) 0px 1px 3px inset !important;
}

/* Keyboard focus ring */
.pcatcard:focus-visible {
  outline: 2px solid var(--vmc-color-vault-400, oklch(0.62 0.20 285));
  outline-offset: 3px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .pcatcard,
  .pcatcard::after { transition: none; }
}
`;

let _stylesInjected = false;

// ─── Icon components (gradient stroke, unique IDs per instance) ───────────────

interface IconProps { gradId: string; }

function IconVehicular({ gradId }: IconProps): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
          <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
          <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradId})`}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
        <line x1="12" y1="3"    x2="12"   y2="9.5"  />
        <line x1="20.2" y1="16.5" x2="14.6" y2="13.2" />
        <line x1="3.8"  y1="16.5" x2="9.4"  y2="13.2" />
      </g>
    </svg>
  );
}

function IconMaquinaria({ gradId }: IconProps): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
          <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
          <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradId})`}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </g>
    </svg>
  );
}

function IconEquiposDiversos({ gradId }: IconProps): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
          <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
          <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradId})`}>
        <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" />
      </g>
    </svg>
  );
}

function IconArticulosDiversos({ gradId }: IconProps): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="oklch(0.50 0.22 285)" />
          <stop offset="50%"  stopColor="oklch(0.32 0.20 285)" />
          <stop offset="100%" stopColor="oklch(0.18 0.16 285)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradId})`}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <circle cx="7" cy="7" r="1.5" fill={`url(#${gradId})`} stroke="none" />
      </g>
    </svg>
  );
}

const ICON_MAP: Record<CategoryCardCategory, (props: IconProps) => JSX.Element> = {
  "vehicular":          IconVehicular,
  "maquinaria":         IconMaquinaria,
  "equipos-diversos":   IconEquiposDiversos,
  "articulos-diversos": IconArticulosDiversos,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoryCard({
  category,
  label,
  onClick,
  "aria-label": ariaLabel,
  className = "",
}: CategoryCardProps): JSX.Element {
  // Unique gradient ID per instance — avoids SVG defs collision
  const uid = useId().replace(/:/g, "-");
  const gradId = `vg-${category}-${uid}`;

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = PCATCARD_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const displayLabel = label ?? LABEL_DEFAULTS[category];
  const IconComponent = ICON_MAP[category];

  const classes = ["pcatcard", className].filter(Boolean).join(" ");

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PCATCARD_STYLES }}
      />
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel ?? displayLabel.replace(/\n/g, " ")}
      >
        <div className="pcatcard-icon-wrap">
          <IconComponent gradId={gradId} />
        </div>
        <span className="pcatcard-label">{displayLabel}</span>
      </button>
    </>
  );
}
