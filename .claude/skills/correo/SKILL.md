---
name: correo
description: Crea un correo nuevo (o un flujo de varios) en el catálogo /correos de Concorde, a partir de un Figma, captura o texto. Úsalo cuando pidan "haz un correo", "agrega el correo X", "nuevo flujo de correos" o invoquen /correo.
---

# Skill: correo

Agrega correos al catálogo `/correos`. Todo vive en **`src/emails/prodEmails.ts`**.

## Activación
```
/correo <descripción o nombre>        # ej: /correo recordatorio de pago, categoría Pagos
```
El usuario puede adjuntar un link de Figma, una captura o el copy en texto.

## Pasos

1. **Entender el contenido.** Si hay link de Figma, usar las tools de Figma
   (`get_screenshot` / `get_design_context`) para leer textos y estructura. Si hay
   captura, leerla. Si falta categoría o asunto, preguntar en una sola pregunta.

2. **Buscar un correo parecido** en `EMAILS` (`src/emails/prodEmails.ts`) y copiar
   su forma. Referencias:
   - solo texto + botón → los `calificacion-*`
   - datos / montos / vehículo → buscar `S('details'`, `S('amount'`, `S('vehicle'`
   - diseño que no encaja en secciones (hero con foto, cards propias) → campo
     `html` con HTML crudo, como el boletín MAF (`src/emails/boletines/`).

3. **Agregar el objeto al final de `EMAILS`:**
   ```ts
   {
     id: 'slug-unico',           // kebab-case, sin repetir
     name: 'Nombre en español',  // lo leen personas de negocio
     subject: 'Asunto',
     category: 'Categoría',
     stage: 'Paso del flujo',
     leadsTo: ['id-siguiente'],  // solo si es parte de un flujo
     sections: [ S('title', {...}), SP('24'), S('text', {...}), ... ],
   },
   ```
   - Tipos de sección válidos: `Section['type']` y `SECTION_LABELS` en
     `src/emails/prodEmailTemplates.ts`. Los campos de cada tipo: copiarlos de un
     correo existente que use ese tipo; no inventar campos.
   - Marcado inline en `text` (copiar el uso de correos vecinos): `__x__` negrita
     morada, `%%x%%` negrita que hereda el color, `**x**` énfasis,
     `((url|texto))` enlace, `{{variable.Ejem: valor}}` dato dinámico.
   - Espaciado con `SP('n')`, igual que los correos vecinos.

4. **Categoría nueva** → agregarla en `STAGE_ORDER`, `CATEGORY_GRADIENT` y
   `CATEGORY_SOLID` (mismo archivo). Si la categoría ya existe y el `stage` es
   nuevo, añadirlo a su lista en `STAGE_ORDER`.

5. **Referencia de Figma (opcional):** si el usuario la tiene, guardarla en
   `public/figma/correos/{id}.svg|png|html` (ver el README de esa carpeta).

6. **Pendiente (opcional):** si falta algo (URL, copy final), agregar el id en
   `PENDIENTES` de `src/emails/revisionStatus.ts` con una nota corta.

7. **Verificar:** `npx tsc --noEmit` sin errores, y pedir al usuario que abra
   `http://localhost:3000/correos/{id}` con `npm run dev` corriendo.

8. **Commit** solo si el usuario lo pide: `feat(correos): <nombre>`.

## No hacer
- No editar `prodEmailTemplates.ts` salvo que haga falta un tipo de sección
  nuevo (eso toca 4 sitios; ver comentario en la línea ~44 de ese archivo).
- No reordenar ni tocar correos existentes.
