"use client";

/**
 * BannerLab — laboratorio del header de un correo real: un tab elige la
 * TIPOLOGÍA de banner (o el header original de producción) y otro el FONDO
 * (los 5 tonos V2). El preview y el botón «Copiar HTML» siempre reflejan la
 * combinación activa, así que lo que copias es lo que ves.
 *
 * El swap ocurre sobre el HTML ya generado (ver src/emails/headerSwap.ts):
 * el resto del correo — cuerpo, footer, merge tags — queda intacto.
 */

import { useMemo, useState } from "react";
import type { JSX } from "react";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import EmailFrame from "@/app/correos/_components/EmailFrame";
import { BANNER_OPTIONS, buildBannerFor, swapEmailHeader } from "@/src/emails/headerSwap";
import { V2_TONE_OPTIONS, V2_DEFAULT_TONE, type V2Tone } from "@/src/emails/tipologiasV2";

const ORIGINAL = "original";

export interface BannerLabProps {
  /** HTML del correo tal cual sale del renderer de producción. */
  html: string;
  title: string;
  /** Asunto real — se inyecta como título del banner de tipología. */
  subject: string;
  /** Nombre de la categoría — se inyecta como pill del banner. */
  categoria: string;
}

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
        height: 28,
        padding: "0 12px",
        borderRadius: 7,
        border: "none",
        cursor: disabled ? "default" : "pointer",
        background: on ? "#ffffff" : "transparent",
        color: on ? "#0f172a" : "#64748b",
        fontSize: 12,
        fontWeight: on ? 700 : 600,
        fontFamily: "inherit",
        boxShadow: on ? "0 1px 3px rgba(15,23,42,0.10)" : "none",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

export default function BannerLab({ html, title, subject, categoria }: BannerLabProps): JSX.Element {
  const [banner, setBanner] = useState<string>(ORIGINAL);
  const [tone, setTone] = useState<V2Tone>(V2_DEFAULT_TONE);
  const isOriginal = banner === ORIGINAL;

  const activeHtml = useMemo(function compute() {
    if (isOriginal) return html;
    const bannerHtml = buildBannerFor(banner, tone, subject, categoria.toUpperCase());
    return bannerHtml ? swapEmailHeader(html, bannerHtml) : html;
  }, [html, banner, tone, subject, categoria, isOriginal]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
          <TabGroup label="Banner">
            {[
              <Tab key={ORIGINAL} on={isOriginal} onClick={function pick() { setBanner(ORIGINAL); }}>
                Original
              </Tab>,
              ...BANNER_OPTIONS.map(function renderTab(opt) {
                return (
                  <Tab key={opt.id} on={banner === opt.id} onClick={function pick() { setBanner(opt.id); }}>
                    {opt.label}
                  </Tab>
                );
              }),
            ]}
          </TabGroup>
          <div style={{ flex: 1 }} />
          <CopyHtmlButton key={`${banner}-${tone}`} html={activeHtml} />
        </div>

        <TabGroup label="Fondo" dimmed={isOriginal}>
          {V2_TONE_OPTIONS.map(function renderTone(opt) {
            return (
              <Tab
                key={opt.tone}
                on={!isOriginal && tone === opt.tone}
                disabled={isOriginal}
                onClick={function pick() { setTone(opt.tone); }}
              >
                {opt.label}
              </Tab>
            );
          })}
        </TabGroup>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: 32, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
        <EmailFrame html={activeHtml} title={`${title} · ${isOriginal ? "header original" : banner}`} />
      </div>
    </div>
  );
}
