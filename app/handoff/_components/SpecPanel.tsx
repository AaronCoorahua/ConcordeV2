"use client";

/**
 * SpecPanel — Panel genérico "Spec & Handoff" generado por Concorde.
 * Motor reutilizable: recibe los datos de cada componente y renderiza el mismo
 * formato rico que ButtonHandoff (guía, instalación, import, uso, árbol HTML,
 * variantes, estados, tokens, QA). Solo depende de React.
 */

import { useState } from "react";
import type { JSX, ReactNode } from "react";

// ── Tipos de datos ─────────────────────────────────────────────────────────

export interface SpecFile {
  /** Nombre de archivo (Button.tsx, index.ts, …) */
  filename: string;
  /** Código literal del archivo */
  code: string;
  /** MUST = obligatorio · OPCIONAL = barrel/extras */
  level?: "must" | "opt";
  /** Descripción corta */
  desc?: string;
}

export interface SpecVariantRow {
  name: string;
  cssClass?: string;
  size?: string;
  note?: string;
}

export interface SpecPropRow {
  prop: string;
  type: string;
  def?: string;
  note?: string;
}

export interface SpecStateRow {
  state: string;
  selector: string;
  transform?: string;
  effects?: string;
}

export interface SpecTokenRow {
  zone: string;
  token: string;
}

export interface SpecPanelData {
  /** Nombre del componente */
  name: string;
  /** Descripción de una línea */
  description?: string;
  /** Origen (Figma / Voyager) */
  source?: string;
  /** Archivos a copiar (el primero suele ser el MUST principal) */
  files: SpecFile[];
  /** Líneas de import (ruta directa + barrel) */
  imports?: string[];
  /** Snippet de uso */
  usage?: string;
  /** Árbol HTML semántico */
  htmlTree?: string;
  /** Tabla de props */
  props?: SpecPropRow[];
  /** Tabla de variantes */
  variants?: SpecVariantRow[];
  /** Tabla de estados interactivos */
  states?: SpecStateRow[];
  /** Tabla de tokens de color */
  tokens?: SpecTokenRow[];
  /** Checklist de QA */
  qa?: string[];
  /** Ruta del archivo fuente (footer) */
  sourcePath?: string;
}

// ── Estilos (inline, zero deps) ────────────────────────────────────────────

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
  qaItem: { display: "flex" as const, alignItems: "flex-start" as const, gap: 8, fontSize: 11, color: "#475569", lineHeight: "18px" },
  qaCheck: { color: "#94a3b8", fontFamily: "monospace", flexShrink: 0 as const },
  footer: { paddingTop: 4, borderTop: "1px solid #e2e8f0" },
  footerText: { fontSize: 11, color: "#94a3b8", margin: 0, fontFamily: "monospace" },
  guide: { borderRadius: 8, border: "1px solid #fed7aa", borderLeft: "4px solid #ed8936", background: "linear-gradient(135deg, #fff7ed 0%, #faf5ff 100%)", padding: "14px 16px 12px" },
  guideTitle: { fontSize: 11, fontWeight: 800, fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#92400e", margin: "0 0 12px", display: "flex" as const, alignItems: "center" as const, gap: 6 },
  guideStep: { display: "flex" as const, alignItems: "flex-start" as const, gap: 10, fontSize: 12, color: "#1e293b", lineHeight: "18px", marginBottom: 8 },
  guideStepNum: { width: 20, height: 20, minWidth: 20, borderRadius: "50%", background: "linear-gradient(135deg, #ed8936, #8460e5)", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, flexShrink: 0 as const, fontFamily: "monospace" },
  guideCode: { fontFamily: "monospace", fontSize: 11, background: "rgba(0,0,0,0.06)", borderRadius: 3, padding: "0 4px", color: "#7c3aed" },
  fileCard: { border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" as const, marginBottom: 8 },
  fileCardHead: { padding: "8px 12px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex" as const, alignItems: "center" as const, gap: 10 },
  mustBadge: { fontSize: 9, fontWeight: 800, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, background: "#fef2f2", color: "#b91c1c", letterSpacing: "0.06em", flexShrink: 0 as const },
  optBadge: { fontSize: 9, fontWeight: 800, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, background: "#f1f5f9", color: "#64748b", letterSpacing: "0.06em", flexShrink: 0 as const },
  fileName: { fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#1e293b" },
  fileDesc: { fontSize: 11, color: "#64748b" },
} as const;

// ── Mini CodeBlock con copy ────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }): JSX.Element {
  const [copied, setCopied] = useState(false);
  function handleCopy(): void {
    void navigator.clipboard.writeText(code).then(function onDone() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 2000);
    });
  }
  return (
    <div style={S.codeBlock}>
      <code style={S.code}>{code}</code>
      <button type="button" onClick={handleCopy} style={S.copyBtn}>{copied ? "✓ copiado" : "copiar"}</button>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }): JSX.Element {
  return (
    <div>
      <p style={S.sectionLabel}>{label}</p>
      {children}
    </div>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────

export default function SpecPanel(data: SpecPanelData): JSX.Element {
  const [open, setOpen] = useState(true);

  return (
    <div style={S.panel}>
      <button type="button" onClick={function toggle() { setOpen(function p(v) { return !v; }); }} style={S.header}>
        <div style={S.headerLeft}>
          <span>📋</span>
          <span style={S.title}>Spec &amp; Handoff — {data.name}</span>
          <span style={S.badge}>✓ concorde</span>
        </div>
        <span style={{ fontSize: 11, color: "#94a3b8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease", display: "inline-block" }}>▼</span>
      </button>

      {open && (
        <div style={S.body}>
          <div style={S.divider} />

          {/* Guía copiloto */}
          <div style={S.guide}>
            <p style={S.guideTitle}><span>💡</span><span>Flujo sugerido — tú decides cómo adaptarlo</span></p>
            {[
              <span key="1">Copia <code style={S.guideCode}>{data.files[0]?.filename}</code> a <code style={S.guideCode}>src/components/{data.name}/</code> en tu proyecto — es self-contained (CSS-in-JS, zero deps).</span>,
              <span key="2">Si usas barrel exports, <code style={S.guideCode}>index.ts</code> ayuda; si no, ignóralo o adáptalo a tu convención.</span>,
              <span key="3">No necesita CSS externo ni tokens para funcionar (incluye fallbacks). Si tienes design tokens, conéctalos después.</span>,
              <span key="4">Antes de merge, usa el QA checklist de abajo como referencia de los estados clave.</span>,
            ].map(function step(node, i) {
              return (
                <div key={i} style={S.guideStep}>
                  <span style={S.guideStepNum}>{i + 1}</span>
                  <span>{node}</span>
                </div>
              );
            })}
          </div>

          {/* Instalación */}
          <Section label="Instalación — copia estos archivos a tu proyecto">
            {data.files.map(function renderFile(f) {
              const isMust = f.level !== "opt";
              return (
                <div key={f.filename} style={S.fileCard}>
                  <div style={S.fileCardHead}>
                    <span style={isMust ? S.mustBadge : S.optBadge}>{isMust ? "MUST" : "OPCIONAL"}</span>
                    <span style={S.fileName}>{f.filename}</span>
                    {f.desc ? <span style={S.fileDesc}>{f.desc}</span> : null}
                  </div>
                  <CodeBlock code={f.code} />
                </div>
              );
            })}
            <p style={S.note}>📁 Destino: <code style={{ fontFamily: "monospace", fontSize: 11 }}>src/components/{data.name}/</code>{" · "}Sin <code style={{ fontFamily: "monospace", fontSize: 11 }}>npm install</code>{" · "}Zero dependencias externas</p>
          </Section>

          {/* Import */}
          {data.imports && data.imports.length > 0 ? (
            <Section label="Importación">
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.imports.map(function renderImp(imp) { return <CodeBlock key={imp} code={imp} />; })}
              </div>
            </Section>
          ) : null}

          {/* Uso */}
          {data.usage ? <Section label="Uso"><CodeBlock code={data.usage} /></Section> : null}

          {/* Árbol HTML */}
          {data.htmlTree ? <Section label="Árbol HTML semántico"><CodeBlock code={data.htmlTree} /></Section> : null}

          {/* Props */}
          {data.props && data.props.length > 0 ? (
            <Section label="Props">
              <table style={S.table}>
                <thead><tr>{["Prop", "Tipo", "Default", "Nota"].map(function th(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
                <tbody>
                  {data.props.map(function row(r) {
                    return (
                      <tr key={r.prop}>
                        <td style={{ ...S.td, fontWeight: 600 }}>{r.prop}</td>
                        <td style={S.tdMono}>{r.type}</td>
                        <td style={S.tdMono}>{r.def ?? "—"}</td>
                        <td style={S.tdMuted}>{r.note ?? ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Section>
          ) : null}

          {/* Variantes */}
          {data.variants && data.variants.length > 0 ? (
            <Section label="Variantes">
              <table style={S.table}>
                <thead><tr>{["Variante", "CSS Class", "Tamaño", "Nota"].map(function th(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
                <tbody>
                  {data.variants.map(function row(r) {
                    return (
                      <tr key={r.name}>
                        <td style={S.td}>{r.name}</td>
                        <td style={S.tdMono}>{r.cssClass ?? "—"}</td>
                        <td style={S.td}>{r.size ?? "—"}</td>
                        <td style={S.tdMuted}>{r.note ?? ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Section>
          ) : null}

          {/* Estados */}
          {data.states && data.states.length > 0 ? (
            <Section label="Estados interactivos">
              <table style={S.table}>
                <thead><tr>{["Estado", "Selector", "Transform", "Efectos"].map(function th(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
                <tbody>
                  {data.states.map(function row(r) {
                    return (
                      <tr key={r.state}>
                        <td style={{ ...S.td, fontWeight: 600 }}>{r.state}</td>
                        <td style={S.tdMono}>{r.selector}</td>
                        <td style={S.tdMono}>{r.transform ?? "—"}</td>
                        <td style={S.tdMuted}>{r.effects ?? ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Section>
          ) : null}

          {/* Tokens */}
          {data.tokens && data.tokens.length > 0 ? (
            <Section label="Tokens de color">
              <table style={S.table}>
                <thead><tr>{["Zona", "Token / valor"].map(function th(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
                <tbody>
                  {data.tokens.map(function row(r) {
                    return (
                      <tr key={r.zone}>
                        <td style={S.td}>{r.zone}</td>
                        <td style={S.tdMono}>{r.token}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Section>
          ) : null}

          {/* QA */}
          {data.qa && data.qa.length > 0 ? (
            <Section label="QA checklist antes de merge">
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                {data.qa.map(function item(q) {
                  return <li key={q} style={S.qaItem}><span style={S.qaCheck}>☐</span>{q}</li>;
                })}
              </ul>
            </Section>
          ) : null}

          {/* Footer */}
          <div style={S.footer}>
            <p style={S.footerText}>Generado por <span style={{ color: "#2563eb" }}>Concorde</span>{" · "}<span style={{ color: "#2563eb" }}>{data.sourcePath ?? `src/components/${data.name}/${data.name}.tsx`}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
