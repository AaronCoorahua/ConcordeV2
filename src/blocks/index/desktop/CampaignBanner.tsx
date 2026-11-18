/**
 * CampaignBanner — banner secundario del Index (vmc-index-lab, CampaignBanner, vista «Foto de fondo»).
 * Reemplaza el hueco «SECONDARY BANNER» del Homepage. Mismo lenguaje que el banner principal: degradado del sistema,
 * foto a la derecha fundida con máscara y el mensaje en un panel de vidrio. Campaña por defecto: Valoriza tu auto.
 */
import type { JSX } from "react";
import GlassButton from "@/src/components/GlassButton";

const SHADOW = "rgba(0,0,0,0.07) 0px 0px 16px 4px";

export type Campaign = { eyebrow: string; title: JSX.Element; aria: string; lead: string; cta: string; image: string; position: string; bg: string; href?: string };

export const VALORIZA: Campaign = {
  eyebrow: "Valoriza en VMC", aria: "Cuánto vale tu auto", title: <>¿Cuánto <em>vale</em> tu auto?</>,
  lead: "Responde unas preguntas y conoce el valor estimado de tu auto.", cta: "Valoriza tu auto",
  image: "/index/banners/vmc/campana-valor.jpg", position: "65% 25%", bg: "linear-gradient(100deg, #2A1670 0%, #3D2299 45%, #403566 100%)",
};

const CAMPAIGN_CSS = String.raw`
.hib-campaign { position: relative; box-sizing: border-box; display: block; width: 100%; height: 204px; overflow: hidden; border-radius: 16px; color: #fff;
  box-shadow: ${SHADOW}; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif); }
.hib-campaign__media { position: absolute; top: 0; right: 0; bottom: 0; width: 68%; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
.hib-campaign__media img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 600ms cubic-bezier(0.2,0,0,1); }
.hib-campaign:hover .hib-campaign__media img { transform: scale(1.04); }
.hib-campaign__copy { position: absolute; z-index: 1; left: 20px; top: 50%; transform: translateY(-50%); box-sizing: border-box; width: min(440px, 52%);
  display: grid; justify-items: start; gap: 6px; padding: 16px 20px 18px; border-radius: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.22);
  -webkit-backdrop-filter: blur(16px) saturate(140%); backdrop-filter: blur(16px) saturate(140%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 30px rgba(20,8,60,0.3); }
.hib-campaign__eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px 3px 8px; border-radius: 999px; background: rgba(255,255,255,0.14);
  font-size: 11px; font-weight: 600; color: #fff; }
.hib-campaign__eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #FFD7B0; box-shadow: 0 0 0 3px rgba(255,215,176,0.3); }
.hib-campaign h2 { margin: 0; font-size: 22px; line-height: 26px; font-weight: 800; letter-spacing: -0.02em; color: #fff; text-wrap: balance; }
.hib-campaign h2 em { font-style: normal; color: #FFD7B0; }
.hib-campaign p { margin: 0 0 6px; font-size: 12px; line-height: 16px; color: rgba(255,255,255,0.85); }
@media (max-width: 1023px) {
  .hib-campaign { height: auto; min-height: 340px; display: flex; align-items: flex-end; padding: 12px; }
  .hib-campaign__media { width: 100%; height: 62%; bottom: auto; -webkit-mask-image: linear-gradient(180deg, #000 55%, transparent 100%); mask-image: linear-gradient(180deg, #000 55%, transparent 100%); }
  .hib-campaign__copy { position: relative; left: auto; top: auto; transform: none; width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .hib-campaign__media img { transition: none; } }
`;

export default function CampaignBanner({ campaign = VALORIZA }: { campaign?: Campaign }): JSX.Element {
  const c = campaign;
  return (
    <section className="hib-campaign" aria-label={c.aria} style={{ background: c.bg }}>
      <style href="concorde-index-campaign" precedence="default">{CAMPAIGN_CSS}</style>
      <div className="hib-campaign__copy">
        <small className="hib-campaign__eyebrow">{c.eyebrow}</small>
        <h2>{c.title}</h2>
        <p>{c.lead}</p>
        {c.href ? <GlassButton href={c.href}>{c.cta}</GlassButton> : <GlassButton>{c.cta}</GlassButton>}
      </div>
      <div className="hib-campaign__media"><img src={c.image} alt="" style={{ objectPosition: c.position }} /></div>
    </section>
  );
}
