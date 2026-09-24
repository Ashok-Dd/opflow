"use client";

import { useState, type ReactNode } from "react";
import { OpdClock } from "./opd-clock";

export type Booking = { w: number; seat: number };

const PER_WINDOW = 8;
const AVG_MIN = 7.5;
const initialBooked = [8, 6, 3, 1];
const labels = ["9 – 10 AM", "10 – 11 AM", "11 AM – 12 PM", "12 – 1 PM"];
const delays = [
  { min: 0, label: "On time", dot: "bg-fern" },
  { min: 15, label: "~15 min late", dot: "bg-amber" },
  { min: 40, label: "~40 min late", dot: "bg-alarm" },
];

const fmt = (t: number) => {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  const hh = h > 12 ? h - 12 : h;
  return `${hh}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

export function WindowPlanner({ intro }: { intro: ReactNode }) {
  const [booked, setBooked] = useState(initialBooked);
  const [mine, setMine] = useState<Booking | null>(null);
  const [delay, setDelay] = useState(0);

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
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {intro}

          <ul className="mt-8 border-t-[1.5px] border-ink">
            {labels.map((l, w) => {
              const full = booked[w] >= PER_WINDOW && mine?.w !== w;
              const isMine = mine?.w === w;
              return (
                <li key={l}>
                  <button
                    type="button"
                    disabled={full}
                    onClick={() => book(w)}
                    className={`flex w-full items-center justify-between border-b border-rule py-3 text-left transition-colors ${
                      full ? "cursor-not-allowed text-ink-soft/50" : "hover:text-fern"
                    } ${isMine ? "text-fern" : ""}`}
                  >
                    <span className="font-mono">{l}</span>
                    <span className="text-sm">
                      {isMine ? "Your window" : full ? "Full" : `${PER_WINDOW - booked[w]} of ${PER_WINDOW} open`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 rounded-[4px] bg-forest p-5 text-paper" aria-live="polite">
            {mine && expectedAt !== null ? (
              <div key={`${mine.w}-${delay}`} className="animate-flip-in">
                <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">Your booking</p>
                <p className="mt-1 font-serif text-2xl">
                  {labels[mine.w]} · Token {mine.w * PER_WINDOW + mine.seat + 1}
                </p>
                <p className="mt-1 text-mint/80">
                  Expected around <span className="font-mono text-leaf">{fmt(expectedAt)}</span>. Arrive by{" "}
                  {fmt(9 + mine.w - 10 / 60)}.
                </p>
              </div>
            ) : (
              <p className="text-mint/80">Tap an open window on the dial or in the list to book a place.</p>
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
                  className={`flex items-center gap-2 rounded-[4px] border px-3 py-2 text-sm transition-colors ${
                    delay === i ? "border-ink bg-ink text-paper" : "border-rule bg-white hover:border-ink"
                  }`}
                >
                  <span className={`size-2 rounded-full ${d.dot}`} aria-hidden="true" />
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[520px] lg:col-span-7">
          <OpdClock booked={booked} mine={mine} expectedAt={expectedAt} onBook={book} />
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-ink-soft">
            <Key swatch="bg-forest">Open window</Key>
            <Key swatch="bg-[#cfc9b6]">Full</Key>
            <Key swatch="bg-leaf">Yours</Key>
            <Key swatch="bg-alarm">Expected turn</Key>
          </div>
        </div>
    </div>
  );
}

function Key({ swatch, children }: { swatch: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block h-2.5 w-4 ${swatch}`} aria-hidden="true" />
      {children}
    </span>
  );
}
