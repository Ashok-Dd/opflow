const glow = { textShadow: "0 0 12px rgba(255,178,30,0.55), 0 0 2px rgba(255,178,30,0.9)" };

/** An LED token display like the ones mounted outside OPD rooms. */
export function TokenBoard({ serving }: { serving: number }) {
  const next = [serving + 1, serving + 2, serving + 3];
  return (
    <div className="rounded-[4px] bg-[#101311] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_20px_40px_-20px_rgba(0,0,0,0.6)]">
      <div className="rounded-[2px] border border-white/5 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:4px_4px] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-led/70 uppercase">
          <span>OPD · Room 4</span>
          <span>Dr. M. Iyer</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-led/80 uppercase">Now serving</p>
            <p
              key={serving}
              className="mt-2 animate-flip-in font-mono text-[5.5rem] leading-none font-semibold text-led tabular-nums sm:text-[7rem]"
              style={glow}
            >
              {String(serving).padStart(3, "0")}
            </p>
          </div>
          <div className="pb-2 text-right">
            <p className="font-mono text-xs tracking-[0.2em] text-led/60 uppercase">Next</p>
            <div className="mt-1 space-y-0.5 font-mono text-xl text-led/70 tabular-nums">
              {next.map((n) => (
                <p key={n}>{String(n).padStart(3, "0")}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
