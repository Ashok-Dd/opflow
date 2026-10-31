"use client";

import { useT } from "@/lib/i18n/context";

/* Patient-portal screens rendered inside the phone frame (≈272 × 545). */

export function PatientHome() {
  const { t } = useT();
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <p className="text-[11px] text-ink-soft">{t("Good morning,")}</p>
      <p className="text-lg font-semibold">{t("Ravi Kumar")}</p>

      <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-white px-3 py-2.5 text-ink-soft shadow-[0_0_0_1px_#e3e6e2]">
        <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="m13 13 4 4" strokeLinecap="round" />
        </svg>
        {t("Doctor, symptom or hospital")}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-medium">
        {["Specialty", "Symptom", "Hospital"].map((label) => (
          <span key={label} className="rounded-[10px] bg-white py-3 shadow-[0_0_0_1px_#e3e6e2]">
            {t(label)}
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-[10px] bg-alarm px-3 py-2.5 text-white">
        <p className="text-[12px] font-semibold">{t("Urgent & emergency care")}</p>
        <p className="text-[10px] text-white">{t("Find care that's open right now")}</p>
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">{t("Upcoming")}</p>
      <div className="mt-1.5 rounded-[10px] bg-pine p-3 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">{t("Dr. Meera Iyer")}</p>
            <p className="text-[11px] text-white/85">{t("General Medicine · City Care")}</p>
          </div>
          <span className="rounded-[6px] bg-white/15 px-2 py-1 text-center font-mono leading-none">
            <span className="block text-[8px] text-white">{t("TOKEN")}</span>
            <span className="text-base font-semibold">18</span>
          </span>
        </div>
        <p className="mt-2.5 font-mono text-[12px]">{t("Today · 10:00 – 11:00 AM")}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#9be6b4]">
          <span className="size-1.5 rounded-full bg-leaf" /> {t("Doctor running on time")}
        </p>
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">{t("Near you")}</p>
      <div className="mt-1.5 divide-y divide-[#e3e6e2] rounded-[10px] bg-white shadow-[0_0_0_1px_#e3e6e2]">
        {[["City Care Hospital", "2.1 km", "OPD open"]].map(([name, distance, status]) => (
          <div key={name} className="flex items-center justify-between px-3 py-2">
            <span>
              <span className="block text-[12px] font-medium">{t(name)}</span>
              <span className="font-mono text-[10px] text-ink-soft">{t(distance)}</span>
            </span>
            <span className="text-[10px] font-medium text-fern">{t(status)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-4 border-t border-[#e3e6e2] pt-2.5 text-center text-[10px] text-ink-soft">
        <span className="font-semibold text-pine">{t("Home")}</span>
        <span>{t("Search")}</span>
        <span>{t("Bookings")}</span>
        <span>{t("Profile")}</span>
      </div>
    </div>
  );
}

export function PatientWindows() {
  const { t } = useT();
  const days = [
    ["Thu", "24", true],
    ["Fri", "25", false],
    ["Sat", "26", false],
    ["Mon", "28", false],
  ] as const;
  const windows = [
    ["9:00 – 10:00 AM", "Full", "full"],
    ["10:00 – 11:00 AM", "2 left", "sel"],
    ["11:00 AM – 12:00 PM", "5 left", ""],
    ["12:00 – 1:00 PM", "7 left", ""],
  ] as const;
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <p className="text-[11px] text-ink-soft">{t("← Dr. Meera Iyer")}</p>
      <p className="text-lg font-semibold">{t("Choose a window")}</p>

      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
        {days.map(([d, n, on]) => (
          <span key={n} className={`rounded-[10px] py-2 ${on ? "bg-pine text-white" : "bg-white shadow-[0_0_0_1px_#e3e6e2]"}`}>
            <span className="block text-[10px] opacity-70">{t(d)}</span>
            <span className="text-base font-semibold">{n}</span>
          </span>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">{t("OPD 9 AM – 1 PM")}</p>
      <div className="mt-1.5 space-y-2">
        {windows.map(([time, left, s]) => (
          <div
            key={time}
            className={`flex items-center justify-between rounded-[10px] px-3 py-3 ${
              s === "sel" ? "bg-mint shadow-[0_0_0_1.5px_var(--color-pine)]" : "bg-white shadow-[0_0_0_1px_#e3e6e2]"
            } ${s === "full" ? "opacity-45" : ""}`}
          >
            <span className="font-mono text-[12px]">{t(time)}</span>
            <span className={`text-[11px] font-medium ${s === "full" ? "" : "text-fern"}`}>{t(left)}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] leading-snug text-ink-soft">
        {t("Expected window, not an exact time. You'll get live delay updates.")}
      </p>

      <div className="mt-auto flex items-center justify-between rounded-[10px] bg-ink px-4 py-3 text-white">
        <span className="font-semibold">{t("Continue")}</span>
        <span className="font-mono">₹400</span>
      </div>
    </div>
  );
}

export function PatientLive() {
  const { t } = useT();
  return (
    <div className="flex h-full flex-col px-4 pt-3 pb-4 text-[13px]">
      <p className="text-[11px] text-ink-soft">{t("← My appointment")}</p>
      <p className="text-lg font-semibold">{t("Live queue")}</p>

      <div className="mt-3 rounded-[10px] bg-[#101311] p-3.5">
        <p className="font-mono text-[9px] tracking-[0.18em] text-led/70 uppercase">{t("Now serving · Room 4")}</p>
        <p className="font-mono text-5xl leading-tight font-semibold text-led" style={{ textShadow: "0 0 10px rgba(255,178,30,.5)" }}>
          015
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[10px] bg-white p-3 shadow-[0_0_0_1px_#e3e6e2]">
          <p className="text-[10px] text-ink-soft">{t("Your token")}</p>
          <p className="text-2xl font-semibold text-pine">18</p>
        </div>
        <div className="rounded-[10px] bg-white p-3 shadow-[0_0_0_1px_#e3e6e2]">
          <p className="text-[10px] text-ink-soft">{t("Ahead of you")}</p>
          <p className="text-2xl font-semibold">2</p>
        </div>
      </div>

      <div className="mt-2 rounded-[10px] bg-white p-3 shadow-[0_0_0_1px_#e3e6e2]">
        <p className="text-[10px] text-ink-soft">{t("Approximate wait")}</p>
        <p className="text-xl font-semibold">{t("15 – 25 min")}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-fern">
          <span className="size-1.5 rounded-full bg-fern" /> {t("Doctor running on time")}
        </p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 text-center text-[12px] font-semibold">
        <span className="rounded-[10px] bg-pine py-3 text-white">{t("Directions")}</span>
        <span className="rounded-[10px] bg-white py-3 shadow-[0_0_0_1px_#e3e6e2]">{t("Call hospital")}</span>
      </div>
    </div>
  );
}
