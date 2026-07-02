/**
 * useSala — motor de la animación "Ver live" compartido por SalaMobile y
 * SalaDesktop/BidChat.
 *
 * Máquina de estados: idle → welcome → extended → streaming → processing →
 * result → activity. Centraliza timers y estado para que ambos bloques rendericen
 * la misma secuencia. Conectar `onBid` con el backend real se hace aquí.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { Phase } from "./liveData";
import {
  STREAM,
  REVEAL_AT,
  TOTAL_STREAM,
  VMC_START,
  VMC_FILL,
  WELCOME_MS,
  EXTENDED_MS,
  RESTART_PAUSE,
  PROCESSING_MS,
  RESULT_MS,
  START_COUNT,
  PARTICIPANTS_TARGET,
  BASE,
} from "./liveData";

export interface LiveAuction {
  phase: Phase;
  count: number;
  participants: number;
  myBids: number;
  totalBids: number;
  shown: number;
  prog: number;
  bidAmount: number;
  bidder: string;
  pressed: boolean;
  flash: number;
  /** Segundos transcurridos desde que empezó el live ("INICIÓ HACE") */
  elapsed: number;
}

/** Formatea segundos → "HH:MM:SS". */
export function fmtElapsed(total: number): string {
  const p = (n: number): string => String(n).padStart(2, "0");
  return `${p(Math.floor(total / 3600))}:${p(Math.floor((total % 3600) / 60))}:${p(total % 60)}`;
}

export function useLiveAuction(live: boolean): LiveAuction {
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(START_COUNT);
  const [participants, setParticipants] = useState(0);
  const [myBids, setMyBids] = useState(0);
  const [totalBids, setTotalBids] = useState(0);
  const [shown, setShown] = useState(0);
  const [prog, setProg] = useState(40);
  const [bidAmount, setBidAmount] = useState(BASE);
  const [bidder, setBidder] = useState("ZAE389");
  const [pressed, setPressed] = useState(false);
  const [flash, setFlash] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const elapsedTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    function runLive() {
      function clearAll(): void {
        timers.current.forEach((id) => {
          clearTimeout(id);
          clearInterval(id);
        });
        timers.current = [];
      }
      function clearElapsed(): void {
        if (elapsedTimer.current !== null) {
          clearInterval(elapsedTimer.current);
          elapsedTimer.current = null;
        }
      }

      if (!live) {
        clearAll();
        clearElapsed();
        setPhase("idle");
        setParticipants(0);
        setShown(0);
        setProg(40);
        setPressed(false);
        setElapsed(0);
        return;
      }

      let cancelled = false;

      // "INICIÓ HACE" corre desde 00:00:00 durante todo el live; su timer va aparte
      // para sobrevivir a los clearAll() de las transiciones de fase.
      setElapsed(0);
      clearElapsed();
      elapsedTimer.current = setInterval(() => setElapsed((e) => e + 1), 1000);

      function cycle(): void {
        if (cancelled) return;
        clearAll();
        // (1)+(2) Recibiendo / Inicio extendido — barra BLANCA full · cuenta de 3s
        setPhase("welcome");
        setShown(0);
        setProg(100);
        setCount(START_COUNT);
        setParticipants(0);
        setMyBids(0);
        setTotalBids(0);
        setBidAmount(BASE);
        setBidder("—");

        timers.current.push(setInterval(() => setParticipants((p) => (p < PARTICIPANTS_TARGET ? p + 1 : p)), 300));
        timers.current.push(setInterval(() => setCount((c) => (c > 1 ? c - 1 : 1)), 1000));
        timers.current.push(
          setTimeout(() => {
            setPhase("extended");
            setCount(START_COUNT); // reinicia la cuenta de 3s para "inicio extendido"
          }, WELCOME_MS),
        );

        timers.current.push(
          setTimeout(function toStreaming() {
            clearAll();
            // (3) Streaming — barra rainbow VACÍA hasta el remate
            setPhase("streaming");
            setShown(0);
            setProg(0);

            STREAM.forEach(function schedule(m, i) {
              timers.current.push(
                setTimeout(function reveal() {
                  setShown(i + 1);
                  if (m.kind === "proposal") {
                    setBidAmount(m.amount ?? BASE);
                    setBidder(m.bidder ?? "—");
                    setFlash((f) => f + 1); // anima el bid actual con cada puja
                    if (m.mine) {
                      setMyBids((x) => x + 1);
                      setTotalBids((x) => x + 1);
                      setPressed(true);
                      timers.current.push(setTimeout(() => setPressed(false), 200));
                    } else {
                      setTotalBids((x) => x + 1);
                    }
                  }
                }, REVEAL_AT[i]),
              );
            });

            // El ProgressBar solo se llena durante el remate (A la una/dos/tres)
            timers.current.push(
              setTimeout(function startFill() {
                const s = Date.now();
                const iv = setInterval(() => {
                  const p = Math.min(100, ((Date.now() - s) / VMC_FILL) * 100);
                  setProg(p);
                  if (p >= 100) clearInterval(iv);
                }, 100);
                timers.current.push(iv);
              }, VMC_START),
            );

            // Gano yo → Procesando (barra vacía) → Tabla (barra 100%, 5s) → Actividad
            timers.current.push(
              setTimeout(function toProcessing() {
                clearAll();
                setPhase("processing");
                setProg(0);
                timers.current.push(
                  setTimeout(function toResult() {
                    setPhase("result");
                    setProg(100);
                    timers.current.push(setTimeout(() => setPhase("activity"), RESULT_MS));
                  }, PROCESSING_MS),
                );
              }, TOTAL_STREAM + RESTART_PAUSE),
            );
          }, WELCOME_MS + EXTENDED_MS),
        );
      }

      cycle();
      return function cleanup() {
        cancelled = true;
        clearAll();
        clearElapsed();
      };
    },
    [live],
  );

  return { phase, count, participants, myBids, totalBids, shown, prog, bidAmount, bidder, pressed, flash, elapsed };
}
