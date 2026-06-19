"use client";

/**
 * StatPill — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "Background+Shadow (1)/(2)" (pill 156×47)
 *
 * Pill de estadística con SendBidIcon a la izquierda + label/valor a la derecha.
 * 3 variantes:
 *   · "bids"  → naranja (MIS BIDS) · SendBidIcon "white" (flecha naranja)
 *   · "total" → morado  (BIDS TOTALES) · SendBidIcon "vault" (flecha blanca)
 *   · "glass" → 50×22 glass real (interior translúcido + borde gradiente vía
 *               máscara ::before, sin bleed-through) · ícono custom
 * Reusa el componente SendBidIcon. Editable por props.
 */

import type { JSX, ReactNode } from "react";
import SendBidIcon from "@/src/components/SendBidIcon/SendBidIcon";

export type StatPillVariant = "bids" | "total" | "glass";

export interface StatPillProps {
  /** Variante de color (default "bids") */
  variant?: StatPillVariant;
  /** Etiqueta (default "MIS BIDS") */
  label?: string;
  /** Valor (default "18") */
  value?: string;
  /** Ícono custom (solo variante "glass"). Si se omite usa SendBidIcon. */
  icon?: ReactNode;
  className?: string;
}

// ── Glass (mobile) · estilo con máscara para que NO sangre el borde ──
const GLASS_STYLE_ID = "concorde-statpill-glass-styles";
const STATPILL_GLASS_STYLES = `
.statpill-glass {
  position: relative;
  box-sizing: border-box;
  height: 22px;
  width: 50px;
  border-radius: 11px;
  background: linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 100%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 0 4px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
.statpill-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(125deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
`;

let _glassInjected = false;

export const STATPILL_WIDTH = 156;
export const STATPILL_HEIGHT = 47;

// Naranja (MIS BIDS): paint0 vertical + borde gradiente vivo (white→naranja→lila→white)
const BIDS_FILL = "linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)";
const BIDS_BORDER = "linear-gradient(125deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%)";
// Morado (BIDS TOTALES): paint0 horizontal + highlight blanco sutil arriba
const TOTAL_FILL = "linear-gradient(270deg, #19004A 0%, #3B1782 50%, #2E0F70 100%)";
const TOTAL_BORDER = "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 55%)";

export default function StatPill({
  variant = "bids",
  label = "MIS BIDS",
  value = "18",
  icon,
  className = "",
}: StatPillProps): JSX.Element {
  // ── Variante glass (mobile header): 50×22 rx11 · glass real (máscara) ──
  // Fuente: Frame Group 4 · pills glass (paint2 fill + paint4 border, blur 5)
  if (variant === "glass") {
    if (typeof document !== "undefined" && !_glassInjected) {
      if (!document.getElementById(GLASS_STYLE_ID)) {
        const el = document.createElement("style");
        el.id = GLASS_STYLE_ID;
        el.textContent = STATPILL_GLASS_STYLES;
        document.head.appendChild(el);
      }
      _glassInjected = true;
    }
    return (
      <>
        <style id={`${GLASS_STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STATPILL_GLASS_STYLES }} />
        <div className={`statpill-glass ${className}`.trim()} data-slot="stat-pill-glass">
          {icon ?? <SendBidIcon variant="white" size={14} aria-label="Bid" />}
          {label ? (
            <span style={{ fontSize: 10, fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap" }}>{label}</span>
          ) : null}
          <span style={{ fontSize: 10, fontWeight: 700, lineHeight: 1, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>
            {value}
          </span>
        </div>
      </>
    );
  }

  const isBids = variant === "bids";
  return (
    <div
      className={className}
      data-slot={`stat-pill-${variant}`}
      style={{
        boxSizing: "border-box",
        width: STATPILL_WIDTH,
        height: STATPILL_HEIGHT,
        borderRadius: 16,
        backgroundImage: isBids ? `${BIDS_FILL}, ${BIDS_BORDER}` : `${TOTAL_FILL}, ${TOTAL_BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        boxShadow: "rgba(20,0,70,0.42) 0px 8px 22px, inset 0px 1px 0px rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0 12px 0 8px",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      <SendBidIcon variant={isBids ? "white" : "vault"} size={32} aria-label="Enviar puja" />
      <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: "#ffffff",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
      </span>
    </div>
  );
}
