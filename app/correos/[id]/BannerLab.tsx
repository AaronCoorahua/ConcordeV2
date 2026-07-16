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
 *  · Comparar con el original (A3): botón «hold to compare» — mientras se
 *    mantiene presionado, el preview muestra el correo original intacto.
 *
 *  · Estado en la URL (C9): banner/footer/tono viven en el query string, así el
 *    preview es enlazable y sobrevive a recargas.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import EmailFrame, { type EmailFrameHandle } from "@/app/correos/_components/EmailFrame";
import { BANNER_OPTIONS, FOOTER_OPTIONS, buildBannerFor, buildFooterFor, swapEmailHeader, swapEmailFooter, type BannerText } from "@/src/emails/headerSwap";
import { V2_TONE_OPTIONS, V2_DEFAULT_TONE, type V2Tone } from "@/src/emails/tipologiasV2";

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
}

// ─── UI atoms ─────────────────────────────────────────────────────────────────

function TabGroup({ label, children, dimmed }: { label: string; children: JSX.Element[]; dimmed?: boolean }): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", opacity: dimmed ? 0.45 : 1, transition: "opacity 0.15s ease" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase", minWidth: 52 }}>
        {label}
      </span>
      <div role="tablist" aria-label={label} style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 10, background: "#f1f5f9", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

function Tab({ on, onClick, children, disabled }: { on: boolean; onClick: () => void; children: string; disabled?: boolean }): JSX.Element {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 28, padding: "0 12px", borderRadius: 7, border: "none",
        cursor: disabled ? "default" : "pointer",
        background: on ? "#ffffff" : "transparent",
        color: on ? "#0f172a" : "#64748b",
        fontSize: 12, fontWeight: on ? 700 : 600, fontFamily: "inherit",
        boxShadow: on ? "0 1px 3px rgba(15,23,42,0.10)" : "none",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }): JSX.Element {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 200px", minWidth: 160 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
      <input
        value={value}
        onChange={function onInput(e) { onChange(e.target.value); }}
        placeholder={placeholder}
        style={{ height: 32, padding: "0 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontFamily: "inherit", fontSize: 13, color: "#0f172a", outline: "none", background: "#fff" }}
      />
    </label>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerLab({ html, title, subject, categoria }: BannerLabProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Estado en la URL (C9): banner / footer / tono se leen del query string.
  const bannerId = params.get("banner") ?? ORIGINAL;
  const footerId = params.get("footer") ?? ORIGINAL;
  const toneParam = params.get("tono");
  const tone: V2Tone = toneParam && TONE_IDS.has(toneParam as V2Tone) ? (toneParam as V2Tone) : V2_DEFAULT_TONE;

  const setParam = useCallback(function setParam(key: string, value: string, isDefault: boolean): void {
    const next = new URLSearchParams(params.toString());
    if (isDefault) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, router, pathname]);

  const setBanner = useCallback(function setBanner(id: string) { setParam("banner", id, id === ORIGINAL); }, [setParam]);
  const setFooter = useCallback(function setFooter(id: string) { setParam("footer", id, id === ORIGINAL); }, [setParam]);
  const setTone = useCallback(function setTone(t: V2Tone) { setParam("tono", t, t === V2_DEFAULT_TONE); }, [setParam]);

  // Textos editables del banner (B4). Vacío = usa su default (asunto/categoría).
  const [text, setText] = useState<BannerText>({ titulo: "", bajada: "", pill: "" });
  const patchText = useCallback(function patch(key: keyof BannerText, value: string) {
    setText(function prev(p) { return { ...p, [key]: value }; });
  }, []);

  const [editBody, setEditBody] = useState(false);
  const [comparing, setComparing] = useState(false); // A3: hold-to-compare
  const frameRef = useRef<EmailFrameHandle | null>(null);

  const bannerOn = bannerId !== ORIGINAL;
  const footerOn = footerId !== ORIGINAL;
  const allOriginal = !bannerOn && !footerOn;

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
      if (bannerHtml) out = swapEmailHeader(out, bannerHtml);
    }
    if (footerOn) {
      const footerHtml = buildFooterFor(footerId, tone);
      if (footerHtml) out = swapEmailFooter(out, footerHtml);
    }
    return out;
  }, [html, bannerId, footerId, tone, text, subject, categoria, bannerOn, footerOn]);

  // Lo que ve el preview: original mientras se compara (A3), si no el editado.
  const previewHtml = comparing ? html : swappedHtml;

  // Al re-montar el frame (cambia key), se pierde la edición inline: para B6 se
  // relee el frame vivo al copiar. Si no hay frame editado, cae al swappedHtml.
  const copyHtml = useCallback(function copyHtml(): string {
    if (editBody && !comparing && frameRef.current) return frameRef.current.getHtml();
    return swappedHtml;
  }, [editBody, comparing, swappedHtml]);

  // La key del frame fuerza recarga del srcDoc cuando cambia la composición (no
  // en cada edición inline, que ocurre dentro del mismo documento).
  const frameKey = `${bannerId}-${footerId}-${tone}-${text.titulo}-${text.bajada}-${text.pill}-${editBody}-${comparing}`;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
          <TabGroup label="Banner">
            {[
              <Tab key={ORIGINAL} on={bannerId === ORIGINAL} onClick={function pick() { setBanner(ORIGINAL); }}>Original</Tab>,
              ...BANNER_OPTIONS.map(function renderTab(opt) {
                return <Tab key={opt.id} on={bannerId === opt.id} onClick={function pick() { setBanner(opt.id); }}>{opt.label}</Tab>;
              }),
            ]}
          </TabGroup>
          <div style={{ flex: 1 }} />
          <CopyHtmlButton key={frameKey} html={copyHtml} />
        </div>

        <TabGroup label="Footer">
          {[
            <Tab key={ORIGINAL} on={footerId === ORIGINAL} onClick={function pick() { setFooter(ORIGINAL); }}>Original</Tab>,
            ...FOOTER_OPTIONS.map(function renderTab(opt) {
              return <Tab key={opt.id} on={footerId === opt.id} onClick={function pick() { setFooter(opt.id); }}>{opt.label}</Tab>;
            }),
          ]}
        </TabGroup>

        <TabGroup label="Fondo" dimmed={allOriginal}>
          {V2_TONE_OPTIONS.map(function renderTone(opt) {
            return (
              <Tab key={opt.tone} on={!allOriginal && tone === opt.tone} disabled={allOriginal} onClick={function pick() { setTone(opt.tone); }}>
                {opt.label}
              </Tab>
            );
          })}
        </TabGroup>

        {/* Campos del banner editables (B4) — solo si hay un banner de tipología. */}
        {bannerOn && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "12px 14px", background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 10 }}>
            <Field label="Título del banner" value={text.titulo} onChange={function set(v) { patchText("titulo", v); }} placeholder={subject} />
            <Field label="Bajada" value={text.bajada} onChange={function set(v) { patchText("bajada", v); }} placeholder="Bajada breve del correo…" />
            <Field label="Pill" value={text.pill} onChange={function set(v) { patchText("pill", v); }} placeholder={categoria} />
          </div>
        )}

        {/* Controles del preview: editar cuerpo (B6) + comparar original (A3). */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#475569" }}>
            <input type="checkbox" checked={editBody} onChange={function toggle(e) { setEditBody(e.target.checked); }} style={{ accentColor: "#4f2ed8", width: 15, height: 15 }} />
            Editar cuerpo del correo
            {editBody && <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>· clic en cualquier texto para editarlo</span>}
          </label>
          <div style={{ flex: 1 }} />
          {!allOriginal && (
            <button
              type="button"
              onMouseDown={function hold() { setComparing(true); }}
              onMouseUp={function release() { setComparing(false); }}
              onMouseLeave={function release() { setComparing(false); }}
              onTouchStart={function hold() { setComparing(true); }}
              onTouchEnd={function release() { setComparing(false); }}
              style={{
                height: 32, padding: "0 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700,
                border: "1px solid #e2e8f0",
                background: comparing ? "#4f2ed8" : "#ffffff",
                color: comparing ? "#ffffff" : "#475569",
                transition: "background 0.12s ease, color 0.12s ease",
                userSelect: "none",
              }}
            >
              {comparing ? "◀ Original" : "Mantén para ver el original"}
            </button>
          )}
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: 32, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
        {comparing && (
          <span style={{ position: "absolute", top: 12, left: 12, zIndex: 2, fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", background: "#4f2ed8", padding: "3px 9px", borderRadius: 9999 }}>
            Original
          </span>
        )}
        <EmailFrame
          key={frameKey}
          ref={frameRef}
          html={previewHtml}
          editable={editBody && !comparing}
          title={`${title} · ${allOriginal ? "original" : `${bannerId} / ${footerId}`}`}
        />
      </div>
    </div>
  );
}
