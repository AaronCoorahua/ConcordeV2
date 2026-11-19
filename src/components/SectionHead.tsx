/**
 * SectionHead — encabezado de un bloque de formulario (mi-garaje-lab · Flujo Valorizar, paso Detalles: Mecánica, Estado del
 * vehículo…; y Publicar, paso Información: Datos de la publicación, Ubicación, Equipamiento…).
 * Ícono de Vidrio de 36 px, título 16/700 y, según el bloque: check naranja cuando está completo, una nota de AVT a la derecha
 * con la ⓘ de Concorde, o el estado «Faltan N» (borde teal de Negociable con punto que late), «Listo» u «Opcional».
 * Depende de React, Vidrio, CheckIcon e InfoIcon.
 */
import type { JSX } from "react";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import CheckIcon from "@/src/components/CheckIcon";
import InfoIcon from "@/src/components/InfoIcon";

export const SECTION_HEAD_CSS = String.raw`
.fl-sh { display:flex; align-items:center; gap:12px; }
.fl-sh__ico { display:grid; place-items:center; width:36px; height:36px; color:#5A35C2; }
.fl-sh__txt { min-width:0; display:grid; gap:2px; }
.fl-sh__txt small { font-size:.875rem; color:#6B6878; }
.fl-sh .fl-sub__t { margin:0; display:inline-flex; align-items:center; gap:8px; font-size:1rem; font-weight:700; color:#3B1782; }
.fl-sh .fl-gdone { display:inline-grid; animation:fl-sh-pop .35s cubic-bezier(.2,1.4,.4,1) both; }
.fl-sh .fl-gtip { margin-left:auto; display:inline-flex; align-items:center; gap:6px; font-size:.75rem; font-weight:600; color:#5A35C2; white-space:nowrap; }
.fl-sh__st { display:inline-flex; align-items:center; gap:6px; height:24px; padding:0 10px 0 8px; border-radius:9999px; font-size:.75rem; font-weight:700; white-space:nowrap; color:#006E70;
  border:1px solid transparent; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#00A8AB,#8460E5) border-box; box-shadow:0 2px 8px rgba(0,168,171,.18); }
.fl-sh__st::before { content:""; width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#30E8EC,#00A8AB); box-shadow:0 0 0 2px rgba(0,168,171,.18); animation:fl-sh-pulse 2s ease-in-out infinite; }
.fl-sh__st.is-ok, .fl-sh__st.is-opt { gap:4px; padding:0 10px; border:0; box-shadow:none; }
.fl-sh__st.is-ok::before, .fl-sh__st.is-opt::before { content:none; }
.fl-sh__st.is-ok { color:#3B1782; background:#F5F0FF; animation:fl-sh-pop .36s cubic-bezier(.16,1,.3,1); }
.fl-sh__st.is-opt { font-weight:600; color:#6B6878; background:#F3F2F6; }
@keyframes fl-sh-pop { from { opacity:0; transform:scale(.5); } }
@keyframes fl-sh-pulse { 50% { opacity:.35; transform:scale(.7); } }
@media (max-width:640px) { .fl-sh { flex-wrap:wrap; } .fl-sh .fl-gtip { flex-basis:100%; margin-left:48px; } }
@media (prefers-reduced-motion:reduce) { .fl-sh .fl-gdone, .fl-sh__st.is-ok, .fl-sh__st::before { animation:none; } }
`;

export interface SectionHeadProps {
  /** Ícono de Vidrio del bloque (p. ej. «caja» para Mecánica, «ubicacion» para Ubicación). */
  icon: Sec;
  /** Título del bloque. */
  title: string;
  /** id del título (para aria-labelledby de la sección). */
  titleId?: string;
  /** Bajada bajo el título (p. ej. «Completa lo que no indicaste en la valorización»). */
  hint?: string;
  /** Bloque completo: check naranja junto al título. */
  done?: boolean;
  /** Nota de AVT a la derecha, con la ⓘ (p. ej. «típico · toca para cambiar»). */
  tip?: string;
  /** Estado a la derecha del título: cuántos datos faltan, «ok» (Listo) u «optional» (Opcional). */
  status?: number | "ok" | "optional";
}

export function SectionHead({ icon, title, titleId, hint, done, tip, status }: SectionHeadProps): JSX.Element {
  return <>
    <style href="concorde-section-head" precedence="default">{SECTION_HEAD_CSS}</style>
    <div className="fl-sh"><span className="fl-sh__ico vd-host" aria-hidden><Vidrio s={icon} size={36} /></span>
      <div className="fl-sh__txt"><h2 id={titleId} className="fl-sub__t">{title}{done ? <span key="ok" className="fl-gdone"><CheckIcon size={20} title="Completo" /></span> : null}</h2>{hint ? <small>{hint}</small> : null}</div>
      {tip ? <span className="fl-gtip"><InfoIcon size={16} />{tip}</span> : null}
      {status === undefined ? null : status === "optional" ? <span className="fl-sh__st is-opt">Opcional</span>
        : status === "ok" ? <span key="ok" className="fl-sh__st is-ok"><CheckIcon size={14} /> Listo</span>
        : <span className="fl-sh__st">{status === 1 ? "Falta 1" : `Faltan ${status}`}</span>}
    </div>
  </>;
}

export default SectionHead;
