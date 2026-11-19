/**
 * /handoff/notificationbell — Documentación de NotificationBell (campana de novedades del header de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import NotificationBellDemo from "./NotificationBellDemo";

const USAGE = `import { NotificationBell } from "@/src/components/NotificationBell";

<NotificationBell count={sinLeer} expanded={bandejaAbierta} onClick={alternarBandeja} arrival={llegadas} />`;

export default function NotificationBellHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="NotificationBell"
      summary="Campana de vidrio con el número magenta de novedades sin leer. Con cada novedad la campana se mece y el número entra con rebote. Abre la bandeja (NotificationInbox)."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc: header, a la izquierda de «Bienvenido»; también en móvil). 40 px (36 bajo 1024). Dónde va en el header lo decide quien la usa. Usa Vidrio («alertas»). El ejemplo va sobre el violeta del header.</>}
      hero={{ node: <NotificationBellDemo />, code: `<NotificationBell count={1} expanded={false} onClick={alternarBandeja} arrival={1} />`, minHeight: 160 }}
      installName="notificationbell"
      usage={USAGE}
      api={[
        { name: "count", type: "number", description: "Novedades sin leer; con 0 no hay número, con más de 9 dice 9+." },
        { name: "expanded", type: "boolean", description: "La bandeja está abierta (aria-expanded)." },
        { name: "onClick", type: "() => void", description: "Abre o cierra la bandeja." },
        { name: "arrival", type: "number", default: "0", description: "Cambia con cada novedad: la campana se mece y el número entra con rebote." },
      ]}
      files={["src/components/NotificationBell.tsx", "src/components/Vidrio.tsx"]}
    />
  );
}
