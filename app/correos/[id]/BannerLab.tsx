"use client";

/**
 * BannerLab — laboratorio de un correo real. Combina cuatro capacidades:
 *
 *  · Tipologías intercambiables: tabs para el banner header, el footer «Centro
 *    de Ayuda» y el fondo (tono V2), que se sustituyen sobre el HTML generado
 *    sin tocar el cuerpo (ver src/emails/headerSwap.ts).
 *
 *  · Campos del banner editables (B4): título, bajada y pill del banner de
 *    tipología, para probar copy sin salir de la vista.
 *
 *  · Cuerpo editable inline (B6): el EmailFrame marca el texto del cuerpo como
 *    contenteditable; «Copiar HTML» lee el estado VIVO del iframe.
 *
 *  · Comparar Figma: parte la vista en dos columnas — el correo maquetado a la
 *    izquierda y la referencia exportada de Figma a la derecha. Ambos se escalan
 *    para caber juntos en pantalla. Si el SVG aún no existe, la derecha muestra
 *    un skeleton con el nombre del archivo que falta.
 *
 *  · Estado en la URL (C9): banner/footer/tono viven en el query string, así el
 *    preview es enlazable y sobrevive a recargas.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import EmailFrame, { type EmailFrameHandle } from "@/app/correos/_components/EmailFrame";
import { BANNER_OPTIONS, FOOTER_OPTIONS, buildBannerFor, buildFooterFor, swapEmailHeader, swapEmailFooter, stripBodyTitle, presetForCategory, hasFixedTone, toneLabelForCategory, type BannerText } from "@/src/emails/headerSwap";
import { V2_TONE_OPTIONS, type V2Tone } from "@/src/emails/tipologiasV2";

const ORIGINAL = "original";
const TONE_IDS = new Set(V2_TONE_OPTIONS.map(function id(o) { return o.tone; }));

export interface BannerLabProps {
  /** HTML del correo tal cual sale del renderer de producción. */
  html: string;
  title: string;
  /** Asunto real — default del título editable del banner. */
  subject: string;
  /** Nombre de la categoría — default del pill del banner. */
  categoria: string;
  /**
   * Ruta pública del SVG/PNG exportado de Figma, o null si aún no existe (la
   * resuelve el Server Component leyendo public/figma/correos/).
   */
  figmaSrc?: string | null;
  /** Nombre del archivo esperado — lo muestra el skeleton cuando falta. */
  figmaFileName?: string;
}

/** Escala del preview en modo comparación, para que ambas columnas quepan. */
const COMPARE_SCALE = 0.62;

// ─── UI atoms ─────────────────────────────────────────────────────────────────

/** Grupo de tabs. En el panel lateral se apila: etiqueta encima, opciones debajo. */
function TabGroup({ label, children, dimmed }: { label: string; children: JSX.Element[]; dimmed?: boolean }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, opacity: dimmed ? 0.45 : 1, transition: "opacity 0.15s ease" }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ui-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </span>
      <div role="tablist" aria-label={label} style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, background: "var(--ui-border-soft)", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * `recommended` marca la opción del preset de la categoría (ver
 * CATEGORY_PRESETS en headerSwap). Se señala con un punto y con el título
 * accesible, no con un texto largo: los tabs comparten fila y una etiqueta
 * «recomendado» completa los desbordaría.
 */
function Tab({ on, onClick, children, disabled, recommended }: { on: boolean; onClick: () => void; children: string; disabled?: boolean; recommended?: boolean }): JSX.Element {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      disabled={disabled}
      title={recommended ? `${children} — recomendado para esta categoría` : undefined}
      style={{
        position: "relative",
        height: 26, padding: "0 9px", borderRadius: 7, border: "none",
        cursor: disabled ? "default" : "pointer",
        whiteSpace: "nowrap",
        display: "inline-flex", alignItems: "center", gap: 5,
        background: on ? "#ffffff" : "transparent",
        color: on ? "var(--ui-ink)" : "var(--ui-body)",
        fontSize: 12, fontWeight: on ? 700 : 600, fontFamily: "inherit",
        boxShadow: on ? "0 1px 3px rgba(15,23,42,0.10)" : "none",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
      {recommended && (
        <span
          aria-hidden="true"
          style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ui-accent)", flexShrink: 0 }}
        />
      )}
      {recommended && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>recomendado</span>}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; disabled?: boolean }): JSX.Element {
  return (
    /* `flex: none` — en una fila los campos se reparten con `minWidth`; sin esto,
       dentro de una columna el `flex-grow` los estiraba y abría huecos enormes. */
    <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 180px", minWidth: 150 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ui-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
      <input
        value={value}
        onChange={function onInput(e) { onChange(e.target.value); }}
        placeholder={placeholder}
        disabled={disabled}
        style={{ height: 32, padding: "0 10px", borderRadius: 8, border: "1px solid var(--ui-border)", fontFamily: "inherit", fontSize: 13, color: "var(--ui-ink)", outline: "none", background: disabled ? "var(--ui-border-soft)" : "#fff", cursor: disabled ? "not-allowed" : "text", minWidth: 0 }}
      />
    </label>
  );
}

/**
 * Aviso de tono de marca. Las categorías «En vivo» y «Negociable» tienen un
 * color asignado; cambiarlo rompe el código visual del flujo. No se prohíbe —a
 * veces se quiere comparar—, solo se advierte antes de la primera vez.
 */
function ToneAlert({ categoria, toneLabel, onCancel, onConfirm }: { categoria: string; toneLabel: string; onCancel: () => void; onConfirm: () => void }): JSX.Element {
  // Escape cierra sin aplicar el tono, como en cualquier diálogo.
  useEffect(function onEsc() {
    function handler(e: KeyboardEvent): void { if (e.key === "Escape") onCancel(); }
    document.addEventListener("keydown", handler);
    return function off() { document.removeEventListener("keydown", handler); };
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tone-alert-title"
      onClick={onCancel}
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(2px)" }}
    >
      <div
        onClick={function stop(e) { e.stopPropagation(); }}
        style={{ width: "100%", maxWidth: 400, background: "var(--ui-surface)", borderRadius: 14, border: "1px solid var(--ui-border)", boxShadow: "0 20px 50px -12px rgba(15,23,42,0.35)", padding: 22, display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span aria-hidden="true" style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#fff0e6", color: "#c85a1e", fontSize: 15 }}>!</span>
          <h2 id="tone-alert-title" style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--ui-ink)", margin: 0 }}>
            Este correo es de {categoria}
          </h2>
        </div>
        <p style={{ fontSize: 13, color: "var(--ui-body)", lineHeight: 1.55, margin: 0 }}>
          Su fondo <strong style={{ color: "var(--ui-ink)", fontWeight: 700 }}>{toneLabel}</strong> es el color de la categoría.
          Si lo cambias, el correo dejará de seguir el código de color de su flujo.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ height: 34, padding: "0 14px", borderRadius: "var(--ui-radius-control)", border: "1px solid var(--ui-border)", background: "var(--ui-surface)", color: "var(--ui-body)", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            style={{ height: 34, padding: "0 16px", borderRadius: "var(--ui-radius-control)", border: "none", background: "var(--ui-accent)", color: "#ffffff", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
          >
            Entiendo, cambiar
          </button>
        </div>
      </div>
    </div>
  );
}

/** Encabezado de cada columna en la vista de comparación. */
function ColumnLabel({ color, children }: { color: string; children: string }): JSX.Element {
  return (
    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ffffff", background: color, padding: "3px 9px", borderRadius: 9999, alignSelf: "flex-start" }}>
      {children}
    </span>
  );
}

/**
 * Panel derecho del modo comparación: la referencia de Figma. Mientras el SVG no
 * exista, se pinta un skeleton que dice qué archivo hay que dejar y dónde — así
 * la vista ya es usable antes de tener los exports.
 *
 * `matchHeight` iguala el alto al del correo maquetado: los exports de Figma
 * vienen en cualquier tamaño y con otra proporción, así que se ajustan por ALTO
 * (no por ancho) y se centran — que es como se comparan dos maquetas.
 */
function FigmaPanel({ src, fileName, matchHeight }: { src?: string | null; fileName: string; matchHeight: number | null }): JSX.Element {
  if (src) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático
            de Figma de tamaño arbitrario; next/image exigiría medidas fijas. */}
        <img
          src={src}
          alt={`Referencia de Figma — ${fileName}`}
          style={{
            // Con alto conocido manda el alto; si no, cae a ancho completo.
            height: matchHeight ? matchHeight : "auto",
            width: matchHeight ? "auto" : "100%",
            maxWidth: "100%",
            objectFit: "contain",
            display: "block", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", background: "#ffffff",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%", height: matchHeight ?? undefined, minHeight: matchHeight ? undefined : 420,
        borderRadius: 8, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10, padding: 24, textAlign: "center",
        background: "repeating-linear-gradient(135deg, var(--ui-border-soft) 0 12px, #e9eef5 12px 24px)",
        border: "1px dashed var(--ui-border-hover)",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 800, color: "var(--ui-body)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Sin referencia de Figma
      </span>
      <span style={{ fontSize: 12, color: "var(--ui-muted)", lineHeight: 1.6, maxWidth: 280 }}>
        Exporta el frame como SVG y déjalo en
        <br />
        <code style={{ fontFamily: "monospace", fontSize: 11, color: "#475569", background: "#ffffff", padding: "2px 6px", borderRadius: 4, display: "inline-block", marginTop: 6, border: "1px solid var(--ui-border)" }}>
          public/figma/correos/{fileName}
        </code>
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerLab({ html, title, subject, categoria, figmaSrc, figmaFileName = "correo.svg" }: BannerLabProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // La composición con la que abre el correo si la URL no dice otra cosa: las
  // categorías del flujo de subasta arrancan ya maquetadas (ver headerSwap).
  const preset = useMemo(function resolvePreset() { return presetForCategory(categoria); }, [categoria]);
  // Solo las categorías con preset propio marcan opción «recomendada»; en el
  // resto, «Basic» es el default por descarte y señalarlo sería ruido.
  const hasPreset = useMemo(function withPreset() { return hasFixedTone(categoria); }, [categoria]);

  // Estado en la URL (C9): banner / footer / tono se leen del query string y,
  // si no están, caen al preset de la categoría.
  const bannerId = params.get("banner") ?? preset.banner;
  const footerId = params.get("footer") ?? preset.footer;
  const toneParam = params.get("tono");
  const tone: V2Tone = toneParam && TONE_IDS.has(toneParam as V2Tone) ? (toneParam as V2Tone) : preset.tone;

  const setParam = useCallback(function setParam(key: string, value: string, isDefault: boolean): void {
    const next = new URLSearchParams(params.toString());
    if (isDefault) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, router, pathname]);

  // El valor que se omite de la URL es el del PRESET, no «original»: así la URL
  // limpia significa «como abre este correo» y volver al preset la deja limpia.
  const setBanner = useCallback(function setBanner(id: string) { setParam("banner", id, id === preset.banner); }, [setParam, preset.banner]);
  const setFooter = useCallback(function setFooter(id: string) { setParam("footer", id, id === preset.footer); }, [setParam, preset.footer]);
  const applyTone = useCallback(function applyTone(t: V2Tone) { setParam("tono", t, t === preset.tone); }, [setParam, preset.tone]);

  // Aviso de tono de marca: «En vivo» y «Negociable» tienen color propio, así que
  // la primera vez que se intenta cambiar el fondo se pide confirmación. Al
  // aceptar queda desbloqueado para el resto de la visita a ESTE correo (el
  // estado se reinicia al navegar a otro, que es cuando conviene recordarlo).
  const toneLocked = useMemo(function locked() { return hasFixedTone(categoria); }, [categoria]);
  const [toneUnlocked, setToneUnlocked] = useState(false);
  const [pendingTone, setPendingTone] = useState<V2Tone | null>(null);

  const setTone = useCallback(function setTone(t: V2Tone) {
    if (toneLocked && !toneUnlocked && t !== preset.tone) { setPendingTone(t); return; }
    applyTone(t);
  }, [toneLocked, toneUnlocked, preset.tone, applyTone]);

  const confirmTone = useCallback(function confirmTone() {
    setToneUnlocked(true);
    if (pendingTone) applyTone(pendingTone);
    setPendingTone(null);
  }, [pendingTone, applyTone]);

  // Textos editables del banner (B4). Vacío = usa su default (asunto/categoría).
  const [text, setText] = useState<BannerText>({ titulo: "", bajada: "", pill: "" });
  const patchText = useCallback(function patch(key: keyof BannerText, value: string) {
    setText(function prev(p) { return { ...p, [key]: value }; });
  }, []);

  const [editBody, setEditBody] = useState(false);
  // Vista dividida correo ↔ Figma (toggle, no hold: hay que poder mirar ambos).
  // Arranca ABIERTA: al entrar a un correo lo primero que se hace es cotejarlo
  // contra su referencia, así que ahorra un clic en el caso normal.
  const [comparing, setComparing] = useState(true);
  // Alto ya escalado del correo — la referencia de Figma se iguala a él.
  const [previewH, setPreviewH] = useState<number | null>(null);
  const frameRef = useRef<EmailFrameHandle | null>(null);

  const bannerOn = bannerId !== ORIGINAL;
  const footerOn = footerId !== ORIGINAL;
  const allOriginal = !bannerOn && !footerOn;
  // Las tipologías vigentes solo tienen TÍTULO; la bajada y el pill son piezas
  // de la composición original, así que sus campos solo aparecen con `-legacy`.
  const usaBajadaYPill = bannerOn && bannerId.endsWith("-legacy");

  // HTML con las tipologías aplicadas (los defaults de texto se resuelven aquí).
  const swappedHtml = useMemo(function compute() {
    let out = html;
    if (bannerOn) {
      const resolved: BannerText = {
        titulo: text.titulo.trim() || subject,
        bajada: text.bajada,
        pill: text.pill.trim() || categoria,
      };
      const bannerHtml = buildBannerFor(bannerId, tone, resolved);
      // El banner de tipología YA rotula el título de campaña: dejar además el
      // bloque `title` del cuerpo lo repetiría justo debajo.
      if (bannerHtml) out = stripBodyTitle(swapEmailHeader(out, bannerHtml));
    }
    if (footerOn) {
      const footerHtml = buildFooterFor(footerId, tone);
      if (footerHtml) out = swapEmailFooter(out, footerHtml);
    }
    return out;
  }, [html, bannerId, footerId, tone, text, subject, categoria, bannerOn, footerOn]);

  // El preview siempre muestra la composición activa: al comparar contra Figma la
  // referencia va al lado, no en lugar del correo.
  const previewHtml = swappedHtml;

  // Al re-montar el frame (cambia key), se pierde la edición inline: para B6 se
  // relee el frame vivo al copiar. Si no hay frame editado, cae al swappedHtml.
  const copyHtml = useCallback(function copyHtml(): string {
    if (editBody && frameRef.current) return frameRef.current.getHtml();
    return swappedHtml;
  }, [editBody, swappedHtml]);

  // La key del frame fuerza recarga del srcDoc cuando cambia la composición (no
  // en cada edición inline, que ocurre dentro del mismo documento).
  const frameKey = `${bannerId}-${footerId}-${tone}-${text.titulo}-${text.bajada}-${text.pill}-${editBody}`;

  return (
    <div>
      {/* ── Barra superior: acciones + campos del banner ──────────────────────
          Las acciones (copiar / comparar) van aquí, no en el panel: son de la
          página entera y así no compiten por el alto del sidebar. Los campos de
          texto son del BANNER, que es lo más alto del correo, así que se editan
          desde arriba — es donde el ojo ya está mirando. */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <button
          type="button"
          aria-pressed={comparing}
          onClick={function toggle() { setComparing(function prev(p) { return !p; }); }}
          style={{
            height: 32, padding: "0 14px", borderRadius: "var(--ui-radius-control)", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700,
            border: "1px solid var(--ui-border)",
            background: comparing ? "var(--ui-accent)" : "var(--ui-surface)",
            color: comparing ? "#ffffff" : "var(--ui-body)",
            transition: "background 0.12s ease, color 0.12s ease",
            userSelect: "none",
          }}
        >
          {comparing ? "✕ Cerrar comparación" : "⇄ Comparar Figma"}
        </button>
        <CopyHtmlButton key={frameKey} html={copyHtml} />
        <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--ui-body)" }}>
          <input type="checkbox" checked={editBody} onChange={function toggle(e) { setEditBody(e.target.checked); }} style={{ accentColor: "var(--ui-accent)", width: 15, height: 15 }} />
          Editar cuerpo
          {editBody && <span style={{ fontSize: 11, color: "var(--ui-muted)", fontWeight: 500 }}>· clic en cualquier texto</span>}
        </label>
      </div>

      {/* Campos del banner: SIEMPRE montados, deshabilitados con «Basic».
          Si entraran y salieran del DOM, el preview daría un salto al cambiar de
          tipología. Manteniéndolos, el alto es constante y además se ve de un
          vistazo por qué no se pueden editar. Con las tipologías vigentes solo
          hay título; bajada y pill se suman en las `-legacy`. */}
      <div
        aria-hidden={!bannerOn}
        style={{
          display: "flex", gap: 12, flexWrap: "wrap", padding: "12px 14px", marginBottom: 14,
          background: "var(--ui-subtle)", border: "1px solid var(--ui-border-soft)", borderRadius: 10,
          opacity: bannerOn ? 1 : 0.5, transition: "opacity 0.15s ease",
        }}
      >
        <Field label="Título del banner" value={text.titulo} onChange={function set(v) { patchText("titulo", v); }} placeholder={bannerOn ? subject : "—"} disabled={!bannerOn} />
        {/* Bajada y pill solo existen en la composición legacy. */}
        {usaBajadaYPill && (
          <>
            <Field label="Bajada" value={text.bajada} onChange={function set(v) { patchText("bajada", v); }} placeholder="Bajada breve del correo…" />
            <Field label="Pill" value={text.pill} onChange={function set(v) { patchText("pill", v); }} placeholder={categoria} />
          </>
        )}
      </div>

    {/* Dos columnas: las tipologías viven en un panel STICKY a la izquierda, así
        siguen a la vista mientras se recorre un correo largo. Al quedarse solo
        con los tres grupos de tabs, el panel es corto y nunca necesita scroll. */}
    <div style={{ display: "grid", gridTemplateColumns: "212px minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
      <aside
        style={{
          position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: 14,
          padding: 14, borderRadius: 12, background: "var(--ui-surface)", border: "1px solid var(--ui-border)",
        }}
      >
        <TabGroup label="Banner">
          {[
            <Tab key={ORIGINAL} on={bannerId === ORIGINAL} recommended={hasPreset && preset.banner === ORIGINAL} onClick={function pick() { setBanner(ORIGINAL); }}>Basic</Tab>,
            ...BANNER_OPTIONS.map(function renderTab(opt) {
              return <Tab key={opt.id} on={bannerId === opt.id} recommended={hasPreset && preset.banner === opt.id} onClick={function pick() { setBanner(opt.id); }}>{opt.label}</Tab>;
            }),
          ]}
        </TabGroup>

        <TabGroup label="Banner 2">
          {[
            <Tab key={ORIGINAL} on={footerId === ORIGINAL} recommended={hasPreset && preset.footer === ORIGINAL} onClick={function pick() { setFooter(ORIGINAL); }}>Basic</Tab>,
            ...FOOTER_OPTIONS.map(function renderTab(opt) {
              return <Tab key={opt.id} on={footerId === opt.id} recommended={hasPreset && preset.footer === opt.id} onClick={function pick() { setFooter(opt.id); }}>{opt.label}</Tab>;
            }),
          ]}
        </TabGroup>

        <TabGroup label="Fondo" dimmed={allOriginal}>
          {V2_TONE_OPTIONS.map(function renderTone(opt) {
            return (
              <Tab key={opt.tone} on={!allOriginal && tone === opt.tone} recommended={hasPreset && preset.tone === opt.tone} disabled={allOriginal} onClick={function pick() { setTone(opt.tone); }}>
                {opt.label}
              </Tab>
            );
          })}
        </TabGroup>

        {/* Pista permanente del tono propio: el modal solo sale la primera vez,
            así que esta línea recuerda cuál es el color de la categoría. */}
        {toneLocked && (
          <span style={{ fontSize: 11, color: "var(--ui-muted)", lineHeight: 1.45, marginTop: -6 }}>
            {categoria} usa <strong style={{ color: "var(--ui-body)", fontWeight: 700 }}>{toneLabelForCategory(categoria)}</strong> como fondo de marca.
          </span>
        )}

      </aside>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: comparing ? 20 : 32, borderRadius: 12, background: "var(--ui-subtle)", border: "1px solid var(--ui-border-soft)", overflowX: "auto" }}>
        {comparing ? (
          /* Vista dividida: correo maquetado ↔ referencia de Figma, ambos
             reducidos para caber juntos sin scroll horizontal. */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <ColumnLabel color="var(--ui-accent)">Maquetado</ColumnLabel>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <EmailFrame
                  key={frameKey}
                  ref={frameRef}
                  html={previewHtml}
                  editable={editBody}
                  scale={COMPARE_SCALE}
                  onHeightChange={setPreviewH}
                  title={`${title} · ${allOriginal ? "original" : `${bannerId} / ${footerId}`}`}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <ColumnLabel color="#c85a1e">Figma</ColumnLabel>
              <FigmaPanel src={figmaSrc} fileName={figmaFileName} matchHeight={previewH} />
            </div>
          </div>
        ) : (
          <EmailFrame
            key={frameKey}
            ref={frameRef}
            html={previewHtml}
            editable={editBody}
            title={`${title} · ${allOriginal ? "original" : `${bannerId} / ${footerId}`}`}
          />
        )}
      </div>
    </div>

    {pendingTone && (
      <ToneAlert
        categoria={categoria}
        toneLabel={toneLabelForCategory(categoria)}
        onCancel={function cancel() { setPendingTone(null); }}
        onConfirm={confirmTone}
      />
    )}
    </div>
  );
}
