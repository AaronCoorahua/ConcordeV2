/**
 * /handoff/chatday — Documentación de ChatDay (separador de día del SubasChat de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ChatDay } from "@/src/components/ChatDay";

const USAGE = `import { ChatDay } from "@/src/components/ChatDay";

// Dentro de la lista del chat (columna flex): se centra sola.
<ChatDay label="Hoy" />`;

const LIST = { display: "flex", flexDirection: "column", width: 311, padding: 10, background: "#f7f6fb", borderRadius: 8 } as const;

export default function ChatDayHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ChatDay"
      summary="Separador de día entre los mensajes del SubasChat: una píldora gris centrada."
      note={<>Viene de mi-garaje-lab (/m/oferta y el chat del panel de negociación). Se centra con align-self, así que va dentro de una lista en columna flex.</>}
      hero={{ node: <div style={LIST}><ChatDay label="Hoy" /></div>, code: `<ChatDay label="Hoy" />`, minHeight: 120 }}
      installName="chatday"
      usage={USAGE}
      api={[{ name: "label", type: "string", description: "Día que separa (p. ej. «Hoy»)." }]}
      files={["src/components/ChatDay.tsx"]}
    />
  );
}
