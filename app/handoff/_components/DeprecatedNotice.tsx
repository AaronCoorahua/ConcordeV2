/**
 * DeprecatedNotice — aviso arriba de la doc de un componente deprecado, con enlace a su reemplazo.
 */

import type { JSX } from "react";

export default function DeprecatedNotice({ replacement, note }: { replacement?: string; note?: string }): JSX.Element {
  return (
    <div role="note" style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "0 0 24px", padding: "12px 16px", borderRadius: 10, border: "1px solid var(--ui-border)", background: "var(--ui-subtle)", fontSize: 14, lineHeight: 1.5, color: "var(--ui-body)" }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ui-muted)", background: "var(--ui-border-soft)", borderRadius: 999, padding: "3px 8px", flexShrink: 0, marginTop: 1 }}>Deprecado</span>
      <span>
        {replacement ? (
          <>Reemplazado por <a href={`/handoff/${replacement.toLowerCase()}`} style={{ color: "var(--ui-accent)", fontWeight: 600 }}>{replacement}</a>.</>
        ) : null}
        {note ? <>{replacement ? " " : ""}{note}</> : null}
      </span>
    </div>
  );
}
