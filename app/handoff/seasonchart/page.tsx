/**
 * /handoff/seasonchart — Documentación de SeasonChart (momento óptimo de venta del resultado de Valorizar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import SeasonChartDemo from "./SeasonChartDemo";

const USAGE = `import { SeasonChart } from "@/src/components/SeasonChart";

// months: los 12 meses con su demanda frente al promedio (%); now: mes actual (1–12)
<SeasonChart months={meses} now={11} />`;

export default function SeasonChartHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="SeasonChart"
      summary="Demanda del mercado mes a mes en barras divergentes: arriba más demanda que el promedio (lila, las de más de 10 % en violeta), abajo menos (naranja). El mes actual lleva halo, borde blanco y su % rotulado."
      note={<>Viene de mi-garaje-lab (resultado «Revela» de Valorizar y el análisis de Mis valorizaciones, tarjeta «Momento óptimo de venta»). Cada barra se puede enfocar o señalar para ver el mes y su %. Ejemplo: la tabla de AVT que usa el bloque.</>}
      hero={{ node: <SeasonChartDemo />, code: `<SeasonChart months={meses} now={mesActual} />`, minHeight: 260 }}
      installName="seasonchart"
      usage={USAGE}
      api={[
        { name: "months", type: "{ m: number; f: number; name: string }[]", description: "Los 12 meses: número, demanda en % y nombre (el eje muestra 3 letras)." },
        { name: "now", type: "number", description: "Mes actual (1–12), resaltado y rotulado." },
      ]}
      files={["src/components/SeasonChart.tsx", "src/components/ProjectionChart.tsx"]}
    />
  );
}
