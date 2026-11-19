/**
 * /handoff/select — Documentación de Select (lista desplegable del formulario de Valorizar / Publicar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import SelectDemo from "./SelectDemo";

const CC = ["1.0 L", "1.2 L", "1.4 L", "1.5 L", "1.6 L", "1.8 L", "2.0 L", "2.4 L", "2.8 L", "3.0 L+"];

const USAGE = `import { Select } from "@/src/components/Select";

<Select label="Año de fabricación" value={anio} onChange={setAnio} options={anios} placeholder="Año" />`;

export default function SelectHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Select"
      summary="Lista desplegable con rótulo: el <select> nativo dentro del marco del campo de Mi Garaje VMC (44 px, borde gris, foco lila con anillo). El chevron se enciende en naranja con el foco."
      note={<>Viene de mi-garaje-lab (Flujo Valorizar y Publicar): Año de fabricación, Versión, Cilindrada, Departamento, Provincia y Distrito. Combobox usa el mismo marco.</>}
      hero={{ node: <SelectDemo start="2019" />, code: `<Select label="Año de fabricación" value="2019" onChange={setAnio} options={anios} placeholder="Año" />`, minHeight: 180 }}
      installName="select"
      usage={USAGE}
      examples={[
        { title: "Deshabilitado", description: "Mientras falta el dato anterior de la cascada (Valorizar: primero la marca).",
          node: <SelectDemo placeholder="Primero elige la marca" disabled />, code: `<Select label="Año de fabricación" value="" onChange={setAnio} options={anios} placeholder="Primero elige la marca" disabled />` },
        { title: "Versión", description: "Las versiones del modelo elegido (Toyota Corolla).",
          node: <SelectDemo label="Versión" options={["XEI 1.8 CVT", "GLI 2.0 CVT"]} placeholder="Elige la versión" />, code: `<Select label="Versión" value={version} onChange={setVersion} options={["XEI 1.8 CVT", "GLI 2.0 CVT"]} placeholder="Elige la versión" />` },
        { title: "Con error", description: "Publicar, al intentar seguir sin elegirla: borde rojo y el mensaje debajo.",
          node: <SelectDemo label="Cilindrada" options={CC} placeholder="Selecciona cilindrada" error="Elige la cilindrada" />,
          code: `<Select label="Cilindrada" value="" onChange={setCc} options={cilindradas} placeholder="Selecciona cilindrada" error="Elige la cilindrada" />` },
      ]}
      api={[
        { name: "label", type: "string", description: "Rótulo encima del campo." },
        { name: "value", type: "string", description: "Opción elegida; \"\" muestra el placeholder." },
        { name: "onChange", type: "(value: string) => void", description: "Se llama con la opción elegida." },
        { name: "options", type: "string[]", description: "Opciones de la lista." },
        { name: "placeholder", type: "string", description: "Texto sin opción elegida." },
        { name: "disabled", type: "boolean", description: "Deshabilitado mientras falta el dato anterior." },
        { name: "id", type: "string", description: "id del <select> (para llevarle el foco)." },
        { name: "onBlur", type: "() => void", description: "Se llama al salir del campo." },
        { name: "error", type: "string", description: "Mensaje de error: borde rojo y texto debajo." },
      ]}
      files={["src/components/Select.tsx"]}
    />
  );
}
