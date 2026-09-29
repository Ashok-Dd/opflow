import { Container, Heading } from "@/components/site/primitives";
import { EmergencySign } from "./emergency-sign";
import { UrgentConsole } from "./urgent-console";

/** An ambulance-style alert light; its rays blink gently. */
function SirenIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-[1.05em] shrink-0 text-alarm" fill="none" aria-hidden="true">
      <g className="animate-pulse" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M24 3v5M8.5 9.5l3.5 3.5M39.5 9.5 36 13M3 24h5M40 24h5" />
      </g>
      <path d="M12 38V27a12 12 0 0 1 24 0v11" fill="currentColor" />
      <path d="M19 27a5 5 0 0 1 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="7" y="38" width="34" height="6" rx="1.5" fill="var(--color-ink)" />
    </svg>
  );
}

export function UrgentCare() {
  return (
    <section id="urgent" className="border-t border-rule pb-20 sm:pb-28">
      <EmergencySign />

      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Heading>
              <span className="inline-flex items-center">
                Emergency
                <span className="ml-3 inline-flex items-center gap-0.5">
                  <SirenIcon />?
                </span>
              </span>
              <span className="mt-3 block text-[0.62em] leading-snug">
                Find doctors and hospitals available for emergencies right now.
              </span>
            </Heading>
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
