"use client";

/**
 * ProfileCard — cards del bloque «Tu Perfil».
 *
 * Card 1 «Tu Perfil» (766×239): título gradiente + fila de stats (riesgo, puntos
 *   VMC, expiración) + botón primary «Canjear Puntos VMC» (200×40) + Información
 *   Personal con 3 inputs (Nombres · Apellidos · N° documento, 228×48 c/u).
 * Card 2 «Información de Contacto» (766×157 hug): 2 columnas (Teléfono · Correo),
 *   cada una con label + «Editar» + input (355×48).
 *
 * Reutiliza los componentes Input, Button, StarIcon, InfoIcon.
 */

import type { CSSProperties, JSX, ReactNode } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import StarIcon from "@/src/components/StarIcon";
import InfoIcon from "@/src/components/InfoIcon";

const CARD_BASE: CSSProperties = {
  boxSizing: "border-box",
  width: 766,
  background: "#ffffff",
  borderRadius: 16,
  // Sombra centrada y sutil (como el resto de cards del proyecto), no lateral/flotante.
  boxShadow: "0 0 16px 4px rgba(0,0,0,0.08)",
  fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
};

// Título con gradiente morado (VYGradientPurple: #5F3ED8 → #340091 → #140046).
const GRADIENT_TITLE: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 800,
  backgroundImage: "linear-gradient(135deg, #5F3ED8 0%, #340091 55%, #140046 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

// Línea separadora bajo el título (gris #E1E3E2). En Figma va de x=32 a x=766
// dentro de un card de 766 con padding 32 → sobresale 16px a cada lado del padding.
const DIVIDER: CSSProperties = { height: 1, background: "#E1E3E2", margin: "14px -16px 0" };

const LABEL: CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#99A1AF" };
const FIELD_LABEL: CSSProperties = { fontSize: 13, fontWeight: 500, color: "#3B1782" };
const EDITAR: CSSProperties = { fontSize: 13, fontWeight: 600, color: "#3B1782", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 };

interface FieldProps {
  label: string;
  width: number;
  defaultValue?: string;
  editable?: boolean;
}

function Field({ label, width, defaultValue, editable = false }: FieldProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={FIELD_LABEL}>{label}</span>
        {editable ? <span style={EDITAR}>Editar</span> : null}
      </div>
      {/* Input a ancho completo de la columna (se alarga hasta el «Editar») */}
      <Input defaultValue={defaultValue} className="pinput-fill" style={{ width: "100%" }} />
    </div>
  );
}

export interface ProfileCardProps {
  className?: string;
}

export default function ProfileCard({ className = "" }: ProfileCardProps): JSX.Element {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Los Input reutilizados traen width fija (234); .pinput-fill los alarga al ancho de su columna */}
      <style dangerouslySetInnerHTML={{ __html: ".pinput-fill.pinput-root{width:100%;}" }} />
      {/* ── Card 1: Tu Perfil (766×239) ── */}
      <section data-slot="tu-perfil-card" style={{ ...CARD_BASE, minHeight: 239, padding: "16px 32px" }}>
        <h2 style={GRADIENT_TITLE}>Tu Perfil</h2>
        <div style={DIVIDER} />

        {/* Fila de stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={LABEL}>Riesgo del perfil</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#ED8936" }}>Muy bajo</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={LABEL}>Puntos VMC</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 800, color: "#3B1782", whiteSpace: "nowrap" }}>
              <StarIcon size={18} /> 500 pts <InfoIcon size={14} />
            </span>
          </div>

          <span style={{ fontSize: 13, fontWeight: 600, color: "#ED8936" }}>
            <strong>15 Puntos</strong> expirarán en 1 día
          </span>

          <div style={{ marginLeft: "auto" }}>
            <Button variant="primary" style={{ height: 40, width: 200, paddingLeft: 16, paddingRight: 16, whiteSpace: "nowrap", fontSize: 13 }}>
              Canjear Puntos VMC
            </Button>
          </div>
        </div>

        {/* Información Personal */}
        <h3 style={{ margin: "16px 0 0", fontSize: 14, fontWeight: 700, color: "#3B1782" }}>Información Personal</h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <Field label="Nombres" width={228} defaultValue="Subastin" />
          <Field label="Apellidos" width={228} defaultValue="Subastin" />
          <Field label="N° documento" width={228} defaultValue="11111111" />
        </div>
      </section>

      {/* ── Card 2: Información de Contacto (766×157) ── */}
      <section data-slot="contacto-card" style={{ ...CARD_BASE, minHeight: 157, padding: "16px 32px" }}>
        <h2 style={GRADIENT_TITLE}>Información de Contacto</h2>
        <div style={DIVIDER} />
        <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
          <Field label="Teléfono" width={339} defaultValue="11111111" editable />
          <Field label="Correo Electrónico" width={339} defaultValue="subastin@subastop.com" editable />
        </div>
      </section>
    </div>
  );
}
