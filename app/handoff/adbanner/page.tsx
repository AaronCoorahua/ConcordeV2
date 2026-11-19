/**
 * /handoff/adbanner — Documentación de AdBanner (publicidad del riel y de la barra lateral de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { AdBanner } from "@/src/components/AdBanner";

// Las piezas que muestra Mi Garaje (public/mi-garaje/banners/publica-vmc.html).
const RAIL = "/mi-garaje/banners/publica-vmc.html?v=10-valor-publica&f=side400&e=personaje";
const STRIP = "/mi-garaje/banners/publica-vmc.html?v=10-valor-publica&f=strip776&e=personaje";
const SIDE = "/mi-garaje/banners/publica-vmc.html?v=01-auto&f=side400&e=personaje";

const USAGE = `import { AdBanner } from "@/src/components/AdBanner";

<AdBanner slot="rail" src={pieza} stripSrc={tira} title="Publicidad: Conoce su valor y publícalo en VMC." />
<AdBanner slot="side" src={pieza} title="Publicidad: Tu auto, tu precio, tu trato." />`;

export default function AdBannerHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="AdBanner"
      summary="Espacio de publicidad con una pieza HTML de /banners. «rail»: 300 px de ancho y el alto de su contenido (bajo 1100 px cambia a la tira de 776 × 232). «side»: llena el banner de la barra lateral (200 × 400). El enlace vive dentro de la pieza."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc: riel derecho bajo Mi billetera y banner de la barra lateral). En la barra lateral el marco redondeado lo pone el Sidebar; aquí, un marco de 200 × 400 con radio de 16 px.</>}
      hero={{ node: <div style={{ width: "100%", maxWidth: 300, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><AdBanner slot="rail" src={RAIL} stripSrc={STRIP} title="Publicidad: Conoce su valor y publícalo en VMC." /></div>, minHeight: 380,
        code: `<AdBanner slot="rail" src={pieza} stripSrc={tira} title="Publicidad: Conoce su valor y publícalo en VMC." />` }}
      installName="adbanner"
      usage={USAGE}
      examples={[
        { title: "Barra lateral", description: "Llena el espacio del banner del Sidebar.", tone: "dark", minHeight: 440,
          node: <div style={{ position: "relative", width: 200, height: 400, borderRadius: 16, overflow: "hidden" }}><AdBanner slot="side" src={SIDE} title="Publicidad: Tu auto, tu precio, tu trato." /></div>,
          code: `<AdBanner slot="side" src={pieza} title="Publicidad: Tu auto, tu precio, tu trato." />` },
      ]}
      api={[
        { name: "slot", type: `"rail" | "side"`, description: "rail: riel derecho; side: banner de la barra lateral." },
        { name: "src", type: "string", description: "URL de la pieza vertical." },
        { name: "stripSrc", type: "string", description: "URL de la tira horizontal (solo rail)." },
        { name: "title", type: "string", description: "Título accesible del iframe." },
      ]}
      files={["src/components/AdBanner.tsx"]}
    />
  );
}
