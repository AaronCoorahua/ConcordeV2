"use client";

/**
 * ChevronPattern — capa decorativa de chevrones ">" (motivo del logo >vmc<).
 * Se usa como fondo de los banners de navegación: SVG con <pattern> tileado
 * en diagonal, id único por instancia (useId) para poder montar varios banners.
 */

import { useId } from "react";
import type { JSX } from "react";

export interface ChevronPatternProps {
  /** Color de los chevrones (default blanco) */
  color?: string;
  /** Opacidad de la capa completa (default 0.08) */
  opacity?: number;
  /** Tamaño del tile en px (default 56) */
  size?: number;
  className?: string;
}

export default function ChevronPattern({
  color = "#ffffff",
  opacity = 0.08,
  size = 56,
  className = "",
}: ChevronPatternProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");
  const patternId = `bn-chevron${uid}`;
  const half = size / 2;

  return (
    <svg
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        transition: "opacity 0.25s ease",
      }}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          {/* Chevron ">" centrado en el tile */}
          <path
            d={`M ${size * 0.28} ${size * 0.18} L ${size * 0.58} ${half} L ${size * 0.28} ${size * 0.82}`}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.14}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
