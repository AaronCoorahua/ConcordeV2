/**
 * /api/tablero — pases, pesos y tarjetas propias del tablero /tablero.
 *
 * Igual que /api/polish: sin base de datos, UN archivo JSON (`polish/tablero.json`),
 * en Vercel Blob en producción y en `.datos-locales/` en local (app/api/almacen.ts).
 * El estado de los tickets de polish no está aquí, sigue en `polish/estados.json`.
 *
 * Cada POST trae UN cambio (ver `Op` en app/tablero/tableroData.ts). El servidor lee,
 * aplica ese cambio y escribe solo si nadie guardó en medio; si alguien lo hizo, vuelve
 * a leer y reintenta. Así dos personas moviendo cosas a la vez no se pisan.
 */

import { Conflicto, escribir, hayAlmacen, leer as leerArchivo } from "@/app/api/almacen";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import { aplicar, leerOp, limpiarDatos, TABLERO_VACIO, type TableroDatos } from "@/app/tablero/tableroData";

export const dynamic = "force-dynamic";

const ARCHIVO = "polish/tablero.json";
const INTENTOS = 4;

const SLUGS_POLISH = REPORT_ENTRIES.map(function aSlug(e) {
  return e.slug;
});

async function leer(): Promise<{ datos: TableroDatos; version?: string }> {
  const { texto, version } = await leerArchivo(ARCHIVO);
  return { datos: texto ? limpiarDatos(JSON.parse(texto)) : TABLERO_VACIO, version };
}

function mensaje(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export async function GET(): Promise<Response> {
  if (!hayAlmacen()) return Response.json({ compartido: false, datos: TABLERO_VACIO });
  try {
    const { datos } = await leer();
    return Response.json({ compartido: true, datos });
  } catch (e) {
    return Response.json({ compartido: false, datos: TABLERO_VACIO, error: mensaje(e) }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  const op = leerOp(
    await req.json().catch(function sinCuerpo() {
      return null;
    }),
  );
  if (!op) return Response.json({ ok: false, error: "cambio no válido" }, { status: 400 });
  if (!hayAlmacen()) return Response.json({ ok: false, error: "no hay almacén conectado" }, { status: 503 });

  try {
    for (let intento = 0; intento < INTENTOS; intento++) {
      const { datos, version } = await leer();
      const siguiente = aplicar(datos, op, SLUGS_POLISH);
      // El cambio ya no aplica (p. ej. el pase se borró): no hay nada que escribir.
      if (siguiente === datos) return Response.json({ ok: true, datos });
      try {
        await escribir(ARCHIVO, JSON.stringify(siguiente, null, 2), version);
        return Response.json({ ok: true, datos: siguiente });
      } catch (e) {
        if (e instanceof Conflicto) continue;
        throw e;
      }
    }
    return Response.json({ ok: false, error: "no se pudo guardar, intenta de nuevo" }, { status: 409 });
  } catch (e) {
    return Response.json({ ok: false, error: mensaje(e) }, { status: 500 });
  }
}
