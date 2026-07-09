# Skill: research-format

**Toma un documento técnico/de investigación en texto plano aplastado (todo en pocas líneas, sin saltos de párrafo) y lo reformatea en Markdown limpio, legible y renderizable: encabezados jerárquicos, párrafos, LaTeX en bloque, diagramas ASCII en fences, tablas GFM y código con lenguaje.**

Pensado para reportes largos exportados de otras herramientas (ChatGPT/Gemini/Notion/PDF→texto) que llegan como muros de texto: fórmulas pegadas al párrafo, tablas volcadas como una sola línea, diagramas sin fence, código inline. El resultado debe **conservar el 100% del contenido** — solo cambia el formato, nunca el significado.

---

## Activación

```
/research-format                 # reformatea el archivo abierto en el IDE (o RESEARCH.md por defecto)
/research-format DOC.md          # reformatea un archivo concreto
/research-format "pega aquí…"    # reformatea texto pegado y lo guarda en un .md
```

---

## Qué hace

1. **Lee** el documento fuente completo (archivo o texto pegado).
2. **Detecta la estructura latente**: título, secciones, subsecciones, listas, tablas, fórmulas, diagramas, bloques de código.
3. **Reescribe en Markdown** aplicando las reglas de abajo. No inventa ni resume contenido: refluye lo que ya está.
4. **Sobrescribe** el archivo (o crea `{slug}.md` si venía texto pegado).
5. **Reporta** un resumen corto de qué se estructuró (nº de secciones, tablas, fórmulas, diagramas).

---

## Reglas CRÍTICAS de formato

### Jerarquía y párrafos
- **Un solo `# H1`** con el título del documento. Si hay un subtítulo/lema, ponlo como `> blockquote` justo debajo.
- Secciones numeradas con `## 1.`, `## 2.`… y subsecciones `### 1.1`, `### 1.2`. Numera solo si el original lo insinúa; si no, deja los encabezados sin número.
- **Separa cada párrafo con una línea en blanco.** El error nº1 del texto aplastado es tener 5 párrafos en una línea — pártelos donde cambia la idea.
- Inserta `---` (regla horizontal) entre secciones de nivel `##` de temas distintos.

### Fórmulas (LaTeX)
- Fórmula que estaba embebida en medio de un párrafo → **sácala a su propio bloque** `$$ … $$` con línea en blanco antes y después.
- Variables sueltas dentro de la prosa se quedan inline con `$…$` (p. ej. "donde $\alpha$ es…").
- **No alteres el LaTeX**: mantén `\vec`, `\frac`, `\begin{bmatrix}`, subíndices `\text{...}`, etc. tal cual. Solo cambia dónde vive (bloque vs inline), no su contenido.
- Varias ecuaciones consecutivas del mismo desarrollo → un `$$` por línea, sin párrafos vacíos entre ellas si forman un sistema.

### Diagramas ASCII / arte de texto
- Todo diagrama (árboles, flujos, esquemas de rayos, jerarquías) va dentro de un fence ` ```text `.
- **Preserva el espaciado y la alineación exactos** — el arte ASCII se rompe si tocas los espacios. Cópialo carácter a carácter.
- Añade una línea en blanco tras el título del diagrama, dentro del fence, para separar rótulo de dibujo.

### Tablas
- Una tabla volcada como texto corrido (cabeceras y celdas pegadas) → **reconstruir como tabla GFM** `| col | col |` con la fila `|---|---|`.
- Pon en **negrita** la primera columna cuando es la etiqueta de fila (`**Consistencia de FPS**`).
- Acorta el texto de celda a lo esencial (quita muletillas) **sin perder el dato técnico**. Las celdas largas se leen fatal.
- Fórmulas dentro de celdas: usa inline `$…$`.

### Código
- Bloques de código con fence y **lenguaje explícito**: ` ```csharp `, ` ```ts `, ` ```tsx `, ` ```glsl `, ` ```python `…
- Reindenta a un estilo consistente (2 o 4 espacios) si venía colapsado o irregular.
- Marcadores de cita basura tipo `[cite: 48]` incrustados en el código → **elimínalos** (o pásalos a comentario si aportan). No deben quedar en medio de una sentencia.
- Identificadores de API/tipos/props mencionados en prosa → `código inline con backticks` (`RegionAttachment`, `drawOrder`, `Polygon2D`, `spine_01`).

### Listas
- Enumeraciones "1. … 2. …" aplastadas en un párrafo → lista ordenada real (una línea por ítem).
- Definiciones "Término: explicación; Otro término: …" → lista con **`- **Término:**` explicación**.
- Pasos de un procedimiento → lista **ordenada** (`1.`). Propiedades/opciones sin orden → lista con `-`.

### Énfasis
- Términos técnicos en otro idioma o jerga la primera vez → *cursiva* (`*overshooting*`, `*roughness*`, `*draw calls*`).
- Nombres de propiedades/modos de herramientas → **negrita** (`**Add Normals**`, `**Layered Blend Per Bone**`).

---

## Reglas de contenido (no negociables)

- **No resumas, no borres, no reordenes ideas.** Cada frase del original aparece en el resultado. Es un trabajo de *tipografía*, no de edición.
- **No traduzcas.** Conserva el idioma original del documento (normalmente español).
- **No cambies cifras, símbolos ni nombres propios** (Cook-Torrance, GGX, Fresnel-Schlick, Spine, Unreal, Godot…).
- Si algo es ambiguo (¿es tabla o lista?), elige la representación que mejor preserve la relación de datos y sigue — no preguntes por cada bloque.

---

## Checklist antes de guardar

- [ ] Un solo `# H1`; subtítulo como `>` si existe.
- [ ] Ningún párrafo pegado a otro (línea en blanco entre todos).
- [ ] Toda fórmula de desarrollo en `$$…$$`; variables en prosa en `$…$`.
- [ ] Todo diagrama ASCII en ` ```text ` con alineación intacta.
- [ ] Toda tabla es GFM válida con fila `|---|`.
- [ ] Todo código con lenguaje en el fence y sin marcadores `[cite: …]`.
- [ ] Pasos → lista ordenada; propiedades → viñetas.
- [ ] Contenido idéntico al original (solo cambió el formato).

---

## Ejemplo (antes → después)

**Antes** (aplastado):
```
Formulación matemática...La ecuación es:$$x(t)=...$$Donde x_0 es el valor inicial.Comparativa:Métrica A Nula B Absoluta...
```

**Después**:
```markdown
### Formulación matemática

La ecuación que describe la evolución del sistema es:

$$x(t) = x_{\text{target}} + (x_0 - x_{\text{target}}) \cdot e^{-\lambda t}$$

Donde $x_0$ es el valor inicial.

| Métrica | A | B |
|---|---|---|
| **Consistencia** | Nula | Absoluta |
```
