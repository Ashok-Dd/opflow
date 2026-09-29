"use client";

import { useEffect, useState } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { situations } from "./urgent-data";

const INTERVAL = 7000;

/** Pick what's happening; the app's first-aid page and what's open nearby follow. */
export function UrgentConsole() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const autoplay = inView && !paused && !reduced;
  const s = situations[index];

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % situations.length), INTERVAL);
    return () => clearTimeout(id);
  }, [autoplay, index]);

  // Each line of the page arrives a beat after the one above it.
  let beat = 0;
  const next = () => ({ animationDelay: `${(beat++) * 55}ms` });

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">What&apos;s happening?</p>
          {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} label="urgent care demo" />}
        </div>

        <div
          role="tablist"
          aria-label="Emergency situations"
          aria-orientation="vertical"
          className="-mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-4 lg:block lg:overflow-visible lg:border-t-[1.5px] lg:border-ink lg:pb-0"
        >
          {situations.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`urgent-tab-${item.id}`}
                aria-selected={active}
                aria-controls="urgent-panel"
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className={`group relative shrink-0 snap-start border text-left transition-colors lg:flex lg:w-full lg:items-center lg:gap-4 lg:border-0 lg:border-b lg:border-rule lg:py-3.5 lg:pr-3 lg:pl-4 ${
                  active
                    ? "border-alarm bg-alarm px-3.5 py-2 text-white lg:bg-white lg:text-ink"
                    : "border-rule bg-white px-3.5 py-2 text-ink-soft hover:text-ink lg:bg-transparent lg:hover:bg-white/70"
                }`}
              >
                <span
                  className={`absolute inset-y-0 left-0 hidden w-[3px] bg-alarm transition-opacity lg:block ${active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                />
                <span className={`hidden font-mono text-xs lg:inline ${active ? "text-alarm" : "text-ink-soft/70"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium whitespace-nowrap lg:text-[17px]">{item.title}</span>
                  <span className="hidden text-[14px] text-ink-soft lg:block">{item.line}</span>
                </span>
                <span
                  className={`hidden text-alarm transition-[opacity,translate] lg:inline ${active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                  aria-hidden="true"
                >
                  →
                </span>
                {active && autoplay && (
                  <span
                    key={index}
                    className="absolute bottom-[-1px] left-0 hidden h-[2px] w-full origin-left bg-alarm lg:block"
                    style={{ animation: `grow-x ${INTERVAL}ms linear both` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 hidden border-l-2 border-fern pl-4 lg:block">
          <p className="font-serif text-[1.3rem] leading-snug">Availability is declared, never guessed.</p>
          <p className="mt-2 text-[15px] text-ink-soft">
            A doctor appears as available only if they switched it on themselves: available now, or until a set time.
          </p>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-7">
        <article
          id="urgent-panel"
          role="tabpanel"
          aria-labelledby={`urgent-tab-${s.id}`}
          className="relative bg-white shadow-[0_1px_0_var(--color-rule),0_24px_40px_-24px_rgba(23,34,29,0.4)]"
        >
          {/* header strip */}
          <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 sm:px-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">First aid · In the app</p>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-fern uppercase">
              <span className="size-1.5 rounded-full bg-fern" aria-hidden="true" />
              Works offline
            </p>
          </div>

          <div key={s.id} className="px-5 pt-6 pb-6 sm:px-7">
            <h3 className="animate-fade-up font-serif text-[2rem] leading-none" style={next()}>
              {s.title}
            </h3>

            <div className="mt-5 flex animate-fade-up flex-col gap-4 bg-alarm p-4 text-white sm:flex-row sm:items-center sm:justify-between" style={next()}>
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">Call 108 now if</p>
                <p className="mt-1 text-[15px] leading-snug">{s.callNow}</p>
              </div>
              <a
                href="tel:108"
                className="shrink-0 self-start border-2 border-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-alarm sm:self-auto"
              >
                Call 108
              </a>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className="animate-fade-up border-b-[1.5px] border-ink pb-2 font-mono text-[11px] tracking-[0.16em] text-fern uppercase" style={next()}>
                  Do
                </p>
                <ul>
                  {s.dos.map((d) => (
                    <li key={d} className="flex animate-fade-up gap-3 border-b border-rule py-2.5 text-[15px] leading-snug" style={next()}>
                      <span className="mt-0.5 font-semibold text-fern" aria-hidden="true">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="animate-fade-up border-b-[1.5px] border-ink pb-2 font-mono text-[11px] tracking-[0.16em] text-alarm uppercase" style={next()}>
                  Don&apos;t
                </p>
                <ul>
                  {s.donts.map((d) => (
                    <li key={d} className="flex animate-fade-up gap-3 border-b border-rule py-2.5 text-[15px] leading-snug" style={next()}>
                      <span className="mt-0.5 font-semibold text-alarm" aria-hidden="true">✕</span>
                      {sentence(d.replace(/^Do not /, ""))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 animate-fade-up text-[13px] text-ink-soft" style={next()}>
              Based on: {s.source}
            </p>

            <div className="mt-7 animate-fade-up" style={next()}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">Open near you · example</p>
              <ul className="mt-2 border-t-[1.5px] border-ink">
                {s.nearby.map((p) => (
                  <li key={p.name + p.role} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule py-3">
                    <div className="min-w-0">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-ink-soft">{p.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`text-sm font-medium sm:text-right ${p.now ? "text-fern" : "text-amber"}`}>
                        {p.status}
                        <span className="block font-mono text-xs font-normal text-ink-soft">{p.km} km</span>
                      </p>
                      <span className="flex gap-1.5 text-xs font-semibold" aria-hidden="true">
                        <span className="bg-alarm px-2.5 py-1.5 text-white">Call</span>
                        <span className="border border-ink/25 px-2.5 py-1.5">Directions</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <p className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase">
          First aid steps, then what&apos;s open right now
        </p>
        <div className="mt-8 border-l-2 border-fern pl-4 lg:hidden">
          <p className="font-serif text-[1.3rem] leading-snug">Availability is declared, never guessed.</p>
          <p className="mt-2 text-[15px] text-ink-soft">
            A doctor appears as available only if they switched it on themselves: available now, or until a set time.
          </p>
        </div>
      </div>
    </div>
  );
}

const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
