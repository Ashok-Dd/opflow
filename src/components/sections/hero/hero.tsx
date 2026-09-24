import { Container } from "@/components/site/primitives";
import { StoreButtons } from "@/components/site/store-buttons";
import { WaitingHall } from "./waiting-hall";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest text-paper">
      <Container className="pt-14 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="font-serif text-[2.6rem] leading-[1.02] font-medium tracking-[-0.02em] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]">
            Know when the doctor <span className="text-leaf italic">will see you.</span>
          </h1>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-[17px] leading-relaxed text-mint/80">
              Book an hour-long OPD window, follow the token queue from home, and walk in when it&apos;s nearly your
              turn. Not at 9 AM with everyone else.
            </p>
            <StoreButtons tone="light" className="mt-6" />
          </div>
        </div>
      </Container>

      <Container className="pt-16 pb-14 sm:pt-20 sm:pb-20">
        <WaitingHall />
      </Container>
    </section>
  );
}
