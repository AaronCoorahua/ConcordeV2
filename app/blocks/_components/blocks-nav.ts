/**
 * Lista de bloques para la barra de tabs del visor (estilo shadcn) y la lista.
 */

export interface BlockNavItem {
  id: string;
  name: string;
}

export const BLOCKS_NAV: BlockNavItem[] = [
  { id: "homepage", name: "Homepage" },
  { id: "detalle",  name: "Detalle" },
  { id: "zona",     name: "Zona" },
  { id: "login",    name: "Login" },
  { id: "register", name: "Register" },
  { id: "sala",     name: "Sala" },
  { id: "sidebar",  name: "Sidebar" },
];
