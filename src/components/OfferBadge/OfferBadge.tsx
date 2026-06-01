"use client";

/**
 * OfferBadge — Generado por Concorde
 * Fuente: https://voyager-ds.vercel.app/preview/components/pase1
 * Generado: 2026-05-28
 * EDITAR LIBREMENTE después de generar
 *
 * Pill badge de estado de subasta: EN VIVO (animated dot) · PRÓXIMA (blinking clock)
 */

import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OfferBadgeVariant = "live" | "proxima";

export interface OfferBadgeProps {
  variant: OfferBadgeVariant;
  /** Override de label (default: "EN VIVO" / "PRÓXIMA") */
  label?: string;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-offerbadge-styles";

const OFFERBADGE_STYLES = `
@keyframes offerbadge-live-ring {
  0%   { opacity: 1; transform: scale(0.8); }
  100% { opacity: 0; transform: scale(1.9); }
}

@keyframes offerbadge-clock-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(0.85); }
}

/* ── Base pill ── */
.offerbadge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border-radius: 9999px;
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', system-ui, sans-serif);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: oklch(1 0 0);
  border: 1.5px solid transparent;
  user-select: none;
}

/* ── EN VIVO — orange gradient ── */
.offerbadge--live {
  background-image:
    linear-gradient(135deg,
      oklch(0.78 0.17 55) 0%,
      oklch(0.72 0.16 55) 40%,
      oklch(0.54 0.18 44) 100%
    ),
    linear-gradient(135deg,
      oklch(0.86 0.12 55) 0%,
      oklch(1 0 0 / 0.45) 40%,
      oklch(0.65 0.16 50) 75%,
      oklch(0.86 0.12 55) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    oklch(0.72 0.16 55 / 0.45) 0px 2px 10px,
    oklch(1 0 0 / 0.14) 0px 1px 0px inset;
}

/* ── PRÓXIMA — vault purple gradient ── */
.offerbadge--proxima {
  background-image:
    linear-gradient(135deg,
      oklch(0.48 0.24 285) 0%,
      oklch(0.48 0.24 285) 30%,
      oklch(0.2 0.17 285) 100%
    ),
    linear-gradient(135deg,
      oklch(0.65 0.2 285) 0%,
      oklch(1 0 0 / 0.4) 38%,
      oklch(0.45 0.22 285) 68%,
      oklch(0.65 0.2 285) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    oklch(0.22 0.18 285 / 0.5) 0px 2px 10px,
    oklch(1 0 0 / 0.1) 0px 1px 0px inset;
}

/* ── Pulsing dot (live) ── */
.offerbadge-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: oklch(1 0 0 / 0.92);
  flex-shrink: 0;
  animation: offerbadge-live-ring 1.4s ease-out infinite;
  position: relative;
}

/* ── Blinking clock (proxima) ── */
.offerbadge-clock {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  animation: offerbadge-clock-blink 1.4s ease-in-out infinite;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .offerbadge-dot   { animation: none; }
  .offerbadge-clock { animation: none; }
}
`;

let _stylesInjected = false;

// ─── Clock SVG (Próxima) ──────────────────────────────────────────────────────

function ClockIcon(): JSX.Element {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.92)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const LABEL_DEFAULTS: Record<OfferBadgeVariant, string> = {
  live:    "EN VIVO",
  proxima: "PRÓXIMA",
};

export default function OfferBadge({
  variant,
  label,
  className = "",
}: OfferBadgeProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = OFFERBADGE_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const displayLabel = label ?? LABEL_DEFAULTS[variant];

  const classes = [
    "offerbadge",
    `offerbadge--${variant}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: OFFERBADGE_STYLES }}
      />
      <span
        className={classes}
        role="status"
        aria-label={displayLabel}
      >
        {variant === "live" ? (
          <span className="offerbadge-dot" aria-hidden="true" />
        ) : (
          <span className="offerbadge-clock" aria-hidden="true">
            <ClockIcon />
          </span>
        )}
        <span>{displayLabel}</span>
      </span>
    </>
  );
}
