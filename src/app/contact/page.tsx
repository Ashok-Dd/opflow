import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Container } from "@/components/site/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach OPflow support, onboard your clinic or hospital, or send us a complaint.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const blocks = [
    {
      title: "Patients",
      text: "Questions about a booking, payment or refund. Please keep your booking number handy.",
      lines: [
        { label: "Email", value: site.email, href: `mailto:${site.email}` },
        { label: "Hours", value: site.supportHours },
      ],
    },
    {
      title: "Doctors, clinics & hospitals",
      text: `Want to run your OPD on OPflow? No setup cost: we keep ${site.platformFeePercent}% of each consultation booked through OPflow, and settle the rest to you.`,
      lines: [
        {
          label: "Email",
          value: site.email,
          href: `mailto:${site.email}?subject=${encodeURIComponent("Clinic onboarding")}`,
        },
      ],
    },
    {
      title: "Complaints",
      text: "For complaints about your data or the service that support could not resolve. Please write “Grievance” in the subject.",
      lines: [
        { label: "Email", value: site.email, href: `mailto:${site.email}?subject=${encodeURIComponent("Grievance")}` },
        { label: "Response", value: "Acknowledged within 24 hours, resolved within 15 days" },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pt-12 pb-24 sm:pt-16">
        <Container>
          <p className="font-mono text-xs tracking-[0.14em] text-ink-soft uppercase">
            <Link href="/" className="hover:text-ink">OPflow</Link> / Contact
          </p>
          <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-[3.2rem]">
            Talk to a person.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            Real people answer these, usually the same working day.
          </p>

          <div className="mt-10 flex flex-col gap-4 rounded-[4px] bg-alarm px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">Medical emergency? Don&apos;t email us. Call now.</p>
            <div className="flex gap-3 font-semibold">
              <a href="tel:112" className="rounded-[4px] bg-white px-4 py-2 text-alarm">112</a>
              <a href="tel:108" className="rounded-[4px] border border-white px-4 py-2">108 Ambulance</a>
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
      <Footer />
    </>
  );
}
