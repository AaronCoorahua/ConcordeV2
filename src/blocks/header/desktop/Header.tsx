/**
 * Header — Bloque de Concorde (Voyager DS)
 *
 * Barra superior 798 × 64 con fondo vault (#2E0F70). A la derecha lleva el
 * Button «Ingresa» (variante sm-guest, con UserIcon), a 16px del borde y
 * centrado verticalmente — igual que el export de Figma (1312:4674).
 */

"use client";

import type { JSX, ReactNode } from "react";
import Button, { UserIcon } from "../../../components/Button";
import { HEADER_WIDTH, HEADER_HEIGHT } from "./dimensions";

export interface HeaderProps {
  /** Ancho de la barra. Por defecto HEADER_WIDTH (798, desktop); 420 en mobile. */
  width?: number | string;
  /** Logo a la izquierda (slot). En desktop no se usa (el logo va en el Sidebar);
   *  en mobile se pasa el logo de la marca. */
  logo?: ReactNode;
  className?: string;
}

export default function Header({ width = HEADER_WIDTH, logo, className = "" }: HeaderProps): JSX.Element {
  return (
    <header
      className={className}
      data-block="header"
      style={{
        width,
        height: HEADER_HEIGHT,
        background: "#2E0F70",
        display: "flex",
        alignItems: "center",
        justifyContent: logo ? "space-between" : "flex-end",
        padding: "0 16px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {logo}
      <Button variant="sm-guest" icon={<UserIcon />}>
        Ingresa
      </Button>
    </header>
  );
}
