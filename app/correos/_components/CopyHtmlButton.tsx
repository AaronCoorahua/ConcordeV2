"use client";

/**
 * CopyHtmlButton — copia el HTML de un correo/banner al portapapeles
 * con feedback «¡Copiado!» (mismo patrón que el catálogo de mailing en prod).
 *
 * `html` acepta un string (HTML fijo) o una función que devuelve el HTML en el
 * momento del clic — así el editor puede copiar el estado VIVO del iframe
 * (con las ediciones inline) en vez de un snapshot previo.
 */

import { useRef, useState } from "react";
import type { JSX } from "react";

export default function CopyHtmlButton({ html }: { html: string | (() => string) }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy(): Promise<void> {
    const text = typeof html === "function" ? html() : html;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback (contextos sin Clipboard API): textarea temporal
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(function reset() { setCopied(false); }, 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 32,
        padding: "0 14px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: copied ? "#00AEB1" : "#2E0F70",
        color: "#ffffff",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "inherit",
        transition: "background 0.2s ease",
      }}
    >
      {copied ? "¡Copiado!" : "Copiar HTML"}
    </button>
  );
}
