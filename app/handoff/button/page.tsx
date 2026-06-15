/**
 * /handoff/button
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Button)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Button, ButtonHandoff } from "@/src/components/Button";
import CodeViewer from "@/app/handoff/_components/CodeViewer";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Button/Button.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Button.tsx en build.";
  }
}

export default function ButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Button</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec & Handoff — 8 variantes extraídas de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            voyager-ds.vercel.app/preview/components/pase1
          </code>
        </p>
      </div>

      {/* Preview — primary */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · md</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>primary · negotiable · secondary · ghost · outline</span>
        </div>
        <div style={{ padding: "32px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Button variant="primary">Participa</Button>
          <Button variant="negotiable">Negocia ahora</Button>
          <Button variant="secondary">Ingresa</Button>
          <Button variant="ghost">Ver Ofertas relacionadas</Button>
          <Button variant="outline">Regístrate</Button>
        </div>
      </div>

      {/* Preview — sm */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · sm</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm-guest · sm-logged-in · secondary-sm</span>
        </div>
        <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Button variant="sm-guest">Ingresa</Button>
          <Button variant="sm-logged-in" username="ZAEX5G" />
          <Button variant="secondary-sm">Agenda tu visita</Button>
        </div>
      </div>

      {/* Preview — disabled */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · disabled</span>
        </div>
        <div style={{ padding: "24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Button variant="primary" disabled>Participa</Button>
          <Button variant="secondary" disabled>Ingresa</Button>
          <Button variant="ghost" disabled>Ver Ofertas relacionadas</Button>
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
        filename="Button.tsx"
        note="Visual de Figma + animación de Concorde. Pégalo como src/components/Button/Button.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <ButtonHandoff sourceCode={source} />

    </main>
  );
}
