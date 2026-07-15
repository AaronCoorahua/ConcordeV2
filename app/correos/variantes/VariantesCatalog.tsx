"use client";

/**
 * VariantesCatalog — catálogo interactivo de los 45 correos REALES de
 * producción, portado del home de Concorde-Email con el estilo de Concorde:
 *
 *   · sidebar con buscador + filtro por categoría (con conteos)
 *   · correos agrupados por categoría → paso del flujo (STAGE_ORDER)
 *   · al filtrar una categoría con flujo, se muestra el FlowDiagram
 *   · cada card: preview real en iframe + pill categoría·paso + Copy HTML + Open
 *
 * Importa EMAILS/generateEmail directamente (módulos planos, sin node:fs), así
 * el HTML se genera en el cliente igual que en el catálogo original — nada de
 * serializar 45 correos como props.
 */

import { useMemo, useState } from "react";
import type { JSX } from "react";
import { EMAILS, CATEGORY_GRADIENT, STAGE_ORDER, type EmailTemplate } from "@/src/emails/prodEmails";
import { generateEmail } from "@/src/emails/prodEmailTemplates";
import { FlowDiagram } from "./FlowDiagram";

const INK = "#0f172a";
const BODY = "#64748b";
const MUTED = "#94a3b8";
const DIVIDER = "#e2e8f0";
const PURPLE = "#2E0F70";
const STAGE_ACCENT = "#c85a1e";
const GENERAL = "General";

/** Ancho real del correo de prod (tabla 600 + padding 20). */
const EMAIL_W = 640;

function categoryOf(e: EmailTemplate): string {
  return e.category ?? GENERAL;
}

function copyText(text: string, done: () => void): void {
  navigator.clipboard.writeText(text).then(done, function fallback() {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    done();
  });
}

function groupBy<T>(items: T[], key: (item: T) => string): Array<[string, T[]]> {
  const groups = items.reduce<Record<string, T[]>>(function collect(acc, item) {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
  return Object.entries(groups);
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function EmailCard({ email }: { email: EmailTemplate }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const html = useMemo(function render() { return generateEmail(email.sections, email.subject); }, [email]);
  const gradient = CATEGORY_GRADIENT[categoryOf(email)];

  return (
    <div className="cor-card" style={{ background: "#fff", borderRadius: 12, border: `1px solid ${DIVIDER}`, overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
      <a href={`/correos/${email.id}`} style={{ display: "block", position: "relative", height: 260, overflow: "hidden", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
        <iframe
          srcDoc={html}
          title={email.name}
          scrolling="no"
          tabIndex={-1}
          style={{ border: "none", width: EMAIL_W, transform: "scale(0.5)", transformOrigin: "top center", height: 1040, display: "block", margin: "0 auto", pointerEvents: "none", background: "#fff" }}
        />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, background: "linear-gradient(180deg, rgba(248,250,252,0) 0%, #f8fafc 90%)" }} />
      </a>
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          {email.stage && (
            <span
              style={{
                display: "inline-block", marginBottom: 7, padding: "3px 9px", borderRadius: 9999,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff",
                ...(gradient ? { backgroundImage: gradient } : { backgroundColor: MUTED }),
              }}
            >
              {categoryOf(email)} · {email.stage}
            </span>
          )}
          <h3 className="cor-name" style={{ fontSize: 14, fontWeight: 700, color: INK, margin: 0, letterSpacing: "-0.01em" }}>{email.name}</h3>
          <p style={{ fontSize: 12, color: BODY, margin: "4px 0 0", lineHeight: 1.5 }}>{email.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <button
            type="button"
            onClick={function doCopy() {
              copyText(html, function done() {
                setCopied(true);
                setTimeout(function reset() { setCopied(false); }, 1800);
              });
            }}
            style={{ flex: 1, height: 34, borderRadius: 8, border: "none", cursor: "pointer", background: copied ? "#00AEB1" : PURPLE, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, transition: "background .2s" }}
          >
            {copied ? "¡Copiado!" : "Copiar HTML"}
          </button>
          <a href={`/correos/${email.id}`} style={{ height: 34, padding: "0 16px", borderRadius: 8, border: `1px solid ${DIVIDER}`, background: "#fff", color: INK, fontSize: 12, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            Abrir
          </a>
        </div>
      </div>
    </div>
  );
}

function EmailGrid({ emails }: { emails: EmailTemplate[] }): JSX.Element {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
      {emails.map(function renderCard(email) { return <EmailCard key={email.id} email={email} />; })}
    </div>
  );
}

// ─── Catálogo ─────────────────────────────────────────────────────────────────

export default function VariantesCatalog(): JSX.Element {
  const categoryGroups = useMemo(function build() {
    return groupBy(EMAILS, categoryOf).sort(function generalLast(a, b) {
      if (a[0] === GENERAL) return 1;
      if (b[0] === GENERAL) return -1;
      return 0;
    });
  }, []);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<{ category: string | null; stage: string | null }>({ category: null, stage: null });

  const filtered = useMemo(function filter() {
    const q = query.trim().toLowerCase();
    return EMAILS.filter(function matches(e) {
      const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q);
      const matchesCategory = !active.category || categoryOf(e) === active.category;
      const matchesStage = !active.stage || e.stage === active.stage;
      return matchesQuery && matchesCategory && matchesStage;
    });
  }, [query, active]);

  const filteredGroups = useMemo(function group() {
    if (query.trim()) return null;
    const cats = active.category
      ? categoryGroups.filter(function only([c]) { return c === active.category; })
      : categoryGroups;
    return cats
      .map(function toGroup([category]) {
        const emails = filtered.filter(function inCat(e) { return categoryOf(e) === category; });
        const stages = groupBy(emails, function byStage(e) { return e.stage ?? ""; })
          .filter(function named([stage]) { return stage !== ""; });
        return { category, emails, stages };
      })
      .filter(function nonEmpty(g) { return g.emails.length > 0; });
  }, [filtered, categoryGroups, active, query]);

  const showDiagram = Boolean(active.category) && Boolean(STAGE_ORDER[active.category ?? ""]) && !query.trim();

  const pillStyle = function pillStyle(isActive: boolean) {
    return {
      display: "block", width: "100%", textAlign: "left" as const, padding: "7px 10px", borderRadius: 8,
      border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13,
      background: isActive ? PURPLE : "transparent", color: isActive ? "#fff" : BODY, fontWeight: isActive ? 700 : 600,
    };
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, alignItems: "start" }}>
      {/* ── Sidebar ── */}
      <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 4 }}>
        <input
          value={query}
          onChange={function onChange(e) { setQuery(e.target.value); }}
          placeholder="Buscar correo…"
          style={{ padding: "10px 14px", borderRadius: 10, border: `1px solid ${DIVIDER}`, fontFamily: "inherit", fontSize: 13, color: INK, marginBottom: 12, outline: "none" }}
        />
        <button type="button" onClick={function all() { setActive({ category: null, stage: null }); }} style={pillStyle(!active.category)}>
          Todos <span style={{ opacity: 0.7 }}>· {EMAILS.length}</span>
        </button>
        {categoryGroups.map(function renderPill([category, emails]) {
          return (
            <button
              key={category}
              type="button"
              onClick={function pick() { setActive({ category, stage: null }); }}
              style={{ ...pillStyle(active.category === category), fontWeight: 700 }}
            >
              {category} <span style={{ opacity: 0.6, fontWeight: 600 }}>· {emails.length}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main ── */}
      <main>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "#4f2ed8", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 20px" }}>
          {filtered.length} {filtered.length === 1 ? "correo" : "correos"}
        </h2>

        {showDiagram && active.category && (
          <FlowDiagram
            category={active.category}
            emails={EMAILS.filter(function inCat(e) { return categoryOf(e) === active.category; })}
            activeStage={active.stage}
            onSelectStage={function pickStage(stage) { setActive({ category: active.category, stage }); }}
          />
        )}

        {filtered.length === 0 && <p style={{ color: BODY, fontSize: 14 }}>Sin resultados para esta búsqueda.</p>}

        {showDiagram ? (
          <EmailGrid emails={filtered} />
        ) : filteredGroups ? (
          filteredGroups.map(function renderGroup({ category, emails, stages }) {
            return (
              <div key={category} style={{ marginBottom: 44 }}>
                {(filteredGroups.length > 1 || !active.category) && (
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: INK, letterSpacing: "-0.01em", margin: "0 0 16px" }}>{category}</h3>
                )}
                {stages.length > 0
                  ? stages.map(function renderStage([stage, stageEmails]) {
                      return (
                        <div key={stage} style={{ marginBottom: 28 }}>
                          <h4 style={{ fontSize: 12, fontWeight: 700, color: STAGE_ACCENT, letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 12px" }}>{stage}</h4>
                          <EmailGrid emails={stageEmails} />
                        </div>
                      );
                    })
                  : <EmailGrid emails={emails} />}
              </div>
            );
          })
        ) : (
          <EmailGrid emails={filtered} />
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
        .cor-card:hover .cor-name { color: #4f2ed8; }
      `}} />
    </div>
  );
}
