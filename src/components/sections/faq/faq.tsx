import { Container, Heading } from "@/components/site/primitives";

export const faqs = [
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
    a: "Write to info@opflow.in or call us. The OPflow team verifies your qualifications and medical registration and sets up your account, then gives you an OPD ID and password. You set your OPD days, hours and patients per hour in the app or on the doctor website, and patients can start booking.",
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
    a: "Yes. Open OPflow in Safari from the 'Open OPflow' button on this page. It works like the app, including payments and the live line. OPflow works in English and Telugu.",
  },
  {
    q: "Where is OPflow available?",
    a: "We're starting small: one doctor, then one clinic, then a few more, so we learn how real OPDs run before opening widely. Clinics near you will appear in the app as they join.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-rule py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Heading>Things people ask us.</Heading>
          </div>
        </div>

        <div className="border-t-[1.5px] border-ink lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-[1.35rem] leading-snug">{f.q}</span>
                <span
                  className="mt-1.5 grid size-5 shrink-0 place-items-center font-mono text-lg leading-none text-fern transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="-mt-1 max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
