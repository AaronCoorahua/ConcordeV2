/**
 * /handoff/categoryrail — Documentación de CategoryRail («Explora por categoría» del Index).
 */
import type { JSX } from "react";
import { CategoryRail } from "@/src/components/CategoryRail";
import { CATEGORIES } from "@/src/blocks/index/shared/data";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import { CategoryRail } from "@/src/components/CategoryRail";

<CategoryRail items={[
  { label: "Vehicular", count: "21 lotes", icon: "vehicular", image: "/fotos/suv.jpg", href: "/categoria/vehicular" },
  { label: "Maquinaria", count: "2 lotes", icon: "maquinaria", image: "/fotos/excavadora.jpg" },
]} />`;

export default function CategoryRailHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="CategoryRail"
      summary="Tarjetas de «Explora por categoría»: foto, ícono de vidrio, nombre, cantidad de lotes y flecha. Seis en fila desde 1024 px y dos columnas en pantallas más chicas."
      note={<>Viene del Index (vmc-index-lab). Es la evolución de CategoryCard: el Homepage anterior mostraba 4 categorías con ícono; el Index muestra 6 con foto. El título de la sección lo pone quien lo usa.</>}
      hero={{ node: <div style={{ width: 720 }}><CategoryRail items={CATEGORIES} /></div>, code: `<CategoryRail items={categorias} />`, minHeight: 220 }}
      installName="categoryrail"
      usage={USAGE}
      examples={[
        { title: "Ancho de celular", description: "Dos columnas.", minHeight: 520,
          node: <div style={{ width: 360 }}><CategoryRail items={CATEGORIES} /></div>, code: `<CategoryRail items={categorias} />` },
      ]}
      api={[
        { name: "items", type: "CategoryRailItem[]", description: "Categorías en el orden en que se muestran." },
        { name: "items[].label / count", type: "string", description: "Nombre y cantidad de lotes." },
        { name: "items[].icon", type: "Sec", description: "Ícono de Vidrio: vehicular, equipos, maquinaria, materiales, mobiliario, articulos." },
        { name: "items[].image", type: "string", description: "Foto de la tarjeta." },
        { name: "items[].href", type: "string", default: `"#"`, description: "Destino de la tarjeta." },
      ]}
      files={["src/components/CategoryRail.tsx"]}
    />
  );
}
