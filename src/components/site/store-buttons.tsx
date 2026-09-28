import { site } from "@/lib/site";

// Replace the Google Play line with the real listing once the Android app is published.
export const PLAY_STORE_URL: string | null = null;

/** "Open OPflow" (the app in the browser, iPhone and Android) and the Google Play listing when it exists. */
export function StoreButtons({ tone = "ink", className = "" }: { tone?: "ink" | "light"; className?: string }) {
  const style = tone === "ink" ? "bg-ink text-paper hover:bg-forest" : "bg-paper text-ink hover:bg-white";
  const base = `group inline-flex h-[52px] items-center gap-3 rounded-[6px] pl-3.5 pr-5 transition-colors ${style}`;
  const soon = tone === "ink" ? "border-ink/25 text-ink-soft" : "border-paper/30 text-mint/80";
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <a href={site.webAppUrl} className={base} aria-label="Open OPflow in your browser">
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" strokeLinecap="round" />
        </svg>
        <span className="leading-none">
          <span className="block text-[10px] font-medium tracking-wide uppercase opacity-70">iPhone & Android</span>
          <span className="mt-1 block text-[17px] font-semibold">Open OPflow</span>
        </span>
      </a>
      {PLAY_STORE_URL ? (
        <a href={PLAY_STORE_URL} className={base} aria-label="Get it on Google Play">
          <span className="leading-none">
            <span className="block text-[10px] font-medium tracking-wide uppercase opacity-70">Get it on</span>
            <span className="mt-1 block text-[17px] font-semibold">Google Play</span>
          </span>
        </a>
      ) : (
        <span className={`inline-flex h-[52px] items-center rounded-[6px] border border-dashed px-4 text-sm ${soon}`}>
          Android app on Google Play · coming soon
        </span>
      )}
    </div>
  );
}
