import type { JSX } from "react";
import { Suspense } from "react";
import Header from "@/app/_components/Header";
import EditorApp from "./EditorApp";

/**
 * /correos/editor — editor visual de correos (estilo Elementor/Figma) sobre el
 * renderer real de producción: paleta de bloques + canvas clicable + panel de
 * propiedades. Acepta `?desde=<id>` para arrancar desde un correo real.
 */

export default function EditorPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px 80px" }}>
        <a
          href="/correos"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 12 }}
        >
          <span aria-hidden="true">←</span> Correos
        </a>

        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Editor</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            maqueta un correo con los bloques reales de producción y copia su HTML
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 760 }}>
          Haz clic en un bloque de la paleta para agregarlo, selecciona cualquier sección del correo
          para editar sus textos e imágenes, y configura banner/footer/fondo sin nada seleccionado.
          «Copiar HTML» exporta el correo email-safe listo para tu plataforma de envío.
        </p>

        <Suspense fallback={<div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>Cargando editor…</div>}>
          <EditorApp />
        </Suspense>
      </main>
    </div>
  );
}
