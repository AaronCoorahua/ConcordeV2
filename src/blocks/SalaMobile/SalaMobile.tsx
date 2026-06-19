/**
 * SalaMobile — Bloque de Concorde (Voyager DS)
 *
 * Sala de subasta · versión mobile. Por ahora es solo el lienzo base: un fondo
 * de 420 × 844 con el gradiente morado de marca (#5F3ED8 → #340091 → #140046,
 * paint0 del SVG). Iremos montando las secciones encima (sección por sección,
 * igual que el bloque Sala desktop).
 */

import type { JSX } from "react";
import MobileHeader, { MOBILEHEADER_HEIGHT } from "./MobileHeader";
import MobileChatPanel from "./MobileChatPanel";
import Button from "@/src/components/Button/Button";

export interface SalaMobileProps {
  className?: string;
}

// Override de ancho del CTA primary a 320×48 (la altura ya es 48 en .pvbtn)
const CTA_STYLES = ".salamobile-cta .pvbtn { width: 320px; padding: 0; }";

export const SALAMOBILE_WIDTH = 420;
export const SALAMOBILE_HEIGHT = 844;

// Fondo: paint0 (gradiente diagonal #5F3ED8 → #340091 50% → #140046)
export const SALAMOBILE_BG = "linear-gradient(116deg, #5F3ED8 0%, #340091 50%, #140046 100%)";

export default function SalaMobile({ className = "" }: SalaMobileProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="sala-mobile"
      style={{
        position: "relative",
        width: SALAMOBILE_WIDTH,
        height: SALAMOBILE_HEIGHT,
        background: SALAMOBILE_BG,
        overflow: "hidden",
      }}
    >
      {/* Header 420×95 (texto + pills glass + carro) arriba */}
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <MobileHeader />
      </div>

      {/* Fondo glass del chat 420×670 pegado debajo del header · ProgressBar rainbow al fondo */}
      <div style={{ position: "absolute", top: MOBILEHEADER_HEIGHT, left: 0 }}>
        <MobileChatPanel height={670} progress={40} />
      </div>

      {/* CTA primary 320×48 abajo del todo (en el espacio bajo el progress bar) */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CTA_STYLES }} />
      <div
        className="salamobile-cta"
        style={{ position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)" }}
      >
        <Button variant="primary">US$ 7,000</Button>
      </div>
    </div>
  );
}
