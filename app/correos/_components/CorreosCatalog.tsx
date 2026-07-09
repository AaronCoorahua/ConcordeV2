"use client";

/**
 * CorreosCatalog — catálogo filtrable de correos (client).
 * Rail izquierdo de tipologías (como el mailing en producción) + grid de
 * cards con preview en iframe, botón «Copiar HTML» y link «Abrir».
 */

import { useMemo, useState } from "react";
import type { JSX } from "react";
import CopyHtmlButton from "./CopyHtmlButton";

export interface CatalogTipologia {
  id: string;
  label: string;
  prodCount: number;
}

export interface CatalogEntry {
  id: string;
  kind: "plantilla" | "banner";
  name: string;
  tipologiaId: string;
  description: string;
  previewDoc: string;
  copyHtml: string;
  previewHeight: number;
}

export interface CorreosCatalogProps {
  tipologias: CatalogTipologia[];
  entries: CatalogEntry[];
}

const EMAIL_W = 600;
const CARD_W = 340;
const SCALE = CARD_W / EMAIL_W;

function EmailPreview({ entry }: { entry: CatalogEntry }): JSX.Element {
  const clipHeight = entry.kind === "banner" ? 240 * SCALE : 260;
  return (
    <div style={{ height: clipHeight, overflow: "hidden", background: "#FAFAFA", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "center" }}>
      <div style={{ width: CARD_W, height: clipHeight, overflow: "hidden", flexShrink: 0 }}>
        <iframe
          title={entry.name}
          srcDoc={entry.previewDoc}
          scrolling="no"
          style={{
            width: EMAIL_W,
            height: entry.previewHeight,
            border: "none",
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default function CorreosCatalog({ tipologias, entries }: CorreosCatalogProps): JSX.Element {
  const [filter, setFilter] = useState<string>("todos");
  const [search, setSearch] = useState<string>("");

  const visible = useMemo(function filterEntries() {
    const q = search.trim().toLowerCase();
    return entries.filter(function match(e) {
      if (filter !== "todos" && e.tipologiaId !== filter) return false;
      if (q && !`${e.name} ${e.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [entries, filter, search]);

  const countFor = useMemo(function countMap() {
    const m = new Map<string, number>();
    entries.forEach(function add(e) { m.set(e.tipologiaId, (m.get(e.tipologiaId) ?? 0) + 1); });
    return m;
  }, [entries]);

  const railItemBase = {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    width: "100%",
    textAlign: "left" as const,
    border: "none",
    cursor: "pointer",
    borderRadius: 9999,
    padding: "9px 16px",
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "inherit",
    transition: "background 0.15s ease, color 0.15s ease",
  };

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      {/* Rail de tipologías */}
      <aside style={{ width: 240, flexShrink: 0, position: "sticky", top: 96 }}>
        <input
          type="search"
          placeholder="Buscar correo..."
          value={search}
          onChange={function onSearch(e) { setSearch(e.target.value); }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: 38,
            padding: "0 14px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            fontSize: 13,
            fontFamily: "inherit",
            color: "#0f172a",
            outline: "none",
            marginBottom: 16,
          }}
        />
        <nav aria-label="Tipologías de correo" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <button
            type="button"
            onClick={function all() { setFilter("todos"); }}
            style={{ ...railItemBase, background: filter === "todos" ? "#2E0F70" : "transparent", color: filter === "todos" ? "#ffffff" : "#3b1782" }}
          >
            Todos <span style={{ fontWeight: 500, opacity: 0.65 }}>· {entries.length}</span>
          </button>
          {tipologias.map(function renderTip(t) {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={function pick() { setFilter(t.id); }}
                style={{ ...railItemBase, background: active ? "#2E0F70" : "transparent", color: active ? "#ffffff" : "#3b1782" }}
              >
                {t.label} <span style={{ fontWeight: 500, opacity: 0.65 }}>· {countFor.get(t.id) ?? 0}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Grid de cards */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {visible.map(function renderEntry(e) {
          return (
            <div key={e.id} className="cor-card" style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
              <EmailPreview entry={e} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 18px 16px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{e.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, background: e.kind === "banner" ? "#f1edff" : "#e6fbfb", color: e.kind === "banner" ? "#4f2ed8" : "#009699" }}>
                    {e.kind}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: 0, flex: 1 }}>{e.description}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <CopyHtmlButton html={e.copyHtml} />
                  <a
                    href={`/correos/${e.id}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#ffffff", color: "#0f172a", fontSize: 12, fontWeight: 600, textDecoration: "none" }}
                  >
                    Abrir <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <p style={{ fontSize: 13, color: "#94a3b8", gridColumn: "1 / -1", margin: "24px 0" }}>
            Sin resultados para este filtro.
          </p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
      `}} />
    </div>
  );
}
