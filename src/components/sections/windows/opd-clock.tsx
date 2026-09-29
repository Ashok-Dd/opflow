"use client";

import { useInView } from "@/lib/use-in-view";
import type { Booking } from "./window-planner";

const C = 200;
const PER_WINDOW = 8;
const AVG_MIN = 7.5;
const TRACK_R = 157;
const windowStarts = [9, 10, 11, 12];
const EASE = "cubic-bezier(0.3,0.7,0.2,1)";

export const fmt = (t: number) => {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  const hh = h > 12 ? h - 12 : h;
  return `${hh}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  // Rounded so server and browser trig agree exactly (avoids hydration mismatches).
  const round = (v: number) => Math.round(v * 100) / 100;
  return [round(C + r * Math.sin(a)), round(C - r * Math.cos(a))] as const;
};

function arc(r: number, a0: number, a1: number) {
  const [x0, y0] = polar(a0, r);
  const [x1, y1] = polar(a1, r);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

const spin = (deg: number, ms: number) => ({
  transform: `rotate(${deg}deg)`,
  transformOrigin: `${C}px ${C}px`,
  transition: `transform ${ms}ms ${EASE}`,
});

export function OpdClock({
  labels,
  booked,
  mine,
  expectedAt,
  hovered,
  onHover,
  onBook,
}: {
  labels: string[];
  booked: number[];
  mine: Booking | null;
  expectedAt: number | null;
  hovered: number | null;
  onHover: (w: number | null) => void;
  onBook: (w: number) => void;
}) {
  const [ref, shown] = useInView<SVGSVGElement>(0.35);

  const isFull = (w: number) => booked[w] >= PER_WINDOW && mine?.w !== w;
  const peek = hovered !== null && !isFull(hovered) ? hovered : null;

  // Hands wind in from 9:00, rest at 10:10, preview the hovered window, and settle on your turn.
  const t = !shown
    ? 9
    : peek !== null
      ? windowStarts[peek] + (mine?.w === peek ? mine.seat : booked[peek]) * (AVG_MIN / 60)
      : (expectedAt ?? 10 + 10 / 60);

  const readout =
    hovered !== null
      ? {
          key: `h${hovered}`,
          label: labels[hovered],
          value: isFull(hovered)
            ? "Full"
            : mine?.w === hovered
              ? "Your window"
              : `${PER_WINDOW - booked[hovered]} of ${PER_WINDOW} open`,
        }
      : mine && expectedAt !== null
        ? { key: `m${expectedAt}`, label: "Expected turn", value: fmt(expectedAt) }
        : { key: "idle", label: "OPD today", value: "9 AM – 1 PM" };

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className="h-auto w-full overflow-visible select-none"
      role="group"
      aria-label="OPD clock, 9 AM to 1 PM"
    >
      <g
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.94)",
          transformOrigin: `${C}px ${C}px`,
          transition: `opacity 700ms ease, transform 900ms ${EASE}`,
        }}
      >
        {/* bezel and face */}
        <circle cx={C} cy={C} r={199} fill="var(--color-grove)" />
        {Array.from({ length: 12 }, (_, i) => {
          const [x, y] = polar(i * 30, 192.5);
          return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.2} fill="var(--color-mint)" fillOpacity={i % 3 === 0 ? 0.9 : 0.45} />;
        })}
        <circle cx={C} cy={C} r={186} fill="#ffffff" />
        <circle cx={C} cy={C} r={186} fill="none" stroke="var(--color-grove)" strokeOpacity="0.25" />

        {/* minute ticks */}
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          const [x0, y0] = polar(i * 6, major ? 170 : 175);
          const [x1, y1] = polar(i * 6, 180);
          return (
            <line
              key={i}
              x1={x0}
              y1={y0}
              x2={x1}
              y2={y1}
              stroke="var(--color-grove)"
              strokeOpacity={major ? 0.75 : 0.18}
              strokeWidth={major ? 1.8 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* quiet ring for the hours OPD is closed */}
        <circle cx={C} cy={C} r={TRACK_R} fill="none" stroke="var(--color-grove)" strokeOpacity="0.1" strokeDasharray="1 5" strokeLinecap="round" />

        {/* 12 · 3 · 6 · 9 */}
        {[12, 3, 6, 9].map((h) => {
          const [x, y] = polar((h % 12) * 30, 118);
          const opd = h === 12 || h === 9;
          return (
            <text
              key={h}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-serif"
              fontSize="34"
              fill="var(--color-grove)"
              fillOpacity={opd ? 1 : 0.3}
            >
              {h}
            </text>
          );
        })}

        {/* OPD windows: one segment per place */}
        {windowStarts.map((start, w) => {
          const full = isFull(w);
          const isMine = mine?.w === w;
          const active = hovered === w && !full;
          // Inset so the round caps of neighbouring windows never touch.
          const a0 = (start % 12) * 30 + 3.2;
          const a1 = (start % 12) * 30 + 26.8;
          const step = (a1 - a0) / PER_WINDOW;
          const taken = isMine ? booked[w] - 1 : booked[w];
          return (
            <g
              key={start}
              role="button"
              tabIndex={full ? -1 : 0}
              aria-label={`${labels[w]}: ${full ? "full" : `${PER_WINDOW - booked[w]} places open`}`}
              aria-disabled={full}
              onClick={() => !full && onBook(w)}
              onMouseEnter={() => onHover(w)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(w)}
              onBlur={() => onHover(null)}
              onKeyDown={(e) => {
                if (!full && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onBook(w);
                }
              }}
              className={`outline-none ${full ? "cursor-not-allowed" : "cursor-pointer"}`}
              style={{
                transformOrigin: `${C}px ${C}px`,
                transform: active ? "scale(1.05)" : "scale(1)",
                filter: active ? "drop-shadow(0 4px 10px rgba(27,77,62,0.35))" : "none",
                transition: `transform 400ms ${EASE}, filter 400ms ease`,
              }}
            >
              <path d={arc(TRACK_R, a0, a1)} stroke="transparent" strokeWidth="44" fill="none" />
              {/* the window's track */}
              <path
                d={arc(TRACK_R, a0, a1)}
                stroke={full ? "var(--color-stone)" : "var(--color-grove)"}
                strokeOpacity={shown ? (full ? 0.35 : active ? 0.24 : 0.12) : 0}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                style={{ transition: `stroke-opacity 500ms ease ${shown ? 300 + w * 120 : 0}ms` }}
              />
              {/* places taken, drawn in like a progress bar */}
              {taken > 0 && (
                <path
                  d={arc(TRACK_R, a0, a0 + taken * step)}
                  stroke={full ? "var(--color-stone)" : "var(--color-grove)"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={shown ? 0 : 1}
                  style={{ transition: `stroke-dashoffset 900ms ${EASE} ${shown ? 500 + w * 160 : 0}ms` }}
                />
              )}
              {/* your place */}
              {isMine && mine && (
                <path
                  d={arc(TRACK_R, a0 + mine.seat * step + 0.6, a0 + (mine.seat + 1) * step - 0.6)}
                  stroke="var(--color-leaf)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-seat-pop"
                  style={{ transformOrigin: `${polar(a0 + (mine.seat + 0.5) * step, TRACK_R).join("px ")}px` }}
                />
              )}
              {/* hairline dividers between places */}
              {Array.from({ length: PER_WINDOW - 1 }, (_, k) => {
                const [x0, y0] = polar(a0 + (k + 1) * step, TRACK_R - 6);
                const [x1, y1] = polar(a0 + (k + 1) * step, TRACK_R + 6);
                return <line key={k} x1={x0} y1={y0} x2={x1} y2={y1} stroke="white" strokeWidth="1.2" />;
              })}
            </g>
          );
        })}

        {/* expected turn */}
        {expectedAt !== null && (
          <g style={spin(expectedAt * 30, 1000)} pointerEvents="none">
            <path d={`M ${C - 6} ${C - 186} L ${C + 6} ${C - 186} L ${C} ${C - 175} Z`} fill="var(--color-alarm)" />
            <circle
              cx={C}
              cy={C - TRACK_R}
              r="5"
              fill="none"
              stroke="var(--color-alarm)"
              strokeWidth="1.5"
              className="animate-pulse-ring"
              style={{ transformOrigin: `${C}px ${C - TRACK_R}px` }}
            />
            <circle cx={C} cy={C - TRACK_R} r="4.5" fill="var(--color-alarm)" stroke="white" strokeWidth="1.5" />
          </g>
        )}

        {/* hands */}
        <g pointerEvents="none">
          <g style={spin(t * 30, 1200)}>
            <path d={`M ${C - 4.5} ${C + 16} L ${C - 2.6} ${C - 70} L ${C} ${C - 78} L ${C + 2.6} ${C - 70} L ${C + 4.5} ${C + 16} Z`} fill="var(--color-grove)" />
          </g>
          <g style={spin(t * 360, 1200)}>
            <path d={`M ${C - 3} ${C + 20} L ${C - 1.6} ${C - 112} L ${C} ${C - 120} L ${C + 1.6} ${C - 112} L ${C + 3} ${C + 20} Z`} fill="var(--color-grove)" />
          </g>
          <g className={shown ? "animate-[spin_60s_linear_infinite]" : ""} style={{ transformOrigin: `${C}px ${C}px` }}>
            <line x1={C} y1={C + 28} x2={C} y2={C - 132} stroke="var(--color-alarm)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx={C} cy={C + 22} r="3.5" fill="var(--color-alarm)" />
          </g>
          <circle cx={C} cy={C} r="7" fill="var(--color-grove)" />
          <circle cx={C} cy={C} r="3.2" fill="var(--color-cream)" />
          <circle cx={C} cy={C} r="1.6" fill="var(--color-alarm)" />
        </g>

        {/* readout, in its own window on the face so the hands pass beneath it */}
        <rect x={C - 84} y={224} width={168} height={58} rx={4} fill="#ffffff" stroke="var(--color-grove)" strokeOpacity="0.14" pointerEvents="none" />
        <g key={readout.key} className="animate-fade-up" aria-hidden="true">
          <text x={C} y={242} textAnchor="middle" className="font-mono" fontSize="9.5" letterSpacing="1.8" fill="var(--color-grove)" fillOpacity="0.6">
            {readout.label.toUpperCase()}
          </text>
          <text x={C} y={268} textAnchor="middle" className="font-serif" fontSize="22" fill="var(--color-grove)">
            {readout.value}
          </text>
        </g>
      </g>
    </svg>
  );
}
