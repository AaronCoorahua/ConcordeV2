"use client";

import { useState } from "react";
import type { JSX } from "react";
import { NotificationInbox } from "@/src/components/NotificationInbox";

/** La bandeja con la novedad de Mi Garaje: sin leer hasta que se toca o se marca todo como leído. */
export default function NotificationInboxDemo({ read = false }: { read?: boolean }): JSX.Element {
  const [unread, setUnread] = useState(!read);
  return <NotificationInbox allHref="#" onOpen={() => setUnread(false)} onReadAll={() => setUnread(false)}
    items={[{ id: 1, photo: "/mi-garaje/garage-photos/sentra/1.jpg", title: "El vendedor respondió tu propuesta", body: "Nissan Sentra 2020 · te pide US$ 4,800", time: "Ahora", unread }]} />;
}
