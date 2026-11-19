"use client";

import { useSyncExternalStore } from "react";
import type { JSX } from "react";
import { SeasonChart } from "@/src/components/SeasonChart";

// Tabla «Momento óptimo de venta» de AVT, la misma que usa el resultado «Revela» de Mi Garaje.
const SELL_SEASONAL: Record<number, number> = { 1: 13.1, 2: 13.1, 3: 8.1, 4: 8.1, 5: 8.1, 6: -5.1, 7: -5.1, 8: 8.1, 9: 13.1, 10: 8.1, 11: -5.1, 12: -5.1 };
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const subscribe = () => () => {};

/** Demo: el mes actual se toma al abrir la página. */
export default function SeasonChartDemo(): JSX.Element | null {
  const now = useSyncExternalStore(subscribe, () => new Date().getMonth() + 1, () => 0);
  if (!now) return null;
  return <div style={{ width: "100%", maxWidth: 680, padding: 24, borderRadius: 16, background: "#fff", boxShadow: "0 0 0 1px #E1E3E2" }}>
    <SeasonChart months={MONTHS.map((name, i) => ({ m: i + 1, f: SELL_SEASONAL[i + 1], name }))} now={now} />
  </div>;
}
