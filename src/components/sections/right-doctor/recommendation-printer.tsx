"use client";

import { useEffect, useState } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { RecommendationSlip, doctorTypes } from "./recommendation-slip";

const INTERVAL = 6500;

/** Pick a type of doctor; the recommendation prints out of the slot. */
export function RecommendationPrinter() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const autoplay = inView && !paused && !reduced;
  const type = doctorTypes[index];

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % doctorTypes.length), INTERVAL);
    return () => clearTimeout(id);
  }, [autoplay, index]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[420px]">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">I need a…</p>
        {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} label="recommendation demo" />}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Type of doctor">
        {doctorTypes.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={i === index}
            onClick={() => {
              setIndex(i);
              setPaused(true);
            }}
            className={`rounded-[4px] border px-3 py-1.5 text-sm transition-colors ${
              i === index ? "border-ink bg-ink text-paper" : "border-rule bg-white text-ink hover:border-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* the printer: a slot the slip feeds out of */}
      <div className="relative mt-6">
        <div className="relative z-10 h-5 rounded-[4px] bg-ink shadow-[0_6px_12px_-6px_rgba(0,0,0,0.5)]">
          <span className="absolute inset-x-5 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-black/70" aria-hidden="true" />
          <span
            className={`absolute top-1/2 right-2 size-1.5 -translate-y-1/2 rounded-full ${inView ? "bg-leaf" : "bg-white/20"}`}
            aria-hidden="true"
          />
        </div>
        <div className="-mt-2.5 overflow-hidden px-3 pb-10">
          <div key={type.id} className={inView ? "animate-print-out" : "-translate-y-full"} aria-live="polite">
            <RecommendationSlip type={type} />
            <div
              className="h-2"
              style={{ background: "radial-gradient(circle at 6px 0, #fff 5.5px, transparent 6px) 0 0 / 12px 8px repeat-x" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <p className="-mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase">What you see after paying</p>
    </div>
  );
}
