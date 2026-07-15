"use client";

/**
 * FlowDiagram — diagrama del flujo de una categoría: columnas por paso
 * (STAGE_ORDER) con un chip por correo y flechas curvas entre los correos que
 * derivan (`leadsTo`). Portado del catálogo de Concorde-Email (HomeFlowDiagram)
 * con la paleta de Concorde.
 *
 * Las flechas se calculan midiendo los chips reales en el DOM (useLayoutEffect
 * + resize), así el SVG sigue al layout sin hardcodear posiciones.
 */

import { useLayoutEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { STAGE_ORDER, CATEGORY_SOLID, type EmailTemplate } from "@/src/emails/prodEmails";

const INK = "#0f172a";
const DIVIDER = "#e2e8f0";

interface Line {
  fromId: string;
  toId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface FlowDiagramProps {
  category: string;
  emails: EmailTemplate[];
  activeStage: string | null;
  onSelectStage: (stage: string | null) => void;
}

export function FlowDiagram({ category, emails, activeStage, onSelectStage }: FlowDiagramProps): JSX.Element | null {
  const stages = (STAGE_ORDER[category] ?? []).filter(function hasEmails(stage) {
    return emails.some(function inStage(e) { return e.stage === stage; });
  });
  const accent = CATEGORY_SOLID[category] ?? INK;
  const markerId = `flow-arrow-${category.replace(/\s+/g, "-")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useLayoutEffect(function measure() {
    const container = containerRef.current;
    if (!container) return;

    function compute(): void {
      if (!container) return;
      const containerBox = container.getBoundingClientRect();
      const next: Line[] = [];
      emails.forEach(function eachEmail(email) {
        const fromEl = chipRefs.current[email.id];
        if (!fromEl || !email.leadsTo) return;
        const fromBox = fromEl.getBoundingClientRect();
        email.leadsTo.forEach(function eachTarget(toId) {
          const toEl = chipRefs.current[toId];
          if (!toEl) return;
          const toBox = toEl.getBoundingClientRect();
          next.push({
            fromId: email.id,
            toId,
            x1: fromBox.right - containerBox.left,
            y1: fromBox.top + fromBox.height / 2 - containerBox.top,
            x2: toBox.left - containerBox.left,
            y2: toBox.top + toBox.height / 2 - containerBox.top,
          });
        });
      });
      setLines(next);
    }

    compute();
    window.addEventListener("resize", compute);
    return function cleanup() { window.removeEventListener("resize", compute); };
  }, [emails, stages.length]);

  if (stages.length === 0) return null;

  function isRelated(id: string): boolean {
    return (
      hoveredId === id ||
      lines.some(function linked(l) {
        return (l.fromId === hoveredId && l.toId === id) || (l.toId === hoveredId && l.fromId === id);
      })
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative", display: "flex", gap: 28, padding: 24, marginBottom: 32,
        background: "#f8fafc", border: `1px solid ${DIVIDER}`, borderRadius: 12, overflowX: "auto",
      }}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={accent} />
          </marker>
        </defs>
        {lines.map(function renderLine(l) {
          const active = hoveredId !== null && (l.fromId === hoveredId || l.toId === hoveredId);
          const dim = hoveredId !== null && !active;
          const midX = (l.x1 + l.x2) / 2;
          return (
            <path
              key={`${l.fromId}-${l.toId}`}
              d={`M${l.x1},${l.y1} C${midX},${l.y1} ${midX},${l.y2} ${l.x2 - 6},${l.y2}`}
              fill="none"
              stroke={accent}
              strokeWidth={active ? 2.25 : 1.25}
              opacity={dim ? 0.12 : active ? 1 : 0.35}
              markerEnd={`url(#${markerId})`}
              style={{ transition: "opacity .15s, stroke-width .15s" }}
            />
          );
        })}
      </svg>

      {stages.map(function renderStage(stage, i) {
        const stageEmails = emails.filter(function inStage(e) { return e.stage === stage; });
        const isActiveStage = activeStage === stage;
        const isFinalStage = i === stages.length - 1;
        return (
          <div key={stage} style={{ flex: "0 0 190px", display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              type="button"
              onClick={function toggle() { onSelectStage(isActiveStage ? null : stage); }}
              style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", border: "none", cursor: "pointer", background: "none", padding: 0, fontFamily: "inherit" }}
            >
              <span
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  width: 20, height: 20, borderRadius: "50%", fontSize: 10, fontWeight: 800,
                  color: isActiveStage ? "#fff" : accent,
                  background: isActiveStage ? accent : "#fff",
                  border: `1.5px solid ${accent}`,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: isActiveStage ? accent : INK }}>
                {stage} <span style={{ opacity: 0.5, fontWeight: 600 }}>· {stageEmails.length}</span>
              </span>
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stageEmails.map(function renderChip(email) {
                return (
                  <button
                    key={email.id}
                    type="button"
                    ref={function saveRef(el) { chipRefs.current[email.id] = el; }}
                    onClick={function toggle() { onSelectStage(isActiveStage ? null : stage); }}
                    onMouseEnter={function enter() { setHoveredId(email.id); }}
                    onMouseLeave={function leave() { setHoveredId(null); }}
                    style={{
                      textAlign: "left", padding: "9px 12px", borderRadius: isFinalStage ? 9999 : 10, cursor: "pointer",
                      border: `1.5px solid ${isActiveStage || hoveredId === email.id ? accent : DIVIDER}`,
                      background: "#fff", fontSize: 12, fontWeight: 600, color: INK, lineHeight: 1.3, fontFamily: "inherit",
                      opacity: hoveredId === null || isRelated(email.id) ? 1 : 0.35,
                      boxShadow: hoveredId === email.id ? "0 4px 14px rgba(15,23,42,.1)" : "none",
                      transition: "opacity .15s, border-color .15s, box-shadow .15s",
                    }}
                  >
                    {email.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
