/**
 * SellSection — «Vende tu vehículo» del Index (vmc-index-lab, SellSection). Sección nueva: no existía en el Homepage.
 * Dos opciones a la izquierda (ProfileButton de Concorde) y el beneficio de SubasCars a la derecha (GlassButton).
 */
import type { JSX } from "react";
import GlassButton from "@/src/components/GlassButton";
import ProfileButton from "@/src/components/ProfileButton";
import SectionHead from "./SectionHead";

const SELL_CSS = String.raw`
.hib-sell { box-sizing: border-box; width: 100%; color: #191C1C; font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); }
.hib-sell *, .hib-sell *::before, .hib-sell *::after { box-sizing: border-box; }
.hib-sell__layout { display: grid; grid-template-columns: minmax(0, 1fr) clamp(260px, 34%, 300px); gap: 16px; align-items: stretch; }
.hib-sell__choices { display: grid; gap: 12px; }
.hib-sell__choice { display: grid; grid-template-columns: 132px minmax(0, 1fr); min-height: 142px; overflow: hidden; border: 1px solid #DEDCE4; border-radius: 14px; background: #fff; text-decoration: none; color: inherit; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
.hib-sell__choice:hover { transform: translateY(-2px); border-color: #B7A5E9; box-shadow: rgb(32 0 104 / 14%) 0 12px 24px -16px; }
.hib-sell__photo { position: relative; overflow: hidden; background: #E8E5FF; }
.hib-sell__photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.hib-sell__photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 56%, rgb(255 255 255 / 92%) 100%); pointer-events: none; }
.hib-sell__copy { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; min-width: 0; padding: 14px 16px; }
.hib-sell__copy h3 { margin: 0; color: #191C1C; font-size: 14px; line-height: 18px; font-weight: 700; letter-spacing: -.01em; }
.hib-sell__copy p { margin: 4px 0 10px; color: #6B6878; font-size: 12px; line-height: 16.8px; }
.hib-sell__copy .pprofilebtn { padding: 0; }
.hib-sell__benefit { position: relative; isolation: isolate; display: flex; flex-direction: column; align-items: flex-start; min-height: 296px; overflow: hidden; padding: 22px; border-radius: 14px; color: #fff;
  background: radial-gradient(110% 100% at -10% 112%, rgb(239 133 46 / 88%) 0%, rgb(239 133 46 / 38%) 27%, transparent 56%), linear-gradient(145deg, #32136F 0%, #4E22A9 55%, #7B4BE3 100%); box-shadow: rgb(59 23 130 / 18%) 0 12px 24px -18px; }
.hib-sell__benefit::before { content: ""; position: absolute; z-index: -1; top: -85px; right: -48px; width: 250px; height: 210px; border: 42px solid rgb(255 255 255 / 10%); border-radius: 50%; }
.hib-sell__benefit::after { content: ""; position: absolute; z-index: -1; right: -74px; bottom: -118px; width: 270px; height: 210px; border: 42px solid rgb(255 255 255 / 8%); border-radius: 50%; }
.hib-sell__person { position: absolute; z-index: 0; right: -26px; bottom: -1px; width: min(68%, 238px); height: auto; pointer-events: none; }
.hib-sell__benefit > :not(.hib-sell__person) { position: relative; z-index: 1; }
.hib-sell__coin { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border: 1px solid rgb(255 255 255 / 28%); border-radius: 999px; background: rgb(255 255 255 / 12%); font-size: 11px; font-weight: 800; letter-spacing: .02em; }
.hib-sell__benefit h3 { max-width: 190px; margin: 14px 0 0; font-size: 18px; line-height: 22px; font-weight: 700; letter-spacing: -.02em; }
.hib-sell__benefit p { max-width: 190px; margin: 6px 0 0; color: rgb(255 255 255 / 88%); font-size: 12px; line-height: 16.8px; }
.hib-sell__benefit .hib-glass { height: 38px; margin-top: auto; padding-inline: 24px; }
@media (max-width: 1023px) { .hib-sell__layout { grid-template-columns: minmax(0, 1fr); } .hib-sell__benefit { min-height: 270px; } }
@media (max-width: 480px) {
  .hib-sell__choice { grid-template-columns: 104px minmax(0, 1fr); min-height: 128px; }
  .hib-sell__copy { padding: 12px; }
  .hib-sell__copy h3 { font-size: 15px; line-height: 19px; }
  .hib-sell__copy p { font-size: 12px; line-height: 17px; }
}
`;

export default function SellSection(): JSX.Element {
  return (
    <section className="hib-sell" aria-label="Vende tu vehículo">
      <style href="concorde-index-sell" precedence="default">{SELL_CSS}</style>
      <SectionHead title="Vende tu vehículo" subtitle="Publica tu auto y recibe ofertas de compradores verificados." />
      <div className="hib-sell__layout">
        <div className="hib-sell__choices">
          <article className="hib-sell__choice">
            <div className="hib-sell__photo"><img src="/index/banners/vmc/vende-auto.jpg" alt="" /></div>
            <div className="hib-sell__copy"><h3>¿Vendes tu vehículo?</h3><p>Registra tu publicación en minutos y deja que VMC filtre las ofertas por ti.</p>
              <ProfileButton href="https://www.vmcsubastas.com/landing-subascars">Publica tu auto</ProfileButton></div>
          </article>
          <article className="hib-sell__choice">
            <div className="hib-sell__photo"><img src="/index/banners/vmc/vende-flota.jpg" alt="" /></div>
            <div className="hib-sell__copy"><h3>¿Vendes varios vehículos?</h3><p>Una alternativa para propietarios, empresas y concesionarios que buscan vender sus vehículos seminuevos.</p>
              <ProfileButton href="https://www.subastop.com/cita#vende">Agenda tu consultoría gratis hoy</ProfileButton></div>
          </article>
        </div>
        <aside className="hib-sell__benefit" aria-label="Beneficios de SubasCars">
          <img className="hib-sell__person" src="/index/demo/sell/seller-phone-man.webp" alt="" />
          <span className="hib-sell__coin">25 SubasCoins · 0% comisión</span>
          <h3>Un solo pago, hasta que lo vendas</h3>
          <p>Sin pagos mensuales ni renovaciones: el 100% de la venta es tuyo.</p>
          <GlassButton href="https://www.vmcsubastas.com/landing-subascars">Publica ahora</GlassButton>
        </aside>
      </div>
    </section>
  );
}
