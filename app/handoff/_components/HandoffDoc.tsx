/**
 * HandoffDoc — plantilla de las páginas /handoff de los componentes del Index (mismo formato que las demás:
 * vista previa, instalación, uso, ejemplos, API y código). Usa Preview, CodeBlock, InstallCommand y PropsTable.
 * Aplica Plus Jakarta Sans completa (500 a 800), como el bloque Index.
 */
import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";
import { indexFont } from "@/app/blocks/index/font";

export interface HandoffExample {
  title: string;
  description?: string;
  tone?: "light" | "dark";
  minHeight?: number;
  node: ReactNode;
  code: string;
}

export interface HandoffDocProps {
  title: string;
  summary: string;
  /** Texto de origen o notas (debajo del resumen). */
  note?: ReactNode;
  hero: { node: ReactNode; code: string; tone?: "light" | "dark"; minHeight?: number };
  installName: string;
  usage: string;
  examples?: HandoffExample[];
  api: PropRow[];
  /** Archivos del componente, relativos a la raíz (p. ej. "src/components/LightBar.tsx"). */
  files: string[];
}

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const h2 = { fontSize: 20, fontWeight: 700, color: "var(--ui-ink)", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "var(--ui-body)", lineHeight: 1.6, margin: 0 } as const;

export default function HandoffDoc({ title, summary, note, hero, installName, usage, examples = [], api, files }: HandoffDocProps): JSX.Element {
  return (
    <main className={indexFont.variable} style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "var(--ui-ink)" }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{title}</h1>
      <p style={{ ...muted, fontSize: 16 }}>{summary}</p>
      {note ? <p style={{ ...muted, fontSize: 13, marginTop: 8 }}>{note}</p> : null}

      <div style={{ marginTop: 28 }}>
        <Preview code={hero.code} tone={hero.tone} minHeight={hero.minHeight ?? 240}>{hero.node}</Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name={installName} />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={usage} />

      {examples.length ? (
        <>
          <h2 style={h2}>Ejemplos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {examples.map(function renderExample(ex) {
              return (
                <div key={ex.title}>
                  <h3 style={h3}>{ex.title}</h3>
                  {ex.description ? <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p> : <div style={{ height: 12 }} />}
                  <Preview tone={ex.tone} code={ex.code} minHeight={ex.minHeight ?? 180}>{ex.node}</Preview>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      <h2 style={h2}>API</h2>
      <PropsTable rows={api} />

      <h2 style={h2}>Código del componente</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {files.map(function renderFile(rel) {
          const name = rel.split("/").pop() ?? rel;
          return (
            <details key={rel}>
              <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid var(--ui-border)", borderRadius: 10, background: "var(--ui-subtle)", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>{name}</code> completo</span>
                <span style={{ color: "var(--ui-muted)" }}>▾</span>
              </summary>
              <div style={{ marginTop: 12 }}>
                <CodeBlock code={readSrc(rel)} filename={name} maxHeight={520} />
              </div>
            </details>
          );
        })}
      </div>
    </main>
  );
}
