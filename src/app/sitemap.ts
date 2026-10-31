import type { MetadataRoute } from "next";
import { localePath, type Lang } from "@/lib/i18n";
import { guidePages, legalPages, site } from "@/lib/site";

type Entry = { path: string; updated: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number };

const pages: Entry[] = [
  { path: "/", updated: "2026-10-31", changeFrequency: "weekly", priority: 1 },
  ...guidePages.map((p) => ({ path: p.href, updated: p.updated, changeFrequency: "monthly" as const, priority: 0.8 })),
  ...legalPages.map((p) => ({
    path: p.href,
    updated: site.legalUpdatedIso,
    changeFrequency: "yearly" as const,
    priority: p.href === "/contact" ? 0.6 : 0.3,
  })),
];

const url = (lang: Lang, path: string) => `${site.url}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`;

/** Every page in English and in Telugu; each entry names its other-language version so search engines pair them. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    (["en", "te"] as const).map((lang) => ({
      url: url(lang, p.path),
      lastModified: p.updated,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: { "en-IN": url("en", p.path), "te-IN": url("te", p.path) } },
    })),
  );
}
