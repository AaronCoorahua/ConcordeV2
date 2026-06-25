# Skill: publish
**Registra un componente existente en el catálogo + crea su handoff page.**
Úsalo siempre que crees un nuevo componente en `src/components/`. Sin esto el componente existe pero no aparece en ningún lado.

---

## Activación
```
/publish NombreComponente
/publish TodayIcon
/publish MyButton
```

---

## Qué hace

1. **Lee** `src/components/{NombreComponente}.tsx` (o `src/components/{NombreComponente}/{NombreComponente}.tsx` si es subdirectorio) para entender sus props y variantes.
2. **Crea** `app/handoff/{nombreminuscula}/page.tsx` — la handoff page.
3. **Agrega** al REGISTRY en `app/components/page.tsx`:
   - import del componente
   - entrada `{ id, name, handoffPath, preview }` al final del array REGISTRY

---

## Reglas CRÍTICAS

### Handoff page (`app/handoff/{id}/page.tsx`)

- **NO lleva `"use client"`** — es Server Component. Los componentes cliente se renderizan dentro sin problema.
- Importa SOLO de:
  - `"react"` (tipos)
  - `"node:fs"` + `"node:path"` (para leer source)
  - `@/src/components/{NombreComponente}` (el componente)
  - `@/app/handoff/_components/Preview`
  - `@/app/handoff/_components/CodeBlock`
  - `@/app/handoff/_components/InstallCommand`
  - `@/app/handoff/_components/PropsTable` (y `type PropRow`)
- `readComponentSource()` lee el archivo del componente con `readFileSync`. El path es relativo a `process.cwd()`:
  - Archivo flat: `src/components/NombreComponente.tsx`
  - Subdirectorio: `src/components/NombreComponente/NombreComponente.tsx`
- Estructura obligatoria de la página:
  1. `<h1>` con el nombre exacto del componente
  2. `<p>` descripción de una línea
  3. `<Preview>` hero con el componente mostrando sus variantes/estados principales
  4. `<InstallCommand name="{id}" />` (id = nombre en minúsculas sin espacios)
  5. `<CodeBlock>` con ejemplo de uso básico
  6. Sección Ejemplos: array de ejemplos con `<Preview>` + código
  7. `<PropsTable rows={API} />` con todas las props
  8. `<details>` colapsable con `<CodeBlock code={source}>` del source completo
- Para componentes con fondo oscuro (iconos del sidebar, StatPill, Signal, etc.) el preview hero usa `background: "#2E0F70"` o el color apropiado.

### Catálogo (`app/components/page.tsx`)

- El import va AL FINAL de los imports existentes, antes del comentario `// ── Registry ──`.
- La entrada REGISTRY va AL FINAL del array, antes de `];`.
- El `preview` debe ser un JSX **visual** que muestre el componente en su estado más representativo. No pongas solo `<Componente />` vacío.
- Para iconos con estado: muestra los 3 estados (`state="default"`, `state="hover"`, `state="active"`) en fondo oscuro.
- Usa `transform: "scale(0.X)"` si el componente es muy grande para el card de 168px de altura.

### Convenciones de ID

| NombreComponente   | id (handoffPath + REGISTRY) |
|--------------------|----------------------------|
| `TodayIcon`        | `todayicon`                |
| `ServiceCenterIcon`| `servicecentericon`        |
| `MyButton`         | `mybutton`                 |
| `BidMessage`       | `bidmessage`               |

Siempre: lowercase, sin espacios, sin guiones, sin underscores.

---

## Checklist antes de terminar

- [ ] `app/handoff/{id}/page.tsx` existe y no da 404
- [ ] Aparece en `app/components/page.tsx` (REGISTRY array)
- [ ] Import del componente agregado en `app/components/page.tsx`
- [ ] Preview del catálogo muestra el componente correctamente (no un cuadro vacío)
- [ ] La handoff page muestra hero preview + ejemplos + API + source colapsado
- [ ] `InstallCommand` usa el `name` correcto (id en minúsculas)

---

## Ejemplo de handoff page completa

```tsx
/**
 * /handoff/myicon — Documentación de MyIcon
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import MyIcon from "@/src/components/MyIcon";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/MyIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer MyIcon.tsx en build.";
  }
}

const USAGE = `import MyIcon from "@/src/components/MyIcon";\n\n<MyIcon size={24} />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

const DARK = { background: "#2E0F70", borderRadius: 8, padding: "20px 28px", display: "flex", gap: 20, alignItems: "center", justifyContent: "center" } as const;

const EXAMPLES: Example[] = [
  {
    id: "states",
    title: "Estados",
    description: "Default, hover y active.",
    node: (
      <div style={DARK}>
        <MyIcon size={28} state="default" />
        <MyIcon size={28} state="hover" />
        <MyIcon size={28} state="active" />
      </div>
    ),
    code: `<MyIcon size={28} state="default" />\n<MyIcon size={28} state="hover" />\n<MyIcon size={28} state="active" />`,
  },
  {
    id: "sizes",
    title: "Tamaños",
    node: (
      <div style={DARK}>
        <MyIcon size={16} />
        <MyIcon size={24} />
        <MyIcon size={32} />
        <MyIcon size={40} />
      </div>
    ),
    code: `<MyIcon size={16} />\n<MyIcon size={24} />\n<MyIcon size={32} />\n<MyIcon size={40} />`,
  },
];

const API: PropRow[] = [
  { name: "size",  type: "number",                         default: "24", description: "Ancho y alto en px." },
  { name: "state", type: `"default" | "hover" | "active"`,               description: "Estado visual controlado." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function MyIconHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>MyIcon</h1>
      <p style={{ ...muted, fontSize: 16 }}>Descripción de una línea del componente.</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={140} code={`<MyIcon size={32} state="default" />`}>
          <div style={DARK}>
            <MyIcon size={32} state="default" />
            <MyIcon size={32} state="hover" />
            <MyIcon size={32} state="active" />
          </div>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="myicon" />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description && <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p>}
              <Preview code={ex.code} minHeight={130}>{ex.node}</Preview>
            </div>
          );
        })}
      </div>

      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>MyIcon.tsx</code> completo</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="MyIcon.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
```

## Ejemplo de entrada en REGISTRY

```tsx
// En app/components/page.tsx — al final de REGISTRY, antes de ];
{
  id: "myicon",
  name: "MyIcon",
  handoffPath: "/handoff/myicon",
  preview: (
    <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
      <MyIcon size={22} state="default" />
      <MyIcon size={22} state="hover" />
      <MyIcon size={22} state="active" />
    </div>
  ),
},
```
