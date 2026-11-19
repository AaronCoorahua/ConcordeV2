/**
 * /handoff/chatbubble — Documentación de ChatBubble (mensaje del SubasChat de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ChatBubble } from "@/src/components/ChatBubble";

const USAGE = `import { ChatBubble } from "@/src/components/ChatBubble";

<ChatBubble sender="KLM8RT" time="10:31">Hola, gracias por aceptar 🙌 ¿Cuándo podría ver el auto?</ChatBubble>
<ChatBubble mine sender="Tú" time="10:33" status="sent">¡Hola! Puede ser mañana a las 10 am en Miraflores.</ChatBubble>`;

const LIST = { display: "flex", flexDirection: "column", gap: 6, width: 311, boxSizing: "border-box", padding: 10, background: "#f7f6fb", borderRadius: 8 } as const;

export default function ChatBubbleHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ChatBubble"
      summary="Mensaje del SubasChat: blanco para la contraparte y violeta para lo tuyo, con la hora abajo y, en lo tuyo, el estado del envío (◷ enviando, ✓✓ enviado)."
      note={<>Viene de mi-garaje-lab (/m/oferta y el chat del panel de negociación). Los textos son los del chat de ejemplo del bloque (chat.ts). Dentro de una ráfaga (cont / more) se aplanan las esquinas y solo la última lleva la hora.</>}
      hero={{ node: <div style={LIST}>
        <ChatBubble sender="KLM8RT" time="10:31">Hola, gracias por aceptar 🙌 ¿Cuándo podría ver el auto?</ChatBubble>
        <ChatBubble mine sender="Tú" time="10:33" status="sent">¡Hola! Puede ser mañana a las 10 am en Miraflores.</ChatBubble>
        <ChatBubble sender="KLM8RT" time="10:34">Perfecto, ahí estaré. ¿Tiene el SOAT vigente?</ChatBubble>
      </div>, code: `<ChatBubble sender="KLM8RT" time="10:31">Hola, gracias por aceptar 🙌 ¿Cuándo podría ver el auto?</ChatBubble>
<ChatBubble mine sender="Tú" time="10:33" status="sent">¡Hola! Puede ser mañana a las 10 am en Miraflores.</ChatBubble>
<ChatBubble sender="KLM8RT" time="10:34">Perfecto, ahí estaré. ¿Tiene el SOAT vigente?</ChatBubble>`, minHeight: 260 }}
      installName="chatbubble"
      usage={USAGE}
      examples={[
        { title: "Enviando", description: "Recién enviado: el reloj se cambia por ✓✓ al confirmarse.",
          node: <div style={LIST}><ChatBubble mine sender="Tú" time="11:04" status="sending">Hola, ¿mañana a las 10 está bien?</ChatBubble></div>,
          code: `<ChatBubble mine sender="Tú" time="11:04" status="sending">Hola, ¿mañana a las 10 está bien?</ChatBubble>` },
        { title: "Con un enlace", description: "El texto puede llevar nodos; el bloque convierte las URL en enlaces.",
          node: <div style={LIST}><ChatBubble sender="KLM8RT" time="11:04">Te paso el informe de mi mecánico: <a href="https://example.com/informe-nivus">https://example.com/informe-nivus</a></ChatBubble></div>,
          code: `<ChatBubble sender="KLM8RT" time="11:04">Te paso el informe de mi mecánico: <a href={url}>{url}</a></ChatBubble>` },
      ]}
      api={[
        { name: "children", type: "ReactNode", description: "Texto del mensaje." },
        { name: "mine", type: "boolean", default: "false", description: "Mensaje tuyo: a la derecha, violeta." },
        { name: "time", type: "string", description: "Lo que se lee bajo el mensaje (hora o «Tú · 9:10»)." },
        { name: "sender", type: "string", description: "Quién lo envió, solo para lectores de pantalla." },
        { name: "status", type: '"sending" | "sent" | "failed"', description: "Estado del envío de un mensaje tuyo; muestra su ícono junto a la hora." },
        { name: "cont", type: "boolean", default: "false", description: "No es el primero de su ráfaga." },
        { name: "more", type: "boolean", default: "false", description: "No es el último de su ráfaga." },
        { name: "hideTime", type: "boolean", default: "false", description: "Oculta la hora (dentro de una ráfaga)." },
        { name: "image", type: "string", description: "URL de una imagen enviada." },
        { name: "className", type: "string", description: "Clase extra para la fila." },
        { name: "footer", type: "ReactNode", description: "Lo que va debajo de la burbuja (p. ej. «No se pudo enviar · Reintentar»)." },
      ]}
      files={["src/components/ChatBubble.tsx"]}
    />
  );
}
