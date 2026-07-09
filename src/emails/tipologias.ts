/**
 * Tipologías de correos VMC Subastas — módulo plano (sin "use client").
 * Fuente: catálogo de mailing en producción (concorde-email.vercel.app).
 * `prodCount` = cantidad de plantillas en producción por tipología.
 *
 * Cada tipología mapea a un "sistema" de acento del design system:
 *   · live       — naranja En Vivo (OfferType/DetailCard live)
 *   · negotiable — teal Negociable
 *   · coins      — ámbar SubasCoins/Subaspass (#F5921E→#E15F2B)
 *   · brand      — morado marca (header de los correos actuales)
 *   · alert      — rojo aviso (dot live #E5484D)
 *   · dark       — morado profundo neutro
 */

export type EmailAccentSystem = "live" | "negotiable" | "coins" | "brand" | "alert" | "dark";

export interface EmailAccent {
  /** Gradiente del band hero */
  band: string;
  /** Color plano de respaldo (clientes sin gradientes) */
  bandFallback: string;
  pillBg: string;
  pillColor: string;
  /** Gradiente del strip de 4px bajo el band */
  strip: string;
  stripFallback: string;
}

export const EMAIL_ACCENTS: Record<EmailAccentSystem, EmailAccent> = {
  live: {
    band: "linear-gradient(110deg,#FF9639 0%,#EF852E 45%,#BE3D00 100%)",
    bandFallback: "#EF852E",
    pillBg: "#FFFFFF",
    pillColor: "#BE3E00",
    strip: "linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)",
    stripFallback: "#ed8936",
  },
  negotiable: {
    band: "linear-gradient(100deg,#00EDEE 0%,#00D2D3 45%,#009597 100%)",
    bandFallback: "#00D2D3",
    pillBg: "#2E0F70",
    pillColor: "#FFFFFF",
    strip: "linear-gradient(90deg,#00DAE0 0%,#8460e5 55%,#3b1782 100%)",
    stripFallback: "#00AEB1",
  },
  coins: {
    band: "linear-gradient(110deg,#F5921E 0%,#EB7A24 45%,#E15F2B 100%)",
    bandFallback: "#EB7A24",
    pillBg: "#2E0F70",
    pillColor: "#FFFFFF",
    strip: "linear-gradient(90deg,#F5921E 0%,#8460e5 55%,#3b1782 100%)",
    stripFallback: "#F5921E",
  },
  brand: {
    band: "linear-gradient(157deg,#5F3ED8 0%,#340091 50%,#140046 100%)",
    bandFallback: "#3b1782",
    pillBg: "#FFFFFF",
    pillColor: "#4C1EBC",
    strip: "linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)",
    stripFallback: "#ed8936",
  },
  alert: {
    band: "linear-gradient(110deg,#E5484D 0%,#C43539 50%,#8E1E22 100%)",
    bandFallback: "#C43539",
    pillBg: "#FFFFFF",
    pillColor: "#C43539",
    strip: "linear-gradient(90deg,#E5484D 0%,#8460e5 55%,#3b1782 100%)",
    stripFallback: "#E5484D",
  },
  dark: {
    band: "linear-gradient(157deg,#3A3450 0%,#221D33 55%,#140046 100%)",
    bandFallback: "#221D33",
    pillBg: "#FFFFFF",
    pillColor: "#340091",
    strip: "linear-gradient(90deg,#8460e5 0%,#3b1782 55%,#140046 100%)",
    stripFallback: "#8460e5",
  },
};

export interface EmailTipologia {
  id: string;
  label: string;
  /** Plantillas existentes en producción (referencia) */
  prodCount: number;
  system: EmailAccentSystem;
  /** Texto de la pill del banner */
  pill: string;
  /** Título demo del banner */
  titulo: string;
  /** Bajada demo del banner */
  subtitulo: string;
}

export const EMAIL_TIPOLOGIAS: EmailTipologia[] = [
  { id: "en-vivo",                label: "En vivo",                   prodCount: 10, system: "live",       pill: "EN VIVO",           titulo: "¡La subasta {{Toyota Hilux 2018}} está por comenzar!", subtitulo: "Conéctate a la sala En Vivo y prepara tus bids." },
  { id: "negociable",             label: "Negociable",                prodCount: 13, system: "negotiable", pill: "NEGOCIABLE",        titulo: "¡Nueva propuesta en {{Lote de equipos TI}}!",           subtitulo: "El vendedor respondió tu oferta — revísala." },
  { id: "adquisicion-subascoins", label: "Adquisición de SubasCoins", prodCount: 1,  system: "coins",      pill: "SUBASCOINS",        titulo: "¡Tus SubasCoins ya están en tu Billetera!",             subtitulo: "Adquisición confirmada — úsalos para consignar." },
  { id: "recarga",                label: "Recarga",                   prodCount: 1,  system: "coins",      pill: "RECARGA",           titulo: "Recarga confirmada",                                    subtitulo: "Tu saldo ya está disponible en tu Billetera." },
  { id: "proceso-compra-venta",   label: "Proceso Compra y Venta",    prodCount: 1,  system: "brand",      pill: "COMPRA Y VENTA",    titulo: "Tu proceso de compra avanza",                           subtitulo: "Revisa el siguiente paso en tu zona de usuario." },
  { id: "registro",               label: "Registro",                  prodCount: 1,  system: "brand",      pill: "REGISTRO",          titulo: "¡Bienvenido a VMC Subastas!",                           subtitulo: "Confirma tu correo para activar tu cuenta." },
  { id: "canje-puntos",           label: "Canje de Puntos",           prodCount: 1,  system: "coins",      pill: "CANJE DE PUNTOS",   titulo: "¡Canje de puntos exitoso!",                             subtitulo: "Tus puntos VMC se convirtieron en beneficios." },
  { id: "contrasena",             label: "Contraseña",                prodCount: 1,  system: "brand",      pill: "CONTRASEÑA",        titulo: "Restablece tu contraseña",                              subtitulo: "Usa el enlace seguro para crear una nueva." },
  { id: "visita-agendada",        label: "Visita Agendada",           prodCount: 1,  system: "negotiable", pill: "VISITA AGENDADA",   titulo: "Tu visita quedó agendada",                              subtitulo: "Te esperamos para inspeccionar el lote." },
  { id: "devolucion-saldo",       label: "Devolución de Saldo",       prodCount: 2,  system: "negotiable", pill: "DEVOLUCIÓN",        titulo: "Devolución de saldo en proceso",                        subtitulo: "Tu solicitud fue recibida — respuesta en 48 h hábiles." },
  { id: "actualizar-correo",      label: "Actualizar Correo",         prodCount: 1,  system: "brand",      pill: "ACTUALIZAR CORREO", titulo: "Confirma tu nuevo correo",                              subtitulo: "Un paso más para actualizar tu cuenta." },
  { id: "inhabilitacion",         label: "Inhabilitación de Usuario", prodCount: 2,  system: "alert",      pill: "INHABILITACIÓN",    titulo: "Tu usuario fue inhabilitado",                           subtitulo: "Revisa los motivos y cómo regularizar tu cuenta." },
  { id: "baja-cuenta",            label: "Baja de Cuenta",            prodCount: 1,  system: "dark",       pill: "BAJA DE CUENTA",    titulo: "Baja de cuenta confirmada",                             subtitulo: "Lamentamos verte partir — tus datos serán eliminados." },
  { id: "usuarios-internos",      label: "Usuarios Internos",         prodCount: 2,  system: "dark",       pill: "USUARIOS INTERNOS", titulo: "Notificación interna",                                  subtitulo: "Movimiento registrado en el panel de operaciones." },
  { id: "proceso-interno-mapfre", label: "Proceso Interno Mapfre",    prodCount: 6,  system: "alert",      pill: "MAPFRE",            titulo: "Actualización del expediente",                          subtitulo: "Proceso interno — estado del lote asignado." },
  { id: "general",                label: "General",                   prodCount: 1,  system: "brand",      pill: "GENERAL",           titulo: "Novedades de VMC Subastas",                             subtitulo: "¡Despierta al cazador de ofertas que hay en ti!" },
];

/** Total de plantillas en producción (suma de prodCount) */
export const EMAIL_PROD_TOTAL = EMAIL_TIPOLOGIAS.reduce(function sum(acc, t) { return acc + t.prodCount; }, 0);
