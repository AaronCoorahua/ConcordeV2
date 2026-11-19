"use client";

/**
 * FolderTabs — pestañas de carpeta de Mi Garaje (/blocks/mi-garaje/m/vmc · Mis negociaciones: «Compras» y «En venta»).
 * Es el TabSelector de Concorde con forma de carpeta: la elegida es una tarjeta blanca con borde lila arriba y a los lados,
 * unida a la lista de abajo; las demás van en gris sobre una línea. Un punto o un número entre paréntesis marca lo que
 * está sin abrir. StageTabs usa la misma forma (FOLDER_TABS_CSS).
 * Depende de React y TabSelector.
 */
import type { JSX } from "react";
import TabSelector from "@/src/components/TabSelector";

/** Forma de carpeta sobre las clases de TabSelector (ptabs). La comparten FolderTabs y StageTabs (.fs__split--stages). */
export const FOLDER_TABS_CSS = String.raw`
.fs__split { position:relative; display:grid; min-width:0; padding:0 0 12px; }
.fs__split::before { content:""; position:absolute; left:0; right:0; bottom:12px; height:1px; background:#DCD2FB; }
.fs__split .ptabs { position:relative; z-index:1; display:flex; align-items:flex-end; gap:2px; width:100%; min-width:0; box-sizing:border-box; height:auto; padding:0 4px; border:0; border-radius:0; background:none; overflow:hidden; }
.fs__split .ptabs__tab { flex:1 1 auto; width:auto; min-width:0; height:auto; min-height:40px; margin-bottom:0; padding:6px 8px; justify-content:center; text-align:center; border:1px solid transparent; border-bottom:0; border-radius:10px 10px 0 0;
  background:none; color:#6B6878; -webkit-text-fill-color:#6B6878; font-weight:600; white-space:nowrap; line-height:1.2; text-wrap-style:balance; }
.fs__split .ptabs__tab--active { flex:none; background:#fff; border-color:#DCD2FB; border-bottom:1px solid #fff; box-shadow:0 -3px 8px rgba(34,0,92,.05); color:#3B1782; -webkit-text-fill-color:#3B1782; font-weight:700; }
.fs__split .ptabs__tab:not(.ptabs__tab--active) { flex:1 1 0; }
.fs__split:not(.fs__split--stages) .ptabs__tab, .fs__split:not(.fs__split--stages) .ptabs__tab--active { flex:1 1 0; }
/* Con novedades sin abrir: en negrita (como en el lab; TabSelector de Concorde aún no lo trae). */
.fs__split .ptabs__tab--unread { font-weight:800 !important; letter-spacing:-0.012em; color:#2A075E; }
.fs__split .ptabs__tab:hover { opacity:1; }
`;

export interface FolderTabsProps {
  /** Textos de las pestañas, con su número entre paréntesis si lo hay (p. ej. «Compras», «En venta (1)»). */
  options: string[];
  /** Índice de la pestaña elegida. */
  value: number;
  /** Se llama con el índice de la pestaña tocada. */
  onChange: (index: number) => void;
  /** Pestañas con novedades sin abrir (van en negrita). */
  notificationIndices?: number[];
  /** Nombre accesible del grupo de pestañas. */
  "aria-label"?: string;
}

export function FolderTabs({ options, value, onChange, notificationIndices, "aria-label": ariaLabel }: FolderTabsProps): JSX.Element {
  return <>
    <style href="concorde-folder-tabs" precedence="default">{FOLDER_TABS_CSS}</style>
    <div className="fs__split"><TabSelector options={options} notificationIndices={notificationIndices} value={value} onChange={onChange} aria-label={ariaLabel} /></div>
  </>;
}

export default FolderTabs;
