import Link from "next/link";
import { company, guidePages, legalPages, site } from "@/lib/site";
import { Logo } from "./logo";
import { Container } from "./primitives";
import { SectionLink } from "./section-link";
import { StoreButtons } from "./store-buttons";

const groups = [
  {
    title: "Patients",
    links: [
      ["Find a doctor", "/#find"],
      ["Booking", "/#booking"],
      ["Live queue", "/#queue"],
      ["Find your right doctor", "/#right-doctor"],
      ["Urgent care", "/#urgent"],
    ],
  },
  {
    title: "OPflow",
    links: [
      ["How windows work", "/#windows"],
      ["Doctor portal", "/#get-the-app"],
      ["Ground rules", "/#promises"],
      ["Questions", "/#faq"],
    ],
  },
  { title: "Guides", links: guidePages.map((p) => [p.label, p.href]) },
  { title: "Legal", links: legalPages.map((p) => [p.label, p.href]) },
];

/** Who to reach and where, set like the contact block at the foot of a printed form. */
const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/[^\d+]/g, "")}` },
  { label: "Office", value: company.address, href: null },
].filter((c) => c.value);

const linkClass = "text-mint/90 transition-colors hover:text-white hover:underline hover:underline-offset-4";

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <Container className="pt-20 pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="scroll-rise font-serif text-balance text-[2rem] leading-[1.15] sm:text-[2.8rem] lg:col-span-8">
            Right patient, right doctor, <span className="text-leaf italic">at the right time.</span>
          </p>
          <StoreButtons tone="light" className="lg:col-span-4 lg:justify-end" />
        </div>

        <dl className="mt-14 grid border-y border-mint/25 sm:grid-cols-3">
          {contacts.map((c, i) => (
            <div key={c.label} className={`py-5 sm:px-6 ${i === 0 ? "sm:pl-0" : "border-t border-mint/25 sm:border-t-0 sm:border-l"}`}>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">{c.label}</dt>
              <dd className="mt-2 font-serif text-xl">
                {c.href ? (
                  <a href={c.href} className="transition-colors hover:text-leaf">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mint/80">
              OPD appointments and patient flow for clinics and hospitals in India.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7 lg:col-start-6" aria-label="Footer">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map(([label, href]) => (
                    <li key={href}>
                      {href.startsWith("/#") ? (
                        <SectionLink id={href.slice(2)} className={linkClass}>
                          {label}
                        </SectionLink>
                      ) : (
                        <Link href={href} className={linkClass}>
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-mint/20 pt-6 text-[13px] text-mint/75 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">
            OPflow is a booking platform, not a healthcare provider or an emergency service, and does not give medical
            advice. In an emergency, call{" "}
            <a href="tel:112" className="text-paper underline underline-offset-2">112</a> or{" "}
            <a href="tel:108" className="text-paper underline underline-offset-2">108</a>.
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <p>
              © {new Date().getFullYear()} {company.legalName || site.name}
              {company.cin && <span className="block">CIN {company.cin}</span>}
            </p>
            <SectionLink id="top" className="font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:text-white">
              Back to top ↑
            </SectionLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
