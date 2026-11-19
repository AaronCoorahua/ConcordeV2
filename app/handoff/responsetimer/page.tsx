/**
 * /handoff/responsetimer — Documentación de ResponseTimer (plazo para responder una propuesta en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ResponseTimerDemo from "./ResponseTimerDemo";

const USAGE = `import { ResponseTimer } from "@/src/components/ResponseTimer";

// to: vencimiento en ms (24 h desde la última propuesta)
<ResponseTimer to={vence} urgent pre="Tienes" post=" para responder" />`;

export default function ResponseTimerHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ResponseTimer"
      summary="Plazo para responder una propuesta, con el segundero corriendo en cifras mono. En magenta cuando te toca responder; en gris cuando esperas a la otra parte."
      note={<>Viene de mi-garaje-lab (pie del panel de negociación). Toda propuesta vence a las 24 h (T&amp;C IV.6.2.f).</>}
      hero={{ node: <ResponseTimerDemo hours={23} minutes={47} urgent pre="Tienes" post=" para responder" />, code: `<ResponseTimer to={vence} urgent pre="Tienes" post=" para responder" />`, minHeight: 100 }}
      installName="responsetimer"
      usage={USAGE}
      examples={[
        { title: "Esperando a la otra parte", description: "Propuesta enviada: el plazo es del vendedor.",
          node: <ResponseTimerDemo hours={23} minutes={59} pre="Esperando al vendedor" />, code: `<ResponseTimer to={vence} pre="Esperando al vendedor" />` },
      ]}
      api={[
        { name: "to", type: "number", description: "Momento en que vence, en ms." },
        { name: "urgent", type: "boolean", default: "false", description: "Te toca responder a ti: magenta." },
        { name: "pre", type: "string", default: '"Vence en"', description: "Texto antes de la cifra." },
        { name: "post", type: "string", default: '""', description: "Texto después de la cifra." },
      ]}
      files={["src/components/ResponseTimer.tsx"]}
    />
  );
}
