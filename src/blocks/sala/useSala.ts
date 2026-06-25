/**
 * useSala — hook compartido para los bloques SalaDesktop y SalaMobile.
 * Centraliza la lógica de bid para que el developer solo modifique un archivo.
 * Conectar onBid con el backend real en este hook.
 */

export {
  fmtMoney,
  BASE,
  STEP,
  ME,
  STREAM,
  STATIC,
  REVEAL_AT,
  TOTAL_STREAM,
  VMC_START,
  VMC_FILL,
  WELCOME_MS,
  EXTENDED_MS,
  RESTART_PAUSE,
  START_COUNT,
  PARTICIPANTS_TARGET,
} from "./liveData";

export type { Phase, LiveMsg } from "./liveData";
