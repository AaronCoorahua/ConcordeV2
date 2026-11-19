/**
 * ChatNotice — aviso del sistema dentro del SubasChat (Mi Garaje, mi-garaje-lab · chat del panel de negociación):
 * nube centrada color crema, como el aviso de WhatsApp al activar los mensajes temporales; en verde cuando
 * registra que se aceptó la propuesta (tone="done"). El ícono y el texto van como hijos. Solo depende de React.
 */
import type { JSX, ReactNode } from "react";

export const CHAT_NOTICE_CSS = String.raw`
.sc__sys { align-self:center; display:flex; align-items:flex-start; gap:6px; max-width:86%; margin:2px auto 8px; padding:6px 10px; border-radius:8px; background:#FFF5D6; color:#5E4B12;
  font-size:.6875rem; line-height:1.45; text-align:center; box-shadow:0 1px .5px rgba(0,0,0,.08); }
.sc__sys b { font-weight:700; }
.sc__sys svg { flex:none; margin-top:2px; color:#9A7B1E; }
.sc__sys--done { background:#E6F7F7; color:#00686A; } .sc__sys--done svg { color:#008688; }
`;

export interface ChatNoticeProps {
  /** Ícono (svg de 14) y texto del aviso. */
  children: ReactNode;
  /** «done»: aviso verde de propuesta aceptada. Sin tono: aviso crema del sistema. */
  tone?: "done";
}

export function ChatNotice({ children, tone }: ChatNoticeProps): JSX.Element {
  return <>
    <style href="concorde-chat-notice" precedence="default">{CHAT_NOTICE_CSS}</style>
    <div className={`sc__sys${tone ? ` sc__sys--${tone}` : ""}`} role="note">{children}</div>
  </>;
}

export default ChatNotice;
