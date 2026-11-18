/**
 * /handoff/riskmeter — Documentación de RiskMeter (riesgo del perfil en Mi Garaje).
 */
import type { JSX } from "react";
import { RiskMeter } from "@/src/components/RiskMeter";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import { RiskMeter } from "@/src/components/RiskMeter";

<RiskMeter level={0} tone="light" />  // Muy bajo, sobre blanco`;

export default function RiskMeterHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="RiskMeter"
      summary="El riesgo del perfil como escala de cinco niveles: Muy bajo, Bajo, Medio, Alto y Muy alto."
      note={<>Viene de mi-garaje-lab (plus-parts). Lo usa la cabecera de cuenta de Mi Garaje.</>}
      hero={{
        node: <div style={{ display: "grid", gap: 16 }}>{[0, 2, 4].map((l) => <RiskMeter key={l} level={l} tone="light" />)}</div>,
        code: `<RiskMeter level={0} tone="light" />\n<RiskMeter level={2} tone="light" />\n<RiskMeter level={4} tone="light" />`, minHeight: 200,
      }}
      installName="riskmeter"
      usage={USAGE}
      examples={[
        { title: "Sobre fondo oscuro", tone: "dark", node: <RiskMeter level={1} />, code: `<RiskMeter level={1} />` },
      ]}
      api={[
        { name: "level", type: "0 | 1 | 2 | 3 | 4", description: "Nivel de riesgo, de Muy bajo a Muy alto." },
        { name: "tone", type: `"dark" | "light"`, default: `"dark"`, description: "dark sobre morado; light sobre blanco." },
      ]}
      files={["src/components/RiskMeter.tsx"]}
    />
  );
}
