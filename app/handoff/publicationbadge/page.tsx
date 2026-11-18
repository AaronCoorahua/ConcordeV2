/**
 * /handoff/publicationbadge — Documentación de PublicationBadge (Mis publicaciones de Mi Garaje).
 */
import type { JSX } from "react";
import { PUBLICATION_LABEL, PublicationBadge, PublicationPin, type PublicationStatus } from "@/src/components/PublicationBadge";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const ALL = Object.keys(PUBLICATION_LABEL) as PublicationStatus[];

const USAGE = `import { PublicationBadge, PublicationPin } from "@/src/components/PublicationBadge";

<PublicationBadge status="publicada" />
<PublicationBadge status="negociacion" label="2 propuestas" />

<p><PublicationPin /> Toyota Yaris 2022</p>`;

export default function PublicationBadgeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="PublicationBadge"
      summary="Estado de una publicación en Mis publicaciones: siete estados con su color, en una píldora de 19 px. PublicationPin marca una publicación fijada arriba de la lista."
      note={<>Viene de mi-garaje-lab (app/components/lib). Lo usa el bloque Mi Garaje. Incluye las animaciones de Republicar, que se activan con el atributo data-repub en la fila.</>}
      hero={{
        node: <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 520 }}>{ALL.map((s) => <PublicationBadge key={s} status={s} />)}</div>,
        code: ALL.map((s) => `<PublicationBadge status="${s}" />`).join("\n"), minHeight: 180,
      }}
      installName="publicationbadge"
      usage={USAGE}
      examples={[
        { title: "Publicación fijada", description: "La chincheta va antes del nombre, que queda en negrita.",
          node: <p style={{ margin: 0, fontSize: 14, color: "#191C1C" }}><PublicationPin />Toyota Yaris 2022 <PublicationBadge status="desierta" /></p>,
          code: `<p><PublicationPin />Toyota Yaris 2022 <PublicationBadge status="desierta" /></p>` },
      ]}
      api={[
        { name: "status", type: ALL.map((s) => `"${s}"`).join(" | "), description: "Estado de la publicación." },
        { name: "label", type: "string", default: "PUBLICATION_LABEL[status]", description: "Texto propio (p. ej. «2 propuestas»)." },
        { name: "PublicationPin", type: "componente", description: "Chincheta de fijada; sin props." },
        { name: "PUBLICATION_LABEL", type: "Record<PublicationStatus, string>", description: "Textos por estado." },
      ]}
      files={["src/components/PublicationBadge.tsx"]}
    />
  );
}
