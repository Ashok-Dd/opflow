"use client";

import { useEffect, useRef, useState } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SearchResults } from "./search-results";
import { search } from "./search-data";

// What the box types by itself until the visitor takes over.
const demo = [
  { text: "Fever", hint: "a symptom" },
  { text: "ENT", hint: "a specialty" },
  { text: "City Care", hint: "a hospital" },
  { text: "Chest pain", hint: "something urgent" },
];

const tryThese = ["Skin rash", "Pediatrics", "Lakeview", "Back pain", "Dr. Priya"];

export function SearchDemo() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const reduced = useReducedMotion();
  const [query, setQuery] = useState(reduced ? demo[0].text : "");
  const [hint, setHint] = useState(demo[0].hint);
  const [stopped, setStopped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoplay = inView && !stopped && !reduced;

  // Typewriter loop: type, hold, erase, next.
  useEffect(() => {
    if (!autoplay) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      for (let n = 0; !cancelled; n = (n + 1) % demo.length) {
        const { text, hint } = demo[n];
        setHint(hint);
        for (let i = 1; i <= text.length && !cancelled; i++) {
          setQuery(text.slice(0, i));
          await sleep(95);
        }
        await sleep(2600);
        for (let i = text.length - 1; i >= 0 && !cancelled; i--) {
          setQuery(text.slice(0, i));
          await sleep(35);
        }
        await sleep(350);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [autoplay]);

  const takeOver = (value: string) => {
    setStopped(true);
    setQuery(value);
  };

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-3xl">
      <label className="flex items-center gap-4 border-b-2 border-ink pb-4 focus-within:border-fern">
        <svg viewBox="0 0 20 20" className="size-6 shrink-0 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="m13 13 4 4" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Search doctors, symptoms or hospitals</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => takeOver(e.target.value)}
          onFocus={() => {
            if (!stopped) takeOver("");
          }}
          placeholder="Fever, ENT, City Care…"
          className="min-w-0 flex-1 bg-transparent font-serif text-[1.9rem] leading-none outline-none placeholder:text-ink-soft/60 sm:text-[2.6rem]"
        />
        {autoplay && (
          <span className="hidden shrink-0 font-mono text-xs tracking-[0.12em] text-fern uppercase sm:block">{hint}</span>
        )}
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-ink-soft">Try:</span>
        {tryThese.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              takeOver(t);
              inputRef.current?.focus();
            }}
            className="text-ink underline decoration-rule underline-offset-4 hover:decoration-fern"
          >
            {t}
          </button>
        ))}
        {!reduced && !stopped && (
          <PauseButton paused={false} onToggle={() => setStopped(true)} label="search demo" className="ml-auto" />
        )}
      </div>

      <div className="mt-10 min-h-[440px]" aria-live={stopped ? "polite" : "off"}>
        <SearchResults result={search(query)} />
      </div>
    </div>
  );
}
