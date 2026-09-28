import { Container, Heading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { RecommendationSlip } from "./recommendation-slip";

const steps = [
  { title: "Tell us the type of doctor", text: "A skin doctor, a child doctor, a heart doctor… whatever you need." },
  {
    title: "Pay ₹99, once",
    text: "Only when there are doctors to suggest near you. If there aren't, you're never asked to pay.",
  },
  {
    title: "See up to three doctors near you",
    text: "Each one with the reasons OPflow suggests them. Book any of them in the app, like any other doctor.",
  },
];

const rules = [
  "Doctors can never pay to be suggested, or to be ranked higher.",
  "Feedback from patients who visited is private. It helps us choose, and is never shown to anyone.",
  "It's a recommendation, not a guarantee of how treatment will turn out.",
  "If no suggestion is left by the time your payment arrives, the ₹99 comes back automatically.",
];

/** "Find Your Right Doctor": the paid, one-time suggestion of up to three doctors near the patient. */
export function RightDoctor() {
  return (
    <section id="right-doctor" className="border-t border-rule py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">Find your right doctor</p>
            <Heading className="mt-3 max-w-2xl">Not sure whom to consult? Let OPflow suggest the right doctor.</Heading>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Tell OPflow which type of doctor you want to consult. We suggest the right doctor(s) near you, based on
              their qualifications, experience, training, areas of practice and feedback from patients who visited
              them, and we tell you why for each one.
            </p>

            <ol className="mt-10 border-t-[1.5px] border-ink">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-rule py-5">
                  <span className="font-mono text-sm text-fern">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-serif text-[1.35rem] leading-snug">{s.title}</p>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="font-serif text-[1.5rem] leading-tight">How we keep it honest</p>
              <ul className="mt-4 space-y-3">
                {rules.map((r) => (
                  <li key={r} className="flex gap-3 text-ink-soft">
                    <span className="mt-2 size-2 shrink-0 bg-fern" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <RecommendationSlip />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
