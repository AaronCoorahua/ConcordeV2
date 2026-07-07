/**
 * Dimensiones del bloque Tu Perfil — módulo PLANO (sin "use client") para que los
 * Server Components (catálogo /blocks, página del bloque) puedan importar estas
 * constantes sin que se evalúen a undefined → NaN en los cálculos de escala.
 *
 * Tu Perfil = Header (vault, 64) + área gris (placeholder) hasta 785 alto.
 */

export const TUPERFIL_WIDTH = 798;
// 64 (header) + 24 + [120 banner + 16 + (239 + 24 + 157 cards) + 16 + 48 logout + 16 + 100 help] + 24
export const TUPERFIL_HEIGHT = 848;
