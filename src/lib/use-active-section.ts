"use client";

import { useEffect, useState } from "react";

/** The id of the section crossing the middle of the screen, or null between sections. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const crossing = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) crossing.add(e.target.id);
          else crossing.delete(e.target.id);
        }
        setActive(ids.find((id) => crossing.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }, // a thin band just above the middle of the screen
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids]);

  return active;
}
