/**
 * SectionHead — cabecera de las secciones planas del Index (título, bajada, filete y acción opcional).
 * La acción es el ProfileButton de Concorde (el mismo «Ir al Perfil» del Homepage).
 */
import type { JSX } from "react";
import ProfileButton from "@/src/components/ProfileButton";

export default function SectionHead({ title, subtitle, action }: { title: string; subtitle: string; action?: string }): JSX.Element {
  return (
    <header className="hib-section-head" style={{ boxSizing: "border-box", flex: "none", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, padding: "0 0 10px", marginBottom: 14, borderBottom: "1px solid #DEDCE4" }}>
      <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
        <h2 className="hib-section-head__title" style={{ margin: 0, fontSize: 16, lineHeight: "20px", fontWeight: 700, letterSpacing: "-0.01em", color: "#3b1782", whiteSpace: "nowrap" }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 12, lineHeight: "16.8px", color: "#6B6878" }}>{subtitle}</p>
      </div>
      {action ? <div style={{ flex: "none" }}><ProfileButton>{action}</ProfileButton></div> : null}
    </header>
  );
}
