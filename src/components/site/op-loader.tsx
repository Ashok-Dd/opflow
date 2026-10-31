/**
 * The OPflow loader, the same as the app's and the doctor website's: a one-second loop where the O ring draws,
 * the P follows, a heartbeat runs across the O, then it fades and starts again. It stands still with "reduce
 * motion". The drawing is in globals.css (.op-loader).
 */
export function OpLoader({ size = 64, label }: { size?: number; label: string }) {
  const color = "var(--color-forest)";
  return (
    <svg className="op-loader" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label}>
      <g className="op-fade">
        <path className="op-ring" pathLength={1} d="M30 28.5a21.5 21.5 0 1 1 0 43a21.5 21.5 0 1 1 0 -43" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" />
        <path className="op-stem" pathLength={1} d="M64 28.5V80" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" />
        <path className="op-bowl" pathLength={1} d="M64 28.5h10a13.5 13.5 0 0 1 0 27H64" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <path className="op-beat" pathLength={1} d="M14.95 50h8.6l2.8 4.73 3.44-15.48 3.65 20.21 3.01-9.46h8.6" fill="none" stroke="var(--color-fern)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
