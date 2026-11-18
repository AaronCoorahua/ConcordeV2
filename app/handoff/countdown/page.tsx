/**
 * /handoff/countdown — Documentación de Countdown (cuenta regresiva de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import CountdownDemo from "./CountdownDemo";

const USAGE = `import { Countdown } from "@/src/components/Countdown";

// to: momento final en ms
<Countdown to={cierraEn} label="Cierra en" />`;

export default function CountdownHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Countdown"
      summary="Cuenta regresiva en cifras mono que corre en vivo (HH:MM:SS), con una etiqueta encima. Para plazos de negociación, cierre de subastas y pagos pendientes."
      note={<>Viene de mi-garaje-lab (plus-parts). En el servidor muestra --:--:-- y empieza a correr al cargar, sin desajustes de hidratación.</>}
      hero={{ node: <CountdownDemo />, code: `<Countdown to={Date.now() + 75 * 60_000} label="Cierra en" />`, minHeight: 160 }}
      installName="countdown"
      usage={USAGE}
      examples={[
        { title: "Sobre fondo de subasta en vivo", description: "Dentro de un contenedor .cp-live la cifra va en blanco.", tone: "dark",
          node: <div className="cp-live"><CountdownDemo hours={0} minutes={9} label="Termina en" /></div>, code: `<div className="cp-live"><Countdown to={fin} label="Termina en" /></div>` },
      ]}
      api={[
        { name: "to", type: "number", description: "Momento final en ms (timestamp)." },
        { name: "label", type: "string", description: "Etiqueta encima de la cifra." },
      ]}
      files={["src/components/Countdown.tsx"]}
    />
  );
}
