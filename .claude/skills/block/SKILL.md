# Skill: block
**Crea o registra un bloque de página en Concorde (Voyager DS).**
Un bloque es una composición de componentes que representa una pantalla completa o sección mayor de la app.

---

## Activación
```
/block NombreBloque                   # crea un bloque nuevo de cero
/block NombreBloque --mobile          # agrega variante mobile a un bloque existente
/block NombreBloque --register-only   # solo registra (ya tienes el .tsx)
```

---

## Arquitectura canónica — SIEMPRE esta estructura

```
src/blocks/{nombre}/
  desktop/
    {NombreBloque}.tsx          ← componente principal ("use client" si tiene estado)
    dimensions.ts               ← OBLIGATORIO: módulo plano, exporta WIDTH/HEIGHT
    {Sub}.tsx                   ← sub-componentes opcionales (BidChat, ConsoleHeader…)
  mobile/                       ← solo si existe versión mobile
    {NombreBloque}Mobile.tsx    ← componente mobile
    dimensions.ts               ← OBLIGATORIO cuando hay mobile: MOBILE_WIDTH/HEIGHT
  shared/                       ← solo si hay datos compartidos desktop↔mobile
    {archivo}.ts                ← e.g. pills.ts, liveData.ts (sin "use client")

app/blocks/{nombre}/
  page.tsx                      ← Server Component: readFileSync + RequiredComponents
  {NombreBloque}Viewer.tsx      ← "use client": SOLO si necesita estado propio (tabs,
                                   controles de efectos, colapso de sidebar…)
                                   Si el canvas es estático, meter todo en page.tsx.
```

### Por qué `dimensions.ts` es obligatorio

`dimensions.ts` es un módulo **plano** (sin `"use client"`). Eso permite que:
- Server Components lo importen sin cruzar la barrera cliente.
- Los cálculos de escala en los Viewers usen valores reales (no `undefined → NaN`).
- El catálogo `/blocks` puede leer las dimensiones en build time.

**Patrón en el componente:**
```ts
// desktop/dimensions.ts  — sin "use client"
export const NOMBRE_WIDTH  = 798;
export const NOMBRE_HEIGHT = 1104;

// desktop/NombreBloque.tsx
import { NOMBRE_WIDTH, NOMBRE_HEIGHT } from "./dimensions";
export { NOMBRE_WIDTH, NOMBRE_HEIGHT } from "./dimensions";   // re-export para compat
```

**Patrón en el Viewer:**
```ts
// Importar desde dimensions.ts, NO desde el componente
import NombreBloque from "@/src/blocks/nombre/desktop/NombreBloque";
import { NOMBRE_WIDTH, NOMBRE_HEIGHT } from "@/src/blocks/nombre/desktop/dimensions";
```

---

## PASO 1 — Crear el bloque (`src/blocks/`)

### 1.1 `desktop/dimensions.ts`
```ts
export const {NOMBRE}_WIDTH  = 0;   // reemplazar con valor real de Figma
export const {NOMBRE}_HEIGHT = 0;
```

### 1.2 `desktop/{NombreBloque}.tsx`
```tsx
"use client";   // solo si el bloque tiene estado propio

import type { JSX } from "react";
import { {NOMBRE}_WIDTH, {NOMBRE}_HEIGHT } from "./dimensions";
export { {NOMBRE}_WIDTH, {NOMBRE}_HEIGHT } from "./dimensions";

export interface {NombreBloque}Props {
  className?: string;
}

export default function {NombreBloque}({ className = "" }: {NombreBloque}Props): JSX.Element {
  return (
    <div
      className={className}
      data-block="{nombre}"
      style={{ width: {NOMBRE}_WIDTH, minHeight: {NOMBRE}_HEIGHT, background: "#ffffff" }}
    >
      {/* montar componentes aquí */}
    </div>
  );
}
```

### 1.3 `mobile/dimensions.ts` (si aplica)
```ts
export const {NOMBRE}_MOBILE_WIDTH  = 420;
export const {NOMBRE}_MOBILE_HEIGHT = 0;   // reemplazar
```

### 1.4 `shared/{archivo}.ts` (si aplica)
Datos puros compartidos entre desktop y mobile (sin "use client"):
```ts
export type {Nombre}Variant = "variante1" | "variante2";
export const {NOMBRE}_DATA = { ... };
```

---

## PASO 2 — Registrar en `app/blocks/{nombre}/`

### 2.1 `page.tsx` (Server Component)

```tsx
import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import {NombreBloque}Viewer from "./{NombreBloque}Viewer";

function readSrc(rel: string): string {
  try { return readFileSync(join(process.cwd(), rel), "utf8"); }
  catch { return `// No se pudo leer ${rel} en build.`; }
}

const REQUIRED: RequiredItem[] = [
  // { name: "ComponenteX", path: "/handoff/componentex", role: "para qué sirve aquí" },
];

const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/{nombre}/desktop/{NombreBloque}.tsx",  code: readSrc("src/blocks/{nombre}/desktop/{NombreBloque}.tsx") },
  { path: "src/blocks/{nombre}/desktop/dimensions.ts",       code: readSrc("src/blocks/{nombre}/desktop/dimensions.ts") },
  // mobile (si aplica):
  { path: "src/blocks/{nombre}/mobile/{NombreBloque}Mobile.tsx", code: readSrc("src/blocks/{nombre}/mobile/{NombreBloque}Mobile.tsx") },
  { path: "src/blocks/{nombre}/mobile/dimensions.ts",            code: readSrc("src/blocks/{nombre}/mobile/dimensions.ts") },
];

const USED_COMPONENTS = ["ComponenteA", "ComponenteB"];
const COMPONENT_FILES: BlockFile[] = USED_COMPONENTS.map(function toFile(name) {
  return { path: `src/components/${name}.tsx`, code: readSrc(`src/components/${name}.tsx`) };
});

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES];

export default function {NombreBloque}BlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)" }}>
      <Header active="blocks" />
      <{NombreBloque}Viewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
```

### 2.2 `{NombreBloque}Viewer.tsx` (Client — solo si hay estado)

```tsx
"use client";

import type { JSX } from "react";
import {NombreBloque} from "@/src/blocks/{nombre}/desktop/{NombreBloque}";
import { {NOMBRE}_WIDTH, {NOMBRE}_HEIGHT } from "@/src/blocks/{nombre}/desktop/dimensions";
// mobile (si aplica):
import {NombreBloque}Mobile from "@/src/blocks/{nombre}/mobile/{NombreBloque}Mobile";
import { {NOMBRE}_MOBILE_WIDTH, {NOMBRE}_MOBILE_HEIGHT } from "@/src/blocks/{nombre}/mobile/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

export default function {NombreBloque}Viewer({ files }: { files: BlockFile[] }): JSX.Element {
  const canvas = <{NombreBloque} />;

  return (
    <BlockViewer
      id="{nombre}"
      description="Descripción de una línea del bloque."
      width={{NOMBRE}_WIDTH}
      height={{NOMBRE}_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <{NombreBloque}Mobile />, width: {NOMBRE}_MOBILE_WIDTH, height: {NOMBRE}_MOBILE_HEIGHT } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
```

**Si el canvas es estático** (sin controles), saltar el Viewer e integrar `BlockViewer` directamente en `page.tsx` (ver Sidebar como ejemplo).

---

## PASO 3 — Registrar en el catálogo y navegación (bloque NUEVO)

### 3.1 `app/blocks/_components/blocks-nav.ts`
```ts
// Agregar al array BLOCKS_NAV:
{ id: "{nombre}", name: "{NombreBloque}" },
```

### 3.2 `app/blocks/page.tsx`
```tsx
// Agregar al array BLOCKS:
{
  id: "{nombre}",
  name: "{NombreBloque}",
  width: {NOMBRE}_WIDTH,
  height: {NOMBRE}_HEIGHT,
  node: <{NombreBloque} />,
},
```

### 3.3 Correr el CLI registry
```bash
node scripts/build-registry.mjs
# Verificar: git diff --stat public/r
```

---

## Checklist antes de hacer commit

- [ ] `src/blocks/{nombre}/desktop/dimensions.ts` existe (módulo plano, sin "use client")
- [ ] `src/blocks/{nombre}/mobile/dimensions.ts` existe (si hay mobile)
- [ ] Viewer importa dimensiones desde `dimensions.ts`, NO desde el componente
- [ ] `app/blocks/{nombre}/page.tsx` → `FILES` incluye bloque + dimensions.ts + todos sus componentes
- [ ] `app/blocks/{nombre}/page.tsx` → `REQUIRED` tiene un `RequiredItem` por componente
- [ ] `blocks-nav.ts` → entrada en `BLOCKS_NAV`
- [ ] `app/blocks/page.tsx` → entrada en `BLOCKS`
- [ ] Corrí `node scripts/build-registry.mjs` y `git diff --stat public/r` tiene sentido
- [ ] `npx tsc --noEmit` pasa sin errores

---

## Convenciones de nombres

| Bloque          | Carpeta           | Constante desktop       | Constante mobile            |
|-----------------|-------------------|-------------------------|-----------------------------|
| `Homepage`      | `homepage/`       | `HOMEPAGE_WIDTH/HEIGHT` | `HOMEPAGE_MOBILE_WIDTH/HEIGHT` |
| `Zona`          | `zona/`           | `ZONA_WIDTH/HEIGHT`     | `ZONA_MOBILE_WIDTH/HEIGHT`  |
| `MiBloque`      | `mi-bloque/`      | `MIBLOQUE_WIDTH/HEIGHT` | `MIBLOQUE_MOBILE_WIDTH/HEIGHT` |

Regla: `{NOMBRE_MAYUSCULAS}_{DIMENSION}` — sin guiones, sin espacios.

---

## Bloques con Sidebar (composición típica)

Los bloques que componen Sidebar + Header siguen el patrón de los Viewers de Homepage/Detalle/Zona:

```tsx
const COMBINED_WIDTH  = SIDEBAR_WIDTH + BLOQUE_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, HEADER_HEIGHT + BLOQUE_HEIGHT);
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const [collapsed, setCollapsed] = useState(false);
const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);
const scale = (fillW + 2) / BLOQUE_WIDTH;   // +2 = OVERSCAN px bajo el sidebar
const canvasH = Math.max(COMBINED_HEIGHT, (HEADER_HEIGHT + BLOQUE_HEIGHT) * scale);
```

Importar siempre las constantes del Sidebar desde su `dimensions.ts`:
```ts
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
```
