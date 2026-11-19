"use client";

import { useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import { RepublishModal } from "@/src/components/RepublishModal";

/** Demo: el botón monta el modal (se abre solo con showModal); confirmar o cerrar lo desmonta. */
export default function RepublishModalDemo({ name = "Suzuki Swift 2020", days }: { name?: string; days?: number }): JSX.Element {
  const [open, setOpen] = useState(false);
  return <>
    <Button type="button" variant="secondary" onClick={() => setOpen(true)}>Republicar</Button>
    {open ? <RepublishModal name={name} days={days} onConfirm={() => setOpen(false)} onClose={() => setOpen(false)} /> : null}
  </>;
}
