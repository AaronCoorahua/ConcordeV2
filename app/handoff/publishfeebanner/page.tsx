/**
 * /handoff/publishfeebanner — Documentación de PublishFeeBanner (costo de publicar, Publicar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { PublishFeeBanner } from "@/src/components/PublishFeeBanner";

const USAGE = `import { PublishFeeBanner } from "@/src/components/PublishFeeBanner";

<PublishFeeBanner fee={25} />`;

export default function PublishFeeBannerHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="PublishFeeBanner"
      summary="Banner del costo de publicar: franja oscura de Mi Garaje VMC con la foto del personaje, pill de vidrio «25 SubasCoins · Pago único · 0% comisión», titular «Recibe propuestas por solo >S< 25» y bajada. Sin botón: la persona ya está publicando."
      note={<>Viene de mi-garaje-lab (Flujo Publicar, paso Vehículo, entre los pasos y el formulario). Copy de los T&C IV.11.2. En 640 px o menos la foto queda tenue detrás del texto.</>}
      hero={{ node: <div style={{ width: "100%", maxWidth: 760 }}><PublishFeeBanner fee={25} /></div>, code: `<PublishFeeBanner fee={25} />`, minHeight: 200 }}
      installName="publishfeebanner"
      usage={USAGE}
      api={[
        { name: "fee", type: "number", description: "Costo de publicar en SubasCoins (pago único)." },
      ]}
      files={["src/components/PublishFeeBanner.tsx"]}
    />
  );
}
