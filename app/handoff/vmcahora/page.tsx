/**
 * /handoff/vmcahora — Documentación de VmcAhora (feed en vivo del Index).
 */
import type { JSX } from "react";
import VmcAhora from "@/src/components/VmcAhora/VmcAhora";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import VmcAhora from "@/src/components/VmcAhora/VmcAhora";

// Escritorio: a la derecha del banner, con alto fijo y scroll interno
<div style={{ height: 520, display: "flex" }}>
  <VmcAhora view="timeline" />
</div>

// Celular: tarjeta que crece con «Ver más» (sin scroll interno)
<VmcAhora view="timeline" more />`;

const box = (h: number) => ({ width: 320, height: h, display: "flex" }) as const;

export default function VmcAhoraHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="VmcAhora"
      summary="Feed en vivo del Index: ofertas publicadas, ofertas que vuelven a mostrarse, avisos de propuesta, nuevos usuarios, publicidad de VMC y blog. Entra una entrada nueva cada 45 s; se pausa con el mouse encima."
      note={<>Viene de vmc-index-lab. Las reglas y fórmulas del día están en <code>feedPlan.ts</code> (misma carpeta); la guía para producción es <code>vmc-ahora.md</code> del lab. El inventario y los contadores son de ejemplo.</>}
      hero={{ node: <div style={box(560)}><VmcAhora view="timeline" /></div>, code: `<VmcAhora view="timeline" />`, minHeight: 600 }}
      installName="vmcahora"
      usage={USAGE}
      examples={[
        { title: "Con Ver más", description: "Muestra 2 publicaciones y suma de a 3. Es la versión del celular.", minHeight: 420,
          node: <div style={{ width: 320, display: "flex" }}><VmcAhora view="timeline" more /></div>, code: `<VmcAhora view="timeline" more />` },
        { title: "Listado", description: "Foto, lote, precio y una línea gris con autor y tiempo.", minHeight: 480,
          node: <div style={box(440)}><VmcAhora view="normal" /></div>, code: `<VmcAhora view="normal" />` },
      ]}
      api={[
        { name: "view", type: `"timeline" | "normal"`, description: "Timeline (estilo X, el elegido) o listado." },
        { name: "more", type: "boolean", default: "false", description: "Sin scroll interno: 2 publicaciones y botón Ver más." },
        { name: "live", type: "boolean", default: "true", description: "Etiqueta En vivo en la cabecera." },
        { name: "x", type: "boolean", default: "false", description: "Feed a pantalla completa estilo X (celular)." },
        { name: "head", type: "boolean", default: "true", description: "Con x: muestra la cabecera." },
        { name: "page", type: "boolean", default: "false", description: "Con x: sin scroll propio, desplaza la página." },
        { name: "simulateRealAction()", type: "() => void", description: "Hace entrar ya un hecho real de prueba (lo que en producción hará un evento)." },
        { name: "setFeedConfig(escenario, velocidad)", type: "(string, number) => void", description: "Solo demo: inventario de ejemplo y velocidad del reloj." },
      ]}
      files={["src/components/VmcAhora/VmcAhora.tsx", "src/components/VmcAhora/feedPlan.ts"]}
    />
  );
}
