"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { title: "Find a doctor", text: "By specialty, by symptom or by hospital." },
  { title: "Open their profile", text: "Qualifications, fee, hospital, OPD days and which windows still have room." },
  { title: "Pick a date and a window", text: "Full windows are greyed out. Take the next one with space." },
  { title: "Say who's coming", text: "You, your child or a parent. Just the details the clinic needs." },
  { title: "Pay online", text: "Through Cashfree. The booking is confirmed only after we verify the payment on our side." },
  { title: "Get your slip", text: "Token number, window and the time to reach the hospital." },
  { title: "Follow the queue", text: "Delays and your turn, live, until you walk into the room." },
];

export function RouteSteps() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (anchor - r.top) / r.height)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative">
      {/* track + fill */}
      <span className="absolute top-3 bottom-3 left-[15px] w-[2px] bg-rule" aria-hidden="true" />
      <span
        className="absolute top-3 left-[15px] w-[2px] bg-fern"
        style={{ height: `calc((100% - 1.5rem) * ${progress})` }}
        aria-hidden="true"
      />

      {steps.map((s, i) => {
        const reached = progress >= i / (steps.length - 1) - 0.02;
        return (
          <li key={s.title} className="relative flex gap-6 pb-9 last:pb-0">
            <span
              className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs transition-colors duration-300 ${
                reached ? "border-fern bg-fern text-white" : "border-rule bg-paper text-ink-soft"
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className={`font-serif text-[1.4rem] leading-tight transition-colors duration-300 ${reached ? "text-ink" : "text-ink-soft"}`}>
                {s.title}
              </p>
              <p className="mt-1.5 max-w-md text-ink-soft">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
