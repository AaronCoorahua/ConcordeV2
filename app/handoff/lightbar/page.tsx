/**
 * /handoff/lightbar — Documentación de LightBar (barra de luz de FeaturedCard).
 */
import type { JSX } from "react";
import { LightBar } from "@/src/components/LightBar";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import { LightBar } from "@/src/components/LightBar";

<LightBar />                    // en vivo, naranja
<LightBar tone="negotiable" />  // Recibe ofertas, turquesa`;

const label = { fontSize: 12, color: "var(--ui-body)", marginBottom: 6 } as const;

export default function LightBarHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="LightBar"
      summary="Barra llena con una luz que la recorre: naranja en vivo, turquesa en Recibe ofertas. Va al pie de FeaturedCard."
      note={<>Viene de vmc-index-lab. Es decorativa (aria-hidden).</>}
      hero={{
        node: (
          <div style={{ display: "grid", gap: 16, width: 320 }}>
            <div><div style={label}>En vivo</div><LightBar /></div>
            <div><div style={label}>Recibe ofertas</div><LightBar tone="negotiable" /></div>
          </div>
        ),
        code: `<LightBar />\n<LightBar tone="negotiable" />`, minHeight: 180,
      }}
      installName="lightbar"
      usage={USAGE}
      api={[
        { name: "tone", type: `"live" | "negotiable"`, default: `"live"`, description: "Naranja (en vivo) o turquesa (Recibe ofertas)." },
        { name: "height", type: "number", default: "9", description: "Alto en px." },
        { name: "className", type: "string", default: `""` },
      ]}
      files={["src/components/LightBar.tsx"]}
    />
  );
}
