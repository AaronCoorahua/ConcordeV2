# Skill: concorde
**Maquetador de componentes — Preview + Figma → código production-ready + handoff portable**
**Autónomo · Portable · Zero dependencias externas al repo**

---

## Activación
```
/concorde <NombreComponente>
/concorde Button
/concorde LikeButton --variant sm-guest
/concorde Button --all-variants
```

---

## Output por componente (SIEMPRE los 4 archivos)

```
{output_dir}/{ComponentName}/
  {ComponentName}.tsx          ← componente (self-contained, zero deps salvo React)
  {ComponentName}Handoff.tsx   ← panel spec/handoff (SOLO React — funciona en cualquier repo)
  index.ts                     ← barrel export
  README.md                    ← spec en markdown (legible sin servidor)

src/app/handoff/{componentname}/
  page.tsx                     ← "use client" — importa {ComponentName}Handoff y lo renderiza
```

**Regla crítica:** `{ComponentName}Handoff.tsx` solo puede importar de `react` y `react/jsx-runtime`.
CERO imports de componentes del repo, CERO Tailwind, CERO tokens DS.
Usa inline styles propios. Funciona en cualquier React/Next.js app.

---

## Arquitectura de agentes

```
concorde-manifest.json  +  concorde-config.json
         ↓
Agent 1 — Extractor       → ComponentSpec JSON
         ↓ (paralelo)
    Preview (Chrome MCP)  +  Figma MCP (si hay node_id)
         ↓
Agent 2 — Layout Coder    → {ComponentName}.tsx (estructura + estilos)
         ↓
Agent 3 — Interaction Coder → {ComponentName}.tsx v2 (estados + animaciones)
         ↓
Agent 4 — Token Mapper    → actualiza .claude/concorde/token-map.json
         ↓
Agent 5 — File Writer     → escribe los 4 archivos + page.tsx
```

---

## PASO 0 — Inicialización (SIEMPRE primero)

### 0.1 Leer manifest
Leer `concorde-manifest.json` en la raíz del repo.
Si no existe → ERROR: "Ejecuta el setup del preview primero".

Extraer del manifest para el componente solicitado:
- `preview_base_url` + `preview_anchor` → URL de navegación
- `variants` → lista de variantes a procesar
- `states` → estados por variante
- `has_interactive_demo` → si hay demo clickeable
- `figma_node_id` → si está vacío, skip Figma (solo preview)

### 0.2 Leer config de código
Leer `concorde-config.json` en la raíz del repo.
Si no existe → CREAR con defaults (ver estructura abajo) y avisar al usuario.

### 0.3 Leer token map acumulado
Leer `.claude/concorde/token-map.json`.
Si no existe → inicializar vacío `{ "version": "1", "tokens": {}, "typography": {}, "spacing": {} }`.

---

## PASO 1 — Agent 1: Extractor

### Fuente A — Preview (SIEMPRE)

Navegar con `mcp__Claude_in_Chrome__navigate` a:
```
{preview_base_url}{preview_anchor}
```

Para cada estado del componente:
1. Screenshot del estado `data-concorde-state="default"`
2. Inspeccionar CSS con `mcp__Claude_in_Chrome__javascript_tool`:
```javascript
const el = document.querySelector('[data-concorde-component="{Nombre}"][data-concorde-variant="{variant}"]');
const states = {};
el.querySelectorAll('[data-concorde-state]').forEach(s => {
  const computed = window.getComputedStyle(s.querySelector('button, a, [role]') || s);
  states[s.dataset.concordeState] = {
    backgroundColor: computed.backgroundColor,
    color: computed.color,
    borderRadius: computed.borderRadius,
    padding: computed.padding,
    fontSize: computed.fontSize,
    fontFamily: computed.fontFamily,
    fontWeight: computed.fontWeight,
    transition: computed.transition,
    transform: computed.transform,
    opacity: computed.opacity,
    boxShadow: computed.boxShadow,
    border: computed.border,
    width: computed.width,
    height: computed.height,
    gap: computed.gap,
    backgroundImage: computed.backgroundImage,
  };
});
return JSON.stringify(states, null, 2);
```
3. Si `has_interactive_demo: true` → navegar al demo, hover + click para capturar animaciones reales

### Fuente B — Figma MCP (solo si figma_node_id no vacío)

```
mcp__f3f807ad__get_design_context(node_id)
```

Extraer:
- Auto-layout: direction, gap, padding, alignment
- Border radius exacto
- Variantes y sus propiedades expuestas
- Prototype interactions (trigger, action, animation type + duration)
- Tipografía: family, size, weight, line-height, letter-spacing

**Figma manda sobre preview en conflicto visual.**
**Preview manda sobre Figma en conflicto de comportamiento/animación.**

### Output del Extractor: ComponentSpec JSON

```json
{
  "component": "Button",
  "variants": ["primary", "secondary", "ghost"],
  "dimensions": { "width": "auto", "height": "48px" },
  "spacing": { "paddingX": "56px", "paddingY": "0", "gap": "8px" },
  "typography": { "family": "Plus Jakarta Sans", "size": "15px", "weight": "600" },
  "borderRadius": "9999px",
  "states": {
    "default": { "background": "#ED8936", "color": "#FFFFFF" },
    "hover": { "transform": "translateY(-2px) scale(1.02)" },
    "pressed": { "transform": "scale(0.97) translateY(1px)" },
    "disabled": { "background": "#E1E3E2", "color": "#99A1AF", "cursor": "not-allowed" },
    "focus-visible": { "outline": "2px solid #AE8EFF", "outlineOffset": "3px" }
  },
  "animations": {
    "hover_transition": "transform 0.2s cubic-bezier(0.25,0.8,0.25,1)",
    "gradient_animated": true
  },
  "css_custom_properties": {
    "--vbtn-angle": "135deg",
    "--vbtn-stop-a": "#ED8936",
    "--vbtn-stop-b": "#8460E5"
  },
  "existing_token_matches": []
}
```

---

## PASO 2 — Agent 2: Layout Coder

**Input:** ComponentSpec JSON + concorde-config.json + token-map.json

**Reglas de código:** vienen de concorde-config.json — el config del repo GANA siempre.

**Patrón de estructura:**

```tsx
// {ComponentName}.tsx — Generado por Concorde
// Fuentes: Preview {preview_url} + Figma {figma_node_id}
// Generado: {fecha}
// EDITAR LIBREMENTE después de generar

"use client";

import type { JSX, ReactNode } from "react";

type {Nombre}Variant = "primary" | "secondary" | "ghost";
type {Nombre}Size = "md" | "sm";

export interface {Nombre}Props {
  variant?: {Nombre}Variant;
  size?: {Nombre}Size;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

// Estilos self-contained en constante — NO importar CSS externo
const {NOMBRE}_STYLES = `
  /* estilos exactos del preview aquí */
`;

let stylesInjected = false;

export default function {Nombre}({ ... }: {Nombre}Props): JSX.Element {
  // inyectar estilos una vez (SSR + CSR)
  if (typeof document !== "undefined" && !stylesInjected) {
    if (!document.getElementById("concorde-{nombre}-styles")) {
      const el = document.createElement("style");
      el.id = "concorde-{nombre}-styles";
      el.textContent = {NOMBRE}_STYLES;
      document.head.appendChild(el);
    }
    stylesInjected = true;
  }

  return (
    <>
      <style id="concorde-{nombre}-styles-ssr" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: {NOMBRE}_STYLES }} />
      <button className={...} ...>
        {children}
      </button>
    </>
  );
}
```

---

## PASO 3 — Agent 3: Interaction Coder

**Input:** Component.tsx del paso 2 + `animations` del ComponentSpec

Agregar estados interactivos exactos del preview:

```tsx
// prefers-reduced-motion — SIEMPRE, sin excepción
@media (prefers-reduced-motion: reduce) {
  .clase { transition: none; }
}
```

Agregar en CSS todos los estados del ComponentSpec:
- `:hover` con transform + colores exactos
- `:active` con pressed feel
- `:focus-visible` con focus ring WCAG (outline, no box-shadow)
- `:disabled` con cursor not-allowed + estilos desactivados

---

## PASO 4 — Agent 4: Token Mapper

**Input:** ComponentSpec JSON + `.claude/concorde/token-map.json` actual

Para cada color, tipografía y spacing del ComponentSpec:
1. Buscar si ya existe en token-map.json
2. Si existe → anotar en README del componente
3. Si no → agregar al map

```json
{
  "version": "1",
  "generated_by": "concorde",
  "tokens": {
    "#ED8936": { "suggested_name": "--color-brand-orange", "first_seen": "Button/primary/default", "components": ["Button"] }
  },
  "typography": {
    "Plus Jakarta Sans / 15px / 600": { "suggested_name": "--text-label-lg", "first_seen": "Button/md", "components": ["Button"] }
  },
  "spacing": {
    "56px": { "suggested_name": "--space-button-px-md", "first_seen": "Button/md/paddingX", "components": ["Button"] }
  }
}
```

---

## PASO 5 — Agent 5: File Writer

Escribir exactamente estos archivos:

### Archivo 1: `{output_dir}/{ComponentName}/{ComponentName}.tsx`
El componente generado por Agentes 2 y 3. Self-contained.

### Archivo 2: `{output_dir}/{ComponentName}/{ComponentName}Handoff.tsx`

**REGLA ABSOLUTA:** Solo imports de `react`. CERO imports del repo.
Inline styles en cada elemento. Sin Tailwind. Sin tokens externos.

Estructura exacta:

```tsx
"use client";

/**
 * {ComponentName}Handoff — Panel Spec & Handoff generado por Concorde
 * Portable: solo depende de React. Funciona en cualquier repo.
 * Generado: {fecha}
 */

import { useState } from "react";
import type { JSX } from "react";

// ─── Estilos del panel (inline, zero deps) ────────────────────────────────

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

// ─── Mini CodeBlock (inline, sin deps) ──────────────────────────────────

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

// ─── Data — llenar con los valores reales del componente ─────────────────

// IMPORT A — import directo
const IMPORT_A = `import {ComponentName} from "@/components/{ComponentName}/{ComponentName}";`;

// IMPORT B — barrel
const IMPORT_B = `import { {ComponentName} } from "@/components/{ComponentName}";`;

// USAGE — ejemplos de cada variante/estado
const USAGE = `// Completar con ejemplos reales del ComponentSpec`;

// SWAP — cómo reemplazar el componente legacy si aplica
const SWAP = `// Antes\n// import OldComponent from "...";\n\n// Después\nimport {ComponentName} from "@/components/{ComponentName}/{ComponentName}";`;

// HTML_TREE — árbol de la estructura DOM del componente
const HTML_TREE = `// Completar con árbol HTML real del componente`;

// TOKENS_MIN — CSS variables mínimas requeridas
const TOKENS_MIN = `/* Tokens mínimos — reemplazar con tu sistema de tokens */\n:root {\n  /* completar */\n}`;

// VARIANTES
interface VariantRow { name: string; cssClass: string; height: string; note: string; }
const VARIANTS: VariantRow[] = [
  { name: "primary", cssClass: ".cls-primary", height: "48px", note: "CTA principal" },
  // agregar variantes reales del ComponentSpec
];

// ESTADOS
interface StateRow { state: string; selector: string; transform: string; effects: string; }
const STATES: StateRow[] = [
  { state: "default",   selector: ".cls:default",       transform: "—",                          effects: "—" },
  { state: "hover",     selector: ".cls:hover",         transform: "translateY(-2px) scale(1.02)", effects: "glow, color shift" },
  { state: "active",    selector: ".cls:active",        transform: "scale(0.97) translateY(1px)", effects: "sombra inset" },
  { state: "focus",     selector: ".cls:focus-visible", transform: "—",                          effects: "outline 2px, offset 3px" },
  { state: "disabled",  selector: ".cls:disabled",      transform: "none",                       effects: "bg gris, cursor not-allowed" },
];

// TOKENS DE COLOR
interface TokenRow { zone: string; token: string; }
const COLOR_TOKENS: TokenRow[] = [
  // llenar con valores reales del ComponentSpec
  { zone: "Fondo principal", token: "var(--color-primary, #COMPLETAR)" },
];

// QA CHECKLIST
const QA: string[] = [
  "Renderiza correcto en todos los variantes",
  "Hover: transform visible",
  "Active/pressed: sombra inset",
  "Focus ring visible al navegar con Tab (outline, no box-shadow)",
  "Disabled: sin interacción, cursor not-allowed",
  "prefers-reduced-motion: transition: none",
  "Sin FOUC — estilos presentes en SSR",
  "Múltiples instancias: sin duplicación de <style>",
];

// ─── Main ────────────────────────────────────────────────────────────────

export function {ComponentName}Handoff(): JSX.Element {
  const [open, setOpen] = useState(true);

  function handleToggle(): void {
    setOpen(function prev(p) { return !p; });
  }

  return (
    <div style={S.panel}>

      {/* Header toggle */}
      <button type="button" onClick={handleToggle} style={S.header}>
        <div style={S.headerLeft}>
          <span>📋</span>
          <span style={S.title}>Spec & Handoff — {ComponentName}</span>
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
            <p style={S.note}>El componente incluye fallbacks — funciona sin tokens, pero úsalos en producción.</p>
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
              <span style={{ color: "#2563eb" }}>src/{ComponentName}/{ComponentName}.tsx</span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
```

**Instrucción al generar:** reemplazar TODO el contenido placeholder (`{ComponentName}`, data arrays, strings) con los valores reales del ComponentSpec. El template de arriba es la estructura — los datos son del Extractor.

### Archivo 3: `{output_dir}/{ComponentName}/index.ts`

```ts
export { default as {ComponentName} } from "./{ComponentName}";
export { {ComponentName}Handoff } from "./{ComponentName}Handoff";
export type { {ComponentName}Props } from "./{ComponentName}";
```

### Archivo 4: `{output_dir}/{ComponentName}/README.md`

```markdown
# {ComponentName} — Concorde DONE

**Generado:** {fecha}
**Preview fuente:** {preview_url}
**Figma node:** {figma_node_id | "—"}

## Variantes
{listar variantes del ComponentSpec}

## Estados
{listar estados del ComponentSpec}

## Para ver el handoff completo
```bash
# En tu app Next.js — visita:
http://localhost:3000/handoff/{componentname}
```

## Token map (pendientes de tokenizar)
{listar valores de token-map.json nuevos de este componente}
```

### Archivo 5: `src/app/handoff/{componentname}/page.tsx`

```tsx
/**
 * /handoff/{componentname}
 * Generado por Concorde — NO EDITAR (regenerar con /concorde {ComponentName})
 * Abre este archivo en tu browser para ver la spec completa del componente.
 */

import type { JSX } from "react";
import { {ComponentName}Handoff } from "@/{output_dir}/{ComponentName}";
import { {ComponentName} } from "@/{output_dir}/{ComponentName}";

export default function {ComponentName}HandoffPage(): JSX.Element {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>{ComponentName}</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec & Handoff — todo lo necesario para implementar este componente.
        </p>
      </div>

      {/* Preview del componente */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
            preview
          </span>
        </div>
        <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          {/* Renderizar variantes del componente aquí */}
          <{ComponentName} />
        </div>
      </div>

      {/* Panel handoff */}
      <{ComponentName}Handoff />

    </main>
  );
}
```

---

## concorde-config.json — estructura default

```json
{
  "version": "1",
  "project": "nombre-del-proyecto",
  "stack": {
    "framework": "nextjs",
    "typescript": true,
    "styling": "tailwind-v4",
    "animation": "css-native"
  },
  "code_rules": {
    "no_any": true,
    "no_ternaries": false,
    "no_anonymous_functions": false,
    "no_hardcoded_hex": false,
    "spacing_grid": 8,
    "use_container_queries": false
  },
  "output_dir": "src/components",
  "token_system": false,
  "allowed_dependencies": ["react", "next"],
  "typescript_strict": true
}
```

Para Voyager:
```json
{
  "code_rules": {
    "no_any": true,
    "no_ternaries": true,
    "no_anonymous_functions": true,
    "no_hardcoded_hex": true,
    "spacing_grid": 8,
    "use_container_queries": true
  },
  "output_dir": "src/features",
  "token_system": true,
  "allowed_dependencies": ["react", "next", "clsx", "tailwind-merge"]
}
```

---

## Límites de autonomía

Concorde actúa solo dentro de:
- `{output_dir}/{ComponentName}/` → los 4 archivos del componente
- `src/app/handoff/{componentname}/` → la página de vista

NUNCA modifica:
- `package.json`, `tsconfig.json`, ni configs del repo
- Archivos fuera de `output_dir` (excepto la ruta `/handoff/`)
- Otros componentes existentes
- Solo `.claude/concorde/token-map.json` fuera de output_dir

---

## Puntos de intervención humana

1. **Antes de escribir** — si preview falla o `data-concorde-*` no encontrado → STOP
2. **Después de generar** — mostrar resumen de archivos antes de escribir a disco
3. **Token map** — solo registra, nunca auto-aplica. El dev decide cuándo tokenizar.

---

## Flujo completo ejemplo

```
/concorde Button

0. Lee manifest → Button · preview en localhost:3000/preview/components/pase1#button-md
0. Lee config → code_rules del repo
0. Lee token-map → valores previos

1. Extractor → navega preview → extrae CSS computado de cada estado → ButtonSpec.json
2. Layout Coder → Button.tsx (estructura + CSS self-contained)
3. Interaction Coder → agrega :hover :active :focus-visible :disabled + reduced-motion
4. Token Mapper → registra valores en token-map.json
5. File Writer:
   → muestra resumen al usuario → pide confirmación
   → escribe src/components/Button/Button.tsx
   → escribe src/components/Button/ButtonHandoff.tsx   ← portable, solo React
   → escribe src/components/Button/index.ts
   → escribe src/components/Button/README.md
   → escribe src/app/handoff/button/page.tsx

Dev abre localhost:3000/handoff/button → spec completa lista.
```

---

## Red flags — STOP si ocurre

- Preview URL no carga → avisar, no inventar código
- `data-concorde-component` no en DOM → componente no marcado, no adivinar
- Figma MCP falla → continuar solo con preview, anotar en README
- Config dice `no_hardcoded_hex: true` pero no hay token system → avisar antes de generar
- `{ComponentName}Handoff.tsx` tiene imports distintos a `react` → REESCRIBIR, rompe portabilidad
