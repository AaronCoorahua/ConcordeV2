"use client";

import { useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import { ProposalNotice, type ProposalNoticeKind } from "@/src/components/ProposalNotice";

/** Demo: el botón abre el aviso; la consignación es la de ejemplo del bloque (>S< 50 ó US$ 180). */
export default function ProposalNoticeDemo({ kind, label }: { kind: ProposalNoticeKind; label: string }): JSX.Element {
  const [open, setOpen] = useState(false);
  return <>
    <Button type="button" variant="secondary" onClick={() => setOpen(true)}>{label}</Button>
    <ProposalNotice kind={kind} open={open} deposit={{ sc: 50, usd: 180 }} onClose={() => setOpen(false)} />
  </>;
}
