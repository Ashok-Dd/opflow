import type { MetadataRoute } from "next";
import { legalPages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...legalPages.map((p) => ({
      url: `${site.url}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: p.href === "/contact" ? 0.6 : 0.3,
    })),
  ];
}
