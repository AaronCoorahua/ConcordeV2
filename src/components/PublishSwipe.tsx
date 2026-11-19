"use client";

/**
 * PublishSwipe — botón «PUBLICAR» de Mis valorizaciones (Mi Garaje, /blocks/mi-garaje/m/vmc: lado derecho de cada
 * valorización guardada). Píldora naranja con un pulgar de vidrio que se asoma solo, como invitando a deslizar; responde a
 * clic, toque y teclado. Al tocarlo el pulgar corre al final, dice «CARGANDO» y a los 2 s llama a onPublish.
 * Solo depende de React.
 */
import { useState } from "react";
import type { JSX } from "react";

export const PUBLISH_SWIPE_CSS = String.raw`
.f-publishswipe { all:unset; box-sizing:border-box; display:block; width:84px; height:24px; cursor:pointer; border-radius:9999px; }
.f-publishswipe__track { position:relative; display:flex; align-items:center; justify-content:center; width:100%; height:100%; overflow:visible; border:1px solid rgba(255,255,255,.42); border-radius:inherit; color:#fff; background:linear-gradient(135deg,#F4AC59 0%,#ED8936 46%,#D46E20 100%); box-shadow:inset 0 1px 0 rgba(255,255,255,.34),0 2px 6px rgba(212,110,32,.25); }
.f-publishswipe__track::before { content:""; position:absolute; inset:0; background:linear-gradient(180deg,rgba(255,255,255,.18),transparent 62%); pointer-events:none; }
.f-publishswipe__label { position:relative; z-index:1; padding-left:14px; font-size:.625rem; font-weight:800; text-shadow:none; transition:transform .28s cubic-bezier(.16,1,.3,1),opacity .2s; }
.f-publishswipe__thumb { position:absolute; z-index:2; top:-3px; bottom:-3px; left:-4px; display:grid; place-items:center; width:24px; border:1px solid rgba(255,255,255,.68); border-radius:9999px; color:#fff; background:rgba(255,255,255,.20); box-shadow:0 2px 6px rgba(178,86,20,.28),inset 0 1px 0 rgba(255,255,255,.52); backdrop-filter:blur(8px); transition:left .32s cubic-bezier(.16,1,.3,1),transform .2s ease; }
.f-publishswipe__thumb svg { width:15px; height:15px; }
.f-publishswipe__thumb svg circle { display:none; }
.f-publishswipe:not(.is-confirming) .f-publishswipe__thumb { animation:f-publishswipe-nudge 2.6s cubic-bezier(.16,1,.3,1) 1.2s infinite; }
.f-publishswipe:hover .f-publishswipe__thumb { transform:translateX(4px); }
.f-publishswipe:active .f-publishswipe__thumb { transform:scale(.94); }
.f-publishswipe.is-confirming { pointer-events:none; }
.f-publishswipe.is-confirming .f-publishswipe__track { animation:f-publishswipe-loading .72s ease-in-out infinite alternate; }
.f-publishswipe.is-confirming .f-publishswipe__thumb { left:calc(100% - 20px); animation:none; color:#fff; }
.f-publishswipe.is-confirming .f-publishswipe__label { transform:translateX(-9px); }
.f-publishswipe:focus-visible { outline:2px solid #8460E5; outline-offset:3px; }
@keyframes f-publishswipe-nudge { 0%,62%,100% { transform:translateX(0); box-shadow:0 2px 6px rgba(178,86,20,.28),inset 0 1px 0 rgba(255,255,255,.52); } 76% { transform:translateX(8px); box-shadow:0 2px 10px rgba(255,255,255,.38),inset 0 1px 0 rgba(255,255,255,.62); } 88% { transform:translateX(2px); } }
@keyframes f-publishswipe-loading { from { filter:brightness(1); box-shadow:inset 0 1px 0 rgba(255,255,255,.34),0 2px 6px rgba(212,110,32,.25); } to { filter:brightness(1.13); box-shadow:inset 0 1px 0 rgba(255,255,255,.52),0 3px 12px rgba(237,137,54,.52); } }
@media (max-width:767px) { .f-publishswipe { width:80px; } }
@media (prefers-reduced-motion:reduce) { .f-publishswipe__label, .f-publishswipe__thumb { transition:none; } }
@media (prefers-reduced-motion:reduce) { .f-publishswipe:not(.is-confirming) .f-publishswipe__thumb, .f-publishswipe.is-confirming .f-publishswipe__track { animation:none; } }
`;

export interface PublishSwipeProps {
  /** Se llama 2 s después de tocarlo (en Mi Garaje abre Publicar con esa valorización). */
  onPublish: () => void;
}

const Plus = () => <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>;

export function PublishSwipe({ onPublish }: PublishSwipeProps): JSX.Element {
  const [confirming, setConfirming] = useState(false);
  const activate = () => {
    if (confirming) return;
    setConfirming(true);
    window.setTimeout(onPublish, 2000);
  };
  return <>
    <style href="concorde-publish-swipe" precedence="default">{PUBLISH_SWIPE_CSS}</style>
    <button type="button" className={`f-publishswipe${confirming ? " is-confirming" : ""}`} onClick={activate} aria-label={confirming ? "Publicando vehículo" : "Publicar vehículo"} aria-busy={confirming}>
      <span className="f-publishswipe__track" aria-hidden>
        <span className="f-publishswipe__label">{confirming ? "CARGANDO" : "PUBLICAR"}</span>
        <span className="f-publishswipe__thumb"><Plus /></span>
      </span>
    </button>
  </>;
}

export default PublishSwipe;
