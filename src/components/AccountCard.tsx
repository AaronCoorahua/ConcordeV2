/**
 * AccountCard — tarjeta «Tu cuenta» de Mi Garaje (/blocks/mi-garaje/m/vmc, arriba de Tu actividad). Tres columnas con rótulo
 * arriba y valor abajo: el saludo con el avatar y «Ir al Perfil», el riesgo del perfil y los puntos VMC; debajo, la fila de
 * SubasPass (badge Activo y vencimiento) y la banda morada «SubasPass · Participa con consignación 0 · Ver planes».
 * En móvil las columnas se apilan.
 * Depende de React, AvatarZone, ProfileButton, StarIcon, InfoIcon y BadgeStatus.
 */
import type { JSX } from "react";
import AvatarZone from "@/src/components/AvatarZone";
import ProfileButton from "@/src/components/ProfileButton";
import StarIcon from "@/src/components/StarIcon";
import InfoIcon from "@/src/components/InfoIcon";
import BadgeStatus from "@/src/components/BadgeStatus";

export const ACCOUNT_CARD_CSS = String.raw`
.f-acct { overflow:hidden; border-radius:20px; background:#fff; box-shadow:0 1px 2px rgba(34,0,92,.06), inset 0 0 0 1px #E1E3E2; }
.f-acct__row { display:grid; grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr); grid-template-rows:auto auto auto; }
.f-acct__row > * { padding:16px 20px; }
.f-acct__row > * + * { border-left:1px solid #E1E3E2; }
.f-acct__stat { display:grid; grid-row:span 3; grid-template-rows:subgrid; row-gap:6px; justify-items:start; align-items:center; }
.f-acct__k { display:inline-flex; align-items:center; gap:6px; font-size:.6875rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:color-mix(in srgb,#191C1C 64%,#fff); }
.f-acct__v { display:inline-flex; align-items:center; gap:8px; min-height:36px; }
.f-acct__v b { font-size:1.25rem; font-weight:800; color:#3B1782; font-variant-numeric:tabular-nums; }
.f-acct__v svg { margin:-4px -4px -4px -6px; }
.f-acct__summary { grid-template-columns:max-content max-content; grid-template-rows:subgrid; column-gap:16px; justify-content:start; align-items:normal; }
.f-acct__metric { display:grid; grid-row:span 3; grid-template-rows:subgrid; row-gap:6px; justify-items:start; align-items:center; min-width:0; }
.f-acct__metric .pprofilebtn { align-self:end; }
.f-acct__membership { grid-template-rows:subgrid; align-items:center; }
.f-acct__expiry { align-self:end; font-size:.8125rem; font-weight:600; line-height:1.2; color:#3B1782; font-variant-numeric:tabular-nums; white-space:nowrap; }
.f-rep { --rep:#00A8AB; --rep-ink:#006466; }
.f-rep .f-acct__v b { color:var(--rep-ink); }
.f-acct__pass { display:flex; align-items:center; gap:12px; padding:12px 20px; color:#fff; text-decoration:none; background:linear-gradient(110deg,#22005C 0%,#5A35C2 55%,#ED8936 100%); }
.f-acct__pass.is-active { background:linear-gradient(110deg,#22005C 0%,#3B1782 100%); }
.f-acct__passname { font-weight:800; white-space:nowrap; }
.f-acct__passname span { color:#FBC47D; }
.f-acct__passmsg { flex:1; font-size:.875rem; padding-left:12px; border-left:1px solid rgba(255,255,255,.35); }
.f-acct__passcta { display:inline-flex; align-items:center; gap:2px; font-size:.875rem; font-weight:700; white-space:nowrap; }
.f-acct__passcta .g-chev { width:16px; height:16px; color:#fff; transition:transform .15s; }
.f-acct__pass:hover .f-acct__passcta .g-chev { transform:translateX(3px); }
.f-acct__pass:focus-visible { outline:2px solid #fff; outline-offset:-4px; }
@media (max-width:767px) { .f-acct__row { grid-template-columns:1fr 1fr; } }
@media (max-width:767px) { .f-acct__me { grid-column:1 / -1; border-bottom:1px solid #E1E3E2; } }
@media (max-width:767px) { .f-acct__row > .f-acct__stat:first-of-type { border-left:0; } }
@media (max-width:767px) { .f-acct__pass { flex-wrap:wrap; } }
@media (max-width:767px) { .f-acct__passmsg { flex-basis:100%; order:3; padding-left:0; border-left:0; } }
@media (prefers-reduced-motion:reduce) { .f-acct__passcta .g-chev { transition:none; } }
.f-acct__v b { white-space:nowrap; }
.f-acct__passcta { margin-left:auto; }
@media (max-width:767px) { .f-rep .f-acct__v { flex-wrap:wrap; gap:6px 8px; } }
.f-acct__stat > .pprofile, .f-acct__stat > a, .f-acct__stat > button { align-self:end; }
@media (max-width:767px) { .f-acct__row { grid-template-rows:auto auto auto auto auto auto; } }
@media (max-width:767px) { .f-acct__me { grid-row:1 / span 3; border-bottom:1px solid #E1E3E2; } }
@media (max-width:767px) { .f-acct__me + .f-acct__stat { border-left:0; } }
.f-acct__stat:not(.f-acct__me) .f-acct__v b { font-size:1.125rem; font-weight:800; }
.f-acct__me .f-acct__v b { font-size:.9375rem; font-weight:600; }
.f-acct__passname { font-size:.9375rem; font-weight:800; }
.f-acct__passcta { font-size:.875rem; font-weight:600; }
.f-acct__passmsg { font-size:.875rem; font-weight:400; }
.f-acct__k { font-size:.75rem; font-weight:600; }
.f-rep, .f-rep.is-bajo, .f-rep.is-regular { --rep:#8460E5; --rep-ink:#3B1782; }
.f-acct__passname em { margin-left:6px; padding:1px 7px; border-radius:9999px; font-style:normal; font-size:.75rem; font-weight:800; letter-spacing:.04em; color:#22005C; background:#FBC47D; }
@media (min-width:1024px) { .f-acct__row > * { padding:12px 16px; } }
@media (min-width:1024px) { .f-acct__k { font-size:.75rem; font-weight:600; letter-spacing:.04em; white-space:nowrap; } }
@media (min-width:1024px) { .f-acct__v { min-height:28px; } }
@media (min-width:1024px) { .f-acct__pass { padding:10px 16px; gap:8px; } }
@media (min-width:1024px) { .f-acct__passname { font-size:.875rem; } }
@media (min-width:1024px) { .f-acct__passmsg, .f-acct__passcta { font-size:.75rem; } }
@media (min-width:1024px) { .f-acct__passmsg { padding-left:8px; } }
@media (min-width:1024px) { .f-acct__pass { gap:12px; } }
@media (min-width:1024px) { .f-acct__passmsg { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } }
@media (min-width:1024px) { .f-acct__row { grid-template-columns:minmax(160px,1fr) minmax(230px,1.25fr) minmax(150px,1fr); } }
@media (min-width:1024px) { .f-acct__row > * { padding:12px; } }
@media (min-width:1024px) { .f-acct__k { font-size:.6875rem; letter-spacing:.03em; } }
@media (min-width:1024px) { .f-acct__me .f-acct__v b { font-size:.875rem; } }
@media (min-width:1024px) { .f-acct__stat:not(.f-acct__me) .f-acct__v b { font-size:.9375rem; } }
@media (min-width:1024px) { .f-acct__v { gap:6px; min-height:28px; } }
@media (min-width:1024px) { .f-acct__v :is(img, svg, .avatar, [class*="avatar"]) { width:24px; height:24px; } }
@media (min-width:1024px) { .f-acct__k { font-size:.6875rem; font-weight:600; color:#6B6878; } }
@media (min-width:1024px) { .f-acct__v b, .f-acct__stat:not(.f-acct__me) .f-acct__v b, .f-acct__me .f-acct__v b { font-size:.875rem; font-weight:600; } }
@media (min-width:1024px) { .f-acct__passname { font-size:.875rem; font-weight:700; } }
@media (min-width:1024px) { .f-acct__passmsg { font-size:.75rem; font-weight:400; } }
@media (min-width:1024px) { .f-acct__passcta { font-size:.75rem; font-weight:600; } }
@media (min-width:1024px) { .f-acct__v svg { margin:0; width:20px; height:20px; } }
@media (min-width:1024px) { .f-acct__v { gap:6px; } }
@media (min-width:1024px) { .f-acct__stat .pprofilebtn { margin-left:-4px; } }
@media (min-width:1024px) { .f-acct__row > * { padding:12px 12px 8px; } }
@media (min-width:1024px) { .f-acct { border-radius:8px; } }
@media (min-width:1024px) { .f-acct__pass { border-radius:0 0 8px 8px; } }
@media (min-width:1024px) { .f-acct__passmsg { white-space:normal; overflow:visible; text-overflow:clip; line-height:1.3; } }
@media (min-width:1024px) { .f-acct__passmsg { text-wrap:balance; } }
@media (min-width:1024px) { .f-acct__passopt { display:none; } }
@media (min-width:1024px) { .f-acct__passmsg { white-space:nowrap; text-wrap:nowrap; } }
@media (min-width:1024px) { .f-acct__v > :first-child { flex:none; width:24px !important; height:24px !important; margin:0; display:grid; place-items:center; overflow:visible; } }
@media (min-width:1024px) { .f-acct__v > svg:first-child, .f-acct__v > :first-child svg { width:24px !important; height:24px !important; } }
@media (min-width:1024px) { .f-acct__stat:last-child .f-acct__v > :first-child svg, .f-acct__stat:last-child .f-acct__v > svg:first-child { width:32px !important; height:32px !important; margin:-4px; } }
@media (min-width:1024px) { .f-acct__v { gap:8px; } }
@media (min-width:1024px) { .f-acct__row > * { padding:16px 16px 12px; } }
@media (min-width:1024px) { .f-acct__stat { row-gap:8px; } }
@media (min-width:1024px) { .f-acct__pass { padding:12px 16px; } }
.f-acct__points { gap:4px; white-space:nowrap; }
.f-acct__points-star { width:20px !important; height:20px !important; margin:0 !important; }
.f-acct__points-info { width:14px !important; height:14px !important; margin:0 !important; }
@media (max-width:767px) { .f-acct__summary { grid-column:1 / -1; } }
@media (max-width:767px) { .f-acct__membership { grid-column:1 / -1; } }
@media (min-width:1024px) { .f-acct__row { grid-template-columns:minmax(180px,1.1fr) minmax(146px,1fr) minmax(122px,.9fr); grid-template-rows:auto auto auto auto; } }
@media (min-width:1024px) { .f-acct__me { grid-column:1; grid-row:1 / span 3; } }
@media (min-width:1024px) { .f-acct__summary { display:contents; } }
@media (min-width:1024px) { .f-acct__summary .f-acct__metric { display:grid; grid-row:1 / span 3; grid-template-rows:subgrid; row-gap:8px; min-width:0; align-items:center; box-sizing:border-box; padding:16px 12px 12px; } }
@media (min-width:1024px) { .f-acct__summary .f-acct__metric:first-child { grid-column:2; border-left:1px solid #E1E3E2; } }
@media (min-width:1024px) { .f-acct__summary .f-acct__metric:last-child { grid-column:3; border-left:1px solid #E1E3E2; } }
@media (min-width:1024px) { .f-acct__membership { grid-column:1 / -1; grid-row:4; grid-template-columns:max-content max-content minmax(0,1fr); grid-template-rows:none; align-items:center; column-gap:10px; padding:10px 16px; border-left:0; border-top:1px solid #E1E3E2; } }
@media (min-width:1024px) { .f-acct__membership .f-acct__expiry { align-self:center; justify-self:end; white-space:nowrap; } }
`;

export interface AccountCardProps {
  /** Nombre de usuario del saludo (p. ej. «ZAEX5G»). */
  username: string;
  /** Riesgo del perfil, como lo dice VMC (p. ej. «Muy bajo»). */
  risk: string;
  /** Puntos VMC. */
  points: number;
  /** Vencimiento de SubasPass, ya escrito (p. ej. «16/01/2026»). */
  passExpiry: string;
  /** Destino de la banda de SubasPass («Ver planes»). */
  passHref: string;
}

const Chevron = () => <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function AccountCard({ username, risk, points, passExpiry, passHref }: AccountCardProps): JSX.Element {
  return <>
    <style href="concorde-account-card" precedence="default">{ACCOUNT_CARD_CSS}</style>
    <section className="f-acct" aria-label="Tu cuenta">
      <div className="f-acct__row">
        <div className="f-acct__stat f-acct__me"><span className="f-acct__k">Tu cuenta</span><span className="f-acct__v"><AvatarZone size={32} /><b>{`¡Hola, ${username}!`}</b></span><ProfileButton /></div>
        <div className="f-acct__stat f-acct__summary">
          <div className="f-acct__metric f-rep"><span className="f-acct__k">Riesgo del perfil</span><span className="f-acct__v"><b>{risk}</b></span></div>
          <div className="f-acct__metric"><span className="f-acct__k">Puntos VMC</span>
            <span className="f-acct__v f-acct__points"><StarIcon className="f-acct__points-star" size={20} /><b>{points.toLocaleString("en-US")} pts</b><InfoIcon className="f-acct__points-info" size={14} title="Más información sobre los puntos VMC" /></span></div>
        </div>
        <div className="f-acct__stat f-acct__membership"><span className="f-acct__k">SubasPass</span><BadgeStatus variant="live" label="Activo" /><span className="f-acct__expiry">{`Expira  ${passExpiry}`}</span></div>
      </div>
      <a href={passHref} className="f-acct__pass"><span className="f-acct__passname"><span aria-hidden>✦</span> SubasPass</span>
        <span className="f-acct__passmsg">Participa <span className="f-acct__passopt">sin límites, </span>con consignación 0</span>
        <span className="f-acct__passcta">Ver planes<Chevron /></span></a>
    </section>
  </>;
}

export default AccountCard;
