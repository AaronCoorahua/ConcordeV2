/**
 * /handoff/notificationbox — Documentación de NotificationBox (aviso «Nueva notificación» de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import NotificationBoxDemo from "./NotificationBoxDemo";

const USAGE = `import { NotificationBox } from "@/src/components/NotificationBox";

{llegando ? <NotificationBox key={llegada} photo={foto} title="El vendedor respondió tu propuesta"
  body="Nissan Sentra 2020 · te pide US$ 4,800" time="Ahora" onOpen={abrir} /> : null}`;

export default function NotificationBoxHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="NotificationBox"
      summary="Aviso «Nueva notificación»: entra por la derecha, se sostiene y se recoge hacia la campana en 2,4 s. Tocar la novedad la abre."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc: arriba a la derecha cuando llega una novedad; en móvil, a lo ancho bajo el header). Quien lo usa lo desmonta al terminar la animación y decide su posición (fija).</>}
      hero={{ node: <NotificationBoxDemo />, minHeight: 200,
        code: `<NotificationBox photo={foto} title="El vendedor respondió tu propuesta" body="Nissan Sentra 2020 · te pide US$ 4,800" time="Ahora" onOpen={abrir} />` }}
      installName="notificationbox"
      usage={USAGE}
      api={[
        { name: "photo", type: "string", description: "URL de la foto del vehículo." },
        { name: "title", type: "string", description: "Qué pasó." },
        { name: "body", type: "string", description: "Vehículo y detalle." },
        { name: "time", type: "string", description: "Cuándo llegó, ya escrito." },
        { name: "onOpen", type: "() => void", description: "Al tocar la novedad." },
        { name: "className", type: "string", description: "Clases extra (posición)." },
      ]}
      files={["src/components/NotificationBox.tsx"]}
    />
  );
}
