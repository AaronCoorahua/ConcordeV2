"use client";

/**
 * CodeViewer — bloque de código completo del componente, listo para copiar tal cual.
 * El developer abre /handoff/{componente} y copia el .tsx exacto (visual de Figma + animación de Concorde).
 */

import { useState } from "react";
import type { JSX } from "react";

interface CodeViewerProps {
  code: string;
  filename: string;
  note?: string;
}

export default function CodeViewer({ code, filename, note }: CodeViewerProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    void navigator.clipboard.writeText(code).then(function done() {
      setCopied(true);
      setTimeout(function reset() {
        setCopied(false);
      }, 2000);
    });
  }

  const lineCount = code.split("\n").length;

  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #1e293b",
        overflow: "hidden",
        marginBottom: 24,
        background: "#0b1020",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#94a3b8",
            letterSpacing: "0.04em",
          }}
        >
          {filename}
          <span style={{ color: "#475569", fontWeight: 500 }}> · {lineCount} líneas · copy-paste exacto</span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "monospace",
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid #334155",
            background: copied ? "#16a34a" : "#1e293b",
            color: "#e2e8f0",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          {copied ? "✓ copiado" : "copiar código"}
        </button>
      </div>

      {note ? (
        <div
          style={{
            padding: "8px 14px",
            background: "#111827",
            borderBottom: "1px solid #1e293b",
            fontSize: 11,
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          {note}
        </div>
      ) : null}

      <pre
        style={{
          margin: 0,
          padding: "16px 18px",
          overflowX: "auto",
          maxHeight: 520,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "#e2e8f0",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <code style={{ whiteSpace: "pre" }}>{code}</code>
      </pre>
    </div>
  );
}
