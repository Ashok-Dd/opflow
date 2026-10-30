"use client";

import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { AXIS, slips, timeToX, WINDOWS } from "./hall-layout";
import styles from "./waiting-hall.module.css";

const MODES = [
  {
    title: "Without OPflow",
    line: "Everyone arrives at 9",
    caption: "Everyone turns up at 9. The doctor sees them one by one, and most of the morning is spent waiting.",
  },
  {
    title: "With OPflow",
    line: "8 an hour, by booking",
    caption: "Eight places an hour, booked in advance. The same OPD, and a hall you can walk into.",
  },
] as const;

/** People in the hall at 9:30 in each situation. */
const HALL = [31, 7] as const;

const FIRST_SWITCH = 2800; // ms the crowded hall is shown before it first resolves
const SWITCH_EVERY = 4600;

/**
 * Fig. 1 of the hero: a framed, printed-form panel that shows one OPD morning two ways. It plays by itself
 * while on screen (with a pause button), and the tabs let the visitor choose.
 */
export function WaitingHall() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const [mode, setMode] = useState<0 | 1>(0);
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setMode((m) => (m === 0 ? 1 : 0));
      id = setInterval(() => setMode((m) => (m === 0 ? 1 : 0)), SWITCH_EVERY);
    }, FIRST_SWITCH);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [playing]);

  const lean = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", String(((e.clientX - box.left) / box.width) * 2 - 1));
    e.currentTarget.style.setProperty("--my", String(((e.clientY - box.top) / box.height) * 2 - 1));
  };
  const rest = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <figure ref={ref} className="rounded-[4px] bg-paper text-ink">
      <figcaption className="flex items-center justify-between border-b border-rule px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase sm:px-6">
        <span>Fig. 1 · The OPD waiting hall</span>
        <span>9:30 AM</span>
      </figcaption>

      <div className="px-4 pt-5 pb-4 sm:px-6 sm:pt-6">
        <p className="sr-only">
          Without OPflow, about {HALL[0]} people crowd the hall at 9:30. With OPflow, about {HALL[1]}.
        </p>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="flex rounded-[4px] border border-ink/25 p-0.5" role="tablist" aria-label="Compare arrivals">
            {MODES.map((m, i) => (
              <button
                key={m.title}
                type="button"
                role="tab"
                aria-selected={mode === i}
                onClick={() => {
                  setMode(i as 0 | 1);
                  setPaused(true);
                }}
                className={`rounded-[3px] px-3 py-2 text-left transition-colors sm:px-4 ${
                  mode === i ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="block text-sm font-semibold">{m.title}</span>
                <span className="block text-[12px] opacity-80">{m.line}</span>
              </button>
            ))}
          </div>

          <p className="flex items-center gap-3" aria-hidden="true">
            <span className={`${styles.reel} font-mono text-[2.6rem] leading-[3.4rem] tabular-nums`} data-mode={mode}>
              <span className="block">
                <span className="block text-alarm">{HALL[0]}</span>
                <span className="block text-forest">{HALL[1]}</span>
              </span>
            </span>
            <span className="max-w-[7rem] text-[13px] leading-tight text-ink-soft">people in the hall</span>
          </p>
        </div>

        <div className="mt-6" onPointerMove={lean} onPointerLeave={rest}>
          <div
            className={styles.hall}
            data-seen={inView}
            style={{ "--p": mode } as CSSProperties}
            aria-hidden="true"
          >
            {WINDOWS.map((hour) => (
              <span
                key={hour}
                className={styles.band}
                style={{ left: `${timeToX(hour)}%`, width: `${timeToX(hour + 1) - timeToX(hour)}%` }}
              />
            ))}
            {slips.map((s) => (
              <span
                key={s.token}
                className={styles.slip}
                style={
                  {
                    "--x0": s.x0,
                    "--r0": s.row0,
                    "--a0": s.angle0,
                    "--x1": s.x1,
                    "--r1": s.row1,
                    "--a1": s.angle1,
                    "--d": s.delay,
                    "--z": s.depth,
                  } as CSSProperties
                }
              >
                <span className={styles.face}>
                  <span>{s.token}</span>
                </span>
              </span>
            ))}
          </div>

          <div className="relative h-7 border-t border-ink/40" aria-hidden="true">
            {AXIS.map((a) => (
              <span
                key={a.hour}
                className={`absolute top-2 font-mono text-[11px] whitespace-nowrap text-ink-soft ${
                  a.hour === AXIS[AXIS.length - 1].hour ? "-translate-x-full" : "-translate-x-1/2"
                }`}
                style={{ left: `${timeToX(a.hour)}%` }}
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-rule px-4 py-3 sm:px-6">
        <p key={mode} className="animate-fade-up font-serif text-[15px] leading-snug text-ink italic sm:text-base">
          {MODES[mode].caption}
        </p>
        <PauseButton paused={paused || reduced} onToggle={() => setPaused((p) => !p)} label="arrivals animation" className="shrink-0" />
      </div>
    </figure>
  );
}
