"use client";

/**
 * EditorApp — editor visual de correos estilo Elementor/Figma, montado sobre el
 * renderer REAL de producción (prodEmailTemplates.ts):
 *
 *  · Paleta (izquierda): los 23 bloques reales de SECTION_LABELS; clic para
 *    insertar con sus defaults (createSection). También «cargar un correo real»
 *    de los 45 de producción como punto de partida.
 *  · Canvas (centro): el correo completo y vivo; clic en una sección para
 *    seleccionarla (ver EditorCanvas).
 *  · Propiedades (derecha): campos del bloque seleccionado, generados desde su
 *    `content` — con toolbar de estilos de texto (los marcadores del renderer:
 *    **naranja**, __oscuro__, [[morado]]), campos de imagen con upload local
 *    (base64) y URL, y selects donde aplica. Sin selección muestra las props
 *    del correo: asunto + banner/footer/fondo (las tipologías del BannerLab).
 *
 *  «Copiar HTML» exporta con generateEmail + swaps — el mismo pipeline de
 *  producción, sin los marcadores del editor.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { useSearchParams } from "next/navigation";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import EditorCanvas, { CANVAS_CSS, DND_NEW, type EditorCanvasHandle } from "./EditorCanvas";
import RichTextField from "./RichTextField";
import { SECTION_LABELS, createSection, generateEmail, type Section } from "@/src/emails/prodEmailTemplates";
import { renderEdSection, buildEmailFromEd, newHtmlSection, type EdSection } from "@/src/emails/editorSections";
import { EMAILS } from "@/src/emails/prodEmails";
import { SECTION_TYPES, SECTION_DESCRIPTIONS, sectionPreviewDoc } from "@/src/emails/sectionPreviews";
import { BANNER_OPTIONS, FOOTER_OPTIONS, buildBannerFor, buildFooterFor, swapEmailHeader, swapEmailFooter, type BannerText } from "@/src/emails/headerSwap";
import { V2_TONE_OPTIONS, V2_DEFAULT_TONE, type V2Tone } from "@/src/emails/tipologiasV2";

const ORIGINAL = "original";
const INK = "#0f172a";
const BODY = "#64748b";
const MUTED = "#94a3b8";
const DIVIDER = "#e2e8f0";

// ─── Metadatos de campos ──────────────────────────────────────────────────────

/** Etiquetas en español para las claves comunes de `content`. */
const FIELD_LABELS: Record<string, string> = {
  text: "Texto", title: "Título", body: "Cuerpo", eyebrow: "Eyebrow", heading: "Encabezado",
  sub: "Subtítulo", url: "URL", alt: "Texto alternativo", height: "Alto (px)", label: "Etiqueta",
  value: "Valor", caption: "Leyenda", tag: "Tag", icon: "Ícono (emoji)", iconUrl: "Ícono (URL)",
  imageUrl: "Imagen (URL)", imageW: "Ancho img", imageH: "Alto img", variant: "Variante", img: "Imagen",
  round: "Ronda", roundLabel: "Etiqueta de ronda",
};

function fieldLabel(key: string): string {
  return FIELD_LABELS[key] ?? key;
}

/** ¿La clave es una imagen? (URL de imagen → preview + upload). */
function isImageKey(type: EdSection["type"], key: string): boolean {
  if (/img|icon(Url)?$|image|thumb/i.test(key) && key !== "icon") return true;
  if (type === "features" && /^i\d$/.test(key)) return true;
  if (type === "image" && key === "url") return true;
  return false;
}

/** ¿Campo largo? → textarea con toolbar de estilos. */
function isLongKey(type: EdSection["type"], key: string): boolean {
  if (["text", "body", "body1", "body2", "sub", "caption"].includes(key)) return true;
  if (type === "features" && /^t\d$/.test(key)) return true;
  if (type === "list" && /^i\d$/.test(key)) return true;
  return false;
}

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(function schedule() {
    const t = setTimeout(function apply() { setDebounced(value); }, ms);
    return function cancel() { clearTimeout(t); };
  }, [value, ms]);
  return debounced;
}

// ─── Campos del panel ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = { height: 30, padding: "0 9px", borderRadius: 7, border: `1px solid ${DIVIDER}`, fontFamily: "inherit", fontSize: 12, color: INK, outline: "none", background: "#fff", width: "100%" };

function FieldShell({ label, children }: { label: string; children: React.ReactNode }): JSX.Element {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
      {children}
    </label>
  );
}

/** Miniatura renderizada de un bloque para la paleta (catálogo visual). */
function BlockThumb({ doc, title }: { doc: string; title: string }): JSX.Element {
  return (
    <div style={{ height: 74, overflow: "hidden", background: "#f8fafc", borderRadius: "8px 8px 0 0", position: "relative" }}>
      <iframe
        title={title}
        srcDoc={doc}
        scrolling="no"
        loading="lazy"
        tabIndex={-1}
        style={{ position: "absolute", top: 0, left: "50%", width: 600, height: 74 / 0.33, border: "none", transform: "translateX(-50%) scale(0.33)", transformOrigin: "top center", pointerEvents: "none", background: "#FAFAFA" }}
      />
    </div>
  );
}

/** Campo de imagen: preview + URL + upload local (base64, solo para preview). */
function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }): JSX.Element {
  const fileRef = useRef<HTMLInputElement | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function loaded() {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <FieldShell label={label}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ width: 40, height: 30, borderRadius: 6, border: `1px solid ${DIVIDER}`, background: "#f8fafc", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          ) : (
            <span style={{ fontSize: 9, color: MUTED }}>vacío</span>
          )}
        </div>
        <input value={value} onChange={function onInput(e) { onChange(e.target.value); }} placeholder="https://cdn…" style={{ ...inputStyle, flex: 1 }} />
        <button type="button" onClick={function pick() { fileRef.current?.click(); }} style={{ height: 30, padding: "0 10px", borderRadius: 7, border: `1px solid ${DIVIDER}`, background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700, color: INK, fontFamily: "inherit", flexShrink: 0 }}>
          Subir
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
      </div>
      {value.startsWith("data:") && (
        <span style={{ fontSize: 10, color: "#c85a1e", lineHeight: 1.4 }}>
          Imagen embebida: sirve para el preview, pero los clientes de correo la bloquean — para envío real súbela al CDN y pega su URL.
        </span>
      )}
    </FieldShell>
  );
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export default function EditorApp(): JSX.Element {
  const params = useSearchParams();

  // Seed inicial: ?desde=<correo real>, ?bloque=<tipo de sección>, o lienzo vacío.
  const [subject, setSubject] = useState<string>(function init() {
    const seed = EMAILS.find(function byId(e) { return e.id === params.get("desde"); });
    return seed ? seed.subject : "Asunto del correo";
  });
  const [sections, setSections] = useState<EdSection[]>(function init() {
    const seed = EMAILS.find(function byId(e) { return e.id === params.get("desde"); });
    if (seed) return structuredClone(seed.sections);
    const bloque = params.get("bloque");
    if (bloque && (SECTION_TYPES as string[]).includes(bloque)) return [createSection(bloque as Section["type"])];
    return [];
  });
  const [selected, setSelected] = useState<string | null>(null);

  // Header/footer/tono (mismo sistema del BannerLab).
  const [banner, setBanner] = useState<string>(ORIGINAL);
  const [footer, setFooter] = useState<string>(ORIGINAL);
  const [tone, setTone] = useState<V2Tone>(V2_DEFAULT_TONE);
  const [bannerText, setBannerText] = useState<BannerText>({ titulo: "", bajada: "", pill: "" });

  const canvasRef = useRef<EditorCanvasHandle | null>(null);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;

  // El doc del canvas SOLO se reconstruye ante cambios estructurales (nonce) o
  // de shell — editar campos parchea el iframe en sitio, sin recargarlo.
  const [nonce, setNonce] = useState(0);
  const bump = useCallback(function bump() { setNonce(function inc(n) { return n + 1; }); }, []);
  const dSubject = useDebounced(subject, 350);
  const dBannerText = useDebounced(bannerText, 350);

  const resolveBannerText = useCallback(function resolve(bt: BannerText, subj: string): BannerText {
    return { titulo: bt.titulo.trim() || subj, bajada: bt.bajada, pill: bt.pill };
  }, []);

  const doc = useMemo(function buildDoc() {
    const shell = generateEmail([], dSubject);
    const bodyHtml = sectionsRef.current
      .map(function wrap(s) { return `<tbody data-sec="${s.id}">${renderEdSection(s)}</tbody>`; })
      .join("\n");
    const SPACER = '<tr><td height="20"></td></tr>';
    const at = shell.indexOf(SPACER);
    let d = at === -1 ? shell : `${shell.slice(0, at + SPACER.length)}\n${bodyHtml}\n${shell.slice(at + SPACER.length)}`;
    if (banner !== ORIGINAL) {
      const b = buildBannerFor(banner, tone, resolveBannerText(dBannerText, dSubject));
      if (b) d = swapEmailHeader(d, b);
    }
    if (footer !== ORIGINAL) {
      const f = buildFooterFor(footer, tone);
      if (f) d = swapEmailFooter(d, f);
    }
    return d.replace("</head>", `<style>${CANVAS_CSS}</style></head>`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, banner, footer, tone, dBannerText, dSubject, resolveBannerText]);

  // ── Operaciones ──
  const addSection = useCallback(function addSection(type: Section["type"]) {
    const nueva = createSection(type);
    setSections(function insert(prev) {
      const at = selected ? prev.findIndex(function byId(s) { return s.id === selected; }) + 1 : prev.length;
      const next = prev.slice();
      next.splice(at === 0 ? prev.length : at, 0, nueva);
      return next;
    });
    setSelected(nueva.id);
    bump();
  }, [selected, bump]);

  const removeSection = useCallback(function removeSection(id: string) {
    setSections(function drop(prev) { return prev.filter(function keep(s) { return s.id !== id; }); });
    setSelected(null);
    bump();
  }, [bump]);

  const duplicateSection = useCallback(function duplicateSection(id: string) {
    const prev = sectionsRef.current;
    const i = prev.findIndex(function byId(s) { return s.id === id; });
    if (i === -1) return;
    const copy: EdSection = { ...structuredClone(prev[i]), id: `${prev[i].type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
    const next = prev.slice();
    next.splice(i + 1, 0, copy);
    setSections(next);
    setSelected(copy.id);
    bump();
  }, [bump]);

  const moveSection = useCallback(function moveSection(id: string, dir: -1 | 1) {
    setSections(function move(prev) {
      const i = prev.findIndex(function byId(s) { return s.id === id; });
      const j = i + dir;
      if (i === -1 || j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    bump();
  }, [bump]);

  const patchContent = useCallback(function patchContent(id: string, key: string, value: string) {
    const current = sectionsRef.current.find(function byId(s) { return s.id === id; });
    if (!current) return;
    const updated: EdSection = { ...current, content: { ...current.content, [key]: value } };
    setSections(function patch(prev) {
      return prev.map(function each(s) { return s.id === id ? updated : s; });
    });
    // Patch en sitio: el iframe NO se recarga al escribir.
    canvasRef.current?.patchSection(id, renderEdSection(updated));
  }, []);

  const loadEmail = useCallback(function loadEmail(id: string) {
    const seed = EMAILS.find(function byId(e) { return e.id === id; });
    if (!seed) return;
    if (sectionsRef.current.length > 0 && !window.confirm("Esto reemplaza el contenido actual del lienzo. ¿Continuar?")) return;
    setSections(structuredClone(seed.sections));
    setSubject(seed.subject);
    setSelected(null);
    bump();
  }, [bump]);

  // ── Drag & drop desde la paleta y reordenar en el canvas ──
  const dropNew = useCallback(function dropNew(type: string, index: number) {
    if (!(SECTION_TYPES as string[]).includes(type)) return;
    const nueva = createSection(type as Section["type"]);
    const next = sectionsRef.current.slice();
    next.splice(Math.max(0, Math.min(index, next.length)), 0, nueva);
    setSections(next);
    setSelected(nueva.id);
    bump();
  }, [bump]);

  const reorder = useCallback(function reorder(id: string, index: number) {
    const prev = sectionsRef.current;
    const i = prev.findIndex(function byId(s) { return s.id === id; });
    if (i === -1) return;
    const next = prev.slice();
    const [moved] = next.splice(i, 1);
    next.splice(i < index ? index - 1 : index, 0, moved);
    setSections(next);
    bump();
  }, [bump]);

  // ── Crear con IA (Gemini) ──
  // La IA VE el lienzo actual: si el pedido es una mejora ("cambia el botón a
  // teal", "mueve la card"), edita solo eso y conserva el resto; si pide un
  // correo distinto, lo rehace. Siempre hay Deshacer con el estado previo.
  interface LabSnapshot {
    subject: string;
    sections: EdSection[];
    banner: string;
    footer: string;
    tone: V2Tone;
    bannerText: BannerText;
  }
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiInfo, setAiInfo] = useState<string | null>(null);
  const [aiUndo, setAiUndo] = useState<LabSnapshot | null>(null);

  const generarConIA = useCallback(async function generarConIA() {
    if (!aiPrompt.trim() || aiBusy) return;
    setAiBusy(true);
    setAiError(null);
    setAiInfo(null);
    try {
      const actual = sectionsRef.current.length > 0
        ? {
            subject,
            banner: { id: banner, tono: tone, titulo: bannerText.titulo, bajada: bannerText.bajada, pill: bannerText.pill },
            footer,
            // content Y html renderizado: con el HTML disponible la IA puede
            // editar cualquier aspecto (colores, fondos, layout), no solo textos.
            sections: sectionsRef.current.map(function full(s) {
              return { type: s.type, content: s.content, html: renderEdSection(s) };
            }),
          }
        : null;
      const res = await fetch("/api/correo-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, actual }),
      });
      const data = (await res.json()) as {
        error?: string;
        mode?: "edicion" | "nuevo";
        nota?: string;
        subject?: string;
        banner?: { id: string; tono: string; titulo: string; bajada: string; pill: string };
        footer?: string;
        sections?: Array<{ type: Section["type"] | "html"; content?: Record<string, string>; html?: string }>;
      };
      if (!res.ok || data.error) {
        setAiError(data.error ?? `Error ${res.status}`);
        return;
      }
      // Snapshot para Deshacer, y aplicar (ids frescos sobre defaults reales;
      // las secciones con estilo editado llegan como bloques "html").
      setAiUndo({ subject, sections: sectionsRef.current, banner, footer, tone, bannerText });
      const nuevas: EdSection[] = (data.sections ?? []).map(function build(s) {
        if (s.type === "html") return newHtmlSection(s.html ?? "");
        const base = createSection(s.type);
        return { ...base, content: { ...base.content, ...s.content } };
      });
      setSections(nuevas);
      if (data.subject) setSubject(data.subject);
      if (data.banner) {
        setBanner(data.banner.id);
        setTone(data.banner.tono as V2Tone);
        setBannerText({ titulo: data.banner.titulo, bajada: data.banner.bajada, pill: data.banner.pill });
      }
      if (data.footer) setFooter(data.footer);
      setSelected(null);
      setAiPrompt("");
      const base = data.mode === "edicion" ? "✓ Edité el correo del lienzo (lo demás quedó igual)." : "✓ Correo nuevo generado.";
      setAiInfo(data.nota ? `${base} ⚠ ${data.nota}` : base);
      bump();
    } catch {
      setAiError("No se pudo conectar con el generador — revisa que el server esté corriendo.");
    } finally {
      setAiBusy(false);
    }
  }, [aiPrompt, aiBusy, bump, subject, banner, footer, tone, bannerText]);

  const deshacerIA = useCallback(function deshacerIA() {
    const snap = aiUndo;
    if (!snap) return;
    setSections(snap.sections);
    setSubject(snap.subject);
    setBanner(snap.banner);
    setFooter(snap.footer);
    setTone(snap.tone);
    setBannerText(snap.bannerText);
    setAiUndo(null);
    setAiInfo(null);
    setSelected(null);
    bump();
  }, [aiUndo, bump]);

  // Previews de la paleta (se construyen una sola vez).
  const paletteDocs = useMemo(function build() {
    const map = new Map<Section["type"], string>();
    SECTION_TYPES.forEach(function each(t) { map.set(t, sectionPreviewDoc(t)); });
    return map;
  }, []);

  const buildExport = useCallback(function buildExport(): string {
    let out = buildEmailFromEd(sectionsRef.current, subject);
    if (banner !== ORIGINAL) {
      const b = buildBannerFor(banner, tone, resolveBannerText(bannerText, subject));
      if (b) out = swapEmailHeader(out, b);
    }
    if (footer !== ORIGINAL) {
      const f = buildFooterFor(footer, tone);
      if (f) out = swapEmailFooter(out, f);
    }
    return out;
  }, [subject, banner, footer, tone, bannerText, resolveBannerText]);

  const sel = selected ? sections.find(function byId(s) { return s.id === selected; }) ?? null : null;
  const selIndex = sel ? sections.findIndex(function byId(s) { return s.id === sel.id; }) : -1;

  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };
  const opBtn: React.CSSProperties = { height: 26, padding: "0 9px", borderRadius: 6, border: `1px solid ${DIVIDER}`, background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700, color: INK, fontFamily: "inherit" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "230px 1fr 320px", gap: 20, alignItems: "start" }}>
      {/* ── Paleta ── */}
      <aside style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 4, maxHeight: "calc(100vh - 40px)", overflowY: "auto", paddingRight: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>Empezar desde</span>
        <select value="" onChange={function pick(e) { if (e.target.value) loadEmail(e.target.value); }} style={{ ...selectStyle, marginBottom: 12 }}>
          <option value="">Correo real de producción…</option>
          {EMAILS.map(function opt(e) { return <option key={e.id} value={e.id}>{e.name}</option>; })}
        </select>

        <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>Bloques</span>
        <span style={{ fontSize: 10, color: MUTED, lineHeight: 1.4, marginBottom: 6 }}>Haz clic para agregar, o arrástralo hasta el correo.</span>
        {SECTION_TYPES.map(function renderPal(type) {
          return (
            <div
              key={type}
              role="button"
              tabIndex={0}
              draggable
              onDragStart={function drag(e) {
                e.dataTransfer.setData(DND_NEW, type);
                e.dataTransfer.effectAllowed = "copy";
              }}
              onClick={function add() { addSection(type); }}
              onKeyDown={function key(e) { if (e.key === "Enter") addSection(type); }}
              title={SECTION_DESCRIPTIONS[type]}
              className="ed-pal"
              style={{ borderRadius: 8, border: `1px solid ${DIVIDER}`, background: "#fff", cursor: "grab", overflow: "hidden", transition: "border-color 0.12s ease, box-shadow 0.12s ease" }}
            >
              <BlockThumb doc={paletteDocs.get(type) ?? ""} title={SECTION_LABELS[type]} />
              <div style={{ padding: "7px 10px", fontSize: 11, fontWeight: 700, color: INK }}>{SECTION_LABELS[type]}</div>
            </div>
          );
        })}
      </aside>

      {/* ── Canvas ── */}
      <main style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Crear con IA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "12px 14px", borderRadius: 12, border: "1px solid #e9d5ff", background: "linear-gradient(135deg,#faf5ff 0%,#f5f3ff 100%)" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#6d28d9" }}>✨ Crear con IA</span>
          <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <textarea
              value={aiPrompt}
              onChange={function onInput(e) { setAiPrompt(e.target.value); }}
              placeholder="Describe el correo que necesitas — p. ej.: «correo para avisar que su recarga de US$ 500 fue exitosa, con los datos de la operación y un botón a su billetera»"
              rows={2}
              style={{ ...inputStyle, height: "auto", padding: "8px 10px", resize: "none", flex: 1, lineHeight: 1.45 }}
            />
            <button
              type="button"
              onClick={function go() { void generarConIA(); }}
              disabled={aiBusy || !aiPrompt.trim()}
              style={{ padding: "0 18px", borderRadius: 8, border: "none", cursor: aiBusy || !aiPrompt.trim() ? "default" : "pointer", background: aiBusy ? "#a78bfa" : "#6d28d9", color: "#fff", fontSize: 12, fontWeight: 800, fontFamily: "inherit", whiteSpace: "nowrap" }}
            >
              {aiBusy ? "Generando…" : "Generar correo"}
            </button>
          </div>
          {aiError && <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>{aiError}</span>}
          {(aiInfo || aiUndo) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {aiInfo && <span style={{ fontSize: 11, color: "#15803d", fontWeight: 700 }}>{aiInfo}</span>}
              <div style={{ flex: 1 }} />
              {aiUndo && (
                <button
                  type="button"
                  onClick={deshacerIA}
                  style={{ height: 26, padding: "0 12px", borderRadius: 7, border: "1px solid #ddd6fe", background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#6d28d9", fontFamily: "inherit" }}
                >
                  ↩ Deshacer
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            value={subject}
            onChange={function onInput(e) { setSubject(e.target.value); }}
            placeholder="Asunto del correo…"
            style={{ ...inputStyle, height: 36, fontSize: 13, fontWeight: 600, flex: 1 }}
          />
          <CopyHtmlButton html={buildExport} />
        </div>
        {sections.length === 0 && (
          <p style={{ margin: 0, padding: "14px 18px", borderRadius: 10, border: `2px dashed ${DIVIDER}`, background: "#fafafa", fontSize: 13, color: BODY, textAlign: "center" }}>
            Lienzo vacío — arrastra un bloque de la izquierda, carga un correo real, o pídeselo a la IA ✨
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "center", padding: 24, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
          <EditorCanvas ref={canvasRef} doc={doc} selectedId={selected} onSelect={setSelected} onDropNew={dropNew} onReorder={reorder} />
        </div>
      </main>

      {/* ── Propiedades ── */}
      <aside style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 12, maxHeight: "calc(100vh - 40px)", overflowY: "auto", padding: "14px 14px 18px", borderRadius: 12, border: `1px solid ${DIVIDER}`, background: "#fff" }}>
        {sel ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: INK, flex: 1 }}>
                {sel.type === "html" ? "Bloque personalizado" : SECTION_LABELS[sel.type]}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "2px 7px", borderRadius: 6, background: "#f1edff", color: "#4f2ed8" }}>{selIndex + 1}/{sections.length}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button type="button" onClick={function up() { moveSection(sel.id, -1); }} disabled={selIndex === 0} style={{ ...opBtn, opacity: selIndex === 0 ? 0.4 : 1 }}>↑</button>
              <button type="button" onClick={function down() { moveSection(sel.id, 1); }} disabled={selIndex === sections.length - 1} style={{ ...opBtn, opacity: selIndex === sections.length - 1 ? 0.4 : 1 }}>↓</button>
              <button type="button" onClick={function dup() { duplicateSection(sel.id); }} style={opBtn}>Duplicar</button>
              <div style={{ flex: 1 }} />
              <button type="button" onClick={function del() { removeSection(sel.id); }} style={{ ...opBtn, color: "#dc2626", borderColor: "#fecaca" }}>Eliminar</button>
            </div>
            <div style={{ height: 1, background: DIVIDER }} />
            {sel.type === "html" && (
              <>
                <span style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
                  Sección con estilo personalizado por la IA. Para retocarla, vuelve a pedírselo a la IA (p. ej. «en la card naranja, sube el tamaño del monto») o edita su HTML aquí:
                </span>
                <textarea
                  value={sel.content.html ?? ""}
                  onChange={function set(e) { patchContent(sel.id, "html", e.target.value); }}
                  rows={12}
                  spellCheck={false}
                  style={{ ...inputStyle, height: "auto", padding: "8px 9px", resize: "vertical", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10.5, lineHeight: 1.5, whiteSpace: "pre" }}
                />
              </>
            )}
            {sel.type !== "html" && Object.keys(sel.content).length === 0 && (
              <span style={{ fontSize: 12, color: MUTED }}>Este bloque no tiene propiedades.</span>
            )}
            {sel.type !== "html" && Object.entries(sel.content).map(function renderField([key, value]) {
              if (isImageKey(sel.type, key)) {
                return <ImageField key={key} label={fieldLabel(key)} value={value} onChange={function set(v) { patchContent(sel.id, key, v); }} />;
              }
              if (isLongKey(sel.type, key)) {
                return (
                  <RichTextField
                    key={key}
                    resetKey={`${sel.id}:${key}`}
                    label={fieldLabel(key)}
                    initialValue={value}
                    onChange={function set(v) { patchContent(sel.id, key, v); }}
                  />
                );
              }
              if (sel.type === "cta" && key === "variant") {
                return (
                  <FieldShell key={key} label="Variante">
                    <select value={value} onChange={function set(e) { patchContent(sel.id, key, e.target.value); }} style={selectStyle}>
                      <option value="">Primary (naranja)</option>
                      <option value="negotiable">Negociable (teal)</option>
                    </select>
                  </FieldShell>
                );
              }
              return (
                <FieldShell key={key} label={fieldLabel(key)}>
                  <input value={value} onChange={function set(e) { patchContent(sel.id, key, e.target.value); }} style={inputStyle} />
                </FieldShell>
              );
            })}
            <span style={{ fontSize: 10, color: MUTED, lineHeight: 1.5 }}>
              Para colorear: selecciona el texto y toca <b style={{ color: "#c85a1e" }}>Naranja</b>, <b style={{ color: "#0E016C" }}>Oscuro</b> o <b style={{ color: "#4f2ed8" }}>Morado</b>. Lo que escribas como {"{{variable}}"} queda como dato variable.
            </span>
          </>
        ) : (
          <>
            <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>Correo</span>
            <span style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginTop: -6 }}>Haz clic en una sección del correo para editarla, o configura el marco aquí.</span>
            <div style={{ height: 1, background: DIVIDER }} />
            <FieldShell label="Banner header">
              <select value={banner} onChange={function set(e) { setBanner(e.target.value); }} style={selectStyle}>
                <option value={ORIGINAL}>Original (producción)</option>
                {BANNER_OPTIONS.map(function opt(o) { return <option key={o.id} value={o.id}>{o.label}</option>; })}
              </select>
            </FieldShell>
            <FieldShell label="Footer Centro de Ayuda">
              <select value={footer} onChange={function set(e) { setFooter(e.target.value); }} style={selectStyle}>
                <option value={ORIGINAL}>Original (producción)</option>
                {FOOTER_OPTIONS.map(function opt(o) { return <option key={o.id} value={o.id}>{o.label}</option>; })}
              </select>
            </FieldShell>
            <FieldShell label="Fondo (tono)">
              <select value={tone} onChange={function set(e) { setTone(e.target.value as V2Tone); }} disabled={banner === ORIGINAL && footer === ORIGINAL} style={{ ...selectStyle, opacity: banner === ORIGINAL && footer === ORIGINAL ? 0.5 : 1 }}>
                {V2_TONE_OPTIONS.map(function opt(o) { return <option key={o.tone} value={o.tone}>{o.label}</option>; })}
              </select>
            </FieldShell>
            {banner !== ORIGINAL && (
              <>
                <div style={{ height: 1, background: DIVIDER }} />
                <FieldShell label="Título del banner">
                  <input value={bannerText.titulo} onChange={function set(e) { setBannerText({ ...bannerText, titulo: e.target.value }); }} placeholder={subject} style={inputStyle} />
                </FieldShell>
                <FieldShell label="Bajada del banner">
                  <input value={bannerText.bajada} onChange={function set(e) { setBannerText({ ...bannerText, bajada: e.target.value }); }} placeholder="Bajada breve…" style={inputStyle} />
                </FieldShell>
                <FieldShell label="Pill">
                  <input value={bannerText.pill} onChange={function set(e) { setBannerText({ ...bannerText, pill: e.target.value }); }} placeholder="EN VIVO" style={inputStyle} />
                </FieldShell>
              </>
            )}
          </>
        )}
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .ed-pal:hover { border-color: #a78bfa; box-shadow: 0 4px 14px rgba(79,46,216,0.12); }
        .ed-pal:active { cursor: grabbing; }
      `}} />
    </div>
  );
}
