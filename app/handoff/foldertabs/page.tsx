/**
 * /handoff/foldertabs — Documentación de FolderTabs (Compras / En venta en Mis negociaciones de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import FolderTabsDemo from "./FolderTabsDemo";

const USAGE = `import { FolderTabs } from "@/src/components/FolderTabs";

const [lado, setLado] = useState(0);
<FolderTabs options={["Compras", "En venta"]} notificationIndices={[]} value={lado} onChange={setLado}
  aria-label="Compras o vehículos en venta" />`;

export default function FolderTabsHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="FolderTabs"
      summary="Pestañas de carpeta: la elegida es una tarjeta blanca con borde lila unida a la lista de abajo; las demás van en gris sobre una línea."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, Mis negociaciones: Compras y En venta). Es el TabSelector de Concorde con forma de carpeta; StageTabs usa la misma forma. Una pestaña con novedades lleva su número entre paréntesis («En venta (1)») y va en negrita.</>}
      hero={{
        node: <FolderTabsDemo />,
        code: `<FolderTabs options={["Compras", "En venta"]} notificationIndices={[]} value={lado} onChange={setLado}
  aria-label="Compras o vehículos en venta" />`,
        minHeight: 140,
      }}
      installName="foldertabs"
      usage={USAGE}
      api={[
        { name: "options", type: "string[]", description: "Textos de las pestañas, con su número entre paréntesis si lo hay." },
        { name: "value", type: "number", description: "Índice de la pestaña elegida." },
        { name: "onChange", type: "(index: number) => void", description: "Se llama con el índice de la pestaña tocada." },
        { name: "notificationIndices", type: "number[]", description: "Pestañas con novedades sin abrir (van en negrita; las demás en peso normal)." },
        { name: "aria-label", type: "string", description: "Nombre accesible del grupo de pestañas." },
      ]}
      files={["src/components/FolderTabs.tsx", "src/components/TabSelector.tsx"]}
    />
  );
}
