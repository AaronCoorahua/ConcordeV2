"use client";

import { useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import { DropModal } from "@/src/components/DropModal";

/** Demo: el botón monta el modal (se abre solo con showModal); dar de baja, republicar o cerrar lo desmonta. */
export default function DropModalDemo({ name = "Suzuki Swift 2020", republish = true }: { name?: string; republish?: boolean }): JSX.Element {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <>
    <Button type="button" variant="secondary" onClick={() => setOpen(true)}>Dar de baja</Button>
    {open ? <DropModal name={name} onRepublish={republish ? close : undefined} onConfirm={close} onClose={close} /> : null}
  </>;
}
