import type { MetadataRoute } from "next";
import { guidePages, legalPages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...guidePages.map((p) => ({
      url: `${site.url}${p.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...legalPages.map((p) => ({
      url: `${site.url}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: p.href === "/contact" ? 0.6 : 0.3,
    })),
  ];
}
