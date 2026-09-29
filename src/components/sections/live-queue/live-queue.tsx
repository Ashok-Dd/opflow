import { Container, Heading } from "@/components/site/primitives";
import { LiveReadout } from "./live-readout";

export function LiveQueue() {
  return (
    <section id="queue" className="bg-forest py-20 text-paper sm:py-28">
      <Container>
        <LiveReadout
          intro={
            <>
              <Heading>The token board from the waiting hall, on your phone.</Heading>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mint/85">
                As the doctor calls the next patient and finishes each visit, your screen moves with the line. You
                see the token in the room, how many people are ahead of you, and roughly how long that means.
              </p>
            </>
          }
        />
      </Container>
    </section>
  );
}
