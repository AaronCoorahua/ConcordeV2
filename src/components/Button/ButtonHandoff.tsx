"use client";

/**
 * ButtonHandoff — Panel Spec & Handoff generado por Concorde
 * Portable: solo depende de React. Funciona en cualquier repo.
 * Generado: 2026-05-25
 */

import { useState } from "react";
import type { JSX } from "react";

// ── Estilos del panel (inline, zero deps) ─────────────────────────────────

const S = {
  panel: {
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    overflow: "hidden" as const,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    width: "100%",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    padding: "10px 16px",
    background: "none",
    border: "none",
    cursor: "pointer" as const,
    gap: 8,
  },
  headerLeft: { display: "flex" as const, alignItems: "center" as const, gap: 8 },
  title: { fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "#1e293b" },
  badge: { fontSize: 10, fontWeight: 600, fontFamily: "monospace", padding: "1px 7px", borderRadius: 4, background: "#dcfce7", color: "#166534" },
  body: { padding: "0 16px 20px", display: "flex" as const, flexDirection: "column" as const, gap: 24 },
  divider: { height: 1, background: "#e2e8f0" },
  sectionLabel: { fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 8px" },
  codeBlock: { background: "#0f172a", borderRadius: 6, padding: "12px 14px", position: "relative" as const, overflowX: "auto" as const },
  code: { fontSize: 12, lineHeight: 1.6, color: "#e2e8f0", fontFamily: "monospace", whiteSpace: "pre" as const, display: "block" as const },
  copyBtn: { position: "absolute" as const, top: 8, right: 8, fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 4, border: "none", cursor: "pointer" as const, background: "#334155", color: "#e2e8f0" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 11 },
  th: { textAlign: "left" as const, padding: "4px 8px", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" },
  td: { padding: "5px 8px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#334155" },
  tdMono: { padding: "5px 8px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#2563eb", fontFamily: "monospace" },
  tdMuted: { padding: "5px 8px", borderBottom: "1px solid #e2e8f0", fontSize: 10, color: "#64748b" },
  note: { fontSize: 11, color: "#64748b", margin: "6px 0 0", lineHeight: "18px" },
  qaItem: { display: "flex" as const, alignItems: "flex-start" as const, gap: 8, fontSize: 11, color: "#475569", lineHeight: "18px" },
  qaCheck: { color: "#94a3b8", fontFamily: "monospace", flexShrink: 0 },
  footer: { paddingTop: 4, borderTop: "1px solid #e2e8f0" },
  footerText: { fontSize: 11, color: "#94a3b8", margin: 0, fontFamily: "monospace" },
  // ── Guía copiloto ──────────────────────────────────────────────────────
  guide: {
    borderRadius: 8,
    border: "1px solid #fed7aa",
    borderLeft: "4px solid #ed8936",
    background: "linear-gradient(135deg, #fff7ed 0%, #faf5ff 100%)",
    padding: "14px 16px 12px",
  },
  guideTitle: {
    fontSize: 11,
    fontWeight: 800,
    fontFamily: "monospace",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#92400e",
    margin: "0 0 12px",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
  },
  guideStep: {
    display: "flex" as const,
    alignItems: "flex-start" as const,
    gap: 10,
    fontSize: 12,
    color: "#1e293b",
    lineHeight: "18px",
    marginBottom: 8,
  },
  guideStepNum: {
    width: 20,
    height: 20,
    minWidth: 20,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ed8936, #8460e5)",
    color: "#fff",
    fontSize: 10,
    fontWeight: 800,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    flexShrink: 0 as const,
    fontFamily: "monospace",
  },
  guideCode: {
    fontFamily: "monospace",
    fontSize: 11,
    background: "rgba(0,0,0,0.06)",
    borderRadius: 3,
    padding: "0 4px",
    color: "#7c3aed",
  },
  guideHint: {
    fontSize: 10,
    color: "#92400e",
    fontFamily: "monospace",
    opacity: 0.7,
  },
  // ── Instalación ────────────────────────────────────────────────────────
  fileCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    overflow: "hidden" as const,
    marginBottom: 8,
  },
  fileCardHead: {
    padding: "8px 12px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 10,
  },
  mustBadge: {
    fontSize: 9,
    fontWeight: 800,
    fontFamily: "monospace",
    padding: "2px 7px",
    borderRadius: 3,
    background: "#fef2f2",
    color: "#b91c1c",
    letterSpacing: "0.06em",
    flexShrink: 0 as const,
  },
  optBadge: {
    fontSize: 9,
    fontWeight: 800,
    fontFamily: "monospace",
    padding: "2px 7px",
    borderRadius: 3,
    background: "#f1f5f9",
    color: "#64748b",
    letterSpacing: "0.06em",
    flexShrink: 0 as const,
  },
  fileName: {
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "monospace",
    color: "#1e293b",
  },
  fileDesc: {
    fontSize: 11,
    color: "#64748b",
  },
} as const;

// ── Mini CodeBlock ────────────────────────────────────────────────────────

interface CodeBlockProps { id: string; code: string; }

function CodeBlock({ id, code }: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    void navigator.clipboard.writeText(code).then(function onDone() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 2000);
    });
  }

  return (
    <div style={S.codeBlock} id={id}>
      <code style={S.code}>{code}</code>
      <button type="button" onClick={handleCopy} style={S.copyBtn}>
        {copied ? "✓ copiado" : "copiar"}
      </button>
    </div>
  );
}

// ── Contenido literal de los archivos ────────────────────────────────────

const INDEX_TS = `export { default as Button } from "./Button";
export { ButtonHandoff } from "./ButtonHandoff";
export type { ButtonProps, ButtonVariant } from "./Button";`;

const BUTTON_TSX = `// Button.tsx — Generado por Concorde
// Fuente: https://voyager-ds.vercel.app/preview/components/pase1
// Generado: 2026-05-25
// EDITAR LIBREMENTE después de generar

"use client";

import type { JSX, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "sm-guest"
  | "sm-logged-in";

export interface ButtonProps {
  variant?: ButtonVariant;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  /** Nombre de usuario — requerido cuando variant="sm-logged-in" */
  username?: string;
}

// ── CSS self-contained ────────────────────────────────────────────────────

const BUTTON_STYLES = ${'`'}
@property --vbtn-angle { syntax: "<angle>"; inherits: false; initial-value: 135deg; }
@property --vbtn-stop-a { syntax: "<color>"; inherits: false; initial-value: oklch(0.72 0.16 55); }
@property --vbtn-stop-b { syntax: "<color>"; inherits: false; initial-value: oklch(0.55 0.22 285); }
@property --vsec-angle { syntax: "<angle>"; inherits: false; initial-value: 160deg; }
@property --vsec-stop-a { syntax: "<color>"; inherits: false; initial-value: oklch(0.38 0.20 285); }
@property --vsec-stop-b { syntax: "<color>"; inherits: false; initial-value: oklch(0.28 0.18 285); }

/* ── primary ─────────────────────────────────────────────────────────── */
.pvbtn {
  --vbtn-stop-a: var(--vmc-color-orange-600, oklch(0.72 0.16 55));
  --vbtn-stop-b: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 56px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.28) 0 1px 0 2px inset, rgba(237,137,54,0.3) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.17) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pvbtn::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-orange-600, oklch(0.72 0.16 55)),
    var(--vmc-color-vault-500, oklch(0.55 0.22 285))
  );
  filter: blur(14px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.pvbtn:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.35) 0 8px 24px, rgba(237,137,54,0.4) 0 4px 10px;
}
.pvbtn:hover::after { opacity: 0.45; filter: blur(18px); }
.pvbtn:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.pvbtn:active::after { opacity: 0; }
.pvbtn:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  border-color: transparent;
}
.pvbtn:disabled::after { display: none; }
.pvbtn:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── secondary ───────────────────────────────────────────────────────── */
.psec {
  --vsec-stop-a: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  --vsec-stop-b: var(--vmc-color-vault-700, oklch(0.38 0.20 285));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 56px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid var(--vmc-color-vault-300, oklch(0.82 0.13 285));
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.3) 0 1px 3px;
  background-image: linear-gradient(var(--vsec-angle), var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.3) 0 2px 8px;
  transition:
    --vsec-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vsec-stop-a 0.35s,
    --vsec-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.psec::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.15) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.psec::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    var(--vmc-color-vault-700, oklch(0.38 0.20 285))
  );
  filter: blur(14px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.psec:hover {
  --vsec-angle: 219deg;
  --vsec-stop-a: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  --vsec-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(132,96,229,0.4) 0 8px 24px, rgba(132,96,229,0.25) 0 4px 10px;
}
.psec:hover::after { opacity: 0.45; filter: blur(18px); }
.psec:active {
  --vsec-angle: 160deg;
  --vsec-stop-a: var(--vmc-color-vault-700, oklch(0.38 0.20 285));
  --vsec-stop-b: var(--vmc-color-vault-900, oklch(0.25 0.16 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.28) 0 2px 5px 2px inset, rgba(0,0,0,0.14) 0 1px 3px;
}
.psec:active::after { opacity: 0; }
.psec:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  border-color: transparent;
}
.psec:disabled::after { display: none; }
.psec:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── ghost ───────────────────────────────────────────────────────────── */
.pghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 28px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.75);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  background: transparent;
  text-shadow: rgba(0,0,0,0.18) 0 1px 3px;
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(255,255,255,0.15) 0 0 0 1px;
  transition:
    background 0.25s,
    border-color 0.25s,
    color 0.25s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pghost::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.1) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pghost::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-orange-600, oklch(0.72 0.16 55)),
    var(--vmc-color-vault-500, oklch(0.55 0.22 285))
  );
  filter: blur(16px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.pghost:hover {
  background: linear-gradient(146.64deg, #fff 0%, rgb(255,240,226) 100%);
  border-color: #fff;
  color: #ed8936;
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.5) 0 1px 0 2px inset, rgba(0,0,0,0.2) 0 6px 20px;
}
.pghost:hover::after { opacity: 0.4; filter: blur(18px); }
.pghost:active {
  background: linear-gradient(146.56deg, rgb(212,110,32) 0%, rgb(183,55,0) 100%);
  border-color: #d46e20;
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset;
}
.pghost:active::after { opacity: 0; }
.pghost:disabled {
  background: transparent;
  border-color: rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.35);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pghost:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── sm-guest ─────────────────────────────────────────────────────────── */
.pvbtn-sm {
  --vbtn-stop-a: var(--vmc-color-orange-600, oklch(0.72 0.16 55));
  --vbtn-stop-b: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 4px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.2) 0 1px 2px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.25) 0 1px 0 2px inset, rgba(237,137,54,0.25) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn-sm::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.15) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pvbtn-sm:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-1px) scale(1.02);
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(132,96,229,0.3) 0 6px 18px, rgba(237,137,54,0.35) 0 3px 8px;
}
.pvbtn-sm:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 4px 2px inset, rgba(255,255,255,0.28) 0 1px 0 inset, rgba(0,0,0,0.1) 0 1px 2px;
}
.pvbtn-sm:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pvbtn-sm:focus-visible {
  outline: transparent solid 2px;
  outline-offset: 3px;
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 4px var(--vmc-color-vault-500, oklch(0.55 0.22 285));
}
.pvbtn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

/* ── sm-logged-in ─────────────────────────────────────────────────────── */
.pvbtn-auth-d {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 4px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.22) 0 1px 2px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.28) 0 1px 0 2px inset, rgba(237,137,54,0.3) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn-auth-d:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.35) 0 8px 24px, rgba(237,137,54,0.4) 0 4px 10px;
}
.pvbtn-auth-d:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.pvbtn-auth-d:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pvbtn-auth-d:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}
.pvbtn-auth-d-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.pvbtn-auth-d-username {
  font-weight: 700;
  opacity: 0.92;
}

/* ── prefers-reduced-motion ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .pvbtn, .psec, .pghost, .pvbtn-sm, .pvbtn-auth-d {
    transition: none;
  }
  .pvbtn::after, .psec::after, .pghost::after {
    transition: none;
  }
}
${'`'};

// ── Style injection ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-button-styles";
let stylesInjected = false;

function injectStyles(): void {
  if (typeof document === "undefined" || stylesInjected) return;
  if (!document.getElementById(STYLE_ID)) {
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = BUTTON_STYLES;
    document.head.appendChild(el);
  }
  stylesInjected = true;
}

// ── Icon ─────────────────────────────────────────────────────────────────

function UserIcon(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

// ── Variant → class map ───────────────────────────────────────────────────

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "pvbtn",
  secondary: "psec",
  ghost: "pghost",
  "sm-guest": "pvbtn-sm",
  "sm-logged-in": "pvbtn-auth-d",
};

// ── Component ─────────────────────────────────────────────────────────────

export default function Button({
  variant = "primary",
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel,
  username,
}: ButtonProps): JSX.Element {
  injectStyles();

  const cls = VARIANT_CLASS[variant];

  let content: ReactNode;
  if (variant === "sm-guest") {
    content = (
      <>
        <span className="pvbtn-icon">
          <UserIcon />
        </span>
        {children}
      </>
    );
  } else if (variant === "sm-logged-in") {
    content = (
      <>
        <span className="pvbtn-auth-d-icon">
          <UserIcon />
        </span>
        Bienvenido,{" "}
        <span className="pvbtn-auth-d-username">{username ?? children}</span>
      </>
    );
  } else {
    content = children;
  }

  return (
    <>
      <style
        id={${'`'}${'$'}{STYLE_ID}-ssr${'`'}}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: BUTTON_STYLES }}
      />
      <button
        className={cls}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        type="button"
      >
        {content}
      </button>
    </>
  );
}`;

// ── Data (resto del panel) ────────────────────────────────────────────────

const IMPORT_A = `import Button from "@/src/components/Button/Button";`;

const IMPORT_B = `import { Button } from "@/src/components/Button";`;

const USAGE = `// primary (md)
<Button variant="primary">Participa</Button>

// secondary (md)
<Button variant="secondary">Ingresa</Button>

// ghost (md — usar sobre fondos oscuros/gradiente)
<Button variant="ghost">Ver ofertas</Button>

// sm-guest — navbar, sin sesión
<Button variant="sm-guest">Ingresa</Button>

// sm-logged-in — navbar, con sesión
<Button variant="sm-logged-in" username="ZAEX5G" />

// disabled
<Button variant="primary" disabled>Participa</Button>`;

const SWAP = `// Antes
// import OldButton from "../OldButton";
// <OldButton className="btn-primary">Texto</OldButton>

// Después
import Button from "@/src/components/Button/Button";
// <Button variant="primary">Texto</Button>`;

const HTML_TREE = `<!-- primary / secondary -->
<button class="pvbtn | psec" type="button">
  {children}
  <!-- ::before shimmer overlay -->
  <!-- ::after glow blur -->
</button>

<!-- ghost -->
<button class="pghost" type="button">
  {children}
  <!-- ::before shimmer overlay -->
  <!-- ::after glow blur -->
</button>

<!-- sm-guest -->
<button class="pvbtn-sm" type="button">
  <span class="pvbtn-icon">
    <svg /> <!-- user icon 16×16 -->
  </span>
  {children}
</button>

<!-- sm-logged-in -->
<button class="pvbtn-auth-d" type="button">
  <span class="pvbtn-auth-d-icon">
    <svg /> <!-- user icon 16×16 -->
  </span>
  Bienvenido, <span class="pvbtn-auth-d-username">{username}</span>
</button>`;

const TOKENS_MIN = `/* Tokens mínimos — el componente incluye oklch fallbacks sin estos */
:root {
  --vmc-color-orange-600:  oklch(0.72 0.16 55);   /* #ED8936 */
  --vmc-color-orange-400:  oklch(0.85 0.12 55);   /* #FBC47D */
  --vmc-color-orange-700:  oklch(0.62 0.18 45);   /* #C05621 */
  --vmc-color-vault-500:   oklch(0.55 0.22 285);  /* #8460E5 */
  --vmc-color-vault-400:   oklch(0.72 0.18 285);  /* #AE8EFF */
  --vmc-color-vault-600:   oklch(0.48 0.22 285);
  --vmc-color-vault-700:   oklch(0.38 0.20 285);  /* #3B1782 */
  --vmc-color-vault-900:   oklch(0.25 0.16 285);
  --vmc-color-vault-300:   oklch(0.82 0.13 285);  /* #CFBAFF */
  --vmc-color-base-white:  #ffffff;
  --vmc-color-background-disabled: #e1e3e2;
  --vmc-color-neutral-700: #99a1af;
  --vmc-radius-full:        9999px;
  --vmc-font-display:       "Plus Jakarta Sans", sans-serif;
}`;

interface VariantRow { name: string; cssClass: string; height: string; note: string; }
const VARIANTS: VariantRow[] = [
  { name: "primary",       cssClass: ".pvbtn",       height: "48px", note: "CTA principal — orange→purple gradient" },
  { name: "secondary",     cssClass: ".psec",        height: "48px", note: "CTA secundario — purple gradient" },
  { name: "ghost",         cssClass: ".pghost",      height: "48px", note: "Sobre fondos oscuros/gradiente" },
  { name: "sm-guest",      cssClass: ".pvbtn-sm",    height: "40px", note: "Navbar · sin sesión · icono+texto" },
  { name: "sm-logged-in",  cssClass: ".pvbtn-auth-d", height: "40px", note: "Navbar · con sesión · icono+username" },
];

interface StateRow { state: string; selector: string; transform: string; effects: string; }
const STATES: StateRow[] = [
  { state: "default",       selector: "—",                         transform: "translateZ(0)",               effects: "gradient, inset shine, glow sombra" },
  { state: "hover",         selector: ":hover",                    transform: "translateY(-2px) scale(1.02)", effects: "gradient shift 220deg, glow ::after" },
  { state: "active",        selector: ":active",                   transform: "scale(0.97) translateY(1px)",  effects: "gradient darken, inset shadow" },
  { state: "disabled",      selector: ":disabled",                 transform: "none",                         effects: "bg #e1e3e2, color #99a1af, cursor not-allowed" },
  { state: "focus-visible", selector: ":focus-visible",            transform: "scale(0.98)",                  effects: "double ring: white + vault-500 outline" },
];

interface TokenRow { zone: string; token: string; }
const COLOR_TOKENS: TokenRow[] = [
  { zone: "Gradient stop A (default)",  token: "var(--vmc-color-orange-600, oklch(0.72 0.16 55))" },
  { zone: "Gradient stop B (default)",  token: "var(--vmc-color-vault-500, oklch(0.55 0.22 285))" },
  { zone: "Gradient stop A (hover)",    token: "var(--vmc-color-orange-400, oklch(0.85 0.12 55))" },
  { zone: "Gradient stop B (hover)",    token: "var(--vmc-color-vault-400, oklch(0.72 0.18 285))" },
  { zone: "Gradient stop A (pressed)",  token: "var(--vmc-color-orange-700, oklch(0.62 0.18 45))" },
  { zone: "Gradient stop B (pressed)",  token: "var(--vmc-color-vault-600, oklch(0.48 0.22 285))" },
  { zone: "Secondary stop A (default)", token: "var(--vmc-color-vault-500, oklch(0.55 0.22 285))" },
  { zone: "Secondary stop B (default)", token: "var(--vmc-color-vault-700, oklch(0.38 0.20 285))" },
  { zone: "Ghost border",               token: "rgba(255,255,255,0.75)" },
  { zone: "Text color",                 token: "var(--vmc-color-base-white, #ffffff)" },
  { zone: "Disabled bg",               token: "var(--vmc-color-background-disabled, #e1e3e2)" },
  { zone: "Disabled text",             token: "var(--vmc-color-neutral-700, #99a1af)" },
  { zone: "Focus ring outer",           token: "var(--vmc-color-vault-500, oklch(0.55 0.22 285))" },
];

const QA: string[] = [
  "Renderiza correcto en todos los variantes (primary, secondary, ghost, sm-guest, sm-logged-in)",
  "Hover: transform translateY(-2px) scale(1.02) visible, gradient cambia de ángulo",
  "Active/pressed: scale(0.97) translateY(1px), inset shadow",
  "Focus ring visible al navegar con Tab — double ring white + vault-500",
  "Disabled: bg #e1e3e2, color #99a1af, cursor not-allowed, sin interacción",
  "prefers-reduced-motion: transition: none en todos los variantes",
  "Sin FOUC — estilos presentes en SSR vía dangerouslySetInnerHTML",
  "Múltiples instancias: no duplica inyección JS (stylesInjected flag)",
  "sm-guest: icono circle visible a la izquierda",
  "sm-logged-in: pvbtn-auth-d-username en bold, opacity 0.92",
  "@property animations: gradiente animado al hover (requiere Chrome 111+)",
];

// ── Main ─────────────────────────────────────────────────────────────────

export function ButtonHandoff(): JSX.Element {
  const [open, setOpen] = useState(true);

  function handleToggle(): void {
    setOpen(function prev(p) { return !p; });
  }

  return (
    <div style={S.panel}>

      <button type="button" onClick={handleToggle} style={S.header}>
        <div style={S.headerLeft}>
          <span>📋</span>
          <span style={S.title}>Spec & Handoff — Button</span>
          <span style={S.badge}>✓ concorde</span>
        </div>
        <span style={{ fontSize: 11, color: "#94a3b8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease", display: "inline-block" }}>▼</span>
      </button>

      {open && (
        <div style={S.body}>
          <div style={S.divider} />

          {/* 💡 Guía copiloto */}
          <div style={S.guide}>
            <p style={S.guideTitle}>
              <span>💡</span>
              <span>Flujo sugerido — tú decides cómo adaptarlo</span>
            </p>
            {[
              {
                num: "1",
                text: (
                  <span>
                    Un enfoque común es copiar <code style={S.guideCode}>Button.tsx</code> directo a{" "}
                    <code style={S.guideCode}>src/components/Button/</code> en tu proyecto — aunque puedes ubicarlo donde prefieras.{" "}
                    <span style={S.guideHint}>↓ contenido completo en sección Instalación</span>
                  </span>
                ),
              },
              {
                num: "2",
                text: (
                  <span>
                    Si tu proyecto usa barrel exports, <code style={S.guideCode}>index.ts</code> puede ser útil — si no, puedes ignorarlo o adaptarlo a tu convención.
                  </span>
                ),
              },
              {
                num: "3",
                text: (
                  <span>
                    El componente es self-contained: no necesita CSS externo ni tokens para funcionar. Si tu proyecto tiene un sistema de tokens, puedes conectarlos después.{" "}
                    <span style={S.guideHint}>↓ tokens opcionales en sección Tokens CSS mínimos</span>
                  </span>
                ),
              },
              {
                num: "4",
                text: (
                  <span>
                    Antes de hacer merge, el QA checklist de abajo puede ayudarte a verificar los estados más importantes — úsalo como referencia, no como obligación.{" "}
                    <span style={S.guideHint}>↓ al final de este panel</span>
                  </span>
                ),
              },
            ].map(function renderStep(s) {
              return (
                <div key={s.num} style={S.guideStep}>
                  <span style={S.guideStepNum}>{s.num}</span>
                  <span>{s.text}</span>
                </div>
              );
            })}
          </div>

          {/* 0. Instalación */}
          <div>
            <p style={S.sectionLabel}>Instalación — copia estos archivos a tu proyecto</p>

            {/* Button.tsx — MUST */}
            <div style={S.fileCard}>
              <div style={S.fileCardHead}>
                <span style={S.mustBadge}>MUST</span>
                <span style={S.fileName}>Button.tsx</span>
                <span style={S.fileDesc}>Componente principal · self-contained · zero deps · incluye todos los estilos</span>
              </div>
              <CodeBlock id="file-button-tsx" code={BUTTON_TSX} />
            </div>

            {/* index.ts — OPCIONAL */}
            <div style={S.fileCard}>
              <div style={S.fileCardHead}>
                <span style={S.optBadge}>OPCIONAL</span>
                <span style={S.fileName}>index.ts</span>
                <span style={S.fileDesc}>Barrel export · permite {"import { Button }"} en lugar de ruta completa</span>
              </div>
              <CodeBlock id="file-index-ts" code={INDEX_TS} />
            </div>

            <p style={S.note}>
              📁 Destino: <code style={{ fontFamily: "monospace", fontSize: 11 }}>src/components/Button/</code>
              {" · "}Sin <code style={{ fontFamily: "monospace", fontSize: 11 }}>npm install</code>
              {" · "}Zero dependencias externas
            </p>
          </div>

          {/* 1. Importación */}
          <div>
            <p style={S.sectionLabel}>Importación</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CodeBlock id="import-a" code={IMPORT_A} />
              <CodeBlock id="import-b" code={IMPORT_B} />
            </div>
          </div>

          {/* 2. Uso */}
          <div>
            <p style={S.sectionLabel}>Uso</p>
            <CodeBlock id="usage" code={USAGE} />
          </div>

          {/* 3. Árbol HTML */}
          <div>
            <p style={S.sectionLabel}>Árbol HTML semántico</p>
            <CodeBlock id="html-tree" code={HTML_TREE} />
          </div>

          {/* 4. Variantes */}
          <div>
            <p style={S.sectionLabel}>Variantes</p>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Variante", "CSS Class", "Height", "Nota"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map(function renderRow(r) {
                  return (
                    <tr key={r.cssClass}>
                      <td style={S.td}>{r.name}</td>
                      <td style={S.tdMono}>{r.cssClass}</td>
                      <td style={S.td}>{r.height}</td>
                      <td style={S.tdMuted}>{r.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 5. Estados */}
          <div>
            <p style={S.sectionLabel}>Estados interactivos</p>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Estado", "Selector", "Transform", "Efectos"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {STATES.map(function renderRow(r) {
                  return (
                    <tr key={r.state}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.state}</td>
                      <td style={S.tdMono}>{r.selector}</td>
                      <td style={S.tdMono}>{r.transform}</td>
                      <td style={S.tdMuted}>{r.effects}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 6. Swap legacy */}
          <div>
            <p style={S.sectionLabel}>Reemplazar componente legacy</p>
            <CodeBlock id="swap" code={SWAP} />
          </div>

          {/* 7. Tokens de color */}
          <div>
            <p style={S.sectionLabel}>Tokens de color</p>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Zona", "Token / valor"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {COLOR_TOKENS.map(function renderRow(r) {
                  return (
                    <tr key={r.zone}>
                      <td style={S.td}>{r.zone}</td>
                      <td style={S.tdMono}>{r.token}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 8. Tokens CSS mínimos */}
          <div>
            <p style={S.sectionLabel}>Tokens CSS mínimos</p>
            <CodeBlock id="tokens-min" code={TOKENS_MIN} />
            <p style={S.note}>El componente incluye oklch fallbacks — funciona sin tokens, pero úsalos en producción.</p>
          </div>

          {/* 9. QA Checklist */}
          <div>
            <p style={S.sectionLabel}>QA checklist antes de merge</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {QA.map(function renderItem(item) {
                return (
                  <li key={item} style={S.qaItem}>
                    <span style={S.qaCheck}>☐</span>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer */}
          <div style={S.footer}>
            <p style={S.footerText}>
              Generado por <span style={{ color: "#2563eb" }}>Concorde</span>
              {" · "}
              <span style={{ color: "#2563eb" }}>src/components/Button/Button.tsx</span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
