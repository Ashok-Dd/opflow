"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { translate, type Lang } from "./index";

const Ctx = createContext<{ lang: Lang; dict: Record<string, string> | null }>({ lang: "en", dict: null });

/** Gives the interactive (client) components their language. Telugu pages pass the Telugu texts; English pages none. */
export function LangProvider({ lang, dict, children }: { lang: Lang; dict: Record<string, string> | null; children: ReactNode }) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Translation for client components, the same `t` and `tf` as on the server. Stable between renders. */
export function useT() {
  const { lang, dict } = useContext(Ctx);
  return useMemo(
    () => ({
      lang,
      t: (text: string) => translate(dict, text),
      tf: (text: string, ...args: (string | number)[]) => translate(dict, text, args),
    }),
    [lang, dict],
  );
}
