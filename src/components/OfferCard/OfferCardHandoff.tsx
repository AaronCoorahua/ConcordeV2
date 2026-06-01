"use client";

/**
 * OfferCardHandoff — Panel Spec & Handoff generado por Concorde
 * Portable: solo depende de React. Funciona en cualquier repo.
 * Generado: 2026-05-28
 */

import { useState } from "react";
import type { JSX } from "react";

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

const IMPORT_A = `import OfferCard from "@/components/OfferCard/OfferCard";`;
const IMPORT_B = `import { OfferCard } from "@/components/OfferCard";`;

const USAGE = `// Variante EN VIVO (orange bar)
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 28,500"
  imageSrc="/images/bronco.jpg"
  imageAlt="Ford Bronco Sport 2024"
  onClick={() => router.push("/subasta/bronco")}
/>

// Variante PRÓXIMA (purple border)
<OfferCard
  variant="proxima"
  name="Land Rover Def."
  year="2023"
  price="US$ 9,999"
  imageSrc="/images/landrover.jpg"
  onClick={() => router.push("/subasta/landrover")}
/>

// Con like controlado
const [liked, setLiked] = useState(false);
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year={2024}
  price="US$ 28,500"
  liked={liked}
  onLikeChange={setLiked}
/>`;

const HTML_TREE = `<article
  class="pcard pcard--live"   <!-- o pcard--proxima -->
  role="button"
  tabindex="0"
  aria-label="Ford Bronco Sport"
>
  <!-- Imagen con badge overlay -->
  <div class="pcard__img">
    <img src="..." alt="..." loading="lazy" />
    <div class="pcard__img-badge">
      <!-- Pill EN VIVO -->
      <div class="pcard-pill pcard-pill--live">
        <div class="pcard-pill-dot" />   <!-- pulsing ring animation -->
        <span>EN VIVO</span>
      </div>
      <!-- o Pill PRÓXIMA -->
      <div class="pcard-pill pcard-pill--proxima">
        <span class="pcard-pill-clock">  <!-- blinking clock SVG -->
          <svg>...</svg>
        </span>
        <span>PRÓXIMA</span>
      </div>
    </div>
  </div>

  <!-- Contenido -->
  <div class="pcard__body">
    <div class="pcard__meta">
      <h3 class="pcard__name">Ford Bronco Sport</h3>
      <p class="pcard__year">2024</p>
    </div>
    <div class="pcard__price-row">
      <div class="pcard__price-left">
        <div class="pprice-sm">   <!-- teal $ icon, self-contained -->
          <svg>$</svg>
        </div>
        <span class="pcard__price-text">US$ 28,500</span>
      </div>
      <button class="pcard-like">   <!-- mini LikeButton, self-contained -->
        <svg>♡</svg>
      </button>
    </div>
  </div>

  <!-- ::after — barra decorativa (live=orange, proxima=border) -->
</article>`;

const TOKENS_MIN = `/* Tokens mínimos — OfferCard */
:root {
  /* Fuentes */
  --vmc-font-display: "Plus Jakarta Sans", sans-serif;
  --vmc-font-mono:    "Roboto Mono", monospace;

  /* Price icon (teal) */
  --vmc-color-negotiable: oklch(0.78 0.14 195);  /* ≈ #2ec4b6 */

  /* Texto precio y año */
  /* oklch(0.42 0.22 285) — vault-600 — no var disponible */

  /* Live bar: oklch(0.72-0.78 0.16-0.17 44-55) — hardcoded */
  /* Proxima bar: oklch(0.42 0.22 285)           — hardcoded */
}`;

interface PropRow { name: string; type: string; req: boolean; desc: string; }
const PROPS: PropRow[] = [
  { name: "variant",      type: '"live" | "proxima"', req: true,  desc: 'EN VIVO (orange) o PRÓXIMA (purple)' },
  { name: "name",         type: "string",             req: true,  desc: "Nombre del vehículo" },
  { name: "year",         type: "string | number",    req: true,  desc: "Año del vehículo" },
  { name: "price",        type: "string",             req: true,  desc: 'Precio formateado ("US$ 28,500")' },
  { name: "imageSrc",     type: "string",             req: false, desc: "URL imagen. Sin src = placeholder gris" },
  { name: "imageAlt",     type: "string",             req: false, desc: "Alt text (default: name)" },
  { name: "liked",        type: "boolean",            req: false, desc: "Estado like controlado" },
  { name: "onLikeChange", type: "(v: boolean) => void", req: false, desc: "Callback al alternar like" },
  { name: "onClick",      type: "() => void",         req: false, desc: "Click en la card (navegar, abrir modal)" },
  { name: "aria-label",   type: "string",             req: false, desc: "Override aria-label (default: name)" },
  { name: "className",    type: "string",             req: false, desc: "Clase extra" },
];

interface VariantRow { variant: string; pill: string; barStyle: string; animation: string; }
const VARIANTS: VariantRow[] = [
  { variant: "live",    pill: ".pcard-pill--live (orange gradient)",   barStyle: "::after gradient orange 6px bottom", animation: "pcard-pill-dot pulsing ring" },
  { variant: "proxima", pill: ".pcard-pill--proxima (vault gradient)", barStyle: "border-bottom 6px solid vault-600",   animation: "pcard-pill-clock blink 1.4s" },
];

interface StateRow { state: string; trigger: string; transform: string; shadow: string; }
const STATES: StateRow[] = [
  { state: "default", trigger: "—",           transform: "translateZ(0)",     shadow: "oklch(0.22 0.18 285/0.1) 0px 8px 16px" },
  { state: "hover",   trigger: ":hover",      transform: "translateY(-3px)",  shadow: "oklch(0.22 0.18 285/0.12) 0px 12px 20px" },
  { state: "like",    trigger: "click corazón", transform: "heart-pop 0.38s", shadow: "—" },
];

const QA: string[] = [
  "Renderiza live con barra orange y pill 'EN VIVO' pulsante",
  "Renderiza proxima con borde purple y pill 'PRÓXIMA' con clock",
  "Hover: card sube 3px, shadow más pronunciada",
  "Like toggle: corazón lleno/vacío, heart-pop animation",
  "Click en like NO propaga a card (stopPropagation)",
  "imageSrc vacío → placeholder gris visible",
  "name trunca con ellipsis si es muy largo",
  "price en Roboto Mono tabular-nums",
  "Teclado: Enter/Space en card dispara onClick",
  "aria-pressed en botón like refleja estado",
  "prefers-reduced-motion: sin animations",
  "Sin FOUC — estilos en SSR",
];

export function OfferCardHandoff(): JSX.Element {
  const [open, setOpen] = useState(true);
  function handleToggle(): void { setOpen(function prev(p) { return !p; }); }

  const guideSteps = [
    { n: 1, detail: <span style={S.guideStepText}>Copia <code style={S.guideCode}>OfferCard.tsx</code> e <code style={S.guideCode}>index.ts</code>. Todo self-contained — pprice y mini-like están embebidos, sin imports extra.</span> },
    { n: 2, detail: <span style={S.guideStepText}>Pasa <code style={S.guideCode}>imageSrc</code> con la URL real del vehículo. Sin ella, el card muestra placeholder gris — útil para loading states.</span> },
    { n: 3, detail: <span style={S.guideStepText}>Para sincronizar el like con tu backend, usa <code style={S.guideCode}>liked</code> + <code style={S.guideCode}>onLikeChange</code> (modo controlado). Para standalone, omite <code style={S.guideCode}>liked</code> — gestiona estado internamente.</span> },
    { n: 4, detail: <span style={S.guideStepText}>El <code style={S.guideCode}>onClick</code> de la card navega/abre modal. El like tiene <code style={S.guideCode}>stopPropagation</code> — no conflicta.</span> },
  ];

  return (
    <div style={S.panel}>
      <button type="button" onClick={handleToggle} style={S.header}>
        <div style={S.headerLeft}>
          <span>🚗</span>
          <span style={S.title}>Spec & Handoff — OfferCard</span>
          <span style={S.badge}>✓ concorde</span>
        </div>
        <span style={{ fontSize: 11, color: "#94a3b8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease", display: "inline-block" }}>▼</span>
      </button>

      {open && (
        <div style={S.body}>
          <div style={S.divider} />

          <div>
            <p style={S.sectionLabel}>Importación</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CodeBlock id="oc-import-a" code={IMPORT_A} />
              <CodeBlock id="oc-import-b" code={IMPORT_B} />
            </div>
          </div>

          <div>
            <p style={S.sectionLabel}>Uso</p>
            <CodeBlock id="oc-usage" code={USAGE} />
          </div>

          <div>
            <p style={S.sectionLabel}>Árbol HTML semántico</p>
            <CodeBlock id="oc-html" code={HTML_TREE} />
          </div>

          <div>
            <p style={S.sectionLabel}>Instalación (MUST)</p>
            {[{ path: "src/components/OfferCard/OfferCard.tsx", desc: "Self-contained — pprice + mini-like embebidos" }, { path: "src/components/OfferCard/index.ts", desc: "Barrel export" }].map(function renderFile(f) {
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

          <div>
            <p style={S.sectionLabel}>Props API</p>
            <table style={S.table}>
              <thead><tr>{["Prop","Tipo","Req","Descripción"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {PROPS.map(function renderRow(r) {
                  return (
                    <tr key={r.name}>
                      <td style={S.tdMono}>{r.name}</td>
                      <td style={{ ...S.tdMono, color: "#7c3aed" }}>{r.type}</td>
                      <td style={{ ...S.td, color: r.req ? "#dc2626" : "#94a3b8", fontWeight: r.req ? 700 : 400 }}>{r.req ? "✓" : "—"}</td>
                      <td style={S.tdMuted}>{r.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <p style={S.sectionLabel}>Variantes (170×{"{"}auto{"}"} px)</p>
            <table style={S.table}>
              <thead><tr>{["Variante","Pill","Barra decorativa","Animación"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {VARIANTS.map(function renderRow(r) {
                  return (
                    <tr key={r.variant}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.variant}</td>
                      <td style={S.tdMuted}>{r.pill}</td>
                      <td style={S.tdMuted}>{r.barStyle}</td>
                      <td style={S.tdMuted}>{r.animation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <p style={S.sectionLabel}>Estados</p>
            <table style={S.table}>
              <thead><tr>{["Estado","Trigger","Transform","Shadow"].map(function renderTh(h) { return <th key={h} style={S.th}>{h}</th>; })}</tr></thead>
              <tbody>
                {STATES.map(function renderRow(r) {
                  return (
                    <tr key={r.state}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{r.state}</td>
                      <td style={S.tdMono}>{r.trigger}</td>
                      <td style={S.tdMono}>{r.transform}</td>
                      <td style={S.tdMuted}>{r.shadow}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <p style={S.sectionLabel}>Tokens CSS mínimos</p>
            <CodeBlock id="oc-tokens" code={TOKENS_MIN} />
          </div>

          <div>
            <p style={S.sectionLabel}>Guía sugerida</p>
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

          <div>
            <p style={S.sectionLabel}>QA checklist</p>
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

          <div style={S.footer}>
            <p style={S.footerText}>Generado por Concorde · OfferCard · VoyagerDS · 2026-05-28</p>
          </div>
        </div>
      )}
    </div>
  );
}
