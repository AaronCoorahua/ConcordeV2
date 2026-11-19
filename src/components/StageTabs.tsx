"use client";

/**
 * StageTabs — pestañas de etapas con contador de novedades (Mi Garaje, /blocks/mi-garaje/m/vmc: las 4 etapas de Mis
 * participaciones). Forma de carpeta, la misma de FolderTabs: la elegida es una tarjeta blanca unida a la lista y su fondo
 * (un único elemento de framer-motion) se desliza al cambiar. El número de novedades va entre paréntesis detrás del texto.
 * Depende de React, framer-motion, TabSelector (clases ptabs) y FolderTabs (forma de carpeta).
 */
import { useId } from "react";
import type { JSX } from "react";
import { motion } from "framer-motion";
import { TABSELECTOR_STYLES } from "@/src/components/TabSelector";
import { FOLDER_TABS_CSS } from "@/src/components/FolderTabs";

export const STAGE_TABS_CSS = String.raw`
.fs__split--stages::before { z-index:0; }
.fs__split--stages .ptabs { overflow:visible; cursor:default; -webkit-mask:none; mask:none; border-bottom-color:transparent; }
.fs__split--stages .ptabs__tab, .fs__split--stages .ptabs__tab:not(.ptabs__tab--active), .fs__split--stages .ptabs__tab--active { position:relative; isolation:isolate; display:inline-flex; align-items:center; flex-direction:row; flex-wrap:nowrap;
  flex:1 1 0; min-width:0; min-height:40px; padding:6px 4px; font-size:11px; gap:0 2px; }
.fs__split--stages .ptabs__tab--active { flex:1.35 1 0; z-index:2; overflow:visible; margin-bottom:0; background:#fff; border-color:transparent; border-bottom:1px solid #fff; box-shadow:none; }
.fs__split--stages .ptabs__tab--active::after { content:""; position:absolute; z-index:2; left:-1px; right:-1px; bottom:-2px; height:3px; background:#fff; pointer-events:none; }
.fs__split--stages .ptabs__tab > :not(.st__active-bg) { position:relative; z-index:1; }
/* Número entre paréntesis detrás del texto. */
.fs__split--stages .st__n { order:2; flex:none; display:inline; width:auto; height:auto; padding:0; border-radius:0; background:none; color:inherit; -webkit-text-fill-color:inherit; font-size:inherit; font-weight:inherit; line-height:inherit; }
.fs__split--stages .st__n::before { content:"("; } .fs__split--stages .st__n::after { content:")"; }
.fs__split--stages .st__t { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.fs__split--stages .ptabs__tab--active .st__t { overflow:visible; text-overflow:clip; }
/* Fondo de la elegida: la tarjeta blanca de la carpeta, un solo elemento que se desliza entre pestañas. */
.st__active-bg { position:absolute; inset:0 0 -1px; z-index:0; border:1px solid #DCD2FB; border-bottom-color:#fff; border-radius:10px 10px 0 0; background:#fff; box-shadow:0 -3px 8px rgba(34,0,92,.05); }
`;

export interface StageTabsProps {
  /** Nombres de las etapas, en el orden en que se muestran. */
  labels: string[];
  /** Novedades sin abrir por etapa (mismo orden que `labels`). Con 0 la pestaña va en peso normal y sin número. */
  counts: number[];
  /** Índice de la etapa elegida. */
  value: number;
  /** Se llama con el índice de la etapa tocada. */
  onChange: (index: number) => void;
  /** Nombre accesible del grupo de pestañas. */
  ariaLabel?: string;
  /** layoutId de framer-motion para el fondo de la activa (por defecto, uno propio de cada instancia). */
  layoutId?: string;
}

export function StageTabs({ labels, counts, value, onChange, ariaLabel = "Etapas", layoutId }: StageTabsProps): JSX.Element {
  const ownId = useId();
  const activeId = layoutId ?? `stage-tabs-${ownId}`;
  return <>
    <style href="concorde-tabselector" precedence="default">{TABSELECTOR_STYLES}</style>
    <style href="concorde-folder-tabs" precedence="default">{FOLDER_TABS_CSS}</style>
    <style href="concorde-stage-tabs" precedence="default">{STAGE_TABS_CSS}</style>
    <div className="fs__split fs__split--stages">
      <div className="ptabs" role="tablist" aria-label={ariaLabel}>
        {labels.map((label, i) => <button key={label} type="button" role="tab" aria-selected={value === i} className={`ptabs__tab${value === i ? " ptabs__tab--active" : ""}${counts[i] > 0 ? " ptabs__tab--unread" : " ptabs__tab--read"}`}
          style={{ viewTransitionName: `stage-${label.toLowerCase().replaceAll(" ", "-")}` }}
          onClick={() => onChange(i)}>
          {value === i ? <motion.span layoutId={activeId} className="st__active-bg" transition={{ type: "spring", stiffness: 420, damping: 34, mass: .7 }} /> : null}
          {counts[i] > 0 ? <span className="st__n">{counts[i]}</span> : null}<span className="st__t">{label}</span></button>)}
      </div>
    </div>
  </>;
}

export default StageTabs;
