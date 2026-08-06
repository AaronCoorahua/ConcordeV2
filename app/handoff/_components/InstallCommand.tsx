"use client";

/**
 * InstallCommand — comando de instalación (estilo shadcn).
 * Usa el CLI servido desde la rama `cli` del repo público (npx, sin npm ni auth).
 */

import { useState } from "react";
import type { JSX } from "react";

export const CLI_SPEC = "github:AaronCoorahua/ConcordeV2#cli";

interface InstallCommandProps {
  /** Nombre del componente/bloque para `add <name>`. */
  name?: string;
  /** Comando completo a mostrar (sobreescribe a `add <name>`). */
  command?: string;
}

export default function InstallCommand({ name, command }: InstallCommandProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const cmd = command ?? `npx ${CLI_SPEC} add ${name}`;

  function handleCopy(): void {
    void navigator.clipboard.writeText(cmd).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 1800);
    });
  }

  return (
    <div style={{ border: "1px solid var(--ui-border)", borderRadius: 10, overflow: "hidden", background: "var(--ui-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "12px 16px" }}>
        <code style={{ fontSize: 13, color: "#27272a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", overflowX: "auto", whiteSpace: "nowrap" }}>
          <span style={{ color: "var(--ui-muted)" }}>$ </span>{cmd}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar comando"
          style={{
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            padding: "4px 9px",
            borderRadius: 6,
            border: "1px solid var(--ui-border)",
            background: "#ffffff",
            color: copied ? "#16a34a" : "var(--ui-body)",
            cursor: "pointer",
          }}
        >
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
