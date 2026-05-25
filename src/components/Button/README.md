# Button — Concorde DONE

**Generado:** 2026-05-25
**Preview fuente:** https://voyager-ds.vercel.app/preview/components/pase1
**Figma node:** —

## Variantes

| Variante | CSS Class | Height | Descripción |
|---|---|---|---|
| `primary` | `.pvbtn` | 48px | CTA principal, gradiente orange→purple animado |
| `secondary` | `.psec` | 48px | CTA secundario, gradiente purple |
| `ghost` | `.pghost` | 48px | Transparente + borde blanco, usar sobre fondos oscuros |
| `sm-guest` | `.pvbtn-sm` | 40px | Navbar sin sesión — icono + texto |
| `sm-logged-in` | `.pvbtn-auth-d` | 40px | Navbar con sesión — icono + username |

## Estados

| Estado | Comportamiento |
|---|---|
| default | Gradiente animado, inset shine |
| hover | `translateY(-2px) scale(1.02)`, gradiente cambia ángulo 220deg, glow blur |
| active | `scale(0.97) translateY(1px)`, inset shadow |
| disabled | Bg `#e1e3e2`, text `#99a1af`, cursor `not-allowed` |
| focus-visible | Double ring: 2px white + 5px vault-500 |

## Uso

```tsx
import Button from "@/src/components/Button/Button";

// md variants
<Button variant="primary">Participa</Button>
<Button variant="secondary">Ingresa</Button>
<Button variant="ghost">Ver ofertas</Button>

// sm variants
<Button variant="sm-guest">Ingresa</Button>
<Button variant="sm-logged-in" username="ZAEX5G" />

// disabled
<Button variant="primary" disabled>Participa</Button>
```

## Ver handoff completo

```bash
# Visitar en tu app Next.js:
http://localhost:3000/handoff/button
```

## Animación @property

El gradiente usa `@property` CSS para animar suavemente entre colores en hover.
Requiere Chromium 111+ / Safari 16.4+ / Firefox 128+.

## Token map — valores nuevos registrados

| Valor | Token sugerido | Primera vez en |
|---|---|---|
| `oklch(0.72 0.16 55)` | `--vmc-color-orange-600` | Button/primary/default |
| `oklch(0.85 0.12 55)` | `--vmc-color-orange-400` | Button/primary/hover |
| `oklch(0.62 0.18 45)` | `--vmc-color-orange-700` | Button/primary/pressed |
| `oklch(0.55 0.22 285)` | `--vmc-color-vault-500` | Button/primary/default |
| `oklch(0.72 0.18 285)` | `--vmc-color-vault-400` | Button/primary/hover |
| `oklch(0.48 0.22 285)` | `--vmc-color-vault-600` | Button/primary/pressed |
| `oklch(0.38 0.20 285)` | `--vmc-color-vault-700` | Button/secondary/default |
| `oklch(0.25 0.16 285)` | `--vmc-color-vault-900` | Button/secondary/pressed |
| `oklch(0.82 0.13 285)` | `--vmc-color-vault-300` | Button/secondary/border |
| `Plus Jakarta Sans / 15px / 600` | `--text-label-lg` | Button/md |
| `Plus Jakarta Sans / 14px / 600` | `--text-label-md` | Button/sm |
| `56px` | `--space-button-px-md` | Button/primary/paddingX |
| `28px` | `--space-button-px-ghost` | Button/ghost/paddingX |
