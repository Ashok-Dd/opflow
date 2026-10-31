const WIDTH = 1200;
const TEETH = 90;

/** Stable pseudo-random value in [0, 1) so the tear looks hand-made but never changes between renders. */
function noise(i: number) {
  const s = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return s - Math.floor(s);
}

// The ragged lower edge of a sheet: a flat top, and a bottom that wanders between 3 and 13 units down.
const path = (() => {
  const points = Array.from({ length: TEETH + 1 }, (_, i) => `${((i / TEETH) * WIDTH).toFixed(1)} ${(3 + noise(i) * 10).toFixed(1)}`);
  return `M0 0 L${points.join(" L")} L${WIDTH} 0 Z`;
})();

/**
 * The torn edge of a sheet of paper, drawn on the border between two sections. Colour it with a text colour
 * class (it fills with currentColor) matching the section it belongs to. The parent must be `relative`.
 *
 * `bottom` hangs the ragged edge below its section; `top` pokes it up above its section.
 */
export function TornEdge({ side, className = "" }: { side: "top" | "bottom"; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} 14`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-10 h-3 w-full fill-current sm:h-3.5 ${
        side === "bottom" ? "top-full" : "bottom-full -scale-y-100"
      } ${className}`}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
