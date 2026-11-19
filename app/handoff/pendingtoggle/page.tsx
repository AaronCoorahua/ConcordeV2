/**
 * /handoff/pendingtoggle — Documentación de PendingToggle (interruptor «Pendientes» de Tu actividad en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import PendingToggleDemo from "./PendingToggleDemo";

const USAGE = `import { PendingToggle } from "@/src/components/PendingToggle";

const [solo, setSolo] = useState(false);
<PendingToggle count={sinAbrir} checked={solo} onToggle={() => setSolo((x) => !x)} />`;

export default function PendingToggleHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="PendingToggle"
      summary="Interruptor «Pendientes» con el número de novedades sin abrir. Prendido, Tu actividad deja a la vista solo lo pendiente."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, encabezado de Tu actividad). Riel gris que pasa a naranja; desde 1024 px el texto va en negro y peso regular. El ejemplo hereda la base de la página (Plus Jakarta Sans y alto de línea normal), como en la pantalla.</>}
      hero={{ node: <PendingToggleDemo />, code: `<PendingToggle count={1} checked={false} onToggle={alternar} />`, minHeight: 140 }}
      installName="pendingtoggle"
      usage={USAGE}
      examples={[
        { title: "Prendido", description: "Al tocarlo: el riel pasa a naranja y la lista muestra solo lo que está sin abrir.", node: <PendingToggleDemo on />, code: `<PendingToggle count={1} checked onToggle={alternar} />` },
      ]}
      api={[
        { name: "count", type: "number", description: "Novedades sin abrir (va en la píldora violeta)." },
        { name: "checked", type: "boolean", description: "Prendido: solo lo pendiente." },
        { name: "onToggle", type: "() => void", description: "Al tocarlo." },
      ]}
      files={["src/components/PendingToggle.tsx"]}
    />
  );
}
