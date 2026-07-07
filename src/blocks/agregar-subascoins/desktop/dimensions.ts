/**
 * Dimensiones del bloque Agregar Subascoins — módulo PLANO (sin "use client")
 * para que los Server Components (catálogo /blocks, página del bloque) puedan
 * importar estas constantes sin que se evalúen a undefined → NaN en los cálculos
 * de escala.
 *
 * Agregar Subascoins = Header (vault, 64) + área gris (placeholder) hasta 785 alto.
 */

export const AGREGARSUBASCOINS_WIDTH = 798;
// 64 (header) + 24 + [120 banner + 16 + 437 card + 16 + 100 help] + 24
export const AGREGARSUBASCOINS_HEIGHT = 801;
