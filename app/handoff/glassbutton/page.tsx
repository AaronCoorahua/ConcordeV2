/**
 * /handoff/glassbutton — Documentación de GlassButton (botón de vidrio del Index).
 */
import type { JSX } from "react";
import GlassButton from "@/src/components/GlassButton";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import GlassButton from "@/src/components/GlassButton";

<GlassButton onClick={publicar}>Publicar mi auto</GlassButton>
<GlassButton href="https://www.vmcsubastas.com/landing-subascars">Publica ahora</GlassButton>`;

const lilac = { display: "flex", gap: 16, padding: 32, borderRadius: 16, background: "linear-gradient(100deg, #2A1670 0%, #3D2299 45%, #8460E5 100%)" } as const;

export default function GlassButtonHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="GlassButton"
      summary="Botón translúcido con blur y borde degradado (VYStrokes1). Para fotos y fondos oscuros: banner principal, banner de campaña y la tarjeta de SubasCars."
      note={<>Viene de vmc-index-lab (clase .hib-glass). Con href se dibuja como enlace; sin él, como botón.</>}
      hero={{ node: <div style={lilac}><GlassButton>Publicar mi auto</GlassButton><GlassButton href="#">Publica ahora</GlassButton></div>,
        code: `<GlassButton>Publicar mi auto</GlassButton>\n<GlassButton href="#">Publica ahora</GlassButton>`, minHeight: 180 }}
      installName="glassbutton"
      usage={USAGE}
      api={[
        { name: "children", type: "ReactNode", description: "Texto del botón." },
        { name: "href", type: "string", description: "Si se pasa, es un enlace (<a>)." },
        { name: "...props", type: "Button o Anchor HTML attributes", description: "onClick, disabled, target y demás." },
      ]}
      files={["src/components/GlassButton.tsx"]}
    />
  );
}
