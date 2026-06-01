"use client";

/**
 * OfferCard — Generado por Concorde
 * Fuente: https://voyager-ds.vercel.app/preview/components/pase1
 * Generado: 2026-05-28
 * EDITAR LIBREMENTE después de generar
 */

import { useState, useCallback } from "react";
import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OfferCardVariant = "live" | "proxima";

export interface OfferCardProps {
  /** "live" = EN VIVO (orange bar) · "proxima" = PRÓXIMA (purple bar) */
  variant: OfferCardVariant;
  /** Nombre del vehículo (ej. "Ford Bronco Sport") */
  name: string;
  /** Año (ej. "2024") */
  year: string | number;
  /** Precio formateado (ej. "US$ 28,500") */
  price: string;
  /** URL de imagen del vehículo */
  imageSrc?: string;
  /** Alt text de la imagen */
  imageAlt?: string;
  /** Estado liked controlado */
  liked?: boolean;
  /** Callback al alternar like */
  onLikeChange?: (liked: boolean) => void;
  /** Callback al clickear la card */
  onClick?: () => void;
  /** Aria label de la card */
  "aria-label"?: string;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-pcard-styles";

const PCARD_STYLES = `
/* ── Keyframes ── */
@keyframes pcard-live-ring {
  0%   { opacity: 1; transform: scale(0.8); }
  100% { opacity: 0; transform: scale(1.9); }
}
@keyframes pcard-clock-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(0.85); }
}
@keyframes pcard-heart-pop {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.4); }
  65%  { transform: scale(0.85); }
  85%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* ── Card base ── */
.pcard {
  width: 170px;
  background: oklch(1 0 0);
  border-radius: 8px;
  box-shadow:
    oklch(0.22 0.18 285 / 0.1) 0px 8px 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition:
    transform 150ms cubic-bezier(0.3, 0, 0, 1),
    box-shadow 150ms cubic-bezier(0.3, 0, 0, 1);
  cursor: pointer;
}

.pcard:hover {
  transform: translateY(-3px);
  box-shadow: oklch(0.22 0.18 285 / 0.12) 0px 12px 20px;
}

/* ── Image section ── */
.pcard__img {
  width: 100%;
  height: 112px;
  background: oklch(0.93 0.006 220);
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pcard__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pcard__img-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

/* ── Body ── */
.pcard__body {
  display: flex;
  flex-direction: column;
  padding: 12px;
  flex: 1;
}

.pcard__meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pcard__name {
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: oklch(0.15 0.008 200);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.pcard__year {
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: oklch(0.3 0.2 285);
  margin: 0;
}

/* ── Price row ── */
.pcard__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  flex-shrink: 0;
}

.pcard__price-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pcard__price-text {
  font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  color: oklch(0.42 0.22 285);
  white-space: nowrap;
}

/* ── Variant: live (orange bar at bottom) ── */
.pcard--live::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg,
    oklch(0.78 0.17 55) 0%,
    oklch(0.72 0.16 55) 50%,
    oklch(0.54 0.18 44) 100%
  );
  border-radius: 0 0 4px 4px;
}

/* ── Variant: proxima (purple border bottom) ── */
.pcard--proxima {
  border-bottom: 6px solid oklch(0.42 0.22 285);
}

/* ── Pill badge ── */
.pcard-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border-radius: 9999px;
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  backdrop-filter: blur(6px);
}

.pcard-pill--live {
  border: 1.5px solid transparent;
  background-image:
    linear-gradient(135deg, oklch(0.78 0.17 55) 0%, oklch(0.72 0.16 55) 40%, oklch(0.54 0.18 44) 100%),
    linear-gradient(135deg, oklch(0.86 0.12 55) 0%, oklch(1 0 0 / 0.45) 40%, oklch(0.65 0.16 50) 75%, oklch(0.86 0.12 55) 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    oklch(0.72 0.16 55 / 0.45) 0px 2px 10px,
    oklch(1 0 0 / 0.14) 0px 1px 0px inset;
  color: oklch(1 0 0);
}

.pcard-pill--proxima {
  border: 1.5px solid transparent;
  background-image:
    linear-gradient(135deg, oklch(0.48 0.24 285) 0%, oklch(0.48 0.24 285) 30%, oklch(0.2 0.17 285) 100%),
    linear-gradient(135deg, oklch(0.65 0.2 285) 0%, oklch(1 0 0 / 0.4) 38%, oklch(0.45 0.22 285) 68%, oklch(0.65 0.2 285) 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    oklch(0.22 0.18 285 / 0.5) 0px 2px 10px,
    oklch(1 0 0 / 0.1) 0px 1px 0px inset;
  color: oklch(1 0 0);
}

/* Animated pulsing dot (live) */
.pcard-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: oklch(1 0 0 / 0.92);
  flex-shrink: 0;
  animation: pcard-live-ring 1.4s ease-out infinite;
  position: relative;
}

/* Blinking clock (proxima) */
.pcard-pill-clock {
  flex-shrink: 0;
  animation: pcard-clock-blink 1.4s ease-in-out infinite;
}

/* ── Price icon (teal coin, self-contained) ── */
.pprice-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-image:
    linear-gradient(135deg,
      var(--vmc-color-negotiable, oklch(0.78 0.14 195)) 0%,
      oklch(0.65 0.16 195) 100%
    ),
    linear-gradient(135deg,
      oklch(0.88 0.08 195) 0%,
      oklch(1 0 0) 40%,
      oklch(0.72 0.14 195) 75%,
      oklch(0.88 0.08 195) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: oklch(0.78 0.14 195 / 0.25) 0px 2px 8px;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
  transform: translateZ(0);
}

.pprice-sm::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(rgba(255, 255, 255, 0.45) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* ── Mini like button (self-contained inside card) ── */
.pcard-like {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: 2px solid #e8ddff;
  background: #ffffff;
  cursor: pointer;
  padding: 2px;
  position: relative;
  box-shadow: rgba(132, 96, 229, 0.14) 0px 2px 8px;
  transition:
    transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.2s;
  flex-shrink: 0;
  outline: none;
}

.pcard-like:hover {
  transform: scale(1.1) translateY(-1px);
  box-shadow: rgba(32, 0, 104, 0.2) 0px 6px 14px;
}

.pcard-like:active { transform: scale(0.92); }

.pcard-like--active {
  background: linear-gradient(135deg, #8460e5 0%, #3b1782 100%);
  border-color: #fbc47d;
  box-shadow: rgba(132, 96, 229, 0.35) 0px 2px 8px, inset 0px 1px 0px rgba(255,255,255,0.22);
}

.pcard-like--pop svg {
  animation: pcard-heart-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

.pcard-like:focus-visible {
  outline: 2px solid oklch(0.62 0.20 285);
  outline-offset: 2px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .pcard, .pcard__img img { transition: none; }
  .pcard-pill-dot { animation: none; }
  .pcard-pill-clock { animation: none; }
  .pcard-like { transition: none; }
  .pcard-like--pop svg { animation: none; }
}
`;

const HEART_PATH =
  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z";

const DOLLAR_PATH = "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6";

const CLOCK_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function OfferCard({
  variant,
  name,
  year,
  price,
  imageSrc,
  imageAlt,
  liked: controlledLiked,
  onLikeChange,
  onClick,
  "aria-label": ariaLabel,
  className = "",
}: OfferCardProps): JSX.Element {
  // Inject styles once
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = PCARD_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const isControlled = controlledLiked !== undefined;
  const [internalLiked, setInternalLiked] = useState(false);
  const isLiked = isControlled ? controlledLiked : internalLiked;
  const [popping, setPopping] = useState(false);

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isLiked;
    if (!isControlled) setInternalLiked(next);
    onLikeChange?.(next);
    if (next) {
      setPopping(true);
      setTimeout(() => { setPopping(false); }, 420);
    }
  }, [isLiked, isControlled, onLikeChange]);

  const svgFill   = isLiked ? "rgba(255, 255, 255, 0.92)" : "none";
  const svgStroke = isLiked ? "none" : "var(--vmc-color-vault-600, oklch(0.38 0.20 285))";

  const cardClasses = [
    "pcard",
    `pcard--${variant}`,
    className,
  ].filter(Boolean).join(" ");

  const likeClasses = [
    "pcard-like",
    isLiked  ? "pcard-like--active" : "",
    popping  ? "pcard-like--pop"    : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PCARD_STYLES }}
      />
      <article
        className={cardClasses}
        onClick={onClick}
        aria-label={ariaLabel ?? name}
        role="button"
        tabIndex={0}
        onKeyDown={function handleKey(e) { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      >
        {/* Image section */}
        <div className="pcard__img">
          {imageSrc && (
            <img src={imageSrc} alt={imageAlt ?? name} loading="lazy" />
          )}

          {/* Pill badge */}
          <div className="pcard__img-badge">
            {variant === "live" ? (
              <div className="pcard-pill pcard-pill--live" aria-label="En vivo">
                <div className="pcard-pill-dot" aria-hidden="true" />
                <span>EN VIVO</span>
              </div>
            ) : (
              <div className="pcard-pill pcard-pill--proxima" aria-label="Próxima">
                <span className="pcard-pill-clock" aria-hidden="true">{CLOCK_SVG}</span>
                <span>PRÓXIMA</span>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="pcard__body">
          <div className="pcard__meta">
            <h3 className="pcard__name">{name}</h3>
            <p className="pcard__year">{year}</p>
          </div>

          {/* Price row */}
          <div className="pcard__price-row">
            <div className="pcard__price-left">
              {/* Teal price icon */}
              <div className="pprice-sm" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.92)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <path d={DOLLAR_PATH} />
                </svg>
              </div>
              <span className="pcard__price-text">{price}</span>
            </div>

            {/* Mini like button */}
            <button
              type="button"
              className={likeClasses}
              onClick={handleLike}
              aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
              aria-pressed={isLiked}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={svgFill}
                stroke={svgStroke}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={HEART_PATH} />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
