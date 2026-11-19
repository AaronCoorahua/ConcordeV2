/**
 * /handoff/actionlist — Documentación de ActionList (acciones de una fila de Mis publicaciones en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ActionListDemo from "./ActionListDemo";

const USAGE = `import { ActionList } from "@/src/components/ActionList";

{abierto ? <ActionList id="acciones-su6" label="Acciones: Toyota Etios 2020"
  items={[{ label: "Dar de baja", icon: "trash", danger: true }]} onPick={elegir} onClose={cerrar} /> : null}`;

export default function ActionListHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ActionList"
      summary="Acciones de una fila, abiertas desde MoreButton: tarjeta blanca dentro de la misma fila, a todo el ancho, con un renglón por acción (ícono, texto y flecha). «Dar de baja» va en rojo con el tacho."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc · Mis publicaciones). Una acción sin ícono va como ProfileButton («Ver detalle de la venta», en las vendidas). Esc la cierra. El ejemplo va en el ancho de la fila (411 px).</>}
      hero={{ node: <ActionListDemo />, minHeight: 140,
        code: `<ActionList id="acciones-su6" label="Acciones: Toyota Etios 2020" items={[{ label: "Dar de baja", icon: "trash", danger: true }]} onPick={elegir} onClose={cerrar} />` }}
      installName="actionlist"
      usage={USAGE}
      examples={[
        { title: "Vendida", description: "En una publicación vendida el ⋯ abre «Ver detalle de la venta».", minHeight: 140,
          node: <ActionListDemo sold />, code: `<ActionList id="acciones-su10" label="Acciones: Kia Picanto 2021" items={[{ label: "Ver detalle de la venta" }]} onPick={elegir} onClose={cerrar} />` },
      ]}
      api={[
        { name: "id", type: "string", description: "id de la lista (aria-controls de MoreButton)." },
        { name: "label", type: "string", description: "Nombre accesible." },
        { name: "items", type: "ActionListItem[]", description: "{ label, icon?: trash, danger? }. Sin ícono, la acción va como ProfileButton." },
        { name: "onPick", type: "(index: number) => void", description: "Al elegir una acción." },
        { name: "onClose", type: "() => void", description: "Esc dentro de la lista." },
      ]}
      files={["src/components/ActionList.tsx"]}
    />
  );
}
