"use client";

/**
 * Preview — caja de demo en vivo estilo shadcn.
 * El componente se muestra renderizado; el código aparece atenuado debajo con un
 * botón "Ver código" centrado que lo expande (y permite copiarlo).
 * tone="dark" para componentes pensados sobre fondos oscuros (ghost, glass…).
 */

import { useState } from "react";
import type { CSSProperties, JSX, ReactNode } from "react";

interface PreviewProps {
  children: ReactNode;
  /** Snippet a mostrar bajo el preview. Si se omite, no aparece el bloque de código. */
  code?: string;
  tone?: "light" | "dark";
  minHeight?: number;
}

const DARK_BG = "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)";
const CODE_BG = "#fafafa";

const toggleBtn: CSSProperties = {
  pointerEvents: "auto",
  fontSize: 12.5,
  fontWeight: 600,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  color: "#18181b",
  background: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: 8,
  padding: "6px 14px",
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
};

export default function Preview({ children, code, tone = "light", minHeight = 220 }: PreviewProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function toggle(): void {
    setOpen(function flip(prev) { return !prev; });
  }

  function handleCopy(): void {
    if (!code) return;
    void navigator.clipboard.writeText(code).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 1800);
    });
  }

  return (
    <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden", background: "#ffffff" }}>
      {/* Demo en vivo */}
      <div
        style={{
          minHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
          padding: "40px 24px",
          background: tone === "dark" ? DARK_BG : "#ffffff",
          backgroundImage: tone === "dark" ? DARK_BG : "radial-gradient(#e4e4e7 1px, transparent 1px)",
          backgroundSize: tone === "dark" ? undefined : "16px 16px",
        }}
      >
        {children}
      </div>

      {/* Bloque de código (estilo shadcn) */}
      {code ? (
        <div style={{ position: "relative", borderTop: "1px solid #ececee", background: CODE_BG }}>
          {open ? (
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copiar código"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 2,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                padding: "4px 9px",
                borderRadius: 6,
                border: "1px solid #e4e4e7",
                background: "#ffffff",
                color: copied ? "#16a34a" : "#71717a",
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Copiado" : "Copiar"}
            </button>
          ) : null}

          <pre
            style={{
              margin: 0,
              padding: open ? "40px 18px 16px" : "16px 18px",
              overflowX: "auto",
              overflowY: open ? "auto" : "hidden",
              maxHeight: open ? 480 : 88,
              fontSize: 13,
              lineHeight: 1.7,
              color: "#27272a",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <code style={{ whiteSpace: "pre" }}>{code}</code>
          </pre>

          {/* Control: colapsado = overlay atenuado + botón centrado; abierto = botón al pie */}
          {open ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 14px" }}>
              <button type="button" onClick={toggle} style={toggleBtn}>Ocultar código</button>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 88,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.9) 55%, #fafafa 100%)",
                pointerEvents: "none",
              }}
            >
              <button type="button" onClick={toggle} style={toggleBtn}>Ver código</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
