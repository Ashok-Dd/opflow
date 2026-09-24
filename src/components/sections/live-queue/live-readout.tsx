"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { TokenBoard } from "./token-board";

const MY_TOKEN = 21;
const FIRST = 15;
const AVG_MIN = 7;
const DELAY_MIN = 10;

export function LiveReadout({ intro }: { intro: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [serving, setServing] = useState(FIRST);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const still = paused || reduced;

  useEffect(() => {
    if (!inView || still) return;
    const id = setInterval(() => setServing((s) => (s >= MY_TOKEN - 1 ? FIRST : s + 1)), 3200);
    return () => clearInterval(id);
  }, [inView, still]);

  const ahead = MY_TOKEN - serving - 1;
  const estimate = ahead * AVG_MIN + DELAY_MIN;
  const lo = Math.max(0, Math.floor((estimate - 5) / 5) * 5);
  const hi = Math.ceil((estimate + 8) / 5) * 5;

  return (
    <div ref={ref} className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        {intro}
        <div className="mt-10">
          <TokenBoard serving={serving} />
          <PauseButton
            paused={still}
            onToggle={() => setPaused((p) => !p)}
            label="token board"
            tone="light"
            className="mt-3"
          />
        </div>
      </div>

      <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
        <div className="border-t border-mint/30 font-mono text-[15px]">
          <Row label="Your token" value={String(MY_TOKEN)} strong />
          <Row label="Now serving" value={String(serving)} live />
          <Row label="Ahead of you" value={String(ahead)} live />
          <Row label="Avg. consultation today" value={`~${AVG_MIN} min`} />
          <Row label="Doctor running late" value={`${DELAY_MIN} min`} />
        </div>

        <div className="mt-8">
          {ahead === 0 ? (
            <p className="font-serif text-3xl text-leaf">You&apos;re next. Please be near Room 4.</p>
          ) : (
            <>
              <p className="font-mono text-sm text-mint/75">
                {ahead} × {AVG_MIN} min + {DELAY_MIN} min delay ≈ {estimate} min
              </p>
              <p className="mt-2 font-serif text-4xl">
                Approx. <span className="text-leaf">{lo}–{hi} min</span>
              </p>
            </>
          )}
          <p className="mt-4 text-sm text-mint/75">
            Shown as a range, because it&apos;s an estimate. It sharpens as OPflow learns how each OPD actually runs.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong, live }: { label: string; value: string; strong?: boolean; live?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-mint/20 py-3.5">
      <span className="text-mint/70">{label}</span>
      <span key={live ? value : undefined} className={`${strong ? "text-2xl text-leaf" : ""} ${live ? "animate-flip-in" : ""}`}>
        {value}
      </span>
    </div>
  );
}
