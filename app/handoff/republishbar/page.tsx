/**
 * /handoff/republishbar — Documentación de RepublishBar (Republicar y dar de baja en Mis publicaciones de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import RepublishBarDemo from "./RepublishBarDemo";

const USAGE = `import { RepublishBar } from "@/src/components/RepublishBar";

<RepublishBar name="Suzuki Swift 2020" days={7} onRepublish={abrirRepublicar} onDrop={abrirDarDeBaja} />`;

export default function RepublishBarHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="RepublishBar"
      summary="Siguiente paso de una publicación sin venta: la franja «Republicar · Gratis, por 7 días →» (toda la franja es el botón) y, a su derecha, el tacho rojo para dar de baja."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc · Mis publicaciones: filas Desierta y No concretada, bajo el texto). En Mi Garaje la franja abre RepublishModal y el tacho, DropModal. Al pasar, la flecha avanza y el ícono gira. El ejemplo va en su ancho de la pantalla (351 px).</>}
      hero={{ node: <RepublishBarDemo />, code: `<RepublishBar name="Suzuki Swift 2020" days={7} onRepublish={abrirRepublicar} onDrop={abrirDarDeBaja} />`, minHeight: 140 }}
      installName="republishbar"
      usage={USAGE}
      api={[
        { name: "name", type: "string", description: "Vehículo de la fila (nombre accesible del tacho)." },
        { name: "days", type: "number", description: "Días que dura la republicación gratis." },
        { name: "onRepublish", type: "() => void", description: "Al tocar la franja." },
        { name: "onDrop", type: "() => void", description: "Al tocar el tacho." },
      ]}
      files={["src/components/RepublishBar.tsx"]}
    />
  );
}
