import { Container, Heading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { RuleCard } from "./rule-card";

const rules = [
  { title: "Promise you an exact time.", text: "You get an hour-long window and a live estimate that admits it's an estimate.", tilt: -1.2 },
  { title: "List a doctor as available unless they said so.", text: "Urgent-care listings come only from what doctors and hospitals declare.", tilt: 0.8 },
  { title: "Diagnose you.", text: "Symptom search points you to a kind of doctor. Medical decisions stay with the doctor.", tilt: -0.5 },
  { title: "Confirm a booking before the payment clears.", text: "Every payment is verified on our servers. Failed ones can be retried; doubles are refunded.", tilt: 1.1 },
  { title: "Show your details to people who shouldn't see them.", text: "Patients see only their own bookings. Doctors see only their own patients.", tilt: -0.9 },
  { title: "Make doctors take every patient online.", text: "Walk-ins stay. The doctor sets the split, every day if they like.", tilt: 0.6 },
];

export function Promises() {
  return (
    <section id="promises" className="border-t border-rule bg-paper-deep/60 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Heading className="max-w-xl">Six things OPflow will never do.</Heading>
          <p className="max-w-sm text-ink-soft">
            Written down so patients, doctors and our own team can hold us to them.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rules.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={(i % 3) * 110}>
                <RuleCard index={i + 1} title={r.title} text={r.text} tilt={r.tilt} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
