import type { RefObject } from "react";

export const steps = [
  { title: "Find a doctor", text: "By specialty, by symptom or by hospital." },
  { title: "Open their profile", text: "Qualifications, fee, hospital, OPD days and which windows still have room." },
  { title: "Pick a date and a window", text: "Full windows are greyed out. Take the next one with space." },
  { title: "Add a note for the doctor", text: "Why you're coming, in a line: fever for two days, a follow-up visit. It's optional." },
  { title: "Pay online", text: "Through Cashfree. The booking is confirmed only after we verify the payment on our side." },
  { title: "Get your slip", text: "Token number, window and the time to reach the hospital." },
  { title: "Follow the queue", text: "Delays and your turn, live, until you walk into the room." },
];

/** The seven stops, with a line that fills as the page scrolls. `progress` runs 0 → 1. */
export function RouteSteps({ progress, listRef }: { progress: number; listRef: RefObject<HTMLOListElement | null> }) {
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
