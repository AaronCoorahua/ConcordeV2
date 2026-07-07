"use client";

/**
 * ProfileCardMobile — cards del bloque «Tu Perfil» · mobile (388 ancho).
 *
 * Card 1 «Tu Perfil» (388×524): título + stats apilados (riesgo · puntos · exp.)
 *   + botón «Canjear Puntos VMC» + Información Personal con 3 inputs apilados.
 * Card 2 «Información de Contacto» (388×247): Teléfono · Correo apilados con «Editar».
 *
 * Reutiliza Input, Button, StarIcon, InfoIcon (los mismos del desktop).
 */

import type { CSSProperties, JSX } from "react";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import StarIcon from "@/src/components/StarIcon";
import InfoIcon from "@/src/components/InfoIcon";

const CARD_BASE: CSSProperties = {
  boxSizing: "border-box",
  width: 388,
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 0 16px 4px rgba(0,0,0,0.08)",
  padding: "16px 20px",
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

// Línea separadora bajo el título (gris #E1E3E2) — sobresale 4px del padding.
const DIVIDER: CSSProperties = { height: 1, background: "#E1E3E2", margin: "14px -16px 0" };

const LABEL: CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#99A1AF" };
const FIELD_LABEL: CSSProperties = { fontSize: 13, fontWeight: 500, color: "#3B1782" };
const EDITAR: CSSProperties = { fontSize: 13, fontWeight: 600, color: "#3B1782", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 };

interface FieldProps {
  label: string;
  defaultValue?: string;
  editable?: boolean;
}

function Field({ label, defaultValue, editable = false }: FieldProps): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={FIELD_LABEL}>{label}</span>
        {editable ? <span style={EDITAR}>Editar</span> : null}
      </div>
      {/* Input a ancho completo de la card */}
      <Input defaultValue={defaultValue} className="pinput-fill" style={{ width: "100%" }} />
    </div>
  );
}

export interface ProfileCardMobileProps {
  className?: string;
}

export default function ProfileCardMobile({ className = "" }: ProfileCardMobileProps): JSX.Element {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Los Input reutilizados traen width fija (234); .pinput-fill los alarga al ancho de la card */}
      <style dangerouslySetInnerHTML={{ __html: ".pinput-fill.pinput-root{width:100%;}" }} />

      {/* ── Card 1: Tu Perfil (388×524) ── */}
      <section data-slot="tu-perfil-card-m" style={CARD_BASE}>
        <h2 style={GRADIENT_TITLE}>Tu Perfil</h2>
        <div style={DIVIDER} />

        {/* Stats — riesgo + puntos en una fila, expiración debajo (centrados) */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 16, textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={LABEL}>Riesgo del perfil</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#ED8936" }}>Muy bajo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={LABEL}>Puntos VMC</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 800, color: "#3B1782", whiteSpace: "nowrap" }}>
              <StarIcon size={18} /> 500 pts <InfoIcon size={14} />
            </span>
          </div>
        </div>

        <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#ED8936" }}>
          <strong>15 Puntos</strong> expirarán en 1 día
        </p>

        {/* Canjear Puntos VMC — centrado */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <Button variant="primary" style={{ height: 40, width: 220, paddingLeft: 16, paddingRight: 16, whiteSpace: "nowrap", fontSize: 14 }}>
            Canjear Puntos VMC
          </Button>
        </div>

        {/* Información Personal — 3 inputs apilados */}
        <h3 style={{ margin: "16px 0 0", fontSize: 14, fontWeight: 700, color: "#3B1782" }}>Información Personal</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          <Field label="Nombres" defaultValue="Subastin" />
          <Field label="Apellidos" defaultValue="Subastin" />
          <Field label="N° documento" defaultValue="11111111" />
        </div>
      </section>

      {/* ── Card 2: Información de Contacto (388×247) ── */}
      <section data-slot="contacto-card-m" style={CARD_BASE}>
        <h2 style={GRADIENT_TITLE}>Información de Contacto</h2>
        <div style={DIVIDER} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          <Field label="Teléfono" defaultValue="11111111" editable />
          <Field label="Correo Electrónico" defaultValue="subastin@subastop.com" editable />
        </div>
      </section>
    </div>
  );
}
