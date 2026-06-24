"use client";

/**
 * InstallCommand — comando de instalación con tabs de gestor (estilo shadcn).
 * `npx @subastop/concorde@latest add <name>` y equivalentes pnpm/yarn/bun.
 */

import { useState } from "react";
import type { JSX } from "react";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

function commandFor(manager: Manager, name: string): string {
  const pkg = `@subastop/concorde@latest add ${name}`;
  if (manager === "pnpm") return `pnpm dlx ${pkg}`;
  if (manager === "yarn") return `yarn dlx ${pkg}`;
  if (manager === "bun") return `bunx ${pkg}`;
  return `npx ${pkg}`;
}

export default function InstallCommand({ name }: { name: string }): JSX.Element {
  const [manager, setManager] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);
  const cmd = commandFor(manager, name);

  function handleCopy(): void {
    void navigator.clipboard.writeText(cmd).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 1800);
    });
  }

  return (
    <div style={{ border: "1px solid #e4e4e7", borderRadius: 10, overflow: "hidden", background: "#fafafa" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px", borderBottom: "1px solid #ececee" }}>
        {MANAGERS.map(function renderTab(m) {
          const active = m === manager;
          return (
            <button
              key={m}
              type="button"
              onClick={function pick() { setManager(m); }}
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                padding: "4px 10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                background: active ? "#ffffff" : "transparent",
                color: active ? "#18181b" : "#a1a1aa",
                boxShadow: active ? "0 0 0 1px #e4e4e7" : "none",
              }}
            >
              {m}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "12px 16px" }}>
        <code style={{ fontSize: 13, color: "#27272a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", overflowX: "auto", whiteSpace: "nowrap" }}>
          <span style={{ color: "#a1a1aa" }}>$ </span>{cmd}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar comando"
          style={{
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            padding: "4px 9px",
            borderRadius: 6,
            border: "1px solid #e4e4e7",
            background: "#ffffff",
            color: copied ? "#16a34a" : "#71717a",
            cursor: "pointer",
          }}
        >
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
