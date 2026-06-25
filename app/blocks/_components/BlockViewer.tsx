"use client";

import { useState } from "react";
import type { CSSProperties, JSX, ReactNode } from "react";
import { BLOCKS_NAV } from "./blocks-nav";

export interface BlockFile {
  path: string;
  code: string;
}

interface CanvasSlot {
  node: ReactNode;
  width: number;
  height: number;
}

interface BlockViewerProps {
  id: string;
  description: string;
  width: number;
  height: number;
  canvas: ReactNode;
  files: BlockFile[];
  controls?: ReactNode;
  /** Canvas alternativo por viewport. Cuando se provee, reemplaza canvas+dimensiones para ese viewport. */
  canvasForViewport?: { mobile?: CanvasSlot };
}

type ViewMode = "preview" | "code";
type Viewport = "desktop" | "mobile";

const VIEWPORT_W: Record<Viewport, number> = { desktop: 1100, mobile: 390 };

// ── Árbol de archivos ───────────────────────────────────────────────────────

interface TreeFile { type: "file"; name: string; index: number; }
interface TreeDir { type: "dir"; name: string; children: TreeNode[]; }
type TreeNode = TreeFile | TreeDir;

function buildTree(files: BlockFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  files.forEach(function addFile(f, index) {
    const parts = f.path.split("/");
    let level = root;
    parts.forEach(function walk(part, i) {
      if (i === parts.length - 1) {
        level.push({ type: "file", name: part, index });
        return;
      }
      let dir = level.find(function match(n): n is TreeDir {
        return n.type === "dir" && n.name === part;
      });
      if (!dir) {
        dir = { type: "dir", name: part, children: [] };
        level.push(dir);
      }
      level = dir.children;
    });
  });
  return root;
}

function FileIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
    </svg>
  );
}
function FolderIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" aria-hidden="true">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function TreeNodes({ nodes, depth, active, onSelect }: { nodes: TreeNode[]; depth: number; active: number; onSelect: (i: number) => void }): JSX.Element {
  return (
    <>
      {nodes.map(function renderNode(node) {
        if (node.type === "dir") {
          return (
            <div key={`d-${depth}-${node.name}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", paddingLeft: 8 + depth * 14, fontSize: 13, color: "#52525b", fontWeight: 600 }}>
                <FolderIcon />
                {node.name}
              </div>
              <TreeNodes nodes={node.children} depth={depth + 1} active={active} onSelect={onSelect} />
            </div>
          );
        }
        const isActive = node.index === active;
        return (
          <button
            key={`f-${node.index}`}
            type="button"
            onClick={function pick() { onSelect(node.index); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              textAlign: "left",
              padding: "5px 8px",
              paddingLeft: 8 + depth * 14,
              fontSize: 13,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              color: isActive ? "#4f2ed8" : "#3f3f46",
              background: isActive ? "#f1edff" : "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <FileIcon />
            {node.name}
          </button>
        );
      })}
    </>
  );
}

// ── Toolbar bits ────────────────────────────────────────────────────────────

const iconBtn = (active: boolean): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 28,
  borderRadius: 7,
  border: "none",
  cursor: "pointer",
  background: active ? "#ffffff" : "transparent",
  boxShadow: active ? "0 0 0 1px #e4e4e7" : "none",
  color: active ? "#18181b" : "#a1a1aa",
});

function MonitorIcon(): JSX.Element {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>;
}
function PhoneIcon(): JSX.Element {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
}
// ── Componente ──────────────────────────────────────────────────────────────

export default function BlockViewer({ id, width, height, canvas, files, controls, canvasForViewport }: BlockViewerProps): JSX.Element {
  const [mode, setMode] = useState<ViewMode>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [activeFile, setActiveFile] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const mobileSlot = canvasForViewport?.mobile;
  const activeCanvas = viewport === "mobile" && mobileSlot ? mobileSlot.node : canvas;
  const activeWidth = viewport === "mobile" && mobileSlot ? mobileSlot.width : width;
  const activeHeight = viewport === "mobile" && mobileSlot ? mobileSlot.height : height;

  const cmd = `npx github:AaronCoorahua/ConcordeV2#cli add ${id}`;
  const scale = Math.min(1, VIEWPORT_W[viewport] / activeWidth);
  const tree = buildTree(files);
  const current = files[activeFile] ?? files[0];
  const lines = (current?.code ?? "").split("\n");

  function copyCmd(): void {
    void navigator.clipboard.writeText(cmd).then(function done() {
      setCopiedCmd(true);
      setTimeout(function reset() { setCopiedCmd(false); }, 1800);
    });
  }

  const previewPane = (
    <div style={{ display: "flex", flexDirection: "column", background: "#fafafa" }}>
      {controls ? (
        <div style={{ borderBottom: "1px solid #ececee", padding: "10px 14px", background: "#ffffff" }}>{controls}</div>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 24,
          overflow: "auto",
        }}
      >
        <div style={{ width: activeWidth * scale, height: activeHeight * scale, position: "relative", flexShrink: 0, boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: activeWidth, height: activeHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {activeCanvas}
          </div>
        </div>
      </div>
    </div>
  );

  const codePane = (
    <div style={{ display: "flex", height: 640, background: "#ffffff" }}>
      <div style={{ width: 240, flexShrink: 0, borderRight: "1px solid #ececee", background: "#fafafa", overflow: "auto", padding: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#a1a1aa", padding: "4px 8px 8px" }}>Archivos</div>
        <TreeNodes nodes={tree} depth={0} active={activeFile} onSelect={setActiveFile} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid #ececee", background: "#fafafa" }}>
          <span style={{ fontSize: 12.5, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#52525b", fontWeight: 600 }}>{current?.path}</span>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "12px 0" }}>
          <div style={{ fontSize: 12.5, lineHeight: 1.65, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#27272a", minWidth: "max-content" }}>
            {lines.map(function renderLine(ln, i) {
              return (
                <div key={i} style={{ display: "flex" }}>
                  <span style={{ width: 48, flexShrink: 0, textAlign: "right", paddingRight: 16, color: "#cbd5e1", userSelect: "none" }}>{i + 1}</span>
                  <span style={{ whiteSpace: "pre", paddingRight: 18 }}>{ln || " "}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const viewerBody = (
    <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden", background: "#ffffff" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderBottom: "1px solid #ececee", background: "#ffffff", flexWrap: "wrap" }}>
        {/* Preview / Code toggle */}
        <div style={{ display: "flex", gap: 2, background: "#f4f4f5", borderRadius: 8, padding: 2 }}>
          {(["preview", "code"] as ViewMode[]).map(function renderToggle(m) {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={function set() { setMode(m); }}
                style={{ fontSize: 13, fontWeight: 600, padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer", background: active ? "#ffffff" : "transparent", color: active ? "#18181b" : "#a1a1aa", boxShadow: active ? "0 0 0 1px #e4e4e7" : "none" }}
              >
                {m === "preview" ? "Preview" : "Code"}
              </button>
            );
          })}
        </div>

        {/* Viewport (solo en preview) */}
        {mode === "preview" ? (
          <div style={{ display: "flex", gap: 2 }}>
            <button type="button" title="Escritorio" onClick={function d() { setViewport("desktop"); }} style={iconBtn(viewport === "desktop")}><MonitorIcon /></button>
            <button type="button" title="Móvil" onClick={function m() { setViewport("mobile"); }} style={iconBtn(viewport === "mobile")}><PhoneIcon /></button>
          </div>
        ) : null}

        {/* Comando de instalación — alineado a la derecha */}
        <button
          type="button"
          onClick={copyCmd}
          title="Copiar comando"
          style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid #e4e4e7", borderRadius: 8, padding: "5px 10px", background: "#fafafa", cursor: "pointer" }}
        >
          <code style={{ fontSize: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#3f3f46", whiteSpace: "nowrap" }}>
            <span style={{ color: "#a1a1aa" }}>$ </span>{cmd}
          </code>
          <span style={{ fontSize: 11, fontWeight: 600, color: copiedCmd ? "#16a34a" : "#a1a1aa", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{copiedCmd ? "✓" : "copiar"}</span>
        </button>
      </div>

      {/* Body */}
      {mode === "preview" ? previewPane : codePane}
    </div>
  );

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 0" }}>
      {/* Tabs de bloques */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid #f1f5f9" }}>
        <nav style={{ display: "flex", gap: 4 }}>
          {BLOCKS_NAV.map(function renderTab(b) {
            const active = b.id === id;
            return (
              <a
                key={b.id}
                href={`/blocks/${b.id}`}
                style={{ fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "10px 12px", color: active ? "#0f172a" : "#94a3b8", borderBottom: active ? "2px solid #4f2ed8" : "2px solid transparent", marginBottom: -1 }}
              >
                {b.name}
              </a>
            );
          })}
        </nav>
        <a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px" }}>Ver todos los bloques</a>
      </div>

      {viewerBody}
    </div>
  );
}
