import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { LangProvider } from "@/lib/i18n/context";
import { te } from "@/lib/i18n/te";

/** Wraps a page so its interactive parts know the page's language. Telugu pages receive the Telugu texts. */
export function PageShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LangProvider lang={lang} dict={lang === "te" ? te : null}>
      {children}
    </LangProvider>
  );
}
