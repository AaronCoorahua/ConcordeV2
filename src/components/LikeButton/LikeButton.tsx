"use client";

/**
 * LikeButton — Generado por Concorde
 * Fuente: Figma VOYAGER Design System · node 1119:11379
 * Preview: https://voyager-ds.vercel.app/preview/components/pase1
 * Generado: 2026-05-28 (revisado con Figma)
 * EDITAR LIBREMENTE después de generar
 */

import { useState, useCallback } from "react";
import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LikeButtonSize = "sm" | "md" | "lg";

export interface LikeButtonProps {
  /** Tamaño: sm=24px · md=32px · lg=40px */
  size?: LikeButtonSize;
  /** Estado activo controlado externamente */
  active?: boolean;
  /** Estado activo inicial (modo no controlado) */
  defaultActive?: boolean;
  /** Deshabilita interacciones */
  disabled?: boolean;
  /** Muestra skeleton de carga */
  skeleton?: boolean;
  /** Callback al alternar el like */
  onChange?: (active: boolean) => void;
  /** Texto accesible del botón */
  "aria-label"?: string;
  className?: string;
}

// ─── Tokens de tamaño — fuente: Figma node 1119:11379 ─────────────────────────

const SIZE_MAP: Record<LikeButtonSize, { btn: number; icon: number; border: string; padding: string }> = {
  sm: { btn: 24, icon: 16, border: "2px",    padding: "2px" },
  md: { btn: 32, icon: 14, border: "1.44px", padding: "1.44px" },
  lg: { btn: 40, icon: 24, border: "2px",    padding: "2px" },
};

// ─── SVG heart path ───────────────────────────────────────────────────────────

const HEART_PATH =
  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z";

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-plike-styles";

const PLIKE_STYLES = `
@keyframes plike-heart-pop {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.4); }
  65%  { transform: scale(0.85); }
  85%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}
@keyframes plike-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.plike {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border-style: solid;
  border-color: #e8ddff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  box-shadow: rgba(132, 96, 229, 0.14) 0px 2px 8px;
  transition:
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s,
    filter 0.25s,
    background 0.2s;
  transform: translateZ(0);
}

/* Glass highlight overlay */
.plike::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.55) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}

/* Hover */
.plike:hover:not(.plike--disabled):not(.plike--skeleton) {
  transform: scale(1.08) translateY(-2px);
  box-shadow:
    rgba(32, 0, 104, 0.22) 0px 10px 18px,
    rgba(32, 0, 104, 0.12) 0px 3px 6px;
}

/* Press */
.plike:active:not(.plike--disabled):not(.plike--skeleton) {
  transform: scale(0.92);
}

/* Focus ring */
.plike:focus-visible {
  outline: 2px solid #8460e5;
  outline-offset: 3px;
}

/* ── Sizes (Figma) ── */
.plike--sm { width: 24px; height: 24px; border-width: 2px;    padding: 2px; }
.plike--md { width: 32px; height: 32px; border-width: 1.44px; padding: 1.44px; }
.plike--lg { width: 40px; height: 40px; border-width: 2px;    padding: 2px; }

/* ── Active / liked state ── */
.plike--active {
  background: linear-gradient(135deg, #8460e5 0%, #3b1782 100%);
  border-color: #fbc47d;
  filter: drop-shadow(0px 3px 7px rgba(132, 96, 229, 0.35));
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.22);
}

.plike--active::before {
  background: linear-gradient(
    rgba(255, 255, 255, 0.18) 0%,
    transparent 50%
  );
}

/* Heart pop animation on toggle-to-active */
.plike--pop svg {
  animation: plike-heart-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

/* ── Disabled ── */
.plike--disabled {
  cursor: not-allowed;
  background: var(--component-button-like-bg, #ffffff);
  border-color: transparent;
  box-shadow: none;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.10));
  pointer-events: none;
}
.plike--disabled::before { display: none; }

/* ── Skeleton ── */
.plike--skeleton {
  background: var(--color-background-disabled, #e1e3e2);
  border-color: transparent;
  box-shadow: none;
  filter: none;
  cursor: default;
  pointer-events: none;
  padding: 0;
  animation: plike-pulse 1.6s ease-in-out infinite;
}
.plike--skeleton::before { display: none; }

/* ── Reduced motion — siempre ── */
@media (prefers-reduced-motion: reduce) {
  .plike,
  .plike::before { transition: none; }
  .plike--pop svg { animation: none; }
  .plike--skeleton { animation: none; opacity: 0.55; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LikeButton({
  size = "md",
  active: controlledActive,
  defaultActive = false,
  disabled = false,
  skeleton = false,
  onChange,
  "aria-label": ariaLabel = "Me gusta",
  className = "",
}: LikeButtonProps): JSX.Element {
  // Soporte controlado / no controlado
  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = useState(defaultActive);
  const isActive = isControlled ? controlledActive : internalActive;

  // Trigger animación heart-pop al activar
  const [popping, setPopping] = useState(false);

  // Inyectar estilos una vez (SSR + CSR)
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = PLIKE_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const handleClick = useCallback(() => {
    if (disabled || skeleton) return;
    const next = !isActive;
    if (!isControlled) setInternalActive(next);
    onChange?.(next);
    if (next) {
      setPopping(true);
      setTimeout(() => { setPopping(false); }, 420);
    }
  }, [isActive, isControlled, disabled, skeleton, onChange]);

  const { btn: btnPx, icon: iconPx } = SIZE_MAP[size];

  const classes = [
    "plike",
    `plike--${size}`,
    isActive  ? "plike--active"   : "",
    disabled  ? "plike--disabled" : "",
    skeleton  ? "plike--skeleton" : "",
    popping   ? "plike--pop"      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // SVG fill/stroke cambia según estado — fuente: Figma
  const svgFill   = isActive   ? "rgba(255, 255, 255, 0.92)" : "none";
  const svgStroke = disabled   ? "oklch(0.72 0.02 220)"
                  : isActive   ? "none"
                  : "var(--vmc-color-vault-600, oklch(0.38 0.20 285))";

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PLIKE_STYLES }}
      />
      <button
        type="button"
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isActive}
        style={{ width: btnPx, height: btnPx }}
      >
        {!skeleton && (
          <svg
            width={iconPx}
            height={iconPx}
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
        )}
      </button>
    </>
  );
}
