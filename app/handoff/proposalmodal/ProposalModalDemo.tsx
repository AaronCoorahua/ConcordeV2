"use client";

import { useState } from "react";
import type { JSX, MouseEvent } from "react";
import Button from "@/src/components/Button";
import { ProposalModal } from "@/src/components/ProposalModal";

/** Demo con la oferta de ejemplo del bloque (Nissan Sentra 2020, consignación >S< 50). «Ir a Mi Garaje» solo cierra. */
export default function ProposalModalDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const start = (e: MouseEvent<HTMLButtonElement>) => { const r = e.currentTarget.getBoundingClientRect(); setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); setOpen(true); };
  return <>
    <Button type="button" variant="negotiable" onClick={start}>¡Vamos a negociar!</Button>
    <ProposalModal open={open} vehicle="Nissan Sentra 2020" deposit={50} origin={origin} onCancel={() => setOpen(false)} onSend={() => setOpen(false)} onGo={() => setOpen(false)} />
  </>;
}
