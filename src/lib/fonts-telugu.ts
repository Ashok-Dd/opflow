import { Noto_Sans_Telugu, Noto_Serif_Telugu } from "next/font/google";
import { englishFonts } from "./fonts";

// Telugu letters, used only by the Telugu layout. They sit after the Latin fonts in each font stack, so letters,
// numbers and the OPflow name keep their Latin look and only the Telugu text uses these.
//
// preload is off on purpose: with two root layouts, Next.js adds every layout's preloaded fonts to every page, so
// English pages would download these two Telugu files (160 KB) for nothing. Without preload they are fetched
// only when Telugu text is actually drawn.
const teluguSans = Noto_Sans_Telugu({ variable: "--font-telugu-sans", subsets: ["telugu"], weight: ["400", "600"], preload: false });
const teluguSerif = Noto_Serif_Telugu({ variable: "--font-telugu-serif", subsets: ["telugu"], weight: ["500"], preload: false });

export const teluguFonts = `${englishFonts} ${teluguSans.variable} ${teluguSerif.variable}`;
