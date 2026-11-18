/**
 * GlassButton — botón de vidrio del Index (vmc-index-lab, glass.ts · clase `.hib-glass`).
 * Blanco translúcido + blur + borde degradado VYStrokes1, con hover, active y focus.
 * Va sobre fotos o degradados oscuros: hero, banner de campaña y «Un solo pago» de Vende tu vehículo.
 * Con `href` se dibuja como enlace; sin él, como <button>.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, JSX } from "react";

export const GLASS_CSS = String.raw`
.hib-glass { position: relative; display: inline-flex; align-items: center; justify-content: center; height: 35px; padding: 0 29px; border: 0; border-radius: 100px;
  font: 600 14px/1 var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); color: #fff; white-space: nowrap; text-decoration: none; cursor: pointer;
  background-color: transparent; /* sin esto el <button> hereda el gris del navegador (buttonface) */
  background-image: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.03) 100%);
  -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
  box-shadow: rgba(0,0,0,0.1) 0 8px 24px, inset 0 1px 6px rgba(255,255,255,0.45);
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  transition: background-color 0.25s, box-shadow 0.25s, transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); }
.hib-glass::before { content: ""; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(94deg, #FFFFFF 0%, #F4AC59 22.1%, #8460E5 74.5%, #FFFFFF 100%); /* VYStrokes1 */
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
.hib-glass:hover { transform: translateY(-1px); background-color: rgba(255,255,255,0.1);
  box-shadow: rgba(0,0,0,0.16) 0 12px 28px, inset 0 1px 8px rgba(255,255,255,0.6); }
.hib-glass:active { transform: translateY(1px) scale(0.97); background-color: rgba(32,0,104,0.22);
  box-shadow: rgba(0,0,0,0.12) 0 2px 6px, inset 0 2px 8px rgba(32,0,104,0.4); }
.hib-glass:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .hib-glass { transition: none; } }
`;

export type GlassButtonProps =
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

export default function GlassButton(props: GlassButtonProps): JSX.Element {
  const cls = `hib-glass${props.className ? ` ${props.className}` : ""}`;
  return (
    <>
      <style href="concorde-glass-button" precedence="default">{GLASS_CSS}</style>
      {props.href !== undefined
        ? <a {...props} className={cls} />
        : <button type="button" {...props} className={cls} />}
    </>
  );
}
