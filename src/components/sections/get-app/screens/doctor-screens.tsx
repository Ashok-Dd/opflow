"use client";

import { useT } from "@/lib/i18n/context";

/* Doctor-portal screens rendered inside the phone frame (≈272 × 545). */

const card = "rounded-[10px] bg-white shadow-[0_0_0_1px_#e3e6e2]";

export function DoctorToday() {
  const { t } = useT();
  const queue = [
    ["16", "Lakshmi P.", "Waiting", "text-fern"],
    ["17", "Suresh V.", "Waiting", "text-fern"],
    ["18", "Ravi K.", "Not here yet", "text-amber"],
    ["19", "Anjali M.", "Booked · 11 AM", "text-ink-soft"],
  ] as const;
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-ink-soft">{t("Today's OPD · 9 AM – 1 PM")}</p>
          <p className="text-lg font-semibold">{t("Dr. Meera Iyer")}</p>
        </div>
        <span className="mt-1 rounded-[6px] bg-mint px-2 py-1 text-[10px] font-semibold text-pine">{t("Running")}</span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
        {[
          ["18", "Online"],
          ["7", "Walk-in"],
          ["10", "Done"],
          ["15", "Waiting"],
        ].map(([n, label]) => (
          <span key={label} className={`${card} py-2`}>
            <span className="block text-base font-semibold">{n}</span>
            <span className="text-[9px] text-ink-soft">{t(label)}</span>
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-[10px] bg-pine p-3 text-white">
        <p className="text-[10px] text-white/70">{t("In consultation")}</p>
        <p className="font-semibold">
          <span className="font-mono">#15</span> · {t("Ramesh V.")}
        </p>
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">{t("Up next")}</p>
      <div className={`${card} mt-1.5 divide-y divide-[#e3e6e2]`}>
        {queue.map(([token, name, status, color]) => (
          <div key={token} className="flex items-center justify-between px-3 py-2">
            <span>
              <span className="font-mono text-ink-soft">#{token}</span> {t(name)}
            </span>
            <span className={`text-[10px] font-medium ${color}`}>{t(status)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <div className="rounded-[10px] bg-ink py-3 text-center font-semibold text-white">{t("Call next patient")}</div>
        <div className="grid grid-cols-2 gap-2 text-center text-[12px] font-medium">
          <span className={`${card} py-2.5`}>{t("Pause OPD")}</span>
          <span className={`${card} py-2.5`}>{t("Update delay")}</span>
        </div>
      </div>
    </div>
  );
}

export function DoctorDelay() {
  const { t, tf } = useT();
  const options = ["On time", "10 min", "20 min", "30 min", "45 min", "1 hr"];
  return (
    <div className="relative flex h-full flex-col text-[13px]">
      <div className="px-4 pt-3 opacity-40">
        <p className="text-[11px] text-ink-soft">{t("Today's OPD · 9 AM – 1 PM")}</p>
        <p className="text-lg font-semibold">{t("Dr. Meera Iyer")}</p>
        <div className={`${card} mt-3 h-16`} />
        <div className={`${card} mt-2 h-24`} />
      </div>
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] bg-white px-4 pt-2.5 pb-4">
        <span className="mx-auto block h-1 w-9 rounded-full bg-[#d8dbd7]" />
        <p className="mt-3 text-base font-semibold">{t("Update delay")}</p>
        <p className="text-[11px] text-ink-soft">{tf("{0} patients are waiting or on the way", 15)}</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[12px]">
          {options.map((o) => (
            <span
              key={o}
              className={`rounded-[8px] py-2 ${o === "20 min" ? "bg-amber font-semibold text-white" : "bg-[#f1f3f0]"}`}
            >
              {t(o)}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-[8px] bg-[#f1f3f0] px-3 py-2.5 text-[11px] text-ink-soft">
          {t("Note: Emergency case in progress")}
        </div>
        <div className="mt-3 rounded-[10px] bg-ink py-3 text-center font-semibold text-white">{tf("Notify {0} patients", 15)}</div>
      </div>
    </div>
  );
}

export function DoctorSchedule() {
  const { lang, t } = useT();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <p className="text-[11px] text-ink-soft">{t("City Care Hospital")}</p>
      <p className="text-lg font-semibold">{t("OPD schedule")}</p>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">{t("Days")}</p>
      <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[12px] font-medium">
        {days.map((d, i) => (
          <span key={d} className={`rounded-[8px] py-2 ${i < 6 ? "bg-pine text-white" : "bg-white text-ink-soft shadow-[0_0_0_1px_#e3e6e2]"}`}>
            {lang === "en" ? d[0] : t(`${d} short`)}
          </span>
        ))}
      </div>

      <div className={`${card} mt-3 flex justify-between px-3 py-3`}>
        <span className="text-ink-soft">{t("Hours")}</span>
        <span className="font-mono">{t("9:00 AM – 1:00 PM")}</span>
      </div>

      <div className={`${card} mt-2 divide-y divide-[#e3e6e2]`}>
        {[
          ["Patients each hour", "6"],
          ["Bookings open", "14 days ahead"],
          ["Emergency patients", "When you switch it on"],
        ].map(([label, value]) => {
          const shown = t(value);
          return (
            <div key={label} className="flex items-center justify-between px-3 py-3">
              <span>{t(label)}</span>
              <span className="flex items-center gap-2">
                {label === "Patients each hour" && <span className="grid size-5 place-items-center rounded-full bg-[#f1f3f0] text-ink-soft">−</span>}
                <span className={`font-mono font-semibold ${shown.length > 6 ? "text-[10.5px]" : ""}`}>{shown}</span>
                {label === "Patients each hour" && <span className="grid size-5 place-items-center rounded-full bg-[#f1f3f0] text-ink-soft">+</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-[10px] bg-mint p-3 text-[11px] text-pine">
        {t("4 hours, 6 patients each hour. You can change the numbers any day.")}
      </div>

      <div className="mt-auto rounded-[10px] bg-ink py-3 text-center font-semibold text-white">{t("Save schedule")}</div>
    </div>
  );
}
