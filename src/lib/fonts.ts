import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

// Fonts are the heaviest download on the page, so each one is kept to the weights the design really needs.
// Plex Sans 500 is left out: font-medium falls back to the nearest weight (400).
const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "600"] });
// Mono is only used for small labels and numbers, so it is not preloaded.
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "600"], preload: false });
// One weight (500, the headings'), roman and italic: the lighter 400 files were only used for a few captions.
// No optical-size axis: it roughly doubles the file size for a difference nobody sees at these sizes.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500"],
});

/** The Latin fonts every page uses. The Telugu fonts live in fonts-telugu.ts so English pages never load them. */
export const englishFonts = `${plex.variable} ${plexMono.variable} ${newsreader.variable}`;
