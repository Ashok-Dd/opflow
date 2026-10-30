import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { site } from "@/lib/site";
import "./globals.css";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"] });
// Mono is only used for small labels and numbers, so it is not preloaded.
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "600"], preload: false });
// No optical-size axis: it roughly doubles the file size for a difference nobody sees at these sizes.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · OPflow",
  },
  description: site.description,
  applicationName: "OPflow",
  keywords: [...site.keywords],
  authors: [{ name: "OPflow", url: site.url }],
  creator: "OPflow",
  publisher: "OPflow",
  category: "health",
  alternates: { canonical: "/" },
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
  openGraph: {
    title: site.title,
    description: "Book an hour-long OPD window, follow the live token queue and stop waiting all morning.",
    type: "website",
    url: "/",
    siteName: "OPflow",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "Book an hour-long OPD window, follow the live token queue and stop waiting all morning.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plex.variable} ${plexMono.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
