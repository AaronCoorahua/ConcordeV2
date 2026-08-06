import type { JSX } from "react";
import Link from "next/link";
import Header from "@/app/_components/Header";
import { TIPO_GROUPS, type TipoGroup } from "@/src/emails/tipologiasRegistry";

/**
 * /correos/tipologias — layouts base del banner header de los correos.
 *
 * Una tipología = un LAYOUT. Todas comparten el lenguaje visual V2 (gradiente +
 * chevrons + anillos) y se muestran con el fondo «En Vivo»; dentro del detalle,
 * un tab permite verlas sobre cualquiera de los 5 fondos.
 */

const THUMB_H = 240;
const EMAIL_W = 600;
const SCALE = 0.5;

function TipoCard({ g }: { g: TipoGroup }): JSX.Element {
  // El thumbnail muestra el primer tono (En Vivo) de la tipología.
  const banner = g.plantillas[0].fondos[0];
  // El alto del iframe se ajusta al del banner (214 izq/der · 340 centrado) para
  // mostrarlo completo sin recortar. La caja escalada crece con él.
  const innerH = g.plantillas[0].previewHeight;
  const boxH = Math.round(innerH * SCALE);
  return (
    <Link href={`/correos/tipologias/${g.tipologia.id}`} className="cor-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid var(--ui-border)", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
      <div style={{ minHeight: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ui-subtle)", borderBottom: "1px solid var(--ui-border-soft)", padding: "16px 0" }}>
        <div style={{ width: EMAIL_W * SCALE, height: boxH, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid var(--ui-border)", background: "var(--ui-subtle)" }}>
          <iframe
            title={g.tipologia.label}
            srcDoc={banner.previewDoc}
            scrolling="no"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: EMAIL_W,
              height: innerH,
              border: "none",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "14px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, fontFamily: "monospace", minWidth: 20, height: 20, padding: "0 5px", borderRadius: 6, background: "var(--ui-accent-soft)", color: "var(--ui-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{g.tipologia.letra}</span>
            <span className="cor-name" style={{ fontSize: 14, fontWeight: 700, color: "var(--ui-ink)", letterSpacing: "-0.01em" }}>{g.tipologia.label}</span>
          </div>
          <span className="cor-arrow" aria-hidden="true" style={{ fontSize: 15, color: "var(--ui-border-hover)" }}>→</span>
        </div>
        <p style={{ fontSize: 12, color: "var(--ui-muted)", lineHeight: 1.5, margin: 0 }}>{g.tipologia.descripcion}</p>
      </div>
    </Link>
  );
}

export default function TipologiasPage(): JSX.Element {
  const banners = TIPO_GROUPS.filter(function isBanner(g) { return g.kind === "banner" && g.variant === "clean"; });
  const footers = TIPO_GROUPS.filter(function isFooter(g) { return g.kind === "footer"; });
  const legacy = TIPO_GROUPS.filter(function isLegacy(g) { return g.kind === "banner" && g.variant === "legacy"; });
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <Link
          href="/correos"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ui-body)", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Correos
        </Link>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ui-ink)", margin: 0 }}>Tipologías</h1>
          <span style={{ fontSize: 13, color: "var(--ui-muted)", fontWeight: 500 }}>
            {TIPO_GROUPS.length} layouts · 5 tonos
          </span>
        </div>
        <p style={{ fontSize: 14, color: "var(--ui-body)", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 720 }}>
          Banner header de los correos, en el estilo Voyager v2: gradiente por tono, anillos de fondo
          y el logo real de marca. La tipología define{" "}
          <strong style={{ color: "var(--ui-ink)", fontWeight: 700 }}>dónde va cada pieza</strong>; el tono
          es un eje aparte — entra y cámbialo con el tab para verla sobre los 5 tonos.
        </p>

        {/* ── Banners header ── */}
        {banners.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "var(--ui-accent-soft)", color: "var(--ui-accent)" }}>Banner</span>
              <h2 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--ui-ink)", margin: 0 }}>Banner header</h2>
              <span style={{ fontSize: 12, color: "var(--ui-muted)", fontWeight: 500 }}>· {banners.length} layouts</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ui-muted)", lineHeight: 1.5, margin: "0 0 18px", maxWidth: 640 }}>
              El banner que abre el correo: composición marca↔copy sobre el gradiente del tono.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: footers.length > 0 ? 48 : 0 }}>
              {banners.map(function renderTipo(g) { return <TipoCard key={g.tipologia.id} g={g} />; })}
            </div>
          </>
        )}

        {/* ── Banner 2 (cierre del correo) ── */}
        {footers.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "#fff0e6", color: "#c85a1e" }}>Cierre</span>
              <h2 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--ui-ink)", margin: 0 }}>Banner 2</h2>
              <span style={{ fontSize: 12, color: "var(--ui-muted)", fontWeight: 500 }}>· {footers.length} layouts</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ui-muted)", lineHeight: 1.5, margin: "0 0 18px", maxWidth: 640 }}>
              El cierre del correo: marca, «¿Quieres saber más?» y el botón ¡Vamos!, reordenados sobre el mismo sistema de fondos.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {footers.map(function renderTipo(g) { return <TipoCard key={g.tipologia.id} g={g} />; })}
            </div>
          </>
        )}

        {/* ── Legacy: la composición anterior, con pill y bajada ── */}
        {legacy.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 48, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "var(--ui-border-soft)", color: "var(--ui-body)" }}>Legacy</span>
              <h2 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--ui-ink)", margin: 0 }}>Banner con pill y bajada</h2>
              <span style={{ fontSize: 12, color: "var(--ui-muted)", fontWeight: 500 }}>· {legacy.length} layouts</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ui-muted)", lineHeight: 1.5, margin: "0 0 18px", maxWidth: 640 }}>
              La composición anterior, que además del título llevaba la pill de categoría y una bajada.
              Se conserva para los correos ya maquetados con ella.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {legacy.map(function renderTipo(g) { return <TipoCard key={g.tipologia.id} g={g} />; })}
            </div>
          </>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: var(--ui-border-hover); transform: translateY(-2px); }
        .cor-card:hover .cor-name { color: var(--ui-accent); }
        .cor-card:hover .cor-arrow { color: var(--ui-accent); transform: translateX(3px); transition: color 0.2s ease, transform 0.2s ease; }
      `}} />
    </div>
  );
}
