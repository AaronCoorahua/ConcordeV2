/**
 * Pagination — numeración de páginas ‹ 1 2 3 › al pie de una lista (Mi Garaje, mi-garaje-lab · Paginado de Tu actividad).
 * Solo dibuja: la página actual y el cambio de página los maneja quien la usa. variant="solid" marca la actual en un
 * círculo violeta; variant="glass" pone los números en una píldora de vidrio. Solo depende de React.
 */
import type { JSX } from "react";

export const PAGINATION_CSS = String.raw`
.pg-foot { display:flex; align-items:center; justify-content:center; padding:6px 0 2px; }
.pg-nums { --pg:22px; --pg-f:.75rem; gap:4px; }
.pg-nums--s { --pg:18px; --pg-f:.6875rem; gap:2px; padding-top:4px; }
.pg-nums__set { display:flex; align-items:center; gap:2px; }
.pg-arrow, .pg-num { display:grid; place-items:center; min-width:var(--pg); height:var(--pg); padding:0 3px; box-sizing:border-box; border:0; border-radius:9999px; background:none;
  font:inherit; font-size:var(--pg-f); font-weight:600; line-height:1; color:#6B6878; cursor:pointer; transition:background .15s, color .15s, box-shadow .15s; }
.pg-nums--s .pg-arrow svg { width:12px; height:12px; }
.pg-arrow { color:#3B1782; } .pg-arrow:disabled { opacity:.3; cursor:default; }
.pg-num:hover, .pg-arrow:hover:not(:disabled) { background:#F5F0FF; color:#3B1782; }
.pg-num:focus-visible, .pg-arrow:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
/* Sólido: la actual en círculo violeta. */
.pg-nums--paginas .pg-num[aria-current="page"] { background:#3B1782; color:#fff; font-weight:700; }
/* Vidrio: los números en una píldora de vidrio; la actual, violeta translúcido con brillo y borde lila. */
.pg-nums--glass .pg-nums__set { padding:2px; border-radius:9999px; background:linear-gradient(180deg, rgba(255,255,255,.9), rgba(245,240,255,.7));
  box-shadow:inset 0 0 0 1px rgba(174,142,255,.45), inset 0 1px 0 #fff, 0 2px 8px rgba(132,96,229,.15); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); }
.pg-nums--glass .pg-num[aria-current="page"] { color:#fff; font-weight:700; background:linear-gradient(160deg, rgba(174,142,255,.95) 0%, rgba(132,96,229,.92) 45%, rgba(90,53,194,.95) 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55), inset 0 0 0 1px rgba(255,255,255,.25), 0 2px 6px rgba(90,53,194,.35); }
.pg-nums--glass .pg-arrow { background:rgba(255,255,255,.7); box-shadow:inset 0 0 0 1px rgba(174,142,255,.4); }
@media (prefers-reduced-motion: reduce) { .pg-arrow, .pg-num { transition:none; } }
`;

export interface PaginationProps {
  /** Página actual, desde 0. */
  page: number;
  /** Cantidad de páginas. */
  pages: number;
  /** Se llama con la página elegida (desde 0), ya acotada entre la primera y la última. */
  onChange: (page: number) => void;
  /** Qué se pagina, para el lector de pantalla: «Páginas de {label}». */
  label: string;
  /** "solid": la actual en círculo violeta. "glass": números en píldora de vidrio. Por defecto "solid". */
  variant?: "solid" | "glass";
  /** "m": botones de 22 px. "s": botones de 18 px. Por defecto "m". */
  size?: "m" | "s";
}

const Chev = ({ dir }: { dir: 1 | -1 }) => <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden><path d={dir > 0 ? "M8 5l5 5-5 5" : "M12 5l-5 5 5 5"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function Pagination({ page, pages, onChange, label, variant = "solid", size = "m" }: PaginationProps): JSX.Element {
  const n = Math.max(1, pages), p = Math.min(Math.max(0, page), n - 1);
  const go = (x: number) => onChange(Math.max(0, Math.min(n - 1, x)));
  // La clase de la forma sólida conserva su nombre del lab («paginas») para no romper estilos que ya la usan.
  return <>
    <style href="concorde-pagination" precedence="default">{PAGINATION_CSS}</style>
    <nav className={`pg-foot pg-nums pg-nums--${variant === "glass" ? "glass" : "paginas"} pg-nums--${size}`} aria-label={`Páginas de ${label}`}>
      <button type="button" className="pg-arrow" aria-label="Página anterior" disabled={p === 0} onClick={() => go(p - 1)}><Chev dir={-1} /></button>
      <span className="pg-nums__set">{Array.from({ length: n }, (_, i) => <button key={i} type="button" className="pg-num" aria-current={i === p ? "page" : undefined} onClick={() => go(i)}>{i + 1}</button>)}</span>
      <button type="button" className="pg-arrow" aria-label="Página siguiente" disabled={p === n - 1} onClick={() => go(p + 1)}><Chev dir={1} /></button>
    </nav>
  </>;
}

export default Pagination;
