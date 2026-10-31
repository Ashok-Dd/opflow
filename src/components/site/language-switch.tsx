"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { localePath, parsePath, type Lang } from "@/lib/i18n";
import { useT } from "@/lib/i18n/context";
import { OpLoader } from "./op-loader";

/**
 * Links to the same page in the other language: "తెలుగు" on an English page, "English" on a Telugu one.
 *
 * The two languages are separate documents, so the browser loads a whole new page. Until it arrives, the old page
 * would just sit there looking stuck, so the OPflow loader covers the screen the moment the link is clicked.
 */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { t } = useT();
  const { lang, path } = parsePath(usePathname());
  const other: Lang = lang === "en" ? "te" : "en";
  const [switching, setSwitching] = useState(false);

  // Coming back to this page with the browser's Back button can show it from memory: drop the loader then.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => e.persisted && setSwitching(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const start = (e: MouseEvent) => {
    // A new tab or window (Ctrl, Cmd, Shift, middle click) leaves this page alone, so no loader.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    setSwitching(true);
  };

  const message = other === "te" ? "తెలుగు వెర్షన్ తెరుస్తున్నాం…" : "Opening the English version…";

  return (
    <>
      <Link
        href={localePath(other, path)}
        hrefLang={other === "te" ? "te-IN" : "en-IN"}
        lang={other}
        onClick={start}
        aria-label={other === "te" ? t("View in Telugu") : t("View in English")}
        className={`rounded-[4px] border border-ink/25 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper ${className}`}
      >
        {other === "te" ? "తెలుగు" : "English"}
      </Link>

      {switching &&
        createPortal(
          <div
            lang={other}
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[90] grid place-items-center bg-paper text-ink"
          >
            <div className="grid justify-items-center gap-4">
              <OpLoader size={72} label={message} />
              <p className="font-serif text-xl">{message}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
