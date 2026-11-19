"use client";

/**
 * ChatComposer — caja para escribir del SubasChat (Mi Garaje, mi-garaje-lab · /m/oferta y el chat del panel de negociación):
 * emojis, enviar imagen, campo que crece con el texto (hasta 120 px) y botón de enviar cian → violeta.
 * Enter envía y Shift+Enter hace salto de línea. Con `disabled` todo queda apagado (el chat aún no se habilita).
 */
import { useEffect, useRef } from "react";
import type { JSX, RefObject } from "react";

export const CHAT_COMPOSER_CSS = String.raw`
.sc__compose { display: flex; align-items: flex-end; gap: 2px; padding: 8px; padding-bottom: max(8px, env(safe-area-inset-bottom)); border-top: 1px solid #ecebf3; }
.sc__compose textarea[aria-invalid="true"] { border-color: #d64545; }
/* 16px: con menos iOS Safari hace zoom al enfocar. */
.sc__compose textarea { flex: 1; min-width: 0; box-sizing: border-box; height: 40px; min-height: 40px; max-height: 120px; padding: 8px 14px; border: 1px solid #c9c5dc; border-radius: 20px; font: inherit; font-size: 16px; line-height: 22px; resize: none; overflow-y: auto; }
.sc__compose textarea:focus { outline: none; border-color: #8460e5; box-shadow: 0 0 0 3px rgba(132, 96, 229, 0.25); }
.sc__tool, .sc__send { flex: none; display: grid; place-items: center; width: 36px; height: 40px; border: 0; border-radius: 50%; font-size: 19px; cursor: pointer; }
.sc__tool { color: #3B1782; background: transparent; }
.sc__tool:hover, .sc__tool[aria-pressed="true"] { background: #f3f1fa; }
.sc__send { width: 40px; margin-left: 4px; color: #fff; background: linear-gradient(135deg, #008a8d, #8460e5); transition: transform 0.12s, opacity 0.2s; }
.sc__send:active { transform: scale(0.92); }
.sc__send:disabled, .sc__tool:disabled { opacity: 0.4; cursor: default; }
/* Táctil: áreas de toque de 44px */
@media (pointer: coarse) {
  .sc__tool, .sc__send { width: 44px; height: 44px; }
  .sc__compose textarea { min-height: 44px; padding-top: 10px; padding-bottom: 10px; }
}
`;

export interface ChatComposerProps {
  /** Nombre accesible del campo (p. ej. «Mensaje para KLM8RT»). */
  label: string;
  /** Texto escrito. Sin `value` el campo no se controla (caja apagada). */
  value?: string;
  /** Cambia el texto. */
  onChange?: (text: string) => void;
  /** Enviar (botón o Enter). */
  onSend?: () => void;
  /** Hay algo que se puede enviar: habilita el botón. */
  canSend?: boolean;
  /** Apaga emojis, imagen, campo y enviar. */
  disabled?: boolean;
  /** El texto no es válido (p. ej. pasa el límite de caracteres): borde rojo. */
  invalid?: boolean;
  /** El panel de emojis está abierto (marca el botón). */
  emojiOpen?: boolean;
  /** Abre o cierra el panel de emojis. */
  onEmoji?: () => void;
  /** Imagen elegida para enviar. */
  onImage?: (file: File) => void;
  /** Ref del campo, para devolverle el foco. */
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}

export function ChatComposer({ label, value, onChange, onSend, canSend = false, disabled = false, invalid, emojiOpen, onEmoji, onImage, inputRef }: ChatComposerProps): JSX.Element {
  const own = useRef<HTMLTextAreaElement>(null);
  const ref = inputRef ?? own;
  const fileRef = useRef<HTMLInputElement>(null);
  // El campo crece con el texto hasta el max-height del CSS (120px); +2 = bordes (box-sizing: border-box).
  useEffect(() => { const el = ref.current; if (!el || value === undefined) return; el.style.height = "auto"; el.style.height = `${el.scrollHeight + 2}px`; }, [value, ref]);
  return <>
    <style href="concorde-chat-composer" precedence="default">{CHAT_COMPOSER_CSS}</style>
    <form className="sc__compose" aria-disabled={disabled && !onSend ? "true" : undefined} onSubmit={(e) => { e.preventDefault(); onSend?.(); }}>
      <button type="button" className="sc__tool" aria-label="Emojis" aria-pressed={emojiOpen} onClick={onEmoji} disabled={disabled}>😊</button>
      <button type="button" className="sc__tool" aria-label="Enviar imagen" onClick={() => fileRef.current?.click()} disabled={disabled}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" /></svg>
      </button>
      {onImage ? <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onImage(f); e.target.value = ""; }} /> : null}
      {/* Sin maxLength: al pegar no se corta en silencio; quien lo usa avisa y apaga Enviar si sobra texto. */}
      <textarea ref={ref} rows={1} value={value} placeholder="Escribe un mensaje…" disabled={disabled}
        aria-label={label} aria-invalid={invalid} enterKeyHint={onSend ? "send" : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onKeyDown={onSend ? (e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); onSend(); } } : undefined} />
      <button type="submit" className="sc__send" aria-label="Enviar" disabled={disabled || !canSend}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden><path d="M4 12l16-8-6 16-2-7z" fill="currentColor" /></svg>
      </button>
    </form>
  </>;
}

export default ChatComposer;
