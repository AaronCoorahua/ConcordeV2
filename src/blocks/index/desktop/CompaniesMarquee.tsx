/**
 * CompaniesMarquee — «Empresas que publican en VMC» del Index: cabecera de sección + LogoMarquee. Sección nueva.
 */
import type { JSX } from "react";
import LogoMarquee from "@/src/components/LogoMarquee";
import { COMPANIES } from "../shared/data";
import SectionHead from "./SectionHead";

export default function CompaniesMarquee(): JSX.Element {
  return (
    <section aria-label="Empresas que publican en VMC" style={{ boxSizing: "border-box", width: "100%", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
      <SectionHead title="Empresas que publican en VMC" subtitle="Tiendas especializadas que publican en VMC" />
      <LogoMarquee ariaLabel="Empresas que publican en VMC"
        items={COMPANIES.map((c) => ({ name: c.name, logo: c.logo, caption: c.lots, href: "#" }))} />
    </section>
  );
}
