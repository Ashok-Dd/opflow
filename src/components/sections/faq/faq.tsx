import Link from "next/link";
import { Container, Heading } from "@/components/site/primitives";
import { localePath, type Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { company, guidePages, site } from "@/lib/site";

/** An answer may hold {0}, {1} slots, filled from `args` after translation. */
type FaqItem = { q: string; a: string; args?: string[] };

export const faqs: FaqItem[] = [
  {
    q: "What is OPflow?",
    a: "OPflow is an OPD appointment booking app for India. You find a doctor by specialty, symptom or hospital, book an hour-long OPD window, pay online and follow the doctor's live token queue from your phone. It works in English and Telugu.",
  },
  {
    q: "How do I book an OPD appointment online?",
    a: "Search for a doctor, pick a day and an hour-long window, and pay online with UPI, card or net banking. On the day, your phone shows the live token queue so you can leave home when it's nearly your turn.",
  },
  {
    q: "Will I be seen at an exact time?",
    a: "No, and nobody honest can promise that in an OPD. You book an hour-long window, and the app keeps your estimate updated from the doctor's live queue.",
  },
  {
    q: "What happens if the doctor is running late?",
    a: "The clinic updates the delay and you see it straight away, for example “about 20 minutes late”, so you can leave home later instead of waiting at the hospital.",
  },
  {
    q: "Can I still walk in without booking?",
    a: "Yes. Every doctor keeps places for walk-ins and emergencies. OPflow only manages the places the doctor chooses to open for online booking.",
  },
  {
    q: "Can I cancel my booking?",
    a: "No, but you can reschedule it once, free, up to 2 hours before your window, to any open window with the same doctor. If the doctor or hospital cancels, you get a 100% refund automatically.",
  },
  {
    q: "Does OPflow tell me what's wrong with me?",
    a: "No. Symptom search only points you to the right kind of doctor. If something could be life-threatening, call 112 or 108, or go to the nearest emergency department.",
  },
  {
    q: "I'm a doctor. What does it take to get started?",
    a: "Write to {0} or call us on {1}. The OPflow team verifies your qualifications and medical registration and sets up your account, then gives you an OPD ID and password. You set your OPD days, hours and patients per hour in the app or on the doctor website, and patients can start booking.",
    args: [site.email, company.phone],
  },
  {
    q: "How does OPflow suggest the right doctor?",
    a: "Choose the type of doctor you need and pay ₹99 once. OPflow suggests up to three doctors near you, based on their qualifications, experience, training, areas of practice and private feedback from patients who visited them, and explains why for each one. Doctors can never pay to be suggested. You're only asked to pay when there are doctors to suggest, and it's a recommendation, not a guarantee of treatment outcome.",
  },
  {
    q: "How do I pay?",
    a: "Online, through our payment partner Cashfree Payments: UPI, cards or net banking. Your booking is confirmed only after we check the payment on our side. If a payment fails but money is taken, it comes back automatically.",
  },
  {
    q: "I use an iPhone. Can I use OPflow?",
    a: "Yes. Until the App Store app is out, open opflow-alpha.vercel.app in Safari. It works like the app, including payments and the live line. OPflow works in English and Telugu.",
  },
  {
    q: "Where is OPflow available?",
    a: "We're starting small: one doctor, then one clinic, then a few more, so we learn how real OPDs run before opening widely. Clinics near you will appear in the app as they join.",
  },
];

const phoneHref = `tel:${company.phone.replace(/[^\d+]/g, "")}`;

/** The questions and answers in a language, as plain text (for the page and for search-engine data). */
export function faqText(lang: Lang) {
  const { t, tf } = getT(lang);
  return faqs.map((f) => ({ q: t(f.q), a: tf(f.a, ...(f.args ?? [])) }));
}

export function Faq({ lang }: { lang: Lang }) {
  const { t } = getT(lang);
  const items = faqText(lang);

  return (
    <section id="faq" className="border-t border-rule py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Heading>{t("Things people ask us.")}</Heading>

            {/* A slip with a person's contact on it, for whatever the questions here don't cover. */}
            <aside className="mt-10 rounded-[4px] border border-rule bg-white">
              <p className="border-b border-dashed border-rule px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                {t("Still stuck?")}
              </p>
              <div className="px-5 py-4">
                <p className="font-serif text-2xl leading-tight">{t("Ask a person.")}</p>
                <dl className="mt-4 space-y-2 text-[15px]">
                  {[
                    [t("Email"), site.email, `mailto:${site.email}`],
                    [t("Phone"), company.phone, phoneHref],
                    [t("Hours"), t(site.supportHours), null],
                  ].map(([label, value, href]) => (
                    <div key={label} className="grid grid-cols-[56px_1fr] gap-3">
                      <dt className="font-mono text-[11px] leading-6 tracking-[0.14em] text-ink-soft uppercase">{label}</dt>
                      <dd>
                        {href ? (
                          <a href={href} className="underline decoration-fern underline-offset-4">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>

        <div className="border-t-[1.5px] border-ink lg:col-span-8">
          {items.map((f, i) => (
            <details key={faqs[i].q} className="faq-item scroll-rise group border-b border-rule">
              <summary className="grid cursor-pointer list-none grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 py-5 [&::-webkit-details-marker]:hidden">
                <span className="pt-1.5 font-mono text-xs text-ink-soft transition-colors group-open:text-fern">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[1.35rem] leading-snug transition-colors group-hover:text-fern group-open:text-forest">
                  {f.q}
                </span>
                <span
                  className="mt-1.5 grid size-5 shrink-0 place-items-center font-mono text-lg leading-none text-fern transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pl-[3.25rem] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}

          <nav className="mt-8" aria-label={t("Guides")}>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">{t("Read the guides")}</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {guidePages.map((p) => (
                <li key={p.href}>
                  <Link href={localePath(lang, p.href)} className="underline decoration-rule underline-offset-4 hover:decoration-fern">
                    {t(p.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
