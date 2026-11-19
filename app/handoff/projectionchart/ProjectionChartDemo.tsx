"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { JSX } from "react";
import { ProjectionChart, type ProjectionPoint } from "@/src/components/ProjectionChart";
import { projectForward } from "@/src/blocks/mi-garaje/desktop/avt/engine";

const subscribe = () => () => {};

/** Demo: la proyección de AVT del Toyota Corolla 2019 de ejemplo de Valorizar (US$ 15,010 · categoría B · 45,000 km).
 *  Se calcula al abrir la página: depende de la fecha de hoy. */
export default function ProjectionChartDemo(): JSX.Element | null {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false); // en el servidor no hay fecha de hoy fija
  const points = useMemo<ProjectionPoint[] | null>(() => mounted
    ? (projectForward(15010, "B", 12, 45000) as { value: number; km: number; label: string | null }[]).map((p) => ({ v: p.value, km: p.km, label: p.label })) : null, [mounted]);
  if (!points) return null;
  return <div style={{ width: "100%", maxWidth: 680, padding: 24, borderRadius: 16, background: "#fff", boxShadow: "0 0 0 1px #E1E3E2" }}>
    <ProjectionChart market={15010} points={points} />
  </div>;
}
