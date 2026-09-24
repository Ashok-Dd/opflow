/* Doctor-portal screens rendered inside the phone frame (≈272 × 545). */

const card = "rounded-[10px] bg-white shadow-[0_0_0_1px_#e3e6e2]";

export function DoctorToday() {
  const queue = [
    ["16", "Lakshmi P.", "Arrived", "text-fern"],
    ["17", "Walk-in · Suresh", "Arrived", "text-fern"],
    ["18", "Ravi K.", "On the way", "text-amber"],
    ["19", "Anjali M.", "Booked", "text-ink-soft"],
  ] as const;
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-ink-soft">Today&apos;s OPD · 9 AM – 1 PM</p>
          <p className="text-lg font-semibold">Dr. Meera Iyer</p>
        </div>
        <span className="mt-1 rounded-[6px] bg-mint px-2 py-1 text-[10px] font-semibold text-pine">Running</span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
        {[
          ["18", "Online"],
          ["7", "Walk-in"],
          ["10", "Done"],
          ["15", "Waiting"],
        ].map(([n, l]) => (
          <span key={l} className={`${card} py-2`}>
            <span className="block text-base font-semibold">{n}</span>
            <span className="text-[9px] text-ink-soft">{l}</span>
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-[10px] bg-pine p-3 text-white">
        <p className="text-[10px] text-white/70">In consultation</p>
        <p className="font-semibold">
          <span className="font-mono">#15</span> · Ramesh V.
        </p>
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">Up next</p>
      <div className={`${card} mt-1.5 divide-y divide-[#e3e6e2]`}>
        {queue.map(([t, n, s, c]) => (
          <div key={t} className="flex items-center justify-between px-3 py-2">
            <span>
              <span className="font-mono text-ink-soft">#{t}</span> {n}
            </span>
            <span className={`text-[10px] font-medium ${c}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <div className="rounded-[10px] bg-ink py-3 text-center font-semibold text-white">Call next patient</div>
        <div className="grid grid-cols-2 gap-2 text-center text-[12px] font-medium">
          <span className={`${card} py-2.5`}>Pause OPD</span>
          <span className={`${card} py-2.5`}>Update delay</span>
        </div>
      </div>
    </div>
  );
}

export function DoctorDelay() {
  const options = ["On time", "10 min", "20 min", "30 min", "45 min", "1 hr"];
  return (
    <div className="relative flex h-full flex-col text-[13px]">
      <div className="px-4 pt-3 opacity-40">
        <p className="text-[11px] text-ink-soft">Today&apos;s OPD · 9 AM – 1 PM</p>
        <p className="text-lg font-semibold">Dr. Meera Iyer</p>
        <div className={`${card} mt-3 h-16`} />
        <div className={`${card} mt-2 h-24`} />
      </div>
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] bg-white px-4 pt-2.5 pb-4">
        <span className="mx-auto block h-1 w-9 rounded-full bg-[#d8dbd7]" />
        <p className="mt-3 text-base font-semibold">Update delay</p>
        <p className="text-[11px] text-ink-soft">15 patients are waiting or on the way</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[12px]">
          {options.map((o) => (
            <span
              key={o}
              className={`rounded-[8px] py-2 ${o === "20 min" ? "bg-amber font-semibold text-white" : "bg-[#f1f3f0]"}`}
            >
              {o}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-[8px] bg-[#f1f3f0] px-3 py-2.5 text-[11px] text-ink-soft">
          Note: Emergency case in progress
        </div>
        <div className="mt-3 rounded-[10px] bg-ink py-3 text-center font-semibold text-white">Notify 15 patients</div>
      </div>
    </div>
  );
}

export function DoctorSchedule() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <p className="text-[11px] text-ink-soft">City Care Hospital</p>
      <p className="text-lg font-semibold">OPD schedule</p>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">Days</p>
      <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[12px] font-medium">
        {days.map((d, i) => (
          <span key={i} className={`rounded-[8px] py-2 ${i < 6 ? "bg-pine text-white" : "bg-white text-ink-soft shadow-[0_0_0_1px_#e3e6e2]"}`}>
            {d}
          </span>
        ))}
      </div>

      <div className={`${card} mt-3 flex justify-between px-3 py-3`}>
        <span className="text-ink-soft">Hours</span>
        <span className="font-mono">9:00 AM – 1:00 PM</span>
      </div>

      <div className={`${card} mt-2 divide-y divide-[#e3e6e2]`}>
        {[
          ["Online bookings", "24"],
          ["Walk-in places", "10"],
          ["Emergency", "As needed"],
        ].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between px-3 py-3">
            <span>{l}</span>
            <span className="flex items-center gap-2">
              {v !== "As needed" && <span className="grid size-5 place-items-center rounded-full bg-[#f1f3f0] text-ink-soft">−</span>}
              <span className="font-mono font-semibold">{v}</span>
              {v !== "As needed" && <span className="grid size-5 place-items-center rounded-full bg-[#f1f3f0] text-ink-soft">+</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-[10px] bg-mint p-3 text-[11px] text-pine">
        4 windows of 6 online patients each. Walk-ins are added to the queue at reception.
      </div>

      <div className="mt-auto rounded-[10px] bg-ink py-3 text-center font-semibold text-white">Save schedule</div>
    </div>
  );
}
