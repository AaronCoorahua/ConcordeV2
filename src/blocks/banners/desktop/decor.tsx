/**
 * decor — piezas decorativas estáticas de los banners 766×272 (sin efectos).
 * Recrean los elementos de los banners de producción: monedas SubasCoin
 * (>S<), sparkles de 4 puntas, rombos y el chevrón "V" gigante del fondo.
 */

import type { CSSProperties, JSX } from "react";

const ABS = (style?: CSSProperties): CSSProperties => ({ position: "absolute", pointerEvents: "none", ...style });

// ─── Moneda SubasCoin ─────────────────────────────────────────────────────────

export interface CoinProps {
  size?: number;
  /** filled = blanca con glifo morado · outline = solo contorno blanco */
  variant?: "filled" | "outline";
  style?: CSSProperties;
}

export function Coin({ size = 44, variant = "filled", style }: CoinProps): JSX.Element {
  const filled = variant === "filled";
  const ink = filled ? "#3B1782" : "#FFFFFF";
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" style={ABS(style)}>
      <circle cx="22" cy="22" r="20" fill={filled ? "#FFFFFF" : "none"} stroke={ink} strokeWidth="2.5" />
      <circle cx="22" cy="22" r="15" fill="none" stroke={ink} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <text x="22" y="28.5" textAnchor="middle" fontSize="17" fontWeight="800" fill={ink} fontFamily="'Plus Jakarta Sans', Arial, sans-serif">S</text>
      <path d="M12.5 17.5 L9.5 22 L12.5 26.5" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 17.5 L34.5 22 L31.5 26.5" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sparkle de 4 puntas ──────────────────────────────────────────────────────

export interface SparkleProps {
  size?: number;
  color?: string;
  /** true = solo contorno */
  outline?: boolean;
  style?: CSSProperties;
}

export function Sparkle({ size = 16, color = "#E8503A", outline = false, style }: SparkleProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={ABS(style)}>
      <path
        d="M12 1 C13.2 8 16 10.8 23 12 C16 13.2 13.2 16 12 23 C10.8 16 8 13.2 1 12 C8 10.8 10.8 8 12 1 Z"
        fill={outline ? "none" : color}
        stroke={outline ? color : "none"}
        strokeWidth={outline ? 2 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Rombo pequeño ────────────────────────────────────────────────────────────

export function Diamond({ size = 10, color = "#3B1782", style }: { size?: number; color?: string; style?: CSSProperties }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" style={ABS(style)}>
      <rect x="1.8" y="1.8" width="6.4" height="6.4" transform="rotate(45 5 5)" fill={color} />
    </svg>
  );
}

// ─── Chevrón "V" gigante del fondo (doble trazo, como el logo) ───────────────

export interface ChevronVProps {
  width?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function ChevronV({ width = 240, color = "rgba(59,23,130,0.55)", strokeWidth = 3, style }: ChevronVProps): JSX.Element {
  const height = width * 0.75;
  return (
    <svg width={width} height={height} viewBox="0 0 100 75" aria-hidden="true" style={ABS(style)}>
      <path d="M8 6 L50 44 L92 6" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" />
      <path d="M8 32 L50 70 L92 32" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" />
    </svg>
  );
}

// ─── Iconos de pill / chip ────────────────────────────────────────────────────

/** Apretón de manos simplificado (pill EN VIVO / NEGOCIABLE) */
export function HandshakeIcon({ size = 18, color = "#FFFFFF" }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 10.5 L6.5 7 L10.5 8.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10.5 L17.5 7 L13.5 9 L10 12 L12 14 L14.5 12.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11 L9 14.5 L11 16 L13.5 17.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 12.5 L16.5 14.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 14 L13 15.8" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** Carro (chip de categoría Vehicular) — path del CategoryCard vehicular */
export function CarIcon({ size = 22, color = "#FFFFFF" }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size * 0.87} viewBox="41 29 31 27" fill="none" aria-hidden="true">
      <path
        fill={color}
        d="M49.8053 30.4693C48.7705 30.7374 47.8575 31.8771 47.0662 33.7542C45.9705 36.3017 45.7271 36.5698 44.2053 36.1676C42.7445 35.8324 42.501 36.0335 42.501 37.2402C42.501 37.9777 42.8662 38.7821 43.2314 38.9162C43.8401 39.1844 43.9618 41.1955 43.8401 46.6257L43.5966 54H45.4836C46.9445 54 47.4314 53.6648 47.7358 52.324L48.101 50.648H56.501H64.901L65.2662 52.324C65.5705 53.6648 66.0575 54 67.5184 54H69.4053L69.1618 46.6257C69.0401 41.1955 69.1618 39.1844 69.7705 38.9162C70.1358 38.7821 70.501 37.9777 70.501 37.2402C70.501 36.0335 70.2575 35.8324 68.7966 36.1676C67.2749 36.5698 67.0314 36.3017 65.9358 33.7542C64.4749 30.3352 63.6227 30 56.501 30C53.6401 30 50.6575 30.2011 49.8053 30.4693ZM61.4923 32.2793C63.4401 32.6816 63.8053 33.0838 64.7184 35.6983C65.2662 37.3073 65.5705 38.8492 65.3271 39.1173C64.7792 39.7207 48.2227 39.7207 47.6749 39.1173C47.4314 38.8492 47.7358 37.3073 48.2836 35.6313C49.1358 33.2849 49.6836 32.5475 50.9618 32.3464C53.6401 31.8771 59.1184 31.8771 61.4923 32.2793ZM49.7445 42.5363C50.901 43.3408 50.0488 44.6145 48.2836 44.6145C47.4314 44.6145 46.5184 44.0112 46.1532 43.2737C45.5445 42.067 45.6662 41.933 47.1879 41.933C48.101 41.933 49.2575 42.2011 49.7445 42.5363ZM66.8488 43.2737C66.1184 44.7486 63.5618 45.0838 62.8314 43.8771C62.2836 42.8715 63.6836 41.933 65.814 41.933C67.3358 41.933 67.4575 42.067 66.8488 43.2737ZM60.9445 47.2961C60.6401 48.5028 60.0923 48.6369 56.501 48.6369C52.9097 48.6369 52.3618 48.5028 52.0575 47.2961C51.7532 46.0223 52.0575 45.9553 56.501 45.9553C60.9445 46.0223 61.2488 46.0223 60.9445 47.2961Z"
      />
    </svg>
  );
}
