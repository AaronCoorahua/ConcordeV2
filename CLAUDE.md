# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
# Install dependencies (first time)
npm install

# Development server (auto-reload on file changes)
npm run dev

# Build for production
npm build

# Run production build locally
npm start

# Lint code
npm run lint
```

Open http://localhost:3000 to see the component catalog. Handoff pages are available at `/handoff/{componentname}`.

---

## Project Overview

**Concorde** is a Next.js-based component library for **Voyager Design System**. It serves as a bridge between design (Figma + Voyager DS preview site) and code, enabling designers to hand off production-ready components to engineers.

### Architecture

The project uses a **skill-driven code generation pipeline** to create component files from design specs:

- **`/concorde <ComponentName>` skill**: Autonomously generates React components from Figma + preview screenshots using a 5-agent pipeline (Extractor → Layout Coder → Interaction Coder → Token Mapper → File Writer)
- **Main catalog**: `app/page.tsx` — Registry-driven component browser with live previews and status tracking
- **Component structure**: Each component lives in `src/components/{ComponentName}/` with 4 generated files:
  - `{ComponentName}.tsx` — The actual component (self-contained, CSS-in-JS)
  - `{ComponentName}Handoff.tsx` — Spec + handoff panel (portable React-only component)
  - `index.ts` — Barrel export
  - `README.md` — Generated documentation
- **Handoff pages**: `app/handoff/{componentname}/page.tsx` — Route that renders the handoff spec for each component

### Key Files

- `concorde-config.json` — Code generation rules (no_any, spacing_grid, output_dir, etc.)
- `concorde-manifest.json` — Component metadata (preview URLs, Figma node IDs, variants, states, has_interactive_demo)
- `.claude/concorde/token-map.json` — Accumulated CSS tokens extracted from components
- `AGENTS.md` — Important: Breaking changes warning for this Next.js version

---

## Next.js Version & Breaking Changes

⚠️ **This is NOT standard Next.js** — see `AGENTS.md` for critical breaking changes. Check `node_modules/next/dist/docs/` for the actual API before writing code. Always heed deprecation notices.

Key tech stack:
- **Next.js 16.2.6** (App Router)
- **React 19.2.4**
- **TypeScript with strict: true**
- **Tailwind CSS v4** (PostCSS-first)
- **CSS native animations** (no animation library)

---

## The `/concorde` Skill — How It Works

When you run `/concorde Button` or `/concorde Button --all-variants`, the skill:

1. **Reads manifests** (`concorde-manifest.json` + `concorde-config.json` + token map)
2. **Extracts specs** from the Voyager DS preview site (CSS values, states, animations) + optionally from Figma
3. **Generates 4 files per component**:
   - `.tsx` with self-contained styles (CSS-in-JS via `<style>` tags)
   - `Handoff.tsx` — portable React-only component (NO repo imports, NO Tailwind, NO tokens). Works in any React app.
   - `index.ts` and `README.md`
4. **Creates handoff route** at `/handoff/{componentname}` for live spec browsing
5. **Updates token map** with new color/typography/spacing values

**Portal rule for Handoff.tsx**: Only imports from `react` and `react/jsx-runtime`. Inline all styles. This file is portable across projects.

---

## Component Structure & Patterns

### Folder Layout
```
src/components/
  Button/
    Button.tsx                 ← Component (self-contained styles)
    ButtonHandoff.tsx          ← Portable spec panel (React-only)
    index.ts                   ← export { Button } from "./Button"
    README.md                  ← Generated docs

app/
  page.tsx                     ← Main catalog (REGISTRY-driven)
  handoff/
    button/
      page.tsx                 ← /handoff/button route
```

### Component File Pattern

Components use **CSS-in-JS with style injection**:
```tsx
"use client";

const BUTTON_STYLES = `
  .btn { /* CSS here */ }
  .btn:hover { /* ... */ }
`;

let stylesInjected = false;

export default function Button({ ... }) {
  // Inject styles once (SSR + CSR safe)
  if (typeof document !== "undefined" && !stylesInjected) {
    if (!document.getElementById("concorde-button-styles")) {
      const el = document.createElement("style");
      el.id = "concorde-button-styles";
      el.textContent = BUTTON_STYLES;
      document.head.appendChild(el);
    }
    stylesInjected = true;
  }

  return (
    <>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BUTTON_STYLES }} />
      {/* component JSX */}
    </>
  );
}
```

This ensures:
- No FOUC (Flash of Unstyled Content)
- Works in SSR + CSR
- No duplicate `<style>` tags on multiple instances

### States & Accessibility

All components include:
- `:hover`, `:active` (pressed), `:focus-visible`, `:disabled`
- `prefers-reduced-motion: reduce` support (transitions → none)
- WCAG focus rings (outline, not box-shadow)
- Semantic HTML (button, a, [role] attributes)

---

## Development Workflow

### Adding a New Component

1. **Define in `concorde-manifest.json`**:
   - `preview_anchor` — URL path on Voyager DS preview site
   - `variants` — list of variant names (e.g., `["primary", "secondary", "ghost"]`)
   - `states` — interactions to capture (e.g., `["default", "hover", "pressed", "disabled"]`)
   - `has_interactive_demo` — true if the preview has clickable states
   - `figma_node_id` — Figma node ID (or empty string to skip Figma extraction)

2. **Run `/concorde ComponentName`** — let the skill generate all 4 files

3. **Verify the output**:
   - Check `src/components/ComponentName/` for correctness
   - Visit `http://localhost:3000/handoff/componentname` to see the spec
   - Test on `/handoff/componentname` that all variants and states are interactive

4. **Update component status in `app/page.tsx` REGISTRY**:
   - Change `status: "planned"` → `status: "done"` or `"wip"`
   - Update preview JSX to show actual variants
   - Update tags and description

5. **Check token-map.json** in `.claude/concorde/token-map.json` for new colors/typography — these are candidates for your design tokens later

### Editing Generated Components

Generated components are yours to edit freely after generation. Common edits:
- Adjust inline styles if preview extraction was imperfect
- Add `aria-label`, `aria-describedby`, or other a11y props
- Refine animation timings (preview extraction is approximate)
- Add conditional className logic for complex variants

If you regenerate with `/concorde`, your edits will be overwritten — keep them small and documented.

### Testing

The project includes **no unit tests** — it's a catalog, not a library with breaking-change concerns. Instead:
- Always test components visually via `http://localhost:3000`
- Check all variants and states on their `/handoff/` page
- Verify animations in browser DevTools
- Test with `prefers-reduced-motion: reduce` in DevTools

---

## Code Rules (from `concorde-config.json`)

These enforce consistency across generated components:

```json
{
  "code_rules": {
    "no_any": true,              // Strict TypeScript, no 'any'
    "no_ternaries": false,       // Ternaries are OK
    "no_anonymous_functions": false, // Arrow funcs & function() are OK
    "no_hardcoded_hex": false,   // Hex colors inline OK (used for Tailwind)
    "spacing_grid": 8,           // All spacing in multiples of 8px
    "use_container_queries": false
  },
  "output_dir": "src/components",
  "typescript_strict": true,
  "allowed_dependencies": ["react", "next"]
}
```

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Component doesn't render | Styles not injected | Check SSR guard: `if (typeof document !== "undefined")` |
| `/handoff/{component}` is 404 | Route file not created | Run `/concorde ComponentName` again or manually create `app/handoff/{componentname}/page.tsx` |
| FOUC (styles flash) | No SSR style injection | Add `<style suppressHydrationWarning dangerouslySetInnerHTML={...} />` in render |
| Handoff panel shows placeholder data | `{ComponentName}Handoff.tsx` not updated | Regenerate with `/concorde ComponentName` or edit the hardcoded data arrays in the Handoff component |
| Animations look janky | `prefers-reduced-motion` mismatch | Check: `@media (prefers-reduced-motion: reduce) { .class { transition: none; } }` |

---

## Useful References

- **Voyager DS preview**: https://voyager-ds.vercel.app/preview/components/pase1 (source of truth for styles & animations)
- **Concorde skill docs**: `.claude/skills/concorde/SKILL.md` (full 5-agent pipeline spec)
- **Component catalog**: `http://localhost:3000` (local development)
- **AGENTS.md**: Read before writing custom code — Next.js version has breaking changes
