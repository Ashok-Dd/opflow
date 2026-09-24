const rows: [string, string][] = [
  ["Date", "Thu, 24 Sep"],
  ["Window", "10:00 – 11:00 AM"],
  ["Arrive by", "9:50 AM"],
  ["Fee", "₹400 · Paid (UPI)"],
];

/** The confirmation, drawn as the printed OPD slip patients already know. */
export function BookingSlip() {
  return (
    <figure className="relative mx-auto max-w-[380px] rotate-[0.6deg]">
      <div className="bg-white px-6 pt-6 pb-7 font-mono text-[13px] shadow-[0_1px_0_var(--color-rule),0_18px_30px_-18px_rgba(23,34,29,0.35)]">
        <div className="flex items-baseline justify-between border-b border-dashed border-ink/40 pb-3">
          <span className="font-sans text-[15px] font-semibold">OPflow · OPD booking</span>
          <span className="text-ink-soft">OPF-0918</span>
        </div>

        <div className="border-b border-dashed border-ink/40 py-4 font-sans">
          <p className="text-lg font-semibold">Dr. Meera Iyer</p>
          <p className="text-ink-soft">General Medicine · MBBS, MD</p>
          <p className="text-ink-soft">City Care Hospital · Room 4</p>
        </div>

        <div className="flex items-end justify-between border-b border-dashed border-ink/40 py-4">
          <dl className="space-y-1.5">
            {rows.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-20 text-ink-soft uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="text-right">
            <p className="text-[11px] text-ink-soft uppercase">Token</p>
            <p className="text-5xl leading-none font-semibold">18</p>
          </div>
        </div>

        <p className="pt-4 font-sans text-[13px] leading-relaxed text-ink-soft">
          This is an expected window, not an exact time. If the doctor runs late, the app will tell you before you
          leave.
        </p>

        {/* rubber stamp */}
        <span
          className="absolute top-[4.6rem] right-6 -rotate-[9deg] border-2 border-fern px-2 py-0.5 font-sans text-sm font-semibold tracking-[0.2em] text-fern uppercase"
          aria-hidden="true"
        >
          Confirmed
        </span>
      </div>
      {/* torn bottom edge */}
      <div
        className="h-2"
        style={{
          background: "radial-gradient(circle at 6px 0, #fff 5.5px, transparent 6px) 0 0 / 12px 8px repeat-x",
        }}
        aria-hidden="true"
      />
      <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase">
        What you get after paying
      </figcaption>
    </figure>
  );
}
