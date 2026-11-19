/**
 * ChatDay — separador de día del SubasChat (Mi Garaje, mi-garaje-lab · /m/oferta y el chat del panel de negociación):
 * una píldora gris centrada («Hoy») entre los mensajes. Solo depende de React.
 */
import type { JSX } from "react";

export const CHAT_DAY_CSS = String.raw`
.sc__day { align-self: center; margin: 4px 0; }
.sc__day span { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; color: #55526b; background: #e7e5f0; } /* ≥ 4.5:1 (AA) */
`;

export interface ChatDayProps {
  /** Día que separa (p. ej. «Hoy»). */
  label: string;
}

export function ChatDay({ label }: ChatDayProps): JSX.Element {
  return <>
    <style href="concorde-chat-day" precedence="default">{CHAT_DAY_CSS}</style>
    <div className="sc__day"><span>{label}</span></div>
  </>;
}

export default ChatDay;
