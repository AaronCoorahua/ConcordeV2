/**
 * /handoff/logomarquee — Documentación de LogoMarquee (empresas que publican en VMC).
 */
import type { JSX } from "react";
import LogoMarquee from "@/src/components/LogoMarquee";
import { COMPANIES } from "@/src/blocks/index/shared/data";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const ITEMS = COMPANIES.map((c) => ({ name: c.name, logo: c.logo, caption: c.lots }));

const USAGE = `import LogoMarquee from "@/src/components/LogoMarquee";

<LogoMarquee
  ariaLabel="Empresas que publican en VMC"
  items={[
    { name: "Autoplan", logo: "/logos/autoplan.png", caption: "3 lotes", href: "/empresas/autoplan" },
    { name: "Pacífico", logo: "/logos/pacifico.png", caption: "2 lotes", href: "/empresas/pacifico" },
  ]}
/>`;

export default function LogoMarqueeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="LogoMarquee"
      summary="Franja de logos en movimiento continuo, cada uno en una tarjeta blanca con una línea debajo. Se pausa con el mouse o el foco y los bordes se desvanecen."
      note={<>Viene de vmc-index-lab (Empresas que publican en VMC, vista Slider). Sección nueva del Index: en el Homepage las empresas solo estaban en el submenú del Sidebar.</>}
      hero={{ node: <div style={{ width: 680 }}><LogoMarquee items={ITEMS} /></div>, code: `<LogoMarquee items={empresas} />`, minHeight: 180 }}
      installName="logomarquee"
      usage={USAGE}
      examples={[
        { title: "Más lento y sin línea", description: "duration en segundos por vuelta; sin caption queda solo el logo.",
          node: <div style={{ width: 680 }}><LogoMarquee items={ITEMS.map((c) => ({ ...c, caption: undefined }))} duration={45} /></div>,
          code: `<LogoMarquee items={logos} duration={45} />` },
      ]}
      api={[
        { name: "items", type: "LogoMarqueeItem[]", description: "Logos en orden." },
        { name: "items[].name", type: "string", description: "Nombre (etiqueta accesible)." },
        { name: "items[].logo", type: "string", description: "Imagen del logo (máx. 120 × 40 dentro de la tarjeta)." },
        { name: "items[].caption", type: "string", description: "Línea debajo, p. ej. 3 lotes." },
        { name: "items[].href", type: "string", description: "Si se pasa, la tarjeta es un enlace." },
        { name: "duration", type: "number", default: "26", description: "Segundos por vuelta." },
        { name: "repeat", type: "number", default: "2", description: "Veces que se repite la lista en cada mitad de la pista; súbelo si hay pocos logos y la franja es muy ancha." },
        { name: "ariaLabel", type: "string", default: `"Empresas"` },
        { name: "className", type: "string", default: `""` },
      ]}
      files={["src/components/LogoMarquee.tsx"]}
    />
  );
}
