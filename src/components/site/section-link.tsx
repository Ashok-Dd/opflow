"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localePath, parsePath } from "@/lib/i18n";

/**
 * Link to a section of the home page (e.g. id="queue"), in the current language.
 * On the home page it scrolls there smoothly; from any other page (privacy, terms…) it does a normal
 * navigation to "/#id" (or "/te#id"), which the browser reliably lands on. Next's client-side hash navigation
 * across pages doesn't always scroll to the section, so it isn't used here.
 */
export function SectionLink({
  id,
  children,
  className,
  onNavigate,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const { lang, path } = parsePath(usePathname());
  const home = localePath(lang, "/");

  return (
    <a
      href={`${home}#${id}`}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (path !== "/") return; // let the browser load the home page at that section
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", `${home}#${id}`);
      }}
    >
      {children}
    </a>
  );
}
