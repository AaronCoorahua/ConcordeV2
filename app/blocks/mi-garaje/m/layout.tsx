import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";

// Fuentes de Mi Garaje (como el layout del lab): el CSS del bloque las toma de --font-jakarta y --font-roboto-mono.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"], weight: ["500", "700"] });

/** /blocks/mi-garaje/m/* — pantallas de Mi Garaje a pantalla completa (las muestra el visor en un iframe). */
export default function MiGarajeScreensLayout({ children }: { children: ReactNode }) {
  return <div className={`${jakarta.variable} ${mono.variable}`}>{children}</div>;
}
