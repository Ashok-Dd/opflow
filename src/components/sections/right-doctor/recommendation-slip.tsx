const picks = [
  {
    name: "Dr. Farah Siddiqui",
    detail: "Dermatology · City Care Hospital",
    reasons: ["MD Dermatology, 11 years of experience", "Treats acne, rashes and hair fall", "2.1 km from you"],
  },
  {
    name: "Dr. Anitha Varma",
    detail: "Dermatology · Sunrise Clinic",
    reasons: ["MBBS, DDVL, 8 years of experience", "Speaks Telugu, English and Hindi", "3.4 km from you"],
  },
];

/** What the patient gets after paying, drawn like the booking slip: a printed recommendation. */
export function RecommendationSlip() {
  return (
    <figure className="relative mx-auto max-w-[400px] -rotate-[0.5deg]">
      <div className="bg-white px-6 pt-6 pb-6 shadow-[0_1px_0_var(--color-rule),0_18px_30px_-18px_rgba(23,34,29,0.35)]">
        <div className="flex items-baseline justify-between border-b border-dashed border-ink/40 pb-3">
          <span className="text-[15px] font-semibold">Your OPflow recommendation</span>
          <span className="font-mono text-[13px] text-ink-soft">₹99</span>
        </div>
        <p className="border-b border-dashed border-ink/40 py-3 font-mono text-[12px] tracking-[0.08em] text-ink-soft uppercase">
          Skin doctor · near Bhimavaram
        </p>

        {picks.map((p, i) => (
          <div key={p.name} className="border-b border-dashed border-ink/40 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">Suggestion {i + 1}</p>
                <p className="mt-1 text-lg font-semibold">{p.name}</p>
                <p className="text-[14px] text-ink-soft">{p.detail}</p>
              </div>
              <span className="mt-1 shrink-0 -rotate-[6deg] border-2 border-fern px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-fern uppercase">
                OPflow recommended
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              {p.reasons.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-fern" aria-hidden="true">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="pt-4 text-[13px] leading-relaxed text-ink-soft">
          This is a recommendation, not a guarantee of treatment outcome. Book any of these doctors in the app.
        </p>
      </div>
      <div
        className="h-2"
        style={{
          background: "radial-gradient(circle at 6px 0, #fff 5.5px, transparent 6px) 0 0 / 12px 8px repeat-x",
        }}
        aria-hidden="true"
      />
      <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase">
        What you see after paying
      </figcaption>
    </figure>
  );
}
