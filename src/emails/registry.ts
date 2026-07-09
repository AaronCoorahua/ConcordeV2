/**
 * Registry de correos — SOLO para Server Components (usa node:fs).
 * Agrupa por tipología: cada grupo trae sus plantillas HTML estáticas
 * (banner header copiable + correo demo generado + plantillas reales de
 * src/emails/templates/*.html cuando existen).
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EMAIL_TIPOLOGIAS, type EmailTipologia } from "./tipologias";
import { buildEmailBanner, buildDemoEmail, wrapEmailPreview } from "./emailBanners";

export type EmailPlantillaKind = "banner" | "plantilla";

export interface EmailPlantilla {
  id: string;
  kind: EmailPlantillaKind;
  name: string;
  description: string;
  /** Documento HTML completo para previsualizar en un iframe */
  previewDoc: string;
  /** HTML que copia el botón: correo completo o bloque banner listo para pegar */
  copyHtml: string;
  /** Alto estimado del contenido (px) para dimensionar el iframe */
  previewHeight: number;
}

export interface EmailGroup {
  tipologia: EmailTipologia;
  plantillas: EmailPlantilla[];
}

function readTemplate(file: string): string {
  try {
    return readFileSync(join(process.cwd(), "src", "emails", "templates", file), "utf8");
  } catch {
    return `<!-- No se pudo leer ${file} -->`;
  }
}

/** Plantillas reales de producción, por tipología. */
const REALES: Record<string, EmailPlantilla[]> = {
  "en-vivo": [
    {
      id: "listo-para-participar",
      kind: "plantilla",
      name: "Listo para participar",
      description: "Confirmación de consignación: datos de la participación (fecha, vendedor, SubasCoins) + aviso de responsabilidad de conexión a sala.",
      previewDoc: readTemplate("listo-para-participar.html"),
      copyHtml: readTemplate("listo-para-participar.html"),
      previewHeight: 1300,
    },
    {
      id: "ganador-directo",
      kind: "plantilla",
      name: "Ganador Directo",
      description: "Resultado: el usuario ganó de forma directa — CTA a la zona de usuario para iniciar el proceso de compra + condiciones de incumplimiento.",
      previewDoc: readTemplate("ganador-directo.html"),
      copyHtml: readTemplate("ganador-directo.html"),
      previewHeight: 1230,
    },
  ],
};

export const EMAIL_GROUPS: EmailGroup[] = EMAIL_TIPOLOGIAS.map(function toGroup(t): EmailGroup {
  const banner = buildEmailBanner(t);
  const demo = buildDemoEmail(t);
  return {
    tipologia: t,
    plantillas: [
      {
        id: `${t.id}-banner`,
        kind: "banner",
        name: "Banner header",
        description: `Bloque hero email-safe de la tipología — pill «${t.pill}», band con gradiente del sistema y strip de acento de 4px. Pégalo como header de cualquier plantilla.`,
        previewDoc: wrapEmailPreview(banner, `Banner ${t.label}`),
        copyHtml: banner,
        previewHeight: 240,
      },
      {
        id: `${t.id}-demo`,
        kind: "plantilla",
        name: `Correo ${t.label}`,
        description: "Correo completo estático generado con el banner de la tipología: header hero + titular + cuerpo + CTA VAMOS + footer estándar VMC.",
        previewDoc: demo,
        copyHtml: demo,
        previewHeight: 900,
      },
      ...(REALES[t.id] ?? []),
    ],
  };
});

export function getEmailGroup(id: string): EmailGroup | undefined {
  return EMAIL_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}
