/**
 * /handoff/chatcomposer — Documentación de ChatComposer (caja para escribir del SubasChat de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ChatComposer } from "@/src/components/ChatComposer";
import ChatComposerDemo from "./ChatComposerDemo";

const USAGE = `import { ChatComposer } from "@/src/components/ChatComposer";

<ChatComposer label="Mensaje para KLM8RT" value={texto} onChange={setTexto}
  canSend={!!texto.trim()} onSend={enviar} emojiOpen={emojis} onEmoji={alternarEmojis} onImage={enviarImagen} />`;

export default function ChatComposerHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ChatComposer"
      summary="Caja para escribir del SubasChat: emojis, enviar imagen, campo que crece con el texto (hasta 120 px) y botón de enviar cian → violeta. Enter envía y Shift+Enter hace salto de línea."
      note={<>Viene de mi-garaje-lab (/m/oferta y el chat del panel de negociación). Con disabled queda todo apagado: es el pie del panel mientras el comprador no paga el fee de habilitación.</>}
      hero={{ node: <ChatComposerDemo />, code: `<ChatComposer label="Mensaje para KLM8RT" value={texto} onChange={setTexto} canSend={!!texto.trim()} onSend={enviar} />`, minHeight: 140 }}
      installName="chatcomposer"
      usage={USAGE}
      examples={[
        { title: "Chat aún no habilitado", description: "Propuesta aceptada, esperando el pago del fee.",
          node: <div style={{ width: 311, background: "#fff", borderRadius: 8 }}><ChatComposer disabled label="Mensaje (disponible cuando pagues tu fee)" /></div>,
          code: `<ChatComposer disabled label="Mensaje (disponible cuando pagues tu fee)" />` },
      ]}
      api={[
        { name: "label", type: "string", description: "Nombre accesible del campo." },
        { name: "value", type: "string", description: "Texto escrito. Sin value el campo no se controla." },
        { name: "onChange", type: "(text: string) => void", description: "Cambia el texto." },
        { name: "onSend", type: "() => void", description: "Enviar (botón o Enter)." },
        { name: "canSend", type: "boolean", default: "false", description: "Hay algo que se puede enviar: habilita el botón." },
        { name: "disabled", type: "boolean", default: "false", description: "Apaga emojis, imagen, campo y enviar." },
        { name: "invalid", type: "boolean", description: "El texto no es válido (pasa el límite): borde rojo." },
        { name: "emojiOpen", type: "boolean", description: "El panel de emojis está abierto (marca el botón)." },
        { name: "onEmoji", type: "() => void", description: "Abre o cierra el panel de emojis." },
        { name: "onImage", type: "(file: File) => void", description: "Imagen elegida para enviar." },
        { name: "inputRef", type: "RefObject<HTMLTextAreaElement | null>", description: "Ref del campo, para devolverle el foco." },
      ]}
      files={["src/components/ChatComposer.tsx"]}
    />
  );
}
