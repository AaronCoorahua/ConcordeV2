"use client";

/**
 * Demo en vivo de ProgressBar — la barra sube sola de 0 a 100 y reinicia, para
 * mostrar la animación del relleno (transición de width). En producción el `value`
 * vendría de tu temporizador/estado de subasta.
 */

import { useEffect, useState } from "react";
import type { JSX } from "react";
import ProgressBar from "@/src/components/ProgressBar";

export default function ProgressBarDemo(): JSX.Element {
  const [value, setValue] = useState(0);

  useEffect(function tick() {
    const t = setInterval(function rise() {
      setValue(function next(v) {
        return v >= 100 ? 0 : Math.min(100, v + 4);
      });
    }, 500);
    return function cleanup() {
      clearInterval(t);
    };
  }, []);

  return (
    <div style={{ width: 360, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      <ProgressBar value={value} />
      <span style={{ fontSize: 12, color: "#71717a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", textAlign: "right" }}>
        {value}%
      </span>
    </div>
  );
}
