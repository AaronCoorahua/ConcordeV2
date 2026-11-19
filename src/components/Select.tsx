/**
 * Select — lista desplegable con rótulo, con la anatomía del campo de Mi Garaje VMC (mi-garaje-lab · Flujo Valorizar / Publicar).
 * Año de fabricación, Versión, Cilindrada, Departamento, Provincia y Distrito. Usa el <select> nativo con un chevron que se
 * enciende en naranja con el foco; deshabilitado queda en gris de relleno y con error, borde rojo y el mensaje debajo.
 * Solo depende de React.
 */
import type { JSX } from "react";

export const SELECT_CSS = String.raw`
.fl-field { display:grid; gap:8px; align-content:start; }
.fl-label { font-size:.875rem; font-weight:600; letter-spacing:0; text-transform:none; color:#14112B; }
.fl-err { font-size:.75rem; font-weight:600; color:#DC2626; }
.fl-select { position:relative; display:flex; align-items:center; height:44px; border-radius:12px; border:1px solid #8E89A0; background:#fff; box-shadow:none; transition:border-color .15s, box-shadow .15s, background-color .15s; }
.fl-select:hover:not(.is-disabled) { border-color:#6B6878; }
.fl-select:focus-within { border-color:#8460E5; box-shadow:0 0 0 3px rgba(132,96,229,.22); }
.fl-select.is-error { border-color:#D92D20; box-shadow:none; }
.fl-select.is-disabled, .fl-select:has(select:disabled) { border:1px solid transparent; background:#F4F3F8; opacity:1; }
.fl-select select { appearance:none; width:100%; height:100%; padding:0 40px 0 16px; border:0; background:transparent; font:inherit; font-size:.875rem; color:#191C1C; cursor:pointer; outline:none; border-radius:12px; }
.fl-select.is-disabled select { cursor:not-allowed; color:#7D798A; }
.fl-select svg { position:absolute; right:14px; color:#6B6878; pointer-events:none; }
.fl-select:focus-within svg { color:#ED8936; }
.fl-select.is-disabled svg { color:#B9B5C4; }
@media (prefers-reduced-motion:reduce) { .fl-select { transition:none; } }
`;

export interface SelectProps {
  /** Rótulo encima del campo (p. ej. «Año de fabricación»). */
  label: string;
  /** Opción elegida; "" muestra el placeholder. */
  value: string;
  /** Se llama con la opción elegida. */
  onChange: (value: string) => void;
  /** Opciones de la lista, en orden. */
  options: string[];
  /** Texto cuando no hay opción elegida (p. ej. «Primero elige la marca»). */
  placeholder: string;
  /** Deshabilitado mientras falta el dato anterior de la cascada. */
  disabled?: boolean;
  /** id del <select> (para llevar el foco al campo desde un resumen de errores). */
  id?: string;
  /** Se llama al salir del campo. */
  onBlur?: () => void;
  /** Mensaje de error: borde rojo y el texto debajo. */
  error?: string;
}

export function Select({ label, value, onChange, options, placeholder, disabled, id, onBlur, error }: SelectProps): JSX.Element {
  return <>
    <style href="concorde-select" precedence="default">{SELECT_CSS}</style>
    <label className="fl-field"><span className="fl-label">{label}</span>
      <span className={`fl-select${disabled ? " is-disabled" : ""}${error ? " is-error" : ""}`}>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} disabled={disabled} aria-invalid={error ? true : undefined}>
          <option value="" disabled>{placeholder}</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>{error ? <span className="fl-err">{error}</span> : null}</label>
  </>;
}

export default Select;
