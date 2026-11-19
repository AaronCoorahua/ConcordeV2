/**
 * /handoff/stepper — Documentación de Stepper (pasos del recorrido Publicar / Valorizar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import StepperDemo from "./StepperDemo";

const PUBLICAR = ["Vehículo", "Detalles", "Valor", "Información", "Vista previa"];
const VALORIZAR = ["Vehículo", "Detalles", "Resultado"];

const USAGE = `import { Stepper } from "@/src/components/Stepper";

// Los pasos hechos son botones para volver
<Stepper steps={["Vehículo", "Detalles", "Resultado"]} current={paso} onGo={setPaso} />`;

export default function StepperHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Stepper"
      summary="Pasos de un recorrido: nombres arriba, ProgressBar partida en un tramo por paso (el actual a la mitad) y los pasos hechos con check para volver a ellos."
      note={<>Viene de mi-garaje-lab (Flujo Publicar / Valorizar). En pantallas de 767 px o menos muestra solo el paso actual con «paso N de M». Usa ProgressBar y CheckIcon de Concorde.</>}
      hero={{ node: <StepperDemo steps={PUBLICAR} start={2} />, code: `<Stepper steps={["Vehículo", "Detalles", "Valor", "Información", "Vista previa"]} current={2} onGo={setPaso} />`, minHeight: 200 }}
      installName="stepper"
      usage={USAGE}
      examples={[
        { title: "3 pasos (Valorizar)", description: "Tres tramos; el paso hecho se puede tocar para volver.",
          node: <StepperDemo steps={VALORIZAR} start={1} />, code: `<Stepper steps={["Vehículo", "Detalles", "Resultado"]} current={1} onGo={setPaso} />` },
      ]}
      api={[
        { name: "steps", type: "string[]", description: "Nombres de los pasos, en orden." },
        { name: "current", type: "number", description: "Paso actual, desde 0." },
        { name: "onGo", type: "(step: number) => void", description: "Se llama con el índice del paso hecho que se toca, para volver a él." },
      ]}
      files={["src/components/Stepper.tsx"]}
    />
  );
}
