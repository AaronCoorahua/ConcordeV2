"use client";

/**
 * ActivitySection — sección plegable de Tu actividad (Mi Garaje, /blocks/mi-garaje/m/vmc: Mis negociaciones, Mis
 * participaciones, Mis compras, Mis publicaciones y Mis valorizaciones). Encabezado con el ícono de vidrio de la sección,
 * el título, un círculo con las novedades sin abrir y la flecha naranja; al tocarlo, el cuerpo se abre o se pliega (alto y
 * opacidad, 200 ms). Plegada, el cuerpo queda montado e inerte. Las secciones van una debajo de otra, separadas por una línea.
 * Depende de React y Vidrio.
 */
import type { CSSProperties, JSX, ReactNode } from "react";
import { Vidrio, type Sec } from "@/src/components/Vidrio";

export const ACTIVITY_SECTION_CSS = String.raw`
.fs + .fs { border-top:1px solid #E1E3E2; }
.fs { scroll-margin-top:24px; }
.fs__head { display:flex; align-items:center; gap:16px; padding:6px 20px 6px 8px; }
.fs__toggle { all:unset; box-sizing:border-box; flex:1; min-width:0; cursor:pointer; display:flex; align-items:center; gap:16px; padding:14px 12px; border-radius:14px; transition:background-color .15s; }
.fs__toggle:hover { background:var(--vmc-color-vault-100); }
.fs__toggle:focus-visible { outline:2px solid #8460E5; outline-offset:-2px; }
.fs__title { display:flex; align-items:center; gap:10px; flex:none; }
.fs__h { margin:0; flex:1; min-width:0; display:flex; font:inherit; }
.fs__name { font-size:1.125rem; font-weight:800; letter-spacing:-0.01em; color:#3B1782; }
.fs__chev { margin-left:auto; display:grid; transition:transform .2s cubic-bezier(.2,.8,.2,1); }
.fs__chev { transform:rotate(90deg); }
.fs.is-open .fs__chev { transform:rotate(-90deg); }
.fs__body { display:grid; gap:8px; padding:0 20px 14px; }
@media (max-width:829px) { .fs__head { padding:4px; } }
@media (max-width:829px) { .fs__head > :not(.fs__h) { display:none; } }
@media (max-width:829px) { .fs__toggle { padding:14px 12px; gap:4px 10px; flex-wrap:wrap; } }
@media (max-width:829px) { .fs__title { flex:1; min-width:0; flex-wrap:wrap; } }
@media (max-width:829px) { .fs__chev { order:2; } }
@media (max-width:829px) { .fs__body { padding:0 14px 12px; } }
@media (prefers-reduced-motion:reduce) { .fs__chev, .fs__toggle { transition:none; } }
.fs__name { font-size:1.0625rem; }
.fs__icon { flex:none; display:grid; place-items:center; width:30px; height:30px; border-radius:9px; color:#5A35C2; background:#F5F0FF; }
.fs__toggle { display:grid; grid-template-columns:270px 150px minmax(0,1fr) 20px; gap:12px; }
.fs__name { white-space:nowrap; }
.fs__chev { margin-left:0; justify-self:end; grid-column:4; }
@media (max-width:829px) { .fs__toggle { grid-template-columns:minmax(0,1fr) 20px; } }
@media (max-width:829px) { .fs__chev { grid-row:1; grid-column:2; } }
.fs__name { font-size:1.125rem; font-weight:800; }
.fs__wrap { display:grid; grid-template-rows:0fr; opacity:0; overflow:hidden; transition:grid-template-rows .2s cubic-bezier(.25,.8,.25,1), opacity .2s cubic-bezier(.25,.8,.25,1); }
.fs.is-open .fs__wrap { grid-template-rows:1fr; opacity:1; }
.fs__wrap > .fs__body { min-height:0; overflow:hidden; }
.fs__toggle { grid-template-columns:minmax(0,1fr) auto auto 20px; }
.fs__chev { order:4; grid-column:auto; }
@media (max-width:829px) { .fs__toggle { grid-template-columns:minmax(0,1fr) auto 20px; } }
@media (max-width:829px) { .fs__chev { grid-column:3; grid-row:1; } }
@media (prefers-reduced-motion:reduce) { .fs__wrap { transition:none; } }
@media (max-width:829px) { .fs__toggle { grid-template-columns:minmax(0,1fr) 20px; } }
@media (max-width:829px) { .fs__title { flex-wrap:nowrap; } }
@media (max-width:829px) { .fs__chev { grid-column:2; grid-row:1; } }
.fs__icon { width:36px; height:36px; border-radius:12px; background:linear-gradient(135deg,#F5F0FF,#EDE6FF); box-shadow:inset 0 1px 0 #fff, inset 0 0 0 1px rgba(132,96,229,.14); transition:background .2s; }
.fs__icon path { fill:var(--ico); }
.fs__toggle:hover .fs__icon { background:linear-gradient(135deg,#FFF8F1,#FFEBD6); }
.fs__toggle:hover .fs__icon path { fill:var(--ico-h); }
@media (prefers-reduced-motion:reduce) { .fs__icon { transition:none; } }
@media (min-width:1024px) { .fs__toggle { grid-template-columns:minmax(0,1fr) auto 20px; } }
@media (min-width:1024px) { .fs__chev { grid-row:1; grid-column:3; } }
@media (min-width:1024px) { .fs__name { font-size:.9375rem; } }
@media (min-width:1024px) { .fs__icon { width:32px; height:32px; } }
.fs__icon--glass, .fs__toggle:hover .fs__icon--glass { width:40px; height:40px; border-radius:0; background:none; box-shadow:none; }
@media (min-width:1024px) { .fs__name { font-size:.875rem; font-weight:700; color:#3B1782; } }
@media (min-width:1024px) { .fs__head { padding:4px 16px 4px 4px; } }
@media (min-width:1024px) { .fs__toggle { padding:10px 12px; gap:10px; } }
@media (min-width:1024px) { .fs__icon { width:28px; height:28px; border-radius:8px; } }
@media (min-width:1024px) { .fs__icon svg { width:16px; height:16px; } }
@media (min-width:1024px) { .fs__body { padding:0 16px 8px; } }
@media (min-width:1024px) { .fs__head { padding:8px 16px 8px 8px; } }
@media (min-width:1024px) { .fs__body { padding:0 8px 12px; } }
@media (min-width:1024px) { .fs__icon.fs__icon--glass, .fs__toggle:hover .fs__icon.fs__icon--glass { width:36px; height:36px; border-radius:0; background:none; box-shadow:none; } }
@media (min-width:1024px) { .fs__icon--glass svg.vd { width:36px; height:36px; } }
.fs__badge { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 6px; border-radius:9999px; font-size:.75rem; font-weight:700; line-height:1; color:#fff; background:#3B1782; font-variant-numeric:tabular-nums; }
.fs + .fs { border-top:1px solid #E1E3E2; }
.fs__toggle:hover { background:#F4F3F7; }
.fs__body { transition:padding .2s cubic-bezier(.25,.8,.25,1); }
.fs:not(.is-open) .fs__body { padding-bottom:0; }
.fs__head, .fs__toggle { transition:padding .2s cubic-bezier(.25,.8,.25,1), background-color .15s; }
.fs:not(.is-open) > .fs__head { padding-block:2px; }
.fs:not(.is-open) .fs__toggle { padding-block:6px; }
@media (prefers-reduced-motion:reduce) { .fs__body, .fs__head, .fs__toggle { transition:none; } }
.fs + .fs { border-top:1px solid #E1E3E2; }
.fs__body { padding-top:4px; }
.fs__title { gap:12px; }
.fs__name { font-size:1rem; font-weight:700; }
.fs__icon--glass, .fs__icon--glass svg.vd { width:36px; height:36px; }
.fs__chev .g-chev { color:#ED8936; }
.fs__badge .g-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
`;

export interface ActivitySectionProps {
  /** Identificador de la sección (p. ej. «negociaciones»): arma los id sec-…, fs-… y fs-body-…. */
  id: string;
  /** Título (p. ej. «Mis negociaciones»). */
  title: string;
  /** Ícono de vidrio de la sección (nombre de Vidrio: negociaciones, participaciones, compras, publicaciones, valorizaciones). */
  icon: Sec;
  /** Novedades sin abrir. Con 0 no se muestra el círculo. */
  count?: number;
  /** Abierta. */
  open: boolean;
  /** Al tocar el encabezado. */
  onToggle: () => void;
  /** Clases extra de la sección. */
  className?: string;
  /** Contenido del cuerpo (pestañas, filas, paginado o el texto de sección vacía). */
  children: ReactNode;
}

const Chevron = () => <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ActivitySection({ id, title, icon, count = 0, open, onToggle, className, children }: ActivitySectionProps): JSX.Element {
  return <>
    <style href="concorde-activity-section" precedence="default">{ACTIVITY_SECTION_CSS}</style>
    <section className={`fs fs--${id}${open ? " is-open" : ""}${className ? ` ${className}` : ""}`} id={`sec-${id}`} aria-labelledby={`fs-${id}`}>
      <header className="fs__head" style={{ viewTransitionName: `fsh-${id}` } as CSSProperties}>
        <h3 className="fs__h"><button type="button" className="fs__toggle vd-host" aria-expanded={open} aria-controls={`fs-body-${id}`} onClick={onToggle}>
          <span className="fs__title"><span className="fs__icon fs__icon--glass" aria-hidden><Vidrio s={icon} size={36} /></span><span id={`fs-${id}`} className="fs__name">{title}</span>
            {count ? <span className="fs__badge"><span aria-hidden>{count}</span><span className="g-sr">{count} {count === 1 ? "notificación sin abrir" : "notificaciones sin abrir"}</span></span> : null}</span>
          <span className="fs__chev"><Chevron /></span>
        </button></h3>
      </header>
      <div className="fs__wrap" inert={!open}><div id={`fs-body-${id}`} className="fs__body">{children}</div></div>
    </section>
  </>;
}

export default ActivitySection;
