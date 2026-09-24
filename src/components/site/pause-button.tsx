"use client";

/** Small play/pause control for auto-moving demos (WCAG 2.2.2). */
export function PauseButton({
  paused,
  onToggle,
  label,
  tone = "ink",
  className = "",
}: {
  paused: boolean;
  onToggle: () => void;
  label: string;
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={`${paused ? "Play" : "Pause"} ${label}`}
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
        tone === "light" ? "text-mint hover:text-white" : "text-ink-soft hover:text-ink"
      } ${className}`}
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M2.5 1.5v9l8-4.5z" /> : <path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z" />}
      </svg>
      {paused ? "Play" : "Pause"}
    </button>
  );
}
