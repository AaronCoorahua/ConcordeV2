/**
 * /handoff/activitysection — Documentación de ActivitySection (secciones plegables de Tu actividad en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ActivitySectionDemo from "./ActivitySectionDemo";

const USAGE = `import { ActivitySection } from "@/src/components/ActivitySection";

const [abierta, setAbierta] = useState(true);
<ActivitySection id="negociaciones" title="Mis negociaciones" icon="negociaciones" count={sinAbrir}
  open={abierta} onToggle={() => setAbierta((x) => !x)}>
  <FolderTabs … />
  {filas}
</ActivitySection>`;

export default function ActivitySectionHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ActivitySection"
      summary="Sección plegable de Tu actividad: ícono de vidrio, título, un círculo con las novedades sin abrir y la flecha naranja. Al tocar el encabezado el cuerpo se abre o se pliega (alto y opacidad, 200 ms)."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc): Mis negociaciones, Mis participaciones, Mis compras, Mis publicaciones y Mis valorizaciones. Las secciones van una debajo de otra, separadas por una línea, dentro de la tarjeta blanca de Tu actividad (aquí, el marco del ejemplo, con la base de la página: Plus Jakarta Sans y alto de línea normal). El círculo aparece solo con novedades sin abrir (en la pantalla, Mis participaciones: 1). Depende de Vidrio.</>}
      hero={{ node: <ActivitySectionDemo />, minHeight: 360,
        code: `<ActivitySection id="negociaciones" title="Mis negociaciones" icon="negociaciones" open={abierta} onToggle={alternar}>
  <FolderTabs options={["Compras", "En venta"]} notificationIndices={[]} value={lado} onChange={setLado} />
  <VehicleRow … />
</ActivitySection>` }}
      installName="activitysection"
      usage={USAGE}
      examples={[
        { title: "Sin filas", description: "Mis compras sin compras: el cuerpo lleva el texto de sección vacía que le pase quien la usa.", minHeight: 180,
          node: <ActivitySectionDemo set="compras" />, code: `<ActivitySection id="compras" title="Mis compras" icon="compras" open={abierta} onToggle={alternar}>
  <div className="fs__empty"><p>Aún no tienes compras.</p></div>
</ActivitySection>` },
      ]}
      api={[
        { name: "id", type: "string", description: "Identificador de la sección; arma los id sec-…, fs-… y fs-body-…." },
        { name: "title", type: "string", description: "Título (p. ej. «Mis negociaciones»)." },
        { name: "icon", type: "Sec (Vidrio)", description: "Ícono de vidrio: negociaciones, participaciones, compras, publicaciones o valorizaciones." },
        { name: "count", type: "number", default: "0", description: "Novedades sin abrir; con 0 no hay círculo." },
        { name: "open", type: "boolean", description: "Abierta." },
        { name: "onToggle", type: "() => void", description: "Al tocar el encabezado." },
        { name: "className", type: "string", description: "Clases extra de la sección." },
        { name: "children", type: "ReactNode", description: "Cuerpo: pestañas, filas, paginado o el texto de sección vacía." },
      ]}
      files={["src/components/ActivitySection.tsx", "src/components/Vidrio.tsx"]}
    />
  );
}
