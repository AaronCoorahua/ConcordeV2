/**
 * /handoff/addbutton — Documentación de AddButton («Valorizar otro vehículo» en Mis valorizaciones de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import AddButtonDemo from "./AddButtonDemo";

const USAGE = `import { AddButton } from "@/src/components/AddButton";

<AddButton onClick={irAValorizar}>Valorizar otro vehículo</AddButton>`;

export default function AddButtonHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="AddButton"
      summary="Acción secundaria «agregar otro» al final de una lista: fila delgada con borde punteado lila y un + en círculo, para que no compita con las tarjetas."
      note={<>Viene de mi-garaje-lab (Mis valorizaciones, debajo de las tarjetas). Ocupa el ancho de su contenedor.</>}
      hero={{ node: <AddButtonDemo />, code: `<AddButton onClick={irAValorizar}>Valorizar otro vehículo</AddButton>`, minHeight: 140 }}
      installName="addbutton"
      usage={USAGE}
      api={[
        { name: "children", type: "string", description: "Texto de la acción." },
        { name: "onClick", type: "() => void", description: "Se llama al tocar la fila." },
      ]}
      files={["src/components/AddButton.tsx"]}
    />
  );
}
