/**
 * /handoff/morebutton — Documentación de MoreButton (⋯ de las filas de Mis publicaciones en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import MoreButtonDemo from "./MoreButtonDemo";

const USAGE = `import { MoreButton } from "@/src/components/MoreButton";

<MoreButton label="Más acciones: Toyota Etios 2020" expanded={abierto} controls="acciones-su6" onClick={alternar} />`;

export default function MoreButtonHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="MoreButton"
      summary="Botón redondo «⋯» de más acciones: morado y sin fondo; al pasar o con la lista abierta toma un círculo lila. Abre ActionList."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc · Mis publicaciones: filas Publicada y Vendido, arriba a la derecha). 32 px.</>}
      hero={{ node: <MoreButtonDemo />, code: `<MoreButton label="Más acciones: Toyota Etios 2020" expanded={abierto} controls="acciones-su6" onClick={alternar} />`, minHeight: 140 }}
      installName="morebutton"
      usage={USAGE}
      api={[
        { name: "label", type: "string", description: "Nombre accesible." },
        { name: "expanded", type: "boolean", description: "La lista de acciones está abierta." },
        { name: "controls", type: "string", description: "id de la lista que abre." },
        { name: "onClick", type: "() => void", description: "Al tocarlo." },
      ]}
      files={["src/components/MoreButton.tsx"]}
    />
  );
}
