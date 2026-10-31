import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/site/root-shell";
import { teluguFonts } from "@/lib/fonts-telugu";
import { teMeta } from "@/lib/i18n/meta";
import { languageAlternates, baseMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...baseMetadata,
  title: { default: teMeta.title, template: "%s · OPflow" },
  description: teMeta.description,
  keywords: teMeta.keywords,
  alternates: languageAlternates("te", "/"),
  openGraph: {
    title: teMeta.title,
    description: teMeta.shortDescription,
    type: "website",
    url: "/te",
    siteName: "OPflow",
    locale: "te_IN",
    alternateLocale: ["en_IN"],
  },
  twitter: { card: "summary_large_image", title: teMeta.title, description: teMeta.shortDescription },
};

export default function TeluguLayout({ children }: { children: ReactNode }) {
  return (
    <RootShell lang="te" fonts={teluguFonts} skipText="విషయానికి వెళ్ళండి">
      {children}
    </RootShell>
  );
}
