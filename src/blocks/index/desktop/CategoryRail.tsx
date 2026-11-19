/**
 * «Explora por categoría» del Index: el título de la sección y las tarjetas (componente CategoryRail).
 * Evolución de la columna «CATEGORÍAS» del Homepage anterior (4 CategoryCard con ícono → 6 tarjetas con foto e ícono de vidrio).
 */
import type { JSX } from "react";
import { CategoryRail as Rail } from "@/src/components/CategoryRail";
import { CATEGORIES } from "../shared/data";
import SectionHead from "./SectionHead";

export default function CategoryRail(): JSX.Element {
  return (
    <section aria-label="Explora por categoría" style={{ boxSizing: "border-box", width: "100%", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
      <SectionHead title="Explora por categoría" subtitle="Encuentra oportunidades por tipo de activo" action="Ver todas las categorías" />
      <Rail items={CATEGORIES} />
    </section>
  );
}
