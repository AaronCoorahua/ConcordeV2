import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";

// Fuentes de las landings (como el layout del Index en el lab): Plus Jakarta Sans completa y Roboto Mono.
const display = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--vmc-font-display" });
const mono = Roboto_Mono({ subsets: ["latin"], display: "swap", variable: "--vmc-font-mono" });

export const LANDING_FONT_CLASS = `${display.variable} ${mono.variable}`;
