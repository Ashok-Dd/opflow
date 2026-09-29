"use client";

import { useEffect, useRef, useState } from "react";
import { BookingSlip } from "./booking-slip";
import { RouteSteps, steps } from "./route-steps";

/** Scrolling down the stops fills in the OPD slip beside them, one field per stop. */
export function JourneyFlow() {
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

  const stage = steps.filter((_, i) => progress >= i / (steps.length - 1) - 0.02).length;

  return (
    <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <RouteSteps progress={progress} listRef={listRef} />
      </div>
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <BookingSlip stage={stage} />
        </div>
      </div>
    </div>
  );
}
