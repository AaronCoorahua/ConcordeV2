/**
 * AmountComposer — campo para escribir una contrapropuesta (Mi Garaje, mi-garaje-lab · panel de negociación):
 * píldoras con montos sugeridos («Punto medio · US$ 13,100») y, debajo, «US$» + el monto con separador de miles
 * y el botón redondo de enviar (cian → violeta). Solo deja enviar cuando `canSend`. Solo depende de React.
 */
import type { JSX } from "react";

export const AMOUNT_COMPOSER_CSS = String.raw`
.np__chips { display:flex; justify-content:center; gap:8px; overflow-x:auto; scrollbar-width:none; padding-bottom:2px; }
.np__chips button { all:unset; cursor:pointer; flex:none; position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:6px; min-height:28px; padding:0 10px; border:1.5px solid transparent; border-radius:9999px; font-size:.6875rem; font-variant-numeric:tabular-nums; color:#fff; background-image:linear-gradient(135deg, #8460E5 0%, #6842C7 42%, #3B1782 100%), linear-gradient(135deg, #fff 0%, #C9B8FF 58%, #fff 100%); background-origin:padding-box,border-box; background-clip:padding-box,border-box; box-shadow:inset 0 1px 0 1px rgba(255,255,255,.30), 0 2px 7px rgba(59,23,130,.24); text-shadow:0 1px 2px rgba(30,8,76,.38); transition:background .2s ease, box-shadow .2s ease, transform .2s ease; }
.np__chips button::before { content:""; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(180deg, rgba(255,255,255,.16), transparent 58%); pointer-events:none; }
.np__chips button small, .np__chips button b { position:relative; z-index:1; }
.np__chips button small { font-size:.6875rem; font-weight:500; color:#fff; }
.np__chips button small::after { content:"·"; margin-left:6px; color:rgba(255,255,255,.58); }
.np__chips button b { font-size:.6875rem; font-weight:700; color:#fff; }
.np__chips button:hover { background-image:linear-gradient(220deg, #9A79ED 0%, #724CD0 42%, #4B229B 100%), linear-gradient(135deg, #fff 0%, #C9B8FF 58%, #fff 100%); box-shadow:inset 0 1px 0 1px rgba(255,255,255,.34), 0 5px 12px rgba(59,23,130,.30); transform:translateY(-1px); }
.np__chips button[aria-pressed="true"] { background-image:linear-gradient(135deg, #5A35C2 0%, #24104F 100%), linear-gradient(135deg, #fff 0%, #C9B8FF 58%, #fff 100%); box-shadow:inset 0 1px 0 1px rgba(255,255,255,.24), 0 2px 8px rgba(59,23,130,.28); }
.np__chips button:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
.np__compose { display:flex; align-items:center; gap:8px; padding:4px 4px 4px 16px; border-radius:9999px; background:#fff; box-shadow:inset 0 0 0 1px #8E89A0; }
.np__compose:focus-within { box-shadow:inset 0 0 0 2px #00A8AB, 0 0 0 3px rgba(0,168,171,.15); }
.np__compose label { flex:1; display:flex; align-items:center; gap:6px; min-width:0; }
.np__compose label span { font-size:.875rem; font-weight:700; color:#3B1782; }
.np__compose input { all:unset; flex:1; min-width:0; height:40px; font-size:1rem; font-weight:600; color:#191C1C; font-variant-numeric:tabular-nums; }
.np__compose input::placeholder { font-weight:400; color:#7D798A; }
.np__send { all:unset; cursor:pointer; flex:none; display:grid; place-items:center; width:40px; height:40px; border-radius:50%; color:#fff; background:linear-gradient(144deg, #00A8AB 0%, #00A8AB 40%, #8460E5 100%); box-shadow:0 4px 12px rgba(0,168,171,.3); }
.np__send:hover:not(:disabled) { transform:translateY(-1px) scale(1.04); background:linear-gradient(144deg, #00C3C6 0%, #00A8AB 40%, #9A79ED 100%); box-shadow:0 7px 18px rgba(0,168,171,.32), 0 4px 10px rgba(132,96,229,.22); }
.np__send:active:not(:disabled) { transform:scale(.96); }
.np__send:disabled { cursor:not-allowed; background:#E1E3E2; color:#fff; box-shadow:none; }
.np__send:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
`;

const usd = (n: number) => `US$ ${n.toLocaleString("en-US")}`;

export interface AmountSuggestion {
  /** Nombre de la sugerencia («Punto medio», «Valor de mercado»). */
  label: string;
  /** Monto en dólares. */
  amount: number;
}

export interface AmountComposerProps {
  /** Monto escrito, en dólares (0 = vacío). */
  value: number;
  /** Cambia el monto (al escribir o al tocar una sugerencia). */
  onChange: (amount: number) => void;
  /** Enviar el monto. Solo se llama si `canSend`. */
  onSubmit: () => void;
  /** El monto es válido: habilita el botón de enviar. */
  canSend: boolean;
  /** Texto del campo vacío («Escribe tu contrapropuesta»). */
  placeholder: string;
  /** Nombre accesible del campo («Tu contrapropuesta en US$»). */
  label: string;
  /** Montos sugeridos sobre el campo. */
  suggestions?: AmountSuggestion[];
}

export function AmountComposer({ value, onChange, onSubmit, canSend, placeholder, label, suggestions = [] }: AmountComposerProps): JSX.Element {
  return <>
    <style href="concorde-amount-composer" precedence="default">{AMOUNT_COMPOSER_CSS}</style>
    {suggestions.length ? <div className="np__chips" role="group" aria-label="Montos sugeridos">{suggestions.map((s) =>
      <button key={s.label} type="button" aria-pressed={value === s.amount} onClick={() => onChange(s.amount)}><small>{s.label}</small><b>{usd(s.amount)}</b></button>)}</div> : null}
    <form className="np__compose" onSubmit={(e) => { e.preventDefault(); if (canSend) onSubmit(); }}>
      <label><span>US$</span><input inputMode="numeric" value={value ? value.toLocaleString("en-US") : ""} placeholder={placeholder} aria-label={label}
        onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")) || 0)} /></label>
      <button type="submit" className="np__send" disabled={!canSend} aria-label={canSend ? `Enviar ${usd(value)}` : "Enviar"}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 19V5m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    </form>
  </>;
}

export default AmountComposer;
