"use client";

/**
 * SubasCoinsCard — card 766×437 del bloque «Agregar Subascoins».
 *
 * 2 columnas:
 *   · Izquierda → título + SubasCoinsInfoCard (beneficios) + nota del valor >S<
 *   · Derecha   → AmountOptionGroup (montos 30/50/80/130 + monto personalizado) + botón «Sigamos»
 */

import { useState } from "react";
import type { JSX } from "react";
import AmountOptionGroup, { type AmountSelection } from "@/src/components/AmountOptionGroup";
import Button from "@/src/components/Button";
import SubasCoinsInfoCard from "./SubasCoinsInfoCard";

export const SUBASCOINSCARD_WIDTH = 766;
export const SUBASCOINSCARD_HEIGHT = 437;

export interface SubasCoinsCardProps {
  className?: string;
}

export default function SubasCoinsCard({ className = "" }: SubasCoinsCardProps): JSX.Element {
  const [sel, setSel] = useState<AmountSelection>(2); // ">S< 80" preseleccionado

  return (
    <div
      className={className}
      data-slot="subascoins-card"
      style={{
        boxSizing: "border-box",
        width: SUBASCOINSCARD_WIDTH,
        minHeight: SUBASCOINSCARD_HEIGHT,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 0 16px 4px rgba(0,0,0,0.08)",
        padding: 32,
        display: "flex",
        gap: 32,
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      {/* ── Columna izquierda ── */}
      <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 800,
            letterSpacing: 0,
            // VYGradientPurple: #5F3ED8 → #340091 → #140046
            backgroundImage: "linear-gradient(135deg, #5F3ED8 0%, #340091 55%, #140046 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          ¡Adquiere{" "}
          <span
            style={{
              // VYGradientOrange1: #FF9639 → #EF852E → #BE3D00
              backgroundImage: "linear-gradient(135deg, #FF9639 0%, #EF852E 50%, #BE3D00 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            SubasCoins
          </span>{" "}
          y disfruta de sus beneficios!
        </h2>

        <SubasCoinsInfoCard />

        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#ED8936" }}>
          El valor de <strong>{">S<"} 1</strong> es equivalente a US$ 1 (un Dólar Americano).
        </p>
      </div>

      {/* ── Columna derecha ── */}
      <div style={{ flex: "0 0 254px", display: "flex", flexDirection: "column", gap: 20 }}>
        <AmountOptionGroup
          amounts={["30", "50", "80", "130"]}
          allowCustom
          customPlaceholder="210"
          value={sel}
          onChange={setSel}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" style={{ width: 200 }}>Sigamos</Button>
        </div>
      </div>
    </div>
  );
}
