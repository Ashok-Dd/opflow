"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Container } from "./primitives";
import { SectionLink } from "./section-link";

const links = [
  { id: "find", label: "Find a doctor" },
  { id: "windows", label: "How it works" },
  { id: "queue", label: "Live queue" },
  { id: "right-doctor", label: "Right doctor" },
  { id: "urgent", label: "Urgent care" },
  { id: "faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper transition-shadow ${
        scrolled || open ? "shadow-[0_1px_0_var(--color-rule)]" : ""
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="OPflow, back to top">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <SectionLink
              key={l.id}
              id={l.id}
              className="text-[15px] text-ink-soft underline-offset-[6px] hover:text-ink hover:underline"
            >
              {l.label}
            </SectionLink>
          ))}
        </nav>

        <SectionLink
          id="get-the-app"
          className="hidden rounded-[4px] bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-forest md:inline-block"
        >
          Get the app
        </SectionLink>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`grid border-rule bg-paper transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]"
        }`}
      >
        {/* Grows to its content height; scrolls if the screen is shorter than the menu. */}
        <div className="max-h-[calc(100dvh-4rem)] min-h-0 overflow-y-auto overscroll-contain">
        <Container className="pb-5">
          {links.map((l) => (
            <SectionLink
              key={l.id}
              id={l.id}
              onNavigate={() => setOpen(false)}
              className="flex items-center justify-between border-b border-rule py-3.5 font-serif text-xl"
            >
              {l.label}
              <span className="font-sans text-ink-soft" aria-hidden="true">→</span>
            </SectionLink>
          ))}
          <SectionLink
            id="get-the-app"
            onNavigate={() => setOpen(false)}
            className="mt-5 block rounded-[4px] bg-ink py-3 text-center font-medium text-paper"
          >
            Get the app
          </SectionLink>
        </Container>
        </div>
      </nav>
    </header>
  );
}
