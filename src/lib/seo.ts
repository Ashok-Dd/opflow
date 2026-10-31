import type { Metadata } from "next";
import { localePath, type Lang } from "./i18n";
import { site } from "./site";

/** Search settings that are the same in every language. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "OPflow",
  authors: [{ name: "OPflow", url: site.url }],
  creator: "OPflow",
  publisher: "OPflow",
  category: "health",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console / Bing tag verification. The DNS TXT method needs no code, so these stay optional.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

/**
 * The canonical address of a page and its hreflang links. These tell search engines that the English and the
 * Telugu page are the same page, so each searcher is shown the one in their language.
 */
export function languageAlternates(lang: Lang, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      "en-IN": localePath("en", path),
      "te-IN": localePath("te", path),
      "x-default": localePath("en", path),
    },
  };
}

/** Metadata for one page in one language. `path` is the English path, e.g. "/privacy". */
export function pageMetadata({ lang, path, title, description }: { lang: Lang; path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: languageAlternates(lang, path),
    openGraph: { title, description, url: localePath(lang, path), siteName: "OPflow", type: "website", locale: lang === "te" ? "te_IN" : "en_IN" },
  };
}
