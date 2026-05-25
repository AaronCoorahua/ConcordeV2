// Button.tsx — Generado por Concorde
// Fuente: https://voyager-ds.vercel.app/preview/components/pase1
// Generado: 2026-05-25
// EDITAR LIBREMENTE después de generar

"use client";

import type { JSX, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "sm-guest"
  | "sm-logged-in";

export interface ButtonProps {
  variant?: ButtonVariant;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  /** Nombre de usuario — requerido cuando variant="sm-logged-in" */
  username?: string;
}

// ── CSS self-contained ────────────────────────────────────────────────────

const BUTTON_STYLES = `
@property --vbtn-angle { syntax: "<angle>"; inherits: false; initial-value: 135deg; }
@property --vbtn-stop-a { syntax: "<color>"; inherits: false; initial-value: oklch(0.72 0.16 55); }
@property --vbtn-stop-b { syntax: "<color>"; inherits: false; initial-value: oklch(0.55 0.22 285); }
@property --vsec-angle { syntax: "<angle>"; inherits: false; initial-value: 160deg; }
@property --vsec-stop-a { syntax: "<color>"; inherits: false; initial-value: oklch(0.38 0.20 285); }
@property --vsec-stop-b { syntax: "<color>"; inherits: false; initial-value: oklch(0.28 0.18 285); }

/* ── primary ─────────────────────────────────────────────────────────── */
.pvbtn {
  --vbtn-stop-a: var(--vmc-color-orange-600, oklch(0.72 0.16 55));
  --vbtn-stop-b: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 56px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.28) 0 1px 0 2px inset, rgba(237,137,54,0.3) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.17) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pvbtn::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-orange-600, oklch(0.72 0.16 55)),
    var(--vmc-color-vault-500, oklch(0.55 0.22 285))
  );
  filter: blur(14px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.pvbtn:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.35) 0 8px 24px, rgba(237,137,54,0.4) 0 4px 10px;
}
.pvbtn:hover::after { opacity: 0.45; filter: blur(18px); }
.pvbtn:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.pvbtn:active::after { opacity: 0; }
.pvbtn:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  border-color: transparent;
}
.pvbtn:disabled::after { display: none; }
.pvbtn:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── secondary ───────────────────────────────────────────────────────── */
.psec {
  --vsec-stop-a: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  --vsec-stop-b: var(--vmc-color-vault-700, oklch(0.38 0.20 285));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 56px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid var(--vmc-color-vault-300, oklch(0.82 0.13 285));
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.3) 0 1px 3px;
  background-image: linear-gradient(var(--vsec-angle), var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.3) 0 2px 8px;
  transition:
    --vsec-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vsec-stop-a 0.35s,
    --vsec-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.psec::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.15) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.psec::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    var(--vmc-color-vault-700, oklch(0.38 0.20 285))
  );
  filter: blur(14px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.psec:hover {
  --vsec-angle: 219deg;
  --vsec-stop-a: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  --vsec-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(132,96,229,0.4) 0 8px 24px, rgba(132,96,229,0.25) 0 4px 10px;
}
.psec:hover::after { opacity: 0.45; filter: blur(18px); }
.psec:active {
  --vsec-angle: 160deg;
  --vsec-stop-a: var(--vmc-color-vault-700, oklch(0.38 0.20 285));
  --vsec-stop-b: var(--vmc-color-vault-900, oklch(0.25 0.16 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.28) 0 2px 5px 2px inset, rgba(0,0,0,0.14) 0 1px 3px;
}
.psec:active::after { opacity: 0; }
.psec:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  border-color: transparent;
}
.psec:disabled::after { display: none; }
.psec:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── ghost ───────────────────────────────────────────────────────────── */
.pghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 28px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.75);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  background: transparent;
  text-shadow: rgba(0,0,0,0.18) 0 1px 3px;
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(255,255,255,0.15) 0 0 0 1px;
  transition:
    background 0.25s,
    border-color 0.25s,
    color 0.25s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pghost::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.1) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pghost::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(135deg,
    var(--vmc-color-orange-600, oklch(0.72 0.16 55)),
    var(--vmc-color-vault-500, oklch(0.55 0.22 285))
  );
  filter: blur(16px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
}
.pghost:hover {
  background: linear-gradient(146.64deg, #fff 0%, rgb(255,240,226) 100%);
  border-color: #fff;
  color: #ed8936;
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.5) 0 1px 0 2px inset, rgba(0,0,0,0.2) 0 6px 20px;
}
.pghost:hover::after { opacity: 0.4; filter: blur(18px); }
.pghost:active {
  background: linear-gradient(146.56deg, rgb(212,110,32) 0%, rgb(183,55,0) 100%);
  border-color: #d46e20;
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset;
}
.pghost:active::after { opacity: 0; }
.pghost:disabled {
  background: transparent;
  border-color: rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.35);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pghost:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}

/* ── sm-guest ─────────────────────────────────────────────────────────── */
.pvbtn-sm {
  --vbtn-stop-a: var(--vmc-color-orange-600, oklch(0.72 0.16 55));
  --vbtn-stop-b: var(--vmc-color-vault-500, oklch(0.55 0.22 285));
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 4px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.2) 0 1px 2px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.25) 0 1px 0 2px inset, rgba(237,137,54,0.25) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn-sm::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--vmc-radius-full, 9999px);
  background: linear-gradient(rgba(255,255,255,0.15) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}
.pvbtn-sm:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-1px) scale(1.02);
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(132,96,229,0.3) 0 6px 18px, rgba(237,137,54,0.35) 0 3px 8px;
}
.pvbtn-sm:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 4px 2px inset, rgba(255,255,255,0.28) 0 1px 0 inset, rgba(0,0,0,0.1) 0 1px 2px;
}
.pvbtn-sm:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pvbtn-sm:focus-visible {
  outline: transparent solid 2px;
  outline-offset: 3px;
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 4px var(--vmc-color-vault-500, oklch(0.55 0.22 285));
}
.pvbtn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

/* ── sm-logged-in ─────────────────────────────────────────────────────── */
.pvbtn-auth-d {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 4px;
  border-radius: var(--vmc-radius-full, 9999px);
  border: 2px solid rgba(255,255,255,0.7);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: var(--vmc-color-base-white, #ffffff);
  text-shadow: rgba(0,0,0,0.22) 0 1px 2px;
  background-image: linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%);
  box-shadow: rgba(255,255,255,0.28) 0 1px 0 2px inset, rgba(237,137,54,0.3) 0 2px 6px;
  transition:
    --vbtn-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    --vbtn-stop-a 0.35s,
    --vbtn-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s;
  transform: translateZ(0);
}
.pvbtn-auth-d:hover {
  --vbtn-angle: 220deg;
  --vbtn-stop-a: var(--vmc-color-orange-400, oklch(0.85 0.12 55));
  --vbtn-stop-b: var(--vmc-color-vault-400, oklch(0.72 0.18 285));
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.35) 0 8px 24px, rgba(237,137,54,0.4) 0 4px 10px;
}
.pvbtn-auth-d:active {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: var(--vmc-color-orange-700, oklch(0.62 0.18 45));
  --vbtn-stop-b: var(--vmc-color-vault-600, oklch(0.48 0.22 285));
  color: var(--vmc-color-icon-disabled, #e1e3e2);
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.pvbtn-auth-d:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
.pvbtn-auth-d:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, oklch(0.55 0.22 285)),
    0 8px 16px -4px rgb(51.76% 37.65% 89.8% / 0.30);
}
.pvbtn-auth-d-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.pvbtn-auth-d-username {
  font-weight: 700;
  opacity: 0.92;
}

/* ── prefers-reduced-motion ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .pvbtn, .psec, .pghost, .pvbtn-sm, .pvbtn-auth-d {
    transition: none;
  }
  .pvbtn::after, .psec::after, .pghost::after {
    transition: none;
  }
}
`;

// ── Style injection ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-button-styles";
let stylesInjected = false;

function injectStyles(): void {
  if (typeof document === "undefined" || stylesInjected) return;
  if (!document.getElementById(STYLE_ID)) {
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = BUTTON_STYLES;
    document.head.appendChild(el);
  }
  stylesInjected = true;
}

// ── Icon ─────────────────────────────────────────────────────────────────

function UserIcon(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

// ── Variant → class map ───────────────────────────────────────────────────

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "pvbtn",
  secondary: "psec",
  ghost: "pghost",
  "sm-guest": "pvbtn-sm",
  "sm-logged-in": "pvbtn-auth-d",
};

// ── Component ─────────────────────────────────────────────────────────────

export default function Button({
  variant = "primary",
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel,
  username,
}: ButtonProps): JSX.Element {
  injectStyles();

  const cls = VARIANT_CLASS[variant];

  let content: ReactNode;
  if (variant === "sm-guest") {
    content = (
      <>
        <span className="pvbtn-icon">
          <UserIcon />
        </span>
        {children}
      </>
    );
  } else if (variant === "sm-logged-in") {
    content = (
      <>
        <span className="pvbtn-auth-d-icon">
          <UserIcon />
        </span>
        Bienvenido,{" "}
        <span className="pvbtn-auth-d-username">{username ?? children}</span>
      </>
    );
  } else {
    content = children;
  }

  return (
    <>
      <style
        id={`${STYLE_ID}-ssr`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: BUTTON_STYLES }}
      />
      <button
        className={cls}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        type="button"
      >
        {content}
      </button>
    </>
  );
}
