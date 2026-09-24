import { Container, Heading } from "@/components/site/primitives";
import { SearchDemo } from "./search-demo";

export function FindCare() {
  return (
    <section id="find" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading>Type whatever you know.</Heading>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            A symptom, a specialty, a hospital or a doctor&apos;s name. One search box finds the right doctor and
            their next open window.
          </p>
        </div>
        <SearchDemo />
      </Container>
    </section>
  );
}
