/**
 * /handoff/userprofilecard — Documentación de UserProfileCard
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import UserProfileCard from "@/src/components/UserProfileCard";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/UserProfileCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer UserProfileCard.tsx en build.";
  }
}

const USAGE = `import UserProfileCard from "@/src/components/UserProfileCard";

<UserProfileCard username="ZAEX5G" />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

// La card mide 766px de ancho → la escalamos para que entre en el contenedor de
// la doc sin scroll horizontal. El recuadro recorta el sobreancho del layout.
function CardStage({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div style={{ width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", background: "#f1f5f9", borderRadius: 12, padding: "28px 0" }}>
      <div style={{ transform: "scale(0.9)", transformOrigin: "center" }}>{children}</div>
    </div>
  );
}

const EXAMPLES: Example[] = [
  {
    id: "default",
    title: "Por defecto",
    description: "Saludo, riesgo del perfil, puntos VMC y accesos a perfil / historial.",
    node: (
      <CardStage>
        <UserProfileCard />
      </CardStage>
    ),
    code: `<UserProfileCard />`,
  },
  {
    id: "custom",
    title: "Datos personalizados",
    description: "Todos los textos son props: usuario, riesgo y puntos.",
    node: (
      <CardStage>
        <UserProfileCard username="MROA21" riskValue="Medio" points="1 240 pts" />
      </CardStage>
    ),
    code: `<UserProfileCard
  username="MROA21"
  riskValue="Medio"
  points="1 240 pts"
/>`,
  },
];

const API: PropRow[] = [
  { name: "username",    type: "string", default: '"ZAEX5G"',             description: "Usuario mostrado en «¡Hola, {username}!»." },
  { name: "riskLabel",   type: "string", default: '"RIESGO DEL PERFIL"',  description: "Etiqueta de la 1ª estadística." },
  { name: "riskValue",   type: "string", default: '"Muy bajo"',           description: "Valor de riesgo (naranja)." },
  { name: "pointsLabel", type: "string", default: '"PUNTOS VMC"',         description: "Etiqueta de la 2ª estadística." },
  { name: "points",      type: "string", default: '"500 pts"',            description: "Puntos VMC junto a la estrella." },
  { name: "onProfile",   type: "MouseEventHandler", description: "Click del acceso «Tu perfil»." },
  { name: "profileHref", type: "string", description: "Si se pasa, «Tu perfil» se renderiza como enlace." },
  { name: "onHistory",   type: "MouseEventHandler", description: "Click del acceso «Historial»." },
  { name: "historyHref", type: "string", description: "Si se pasa, «Historial» se renderiza como enlace." },
  { name: "className",   type: "string", description: "Clases extra sobre la tarjeta." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function UserProfileCardHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>UserProfileCard</h1>
      <p style={{ ...muted, fontSize: 16 }}>Tarjeta de zona de usuario (766×140): saludo, riesgo del perfil, puntos VMC y accesos. Compone AvatarZone, ProfileButton y StarIcon.</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={180} code={`<UserProfileCard username="ZAEX5G" />`}>
          <CardStage>
            <UserProfileCard />
          </CardStage>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="userprofilecard" />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description && <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p>}
              <Preview code={ex.code} minHeight={180}>{ex.node}</Preview>
            </div>
          );
        })}
      </div>

      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>UserProfileCard.tsx</code> completo</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="UserProfileCard.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
