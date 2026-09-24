/** A ruled index card, pinned slightly askew; it straightens and lifts on hover. */
export function RuleCard({ index, title, text, tilt }: { index: number; title: string; text: string; tilt: number }) {
  return (
    <article
      className="group relative flex h-full min-h-[250px] flex-col rounded-[3px] bg-white pt-5 pr-6 pb-6 pl-12 shadow-[0_1px_0_rgba(23,34,29,0.08),0_10px_24px_-14px_rgba(23,34,29,0.35)] transition-[transform,box-shadow] duration-300 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-6px)] hover:shadow-[0_1px_0_rgba(23,34,29,0.08),0_22px_36px_-18px_rgba(23,34,29,0.45)]"
      style={
        {
          "--tilt": `${tilt}deg`,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(29,127,85,0.13) 31px 32px)",
          backgroundPositionY: "46px",
        } as React.CSSProperties
      }
    >
      {/* red margin line */}
      <span className="absolute inset-y-0 left-8 w-px bg-alarm/45" aria-hidden="true" />
      {/* tape */}
      <span
        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-leaf/35"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase">Rule {String(index).padStart(2, "0")}</span>
        <span className="rotate-[-6deg] border-[1.5px] border-alarm/70 px-1.5 py-px font-mono text-[10px] font-semibold tracking-[0.18em] text-alarm/80 uppercase">
          Never
        </span>
      </div>

      <h3 className="mt-5 font-serif text-[1.45rem] leading-[1.25]">
        <span className="text-ink-soft italic">We won&apos;t</span> {title.charAt(0).toLowerCase() + title.slice(1)}
      </h3>
      <p className="mt-auto pt-5 text-[15px] leading-[32px] text-ink-soft">{text}</p>
    </article>
  );
}
