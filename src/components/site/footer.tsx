import Link from "next/link";
import { legalPages, site } from "@/lib/site";
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
  { title: "Legal", links: legalPages.map((p) => [p.label, p.href]) },
];

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <Container className="pt-20 pb-10">
        <p className="max-w-4xl font-serif text-[2rem] leading-[1.15] sm:text-[2.8rem]">
          Right patient, right doctor, <span className="text-leaf italic">at the right time.</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-mint/20 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mint/80">
              OPD appointments and patient flow for clinics and hospitals in India.
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic text-mint/80">
              <a href={`mailto:${site.email}`} className="block hover:text-white">{site.email}</a>
            </address>
            <StoreButtons tone="light" className="mt-6" />
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6" aria-label="Footer">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map(([label, href]) => {
                    const cls = "text-mint/90 hover:text-white hover:underline hover:underline-offset-4";
                    return (
                      <li key={href}>
                        {href.startsWith("/#") ? (
                          <SectionLink id={href.slice(2)} className={cls}>
                            {label}
                          </SectionLink>
                        ) : (
                          <Link href={href} className={cls}>
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-mint/20 pt-6 text-[13px] text-mint/75 sm:flex-row sm:justify-between">
          <p className="max-w-2xl">
            OPflow is a booking platform, not a healthcare provider or an emergency service, and does not give medical
            advice. In an emergency, call{" "}
            <a href="tel:112" className="text-paper underline underline-offset-2">112</a> or{" "}
            <a href="tel:108" className="text-paper underline underline-offset-2">108</a>.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
