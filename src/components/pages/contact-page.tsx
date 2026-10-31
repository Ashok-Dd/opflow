import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/primitives";
import { localePath, type Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { company, site } from "@/lib/site";

/** The contact page in a language: "/contact" in English, "/te/contact" in Telugu. */
export function ContactPage({ lang }: { lang: Lang }) {
  const { t, tf } = getT(lang);
  const mail = (subject?: string) => `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  const blocks = [
    {
      title: t("Patients"),
      text: t("Questions about a booking, payment or refund. Please keep your booking number handy."),
      lines: [
        { label: t("Email"), value: site.email, href: mail() },
        ...(company.phone
          ? [{ label: t("Phone"), value: company.phone, href: `tel:${company.phone.replace(/[^\d+]/g, "")}` }]
          : []),
        { label: t("Hours"), value: t(site.supportHours) },
        ...(company.address ? [{ label: t("Office"), value: `${company.legalName || site.name}, ${t(company.address)}` }] : []),
      ],
    },
    {
      title: t("Doctors, clinics & hospitals"),
      text: tf(
        "Want to run your OPD on OPflow? No setup cost: we keep {0}% of each consultation booked through OPflow, and settle the rest to you.",
        site.platformFeePercent,
      ),
      lines: [{ label: t("Email"), value: site.email, href: mail("Clinic onboarding") }],
    },
    {
      title: t("Complaints"),
      text: t("For complaints about your data or the service that support could not resolve. Please write “Grievance” in the subject."),
      lines: [
        { label: t("Email"), value: site.email, href: mail("Grievance") },
        ...(company.grievanceOfficer ? [{ label: t("Officer"), value: company.grievanceOfficer }] : []),
        { label: t("Response"), value: t("Acknowledged within 24 hours, resolved within 15 days") },
      ],
    },
  ];

  return (
    <PageShell lang={lang}>
      <Header />
      <main id="main" className="flex-1 pt-12 pb-24 sm:pt-16">
        <Container>
          <p className="font-mono text-xs tracking-[0.14em] text-ink-soft uppercase">
            <Link href={localePath(lang, "/")} className="hover:text-ink">OPflow</Link> / {t("Contact")}
          </p>
          <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-[3.2rem]">
            {t("Talk to a person.")}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {t("Real people answer these, usually the same working day.")}
          </p>

          <div className="mt-10 flex flex-col gap-4 rounded-[4px] bg-alarm px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">{t("Medical emergency? Don't email us. Call now.")}</p>
            <div className="flex gap-3 font-semibold">
              <a href="tel:112" className="rounded-[4px] bg-white px-4 py-2 text-alarm">112</a>
              <a href="tel:108" className="rounded-[4px] border border-white px-4 py-2">108 {t("Ambulance")}</a>
            </div>
          </div>

          <div className="mt-12 grid border-t-[1.5px] border-ink md:grid-cols-2">
            {blocks.map((b, i) => (
              <section
                key={b.title}
                className={`border-b border-rule py-8 md:px-8 ${i % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"}`}
              >
                <h2 className="font-serif text-[1.7rem] leading-tight">{b.title}</h2>
                <p className="mt-2 text-ink-soft">{b.text}</p>
                <dl className="mt-5 space-y-2">
                  {b.lines.map((l) => (
                    <div key={l.label} className="grid grid-cols-[88px_1fr] gap-3">
                      <dt className="font-mono text-[11px] leading-6 tracking-[0.14em] text-ink-soft uppercase">{l.label}</dt>
                      <dd>
                        {"href" in l && l.href ? (
                          <a href={l.href} className="underline decoration-fern underline-offset-4">
                            {l.value}
                          </a>
                        ) : (
                          l.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer lang={lang} />
    </PageShell>
  );
}
