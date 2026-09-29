import { Container, Heading } from "@/components/site/primitives";
import { JourneyFlow } from "./journey-flow";

export function Journey() {
  return (
    <section id="booking" className="border-t border-rule py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Heading className="max-w-2xl">Seven stops between “I should see a doctor” and seeing one.</Heading>
          <p className="max-w-sm text-ink-soft lg:text-right">Scroll through them. The slip fills in as you go.</p>
        </div>
        <JourneyFlow />
      </Container>
    </section>
  );
}
