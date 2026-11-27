/**
 * tableroData.ts — el modelo del tablero /tablero y la única función que lo cambia.
 *
 * Módulo plano (sin "use client"): lo usan la página, el tablero (cliente) y la ruta
 * /api/tablero. El cliente y el servidor aplican el MISMO cambio con `aplicar`, así lo
 * que se ve al instante es lo que queda guardado.
 *
 * Qué hay en el tablero:
 *  - Pases: bolsitas con lo que sale junto a producción, con fecha.
 *  - Tarjetas: los tickets de /polish (vienen de app/reporte/reportData.ts) y las
 *    tarjetas propias que se crean aquí: quick wins e ideas forward.
 *  - De cada tarjeta se guarda un ajuste: peso, en qué pase va y quién la tiene. El estado de un ticket de polish NO vive aquí: sigue en /api/polish,
 *    para que este tablero y /polish digan siempre lo mismo.
 */

import { isPolishStatus, type PolishStatus } from "@/app/polish/polishData";

/** Esfuerzo que le cuesta a dev: 1 es poco, 3 es mucho. */
export type Peso = 1 | 2 | 3;

export const PESOS: Peso[] = [1, 2, 3];

export interface Pase {
  id: string;
  nombre: string;
  /** Día en que sale, AAAA-MM-DD. Vacío si todavía no tiene fecha. */
  fecha: string;
  /** Ya salió a producción. */
  salio: boolean;
}

export interface Ajuste {
  peso?: Peso;
  /** Id del pase en el que va. Sin pase y sin forward, está entre los pedidos. */
  pase?: string;
  /** Idea para más adelante, sin fecha. */
  forward?: boolean;
  /** Quién la tiene. */
  quien?: string;
  /** Solo en tarjetas propias (ver el comentario de arriba). */
  status?: PolishStatus;
}

/** Tarjeta creada en el tablero, no en el código. */
export interface Propia {
  id: string;
  titulo: string;
  /** AAAA-MM-DD */
  creada: string;
}

export interface TableroDatos {
  pases: Pase[];
  ajustes: Record<string, Ajuste>;
  propias: Propia[];
  /** Ids de tarjetas en el orden en que la gente las dejó. Dentro de una lista (un pase
   *  o una columna) manda este orden; una tarjeta que nadie movió va al final. */
  orden: string[];
}

export const TABLERO_VACIO: TableroDatos = { pases: [], ajustes: {}, propias: [], orden: [] };

export type Op =
  | {
      op: "ajustar";
      id: string;
      /** `null` quita el valor. */
      cambios: { peso?: Peso | null; pase?: string | null; forward?: boolean; quien?: string | null; status?: PolishStatus };
    }
  | { op: "crear-pase"; pase: Pase }
  | { op: "editar-pase"; id: string; cambios: { nombre?: string; fecha?: string; salio?: boolean } }
  | { op: "borrar-pase"; id: string }
  | { op: "crear-tarjeta"; tarjeta: Propia; ajuste: Ajuste }
  | { op: "editar-tarjeta"; id: string; titulo: string }
  | { op: "borrar-tarjeta"; id: string }
  /** Las tarjetas de UNA lista, en su orden nuevo. */
  | { op: "ordenar"; ids: string[] };

const MAX_TITULO = 120;
const MAX_NOMBRE = 60;
const MAX_PERSONA = 30;
const MAX_ORDEN = 400;
const ID = /^[a-z0-9][a-z0-9-]{2,39}$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export function nuevoId(prefijo: "pase" | "t"): string {
  return `${prefijo}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function esObjeto(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function texto(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const limpio = v.replace(/\s+/g, " ").trim().slice(0, max);
  return limpio ? limpio : null;
}

function esId(v: unknown): v is string {
  return typeof v === "string" && ID.test(v);
}

function esPeso(v: unknown): v is Peso {
  return v === 1 || v === 2 || v === 3;
}

function fecha(v: unknown): string | null {
  if (v === "") return "";
  return typeof v === "string" && FECHA.test(v) ? v : null;
}

function leerPase(v: unknown): Pase | null {
  if (!esObjeto(v) || !esId(v.id)) return null;
  const nombre = texto(v.nombre, MAX_NOMBRE);
  if (!nombre) return null;
  return { id: v.id, nombre, fecha: fecha(v.fecha) ?? "", salio: v.salio === true };
}

function leerPropia(v: unknown): Propia | null {
  if (!esObjeto(v) || !esId(v.id)) return null;
  const titulo = texto(v.titulo, MAX_TITULO);
  if (!titulo) return null;
  return { id: v.id, titulo, creada: fecha(v.creada) || "" };
}

function leerAjuste(v: unknown): Ajuste {
  const ajuste: Ajuste = {};
  if (!esObjeto(v)) return ajuste;
  if (esPeso(v.peso)) ajuste.peso = v.peso;
  if (esId(v.pase)) ajuste.pase = v.pase;
  if (v.forward === true) ajuste.forward = true;
  const quien = texto(v.quien, MAX_PERSONA);
  if (quien) ajuste.quien = quien;
  if (isPolishStatus(v.status)) ajuste.status = v.status;
  return ajuste;
}

/** Lo que llega del almacén o del navegador: se queda solo lo que tiene forma válida. */
export function limpiarDatos(crudo: unknown): TableroDatos {
  const datos: TableroDatos = { pases: [], ajustes: {}, propias: [], orden: [] };
  if (!esObjeto(crudo)) return datos;
  if (Array.isArray(crudo.orden)) datos.orden = [...new Set(crudo.orden.filter(esId))].slice(0, MAX_ORDEN);
  if (Array.isArray(crudo.pases)) {
    for (const p of crudo.pases) {
      const pase = leerPase(p);
      if (pase) datos.pases.push(pase);
    }
  }
  if (Array.isArray(crudo.propias)) {
    for (const t of crudo.propias) {
      const propia = leerPropia(t);
      if (propia) datos.propias.push(propia);
    }
  }
  if (esObjeto(crudo.ajustes)) {
    for (const [id, a] of Object.entries(crudo.ajustes)) {
      if (!esId(id)) continue;
      const ajuste = leerAjuste(a);
      if (Object.keys(ajuste).length > 0) datos.ajustes[id] = ajuste;
    }
  }
  return datos;
}

/** Valida un cambio que llega por la red. `null` si no tiene forma de cambio. */
export function leerOp(crudo: unknown): Op | null {
  if (!esObjeto(crudo)) return null;
  switch (crudo.op) {
    case "ajustar": {
      if (!esId(crudo.id) || !esObjeto(crudo.cambios)) return null;
      const c = crudo.cambios;
      const cambios: Extract<Op, { op: "ajustar" }>["cambios"] = {};
      if (c.peso === null || esPeso(c.peso)) cambios.peso = c.peso;
      if (c.pase === null || esId(c.pase)) cambios.pase = c.pase;
      if (typeof c.forward === "boolean") cambios.forward = c.forward;
      if (c.quien === null) cambios.quien = null;
      else if (c.quien !== undefined) {
        const quien = texto(c.quien, MAX_PERSONA);
        if (!quien) return null;
        cambios.quien = quien;
      }
      if (isPolishStatus(c.status)) cambios.status = c.status;
      return Object.keys(cambios).length > 0 ? { op: "ajustar", id: crudo.id, cambios } : null;
    }
    case "crear-pase": {
      const pase = leerPase(crudo.pase);
      return pase ? { op: "crear-pase", pase: { ...pase, salio: false } } : null;
    }
    case "editar-pase": {
      if (!esId(crudo.id) || !esObjeto(crudo.cambios)) return null;
      const c = crudo.cambios;
      const cambios: Extract<Op, { op: "editar-pase" }>["cambios"] = {};
      const nombre = texto(c.nombre, MAX_NOMBRE);
      if (nombre) cambios.nombre = nombre;
      const dia = fecha(c.fecha);
      if (dia !== null) cambios.fecha = dia;
      if (typeof c.salio === "boolean") cambios.salio = c.salio;
      return Object.keys(cambios).length > 0 ? { op: "editar-pase", id: crudo.id, cambios } : null;
    }
    case "borrar-pase":
      return esId(crudo.id) ? { op: "borrar-pase", id: crudo.id } : null;
    case "crear-tarjeta": {
      const tarjeta = leerPropia(crudo.tarjeta);
      return tarjeta ? { op: "crear-tarjeta", tarjeta, ajuste: leerAjuste(crudo.ajuste) } : null;
    }
    case "editar-tarjeta": {
      const titulo = texto(crudo.titulo, MAX_TITULO);
      return esId(crudo.id) && titulo ? { op: "editar-tarjeta", id: crudo.id, titulo } : null;
    }
    case "borrar-tarjeta":
      return esId(crudo.id) ? { op: "borrar-tarjeta", id: crudo.id } : null;
    case "ordenar": {
      if (!Array.isArray(crudo.ids) || crudo.ids.length === 0 || crudo.ids.length > MAX_ORDEN) return null;
      const ids = [...new Set(crudo.ids.filter(esId))];
      return ids.length === crudo.ids.length ? { op: "ordenar", ids } : null;
    }
    default:
      return null;
  }
}

/**
 * Aplica un cambio y devuelve el tablero nuevo (no modifica el que recibe).
 * `slugsPolish` son los tickets que vienen del código: se pueden ajustar, pero no
 * borrar ni renombrar, y su estado no se guarda aquí. Un cambio que no aplica
 * (tarjeta o pase que ya no existe) devuelve el mismo tablero.
 */
export function aplicar(datos: TableroDatos, op: Op, slugsPolish: readonly string[]): TableroDatos {
  const esPolish = slugsPolish.includes("id" in op ? op.id : "");
  const esPropia = (id: string): boolean => datos.propias.some((t) => t.id === id);
  const hayPase = (id: string): boolean => datos.pases.some((p) => p.id === id);

  switch (op.op) {
    case "ajustar": {
      if (!esPolish && !esPropia(op.id)) return datos;
      const ajuste: Ajuste = { ...datos.ajustes[op.id] };
      const c = op.cambios;
      if (c.peso === null) delete ajuste.peso;
      else if (c.peso !== undefined) ajuste.peso = c.peso;
      // Una tarjeta está en UN sitio: un pase, forward o los pedidos sin pase.
      if (c.pase === null) delete ajuste.pase;
      else if (c.pase !== undefined && hayPase(c.pase)) {
        ajuste.pase = c.pase;
        delete ajuste.forward;
      }
      if (c.forward === false) delete ajuste.forward;
      else if (c.forward === true) {
        ajuste.forward = true;
        delete ajuste.pase;
      }
      if (c.quien === null) delete ajuste.quien;
      else if (c.quien !== undefined) ajuste.quien = c.quien;
      if (c.status !== undefined && !esPolish) ajuste.status = c.status;
      return { ...datos, ajustes: { ...datos.ajustes, [op.id]: ajuste } };
    }
    case "crear-pase":
      if (hayPase(op.pase.id)) return datos;
      return { ...datos, pases: [...datos.pases, op.pase] };
    case "editar-pase":
      if (!hayPase(op.id)) return datos;
      return { ...datos, pases: datos.pases.map((p) => (p.id === op.id ? { ...p, ...op.cambios } : p)) };
    case "borrar-pase": {
      if (!hayPase(op.id)) return datos;
      // Lo que iba en el pase vuelve a los pedidos.
      const ajustes: Record<string, Ajuste> = {};
      for (const [id, a] of Object.entries(datos.ajustes)) {
        if (a.pase !== op.id) ajustes[id] = a;
        else {
          const { pase: _fuera, ...resto } = a;
          void _fuera;
          ajustes[id] = resto;
        }
      }
      return { ...datos, pases: datos.pases.filter((p) => p.id !== op.id), ajustes };
    }
    case "crear-tarjeta": {
      const id = op.tarjeta.id;
      if (esPropia(id) || slugsPolish.includes(id)) return datos;
      const ajuste: Ajuste = { ...op.ajuste };
      if (ajuste.pase && !hayPase(ajuste.pase)) delete ajuste.pase;
      return { ...datos, propias: [op.tarjeta, ...datos.propias], ajustes: { ...datos.ajustes, [id]: ajuste } };
    }
    case "editar-tarjeta":
      if (!esPropia(op.id)) return datos;
      return { ...datos, propias: datos.propias.map((t) => (t.id === op.id ? { ...t, titulo: op.titulo } : t)) };
    case "borrar-tarjeta": {
      if (!esPropia(op.id)) return datos;
      const { [op.id]: _fuera, ...ajustes } = datos.ajustes;
      void _fuera;
      return { ...datos, propias: datos.propias.filter((t) => t.id !== op.id), ajustes, orden: datos.orden.filter((id) => id !== op.id) };
    }
    case "ordenar": {
      // Solo importa el orden entre las tarjetas de esa lista: van juntas al final, ya ordenadas.
      const ids = op.ids.filter((id) => slugsPolish.includes(id) || esPropia(id));
      if (ids.length === 0) return datos;
      return { ...datos, orden: [...datos.orden.filter((id) => !ids.includes(id)), ...ids] };
    }
  }
}

/** Quién está usando el tablero. No hay login: la primera vez que alguien toma una
 *  tarjeta escribe su nombre, y se recuerda en su navegador. */
export interface Yo {
  nombre: string;
}

export function leerYo(crudo: string): Yo | null {
  try {
    const v: unknown = JSON.parse(crudo || "null");
    if (!esObjeto(v)) return null;
    const nombre = texto(v.nombre, MAX_PERSONA);
    return nombre ? { nombre } : null;
  } catch {
    return null;
  }
}

/** Una tarjeta ya resuelta para pintar: ticket de polish o propia, con su ajuste encima. */
export interface Tarjeta {
  id: string;
  titulo: string;
  /** Pantalla o componente (solo tickets de polish). */
  area?: string;
  esPolish: boolean;
  preview?: string;
  status: PolishStatus;
  peso?: Peso;
  pase?: string;
  forward: boolean;
  quien?: string;
}

/** Peso que cuenta en la barra de un pase: lo que aún no tiene peso cuenta como 1. */
export function pesoDe(t: Tarjeta): number {
  return t.peso ?? 1;
}

export function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  const letras = partes.length > 1 ? partes[0][0] + partes[1][0] : nombre.trim().slice(0, 2);
  return letras.toUpperCase();
}

/** "2026-12-04" → "vie 4 dic". Se arma a mano para que no dependa de la zona horaria. */
export function fechaCorta(dia: string): string {
  const [a, m, d] = dia.split("-").map(Number);
  const dias = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const fechaLocal = new Date(a, m - 1, d);
  return `${dias[fechaLocal.getDay()]} ${d} ${meses[m - 1]}`;
}

/** Días que faltan para `dia` contando desde hoy (negativo si ya pasó). */
export function diasHasta(dia: string, hoy: Date): number {
  const [a, m, d] = dia.split("-").map(Number);
  const destino = new Date(a, m - 1, d).getTime();
  const base = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();
  return Math.round((destino - base) / 86_400_000);
}

export function hoyIso(hoy: Date): string {
  const dosCifras = (n: number): string => String(n).padStart(2, "0");
  return `${hoy.getFullYear()}-${dosCifras(hoy.getMonth() + 1)}-${dosCifras(hoy.getDate())}`;
}
