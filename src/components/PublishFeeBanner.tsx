/**
 * PublishFeeBanner — banner del costo de publicar (mi-garaje-lab · Flujo Publicar, paso Vehículo).
 * Franja oscura de Mi Garaje VMC con la foto del personaje a la derecha: pill de vidrio «25 SubasCoins · Pago único · 0% comisión»,
 * titular «Recibe propuestas por solo >S< 25» y bajada. Sin botón: la persona ya está publicando. Solo depende de React.
 */
import type { JSX } from "react";

export const PUBLISH_FEE_BANNER_CSS = String.raw`
.fl-fee--precio { position:relative; isolation:isolate; display:flex; align-items:center; gap:24px; min-height:112px; padding:16px 24px; border-radius:16px; overflow:hidden; color:#fff;
  background:radial-gradient(90% 160% at 0% 0%, #5A35C2 0%, #3B1782 48%, #22005C 100%); box-shadow:0 8px 24px rgba(34,0,92,.2); }
.fl-fee--precio .fl-fee__img { position:absolute; inset:0 0 0 auto; z-index:0; width:46%;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 40%); mask-image:linear-gradient(90deg,transparent 0%,#000 40%); }
.fl-fee--precio .fl-fee__img img { display:block; width:100%; height:100%; object-fit:cover; object-position:62% 30%; }
.fl-fee--precio .fl-fee__tx { position:relative; z-index:2; display:grid; gap:6px; justify-items:start; max-width:60%; }
.fl-fee--precio .fl-fee__tag { display:inline-flex; align-items:center; gap:6px; height:22px; padding:0 10px; border-radius:999px; font-size:11px; font-weight:700; color:#fff;
  border:1px solid rgb(255 255 255 / 38%); background:linear-gradient(180deg,rgb(255 255 255 / 26%),rgb(255 255 255 / 10%)); box-shadow:inset 0 1px 0 rgb(255 255 255 / 45%),0 4px 12px -4px rgb(10 0 40 / 35%); }
.fl-fee--precio .fl-fee__tag::before { content:""; width:6px; height:6px; border-radius:50%; background:#FBC47D; }
.fl-fee--precio .fl-fee__tx > b { font-size:1.5rem; line-height:1.15; font-weight:800; letter-spacing:-.02em; text-wrap:balance; text-shadow:rgba(20,0,60,.25) 0 1px 3px; }
.fl-fee--precio .fl-fee__tx em { font-style:normal; color:#FBC47D; white-space:nowrap; }
.fl-fee--precio .fl-fee__tx > span:last-child { font-size:.875rem; line-height:1.4; opacity:.95; color:#E4D8FF; }
@media (max-width:640px) {
  .fl-fee--precio { flex-wrap:wrap; gap:12px; padding:16px; }
  .fl-fee--precio .fl-fee__img { width:60%; opacity:.45; }
  .fl-fee--precio .fl-fee__tx { max-width:none; }
  .fl-fee--precio .fl-fee__tx > b { font-size:1.25rem; }
}
`;

export interface PublishFeeBannerProps {
  /** Costo de publicar en SubasCoins (pago único). */
  fee: number;
}

export function PublishFeeBanner({ fee }: PublishFeeBannerProps): JSX.Element {
  return <>
    <style href="concorde-publish-fee-banner" precedence="default">{PUBLISH_FEE_BANNER_CSS}</style>
    <aside className="fl-fee fl-fee--precio" aria-label="Costo de publicar">
      <span className="fl-fee__img" aria-hidden><img src="/mi-garaje/banners/personaje/fee-publica.jpg" alt="" /></span>
      <div className="fl-fee__tx">
        <span className="fl-fee__tag">{fee} SubasCoins · Pago único · 0% comisión</span>
        <b>Recibe propuestas por solo <em>&gt;S&lt; {fee}</em></b>
        <span>Un solo pago hasta que lo vendas: el 100% de la venta es tuyo.</span>
      </div>
    </aside>
  </>;
}

export default PublishFeeBanner;
