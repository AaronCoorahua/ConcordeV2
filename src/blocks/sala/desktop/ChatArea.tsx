/**
 * ChatArea — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "Frame 1000022968" (área de mensajes 278×478)
 *
 * Fondo del área de mensajes del chat: morado translúcido (#5A35C2 40%),
 * radio 16 y borde superior sutil (white 0.1 → transparent). Por ahora es
 * solo el fondo; en el bottom va la ProgressBar (tiempo de bid) tal cual el
 * SVG. La lista de mensajes se montará encima vía `children`.
 */

import type { JSX, ReactNode } from "react";
import ProgressBar from "../../../components/ProgressBar";

// Scrollbar oculto · burbujas con texto más pequeño · los "sent" alineados a la derecha
const CHATAREA_LIST_CSS = `
.chatarea__list { scrollbar-width: none; -ms-overflow-style: none; }
.chatarea__list::-webkit-scrollbar { width: 0; height: 0; display: none; }
.chatarea__list .pbidmsg { font-size: 12px; }
.chatarea__list .pbidmsg--sent { align-self: flex-end; }
`;

export interface ChatAreaProps {
  /** Progreso de la barra inferior 0-100 (default 34, tal cual el SVG) */
  progress?: number;
  className?: string;
  /** Lista de mensajes (se monta encima del fondo) */
  children?: ReactNode;
}

export const CHATAREA_WIDTH = 278;
export const CHATAREA_HEIGHT = 478;

// Relleno morado translúcido (#5A35C2 @ 40%)
const FILL = "linear-gradient(rgba(90,53,194,0.4), rgba(90,53,194,0.4))";
// Borde: highlight blanco sutil arriba (paint13: white 0.1 → transparent)
const BORDER = "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 55%)";

export default function ChatArea({
  progress = 34,
  className = "",
  children,
}: ChatAreaProps): JSX.Element {
  return (
    <div
      className={className}
      data-block-section="chat-area"
      style={{
        boxSizing: "border-box",
        position: "relative",
        width: CHATAREA_WIDTH,
        height: CHATAREA_HEIGHT,
        borderRadius: 16,
        backgroundImage: `${FILL}, ${BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        overflow: "hidden",
      }}
    >
      {/* Lista de mensajes · scrollable (sin scrollbar), por encima de la ProgressBar */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CHATAREA_LIST_CSS }} />
      <div
        className="chatarea__list"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 22,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        {children}
      </div>

      {/* ProgressBar (tiempo de bid) pegada al fondo, full-width */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}
