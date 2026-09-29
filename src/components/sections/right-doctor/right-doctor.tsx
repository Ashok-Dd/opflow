import { Container, Heading } from "@/components/site/primitives";
import { RecommendationPrinter } from "./recommendation-printer";

const steps = [
  { title: "Tell us the type of doctor", text: "Skin, child, heart… whatever you need." },
  { title: "Pay ₹99, once", text: "Only when there are doctors to suggest near you." },
  { title: "See up to three doctors", text: "Each with the reasons we suggest them. Book any of them." },
];

const rules = [
  ["Never paid for", "Doctors can never pay to be suggested, or to be ranked higher."],
  ["Private feedback", "Feedback from patients who visited helps us choose. It is never shown to anyone."],
  ["No outcome promise", "It's a recommendation, not a guarantee of how treatment will turn out."],
  ["Automatic refund", "If no suggestion is left by the time your payment arrives, the ₹99 comes back."],
];

/** "Find Your Right Doctor": the paid, one-time suggestion of up to three doctors near the patient. */
export function RightDoctor() {
  return (
    <section id="right-doctor" className="border-t border-rule bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">Find your right doctor</p>
            <Heading className="mt-3">Not sure whom to consult? Let OPflow suggest the right doctor.</Heading>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              We suggest doctors near you based on their qualifications, experience, training, areas of practice and
              feedback from patients who visited them, and we tell you why for each one.
            </p>

            <ol className="mt-10 grid border-t-[1.5px] border-ink sm:grid-cols-3">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="border-b border-rule py-5 sm:border-b-0 sm:py-6 sm:pr-5 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-5"
                >
                  <span className="font-mono text-sm text-fern">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-serif text-[1.25rem] leading-snug">{s.title}</p>
                  <p className="mt-1 text-[15px] text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 bg-paper p-6 sm:p-7">
              <p className="font-serif text-[1.4rem] leading-tight">How we keep it honest</p>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {rules.map(([k, v]) => (
                  <div key={k} className="border-t border-ink/20 pt-3">
                    <dt className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">{k}</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <RecommendationPrinter />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
