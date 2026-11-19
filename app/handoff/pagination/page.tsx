/**
 * /handoff/pagination — Documentación de Pagination (numeración de páginas de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import PaginationDemo from "./PaginationDemo";

const USAGE = `import { Pagination } from "@/src/components/Pagination";

const [page, setPage] = useState(0);
<Pagination page={page} pages={3} onChange={setPage} label="Mis publicaciones" variant="glass" size="s" />`;

export default function PaginationHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Pagination"
      summary="Numeración ‹ 1 2 3 › al pie de una lista. Solo dibuja: la página actual y el cambio de página los maneja quien la usa. Dos formas (sólida y vidrio) y dos tamaños."
      note={<>Viene de mi-garaje-lab (Paginado de Tu actividad: 5 filas por página en Mis publicaciones). Las flechas se desactivan en la primera y la última página.</>}
      hero={{ node: <PaginationDemo variant="glass" size="s" />, code: `<Pagination page={page} pages={3} onChange={setPage} label="Mis publicaciones" variant="glass" size="s" />`, minHeight: 160 }}
      installName="pagination"
      usage={USAGE}
      examples={[
        { title: "Sólida, mediana", description: "La página actual en un círculo violeta sólido; las demás, número gris sin fondo.",
          node: <PaginationDemo variant="solid" size="m" pages={4} />, code: `<Pagination page={page} pages={4} onChange={setPage} label="Mis publicaciones" />` },
        { title: "Vidrio, mediana", description: "Los números en una píldora de vidrio; la actual en violeta translúcido con brillo.",
          node: <PaginationDemo variant="glass" size="m" pages={5} />, code: `<Pagination page={page} pages={5} onChange={setPage} label="Mis publicaciones" variant="glass" />` },
      ]}
      api={[
        { name: "page", type: "number", description: "Página actual, desde 0." },
        { name: "pages", type: "number", description: "Cantidad de páginas." },
        { name: "onChange", type: "(page: number) => void", description: "Se llama con la página elegida (desde 0), ya acotada." },
        { name: "label", type: "string", description: "Qué se pagina, para el lector de pantalla («Páginas de …»)." },
        { name: "variant", type: `"solid" | "glass"`, default: `"solid"`, description: "Forma de la página actual: círculo violeta sólido o píldora de vidrio." },
        { name: "size", type: `"m" | "s"`, default: `"m"`, description: "Botones de 22 px (m) o de 18 px (s)." },
      ]}
      files={["src/components/Pagination.tsx"]}
    />
  );
}
