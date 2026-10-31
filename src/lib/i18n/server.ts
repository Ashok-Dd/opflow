import { te } from "./te";
import { translate, type Lang } from "./index";

/**
 * Translation for server components. `t("Find a doctor")` gives the Telugu text on Telugu pages and the same
 * English text everywhere else; `tf("{0} left", 5)` fills numbered slots. Server only: the Telugu texts are
 * never sent to English pages.
 */
export function getT(lang: Lang) {
  const dict = lang === "te" ? te : null;
  return {
    t: (text: string) => translate(dict, text),
    tf: (text: string, ...args: (string | number)[]) => translate(dict, text, args),
  };
}
