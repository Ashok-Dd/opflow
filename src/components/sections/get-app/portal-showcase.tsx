"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { PauseButton } from "@/components/site/pause-button";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { PhoneFrame } from "./phone-frame";
import { DoctorDelay, DoctorSchedule, DoctorToday } from "./screens/doctor-screens";
import { PatientHome, PatientLive, PatientWindows } from "./screens/patient-screens";

type Screen = { title: string; text: string; Component: ComponentType };

const portals: Record<"patient" | "doctor", { label: string; screens: Screen[] }> = {
  patient: {
    label: "Patient portal",
    screens: [
      { title: "Home", text: "Search three ways, reach urgent care, see today's booking.", Component: PatientHome },
      { title: "Choose a window", text: "Pick a date and an hour that still has room.", Component: PatientWindows },
      { title: "Live queue", text: "Token, people ahead, and an honest wait estimate.", Component: PatientLive },
    ],
  },
  doctor: {
    label: "Doctor & clinic portal",
    screens: [
      { title: "Today's OPD", text: "Who's in, who's next, and one big button to call them.", Component: DoctorToday },
      { title: "Update delay", text: "One tap, and everyone waiting knows.", Component: DoctorDelay },
      { title: "Schedule & capacity", text: "Days, hours, online and walk-in numbers.", Component: DoctorSchedule },
    ],
  },
};

const INTERVAL = 4500;

export function PortalShowcase({ intro, footer }: { intro: ReactNode; footer: ReactNode }) {
  const [portal, setPortal] = useState<"patient" | "doctor">("patient");
  const [index, setIndex] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const autoplay = inView && !paused && !reduced;
  const { screens } = portals[portal];

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % screens.length), INTERVAL);
    return () => clearTimeout(id);
  }, [autoplay, index, portal, screens.length]);

  const switchPortal = (p: "patient" | "doctor") => {
    setPortal(p);
    setIndex(0);
  };

  return (
    <div ref={ref} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-6">
        {intro}

        <div className="mt-10 flex gap-6 border-b border-ink/20" role="tablist" aria-label="Portal">
          {(Object.keys(portals) as ("patient" | "doctor")[]).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={portal === p}
              onClick={() => switchPortal(p)}
              className={`-mb-px border-b-2 pb-3 font-medium transition-colors ${
                portal === p ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {portals[p].label}
            </button>
          ))}
        </div>

        <ol className="mt-2">
          {screens.map((s, i) => (
            <li key={`${portal}-${s.title}`}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className="relative flex w-full gap-5 border-b border-ink/10 py-4 text-left"
              >
                <span className={`font-mono text-sm ${i === index ? "text-forest" : "text-ink-soft"}`}>0{i + 1}</span>
                <span>
                  <span className={`block font-serif text-xl ${i === index ? "" : "text-ink-soft"}`}>{s.title}</span>
                  <span className="mt-0.5 block text-[15px] text-ink-soft">
                    {s.text}
                  </span>
                </span>
                {i === index && autoplay && (
                  <span
                    key={`${portal}-${index}`}
                    className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-fern"
                    style={{ animation: `grow-x ${INTERVAL}ms linear both` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ol>

        {footer}
      </div>

      <div className="relative lg:col-span-6">
        <PhoneFrame>
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.3,0.7,0.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {screens.map(({ title, Component }) => (
              <div
                key={`${portal}-${title}`}
                className="h-full w-full shrink-0"
                aria-hidden={title !== screens[index].title}
                // Hide off-screen slides once the slide-out finishes, so they aren't read or tabbed to.
                style={{
                  visibility: title === screens[index].title ? "visible" : "hidden",
                  transition: `visibility 0s linear ${title === screens[index].title ? "0s" : "500ms"}`,
                }}
              >
                <Component />
              </div>
            ))}
          </div>
        </PhoneFrame>
        <div className="mt-6 flex items-center justify-center gap-5">
          <span className="flex gap-2" aria-hidden="true">
            {screens.map((s, i) => (
              <span key={s.title} className={`h-1.5 transition-all ${i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"}`} />
            ))}
          </span>
          {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} label="app screens" />}
        </div>
      </div>
    </div>
  );
}
