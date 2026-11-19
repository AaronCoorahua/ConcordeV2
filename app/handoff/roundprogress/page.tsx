/**
 * /handoff/roundprogress — Documentación de RoundProgress (ronda de una negociación en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { RoundProgress } from "@/src/components/RoundProgress";

const USAGE = `import { RoundProgress } from "@/src/components/RoundProgress";

<RoundProgress round={2} total={5} />`;

const BOX = { width: 412 } as const;

export default function RoundProgressHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="RoundProgress"
      summary="En qué ronda va una negociación: «Negociación 2/5» a la izquierda y un punto por ronda a la derecha; las rondas hechas en cian → violeta."
      note={<>Viene de mi-garaje-lab (panel de negociación, bajo «Historial de propuestas»). Una ronda es la propuesta del comprador y la respuesta del vendedor; VMC permite 5.</>}
      hero={{ node: <div style={BOX}><RoundProgress round={2} total={5} /></div>, code: `<RoundProgress round={2} total={5} />`, minHeight: 100 }}
      installName="roundprogress"
      usage={USAGE}
      examples={[
        { title: "Primera propuesta", node: <div style={BOX}><RoundProgress round={1} total={5} /></div>, code: `<RoundProgress round={1} total={5} />` },
        { title: "Última ronda", node: <div style={BOX}><RoundProgress round={5} total={5} /></div>, code: `<RoundProgress round={5} total={5} />` },
        { title: "Vendedor con varios compradores", description: "with nombra al comprador de esta negociación.",
          node: <div style={BOX}><RoundProgress round={1} total={5} with="Comprador 3" /></div>, code: `<RoundProgress round={1} total={5} with="Comprador 3" />` },
      ]}
      api={[
        { name: "round", type: "number", description: "Ronda actual (1…total)." },
        { name: "total", type: "number", description: "Rondas posibles (5 en VMC)." },
        { name: "with", type: "string", description: "Con quién se negocia, si hay varios: «… con Comprador 3»." },
      ]}
      files={["src/components/RoundProgress.tsx"]}
    />
  );
}
