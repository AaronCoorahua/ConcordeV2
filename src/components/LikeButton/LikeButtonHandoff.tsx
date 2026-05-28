"use client";

/**
 * LikeButtonHandoff — Panel Spec & Handoff generado por Concorde
 * Portable: solo depende de React. Funciona en cualquier repo Next.js / React.
 * Generado: 2026-05-28
 */

import { useState } from "react";
import type { JSX } from "react";

// ─── Estilos del panel (inline, zero deps) ────────────────────────────────────

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
  mustBadge: { fontSize: 9, fontWeight: 800, fontFamily: "monospace", padding: "2px 6px", borderRadius: 3, background: "#fee2e2", color: "#b91c1c", textTransform: "uppercase" as const, letterSpacing: "0.06em", flexShrink: 0 },
  optBadge:  { fontSize: 9, fontWeight: 800, fontFamily: "monospace", padding: "2px 6px", borderRadius: 3, background: "#f1f5f9", color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "0.06em", flexShrink: 0 },
  fileCard: { border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" as const, marginBottom: 8 },
  fileCardHead: { display: "flex" as const, alignItems: "center" as const, gap: 8, padding: "6px 12px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  fileName: { fontSize: 11, fontFamily: "monospace", color: "#334155", fontWeight: 600, flex: 1 },
  fileDesc: { fontSize: 10, color: "#94a3b8" },
  guide: { borderRadius: 8, overflow: "hidden" as const, border: "1px solid rgba(132,96,229,0.18)" },
  guideHead: { background: "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.55 0.22 285) 100%)", padding: "10px 14px" },
  guideTitle: { fontSize: 11, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.02em" },
  guideSub: { fontSize: 10, color: "rgba(255,255,255,0.72)", margin: "2px 0 0" },
  guideBody: { background: "#fff", padding: "12px 14px", display: "flex" as const, flexDirection: "column" as const, gap: 10 },
  guideStep: { display: "flex" as const, gap: 10, alignItems: "flex-start" as const },
  guideNum: { width: 18, height: 18, borderRadius: "50%", background: "oklch(0.55 0.22 285)", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, flexShrink: 0, fontFamily: "monospace" },
  guideStepText: { fontSize: 11, color: "#475569", lineHeight: "17px" },
  guideCode: { fontFamily: "monospace", fontSize: 10, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3, color: "#1e293b" },
  guideHint: { fontSize: 10, color: "#94a3b8", marginTop: 4, fontStyle: "italic" },
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
      <button type="button" onClick={handleCopy} style={S.copyBtn}>
        {copied ? "✓ copiado" : "copiar"}
      </button>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const IMPORT_A = `import LikeButton from "@/components/LikeButton/LikeButton";`;
const IMPORT_B = `import { LikeButton } from "@/components/LikeButton";`;

const USAGE = `// Tamaños disponibles
<LikeButton size="sm" />
<LikeButton size="md" />          {/* default */}
<LikeButton size="lg" />

// Uncontrolled — gestiona estado internamente
<LikeButton
  defaultActive={false}
  onChange={(liked) => console.log("liked:", liked)}
/>

// Controlled — tú controlas el estado
const [liked, setLiked] = useState(false);
<LikeButton active={liked} onChange={setLiked} />

// Estados especiales
<LikeButton disabled />
<LikeButton skeleton />

// Con aria-label personalizado
<LikeButton
  size="lg"
  aria-label="Me gusta este producto"
  onChange={(v) => void saveToApi(v)}
/>`;

const HTML_TREE = `<button
  type="button"
  class="plike plike--md"      <!-- + plike--active | plike--disabled | plike--skeleton | plike--pop -->
  aria-label="Me gusta"
  aria-pressed="false"         <!-- true cuando activo -->
  style="width: 44px; height: 44px;"
>
  <!-- SVG corazón — no renderiza en skeleton -->
  <svg
    width="19" height="19"
    viewBox="0 0 24 24"
    fill="none"                 <!-- rgba(255,255,255,0.92) cuando activo -->
    stroke="var(--vmc-color-vault-600, oklch(0.38 0.20 285))"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>

  <!-- ::before — highlight especular (z-index: 1) -->
  <!-- ::after  — glow radial bajo el botón (z-index: -1) -->
</button>`;

const TOKENS_MIN = `/* Tokens mínimos — LikeButton */
/* El componente incluye oklch() fallbacks. Úsalos en producción. */
:root {
  /* Borde gradiente default */
  --vmc-color-vault-200: oklch(0.87 0.09 285);   /* lavender-light */
  --vmc-color-vault-300: oklch(0.80 0.12 285);   /* lavender */

  /* Hover glow + focus ring */
  --vmc-color-vault-400: oklch(0.62 0.20 285);   /* violet-mid */

  /* Heart stroke (default) */
  --vmc-color-vault-600: oklch(0.38 0.20 285);   /* violet-deep */

  /* Active fill bg */
  --vmc-color-vault-500: oklch(0.45 0.20 285);   /* violet */
  --vmc-color-vault-700: oklch(0.30 0.20 285);   /* violet-darker */

  /* Active border gradient */
  --vmc-color-orange-400: oklch(0.72 0.16 55);   /* naranja brand */

  /* Disabled / skeleton */
  --vmc-color-background-disabled: oklch(0.88 0.01 220);
}`;

// Archivos requeridos
interface FileInfo { path: string; desc: string; required: boolean; }
const FILES: FileInfo[] = [
  { path: "src/components/LikeButton/LikeButton.tsx", desc: "Componente principal — self-contained, cero deps", required: true },
  { path: "src/components/LikeButton/index.ts",        desc: "Barrel export — re-exporta LikeButton + tipos", required: true },
];

// Props
interface PropRow { name: string; type: string; default_: string; desc: string; }
const PROPS: PropRow[] = [
  { name: "size",         type: '"sm" | "md" | "lg"', default_: '"md"',   desc: "32px / 44px / 60px" },
  { name: "active",       type: "boolean",             default_: "—",      desc: "Estado controlado (controlled mode)" },
  { name: "defaultActive",type: "boolean",             default_: "false",  desc: "Estado inicial (uncontrolled mode)" },
  { name: "onChange",     type: "(v: boolean) => void",default_: "—",      desc: "Callback al alternar" },
  { name: "disabled",     type: "boolean",             default_: "false",  desc: "Deshabilita interacciones" },
  { name: "skeleton",     type: "boolean",             default_: "false",  desc: "Modo skeleton / loading" },
  { name: "aria-label",   type: "string",              default_: '"Me gusta"', desc: "Texto accesible del botón" },
  { name: "className",    type: "string",              default_: '""',     desc: "Clase extra (no sobreescribe base)" },
];

// Variantes / tamaños
interface SizeRow { size: string; btnSize: string; iconSize: string; cssClass: string; }
const SIZES: SizeRow[] = [
  { size: "sm",  btnSize: "32px", iconSize: "13px", cssClass: ".plike--sm" },
  { size: "md",  btnSize: "44px", iconSize: "19px", cssClass: ".plike--md" },
  { size: "lg",  btnSize: "60px", iconSize: "27px", cssClass: ".plike--lg" },
];

// Estados
interface StateRow { state: string; modifier: string; svgFill: string; svgStroke: string; effects: string; }
const STATES: StateRow[] = [
  { state: "default",  modifier: ".plike",           svgFill: "none",                      svgStroke: "vault-600",  effects: "fondo blanco, borde gradiente vault-200/300, sombra suave" },
  { state: "hover",    modifier: ".plike:hover",      svgFill: "none",                      svgStroke: "vault-600",  effects: "scale(1.08) translateY(-2px), sombra deep vault" },
  { state: "press",    modifier: ".plike:active",     svgFill: "none",                      svgStroke: "vault-600",  effects: "scale(0.92)" },
  { state: "active",   modifier: ".plike--active",    svgFill: "rgba(255,255,255,0.92)",    svgStroke: "none",       effects: "fondo gradiente vault-500→700, borde orange, glow radial" },
  { state: "disabled", modifier: ".plike--disabled",  svgFill: "none",                      svgStroke: "oklch(0.72 0.02 220)", effects: "bg gris, opacity 0.7, pointer-events none" },
  { state: "skeleton", modifier: ".plike--skeleton",  svgFill: "—",                         svgStroke: "—",          effects: "bg gris, pulse animation, sin corazón" },
  { state: "focus",    modifier: ".plike:focus-visible", svgFill: "none",                   svgStroke: "vault-600",  effects: "outline 2px vault-400, offset 3px" },
];

// Animaciones
interface AnimRow { name: string; trigger: string; duration: string; easing: string; desc: string; }
const ANIMS: AnimRow[] = [
  { name: "plike-heart-pop", trigger: "Toggle → active (.plike--pop)", duration: "0.38s",  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Scale 1→1.4→0.85→1.1→1 (bouncy spring)" },
  { name: "plike-pulse",     trigger: ".plike--skeleton",               duration: "1.6s",   easing: "ease-in-out infinite",               desc: "Opacity 1→0.4→1 (skeleton breathing)" },
];

// QA
const QA: string[] = [
  "Renderiza en los 3 tamaños sin overflow",
  "Click alterna estado: default → active → default",
  "Controlled mode: active prop controla visualmente",
  "Heart pop animation visible al activar",
  "Hover: scale(1.08) translateY(-2px) visible",
  "Press: scale(0.92) visible",
  "Focus ring (outline 2px) visible al navegar con Tab",
  "Disabled: sin interacción, cursor not-allowed, opacity 0.7",
  "Skeleton: sin corazón, pulse animation, sin click",
  "aria-pressed=true cuando activo / false cuando inactivo",
  "prefers-reduced-motion: animations desactivadas",
  "Sin FOUC — estilos presentes en SSR",
  "Múltiples instancias: sin duplicación de <style>",
];

// Pasos del guide
interface GuideStep { n: number; title: string; detail: JSX.Element; }

// ─── Main ─────────────────────────────────────────────────────────────────────

export function LikeButtonHandoff(): JSX.Element {
  const [open, setOpen] = useState(true);

  function handleToggle(): void {
    setOpen(function prev(p) { return !p; });
  }

  const guideSteps: GuideStep[] = [
    {
      n: 1,
      title: "Copia los archivos MUST",
      detail: (
        <span style={S.guideStepText}>
          Copia <code style={S.guideCode}>LikeButton.tsx</code> e <code style={S.guideCode}>index.ts</code> a tu proyecto.
          El componente es completamente self-contained — no necesita dependencias extra.
        </span>
      ),
    },
    {
      n: 2,
      title: "Decide el modo de uso",
      detail: (
        <span style={S.guideStepText}>
          <strong>No controlado</strong> (más sencillo): usa <code style={S.guideCode}>defaultActive</code> + <code style={S.guideCode}>onChange</code>.{" "}
          <strong>Controlado</strong>: usa <code style={S.guideCode}>active</code> + <code style={S.guideCode}>onChange</code> para sincronizar con tu estado global (API, Zustand, etc.).
        </span>
      ),
    },
    {
      n: 3,
      title: "Tokens CSS (opcional pero recomendado)",
      detail: (
        <span style={S.guideStepText}>
          El componente incluye valores fallback <code style={S.guideCode}>oklch()</code> en cada var().
          Funciona sin tokens. Si tienes tokens Voyager DS, defínelos en tu <code style={S.guideCode}>globals.css</code> y se aplicarán automáticamente.
        </span>
      ),
    },
    {
      n: 4,
      title: "Integración con backend",
      detail: (
        <span style={S.guideStepText}>
          Usa <code style={S.guideCode}>onChange</code> para disparar tu llamada a la API.
          Mientras espera respuesta, puedes mostrar <code style={S.guideCode}>skeleton</code> o deshabilitar temporalmente.
          Decide tú si prefieres optimistic update o esperar confirmación.
        </span>
      ),
    },
  ];

  return (
    <div style={S.panel}>

      {/* Header toggle */}
      <button type="button" onClick={handleToggle} style={S.header}>
        <div style={S.headerLeft}>
          <span>💙</span>
          <span style={S.title}>Spec & Handoff — LikeButton</span>
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
              <CodeBlock id="lb-import-a" code={IMPORT_A} />
              <CodeBlock id="lb-import-b" code={IMPORT_B} />
            </div>
          </div>

          {/* 2 — Uso */}
          <div>
            <p style={S.sectionLabel}>Uso</p>
            <CodeBlock id="lb-usage" code={USAGE} />
          </div>

          {/* 3 — Árbol HTML */}
          <div>
            <p style={S.sectionLabel}>Árbol HTML semántico</p>
            <CodeBlock id="lb-html" code={HTML_TREE} />
          </div>

          {/* 4 — Instalación */}
          <div>
            <p style={S.sectionLabel}>Instalación — archivos</p>
            {FILES.map(function renderFile(f) {
              return (
                <div key={f.path} style={S.fileCard}>
                  <div style={S.fileCardHead}>
                    <span style={f.required ? S.mustBadge : S.optBadge}>
                      {f.required ? "MUST" : "OPCIONAL"}
                    </span>
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
              <thead>
                <tr>
                  {["Prop", "Tipo", "Default", "Descripción"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
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

          {/* 6 — Tamaños */}
          <div>
            <p style={S.sectionLabel}>Tamaños</p>
            <table style={S.table}>
              <thead>
                <tr>
                  {["size", "Botón", "Ícono", "CSS class"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {SIZES.map(function renderRow(r) {
                  return (
                    <tr key={r.size}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.size}</td>
                      <td style={S.tdMono}>{r.btnSize}</td>
                      <td style={S.tdMono}>{r.iconSize}</td>
                      <td style={S.tdMono}>{r.cssClass}</td>
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
              <thead>
                <tr>
                  {["Estado", "Modifier", "SVG fill", "SVG stroke", "Efectos"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {STATES.map(function renderRow(r) {
                  return (
                    <tr key={r.state}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.state}</td>
                      <td style={S.tdMono}>{r.modifier}</td>
                      <td style={S.tdMono}>{r.svgFill}</td>
                      <td style={S.tdMono}>{r.svgStroke}</td>
                      <td style={S.tdMuted}>{r.effects}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 8 — Animaciones */}
          <div>
            <p style={S.sectionLabel}>Animaciones</p>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Nombre", "Trigger", "Duración", "Easing", "Descripción"].map(function renderTh(h) {
                    return <th key={h} style={S.th}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {ANIMS.map(function renderRow(r) {
                  return (
                    <tr key={r.name}>
                      <td style={S.tdMono}>{r.name}</td>
                      <td style={S.tdMuted}>{r.trigger}</td>
                      <td style={S.tdMono}>{r.duration}</td>
                      <td style={S.tdMuted}>{r.easing}</td>
                      <td style={S.tdMuted}>{r.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 9 — Tokens CSS mínimos */}
          <div>
            <p style={S.sectionLabel}>Tokens CSS mínimos</p>
            <CodeBlock id="lb-tokens" code={TOKENS_MIN} />
            <p style={S.note}>
              Todos los tokens tienen fallback oklch() — el componente funciona sin ellos.
              Defínelos en tu <code style={{ fontFamily: "monospace" }}>globals.css</code> si tu proyecto usa el sistema de tokens Voyager DS.
            </p>
          </div>

          {/* 10 — Advisory guide */}
          <div>
            <p style={S.sectionLabel}>Guía sugerida — tú decides cómo adaptarla</p>
            <div style={S.guide}>
              <div style={S.guideHead}>
                <p style={S.guideTitle}>✦ Flujo recomendado de integración</p>
                <p style={S.guideSub}>Esto es una recomendación — eres libre de adaptarlo a tu proyecto</p>
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

          {/* 11 — QA Checklist */}
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
            <p style={S.footerText}>
              Generado por Concorde · LikeButton · VoyagerDS v2.0 · 2026-05-28
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
