import type { JSX } from "react";
import { Suspense } from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import BannerLab from "./BannerLab";
import CorreoNav from "./CorreoNav";
import { EMAIL_GROUPS, getEmailReal, vecinosDe, type EmailGroup } from "@/src/emails/registry";

/**
 * /correos/[id] — detalle de UN correo real de producción: preview completo a
 * tamaño real, asunto y «Copiar HTML».
 *
 * El header del correo es intercambiable (BannerLab): un tab elige la tipología
 * de banner y otro el fondo; el botón copia la combinación activa.
 *
 * Para REVISAR se recorren los 45 correos uno tras otro, así que la página trae
 * navegación «anterior / siguiente» (CorreoNav) en el orden del catálogo, y el
 * estado de revisión con su nota junto a la referencia de Figma. NO se enlazan los
 * correos del flujo (`leadsTo`): el recorrido de revisión es la lista, y esos
 * enlaces confundían sobre por dónde se iba.
 */

/** Dónde viven los SVG de Figma (ver public/figma/correos/README.md). */
const FIGMA_DIR = path.join(process.cwd(), "public", "figma", "correos");

/**
 * Ruta pública de la referencia de Figma de un correo, o null si aún no se ha
 * exportado. Se resuelve en el servidor (el cliente no puede mirar el disco);
 * `.svg` gana sobre `.png` cuando existen ambos.
 */
function figmaRefFor(id: string): string | null {
  for (const ext of ["svg", "png"]) {
    if (existsSync(path.join(FIGMA_DIR, `${id}.${ext}`))) return `/figma/correos/${id}.${ext}`;
  }
  return null;
}

export function generateStaticParams(): Array<{ id: string }> {
  return EMAIL_GROUPS.flatMap(function toParams(g) {
    return g.correos.map(function toParam(c) { return { id: c.id }; });
  });
}

/** El grupo (categoría) al que pertenece un correo, para su gradiente. */
function groupOf(correoId: string): EmailGroup | undefined {
  return EMAIL_GROUPS.find(function contains(g) {
    return g.correos.some(function byId(c) { return c.id === correoId; });
  });
}

export default async function CorreoPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const correo = getEmailReal(id);
  if (!correo) notFound();

  const group = groupOf(correo.id);
  const vecinos = vecinosDe(correo.id);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <Link
          href="/correos/variantes"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ui-body)", textDecoration: "none", marginBottom: 14 }}
        >
          <span aria-hidden="true">←</span> Todos los correos
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ui-ink)", margin: 0 }}>{correo.name}</h1>
          {/* Categoría y paso en texto llano, no en pill: con 15 categorías de
              colores, las pills convertían la página en un mosaico. */}
          {group && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ui-muted)" }}>
              {group.label}
              {correo.stage ? ` · ${correo.stage}` : ""}
            </span>
          )}
        </div>

        <div style={{ margin: "0 0 24px", display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ui-muted)", letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0 }}>Asunto</span>
          <span style={{ fontSize: 13, color: "var(--ui-ink)", fontWeight: 600 }}>{correo.subject}</span>
        </div>

        <Suspense fallback={<div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ui-muted)", fontSize: 13 }}>Cargando preview…</div>}>
          <BannerLab
            html={correo.html}
            title={correo.name}
            subject={correo.subject}
            categoria={group?.label ?? "General"}
            figmaSrc={figmaRefFor(correo.id)}
            figmaFileName={`${correo.id}.svg`}
            estado={correo.estado}
            nota={correo.nota}
            // El recorrido va DENTRO del Lab, bajo el campo «Título del banner»:
            // ahí queda pegado al preview que se está revisando, que es lo que se
            // mira justo antes de pasar al siguiente correo.
            nav={
              /* El `key` NO es decorativo: al cruzar de Server a Client Component,
                 este elemento viaja serializado y React lo reconcilia como hijo de
                 lista — sin key avisa de «unique key prop». El id del correo además
                 fuerza el remontaje al navegar, que es justo lo que se quiere. */
              <CorreoNav
                key={correo.id}
                anteriorId={vecinos.anterior?.id ?? null}
                anteriorNombre={vecinos.anterior?.name ?? null}
                siguienteId={vecinos.siguiente?.id ?? null}
                siguienteNombre={vecinos.siguiente?.name ?? null}
                posicion={vecinos.posicion}
                total={vecinos.total}
              />
            }
          />
        </Suspense>

      </main>
    </div>
  );
}
