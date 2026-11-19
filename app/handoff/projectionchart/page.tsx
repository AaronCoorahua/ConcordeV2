/**
 * /handoff/projectionchart — Documentación de ProjectionChart (proyección de valor del resultado de Valorizar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ProjectionChartDemo from "./ProjectionChartDemo";

const USAGE = `import { ProjectionChart } from "@/src/components/ProjectionChart";

// points: la curva semanal de AVT (projectForward) con sus hitos «Hoy», «1M», «3M», «6M», «12M»
<ProjectionChart market={15010} points={proyeccion} />`;

export default function ProjectionChartHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ProjectionChart"
      summary="Curva de cuánto valdrá el vehículo en los próximos 12 meses: degradado primario de Concorde, eje en miles, hitos Hoy · 1M · 3M · 6M · 12M y el valor final rotulado a la derecha. Con el mouse o ← → aparece el valor de esa semana."
      note={<>Viene de mi-garaje-lab (resultado «Revela» de Valorizar y el análisis de Mis valorizaciones, tarjeta «Proyección de valor»). El SVG se dibuja al ancho real de la tarjeta; bajo 480 px el valor final pasa arriba a la derecha. Ejemplo: el Toyota Corolla 2019 de Valorizar, calculado con el motor AVT del bloque a la fecha de hoy.</>}
      hero={{ node: <ProjectionChartDemo />, code: `<ProjectionChart market={15010} points={proyeccion} />`, minHeight: 300 }}
      installName="projectionchart"
      usage={USAGE}
      api={[
        { name: "market", type: "number", description: "Valor de mercado hoy (punto naranja del inicio y base del % final)." },
        { name: "points", type: "{ v: number; km: number; label: string | null }[]", description: "Puntos semanales; label rotula los hitos (Hoy, 1M, 3M, 6M, 12M)." },
      ]}
      files={["src/components/ProjectionChart.tsx"]}
    />
  );
}
