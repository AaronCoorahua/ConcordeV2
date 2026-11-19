/**
 * /handoff/combobox — Documentación de Combobox (Marca y Modelo en Valorizar / Publicar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ComboboxDemo from "./ComboboxDemo";

const BRANDS = ["Toyota", "Kia", "Hyundai", "Volkswagen"];
const MANUAL = "+ Mi modelo no aparece";

const USAGE = `import { Combobox } from "@/src/components/Combobox";

<Combobox label="Marca" value={marca} onChange={setMarca} options={marcas} placeholder="Escribe o elige la marca" />`;

export default function ComboboxHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Combobox"
      summary="Selector con búsqueda para listas largas, con el marco de Select. Escribir filtra sin tildes ni mayúsculas; ↑ ↓ recorren, Enter elige y Esc cierra. Si el texto no coincide con una opción al salir, vuelve al valor elegido."
      note={<>Viene de mi-garaje-lab (Flujo Valorizar y Publicar): Marca y Modelo. En Modelo, «+ Mi modelo no aparece» va siempre al final, separado (prop pinned). Patrón combobox del W3C APG.</>}
      hero={{ node: <ComboboxDemo label="Marca" options={BRANDS} placeholder="Escribe o elige la marca" />, code: `<Combobox label="Marca" value={marca} onChange={setMarca} options={["Toyota", "Kia", "Hyundai", "Volkswagen"]} placeholder="Escribe o elige la marca" />`, minHeight: 340 }}
      installName="combobox"
      usage={USAGE}
      examples={[
        { title: "Modelo con opción fija al final", description: "Los modelos de Toyota y «+ Mi modelo no aparece», que no se filtra.",
          node: <ComboboxDemo label="Modelo" options={["Corolla", "Hilux", "Etios", MANUAL]} placeholder="Escribe o elige el modelo" pinned={MANUAL} />,
          code: `<Combobox label="Modelo" value={modelo} onChange={setModelo} options={[...modelos, "${MANUAL}"]} placeholder="Escribe o elige el modelo" pinned="${MANUAL}" />` },
        { title: "Deshabilitado", description: "Mientras falta el dato anterior de la cascada.",
          node: <ComboboxDemo label="Modelo" options={[]} placeholder="Primero elige la marca" disabled />,
          code: `<Combobox label="Modelo" value="" onChange={setModelo} options={[]} placeholder="Primero elige la marca" disabled />` },
      ]}
      api={[
        { name: "label", type: "string", description: "Rótulo encima del campo." },
        { name: "value", type: "string", description: "Opción elegida; \"\" muestra el placeholder." },
        { name: "onChange", type: "(value: string) => void", description: "Se llama con la opción elegida." },
        { name: "options", type: "string[]", description: "Opciones (incluye pinned si se usa)." },
        { name: "placeholder", type: "string", description: "Texto sin opción elegida." },
        { name: "disabled", type: "boolean", description: "Deshabilitado mientras falta el dato anterior." },
        { name: "pinned", type: "string", description: "Opción que no se filtra y va siempre al final, separada." },
      ]}
      files={["src/components/Combobox.tsx", "src/components/Select.tsx"]}
    />
  );
}
