/**
 * /handoff/amountcomposer — Documentación de AmountComposer (campo de contrapropuesta en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import AmountComposerDemo from "./AmountComposerDemo";

const USAGE = `import { AmountComposer } from "@/src/components/AmountComposer";

<AmountComposer value={monto} onChange={setMonto} canSend={monto > 0 && monto < pide}
  onSubmit={enviar} placeholder="Escribe tu propuesta" label="Tu propuesta en US$"
  suggestions={[{ label: "Punto medio", amount: 13100 }]} />`;

export default function AmountComposerHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="AmountComposer"
      summary="Campo para escribir una contrapropuesta: píldoras con montos sugeridos y, debajo, «US$» + el monto con separador de miles y el botón redondo de enviar. Solo deja enviar cuando el monto es válido."
      note={<>Viene de mi-garaje-lab (pie del panel de negociación, al tocar «Contraproponer»). Devuelve dos hermanos (sugerencias y formulario) para que el contenedor los separe con su gap; el aviso de error, los términos y «Cancelar» son del bloque.</>}
      hero={{ node: <AmountComposerDemo />, code: `<AmountComposer value={monto} onChange={setMonto} canSend={monto > 0 && monto < 13500} onSubmit={enviar}
  placeholder="Escribe tu propuesta" label="Tu propuesta en US$" suggestions={[{ label: "Punto medio", amount: 13100 }]} />`, minHeight: 160 }}
      installName="amountcomposer"
      usage={USAGE}
      api={[
        { name: "value", type: "number", description: "Monto escrito, en dólares (0 = vacío)." },
        { name: "onChange", type: "(amount: number) => void", description: "Cambia el monto (al escribir o al tocar una sugerencia)." },
        { name: "onSubmit", type: "() => void", description: "Enviar el monto. Solo se llama si canSend." },
        { name: "canSend", type: "boolean", description: "El monto es válido: habilita enviar." },
        { name: "placeholder", type: "string", description: "Texto del campo vacío." },
        { name: "label", type: "string", description: "Nombre accesible del campo." },
        { name: "suggestions", type: "{ label: string; amount: number }[]", default: "[]", description: "Montos sugeridos sobre el campo." },
      ]}
      files={["src/components/AmountComposer.tsx"]}
    />
  );
}
