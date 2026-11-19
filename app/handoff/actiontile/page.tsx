/**
 * /handoff/actiontile — Documentación de ActionTile (Publica / Valoriza del riel de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ActionTileDemo from "./ActionTileDemo";

const USAGE = `import { ActionTile } from "@/src/components/ActionTile";

<ActionTile tone="publish" title="Publica tu Vehículo" hint="¡Un solo pago hasta que lo vendas!" onClick={irAPublicar} />
<ActionTile tone="value" title="Valoriza tu vehículo" hint="Obtén una tasación en minutos" onClick={irAValorizar} />`;

export default function ActionTileHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ActionTile"
      summary="Acceso grande: ícono en círculo, título, una línea de ayuda y la flecha. «publish» es naranja (la acción principal de la página); «value» es blanca con borde. Al pasar el mouse el borde se ilumina."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, arriba de Mi billetera). Bajo 830 px el ícono y la flecha van arriba y el texto debajo. El ejemplo va en el ancho del riel (300 px) y con la base de la página (Plus Jakarta Sans y alto de línea normal).</>}
      hero={{ node: <ActionTileDemo />, minHeight: 220,
        code: `<ActionTile tone="publish" title="Publica tu Vehículo" hint="¡Un solo pago hasta que lo vendas!" onClick={irAPublicar} />
<ActionTile tone="value" title="Valoriza tu vehículo" hint="Obtén una tasación en minutos" onClick={irAValorizar} />` }}
      installName="actiontile"
      usage={USAGE}
      api={[
        { name: "tone", type: `"publish" | "value"`, description: "publish: naranja con ícono +; value: blanca con ícono de velocímetro." },
        { name: "title", type: "string", description: "Título." },
        { name: "hint", type: "string", description: "Línea de ayuda." },
        { name: "onClick", type: "() => void", description: "Al tocarla." },
      ]}
      files={["src/components/ActionTile.tsx"]}
    />
  );
}
