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
const states = ["Booked", "Waiting", "With the doctor", "Done"];

export function LiveReadout({ intro }: { intro: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [serving, setServing] = useState(FIRST);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const still = paused || reduced;

  useEffect(() => {
    if (!inView || still) return;
    const id = setInterval(() => setServing((s) => (s > MY_TOKEN ? FIRST : s + 1)), 3200);
    return () => clearInterval(id);
  }, [inView, still]);

  const ahead = Math.max(0, MY_TOKEN - serving - 1);
  // What the doctor has marked for token 21, as the line moves.
  const stage = serving > MY_TOKEN ? 3 : serving === MY_TOKEN ? 2 : ahead <= 2 ? 1 : 0;
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
          {stage === 3 ? (
            <p className="font-serif text-3xl text-leaf">Visit done. Get well soon.</p>
          ) : stage === 2 ? (
            <p className="font-serif text-3xl text-leaf">It&apos;s your turn. Please go in to Room 4.</p>
          ) : ahead === 0 ? (
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

      <div className="border-t border-mint/20 pt-8 lg:col-span-12 lg:mt-6">
        <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">
          What the doctor marks, what you see · Token {MY_TOKEN}
        </p>
        <ol className="mt-5 grid grid-cols-2 gap-px bg-mint/15 sm:grid-cols-4">
          {states.map((s, i) => (
            <li
              key={s}
              aria-current={i === stage ? "step" : undefined}
              className={`relative px-4 pt-4 pb-5 transition-colors duration-500 ${i === stage ? "bg-pine" : "bg-forest"}`}
            >
              <span className={`font-mono text-[11px] ${i <= stage ? "text-leaf" : "text-mint/40"}`}>
                {i < stage ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-2 block font-serif text-xl transition-colors duration-500 sm:text-2xl ${
                  i === stage ? "text-white" : i < stage ? "text-mint/80" : "text-mint/40"
                }`}
              >
                {s}
              </span>
              <span
                className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-leaf transition-transform duration-700 ${i <= stage ? "scale-x-100" : "scale-x-0"}`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-mint/60">If you don&apos;t turn up, the doctor marks it as did not come.</p>
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
