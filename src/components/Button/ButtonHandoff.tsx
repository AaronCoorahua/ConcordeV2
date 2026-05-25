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

// ── Data ──────────────────────────────────────────────────────────────────

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
