/**
 * ChatHeader — cabecera del SubasChat (Mi Garaje, mi-garaje-lab · /m/oferta y el chat del panel de negociación):
 * avatar con las dos primeras letras del código de la contraparte, su código y rol, y el monto acordado a la derecha.
 * Fondo vault oscuro (el del header del DetailCard). Solo depende de React.
 */
import type { JSX } from "react";

export const CHAT_HEADER_CSS = String.raw`
.sc__head { display: flex; align-items: center; gap: 10px; height: 64px; padding: 0 14px 0 12px; color: #fff; background: linear-gradient(157deg, #5A35C2 0%, #2e0f70 50%, #100030 100%); }
.sc__avatar { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; font-size: 14px; font-weight: 800; letter-spacing: 0.02em; color: #3B1782; background: #fff; box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.45); }
.sc__who { flex: 1; min-width: 0; }
.sc__who b { display: block; font-size: 15px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sc__who span { display: block; font-size: 12px; opacity: 0.95; }
.sc__deal { flex: none; text-align: right; line-height: 1.2; }
.sc__deal small { display: block; font-size: 12px; opacity: 0.9; }
.sc__deal b { font-size: 16px; }
`;

export interface ChatHeaderProps {
  /** Código de usuario de la contraparte (p. ej. «KLM8RT»); el avatar usa sus dos primeras letras. */
  name: string;
  /** Rol de la contraparte («Comprador» o «Vendedor»). */
  role: string;
  /** Etiqueta del monto según quién eres en el acuerdo («Venta» o «Compra»). */
  dealLabel: string;
  /** Monto acordado ya formateado (p. ej. «US$ 17,500»). */
  amount: string;
  /** Clase extra para el contenedor. */
  className?: string;
}

export function ChatHeader({ name, role, dealLabel, amount, className }: ChatHeaderProps): JSX.Element {
  return <>
    <style href="concorde-chat-header" precedence="default">{CHAT_HEADER_CSS}</style>
    <header className={`sc__head${className ? ` ${className}` : ""}`}>
      <span className="sc__avatar" aria-hidden>{name.slice(0, 2)}</span>
      <div className="sc__who"><b>{name}</b><span>{role}</span></div>
      <div className="sc__deal"><small>{dealLabel}</small><b>{amount}</b></div>
    </header>
  </>;
}

export default ChatHeader;
