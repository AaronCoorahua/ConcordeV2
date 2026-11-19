"use client";

/**
 * Combobox — selector con búsqueda para listas largas (mi-garaje-lab · Flujo Valorizar / Publicar: Marca y Modelo).
 * Mismo marco que Select. Patrón combobox del W3C APG: escribir filtra (sin tildes ni mayúsculas), ↑ ↓ recorren, Enter elige
 * y Esc cierra. Si el texto no coincide con una opción al salir, vuelve al valor elegido. La opción `pinned`
 * («+ Mi modelo no aparece») queda siempre al final, separada. Depende de React y de Select (el marco del campo).
 */
import { useId, useState } from "react";
import type { JSX, KeyboardEvent } from "react";
import { SELECT_CSS } from "@/src/components/Select";

export const COMBOBOX_CSS = String.raw`
.fl-combo input { appearance:none; width:100%; height:100%; padding:0 40px 0 16px; border:0; background:transparent; font:inherit; font-size:.875rem; color:#191C1C; outline:none; border-radius:12px; }
.fl-combo input::placeholder { color:#6C6E6E; }
.fl-combo input:not(:disabled):not(:focus)::placeholder { color:#191C1C; } /* con valor elegido, el valor se ve aunque el campo esté vacío para escribir */
.fl-combo.is-disabled input { cursor:not-allowed; }
.fl-combo.is-disabled input::placeholder { color:#7D798A; }
.fl-combo.is-open { border-color:#8460E5; box-shadow:0 0 0 3px rgba(132,96,229,.22); }
.fl-combo.is-open svg { transform:rotate(180deg); color:#ED8936; }
.fl-combo svg { transition:transform .2s cubic-bezier(.25,.8,.25,1); }
.fl-combo__list { position:absolute; z-index:20; top:calc(100% + 6px); left:-2px; right:-2px; max-height:264px; overflow-y:auto; margin:0; padding:6px; list-style:none; border-radius:16px; background:#fff; box-shadow:0 12px 32px rgba(34,0,92,.16), inset 0 0 0 1px #E1E3E2; }
.fl-combo__list li { padding:10px 12px; border-radius:10px; font-size:.9375rem; color:#3B1782; cursor:pointer; }
.fl-combo__list li.is-act { background:#F5F0FF; }
.fl-combo__list li[aria-selected="true"] { font-weight:700; }
.fl-combo__list li.is-manual { margin-top:4px; border-top:1px solid #EEEDF0; border-radius:0 0 10px 10px; color:#5A35C2; font-weight:600; }
.fl-combo__none { color:#6C6E6E !important; cursor:default !important; }
@media (prefers-reduced-motion:reduce) { .fl-combo svg { transition:none; } }
`;

export interface ComboboxProps {
  /** Rótulo encima del campo (p. ej. «Marca»). */
  label: string;
  /** Opción elegida; "" muestra el placeholder. */
  value: string;
  /** Se llama con la opción elegida. */
  onChange: (value: string) => void;
  /** Opciones de la lista (incluye `pinned` si se usa). */
  options: string[];
  /** Texto cuando no hay opción elegida (p. ej. «Escribe o elige la marca»). */
  placeholder: string;
  /** Deshabilitado mientras falta el dato anterior de la cascada. */
  disabled?: boolean;
  /** Opción que no se filtra y va siempre al final, separada (p. ej. «+ Mi modelo no aparece»). */
  pinned?: string;
}

const norm = (x: string) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Combobox({ label, value, onChange, options, placeholder, disabled, pinned }: ComboboxProps): JSX.Element {
  const id = useId();
  const [q, setQ] = useState<string | null>(null); // null = cerrado, muestra el valor
  const [act, setAct] = useState(0);
  const fixed = options.filter((o) => o === pinned);
  const list = q === null ? [] : [...options.filter((o) => o !== pinned && norm(o).includes(norm(q))), ...fixed];
  const pick = (o: string) => { onChange(o); setQ(null); };
  const close = () => { const hit = q && options.find((o) => norm(o) === norm(q)); if (hit && hit !== value) onChange(hit); setQ(null); };
  const key = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (q === null) { setQ(""); setAct(0); return; } setAct((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + list.length) % Math.max(list.length, 1)); }
    else if (e.key === "Enter" && q !== null && list[act]) { e.preventDefault(); pick(list[act]); }
    else if (e.key === "Escape") setQ(null);
  };
  return <>
    <style href="concorde-select" precedence="default">{SELECT_CSS}</style>
    <style href="concorde-combobox" precedence="default">{COMBOBOX_CSS}</style>
    <div className="fl-field"><label className="fl-label" htmlFor={id}>{label}</label>
      <span className={`fl-select fl-combo${disabled ? " is-disabled" : ""}${q !== null ? " is-open" : ""}`}>
        <input id={id} role="combobox" aria-expanded={q !== null} aria-controls={`${id}-l`} aria-autocomplete="list" autoComplete="off" disabled={disabled}
          aria-activedescendant={q !== null && list[act] ? `${id}-${act}` : undefined}
          value={q ?? value} placeholder={value || placeholder} onFocus={() => { setQ(""); setAct(-1); }} onBlur={close} onKeyDown={key}
          onChange={(e) => { setQ(e.target.value); setAct(0); }} />
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {q !== null ? <ul id={`${id}-l`} role="listbox" aria-label={label} className="fl-combo__list">
          {list.length ? list.map((o, i) => <li key={o} id={`${id}-${i}`} role="option" aria-selected={o === value} className={`${i === act ? "is-act" : ""}${o === pinned ? " is-manual" : ""}`}
            onMouseDown={(e) => { e.preventDefault(); pick(o); }} onMouseEnter={() => setAct(i)}>{o}</li>)
            : <li className="fl-combo__none" aria-disabled>Sin resultados para «{q}»</li>}
        </ul> : null}
      </span></div>
  </>;
}

export default Combobox;
