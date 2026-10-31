import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/primitives";
import { localePath, type Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { legalPages, site } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** A policy page. `path` is the English path (e.g. "/privacy"); the page lives at its Telugu address too. */
export function LegalPage({
  lang = "en",
  path,
  title,
  intro,
  sections,
}: {
  lang?: Lang;
  path: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  const { t } = getT(lang);
  return (
    <PageShell lang={lang}>
      <Header />
      <main id="main" className="flex-1 pt-12 pb-24 sm:pt-16">
        <Container>
          <p className="font-mono text-xs tracking-[0.14em] text-ink-soft uppercase">
            <Link href={localePath(lang, "/")} className="hover:text-ink">OPflow</Link> / {t("Legal")}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.4rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-[3.2rem]">
            {title}
          </h1>
          <p className="mt-4 font-mono text-sm text-ink-soft">
            {t("Last updated:")} {lang === "te" ? site.legalUpdatedTe : site.legalUpdated}
          </p>
          {lang === "te" && (
            <p className="mt-2 max-w-3xl text-sm text-ink-soft">
              {t("This Telugu text is a translation for your convenience. If the two differ, the English version applies.")}
            </p>
          )}
          <div className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-soft">{intro}</div>

          <div className="mt-14 grid gap-12 border-t-[1.5px] border-ink pt-10 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-24" aria-label={t("On this page")}>
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">{t("On this page")}</p>
                <ol className="mt-4 space-y-2 text-[15px]">
                  {sections.map((s, i) => (
                    <li key={s.id} className="flex gap-3">
                      <span className="w-5 shrink-0 font-mono text-xs leading-6 text-ink-soft">{i + 1}.</span>
                      <a href={`#${s.id}`} className="text-ink-soft hover:text-ink hover:underline hover:underline-offset-4">
                        {s.title}
                      </a>
                    </li>
                  ))}
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
            </article>
          </div>

          <nav className="mt-20 border-t border-rule pt-8" aria-label={t("Other legal pages")}>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">{t("Other policies")}</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {legalPages
                .filter((p) => p.href !== path)
                .map((p) => (
                  <li key={p.href}>
                    <Link href={localePath(lang, p.href)} className="underline decoration-rule underline-offset-4 hover:decoration-fern">
                      {t(p.label)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer lang={lang} />
    </PageShell>
  );
}

/** Mailto link for the support or grievance address. */
export function Mail({ to }: { to: string }) {
  return <a href={`mailto:${to}`}>{to}</a>;
}
