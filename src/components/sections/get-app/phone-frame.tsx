import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[600px] w-[292px] shrink-0 rounded-[48px] bg-ink p-[10px] shadow-[0_40px_60px_-30px_rgba(11,58,46,0.55),inset_0_0_0_1.5px_#3a4640]">
      {/* side buttons */}
      <span className="absolute top-28 -left-[3px] h-10 w-[3px] rounded-l bg-ink" aria-hidden="true" />
      <span className="absolute top-40 -left-[3px] h-16 w-[3px] rounded-l bg-ink" aria-hidden="true" />
      <span className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-ink" aria-hidden="true" />

      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[#f7f8f6]">
        <div className="absolute top-2.5 left-1/2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        <div className="relative z-10 flex h-11 items-end justify-between px-7 pb-1 text-[12px] font-semibold" aria-hidden="true">
          <span>10:12</span>
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-ink/70 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
            </span>
          </span>
        </div>
        <div className="absolute inset-x-0 top-11 bottom-0">{children}</div>
      </div>
    </div>
  );
}
