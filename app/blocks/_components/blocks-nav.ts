/**
 * Lista de bloques para la barra de tabs del visor (estilo shadcn) y la lista.
 * Un bloque con `versions` muestra el selector de versiones; sus versiones anteriores no tienen tab propio.
 */

export interface BlockVersion {
  label: string;
  href: string;
  /** Nota corta junto a la versión (p. ej. «Homepage anterior»). */
  note?: string;
}

export interface BlockNavItem {
  id: string;
  name: string;
  /** Ruta del tab; por defecto /blocks/<id>. */
  href?: string;
  /** La primera es la actual. */
  versions?: BlockVersion[];
}

export const BLOCKS_NAV: BlockNavItem[] = [
  { id: "homepage", name: "Homepage", href: "/blocks/index", versions: [
    { label: "Actual", href: "/blocks/index" },
    { label: "Versión 1", href: "/blocks/homepage", note: "Homepage anterior" },
  ] },
  { id: "detalle", name: "Detalle", versions: [
    { label: "Actual", href: "/blocks/detalle" },
    { label: "Versión 1", href: "/blocks/detalle/v1", note: "Detalle anterior" },
  ] },
  { id: "mi-garaje", name: "Mi Garaje", versions: [
    { label: "Actual", href: "/blocks/mi-garaje" },
    { label: "Versión 1", href: "/blocks/zona", note: "Zona" },
  ] },
  { id: "valoriza", name: "Valoriza" },
  { id: "vendo-mis-cosas", name: "Vendo Mis Cosas" },
  { id: "agregar-subascoins", name: "Agregar Subascoins" },
  { id: "tu-perfil", name: "Tu Perfil" },
  { id: "login",    name: "Login" },
  { id: "register", name: "Register" },
  { id: "sala",     name: "Sala" },
  { id: "testsala", name: "Test Sala" },
  { id: "sidebar",  name: "Sidebar" },
];

export const blockHref = (b: BlockNavItem): string => b.href ?? `/blocks/${b.id}`;

/** Tab activo y versiones de la página: por la ruta si es una versión, si no por el id del bloque. */
export function findBlockNav(pathname: string | null, id: string): { item?: BlockNavItem; current?: BlockVersion } {
  for (const item of BLOCKS_NAV) {
    const current = item.versions?.find((v) => v.href === pathname);
    if (current) return { item, current };
  }
  return { item: BLOCKS_NAV.find((b) => b.id === id) };
}
