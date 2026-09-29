import type { ReactNode } from "react";

/**
 * The confirmation, drawn as the printed OPD slip patients already know.
 * `stage` is how many of the seven stops are done; each one fills its part of the form.
 */
export function BookingSlip({ stage }: { stage: number }) {
  const confirmed = stage >= 6;

  const rows: [string, ReactNode, number][] = [
    ["Date", "Thu, 24 Sep", 3],
    ["Window", "10:00 – 11:00 AM", 3],
    ["Arrive by", "9:50 AM", 3],
    ["Note", "Fever for two days", 4],
    [
      "Fee",
      stage >= 5 ? (
        <>
          ₹400 · <span className="text-fern">Paid (UPI)</span>
        </>
      ) : (
        "₹400"
      ),
      2,
    ],
  ];

  return (
    <figure className="relative mx-auto max-w-[380px] rotate-[0.6deg]">
      <div className="relative bg-white px-6 pt-6 pb-7 font-mono text-[13px] shadow-[0_1px_0_var(--color-rule),0_18px_30px_-18px_rgba(23,34,29,0.35)]">
        <div className="flex items-baseline justify-between border-b border-dashed border-ink/40 pb-3">
          <span className="font-sans text-[15px] font-semibold">OPflow · OPD booking</span>
          <Field on={confirmed} w="w-16">
            <span className="text-ink-soft">OPF-0918</span>
          </Field>
        </div>

        <div className="space-y-0.5 border-b border-dashed border-ink/40 py-4 font-sans">
          <Field on={stage >= 1} w="w-40" h="h-7">
            <p className="text-lg font-semibold">Dr. Meera Iyer</p>
          </Field>
          <Field on={stage >= 1} w="w-48" h="h-[22px]">
            <p className="text-ink-soft">General Medicine · MBBS, MD</p>
          </Field>
          <Field on={stage >= 2} w="w-44" h="h-[22px]">
            <p className="text-ink-soft">City Care Hospital · Room 4</p>
          </Field>
        </div>

        <div className="flex items-end justify-between gap-4 border-b border-dashed border-ink/40 py-4">
          <dl className="space-y-1.5">
            {rows.map(([k, v, at]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-20 shrink-0 text-ink-soft uppercase">{k}</dt>
                <dd>
                  <Field on={stage >= at} w="w-28">
                    <span key={String(stage >= 5 && k === "Fee")} className="animate-fade-up">
                      {v}
                    </span>
                  </Field>
                </dd>
              </div>
            ))}
          </dl>
          <div className="text-right">
            <p className="text-[11px] text-ink-soft uppercase">Token</p>
            <p className="mt-1 text-5xl leading-none font-semibold">
              {confirmed ? <span className="inline-block animate-fade-up">18</span> : <span className="text-ink/15">—</span>}
            </p>
          </div>
        </div>

        <p className="pt-4 font-sans text-[13px] leading-relaxed text-ink-soft">
          This is an expected window, not an exact time. If the doctor runs late, the app will tell you before you
          leave.
        </p>

        {confirmed && (
          <span
            className="absolute top-[4.6rem] right-6 animate-stamp-in border-2 border-fern px-2 py-0.5 font-sans text-sm font-semibold tracking-[0.2em] text-fern uppercase [--stamp-tilt:-9deg]"
            aria-hidden="true"
          >
            Confirmed
          </span>
        )}
      </div>

      {/* torn bottom edge */}
      <div
        className="h-2"
        style={{ background: "radial-gradient(circle at 6px 0, #fff 5.5px, transparent 6px) 0 0 / 12px 8px repeat-x" }}
        aria-hidden="true"
      />

      {/* the live line, once the slip exists */}
      <div
        className={`mx-3 mt-3 flex items-center justify-between bg-forest px-4 py-3 font-mono text-[12px] text-mint transition-[opacity,translate] duration-500 ${
          stage >= 7 ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
        aria-hidden={stage < 7}
      >
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-leaf/70" />
            <span className="relative size-2 rounded-full bg-leaf" />
          </span>
          LIVE · Now serving 14
        </span>
        <span>
          <span className="text-leaf">3 ahead</span> · ~25 min
        </span>
      </div>

      <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase" aria-live="polite">
        {confirmed ? "What you get after paying" : `Filling in as you go · ${stage} of 7`}
      </figcaption>
    </figure>
  );
}

/** A form field: a dotted blank until its stop is reached, then the printed value. */
function Field({ on, w, h = "h-5", children }: { on: boolean; w: string; h?: string; children: ReactNode }) {
  if (on) return <div className="animate-fade-up">{children}</div>;
  return <span className={`block ${w} ${h} border-b border-dotted border-ink/30`} aria-hidden="true" />;
}
