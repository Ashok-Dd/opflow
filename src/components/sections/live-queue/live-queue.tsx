import { Container, Heading } from "@/components/site/primitives";
import { LiveReadout } from "./live-readout";

const states = ["Booked", "Arrived", "Called", "In consultation", "Completed"];

export function LiveQueue() {
  return (
    <section id="queue" className="bg-forest py-20 text-paper sm:py-28">
      <Container>
        <LiveReadout
          intro={
            <>
              <Heading>The token board from the waiting hall, on your phone.</Heading>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mint/85">
                As reception marks people arrived, called and done, your screen moves with the queue. You see
                who&apos;s in the room, how many are ahead of you, and roughly how long that means.
              </p>
            </>
          }
        />

        <div className="mt-20 border-t border-mint/20 pt-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-mint/75 uppercase">What reception marks, what you see</p>
          <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3 font-serif text-xl sm:text-2xl">
            {states.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {s}
                {i < states.length - 1 && <span className="font-sans text-base text-leaf" aria-hidden="true">→</span>}
              </li>
            ))}
            <li className="font-sans text-base text-mint/75">(or absent / cancelled)</li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
