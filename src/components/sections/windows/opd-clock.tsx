"use client";

import type { Booking } from "./window-planner";

const C = 200;
const PER_WINDOW = 8;
const windowStarts = [9, 10, 11, 12];

const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  // Rounded so server and browser trig agree exactly (avoids hydration mismatches).
  const round = (v: number) => Math.round(v * 100) / 100;
  return [round(C + r * Math.sin(a)), round(C - r * Math.cos(a))] as const;
};
const angleOf = (hour: number) => (hour % 12) * 30 + (hour >= 12 && hour < 13 ? 360 : 0);

function arc(r: number, a0: number, a1: number) {
  const [x0, y0] = polar(a0, r);
  const [x1, y1] = polar(a1, r);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

export function OpdClock({
  booked,
  mine,
  expectedAt,
  onBook,
}: {
  booked: number[];
  mine: Booking | null;
  expectedAt: number | null;
  onBook: (w: number) => void;
}) {
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full select-none" role="group" aria-label="OPD clock, 9 AM to 1 PM">
      {/* dial */}
      <circle cx={C} cy={C} r={192} fill="white" stroke="var(--color-ink)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={184} fill="none" stroke="var(--color-rule)" />
      {Array.from({ length: 60 }, (_, i) => {
        const hour = i % 5 === 0;
        const [x0, y0] = polar(i * 6, hour ? 170 : 176);
        const [x1, y1] = polar(i * 6, 184);
        return (
          <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--color-ink)" strokeOpacity={hour ? 0.8 : 0.25} strokeWidth={hour ? 2 : 1} />
        );
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const h = i + 1;
        const [x, y] = polar(h * 30, 154);
        const opd = h >= 9 || h === 1;
        return (
          <text
            key={h}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-serif"
            fontSize={opd ? 22 : 17}
            fill="var(--color-ink)"
            fillOpacity={opd ? 1 : 0.3}
          >
            {h}
          </text>
        );
      })}

      {/* OPD windows as arcs with seats */}
      {windowStarts.map((start, w) => {
        const a0 = angleOf(start) + 1.2;
        const a1 = angleOf(start) + 30 - 1.2;
        const full = booked[w] >= PER_WINDOW && mine?.w !== w;
        const isMine = mine?.w === w;
        const band = isMine ? "var(--color-leaf)" : full ? "#cfc9b6" : "var(--color-forest)";
        return (
          <g
            key={start}
            role="button"
            tabIndex={full ? -1 : 0}
            aria-label={`${start > 12 ? start - 12 : start} o'clock window: ${full ? "full" : `${PER_WINDOW - booked[w]} places open`}`}
            onClick={() => !full && onBook(w)}
            onKeyDown={(e) => {
              if (!full && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onBook(w);
              }
            }}
            className={`outline-none ${full ? "cursor-not-allowed" : "cursor-pointer [&:hover>path]:opacity-85 [&:focus-visible>path]:opacity-85"}`}
          >
            <path d={arc(118, a0, a1)} stroke={band} strokeWidth="40" fill="none" className="transition-[stroke] duration-500" />
            {Array.from({ length: PER_WINDOW }, (_, s) => {
              const row = Math.floor(s / 4);
              const col = s % 4;
              const [x, y] = polar(a0 + ((a1 - a0) / 4) * (col + 0.5), row ? 106 : 130);
              const taken = s < booked[w];
              const own = isMine && s === mine?.seat;
              return (
                <circle
                  key={s}
                  cx={x}
                  cy={y}
                  r={own ? 5.5 : 4.2}
                  fill={own ? "var(--color-ink)" : taken ? (isMine ? "var(--color-forest)" : "#f4f1e8") : "none"}
                  stroke={own ? "none" : isMine ? "var(--color-forest)" : "#f4f1e8"}
                  strokeOpacity={taken ? 1 : 0.7}
                  strokeWidth="1.3"
                  className={own ? "animate-seat-pop" : ""}
                  style={own ? { transformOrigin: `${x}px ${y}px` } : undefined}
                />
              );
            })}
          </g>
        );
      })}

      {/* expected-turn marker */}
      {expectedAt !== null && (
        <g style={{ transform: `rotate(${expectedAt * 30}deg)`, transformOrigin: "200px 200px", transition: "transform 900ms cubic-bezier(0.3,0.7,0.2,1)" }}>
          <line x1={C} y1={C - 142} x2={C} y2={C - 190} stroke="var(--color-alarm)" strokeWidth="2.5" />
          <path d={`M ${C - 7} ${C - 196} L ${C + 7} ${C - 196} L ${C} ${C - 186} Z`} fill="var(--color-alarm)" />
        </g>
      )}

      {/* hands: 10:12, with a live second hand */}
      <line x1={C} y1={C} {...pt(angleOf(10.2), 52)} stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
      <line x1={C} y1={C} {...pt(72, 72)} stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      <g className="origin-center animate-[spin_60s_linear_infinite]" style={{ transformOrigin: "200px 200px" }}>
        <line x1={C} y1={C + 14} x2={C} y2={C - 80} stroke="var(--color-alarm)" strokeWidth="1.3" />
      </g>
      <circle cx={C} cy={C} r="5" fill="var(--color-ink)" />
    </svg>
  );
}

function pt(deg: number, r: number) {
  const [x2, y2] = polar(deg, r);
  return { x2, y2 };
}
