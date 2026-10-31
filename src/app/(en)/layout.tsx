import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/site/root-shell";
import { englishFonts } from "@/lib/fonts";
import { languageAlternates, baseMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: site.title,
    template: "%s · OPflow",
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: languageAlternates("en", "/"),
  openGraph: {
    title: site.title,
    description: "Book an hour-long OPD window, follow the live token queue and stop waiting all morning.",
    type: "website",
    url: "/",
    siteName: "OPflow",
    locale: "en_IN",
    alternateLocale: ["te_IN"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "Book an hour-long OPD window, follow the live token queue and stop waiting all morning.",
  },
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <RootShell lang="en" fonts={englishFonts} skipText="Skip to content">
      {children}
    </RootShell>
  );
}
