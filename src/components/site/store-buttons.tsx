// Store listing URLs. Replace with the real listings once the Flutter app is published.
export const PLAY_STORE_URL = "#get-the-app";
export const APP_STORE_URL = "#get-the-app";

export function StoreButtons({ tone = "ink", className = "" }: { tone?: "ink" | "light"; className?: string }) {
  const style =
    tone === "ink"
      ? "bg-ink text-paper hover:bg-forest"
      : "bg-paper text-ink hover:bg-white";
  const base = `group inline-flex h-[52px] items-center gap-3 rounded-[6px] pl-3.5 pr-5 transition-colors ${style}`;
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      <a href={PLAY_STORE_URL} className={base} aria-label="Get it on Google Play">
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
          <path fill="#00d7fe" d="M3.6 1.8c-.3.3-.4.8-.4 1.4v17.6c0 .6.2 1.1.4 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1Z" />
          <path fill="#ffce00" d="m16.9 15.7-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1Z" />
          <path fill="#ff3a44" d="M17 15.6 13.6 12.2 3.6 22.2c.4.4 1 .4 1.7.1l11.7-6.7" />
          <path fill="#00f076" d="M17 8.9 5.3 2.2c-.7-.4-1.3-.3-1.7.1l10 9.9L17 8.9Z" />
        </svg>
        <span className="leading-none">
          <span className="block text-[10px] font-medium tracking-wide uppercase opacity-70">Get it on</span>
          <span className="mt-1 block text-[17px] font-semibold">Google Play</span>
        </span>
      </a>
      <a href={APP_STORE_URL} className={base} aria-label="Download on the App Store">
        <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden="true">
          <path d="M16.37 12.64c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.4-3.66ZM14.1 5.88c.63-.77 1.06-1.83.94-2.88-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.78 1.02.08 2.05-.51 2.68-1.27Z" />
        </svg>
        <span className="leading-none">
          <span className="block text-[10px] font-medium tracking-wide opacity-70">Download on the</span>
          <span className="mt-1 block text-[17px] font-semibold">App Store</span>
        </span>
      </a>
    </div>
  );
}
