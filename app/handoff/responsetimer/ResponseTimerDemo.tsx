"use client";

import { useEffect, useState } from "react";
import type { JSX } from "react";
import { ResponseTimer } from "@/src/components/ResponseTimer";

/** Demo: el vencimiento se calcula ya en el navegador (en el servidor la hora no coincidiría al hidratar). */
export default function ResponseTimerDemo({ hours, minutes, urgent, pre, post }: { hours: number; minutes: number; urgent?: boolean; pre?: string; post?: string }): JSX.Element | null {
  const [to, setTo] = useState(0);
  useEffect(() => { const t = setTimeout(() => setTo(Date.now() + (hours * 60 + minutes) * 60_000), 0); return () => clearTimeout(t); }, [hours, minutes]);
  return to ? <ResponseTimer to={to} urgent={urgent} pre={pre} post={post} /> : null;
}
