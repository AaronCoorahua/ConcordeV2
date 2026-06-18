/**
 * Sala — Bloque de Concorde (Voyager DS)
 *
 * Sala de subasta. Por ahora es solo el lienzo base: un fondo de 1023 × 1042
 * con el color de marca (#2E0F70). Iremos montando las secciones encima.
 */

import type { JSX } from "react";
import ConsoleHeader from "./ConsoleHeader";
import SalaStatus from "@/src/components/SalaStatus/SalaStatus";
import CardViewer from "@/src/components/CardViewer/CardViewer";

export interface SalaProps {
  className?: string;
}

export const SALA_WIDTH = 1023;
export const SALA_HEIGHT = 1042;

const SALA_IMAGES = ["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"];

export default function Sala({ className = "" }: SalaProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="sala"
      style={{
        position: "relative",
        width: SALA_WIDTH,
        height: SALA_HEIGHT,
        background: "#2E0F70",
        overflow: "hidden",
      }}
    >
      {/* ConsoleHeader 991×64 · a 16px del top, centrado (16px a cada lado) */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <ConsoleHeader />
      </div>

      {/* Banner 204×930 · abajo-izquierda: 16px del left, 16px del bottom, 16px del header */}
      <div
        data-slot="left-banner"
        style={{
          position: "absolute",
          top: 96,
          left: 16,
          width: 204,
          height: 930,
          borderRadius: 8,
          background: "#E9EAEC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "#9AA1AC",
        }}
      >
        BANNER
        <br />
        204 × 930
      </div>

      {/* SalaStatus + visor · el borde gradiente (slot header de CardViewer) envuelve
          SOLO SalaStatus + el visor; el filmstrip queda aparte, debajo. */}
      <div style={{ position: "absolute", top: 96, left: 236 }}>
        <CardViewer header={<SalaStatus />} images={SALA_IMAGES} />
      </div>
    </div>
  );
}
