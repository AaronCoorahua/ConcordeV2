/**
 * MobileChatPanel — Sección del bloque Sala · Mobile (Voyager DS)
 * Fuente: Figma VOYAGER · Frame 1000023075 (panel glass del chat mobile)
 *
 * Fondo glass (blanco 8% + blur) pegado debajo del header. Borde gradiente con
 * técnica de máscara (::before recortado) para no rellenar el interior. Al fondo,
 * la ProgressBar en variante "rainbow" (horizontal, no diagonal). Slot `children`
 * para el contenido del chat (mensajes, etc.).
 */

"use client";

import type { JSX, ReactNode } from "react";
import ProgressBar from "@/src/components/ProgressBar/ProgressBar";
import BidProposalV2 from "@/src/components/BidProposalV2/BidProposalV2";

export const MOBILECHATPANEL_WIDTH = 420;

const STYLE_ID = "concorde-smchatpanel-styles";

const SMCHATPANEL_STYLES = `
.smchatpanel {
  position: relative;
  width: ${MOBILECHATPANEL_WIDTH}px;
  border-radius: 0 0 16px 16px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: rgba(0,0,0,0.35) 0px 0px 10px 4px;
  overflow: hidden;
}
/* Borde gradiente sin rellenar el interior (glass real) */
.smchatpanel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
`;

let _stylesInjected = false;

export interface MobileChatPanelProps {
  /** Alto del panel en px (default 670) */
  height?: number;
  /** Progreso del bid 0-100 (default 40) */
  progress?: number;
  children?: ReactNode;
  className?: string;
}

export default function MobileChatPanel({
  height = 670,
  progress = 40,
  children,
  className = "",
}: MobileChatPanelProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = SMCHATPANEL_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SMCHATPANEL_STYLES }} />
      <div className={`smchatpanel ${className}`.trim()} style={{ height }}>
        {/* Propuesta de bid actual (glass) — arriba al centro */}
        <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <BidProposalV2 />
        </div>
        {children}
        {/* ProgressBar rainbow pegada al fondo */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <ProgressBar variant="rainbow" value={progress} aria-label="Tiempo de bid" />
        </div>
      </div>
    </>
  );
}
