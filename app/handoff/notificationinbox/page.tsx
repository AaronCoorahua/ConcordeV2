/**
 * /handoff/notificationinbox — Documentación de NotificationInbox (bandeja de notificaciones de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import NotificationInboxDemo from "./NotificationInboxDemo";

const USAGE = `import { NotificationInbox } from "@/src/components/NotificationInbox";

<NotificationInbox allHref="/mi-garaje" onOpen={abrir} onReadAll={marcarTodo}
  items={[{ id: 1, photo, title: "El vendedor respondió tu propuesta", body: "Nissan Sentra 2020 · te pide US$ 4,800", time: "Ahora", unread: true }]} />`;

export default function NotificationInboxHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="NotificationInbox"
      summary="Bandeja de notificaciones: «Notificaciones» y «Marcar todo como leído» arriba, una fila por novedad (foto, título, detalle y cuándo; punto magenta si está sin leer) y «Ver todo en Mi Garaje» al pie."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc: se abre con NotificationBell, bajo el header). 380 px de ancho. Dónde se abre lo decide quien la usa.</>}
      hero={{ node: <NotificationInboxDemo />, minHeight: 280,
        code: `<NotificationInbox allHref="#" onOpen={abrir} onReadAll={marcarTodo}
  items={[{ id: 1, photo, title: "El vendedor respondió tu propuesta", body: "Nissan Sentra 2020 · te pide US$ 4,800", time: "Ahora", unread: true }]} />` }}
      installName="notificationinbox"
      usage={USAGE}
      examples={[
        { title: "Leída", description: "Después de tocarla (o de «Marcar todo como leído»): sin punto ni negrita, y sin «Marcar todo como leído».", minHeight: 260,
          node: <NotificationInboxDemo read />, code: `items={[{ …, unread: false }]}` },
      ]}
      api={[
        { name: "items", type: "NotificationInboxItem[]", description: "{ id, photo, title, body, time, unread }, de la más reciente a la más antigua." },
        { name: "onOpen", type: "(index: number) => void", description: "Al tocar una novedad." },
        { name: "onReadAll", type: "() => void", description: "«Marcar todo como leído» (solo con alguna sin leer)." },
        { name: "allHref", type: "string", description: "Destino de «Ver todo en Mi Garaje»." },
        { name: "className", type: "string", description: "Clases extra (posición dentro del header)." },
      ]}
      files={["src/components/NotificationInbox.tsx"]}
    />
  );
}
