import type { JSX } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import BannerLab from "./BannerLab";
import { EMAIL_GROUPS, getEmailReal, type EmailGroup, type EmailReal } from "@/src/emails/registry";

/**
 * /correos/[id] — detalle de UN correo real de producción: preview completo a
 * tamaño real, asunto, «Copiar HTML» y los correos a los que deriva en el flujo
 * (`leadsTo`). Equivalente al /correo/[id] del catálogo de Concorde-Email.
 *
 * El header del correo es intercambiable (BannerLab): un tab elige la tipología
 * de banner y otro el fondo; el botón copia la combinación activa.
 */

export function generateStaticParams(): Array<{ id: string }> {
  return EMAIL_GROUPS.flatMap(function toParams(g) {
    return g.correos.map(function toParam(c) { return { id: c.id }; });
  });
}

/** El grupo (categoría) al que pertenece un correo, para su pill y gradiente. */
function groupOf(correoId: string): EmailGroup | undefined {
  return EMAIL_GROUPS.find(function contains(g) {
    return g.correos.some(function byId(c) { return c.id === correoId; });
  });
}

export default async function CorreoPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const correo = getEmailReal(id);
  if (!correo) notFound();

  const group = groupOf(correo.id);
  const siguientes = correo.leadsTo
    .map(function resolve(nextId) { return getEmailReal(nextId); })
    .filter(function exists(x): x is EmailReal { return Boolean(x); });

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <a
          href="/correos/variantes"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Variantes
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{correo.name}</h1>
          {group && correo.stage && (
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "3px 10px", borderRadius: 9999, color: "#ffffff", backgroundImage: group.gradient }}>
              {group.label} · {correo.stage}
            </span>
          )}
          <div style={{ flex: 1 }} />
          <a
            href={`/correos/editor?desde=${correo.id}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#ffffff", color: "#0f172a", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
          >
            ✏️ Abrir en editor
          </a>
        </div>

        <div style={{ margin: "0 0 6px", display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0 }}>Asunto</span>
          <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{correo.subject}</span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", lineHeight: 1.5, maxWidth: 640 }}>{correo.desc}</p>

        <Suspense fallback={<div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>Cargando editor…</div>}>
          <BannerLab html={correo.html} title={correo.name} subject={correo.subject} categoria={group?.label ?? "General"} />
        </Suspense>

        {siguientes.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Sigue en el flujo
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10, maxWidth: 640 }}>
              {siguientes.map(function renderNext(n) {
                const nGroup = groupOf(n.id);
                return (
                  <a
                    key={n.id}
                    href={`/correos/${n.id}`}
                    className="cor-flow"
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#ffffff", textDecoration: "none", transition: "border-color 0.15s ease, box-shadow 0.15s ease" }}
                  >
                    {nGroup && n.stage && (
                      <span style={{ flexShrink: 0, padding: "3px 9px", borderRadius: 9999, fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#ffffff", backgroundImage: nGroup.gradient }}>
                        {n.stage}
                      </span>
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{n.name}</span>
                    <span aria-hidden="true" style={{ marginLeft: "auto", color: "#cbd5e1", fontSize: 13 }}>→</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {correo.leadsTo.length === 0 && correo.stage && (
          <p style={{ marginTop: 20, fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Correo final de este flujo
          </p>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-flow:hover { border-color: #cbd5e1; box-shadow: 0 4px 14px rgba(15,23,42,0.08); }
      `}} />
    </div>
  );
}
