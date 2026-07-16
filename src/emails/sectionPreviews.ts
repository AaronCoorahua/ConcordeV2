/**
 * sectionPreviews — preview visual de cada tipo de sección del renderer de
 * producción, como documento HTML autocontenido para un iframe.
 *
 * Lo usan el catálogo /correos/secciones y la paleta del editor: en vez de una
 * lista de nombres, cada bloque se ve renderizado de verdad (con sus defaults
 * de createSection y assets demo donde el default está vacío).
 *
 * Módulo plano (sin "use client" ni node:fs).
 */

import { createSection, renderSection, SECTION_LABELS, type Section } from "./prodEmailTemplates";

export const SECTION_TYPES = Object.keys(SECTION_LABELS) as Array<Section["type"]>;

/** Descripción corta y llana de cada bloque (para cards y tooltips). */
export const SECTION_DESCRIPTIONS: Record<Section["type"], string> = {
  title: "Encabezado grande, con etiqueta pequeña opcional encima.",
  text: "Un párrafo de texto normal.",
  panel: "Tarjeta lavanda con ícono, título y texto.",
  features: "Tres columnas con ícono y texto corto.",
  "icon-text": "Emoji + título + descripción en una fila.",
  stats: "Tres números grandes con su etiqueta.",
  cta: "Botón de acción (naranja o teal).",
  image: "Imagen a lo ancho del correo.",
  spacer: "Espacio en blanco para separar bloques.",
  table: "Tabla simple de concepto → valor.",
  details: "Lista de datos etiqueta: valor.",
  divider: "Línea divisoria sutil.",
  note: "Aviso destacado con signo de exclamación.",
  amount: "Monto grande resaltado.",
  offers: "Grilla de 4 ofertas con foto.",
  vehicle: "Foto grande del vehículo con miniaturas.",
  negotiation: "Barra de ronda de negociación.",
  quote: "Tarjeta de propuesta + garantía.",
  "won-vehicle": "Banner de vehículo ganado con conteo.",
  costs: "Tres cajas con el desglose de costos.",
  list: "Lista con viñetas.",
  success: "Confirmación con check verde.",
  columns: "Dos columnas de texto lado a lado.",
};

/** Assets demo para que los previews no salgan vacíos. */
const DEMO_IMG = "https://concorde-v2-theta.vercel.app/demo/bronco.jpg";
const DEMO_ICON = "https://cdn.vmcsubastas.com/services/boletin/assets/icon-search.png";

/** Sección demo del tipo: defaults de producción + imágenes de muestra. */
export function demoSection(type: Section["type"]): Section {
  const s = createSection(type);
  const content = { ...s.content };
  Object.keys(content).forEach(function fill(k) {
    const empty = content[k] === "" || content[k] === "https://";
    if (!empty) return;
    if (/img|image|thumb/i.test(k)) content[k] = DEMO_IMG;
    if (/^i\d$/.test(k) && type === "features") content[k] = DEMO_ICON;
    if (/icon(Url)?$/i.test(k) && k !== "icon") content[k] = DEMO_ICON;
  });
  if (type === "image") content.url = DEMO_IMG;
  return { ...s, content };
}

/** Documento HTML completo con SOLO esa sección, para previsualizar en iframe. */
export function sectionPreviewDoc(type: Section["type"]): string {
  const rows = renderSection(demoSection(type));
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;background-color:#FAFAFA;">
<table border="0" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF" style="padding:14px 20px;"><tbody>
${rows}
</tbody></table>
</body></html>`;
}
