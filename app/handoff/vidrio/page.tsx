/**
 * /handoff/vidrio — Documentación de Vidrio (íconos de vidrio esmerilado).
 */
import type { JSX } from "react";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const ALL: Sec[] = ["negociaciones", "participaciones", "compras", "publicaciones", "valorizaciones", "billetera", "auto", "alertas", "publicar", "km",
  "caja", "combustible", "fecha", "ubicacion", "equipo", "docs", "texto", "precio", "vehicular", "equipos", "maquinaria", "materiales", "articulos",
  "mobiliario", "empresa", "verificado", "crecimiento", "vender"];

const USAGE = `import { Vidrio } from "@/src/components/Vidrio";

<Vidrio s="vehicular" size={32} />

// Para que se separen las capas al pasar el mouse, el contenedor lleva la clase vd-host
<a className="vd-host" href="/categoria/vehicular"><Vidrio s="vehicular" size={32} /> Vehicular</a>`;

export default function VidrioHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="Vidrio"
      summary="Íconos de vidrio esmerilado: una forma sólida violeta detrás y una de vidrio lila delante que la desenfoca donde se cruzan, con el detalle en blanco. SVG puro en retícula de 48 px."
      note={<>Es el set de Mi Garaje y del Index (skill vidrio-esmerilado de vmc-index-lab). En el Index, los de categorías. Van sobre fondo blanco.</>}
      hero={{
        node: (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 72px)", gap: 8 }}>
            {ALL.map((s) => (
              <div key={s} className="vd-host" style={{ display: "grid", justifyItems: "center", gap: 4, padding: "8px 0" }}>
                <Vidrio s={s} size={36} />
                <small style={{ fontSize: 10, color: "var(--ui-body)" }}>{s}</small>
              </div>
            ))}
          </div>
        ),
        code: `<Vidrio s="negociaciones" size={36} />`, minHeight: 360,
      }}
      installName="vidrio"
      usage={USAGE}
      api={[
        { name: "s", type: "Sec", description: `Nombre del ícono (${ALL.length}): ${ALL.join(", ")}.` },
        { name: "size", type: "number", default: "24", description: "Lado en px." },
      ]}
      files={["src/components/Vidrio.tsx"]}
    />
  );
}
