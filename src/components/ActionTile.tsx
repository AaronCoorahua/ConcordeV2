/**
 * ActionTile — acceso grande del riel de Mi Garaje (/blocks/mi-garaje/m/vmc: «Publica tu Vehículo» y «Valoriza tu vehículo»,
 * arriba de Mi billetera). Ícono en círculo, título, una línea de ayuda y la flecha. «publish» es naranja (la acción principal
 * de la página); «value» es blanca con borde. Al pasar el mouse el borde se ilumina.
 * Solo depende de React.
 */
import type { JSX } from "react";

export const ACTION_TILE_CSS = String.raw`
.f-act { all:unset; box-sizing:border-box; cursor:pointer; display:grid; grid-template-columns:40px 1fr 20px; gap:12px; align-items:center; min-height:72px; padding:14px 14px 14px 16px; border-radius:18px;
  transition:transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s ease-out; }
.f-act:focus-visible { outline:2px solid #8460E5; outline-offset:3px; }
.f-act:hover { transform:translateY(-2px); }
.f-act:active { transform:translateY(0) scale(.99); }
.f-act__icon { display:grid; place-items:center; width:40px; height:40px; border-radius:9999px; }
.f-act__icon svg { width:22px; height:22px; stroke-width:2.2; }
.f-act__text { display:grid; gap:1px; min-width:0; }
.f-act__text b { font-size:1.0625rem; letter-spacing:-0.01em; }
.f-act__text small { font-size:.8125rem; }
.f-act__go { display:grid; transition:transform .2s cubic-bezier(.2,.8,.2,1); }
.f-act:hover .f-act__go { transform:translateX(3px); }
.f-act--publish { color:#fff; background:linear-gradient(135deg,var(--vmc-color-orange-gradient-light, #F4AC59) 0%,#ED8936 45%,#D46E20 80%,#8460E5 135%);
  box-shadow:0 8px 20px rgba(212,110,32,.30), inset 0 1px 0 rgba(255,255,255,.35); }
.f-act--publish:hover { box-shadow:0 14px 28px rgba(212,110,32,.38), inset 0 1px 0 rgba(255,255,255,.35); }
.f-act--publish .f-act__icon { background:rgba(255,255,255,.22); box-shadow:inset 0 0 0 1px rgba(255,255,255,.35); }
.f-act--publish small { color:#FFF8F1; }
.f-act--publish .g-chev { color:#fff; }
.f-act--value { color:#3B1782; border:1px solid transparent;
  background-image:linear-gradient(#fff,#fff), linear-gradient(120deg,#fff 0%,var(--vmc-color-orange-gradient-light, #F4AC59) 35%,#8460E5 75%,#fff 100%); background-origin:border-box; background-clip:padding-box,border-box;
  box-shadow:0 4px 14px rgba(34,0,92,.06); }
.f-act--value:hover { box-shadow:0 12px 26px rgba(34,0,92,.12); }
.f-act--value .f-act__icon { color:#5A35C2; background:#F5F0FF; }
.f-act--value small { color:#5A35C2; }
@media (min-width:830px) { .f-act__text small { white-space:nowrap; } }
@media (max-width:829px) { .f-act { grid-template-columns:1fr 18px; grid-template-areas:"icon go" "text text"; gap:10px; padding:14px; } }
@media (max-width:829px) { .f-act__icon { grid-area:icon; } }
@media (max-width:829px) { .f-act__go { grid-area:go; align-self:start; } }
@media (max-width:829px) { .f-act__text { grid-area:text; } }
@media (prefers-reduced-motion:reduce) { .f-act, .f-act__go { transition:none; } }
@media (prefers-reduced-motion:reduce) { .f-act:hover, .f-act:active { transform:none; } }
.f-act { min-height:64px; }
.f-act__text b { font-size:1.125rem; font-weight:800; }
.f-act__text small { font-size:.875rem; font-weight:400; }
.f-act { transition:transform .2s cubic-bezier(.25,.8,.25,1), box-shadow .2s cubic-bezier(.25,.8,.25,1), background-color .2s, border-color .2s, filter .2s; }
.f-act--publish:hover { filter:brightness(1.06) saturate(1.05); box-shadow:0 14px 28px rgba(212,110,32,.4), inset 0 1px 0 rgba(255,255,255,.4); }
.f-act--publish:active { transform:scale(.98); filter:brightness(.94); box-shadow:inset 0 2px 6px rgba(120,50,0,.35); }
.f-act--value:hover { border-color:#CFBAFF; background-color:#FBF9FF; box-shadow:0 12px 26px rgba(34,0,92,.12); }
.f-act--value:hover .f-act__icon { color:#ED8936; background:#FFF1E2; }
.f-act--value:active { transform:scale(.98); background-color:#F5F0FF; box-shadow:inset 0 2px 6px rgba(34,0,92,.12); }
.f-act__icon { transition:color .2s, background-color .2s; }
@media (prefers-reduced-motion:reduce) { .f-act { transition:none; } }
@media (prefers-reduced-motion:reduce) { .f-act:active { transform:none; } }
@media (min-width:1024px) { .f-act { grid-template-columns:32px 1fr 16px; gap:10px; min-height:56px; padding:10px 12px; border-radius:16px; } }
@media (min-width:1024px) { .f-act__icon { width:32px; height:32px; } }
@media (min-width:1024px) { .f-act__text b { font-size:.9375rem; } }
@media (min-width:1024px) { .f-act__text small { font-size:.75rem; } }
@media (min-width:1024px) { .f-act__icon svg { width:18px; height:18px; } }
@media (min-width:1024px) { .f-act--value { background-image:linear-gradient(#fff,#fff), linear-gradient(#E1E3E2,#E1E3E2); } }
@media (min-width:1024px) { .f-act--value:hover, .f-act--value:focus-visible { background-image:linear-gradient(#FBF9FF,#FBF9FF), linear-gradient(120deg,#fff 0%,var(--vmc-color-orange-gradient-light, #F4AC59) 35%,#8460E5 75%,#fff 100%); } }
@media (min-width:1024px) { .f-act__text b { font-size:.875rem; font-weight:700; } }
@media (min-width:1024px) { .f-act__text small { font-size:.75rem; font-weight:400; } }
@media (min-width:1024px) { .f-act { border-radius:8px; } }
.f-act--publish { border:2px solid transparent; background-image:linear-gradient(135deg,var(--vmc-color-orange-gradient-light, #F4AC59) 0%,#ED8936 45%,#D46E20 80%,#8460E5 135%),linear-gradient(transparent,transparent); background-origin:padding-box,border-box; background-clip:padding-box,border-box; }
.f-act--publish:hover, .f-act--publish:hover { filter:none; background-image:linear-gradient(135deg,#FBC47D 0%,#ED8936 45%,#D46E20 80%,#8460E5 135%),linear-gradient(135deg,#fff 0%,#FBC47D 25%,#AE8EFF 75%,#fff 100%); box-shadow:rgba(255,255,255,.22) 0 1px 0 2px inset,rgba(132,96,229,.35) 0 8px 24px,rgba(237,137,54,.4) 0 4px 10px; }
.f-act--value:hover, .f-act--value:hover { border-color:transparent; background-image:linear-gradient(#FBF9FF,#FBF9FF),linear-gradient(135deg,#CFBAFF 0%,#fff 35%,#AE8EFF 65%,#CFBAFF 100%); box-shadow:rgba(255,255,255,.2) 0 1px 0 2px inset,rgba(132,96,229,.4) 0 8px 24px,rgba(132,96,229,.25) 0 4px 10px; }
.f-act--value:hover .f-act__icon, .f-act--value:hover .f-act__icon { color:#5A35C2; background:#F5F0FF; }
.f-act { position:relative; isolation:isolate; }
.f-act > * { position:relative; z-index:1; }
.f-act::after { content:""; position:absolute; z-index:2; inset:0; padding:2px; border-radius:inherit; pointer-events:none; opacity:0; background-size:220% 220%; background-position:0% 50%; -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; transition:opacity .18s ease-out; }
.f-act--publish::after { background-image:linear-gradient(115deg,#fff 0%,#FBC47D 26%,#ED8936 45%,#AE8EFF 74%,#fff 100%); }
.f-act--value::after { background-image:linear-gradient(115deg,#CFBAFF 0%,#fff 32%,#AE8EFF 65%,#CFBAFF 100%); }
.f-act--publish:hover::after, .f-act--publish:focus-visible::after, .f-act--value:hover::after, .f-act--value:focus-visible::after { opacity:1; animation:f-act-stroke-flow 3.2s cubic-bezier(.45,0,.25,1) infinite alternate; }
@keyframes f-act-stroke-flow { from { background-position:0% 50%; } to { background-position:100% 50%; } }
@media (prefers-reduced-motion:reduce) { .f-act::after { animation:none !important; } }
.f-act--value .g-chev { color:#ED8936; }
`;

export interface ActionTileProps {
  /** «publish»: Publica tu Vehículo (naranja, ícono +). «value»: Valoriza tu vehículo (blanca, ícono de velocímetro). */
  tone: "publish" | "value";
  /** Título (p. ej. «Publica tu Vehículo»). */
  title: string;
  /** Línea de ayuda (p. ej. «¡Un solo pago hasta que lo vendas!»). */
  hint: string;
  /** Al tocarla. */
  onClick: () => void;
}

const Plus = () => <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>;
// Material «speed», la misma familia que Concorde.
const Gauge = () => <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" /></svg>;
const Chevron = () => <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ActionTile({ tone, title, hint, onClick }: ActionTileProps): JSX.Element {
  return <>
    <style href="concorde-action-tile" precedence="default">{ACTION_TILE_CSS}</style>
    <button type="button" className={`f-act f-act--${tone}`} onClick={onClick}>
      <span className="f-act__icon">{tone === "publish" ? <Plus /> : <Gauge />}</span>
      <span className="f-act__text"><b>{title}</b><small>{hint}</small></span>
      <span className="f-act__go"><Chevron /></span>
    </button>
  </>;
}

export default ActionTile;
