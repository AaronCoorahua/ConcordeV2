import { Plus_Jakarta_Sans } from "next/font/google";

// El layout raíz de Concorde carga Plus Jakarta Sans solo en 600; el Index usa 500, 600, 700 y 800 (como el lab).
// Se aplica únicamente al lienzo del bloque, así el resto del catálogo no cambia.
export const indexFont = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--vmc-font-display" });
