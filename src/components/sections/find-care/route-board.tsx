"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { doctors, specialties, type Doctor, type Result } from "./search-data";

const MAX_DOCTORS = 4;

const kindLabel: Record<string, string> = {
  symptom: "A symptom",
  specialty: "A specialty",
  hospital: "A hospital",
  doctor: "A doctor",
};

type Route = { kind: string; lit: string[]; list: Doctor[]; more: number; note?: string };

function toRoute(result: Result, query: string): Route | null {
  const cut = (all: Doctor[]) => ({ list: all.slice(0, MAX_DOCTORS), more: Math.max(0, all.length - MAX_DOCTORS) });
  switch (result.kind) {
    case "symptom":
      return { kind: "symptom", lit: result.specialties, ...cut(result.doctors), note: "A signpost to the right kind of doctor, not a diagnosis." };
    case "specialty": {
      const byName = doctors.some((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()));
      return { kind: byName && query.trim().length > 2 ? "doctor" : "specialty", lit: [result.specialty], ...cut(result.doctors) };
    }
    case "hospital":
      return {
        kind: "hospital",
        lit: [...new Set(result.doctors.map((d) => d.specialty))],
        ...cut(result.doctors),
        note: `${result.hospital.area} · ${result.hospital.km} km · ${result.hospital.status}`,
      };
    default:
      return null;
  }
}

type Pt = { x: number; y: number };
type Line = { key: string; d: string; delay: number; a: Pt; b: Pt };

/**
 * The search, drawn as a route: what you typed → the departments it points to → doctors with their next window.
 * Lines are measured from the real elements, so they follow the layout at any width.
 */
export function RouteBoard({ result, query }: { result: Result; query: string }) {
  const route = toRoute(result, query);
  const boardRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const routeKey = route ? `${route.kind}|${route.lit.join()}|${route.list.map((d) => d.name).join()}` : result.kind;

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const measure = () => {
      const box = board.getBoundingClientRect();
      const at = (key: string, side: "l" | "r") => {
        const el = board.querySelector(`[data-node="${CSS.escape(key)}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: (side === "l" ? r.left : r.right) - box.left, y: r.top + r.height / 2 - box.top };
      };
      const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dx = (b.x - a.x) / 2;
        return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
      };
      const next: Line[] = [];
      if (route) {
        const from = at("query", "r");
        route.lit.forEach((s, i) => {
          const to = at(`dept:${s}`, "l");
          if (from && to) next.push({ key: `q-${s}`, d: curve(from, to), delay: 150 + i * 90, a: from, b: to });
        });
        route.list.forEach((d, i) => {
          const a = at(`dept:${d.specialty}`, "r");
          const b = at(`doc:${d.name}`, "l");
          if (a && b) next.push({ key: `d-${d.name}`, d: curve(a, b), delay: 550 + i * 110, a, b });
        });
      }
      setLines(next);
    };
    const raf = requestAnimationFrame(measure);
    // Cards slide in; measure again once they have settled.
    const settle = setTimeout(measure, 1500);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(board);
    const q = board.querySelector('[data-node="query"]');
    if (q) ro.observe(q);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      ro.disconnect();
    };
    // routeKey captures everything the lines depend on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  if (result.kind === "urgent") {
    return (
      <div className="grid animate-flip-in gap-6 bg-alarm p-6 text-white sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase">No booking for this one</p>
          <p className="mt-3 font-serif text-[2rem] leading-[1.1] sm:text-[2.6rem]">
            {cap(result.symptom)} can be serious. Don&apos;t wait for an OPD window.
          </p>
          <p className="mt-3 max-w-xl text-white/85">
            OPflow sends you to urgent care instead: call 112 or 108, or find an emergency department that&apos;s open
            now.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <a href="tel:112" className="bg-white px-5 py-3 font-semibold text-alarm">
            Call 112
          </a>
          <a href="#urgent" className="border-2 border-white px-5 py-3 font-semibold">
            Urgent care ↓
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={boardRef} className="relative grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      {/* route lines (desktop) */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" aria-hidden="true">
        {lines.map((l) => (
          <g key={`${routeKey}:${l.key}`}>
            <path d={l.d} fill="none" stroke="var(--color-rule)" strokeWidth="1" />
            <path
              d={l.d}
              fill="none"
              stroke="var(--color-fern)"
              strokeWidth="1.75"
              pathLength={1}
              strokeDasharray="1"
              style={{ animation: `draw-line 700ms cubic-bezier(0.4,0,0.2,1) ${l.delay}ms both` }}
            />
            <circle cx={l.a.x} cy={l.a.y} r="3" fill="var(--color-fern)" />
            <circle
              cx={l.b.x}
              cy={l.b.y}
              r="3"
              fill="white"
              stroke="var(--color-fern)"
              strokeWidth="1.5"
              className="animate-fade-up"
              style={{ animationDelay: `${l.delay + 600}ms` }}
            />
          </g>
        ))}
      </svg>

      {/* 1 · what you typed */}
      <div className="lg:self-center">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">You typed</p>
        <div
          data-node="query"
          className={`mt-3 border-l-[3px] bg-paper px-5 py-4 transition-colors ${route ? "border-fern" : "border-rule"}`}
        >
          {route ? (
            <div key={routeKey} className="animate-fade-up">
              <p className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">{kindLabel[route.kind]}</p>
              <p className="mt-1 font-serif text-[1.9rem] leading-tight break-words">{query.trim() ? cap(query.trim()) : "…"}</p>
              {route.note && <p className="mt-2 text-sm text-ink-soft">{route.note}</p>}
            </div>
          ) : (
            <p className="py-2 text-ink-soft">
              {result.kind === "none" ? "Nothing matches that yet. Try a symptom like “cough”." : "Start typing above."}
            </p>
          )}
        </div>
      </div>

      {/* 2 · department directory */}
      <div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">Points you to</p>
        <div className="mt-3 bg-forest p-2 shadow-[0_20px_40px_-24px_rgba(11,58,46,0.6)]">
          <div className="flex items-center justify-between border-b border-mint/20 px-3 pt-1.5 pb-2.5 font-mono text-[10px] tracking-[0.18em] text-mint/70 uppercase">
            <span>OPD directory</span>
            <span>Room</span>
          </div>
          <ul className="grid grid-cols-2 gap-px lg:grid-cols-1">
            {specialties.map((s, i) => {
              const lit = route?.lit.includes(s) ?? false;
              return (
                <li
                  key={s}
                  data-node={`dept:${s}`}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 text-[15px] transition-[background-color,color] duration-500 ${
                    lit ? "bg-paper text-ink" : route ? "text-mint/40" : "text-mint/85"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={`size-1.5 shrink-0 transition-colors duration-500 ${lit ? "bg-fern" : "bg-mint/30"}`} aria-hidden="true" />
                    <span className="truncate">{s}</span>
                  </span>
                  <span className={`hidden font-mono text-xs sm:inline ${lit ? "text-fern" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* 3 · doctors with their next window */}
      <div className="lg:self-center">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">Next open window</p>
        <ul className="mt-3 space-y-3">
          {route?.list.map((d, i) => (
            <li
              key={`${routeKey}:${d.name}`}
              data-node={`doc:${d.name}`}
              className="flex animate-fade-up items-center justify-between gap-4 bg-white px-4 py-3 shadow-[0_1px_0_var(--color-rule),0_10px_20px_-14px_rgba(23,34,29,0.35)]"
              style={{ animationDelay: `${600 + i * 110}ms` }}
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{d.name}</span>
                <span className="block truncate text-sm text-ink-soft">{d.hospital}</span>
              </span>
              <span className="shrink-0 bg-mint px-2.5 py-1.5 text-right">
                <span className="block font-mono text-[9px] tracking-[0.14em] text-ink-soft uppercase">Next</span>
                <span className="block text-[13px] font-medium whitespace-nowrap text-forest">{d.next}</span>
              </span>
            </li>
          ))}
          {route && route.more > 0 && (
            <li className="animate-fade-up px-1 font-mono text-xs text-ink-soft" style={{ animationDelay: "1100ms" }}>
              + {route.more} more in the app
            </li>
          )}
          {!route && (
            <li className="border border-dashed border-rule px-4 py-6 text-center text-sm text-ink-soft">
              Doctors and their next window appear here.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
