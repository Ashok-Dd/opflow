/** The site's languages and the helpers that do not need the Telugu texts (safe to import anywhere). */

export type Lang = "en" | "te";

export const langs = ["en", "te"] as const;

/** The same page in a language: "/privacy" is "/te/privacy" in Telugu. `path` is always the English path. */
export function localePath(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/te" : `/te${path}`;
}

/** Which language a URL path is in, and its English path. "/te/privacy" gives { lang: "te", path: "/privacy" }. */
export function parsePath(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/te" || pathname.startsWith("/te/")) {
    return { lang: "te", path: pathname.slice(3) || "/" };
  }
  return { lang: "en", path: pathname };
}

/**
 * Looks a text up in a dictionary (English texts are the keys). A missing text is shown in English, except a
 * key that starts with "~": that one is empty in English.
 */
export function translate(dict: Record<string, string> | null, text: string, args: readonly (string | number)[] = []) {
  const s = dict?.[text] ?? (text.startsWith("~") ? "" : text);
  return args.length > 0 ? s.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)])) : s;
}
