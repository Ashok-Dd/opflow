"use client";

import { useEffect, useState } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const PEOPLE = 32;
const START = 8.5; // 8:30 AM
const END = 13; // 1 PM
const x = (t: number) => Math.round(((t - START) / (END - START)) * 10000) / 100;

// Small deterministic jitter so the crowd doesn't look like a spreadsheet.
const jitter = (i: number, span: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1) * span;

const crowd = Array.from({ length: PEOPLE }, (_, i) => {
  const col = Math.floor(i / 8);
  const row = i % 8;
  return { left: x(8.78 + col * 0.13 + jitter(i, 0.05)), bottom: row * 13 };
});

const spread = Array.from({ length: PEOPLE }, (_, i) => {
  const w = Math.floor(i / 8);
  const k = i % 8;
  return { left: x(9.12 + w + (k % 4) * 0.19 + jitter(i, 0.03)), bottom: Math.floor(k / 4) * 13 };
});

const axis = [
  { t: 9, label: "9 AM" },
  { t: 10, label: "10 AM" },
  { t: 11, label: "11 AM" },
  { t: 12, label: "12 PM" },
  { t: 13, label: "1 PM" },
];

const modes = [
  { key: "today", title: "Without OPflow", line: "Everyone arrives at 9", hall: "31", hallNote: "people in the hall at 9:30" },
  { key: "opflow", title: "With OPflow", line: "8 people an hour, by booking", hall: "7", hallNote: "people in the hall at 9:30" },
] as const;

export function WaitingHall() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const still = paused || reduced;

  useEffect(() => {
    if (!inView || still) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setMode((m) => 1 - m);
      id = setInterval(() => setMode((m) => 1 - m), 3800);
    }, 2500);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [inView, still]);

  const layout = mode === 0 ? crowd : spread;
  const current = modes[mode];

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Compare arrivals">
          {modes.map((m, i) => (
            <button
              key={m.key}
              type="button"
              role="tab"
              aria-selected={mode === i}
              onClick={() => {
                setMode(i);
                setPaused(true);
              }}
              className={`rounded-[4px] border px-4 py-2.5 text-left transition-colors ${
                mode === i ? "border-paper bg-paper text-forest" : "border-mint/30 text-mint hover:border-mint/70"
              }`}
            >
              <span className="block text-sm font-semibold">{m.title}</span>
              <span className={`block text-[13px] ${mode === i ? "text-forest/80" : "text-mint/85"}`}>{m.line}</span>
            </button>
          ))}
        </div>
        <p className="flex items-baseline gap-3" aria-live="polite">
          <span key={current.hall} className={`animate-flip-in font-mono text-5xl ${mode === 0 ? "text-[#f3a494]" : "text-leaf"}`}>
            {current.hall}
          </span>
          <span className="max-w-[9rem] text-sm leading-tight text-mint/70">{current.hallNote}</span>
        </p>
      </div>

      {/* the hall */}
      <div className="relative mt-8 h-[150px] sm:h-[170px]" aria-hidden="true">
        {/* window bands */}
        {[9, 10, 11, 12].map((t, i) => (
          <span
            key={t}
            className={`absolute inset-y-0 border-l border-dashed border-mint/20 transition-colors duration-700 ${
              mode === 1 ? (i % 2 ? "bg-white/[0.02]" : "bg-white/[0.05]") : ""
            }`}
            style={{ left: `${x(t)}%`, width: `${x(t + 1) - x(t)}%` }}
          />
        ))}

        {layout.map((p, i) => (
          // Full-width track, moved with transform only, so the animation never triggers layout.
          <span
            key={i}
            className="absolute inset-x-0 bottom-0 h-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.5,0,0.2,1)] will-change-transform"
            style={{
              transform: `translate(${p.left}%, -${p.bottom}px)`,
              transitionDelay: `${(mode === 1 ? i : PEOPLE - i) * 18}ms`,
            }}
          >
            <Person tone={mode === 0 ? "crowd" : "calm"} />
          </span>
        ))}
      </div>

      <div className="relative h-7 border-t border-mint/40">
        <PauseButton
          paused={still}
          onToggle={() => setPaused((p) => !p)}
          label="arrivals animation"
          tone="light"
          className="absolute top-8 right-0"
        />
        {axis.map((a) => (
          <span
            key={a.t}
            className={`absolute top-2 font-mono text-[11px] whitespace-nowrap text-mint/75 ${a.t === END ? "-translate-x-full" : "-translate-x-1/2"}`}
            style={{ left: `${x(a.t)}%` }}
          >
            {a.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Person({ tone }: { tone: "crowd" | "calm" }) {
  return (
    <svg
      viewBox="0 0 12 18"
      className={`absolute bottom-0 left-0 h-[18px] w-3 transition-colors duration-[1100ms] sm:h-[22px] sm:w-[15px] ${
        tone === "crowd" ? "text-[#f3a494]" : "text-leaf"
      }`}
      fill="currentColor"
    >
      <circle cx="6" cy="3.4" r="3" />
      <path d="M0.6 18v-5.2C0.6 9.4 3 7.6 6 7.6s5.4 1.8 5.4 5.2V18z" />
    </svg>
  );
}
