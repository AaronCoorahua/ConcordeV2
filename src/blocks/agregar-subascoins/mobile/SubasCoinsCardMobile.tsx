"use client";

/**
 * SubasCoinsCardMobile — card 388×808 del bloque «Agregar Subascoins» · mobile.
 *
 * Layout vertical (1 columna):
 *   · título «¡Adquiere SubasCoins y disfruta…» (gradiente)
 *   · SubasCoinsInfoCard (card morado + beneficios)
 *   · nota «El valor de >S< 1…»
 *   · AmountOptionGroup (30/50/80/130 + monto personalizado)
 *   · botón «Sigamos» (primary, 200×48) centrado
 *
 * Reutiliza SubasCoinsInfoCard, AmountOptionGroup y Button (los mismos del desktop).
 */

import { useState } from "react";
import type { JSX } from "react";
import AmountOptionGroup, { type AmountSelection } from "@/src/components/AmountOptionGroup";
import Button from "@/src/components/Button";
import SubasCoinsInfoCard from "@/src/blocks/agregar-subascoins/desktop/SubasCoinsInfoCard";

export const SUBASCOINSCARD_MOBILE_WIDTH = 388;
export const SUBASCOINSCARD_MOBILE_HEIGHT = 808;

export interface SubasCoinsCardMobileProps {
  className?: string;
}

export default function SubasCoinsCardMobile({ className = "" }: SubasCoinsCardMobileProps): JSX.Element {
  const [sel, setSel] = useState<AmountSelection>(2); // ">S< 80" preseleccionado

  return (
    <div
      className={className}
      data-slot="subascoins-card-mobile"
      style={{
        boxSizing: "border-box",
        width: SUBASCOINSCARD_MOBILE_WIDTH,
        minHeight: SUBASCOINSCARD_MOBILE_HEIGHT,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 0 16px 4px rgba(0,0,0,0.08)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      {/* Título con gradiente (morado + "SubasCoins" naranja) */}
      <h2
        style={{
          margin: 0,
          width: "100%",
          fontSize: 20,
          lineHeight: "26px",
          fontWeight: 800,
          textAlign: "center",
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

      {/* Card morado SubasCoins + beneficios (392 con max-width:100% → se ajusta a 348) */}
      <SubasCoinsInfoCard />

      {/* Nota del valor */}
      <p style={{ margin: 0, width: "100%", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#ED8936" }}>
        El valor de <strong>{">S<"} 1</strong> es equivalente a US$ 1 (un Dólar Americano).
      </p>

      {/* Opciones de monto (apiladas) */}
      <AmountOptionGroup
        amounts={["30", "50", "80", "130"]}
        allowCustom
        customPlaceholder="210"
        value={sel}
        onChange={setSel}
        className="scm-amounts"
      />

      {/* Sigamos */}
      <Button variant="primary" style={{ width: 200 }}>Sigamos</Button>

      {/* Los AmountOption traen width 254; en mobile los alargamos al ancho de la card */}
      <style dangerouslySetInnerHTML={{ __html: ".scm-amounts{width:100%;align-items:stretch;}.scm-amounts .pamount{width:100%;}" }} />
    </div>
  );
}
