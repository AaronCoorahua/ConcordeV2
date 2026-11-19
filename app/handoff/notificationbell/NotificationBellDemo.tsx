"use client";

import { useState } from "react";
import type { JSX } from "react";
import { NotificationBell } from "@/src/components/NotificationBell";

/** La campana sobre el violeta del header de VMC, con una novedad sin leer (como llega en Mi Garaje). */
export default function NotificationBellDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  return <div style={{ display: "grid", placeItems: "center", width: 120, height: 72, borderRadius: 12, background: "#2E0F70" }}>
    <NotificationBell count={1} expanded={open} onClick={() => setOpen((x) => !x)} arrival={1} />
  </div>;
}
