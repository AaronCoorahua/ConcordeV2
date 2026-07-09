/**
 * Registry de correos — SOLO para Server Components (usa node:fs).
 * Une las plantillas completas (src/emails/templates/*.html) con los
 * banners por tipología generados por buildEmailBanner().
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EMAIL_TIPOLOGIAS } from "./tipologias";
import { buildEmailBanner, wrapEmailPreview } from "./emailBanners";

export type EmailEntryKind = "plantilla" | "banner";

export interface EmailEntry {
  id: string;
  kind: EmailEntryKind;
  name: string;
  tipologiaId: string;
  description: string;
  /** Documento HTML completo para previsualizar en un iframe */
  previewDoc: string;
  /** HTML que copia el botón: plantilla completa o bloque banner listo para pegar */
  copyHtml: string;
  /** Alto estimado del contenido (px) para dimensionar el iframe */
  previewHeight: number;
}

function readTemplate(file: string): string {
  try {
    return readFileSync(join(process.cwd(), "src", "emails", "templates", file), "utf8");
  } catch {
    return `<!-- No se pudo leer ${file} -->`;
  }
}

const PLANTILLAS: EmailEntry[] = [
  {
    id: "listo-para-participar",
    kind: "plantilla",
    name: "Listo para participar",
    tipologiaId: "en-vivo",
    description: "Confirmación de consignación: datos de la participación (fecha, vendedor, SubasCoins) + aviso de responsabilidad de conexión a sala.",
    previewDoc: readTemplate("listo-para-participar.html"),
    copyHtml: readTemplate("listo-para-participar.html"),
    previewHeight: 1300,
  },
  {
    id: "ganador-directo",
    kind: "plantilla",
    name: "Ganador Directo",
    tipologiaId: "en-vivo",
    description: "Resultado: el usuario ganó de forma directa — CTA a la zona de usuario para iniciar el proceso de compra + condiciones de incumplimiento.",
    previewDoc: readTemplate("ganador-directo.html"),
    copyHtml: readTemplate("ganador-directo.html"),
    previewHeight: 1230,
  },
];

const BANNERS: EmailEntry[] = EMAIL_TIPOLOGIAS.map(function toEntry(t): EmailEntry {
  const block = buildEmailBanner(t);
  return {
    id: `banner-${t.id}`,
    kind: "banner",
    name: `Banner ${t.label}`,
    tipologiaId: t.id,
    description: `Header hero email-safe para la tipología ${t.label} — pill «${t.pill}», band con gradiente del sistema y strip de acento de 4px. Pega el bloque como header de la plantilla.`,
    previewDoc: wrapEmailPreview(block, `Banner ${t.label}`),
    copyHtml: block,
    previewHeight: 240,
  };
});

export const EMAIL_ENTRIES: EmailEntry[] = [...PLANTILLAS, ...BANNERS];

export function getEmailEntry(id: string): EmailEntry | undefined {
  return EMAIL_ENTRIES.find(function byId(e) { return e.id === id; });
}
