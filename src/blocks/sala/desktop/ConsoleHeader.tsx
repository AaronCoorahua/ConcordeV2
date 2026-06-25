"use client";

/**
 * ConsoleHeader — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "ConsoleHeader" (2934:14478)
 *
 * Barra 991×64 (gradiente morado #5F3ED8→#140046, borde gradiente, sombra).
 * Izquierda: AvatarZone + "Mi C.U.U. ZAEX5G". Derecha: 4 columnas con divisores:
 *   · CONECTADOS  → PriceBadge + número
 *   · OFERTA      → BadgeStatus (live, editable, sin dot)
 *   · FONDOS      → texto
 *   · CONECTIVIDAD→ Signal
 * Compuesta con componentes Concorde.
 */

import type { JSX, ReactNode } from "react";
import AvatarZone from "../../../components/AvatarZone";
import PriceBadge from "../../../components/PriceBadge";
import BadgeStatus from "../../../components/BadgeStatus";
import Signal from "../../../components/Signal";

export const CONSOLEHEADER_WIDTH = 991;
export const CONSOLEHEADER_HEIGHT = 64;

// Dark glass (paint0 + "behind transparent areas" #0A002E): base navy + sheen
// blanco (white 28%→4%) + borde gradiente (white .9 → #F4AC59 .7 → #8460E5 .7 → white .9)
const GLASS_SHEEN = "linear-gradient(127deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.03) 100%)";
const GLASS_BASE = "linear-gradient(160deg, rgba(28,13,82,0.93) 0%, rgba(14,3,56,0.95) 100%)";
const GLASS_BORDER = "linear-gradient(125deg, rgba(255,255,255,0.9) 0%, rgba(244,172,89,0.7) 22%, rgba(132,96,229,0.7) 74.5%, rgba(255,255,255,0.9) 100%)";

export interface ConsoleHeaderProps {
  userLabel?: string;
  user?: string;
  conectados?: string;
  oferta?: string;
  fondos?: string;
  conectividad?: number;
  className?: string;
}

function StatCol({ label, children }: { label: string; children: ReactNode }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "0 18px", minWidth: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ffffff", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 22 }}>{children}</div>
    </div>
  );
}

function Divider(): JSX.Element {
  return <div style={{ width: 1, height: 44, background: "rgba(225,227,226,0.32)", flexShrink: 0 }} />;
}

export default function ConsoleHeader({
  userLabel = "Mi C.U.U.",
  user = "ZAEX5G",
  conectados = "18",
  oferta = "47292",
  fondos = "$100",
  conectividad = 4,
  className = "",
}: ConsoleHeaderProps): JSX.Element {
  return (
    <header
      className={className}
      style={{
        boxSizing: "border-box",
        width: CONSOLEHEADER_WIDTH,
        height: CONSOLEHEADER_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderRadius: 16,
        border: "1.5px solid transparent",
        backgroundImage: `${GLASS_SHEEN}, ${GLASS_BASE}, ${GLASS_BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "rgba(10,0,46,0.6) 0px 12px 36px -4px, inset 0 1px 0 rgba(255,255,255,0.22)",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      {/* Izquierda: avatar + usuario */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <AvatarZone size={32} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, color: "#ffffff", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>{userLabel}</span>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.01em" }}>{user}</span>
        </div>
      </div>

      {/* Derecha: 4 columnas con divisores */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <StatCol label="Conectados">
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <PriceBadge size={20} />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>{conectados}</span>
          </span>
        </StatCol>
        <Divider />
        <StatCol label="Oferta">
          <BadgeStatus variant="live" label={oferta} icon={false} />
        </StatCol>
        <Divider />
        <StatCol label="Fondos">
          <span style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>{fondos}</span>
        </StatCol>
        <Divider />
        <StatCol label="Conectividad">
          <Signal level={conectividad} width={30} />
        </StatCol>
      </div>
    </header>
  );
}
