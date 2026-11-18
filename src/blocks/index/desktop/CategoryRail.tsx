/**
 * CategoryRail — «Explora por categoría» del Index (vmc-index-lab, CategoryRail, vista «Normal» · «Fila de 6»).
 * Evolución de la columna «CATEGORÍAS» del CategoriesSection del Homepage: pasa de 4 CategoryCard con ícono a
 * 6 cards con foto, ícono de vidrio (Vidrio) y conteo de lotes. En celular, 2 columnas.
 */
import type { JSX } from "react";
import { Vidrio } from "@/src/components/Vidrio";
import { CATEGORIES } from "../shared/data";
import SectionHead from "./SectionHead";

const CATEGORY_CSS = String.raw`
.hib-cats { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0 0 6px; list-style: none; }
.hib-cats > li { display: flex; min-width: 0; }
.hib-cat { flex: 1; display: flex; flex-direction: column; overflow: hidden; border-radius: 8px; background: #fff; color: inherit; text-decoration: none;
  box-shadow: rgba(0,0,0,0.07) 0 0 16px 4px; transition: transform 150ms cubic-bezier(0.3,0,0,1), box-shadow 150ms cubic-bezier(0.3,0,0,1); }
.hib-cat:hover { transform: translateY(-3px); box-shadow: oklch(0.22 0.18 285 / 0.12) 0 12px 20px; }
.hib-cat:focus-visible { outline: 2px solid #8460e5; outline-offset: 2px; }
.hib-cat > img { display: block; width: 100%; height: 92px; object-fit: cover; }
.hib-cat__foot { flex: 1; display: grid; grid-template-columns: 32px minmax(0,1fr) 20px; gap: 6px; align-items: center; padding: 8px 6px 8px 8px; }
.hib-cat__icon { display: grid; place-items: center; width: 32px; height: 32px; }
.hib-cat__txt { display: grid; min-width: 0; }
.hib-cat__txt b { font-size: 12px; line-height: 1.2; color: #3b1782; }
.hib-cat__txt small { font-size: 11px; color: #5b5b66; }
.hib-cat__go { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; color: #3b1782; background: #F3EFFD; }
@media (max-width: 1023px) { .hib-cats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (prefers-reduced-motion: reduce) { .hib-cat { transition: none; } }
`;

export default function CategoryRail(): JSX.Element {
  return (
    <section aria-label="Explora por categoría" style={{ boxSizing: "border-box", width: "100%", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
      <style href="concorde-index-categories" precedence="default">{CATEGORY_CSS}</style>
      <SectionHead title="Explora por categoría" subtitle="Encuentra oportunidades por tipo de activo" action="Ver todas las categorías" />
      <ul className="hib-cats">
        {CATEGORIES.map(({ label, count, icon, image }) => (
          <li key={label}>
            <a href="#" className="hib-cat vd-host" aria-label={`${label} · ${count}`}>
              <img src={image} alt="" />
              <span className="hib-cat__foot">
                <span className="hib-cat__icon"><Vidrio s={icon} size={32} /></span>
                <span className="hib-cat__txt"><b>{label}</b><small>{count}</small></span>
                <span className="hib-cat__go" aria-hidden><svg width="12" height="12" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
