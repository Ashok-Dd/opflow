import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
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
    default: "OPflow: know when the doctor will see you",
    template: "%s · OPflow",
  },
  description: site.description,
  applicationName: "OPflow",
  keywords: ["OPD appointment", "doctor appointment", "hospital queue", "token number", "OPD booking India"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "OPflow: know when the doctor will see you",
    description: "Book an hour-long OPD window, follow the live token queue and stop waiting all morning.",
    type: "website",
    siteName: "OPflow",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plex.variable} ${plexMono.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
