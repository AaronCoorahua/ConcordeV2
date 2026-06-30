/**
 * Dimensiones del bloque Zona — módulo PLANO (sin "use client") para que los
 * Server Components (catálogo /blocks, página del bloque) puedan importar estas
 * constantes sin que se evalúen a undefined → NaN en los cálculos de escala.
 *
 * Zona = Header (vault, 64) + área blanca (24px arriba/abajo · 16px a los lados)
 * con una columna de 766 y gap 16:
 *   UserProfileCard (140) · 2 cards (221) · Secondary banner (100) ·
 *   OfferShelf Recomendados (352) · OfferShelf Me interesa (352) ·
 *   Centro de ayuda banner (100)
 */

export const ZONA_WIDTH = 798;
// 64 (header) + 24 + [140+16+221+16+100+16+352+16+352+16+100] + 24
export const ZONA_HEIGHT = 1457;
