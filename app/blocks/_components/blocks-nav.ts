/**
 * Lista de bloques para la barra de tabs del visor (estilo shadcn) y la lista.
 */

export interface BlockNavItem {
  id: string;
  name: string;
}

export const BLOCKS_NAV: BlockNavItem[] = [
  { id: "homepage", name: "Homepage" },
  { id: "detalle", name: "Detalle" },
  { id: "sala", name: "Sala" },
  { id: "sala-mobile", name: "Sala · Mobile" },
];
