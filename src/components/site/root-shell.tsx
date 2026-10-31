import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/site/scroll-progress";
import type { Lang } from "@/lib/i18n";
import "../../app/globals.css";

/** The <html> and <body> of a page, shared by the English and the Telugu root layouts. */
export function RootShell({ lang, fonts, skipText, children }: { lang: Lang; fonts: string; skipText: string; children: ReactNode }) {
  return (
    <html lang={lang} className={`${fonts} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:rounded-[4px] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {skipText}
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
