"use client";

/**
 * LikeButton — Generado por Concorde
 * Fuente: https://voyager-ds.vercel.app/preview/components/pase1
 * Generado: 2026-05-28
 * EDITAR LIBREMENTE después de generar
 */

import { useState, useCallback } from "react";
import type { JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LikeButtonSize = "sm" | "md" | "lg";

export interface LikeButtonProps {
  /** Tamaño del botón: sm=32px, md=44px, lg=60px */
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

// ─── Tokens de tamaño ─────────────────────────────────────────────────────────

const SIZE_MAP: Record<LikeButtonSize, { btn: string; icon: number }> = {
  sm: { btn: "32px", icon: 13 },
  md: { btn: "44px", icon: 19 },
  lg: { btn: "60px", icon: 27 },
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
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  background-image:
    linear-gradient(180deg, #ffffff 0%, #ffffff 100%),
    linear-gradient(135deg,
      var(--vmc-color-vault-200, oklch(0.87 0.09 285)) 0%,
      #ffffff 40%,
      var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 75%,
      var(--vmc-color-vault-200, oklch(0.87 0.09 285)) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: rgba(132, 96, 229, 0.14) 0px 2px 8px;
  transition:
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s,
    background-image 0.25s;
  transform: translateZ(0);
}

.plike::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(rgba(255, 255, 255, 0.55) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.plike::after {
  content: "";
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: radial-gradient(circle,
    var(--vmc-color-vault-400, oklch(0.62 0.20 285)) 0%,
    transparent 70%
  );
  filter: blur(10px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
}

.plike:hover:not(.plike--disabled):not(.plike--skeleton) {
  transform: scale(1.08) translateY(-2px);
  box-shadow:
    oklch(0.22 0.18 285 / 0.22) 0px 10px 18px,
    oklch(0.22 0.18 285 / 0.12) 0px 3px 6px;
}

.plike:active:not(.plike--disabled):not(.plike--skeleton) {
  transform: scale(0.92);
}

.plike:focus-visible {
  outline: 2px solid var(--vmc-color-vault-400, oklch(0.62 0.20 285));
  outline-offset: 3px;
}

/* Tamaños */
.plike--sm { width: 32px; height: 32px; }
.plike--md { width: 44px; height: 44px; }
.plike--lg { width: 60px; height: 60px; }

/* Estado activo / liked */
.plike--active {
  background-image:
    linear-gradient(135deg,
      var(--vmc-color-vault-500, oklch(0.45 0.20 285)) 0%,
      var(--vmc-color-vault-700, oklch(0.30 0.20 285)) 100%
    ),
    linear-gradient(135deg,
      var(--vmc-color-orange-400, oklch(0.72 0.16 55)) 0%,
      #ffffff 40%,
      var(--vmc-color-vault-400, oklch(0.55 0.20 285)) 75%,
      var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 100%
    );
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow:
    rgba(132, 96, 229, 0.35) 0px 3px 14px,
    rgba(255, 255, 255, 0.22) 0px 1px 0px inset;
}

.plike--active::before {
  background: linear-gradient(rgba(255, 255, 255, 0.18) 0%, transparent 50%);
}

.plike--active::after { opacity: 0.35; }
.plike--active:hover::after { opacity: 0.6; }

/* Animación del corazón al activar */
.plike--pop svg {
  animation: plike-heart-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

/* Disabled */
.plike--disabled {
  cursor: not-allowed;
  box-shadow: none;
  background-image: none;
  background-color: oklch(0.88 0.004 220);
  opacity: 0.7;
  pointer-events: none;
}
.plike--disabled::after { display: none; }

/* Skeleton */
.plike--skeleton {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, oklch(0.88 0.01 220));
  border-color: transparent;
  box-shadow: none;
  cursor: default;
  pointer-events: none;
  animation: plike-pulse 1.6s ease-in-out infinite;
}
.plike--skeleton::before,
.plike--skeleton::after { display: none; }

/* Reduced motion — siempre */
@media (prefers-reduced-motion: reduce) {
  .plike,
  .plike::after { transition: none; }
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

  // Trigger animación heart-pop
  const [popping, setPopping] = useState(false);

  // Inyectar estilos una vez
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

  const { btn: btnSize, icon: iconSize } = SIZE_MAP[size];

  const classes = [
    "plike",
    `plike--${size}`,
    isActive     ? "plike--active"   : "",
    disabled     ? "plike--disabled" : "",
    skeleton     ? "plike--skeleton" : "",
    popping      ? "plike--pop"      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // El SVG cambia fill/stroke según estado
  const svgFill   = isActive ? "rgba(255, 255, 255, 0.92)" : "none";
  const svgStroke = isActive ? "none" : "var(--vmc-color-vault-600, oklch(0.38 0.20 285))";

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
        style={{ width: btnSize, height: btnSize }}
      >
        {!skeleton && (
          <svg
            width={iconSize}
            height={iconSize}
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
