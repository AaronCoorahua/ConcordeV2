/**
 * /handoff/chatheader — Documentación de ChatHeader (cabecera del SubasChat de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ChatHeader } from "@/src/components/ChatHeader";

const USAGE = `import { ChatHeader } from "@/src/components/ChatHeader";

<ChatHeader name="KLM8RT" role="Comprador" dealLabel="Venta" amount="US$ 17,500" />`;

const BOX = { width: 311, borderRadius: 8, overflow: "hidden" } as const;

export default function ChatHeaderHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ChatHeader"
      summary="Cabecera del SubasChat: avatar con las dos primeras letras del código de la contraparte, su código y rol, y el monto acordado a la derecha."
      note={<>Viene de mi-garaje-lab (/m/oferta, donde el chat reemplaza al DetailCard, y el chat del panel de negociación). Fondo vault oscuro, el mismo del header del DetailCard. En el panel de negociación el bloque la pone en blanco con la clase np__chathead.</>}
      hero={{ node: <div style={BOX}><ChatHeader name="KLM8RT" role="Comprador" dealLabel="Venta" amount="US$ 17,500" /></div>, code: `<ChatHeader name="KLM8RT" role="Comprador" dealLabel="Venta" amount="US$ 17,500" />`, minHeight: 140 }}
      installName="chatheader"
      usage={USAGE}
      examples={[
        { title: "Vista del comprador", description: "La contraparte es el vendedor y el monto es una compra.",
          node: <div style={BOX}><ChatHeader name="SUBASCARS" role="Vendedor" dealLabel="Compra" amount="US$ 17,500" /></div>,
          code: `<ChatHeader name="SUBASCARS" role="Vendedor" dealLabel="Compra" amount="US$ 17,500" />` },
      ]}
      api={[
        { name: "name", type: "string", description: "Código de usuario de la contraparte; el avatar usa sus dos primeras letras." },
        { name: "role", type: "string", description: "Rol de la contraparte («Comprador» o «Vendedor»)." },
        { name: "dealLabel", type: "string", description: "Etiqueta del monto («Venta» o «Compra»)." },
        { name: "amount", type: "string", description: "Monto acordado ya formateado." },
        { name: "className", type: "string", description: "Clase extra para el contenedor." },
      ]}
      files={["src/components/ChatHeader.tsx"]}
    />
  );
}
