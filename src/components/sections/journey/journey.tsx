import { Container, Heading } from "@/components/site/primitives";
import { BookingSlip } from "./booking-slip";
import { RouteSteps } from "./route-steps";

export function Journey() {
  return (
    <section id="booking" className="border-t border-rule py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <Heading>Seven stops between “I should see a doctor” and seeing one.</Heading>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RouteSteps />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <BookingSlip />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
