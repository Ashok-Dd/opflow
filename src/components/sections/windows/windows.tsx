import { Container, Heading } from "@/components/site/primitives";
import { WindowPlanner } from "./window-planner";

export function Windows() {
  return (
    <section id="windows" className="border-t border-rule bg-cream py-20 sm:py-28">
      <Container>
        <WindowPlanner
          intro={
            <>
              <Heading className="text-grove sm:text-[3rem]">We give you an hour, not a minute.</Heading>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
                Some consultations take five minutes, some take twenty, and emergencies never book. So the
                doctor&apos;s OPD is split into hour-long windows with a set number of places, while walk-in and
                emergency places stay with the doctor. Pick a window on the dial.
              </p>
            </>
          }
        />
      </Container>
    </section>
  );
}
