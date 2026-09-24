"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Link to a section of the home page (e.g. id="queue").
 * On the home page it scrolls there smoothly; from any other page (privacy, terms…) it does a normal
 * navigation to "/#id", which the browser reliably lands on. Next's client-side hash navigation across
 * pages doesn't always scroll to the section, so it isn't used here.
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
  const pathname = usePathname();

  return (
    <a
      href={`/#${id}`}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (pathname !== "/") return; // let the browser load the home page at that section
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", `/#${id}`);
      }}
    >
      {children}
    </a>
  );
}
