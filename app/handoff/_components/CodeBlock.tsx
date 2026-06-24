"use client";

/**
 * CodeBlock — bloque de código limpio (tema claro, estilo shadcn).
 * Mono, scrollable, con botón copiar discreto arriba a la derecha.
 */

import { useState } from "react";
import type { JSX } from "react";

interface CodeBlockProps {
  code: string;
  /** Etiqueta opcional (ej. nombre de archivo) en la barra superior. */
  filename?: string;
  maxHeight?: number;
}

export default function CodeBlock({ code, filename, maxHeight }: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    void navigator.clipboard.writeText(code).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 1800);
    });
  }

  return (
    <div style={{ position: "relative", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", overflow: "hidden" }}>
      {filename ? (
        <div style={{ display: "flex", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid #ececee", background: "#f4f4f5" }}>
          <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#52525b" }}>{filename}</span>
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar código"
        style={{
          position: "absolute",
          top: filename ? 44 : 10,
          right: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          padding: "4px 9px",
          borderRadius: 6,
          border: "1px solid #e4e4e7",
          background: "#ffffff",
          color: copied ? "#16a34a" : "#71717a",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        {copied ? "✓ Copiado" : "Copiar"}
      </button>
      <pre
        style={{
          margin: 0,
          padding: "16px 18px",
          overflowX: "auto",
          maxHeight: maxHeight ?? undefined,
          fontSize: 13,
          lineHeight: 1.7,
          color: "#27272a",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <code style={{ whiteSpace: "pre" }}>{code}</code>
      </pre>
    </div>
  );
}
