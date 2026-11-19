/**
 * /handoff/stagetabs — Documentación de StageTabs (etapas de Mis participaciones en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import StageTabsDemo from "./StageTabsDemo";

const USAGE = `import { StageTabs } from "@/src/components/StageTabs";

const [etapa, setEtapa] = useState(0);
<StageTabs labels={["Consignadas", "Ganadas", "Proceso de compra", "Rechazadas"]} counts={[1, 0, 0, 0]}
  value={etapa} onChange={setEtapa} ariaLabel="Etapa de tus participaciones" />`;

export default function StageTabsHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="StageTabs"
      summary="Pestañas de carpeta para las etapas de Mis participaciones, con el número de novedades sin abrir entre paréntesis. La tarjeta blanca de la elegida se desliza al cambiar."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, Mis participaciones). Usa las clases de TabSelector con la forma de carpeta de FolderTabs, y framer-motion para el fondo de la elegida.</>}
      hero={{
        node: <StageTabsDemo />,
        code: `<StageTabs labels={["Consignadas", "Ganadas", "Proceso de compra", "Rechazadas"]} counts={[1, 0, 0, 0]}
  value={etapa} onChange={setEtapa} ariaLabel="Etapa de tus participaciones" />`,
        minHeight: 160,
      }}
      installName="stagetabs"
      usage={USAGE}
      api={[
        { name: "labels", type: "string[]", description: "Nombres de las etapas, en el orden en que se muestran." },
        { name: "counts", type: "number[]", description: "Novedades sin abrir por etapa (mismo orden que labels). Con 0 la pestaña va sin número y en peso normal." },
        { name: "value", type: "number", description: "Índice de la etapa elegida." },
        { name: "onChange", type: "(index: number) => void", description: "Se llama con el índice de la etapa tocada." },
        { name: "ariaLabel", type: "string", default: `"Etapas"`, description: "Nombre accesible del grupo de pestañas." },
        { name: "layoutId", type: "string", description: "layoutId de framer-motion para el fondo de la elegida (por defecto, uno propio)." },
      ]}
      files={["src/components/StageTabs.tsx", "src/components/FolderTabs.tsx", "src/components/TabSelector.tsx"]}
    />
  );
}
