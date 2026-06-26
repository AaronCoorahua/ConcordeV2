# Skill: publish
**Registra un componente O un bloque en todos los lugares donde debe aparecer.**
- **Componente** (`src/components/`): catálogo + handoff page. Sin esto el componente existe pero no aparece en ningún lado.
- **Bloque** (`src/blocks/`): visor `/code` + registry del CLI + lista de componentes que necesita. Úsalo también cuando **agregas un componente a un bloque ya existente** (p. ej. metiste un `Accordion` dentro de `Detalle`) — hay que actualizar los 3 sitios o el bloque se ve incompleto.

> Para componentes mira la sección **Qué hace**. Para bloques mira la sección **Bloques**.

---

## Activación
```
/publish NombreComponente      # componente
/publish TodayIcon
/publish MyButton

/publish bloque Detalle         # bloque (registrar o actualizar)
/publish bloque Homepage
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

---

# Bloques — registrar o actualizar un bloque

Un bloque vive en `src/blocks/{Bloque}/` y se compone de **uno o más archivos de bloque** + **los componentes de `src/components/` que usa** (importados con rutas relativas, ej. `import Accordion from "../../../components/Accordion"`).

Cuando creas un bloque, o cuando **metes un componente nuevo dentro de un bloque existente**, hay que tocar **3 sitios**. Si olvidas uno, el bloque se ve bien en pantalla pero queda incompleto en el catálogo, el `/code` o el CLI.

## El pipeline (los 3 sitios)

### 1. `/code` del bloque → `app/blocks/{id}/page.tsx`

El visor (`<BlockViewer files={FILES} />`) muestra una pestaña **Code** con un árbol de archivos. Ese árbol es el array `FILES`. **Todo componente que use el bloque debe estar en `FILES`** o no aparece su código.

- `readSrc(rel)` lee el source en build (`readFileSync` relativo a `process.cwd()`).
- Convención: agrupa por origen y concatena.

```tsx
// Archivos propios del bloque
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/detalle/desktop/Detalle.tsx", code: readSrc("src/blocks/detalle/desktop/Detalle.tsx") },
];

// Componentes que usa el bloque → aparecen bajo src/components/
const USED_COMPONENTS = ["AuctionStatus", "CardViewer", "Accordion", "CardTitle"];
const COMPONENT_FILES: BlockFile[] = USED_COMPONENTS.map(function toFile(name) {
  return { path: `src/components/${name}.tsx`, code: readSrc(`src/components/${name}.tsx`) };
});

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES];
```

- **Incluye las dependencias transitivas.** Si `Accordion` importa `CardTitle`, mete los dos en `USED_COMPONENTS`.
- **Extras de composición** (Sidebar, Header u otro bloque que solo se monta en el visor, no dentro del `.tsx` del bloque): agrégalos también a `FILES` con su propio grupo, ej. `SIDEBAR_FILES` / `HEADER_FILES` (incluye los íconos que esos bloques usan).

### 2. CLI / registry → `public/r/`

El CLI (`npx github:AaronCoorahua/ConcordeV2#cli add {id}`) baja `public/r/{id}.json`. **Esto se autogenera** con `scripts/build-registry.mjs` — un solo comando, no edites los JSON a mano:

```bash
node scripts/build-registry.mjs
# o con base de deploy:  node scripts/build-registry.mjs https://concorde-v2-theta.vercel.app
```

El generador lee `src/components/` (archivos planos `X.tsx`) y `src/blocks/` (recursivo: `desktop/`, `mobile/`, etc.), detecta los componentes que usa cada bloque por sus imports (alias `@/src/components/X` **o** relativos `../../../components/X`), e incluye el cierre transitivo (si `Accordion` importa `CardTitle`, entra solo). Emite:
- **`public/r/{id}.json`** → `files` con el bloque + cada componente que usa (con su `content` al día).
- **`public/r/registry.json`** → índice; la entrada del bloque lista en `components` los ids (minúscula) que usa.

Después de correrlo, **revisa el diff**: `git diff --stat public/r` — deben aparecer tu bloque y los componentes que agregaste, nada más raro.

### 3. Componentes que necesita → `RequiredComponents` en `app/blocks/{id}/page.tsx`

Bajo el visor, `<RequiredComponents items={REQUIRED} />` muestra las cards «este bloque se compone con N componentes». Cada componente nuevo necesita su `RequiredItem`:

```tsx
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";

const REQUIRED: RequiredItem[] = [
  { name: "AuctionStatus", path: "/handoff/auctionstatus", role: "Estado de la subasta (arriba a la izquierda)" },
  { name: "CardViewer",    path: "/handoff/cardviewer",    role: "Visor de imágenes + filmstrip" },
  { name: "Accordion",     path: "/handoff/accordion",     role: "Secciones colapsables (Información general, Condiciones…)" },
];

// …dentro del return, después de <BlockViewer/>:
<RequiredComponents items={REQUIRED} />
```

- `path` es el handoff del componente (`/handoff/{id}`, minúsculas). Si el componente aún no tiene handoff, primero corre `/publish {Componente}`.
- El `role` es una frase corta de para-qué-sirve dentro de ESTE bloque.

## Bloque NUEVO (además de los 3 pasos)

Si el bloque no existía, regístralo también en:
- **`app/blocks/{id}/page.tsx`** — crea la ruta del visor (copia la de otro bloque: `Header active="blocks"` + `<BlockViewer …/>` + `<RequiredComponents/>`).
- **`app/blocks/_components/blocks-nav.ts`** — agrega `{ id, name }` a `BLOCKS_NAV` (tabs del visor).
- **`app/blocks/page.tsx`** — agrega la `BlockEntry` `{ id, name, width, height, node }` al array `BLOCKS` (card del catálogo `/blocks`).
- El source del bloque va en `src/blocks/{Bloque}/desktop/` (y `mobile/` si aplica). Exporta sus dimensiones desde un módulo **plano** (`dimensions.ts`, sin `"use client"`) para que los Server Components puedan importarlas sin que den `NaN`.

## Checklist de bloque

- [ ] `app/blocks/{id}/page.tsx` → `FILES` incluye el bloque + **todos** sus componentes (y dependencias transitivas + extras de composición)
- [ ] `app/blocks/{id}/page.tsx` → `REQUIRED` tiene un `RequiredItem` por cada componente, y `<RequiredComponents items={REQUIRED}/>` está en el render
- [ ] Corrí `node scripts/build-registry.mjs` y revisé `git diff --stat public/r` (el bloque + sus componentes aparecen)
- [ ] Cada componente del bloque ya está publicado (tiene `/handoff/{id}`) — si no, `/publish {Componente}` primero
- [ ] (bloque nuevo) ruta + `BLOCKS_NAV` + `BLOCKS` del catálogo
- [ ] `npx tsc --noEmit` pasa
