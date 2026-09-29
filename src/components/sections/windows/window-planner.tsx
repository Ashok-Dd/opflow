"use client";

import { useState, type ReactNode } from "react";
import { OpdClock, fmt } from "./opd-clock";

export type Booking = { w: number; seat: number };

const PER_WINDOW = 8;
const AVG_MIN = 7.5;
const initialBooked = [8, 6, 3, 1];
const labels = ["9 – 10 AM", "10 – 11 AM", "11 AM – 12 PM", "12 – 1 PM"];
const delays = [
  { min: 0, label: "On time", dot: "bg-fern" },
  { min: 15, label: "~15 min late", dot: "bg-led" },
  { min: 40, label: "~40 min late", dot: "bg-alarm" },
];

export function WindowPlanner({ intro }: { intro: ReactNode }) {
  const [booked, setBooked] = useState(initialBooked);
  const [mine, setMine] = useState<Booking | null>(null);
  const [delay, setDelay] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const book = (w: number) => {
    const next = [...initialBooked];
    if (next[w] >= PER_WINDOW) return;
    const seat = next[w];
    next[w] += 1;
    setBooked(next);
    setMine({ w, seat });
  };

  const expectedAt = mine ? 9 + mine.w + (mine.seat * AVG_MIN + delays[delay].min) / 60 : null;

  return (
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
      <div>
        {intro}

        <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Hour windows">
          {labels.map((l, w) => {
            const full = booked[w] >= PER_WINDOW && mine?.w !== w;
            const isMine = mine?.w === w;
            const open = PER_WINDOW - booked[w];
            return (
              <li key={l}>
                <button
                  type="button"
                  disabled={full}
                  onClick={() => book(w)}
                  onMouseEnter={() => setHovered(w)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(w)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={isMine}
                  className={`group w-full rounded-xl border px-4 py-3.5 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-grove/40 ${
                    full
                      ? "cursor-not-allowed border-dashed border-stone/60 bg-transparent text-stone"
                      : isMine
                        ? "border-grove bg-mint text-grove shadow-[0_6px_18px_-10px_rgba(27,77,62,0.55)]"
                        : "border-grove/15 bg-white text-ink hover:-translate-y-0.5 hover:border-grove/60 hover:shadow-[0_10px_24px_-14px_rgba(27,77,62,0.55)] active:translate-y-0"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[15px] font-medium">{l}</span>
                    <span
                      className={`text-xs font-medium ${
                        full ? "text-stone" : isMine ? "text-grove" : "text-grove/80"
                      }`}
                    >
                      {isMine ? "Yours" : full ? "Full" : `${open} of ${PER_WINDOW} open`}
                    </span>
                  </span>
                  <span className="mt-2.5 flex gap-1" aria-hidden="true">
                    {Array.from({ length: PER_WINDOW }, (_, s) => (
                      <span
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          isMine && s === mine?.seat
                            ? "bg-leaf"
                            : s < booked[w]
                              ? full
                                ? "bg-stone/50"
                                : "bg-grove"
                              : "bg-grove/12"
                        }`}
                      />
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-2xl bg-grove px-6 py-5 text-white" aria-live="polite">
          {mine && expectedAt !== null ? (
            <div key={`${mine.w}-${delay}`} className="animate-flip-in">
              <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">Your booking</p>
              <p className="mt-1 font-serif text-2xl">
                {labels[mine.w]} · Token {mine.w * PER_WINDOW + mine.seat + 1}
              </p>
              <p className="mt-1 text-white/80">
                Expected around <span className="font-mono text-leaf">{fmt(expectedAt)}</span>. Arrive by{" "}
                {fmt(9 + mine.w - 10 / 60)}.
              </p>
            </div>
          ) : (
            <p className="text-white/90">Tap an open window on the dial or in the list to book a place.</p>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm text-ink-soft">If the doctor&apos;s day changes, the red marker moves:</p>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Doctor status">
            {delays.map((d, i) => (
              <button
                key={d.label}
                type="button"
                role="radio"
                aria-checked={delay === i}
                onClick={() => {
                  setDelay(i);
                  if (!mine) book(2);
                }}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-grove/40 ${
                  delay === i
                    ? "border-grove bg-grove text-white"
                    : "border-grove/15 bg-white text-ink hover:-translate-y-0.5 hover:border-grove/60"
                }`}
              >
                <span className={`size-2.5 rounded-full ${d.dot}`} aria-hidden="true" />
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[540px]">
        <OpdClock
          labels={labels}
          booked={booked}
          mine={mine}
          expectedAt={expectedAt}
          hovered={hovered}
          onHover={setHovered}
          onBook={book}
        />
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-ink-soft">
          <Key swatch="rounded-[3px] bg-grove">Open window</Key>
          <Key swatch="rounded-[3px] border border-stone bg-white">Full</Key>
          <Key swatch="rounded-full bg-leaf">Yours</Key>
          <Key swatch="rounded-[3px] bg-alarm">Expected turn</Key>
        </div>
      </div>
    </div>
  );
}

function Key({ swatch, children }: { swatch: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block size-3 ${swatch}`} aria-hidden="true" />
      {children}
    </span>
  );
}
