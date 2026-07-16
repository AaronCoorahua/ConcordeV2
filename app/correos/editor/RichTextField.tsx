"use client";

/**
 * RichTextField — campo de texto SIN comandos: el usuario ve el texto con sus
 * colores reales (no los marcadores ** __ [[ del renderer) y aplica estilos
 * seleccionando texto y tocando un botón de color, como en Word.
 *
 * Por dentro sigue siendo el sistema de producción: el valor guardado usa los
 * marcadores del renderer (**naranja**, __oscuro__, [[morado]]) — aquí solo se
 * traducen a <strong> estilizados para verlos, y de vuelta a marcadores al
 * guardar. El contenteditable es NO controlado (se inicializa una vez y solo
 * emite cambios) para que el cursor no salte al escribir.
 */

import { useEffect, useRef } from "react";
import type { JSX } from "react";

type MarkKind = "naranja" | "oscuro" | "morado";

const MARKS: Record<MarkKind, { open: string; close: string; color: string; label: string }> = {
  naranja: { open: "**", close: "**", color: "#ed8936", label: "Naranja" },
  oscuro: { open: "__", close: "__", color: "#0E016C", label: "Oscuro" },
  morado: { open: "[[", close: "]]", color: "#3b1782", label: "Morado" },
};

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Valor con marcadores → HTML visual para el contenteditable. */
function toHtml(value: string): string {
  return escHtml(value)
    .replace(/\*\*(.+?)\*\*/g, `<strong data-k="naranja" style="font-weight:800;color:${MARKS.naranja.color};">$1</strong>`)
    .replace(/__(.+?)__/g, `<strong data-k="oscuro" style="font-weight:700;color:${MARKS.oscuro.color};">$1</strong>`)
    .replace(/\[\[(.+?)\]\]/g, `<strong data-k="morado" style="font-weight:800;color:${MARKS.morado.color};">$1</strong>`);
}

/** DOM del contenteditable → valor con marcadores (aplana lo demás a texto). */
function fromDom(root: HTMLElement): string {
  let out = "";
  root.childNodes.forEach(function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      out += node.textContent ?? "";
      return;
    }
    if (node instanceof HTMLElement) {
      if (node.tagName === "BR") {
        out += "\n";
        return;
      }
      const k = node.getAttribute("data-k") as MarkKind | null;
      const inner = node.textContent ?? "";
      if (k && MARKS[k] && inner) out += `${MARKS[k].open}${inner}${MARKS[k].close}`;
      else out += inner; // pega de Word, spans ajenos… → texto plano
    }
  });
  return out;
}

export interface RichTextFieldProps {
  label: string;
  /** Valor inicial (con marcadores). El campo es no-controlado: solo emite. */
  initialValue: string;
  onChange: (value: string) => void;
  /** Cambiarla re-inicializa el contenido (p. ej. `${sectionId}:${key}`). */
  resetKey: string;
}

export default function RichTextField({ label, initialValue, onChange, resetKey }: RichTextFieldProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const initial = useRef(initialValue);
  initial.current = initialValue;

  // Inicializa el contenido SOLO al montar o al cambiar de campo/sección —
  // nunca en cada tecla, para no perder el cursor.
  useEffect(function init() {
    if (ref.current) ref.current.innerHTML = toHtml(initial.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  function emit(): void {
    if (ref.current) onChange(fromDom(ref.current));
  }

  /** Pinta la selección actual con el estilo `k` (o la despinta con null). */
  function paint(k: MarkKind | null): void {
    const root = ref.current;
    const sel = window.getSelection();
    if (!root || !sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return;

    if (k === null) {
      // Quitar estilo: si la selección toca un strong nuestro, se desenvuelve.
      const el = range.commonAncestorContainer instanceof HTMLElement
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;
      const strong = el?.closest("strong[data-k]");
      if (strong && root.contains(strong)) {
        strong.replaceWith(document.createTextNode(strong.textContent ?? ""));
        root.normalize();
        emit();
      }
      return;
    }

    const text = range.toString();
    if (!text) return; // sin selección no hay nada que pintar
    range.deleteContents();
    const strong = document.createElement("strong");
    strong.setAttribute("data-k", k);
    strong.style.fontWeight = k === "oscuro" ? "700" : "800";
    strong.style.color = MARKS[k].color;
    strong.textContent = text;
    range.insertNode(strong);
    sel.removeAllRanges();
    emit();
  }

  const chip = (bg: string, color: string): React.CSSProperties => ({
    height: 22, padding: "0 9px", borderRadius: 5, border: "none", cursor: "pointer",
    background: bg, color, fontSize: 10, fontWeight: 800, fontFamily: "inherit",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase", flex: 1 }}>{label}</span>
        <button type="button" title="Selecciona texto y tócalo para pintarlo naranja" onMouseDown={function keep(e) { e.preventDefault(); }} onClick={function b() { paint("naranja"); }} style={chip("#fdeadd", "#c85a1e")}>Naranja</button>
        <button type="button" title="Selecciona texto y tócalo para pintarlo oscuro" onMouseDown={function keep(e) { e.preventDefault(); }} onClick={function b() { paint("oscuro"); }} style={chip("#e8e6f5", "#0E016C")}>Oscuro</button>
        <button type="button" title="Selecciona texto y tócalo para pintarlo morado" onMouseDown={function keep(e) { e.preventDefault(); }} onClick={function b() { paint("morado"); }} style={chip("#f1edff", "#4f2ed8")}>Morado</button>
        <button type="button" title="Quita el color del texto donde está el cursor" onMouseDown={function keep(e) { e.preventDefault(); }} onClick={function b() { paint(null); }} style={chip("#f1f5f9", "#64748b")}>Quitar</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        style={{
          minHeight: 58, padding: "8px 10px", borderRadius: 7, border: "1px solid #e2e8f0",
          fontFamily: "inherit", fontSize: 13, lineHeight: 1.5, color: "#0f172a", background: "#fff",
          outline: "none", whiteSpace: "pre-wrap", overflowWrap: "break-word",
        }}
      />
    </div>
  );
}
