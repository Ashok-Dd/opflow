import { Container, Heading } from "@/components/site/primitives";
import { EmergencySign } from "./emergency-sign";
import { UrgentConsole } from "./urgent-console";

export function UrgentCare() {
  return (
    <section id="urgent" className="border-t border-rule pb-20 sm:pb-28">
      <EmergencySign />

      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Heading>When it can&apos;t wait for an OPD, the app shows what&apos;s open right now.</Heading>
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:pt-3">
            Pick what&apos;s happening and OPflow shows first-aid steps based on WHO guidance, which work without
            internet, then doctors and 24-hour hospitals near you with distance, a call button and directions. You can
            book an emergency consultation and go to the top of the doctor&apos;s line. It doesn&apos;t diagnose. It
            gets you to care.
          </p>
        </div>

        <div className="mt-14">
          <UrgentConsole />
        </div>
      </Container>
    </section>
  );
}
