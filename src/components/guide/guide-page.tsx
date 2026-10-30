import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { Container } from "@/components/site/primitives";
import { StoreButtons } from "@/components/site/store-buttons";
import { guidePages, site } from "@/lib/site";

export type GuideSection = { id: string; title: string; body: ReactNode };
export type GuideFaq = { q: string; a: string };

/**
 * A plain-language page that answers one thing people search for. Same look as the legal pages
 * (the `.legal` article styles), plus breadcrumb and FAQ structured data for search engines.
 */
export function GuidePage({
  path,
  title,
  intro,
  sections,
  faqs = [],
  cta,
}: {
  path: string;
  title: string;
  intro: ReactNode;
  sections: GuideSection[];
  faqs?: GuideFaq[];
  cta: { heading: string; text: string };
}) {
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "OPflow", item: site.url },
        { "@type": "ListItem", position: 2, name: title, item: `${site.url}${path}` },
      ],
    },
  ];
  if (faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main className="flex-1 pt-12 pb-24 sm:pt-16">
        <Container>
          <p className="font-mono text-xs tracking-[0.14em] text-ink-soft uppercase">
            <Link href="/" className="hover:text-ink">OPflow</Link> / Guide
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.4rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-[3.2rem]">
            {title}
          </h1>
          <div className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-soft">{intro}</div>

          <div className="mt-14 grid gap-12 border-t-[1.5px] border-ink pt-10 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-24" aria-label="On this page">
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">On this page</p>
                <ol className="mt-4 space-y-2 text-[15px]">
                  {sections.map((s, i) => (
                    <li key={s.id} className="flex gap-3">
                      <span className="w-5 shrink-0 font-mono text-xs leading-6 text-ink-soft">{i + 1}.</span>
                      <a href={`#${s.id}`} className="text-ink-soft hover:text-ink hover:underline hover:underline-offset-4">
                        {s.title}
                      </a>
                    </li>
                  ))}
                  {faqs.length > 0 && (
                    <li className="flex gap-3">
                      <span className="w-5 shrink-0 font-mono text-xs leading-6 text-ink-soft">{sections.length + 1}.</span>
                      <a href="#questions" className="text-ink-soft hover:text-ink hover:underline hover:underline-offset-4">
                        Common questions
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </aside>

            <article className="legal lg:col-span-8">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2>
                    <span className="mr-3 font-mono text-base text-fern">{i + 1}.</span>
                    {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}

              {faqs.length > 0 && (
                <section id="questions" className="scroll-mt-24">
                  <h2>
                    <span className="mr-3 font-mono text-base text-fern">{sections.length + 1}.</span>
                    Common questions
                  </h2>
                  {faqs.map((f) => (
                    <div key={f.q}>
                      <h3>{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </section>
              )}
            </article>
          </div>

          <div className="mt-20 border-t-[1.5px] border-ink pt-10">
            <h2 className="max-w-xl font-serif text-[1.8rem] leading-tight font-medium sm:text-[2.2rem]">{cta.heading}</h2>
            <p className="mt-3 max-w-xl text-ink-soft">{cta.text}</p>
            <StoreButtons className="mt-6" />
          </div>

          <nav className="mt-16 border-t border-rule pt-8" aria-label="More guides">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">More from OPflow</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {guidePages
                .filter((p) => p.href !== path)
                .map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="underline decoration-rule underline-offset-4 hover:decoration-fern">
                      {p.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/" className="underline decoration-rule underline-offset-4 hover:decoration-fern">
                  OPflow home
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
