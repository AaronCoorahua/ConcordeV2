"use client";

/**
 * OfferTypeHandoff — Panel Spec & Handoff generado por Concorde
 * Portable: solo depende de React. Funciona en cualquier repo Next.js / React.
 * Generado: 2026-05-28
 */

import { useState } from "react";
import type { JSX } from "react";

// ─── Estilos del panel (inline, zero deps) ────────────────────────────────────

const S = {
  panel: { borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", overflow: "hidden" as const, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  header: { width: "100%", display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, padding: "10px 16px", background: "none", border: "none", cursor: "pointer" as const, gap: 8 },
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
  mustBadge: { fontSize: 9, fontWeight: 800, fontFamily: "monospace", padding: "2px 6px", borderRadius: 3, background: "#fee2e2", color: "#b91c1c", textTransform: "uppercase" as const, letterSpacing: "0.06em", flexShrink: 0 },
  fileCard: { border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" as const, marginBottom: 8 },
  fileCardHead: { display: "flex" as const, alignItems: "center" as const, gap: 8, padding: "6px 12px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  fileName: { fontSize: 11, fontFamily: "monospace", color: "#334155", fontWeight: 600, flex: 1 },
  fileDesc: { fontSize: 10, color: "#94a3b8" },
  guide: { borderRadius: 8, overflow: "hidden" as const, border: "1px solid rgba(132,96,229,0.18)" },
  guideHead: { background: "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.55 0.22 285) 100%)", padding: "10px 14px" },
  guideTitle: { fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 },
  guideSub: { fontSize: 10, color: "rgba(255,255,255,0.72)", margin: "2px 0 0" },
  guideBody: { background: "#fff", padding: "12px 14px", display: "flex" as const, flexDirection: "column" as const, gap: 10 },
  guideStep: { display: "flex" as const, gap: 10, alignItems: "flex-start" as const },
  guideNum: { width: 18, height: 18, borderRadius: "50%", background: "oklch(0.55 0.22 285)", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, flexShrink: 0, fontFamily: "monospace" },
  guideStepText: { fontSize: 11, color: "#475569", lineHeight: "17px" },
  guideCode: { fontFamily: "monospace", fontSize: 10, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3, color: "#1e293b" },
  qaItem: { display: "flex" as const, alignItems: "flex-start" as const, gap: 8, fontSize: 11, color: "#475569", lineHeight: "18px" },
  qaCheck: { color: "#94a3b8", fontFamily: "monospace", flexShrink: 0 },
  footer: { paddingTop: 4, borderTop: "1px solid #e2e8f0" },
  footerText: { fontSize: 11, color: "#94a3b8", margin: 0, fontFamily: "monospace" },
} as const;

// ─── Mini CodeBlock ───────────────────────────────────────────────────────────

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
      <button type="button" onClick={handleCopy} style={S.copyBtn}>{copied ? "✓ copiado" : "copiar"}</button>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const IMPORT_A = `import OfferType from "@/components/OfferType/OfferType";`;
const IMPORT_B = `import { OfferType } from "@/components/OfferType";`;

const USAGE = `// Variantes básicas
<OfferType variant="negotiable" />
<OfferType variant="live" />

// Con texto personalizado
<OfferType variant="negotiable" label="NEGOCIABLE" ctaLabel="VER TODAS" />
<OfferType variant="live" label="EN VIVO" ctaLabel="VER SUBASTAS" />

// Con handler de click
<OfferType
  variant="negotiable"
  onClick={() => router.push("/subastas?tipo=negociable")}
/>
<OfferType
  variant="live"
  onClick={() => router.push("/subastas?tipo=en-vivo")}
/>

// Con aria-label explícito
<OfferType
  variant="live"
  aria-label="Ver todas las subastas en vivo"
/>`;

const HTML_TREE = `<button
  type="button"
  class="poftype poftype--negotiable"   <!-- o poftype--live -->
  aria-label="NEGOCIABLE — VER TODAS"
>
  <!-- Sección coloreada (header) -->
  <div class="poftype-top">
    <!-- ::before — glass highlight (blanco 7%) -->
    <!-- ::after  — sombra borde inferior (negro 8%) -->
    <span class="poftype-label">NEGOCIABLE</span>
  </div>

  <!-- Sección blanca (footer CTA) -->
  <div class="poftype-bottom">
    <span class="poftype-cta">VER TODAS</span>
  </div>
</button>`;

const TOKENS_MIN = `/* Tokens mínimos — OfferType */
:root {
  /* Border-radius del card */
  --vmc-radius-md: 8px;

  /* Color teal NEGOCIABLE */
  --vmc-color-negotiable: oklch(0.78 0.14 195);  /* ≈ #2ec4b6 */

  /* Color orange EN VIVO */
  --vmc-color-live: oklch(0.72 0.16 55);          /* ≈ #f07b3f */

  /* Focus ring (teclado) */
  --vmc-color-vault-400: oklch(0.62 0.20 285);    /* violet */

  /* Font */
  --vmc-font-display: "Plus Jakarta Sans", system-ui, sans-serif;
}

/* NOTA: color-mix() requiere Chrome 111+, Firefox 113+, Safari 16.2+      */
/* El bottom section usa color-mix() para tint sutil — funciona en          */
/* todos los browsers modernos sin polyfill.                                 */`;

// Files
interface FileInfo { path: string; desc: string; }
const FILES: FileInfo[] = [
  { path: "src/components/OfferType/OfferType.tsx", desc: "Componente principal — self-contained" },
  { path: "src/components/OfferType/index.ts",       desc: "Barrel export" },
];

// Props
interface PropRow { name: string; type: string; default_: string; desc: string; }
const PROPS: PropRow[] = [
  { name: "variant",    type: '"negotiable" | "live"', default_: "—",              desc: 'REQUERIDO. Teal (NEGOCIABLE) o orange (EN VIVO)' },
  { name: "label",      type: "string",               default_: '"NEGOCIABLE" / "EN VIVO"', desc: "Override del texto del header" },
  { name: "ctaLabel",   type: "string",               default_: '"VER TODAS"',    desc: "Texto del CTA inferior" },
  { name: "onClick",    type: "() => void",           default_: "—",              desc: "Handler de click en el card" },
  { name: "aria-label", type: "string",               default_: 'label + ctaLabel', desc: "Override del aria-label" },
  { name: "className",  type: "string",               default_: '""',             desc: "Clase extra CSS" },
];

// Variantes
interface VariantRow { variant: string; class_: string; topBg: string; bottomBg: string; ctaColor: string; }
const VARIANTS: VariantRow[] = [
  { variant: "negotiable", class_: ".poftype--negotiable", topBg: "linear-gradient(180deg, oklch(0.84 0.13 195), oklch(0.78 0.14 195))", bottomBg: "color-mix(oklch 1 0 0 / 95%, negotiable)", ctaColor: "oklch(0.58 0.17 195)" },
  { variant: "live",       class_: ".poftype--live",       topBg: "linear-gradient(180deg, oklch(0.78 0.17 55), oklch(0.72 0.16 55))",   bottomBg: "color-mix(oklch 1 0 0 / 95%, live)",        ctaColor: "oklch(0.54 0.18 45)"  },
];

// Estados
interface StateRow { state: string; modifier: string; transform: string; opacity: string; shadow: string; }
const STATES: StateRow[] = [
  { state: "default", modifier: ".poftype",         transform: "translateZ(0)",             opacity: "1",    shadow: "color outline 1.5px + drop 4/16px" },
  { state: "hover",   modifier: ".poftype:hover",   transform: "translateY(-4px) scale(1.015)", opacity: "1", shadow: "stronger color + deep purple triple shadow" },
  { state: "focus",   modifier: ":active / .poftype--focus", transform: "scale(0.97)",      opacity: "0.58", shadow: "inset oklch(0 0 0/0.12) + minimal outer" },
  { state: "keyboard",modifier: ":focus-visible",   transform: "—",                         opacity: "1",    shadow: "outline 2px vault-400, offset 3px" },
];

// QA
const QA: string[] = [
  "Renderiza negotiable y live con colores correctos",
  "Hover: card se levanta (translateY -4px, scale 1.015)",
  "Click/active: card se hunde (scale 0.97, opacity 0.58)",
  "Focus-visible: outline 2px violet al navegar con Tab",
  "Bottom section tiene tint sutil del color de variante (color-mix)",
  "Glass highlight (::before) se intensifica en hover",
  "prefers-reduced-motion: transitions desactivadas",
  "Sin FOUC — estilos en SSR",
  "Múltiples instancias: sin duplicación de <style>",
  "color-mix() funciona en Chrome 111+, Firefox 113+, Safari 16.2+",
];

// Guide steps
interface GuideStep { n: number; detail: JSX.Element; }

// ─── Main ─────────────────────────────────────────────────────────────────────

export function OfferTypeHandoff(): JSX.Element {
  const [open, setOpen] = useState(true);
  function handleToggle(): void { setOpen(function prev(p) { return !p; }); }

  const guideSteps: GuideStep[] = [
    { n: 1, detail: <span style={S.guideStepText}>Copia <code style={S.guideCode}>OfferType.tsx</code> e <code style={S.guideCode}>index.ts</code>. Cero dependencias — funciona en cualquier repo React.</span> },
    { n: 2, detail: <span style={S.guideStepText}>Define los tokens <code style={S.guideCode}>--vmc-color-negotiable</code> y <code style={S.guideCode}>--vmc-color-live</code> en tu <code style={S.guideCode}>globals.css</code> si tienes sistema de tokens. El componente incluye fallbacks oklch() — funciona sin ellos.</span> },
    { n: 3, detail: <span style={S.guideStepText}>El <code style={S.guideCode}>color-mix()</code> del bottom section requiere browser moderno (Chrome 111+). Verifica el soporte target de tu proyecto — si necesitas IE11/old-browsers, provee un color sólido fallback.</span> },
    { n: 4, detail: <span style={S.guideStepText}>Conecta <code style={S.guideCode}>onClick</code> al handler de navegación/filtro. El comportamiento por defecto es sin estado — el padre decide qué pasa al hacer click.</span> },
  ];

  return (
    <div style={S.panel}>
      <button type="button" onClick={handleToggle} style={S.header}>
        <div style={S.headerLeft}>
          <span>🏷️</span>
          <span style={S.title}>Spec & Handoff — OfferType</span>
          <span style={S.badge}>✓ concorde</span>
        </div>
        <span style={{ fontSize: 11, color: "#94a3b8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease", display: "inline-block" }}>▼</span>
      </button>

      {open && (
        <div style={S.body}>
          <div style={S.divider} />

          {/* 1 — Importación */}
          <div>
            <p style={S.sectionLabel}>Importación</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CodeBlock id="ot-import-a" code={IMPORT_A} />
              <CodeBlock id="ot-import-b" code={IMPORT_B} />
            </div>
          </div>

          {/* 2 — Uso */}
          <div>
            <p style={S.sectionLabel}>Uso</p>
            <CodeBlock id="ot-usage" code={USAGE} />
          </div>

          {/* 3 — Árbol HTML */}
          <div>
            <p style={S.sectionLabel}>Árbol HTML semántico</p>
            <CodeBlock id="ot-html" code={HTML_TREE} />
          </div>

          {/* 4 — Instalación */}
          <div>
            <p style={S.sectionLabel}>Instalación — archivos (MUST)</p>
            {FILES.map(function renderFile(f) {
              return (
                <div key={f.path} style={S.fileCard}>
                  <div style={S.fileCardHead}>
                    <span style={S.mustBadge}>MUST</span>
                    <span style={S.fileName}>{f.path}</span>
                    <span style={S.fileDesc}>{f.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5 — Props */}
          <div>
            <p style={S.sectionLabel}>Props API</p>
            <table style={S.table}>
              <thead><tr>{["Prop","Tipo","Default","Descripción"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {PROPS.map(function renderRow(r) {
                  return (
                    <tr key={r.name}>
                      <td style={S.tdMono}>{r.name}</td>
                      <td style={{ ...S.tdMono, color: "#7c3aed" }}>{r.type}</td>
                      <td style={S.td}>{r.default_}</td>
                      <td style={S.tdMuted}>{r.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 6 — Variantes */}
          <div>
            <p style={S.sectionLabel}>Variantes (dimensiones: 110×92px)</p>
            <table style={S.table}>
              <thead><tr>{["Variante","CSS class","Top bg","CTA color"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {VARIANTS.map(function renderRow(r) {
                  return (
                    <tr key={r.variant}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.variant}</td>
                      <td style={S.tdMono}>{r.class_}</td>
                      <td style={S.tdMuted}>{r.topBg}</td>
                      <td style={S.tdMono}>{r.ctaColor}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 7 — Estados */}
          <div>
            <p style={S.sectionLabel}>Estados interactivos</p>
            <table style={S.table}>
              <thead><tr>{["Estado","Trigger","Transform","Opacity","Shadow"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {STATES.map(function renderRow(r) {
                  return (
                    <tr key={r.state}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.state}</td>
                      <td style={S.tdMono}>{r.modifier}</td>
                      <td style={S.tdMono}>{r.transform}</td>
                      <td style={S.tdMono}>{r.opacity}</td>
                      <td style={S.tdMuted}>{r.shadow}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 8 — Tokens */}
          <div>
            <p style={S.sectionLabel}>Tokens CSS mínimos</p>
            <CodeBlock id="ot-tokens" code={TOKENS_MIN} />
          </div>

          {/* 9 — Guide */}
          <div>
            <p style={S.sectionLabel}>Guía sugerida — tú decides cómo adaptarla</p>
            <div style={S.guide}>
              <div style={S.guideHead}>
                <p style={S.guideTitle}>✦ Flujo recomendado de integración</p>
                <p style={S.guideSub}>Recomendación — adáptala a tu proyecto</p>
              </div>
              <div style={S.guideBody}>
                {guideSteps.map(function renderStep(s) {
                  return (
                    <div key={s.n} style={S.guideStep}>
                      <div style={S.guideNum}>{s.n}</div>
                      <div>{s.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 10 — QA */}
          <div>
            <p style={S.sectionLabel}>QA checklist antes de mergear</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {QA.map(function renderItem(item) {
                return (
                  <div key={item} style={S.qaItem}>
                    <span style={S.qaCheck}>[ ]</span>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={S.footer}>
            <p style={S.footerText}>Generado por Concorde · OfferType · VoyagerDS · 2026-05-28</p>
          </div>
        </div>
      )}
    </div>
  );
}
