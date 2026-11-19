/**
 * /handoff/chatnotice — Documentación de ChatNotice (aviso del sistema en el SubasChat de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ChatNotice } from "@/src/components/ChatNotice";

const USAGE = `import { ChatNotice } from "@/src/components/ChatNotice";

<ChatNotice><LockIcon /><span><b>Pagaste tu fee de habilitación.</b> Coordinen aquí la visita y el pago.</span></ChatNotice>
<ChatNotice tone="done"><CheckIcon /><span>SUBASCARS aceptó tu propuesta de <b>US$ 13,500</b></span></ChatNotice>`;

const LIST = { display: "flex", flexDirection: "column", width: 400, padding: 10, background: "#f7f6fb", borderRadius: 8 } as const;
const lock = <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden><rect x="4" y="9" width="12" height="8" rx="2" fill="currentColor" /><path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" /></svg>;
const check = <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden><path d="m5 10 3.1 3.1L15.5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function ChatNoticeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ChatNotice"
      summary="Aviso del sistema dentro del SubasChat: nube centrada color crema, como el aviso de WhatsApp al activar los mensajes temporales. En verde cuando registra que se aceptó la propuesta."
      note={<>Viene de mi-garaje-lab (chat del panel de negociación, al abrirse tras pagar el fee). El ícono y el texto van como hijos.</>}
      hero={{ node: <div style={LIST}><ChatNotice>{lock}<span><b>Se cobró tu fee de habilitación de tu consignación (&gt;S&lt;&nbsp;50).</b> Coordinen aquí la visita y el pago hasta el 19/02/2027.</span></ChatNotice></div>,
        code: `<ChatNotice>{candado}<span><b>Se cobró tu fee de habilitación de tu consignación (>S< 50).</b> Coordinen aquí la visita y el pago hasta el 19/02/2027.</span></ChatNotice>`, minHeight: 140 }}
      installName="chatnotice"
      usage={USAGE}
      examples={[
        { title: "Propuesta aceptada", description: "tone=\"done\": cierra el historial de la negociación antes del chat.",
          node: <div style={LIST}><ChatNotice tone="done">{check}<span>SUBASCARS aceptó tu propuesta de <b>US$ 13,500</b></span></ChatNotice></div>,
          code: `<ChatNotice tone="done">{check}<span>SUBASCARS aceptó tu propuesta de <b>US$ 13,500</b></span></ChatNotice>` },
      ]}
      api={[
        { name: "children", type: "ReactNode", description: "Ícono (svg de 14) y texto del aviso." },
        { name: "tone", type: '"done"', description: "Aviso verde de propuesta aceptada. Sin tono: aviso crema del sistema." },
      ]}
      files={["src/components/ChatNotice.tsx"]}
    />
  );
}
