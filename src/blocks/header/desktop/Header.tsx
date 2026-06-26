/**
 * Header — Bloque de Concorde (Voyager DS)
 *
 * Barra superior 798 × 64 con fondo vault (#2E0F70). A la derecha lleva el
 * Button «Ingresa» (variante sm-guest, con UserIcon), a 16px del borde y
 * centrado verticalmente — igual que el export de Figma (1312:4674).
 */

"use client";

import type { JSX } from "react";
import Button, { UserIcon } from "../../../components/Button";
import { HEADER_WIDTH, HEADER_HEIGHT } from "./dimensions";

export interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps): JSX.Element {
  return (
    <header
      className={className}
      data-block="header"
      style={{
        width: HEADER_WIDTH,
        height: HEADER_HEIGHT,
        background: "#2E0F70",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 16px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <Button variant="sm-guest" icon={<UserIcon />}>
        Ingresa
      </Button>
    </header>
  );
}
