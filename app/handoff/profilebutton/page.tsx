/**
 * /handoff/profilebutton
 * Generado por Concorde — NO EDITAR (regenerar con /concorde ProfileButton)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ProfileButton from "@/src/components/ProfileButton/ProfileButton";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ProfileButton/ProfileButton.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ProfileButton.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./ProfileButton";
export type { ProfileButtonProps } from "./ProfileButton";
`;

export default function ProfileButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>ProfileButton</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec & Handoff — botón de navegación a perfil (label morado + círculo con chevron) extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · ProfileButton (Default · Hover · Pressed)
          </code>
        </p>
      </div>

      {/* Preview — interactivo */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · interactivo</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>pasa el mouse / mantén presionado</span>
        </div>
        <div style={{ padding: "48px 24px", background: "#fff", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <ProfileButton />
        </div>
      </div>

      {/* Preview — estados */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · estados</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default · disabled · custom label</span>
        </div>
        <div style={{ padding: "32px 24px", background: "#fff", display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 20, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>Default</span>
          <ProfileButton />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>Disabled</span>
          <ProfileButton disabled />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>Custom label</span>
          <ProfileButton>Ver mi cuenta</ProfileButton>
        </div>
      </div>

      {/* Preview — como link */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · href (renderiza &lt;a&gt;)</span>
        </div>
        <div style={{ padding: "32px 24px", background: "#fff", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <ProfileButton href="/perfil" />
          <ProfileButton href="/cuenta">Ver mi cuenta</ProfileButton>
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="ProfileButton.tsx"
        note="Visual de Figma + interacción de Concorde (relleno naranja + lift en hover, reduced-motion). Pégalo como src/components/ProfileButton/ProfileButton.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel
        name="ProfileButton"
        description="Botón de navegación a perfil: label morado + círculo 16px con chevron. Self-contained (CSS-in-JS, zero deps). Renderiza <button> o <a> según href."
        source="Figma VOYAGER"
        files={[
          {
            filename: "ProfileButton.tsx",
            code: source,
            level: "must",
            desc: "Componente self-contained (estilos inyectados + SSR fallback).",
          },
          {
            filename: "index.ts",
            code: INDEX_TS,
            level: "opt",
            desc: "Barrel export",
          },
        ]}
        imports={[
          'import ProfileButton from "@/src/components/ProfileButton/ProfileButton";',
          'import ProfileButton from "@/src/components/ProfileButton";',
        ]}
        usage={`// Como botón
<ProfileButton onClick={() => router.push("/perfil")} />

// Como link (renderiza <a>)
<ProfileButton href="/perfil" />

// Label custom
<ProfileButton href="/cuenta">Ver mi cuenta</ProfileButton>`}
        props={[
          { prop: "children", type: "ReactNode", def: '"Ir al Perfil"', note: "Label del botón" },
          { prop: "href", type: "string", def: "—", note: "Si se pasa (y no disabled), renderiza <a> en vez de <button>" },
          { prop: "onClick", type: "MouseEventHandler<HTMLElement>", def: "—", note: "Handler de click" },
          { prop: "disabled", type: "boolean", def: "false", note: "Deshabilita (fuerza render de <button>)" },
          { prop: "className", type: "string", def: '""', note: "Clases extra concatenadas" },
          { prop: '"aria-label"', type: "string", def: "—", note: "Etiqueta accesible" },
        ]}
        states={[
          { state: "Hover", selector: ".pprofilebtn:hover:not(:disabled) .pprofilebtn__circle", transform: "translateY(-1px)", effects: "círculo relleno naranja, chevron blanco, box-shadow 0 8px 16px" },
          { state: "Pressed", selector: ".pprofilebtn:active:not(:disabled)", transform: "translateY(0)", effects: "label + chevron gris #99A1AF, círculo naranja oscuro #B25614→#93420A" },
          { state: "Focus", selector: ".pprofilebtn:focus-visible", transform: "—", effects: "outline none, box-shadow doble anillo (#fff + #8460E5)" },
          { state: "Disabled", selector: ".pprofilebtn:disabled", transform: "—", effects: "cursor not-allowed, label gris, círculo #E1E3E2 con chevron blanco" },
        ]}
        tokens={[
          { zone: "Label (default)", token: "#3B1782 (morado)" },
          { zone: "Chevron (default)", token: "#EF852E (naranja)" },
          { zone: "Anillo del círculo", token: "linear-gradient(135deg, #FF9C3B → #EF852E 40% → #BE3D00)" },
          { zone: "Círculo (hover)", token: "linear-gradient(90deg, #FF9639 → #EF852E 40% → #BE3D00)" },
          { zone: "Círculo (pressed)", token: "linear-gradient(90deg, #B25614 → #93420A)" },
          { zone: "Focus ring", token: "#FFFFFF + #8460E5" },
          { zone: "Disabled círculo", token: "#E1E3E2 / chevron #FFFFFF" },
          { zone: "Gris (pressed/disabled)", token: "#99A1AF" },
        ]}
        qa={[
          "Default: label morado #3B1782, círculo con anillo gradiente naranja y chevron naranja.",
          "Hover (mouse): círculo se rellena de naranja, chevron pasa a blanco, lift de 1px + sombra.",
          "Pressed (:active): label y chevron grises #99A1AF, círculo naranja oscuro, sin lift.",
          "Disabled: cursor not-allowed, label gris, círculo gris #E1E3E2; nunca renderiza <a>.",
          "href (sin disabled): renderiza <a> navegable; sin href renderiza <button type=\"button\">.",
          "focus-visible muestra el doble anillo (#fff + #8460E5) por teclado.",
          "prefers-reduced-motion: reduce desactiva transiciones y el lift de hover.",
          "aria-label se aplica y el círculo/chevron están marcados aria-hidden.",
        ]}
        sourcePath="src/components/ProfileButton/ProfileButton.tsx"
      />

    </main>
  );
}
