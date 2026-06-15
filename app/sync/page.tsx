"use client";

import { useMemo, useState } from "react";
import type { JSX } from "react";
import manifest from "../../concorde-manifest.json";

// ── Datos del manifest (sugerencias de nombres) ─────────────────────────────

const MANIFEST = manifest as { components: Record<string, unknown> };
const EXISTING_COMPONENTS = Object.keys(MANIFEST.components);

// ── Helpers ─────────────────────────────────────────────────────────────────

const STATE_OPTIONS = ["default", "hover", "pressed", "disabled", "focus", "skeleton"] as const;

interface LinkRow {
  url: string;
  state: string;
}

// "https://www.figma.com/design/KEY/Nombre?node-id=1807-14907&t=..." → "1807-14907"
function parseNodeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    return u.searchParams.get("node-id");
  } catch {
    return null;
  }
}

function parseFileKey(url: string): string | null {
  const m = url.match(/figma\.com\/(?:design|file)\/([A-Za-z0-9]+)/i);
  if (m) return m[1];
  return null;
}

function buildPrompt(component: string, action: string, rows: LinkRow[]): string {
  const valid = rows.filter(function (r) { return parseNodeId(r.url) !== null; });
  if (!component.trim() || valid.length === 0) {
    return "⚠ Completa el nombre del componente y pega al menos 1 link válido de Figma (debe tener node-id en la URL).";
  }

  const actionTxt =
    action === "crear"
      ? `Crea el componente NUEVO "${component.trim()}" en Concorde desde Figma.`
      : `Actualiza el componente "${component.trim()}" de Concorde con la verdad de Figma.`;

  const statesTxt = valid
    .map(function (r) { return `- ${r.state}: ${r.url.trim()}`; })
    .join("\n");

  const staticNote =
    valid.length === 1
      ? "\nEs un componente ESTÁTICO (un solo estado)."
      : `\nCada link es un ESTADO del componente (${valid.map(function (r) { return r.state; }).join(", ")}).`;

  const animNote =
    action === "crear"
      ? "Para la interacción/animación usa el patrón Concorde más cercano (ej. el de Button) y déjala documentada."
      : "MANTÉN intacta la interacción/animación que ya tiene el componente en Concorde (hover/active/focus/transitions).";

  return (
    `${actionTxt}${staticNote}\n\n` +
    `Estados → links de Figma:\n${statesTxt}\n\n` +
    `Usa /concorde-sync: extrae cada nodo con figma-extract.mjs (acepta los links tal cual), ` +
    `toma el visual EXACTO de Figma — tipografía, width/height del botón real (frame interno, no el contenedor), ` +
    `padding, radius, colores por estado, íconos exportados como SVG real — y compáralo contra Concorde. ` +
    `${animNote} ` +
    `Genera/actualiza los archivos del componente + FIGMA-AUDIT.md + el handoff en /handoff/${component.trim().toLowerCase()} ` +
    `con el código completo documentado para que el developer lo copie tal cual.`
  );
}

function buildCommand(component: string, rows: LinkRow[]): string {
  const valid = rows.filter(function (r) { return parseNodeId(r.url) !== null; });
  if (valid.length === 0) return "— pega al menos 1 link válido —";
  const links = valid.map(function (r) { return r.url.trim().split("&t=")[0]; }).join(",");
  return (
    `node .claude/concorde/figma-extract.mjs --node "${links}" --images ` +
    `--out .claude/concorde/_spec-${component.trim() || "Componente"}.json`
  );
}

// ── Estilos ─────────────────────────────────────────────────────────────────

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  .sync-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%);
    font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
    color: #f8fafc;
    padding: 56px 24px 96px;
  }
  .sync-wrap { max-width: 820px; margin: 0 auto; }
  .sync-eyebrow {
    font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: oklch(0.72 0.18 285); margin: 0 0 10px; font-family: monospace;
  }
  .sync-title { font-size: 38px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 12px; }
  .sync-sub { font-size: 16px; color: rgba(255,255,255,0.6); margin: 0 0 36px; line-height: 1.65; max-width: 640px; }
  .sync-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; padding: 28px; margin-bottom: 24px;
  }
  .sync-label {
    font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
    color: rgba(255,255,255,0.6); font-family: monospace; display: block; margin-bottom: 8px;
  }
  .sync-label small { color: rgba(255,255,255,0.35); font-weight: 500; text-transform: none; letter-spacing: 0; }
  .sync-input {
    width: 100%;
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.16); border-radius: 10px;
    padding: 14px 16px; color: #f8fafc; font-size: 16px; font-family: monospace;
    outline: none; transition: border-color 0.15s;
  }
  .sync-input:focus { border-color: oklch(0.72 0.18 285); }
  .sync-input::placeholder { color: rgba(255,255,255,0.25); font-size: 14px; }
  .sync-select {
    background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.16); border-radius: 10px;
    padding: 14px 12px; color: #f8fafc; font-size: 15px; font-family: monospace;
    outline: none; cursor: pointer; min-width: 130px;
  }
  .sync-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; }
  .sync-row-main { flex: 1; }
  .sync-node-ok { font-size: 13px; color: #4ade80; font-family: monospace; margin: 6px 0 0; }
  .sync-node-bad { font-size: 13px; color: rgba(255,255,255,0.3); font-family: monospace; margin: 6px 0 0; }
  .sync-remove {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 10px;
    color: rgba(255,255,255,0.6); font-size: 18px; width: 48px; height: 51px; cursor: pointer;
    transition: all 0.15s; flex-shrink: 0;
  }
  .sync-remove:hover { background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.5); color: #fca5a5; }
  .sync-add {
    background: rgba(255,255,255,0.08); border: 1px dashed rgba(255,255,255,0.3); border-radius: 10px;
    color: rgba(255,255,255,0.75); font-size: 15px; font-weight: 600; padding: 12px 20px;
    cursor: pointer; width: 100%; transition: all 0.15s; font-family: inherit;
  }
  .sync-add:hover { background: rgba(255,255,255,0.14); border-color: oklch(0.72 0.18 285); }
  .sync-toggle { display: flex; gap: 10px; }
  .sync-toggle-btn {
    flex: 1; padding: 14px 18px; border-radius: 10px; font-size: 15px; font-weight: 700;
    font-family: inherit; cursor: pointer; transition: all 0.15s;
    background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.55);
  }
  .sync-toggle-btn.active {
    background: linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.55 0.22 285));
    border-color: rgba(255,255,255,0.4); color: #fff;
  }
  .sync-out-label {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
    color: rgba(255,255,255,0.6); font-family: monospace; margin-bottom: 10px;
  }
  .sync-pre {
    background: #0b1020; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
    padding: 18px 20px; font-family: monospace; font-size: 14.5px; line-height: 1.7;
    color: #e2e8f0; white-space: pre-wrap; word-break: break-word; margin: 0;
  }
  .sync-copy {
    font-size: 13px; font-weight: 700; font-family: monospace; padding: 8px 18px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.1); color: #f8fafc;
    cursor: pointer; transition: background 0.15s;
  }
  .sync-copy:hover { background: rgba(255,255,255,0.2); }
  .sync-copy.copied { background: #16a34a; border-color: #16a34a; }
  .sync-step {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.55 0.22 285));
    font-size: 13px; font-weight: 700; margin-right: 10px;
  }
  .sync-filekey { font-size: 13px; color: rgba(255,255,255,0.4); font-family: monospace; margin: 10px 0 0; }
  @media (max-width: 640px) {
    .sync-title { font-size: 28px; }
    .sync-row { flex-wrap: wrap; }
  }
`;

// ── Componente ──────────────────────────────────────────────────────────────

function CopyBlock({ label, text }: { label: string; text: string }): JSX.Element {
  const [copied, setCopied] = useState(false);
  function copy(): void {
    void navigator.clipboard.writeText(text).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 1800);
    });
  }
  return (
    <div className="sync-card">
      <div className="sync-out-label">
        <span>{label}</span>
        <button type="button" className={copied ? "sync-copy copied" : "sync-copy"} onClick={copy}>
          {copied ? "✓ copiado" : "copiar"}
        </button>
      </div>
      <pre className="sync-pre">{text}</pre>
    </div>
  );
}

export default function SyncPromptBuilder(): JSX.Element {
  const [component, setComponent] = useState("");
  const [action, setAction] = useState<"crear" | "actualizar">("actualizar");
  const [rows, setRows] = useState<LinkRow[]>([{ url: "", state: "default" }]);

  function setRow(i: number, patch: Partial<LinkRow>): void {
    setRows(function update(prev) {
      return prev.map(function (r, idx) { return idx === i ? { ...r, ...patch } : r; });
    });
  }

  function addRow(): void {
    setRows(function (prev) {
      const next = STATE_OPTIONS[Math.min(prev.length, STATE_OPTIONS.length - 1)];
      return [...prev, { url: "", state: next }];
    });
  }

  function removeRow(i: number): void {
    setRows(function (prev) {
      return prev.length > 1 ? prev.filter(function (_, idx) { return idx !== i; }) : prev;
    });
  }

  const fileKey = useMemo(function () {
    for (const r of rows) {
      const k = parseFileKey(r.url);
      if (k) return k;
    }
    return null;
  }, [rows]);

  const prompt = useMemo(function () { return buildPrompt(component, action, rows); }, [component, action, rows]);
  const command = useMemo(function () { return buildCommand(component, rows); }, [component, rows]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="sync-page">
        <div className="sync-wrap">
          <p className="sync-eyebrow">Concorde · Figma Sync</p>
          <h1 className="sync-title">Trae un componente desde Figma</h1>
          <p className="sync-sub">
            Pega los <strong>links de Figma</strong> (clic derecho en el frame → Copy link). Si el componente
            tiene estados (hover, pressed…), pega un link por estado. Si es estático, con un solo link basta.
            Copia el prompt y pégaselo a Claude — él hace el resto.
          </p>

          {/* Paso 1: nombre + acción */}
          <div className="sync-card">
            <label className="sync-label"><span className="sync-step">1</span>Nombre del componente</label>
            <input
              className="sync-input"
              value={component}
              onChange={function (e) { setComponent(e.target.value); }}
              placeholder="Button, BadgeStatus, OfferCard…"
              list="existing-components"
            />
            <datalist id="existing-components">
              {EXISTING_COMPONENTS.map(function (n) { return <option key={n} value={n} />; })}
            </datalist>

            <div style={{ height: 20 }} />

            <label className="sync-label"><span className="sync-step">2</span>¿Qué hacemos?</label>
            <div className="sync-toggle">
              <button
                type="button"
                className={action === "actualizar" ? "sync-toggle-btn active" : "sync-toggle-btn"}
                onClick={function () { setAction("actualizar"); }}
              >
                Actualizar existente
              </button>
              <button
                type="button"
                className={action === "crear" ? "sync-toggle-btn active" : "sync-toggle-btn"}
                onClick={function () { setAction("crear"); }}
              >
                Crear nuevo
              </button>
            </div>
          </div>

          {/* Paso 2: links */}
          <div className="sync-card">
            <label className="sync-label">
              <span className="sync-step">3</span>Links de Figma{" "}
              <small>— 1 link = estático · varios links = 1 por estado</small>
            </label>

            {rows.map(function renderRow(r, i) {
              const nodeId = parseNodeId(r.url);
              return (
                <div className="sync-row" key={i}>
                  <select
                    className="sync-select"
                    value={r.state}
                    onChange={function (e) { setRow(i, { state: e.target.value }); }}
                  >
                    {STATE_OPTIONS.map(function (s) { return <option key={s} value={s}>{s}</option>; })}
                  </select>
                  <div className="sync-row-main">
                    <input
                      className="sync-input"
                      value={r.url}
                      onChange={function (e) { setRow(i, { url: e.target.value }); }}
                      placeholder="https://www.figma.com/design/…?node-id=1807-14907"
                    />
                    {r.url.trim() !== "" && (
                      nodeId !== null
                        ? <p className="sync-node-ok">✓ nodo {nodeId}</p>
                        : <p className="sync-node-bad">link sin node-id — copia el link del frame exacto</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sync-remove"
                    onClick={function () { removeRow(i); }}
                    aria-label="Quitar link"
                    title="Quitar link"
                  >
                    ✕
                  </button>
                </div>
              );
            })}

            <button type="button" className="sync-add" onClick={addRow}>
              + Agregar otro estado
            </button>

            {fileKey !== null && (
              <p className="sync-filekey">archivo detectado: {fileKey}</p>
            )}
          </div>

          {/* Salidas */}
          <CopyBlock label="📋 Prompt — pégaselo a Claude" text={prompt} />
          <CopyBlock label="⌨️ Comando CLI (referencia)" text={command} />
        </div>
      </div>
    </>
  );
}
