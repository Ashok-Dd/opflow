import { Container, Heading } from "@/components/site/primitives";
import { EmergencySign } from "./emergency-sign";

const categories = [
  ["Child emergency", "High fever, breathing trouble, fits, not feeding"],
  ["Chest & heart", "Chest pain, severe breathlessness, worrying palpitations"],
  ["Accident & injury", "Road accidents, falls, fractures, head injury, bleeding"],
  ["Breathing", "Severe breathlessness, bad asthma or wheezing"],
  ["Brain & nerves", "Fits, sudden weakness, confusion or fainting"],
  ["Pregnancy", "Bleeding, severe abdominal pain, labour"],
  ["Eyes", "Injury, chemical splash, sudden loss of vision"],
  ["Poisoning & bites", "Suspected poisoning, snakebite, animal bites"],
  ["Something else urgent", "Anything that can't wait for a routine OPD"],
];

const nearby = [
  { name: "Dr. Arjun Rao", role: "Pediatrician · Sunrise Children's Clinic", status: "Available now", km: "2.1", tone: "text-fern" },
  { name: "City Care Hospital", role: "Emergency department · 24 hours", status: "Open now", km: "2.1", tone: "text-fern" },
  { name: "Dr. Kavya Reddy", role: "Obstetrics · City Care Hospital", status: "Available until 11 PM", km: "2.4", tone: "text-amber" },
];

export function UrgentCare() {
  return (
    <section id="urgent" className="border-t border-rule bg-white pb-20 sm:pb-28">
      <EmergencySign />

      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Heading>When it can&apos;t wait for an OPD, the app shows what&apos;s open right now.</Heading>
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:pt-10">
            Pick what&apos;s happening and OPflow shows first-aid steps from WHO guidance (they work without
            internet), doctors near you who have said they&apos;re available now, and 24-hour hospitals, with distance,
            a call button and directions. You can book an emergency consultation and go to the top of the doctor&apos;s
            line. It doesn&apos;t diagnose. It gets you to care.
          </p>
        </div>

        <ul className="mt-14 grid border-t-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([title, text]) => (
            <li key={title} className="border-b border-rule py-5 sm:pr-8">
              <p className="flex items-center gap-3 font-medium">
                <span className="size-2 bg-alarm" aria-hidden="true" />
                {title}
              </p>
              <p className="mt-1.5 pl-5 text-[15px] text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-serif text-[1.7rem] leading-tight">Availability is declared, never guessed.</p>
            <p className="mt-4 text-ink-soft">
              A doctor appears here only if they have switched it on themselves: available now, or available until a
              set time.
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">Example · Pediatric emergency, near you</p>
            <ul className="mt-3 border-t-[1.5px] border-ink">
              {nearby.map((n) => (
                <li key={n.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto_auto]">
                  <div>
                    <p className="font-medium">{n.name}</p>
                    <p className="text-sm text-ink-soft">{n.role}</p>
                  </div>
                  <p className={`text-sm font-medium ${n.tone} sm:text-right`}>
                    {n.status}
                    <span className="block font-mono text-xs font-normal text-ink-soft">{n.km} km</span>
                  </p>
                  <span className="col-span-2 flex gap-4 text-sm font-medium sm:col-span-1">
                    <span className="text-alarm underline underline-offset-4">Call</span>
                    <span className="underline underline-offset-4">Directions</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
