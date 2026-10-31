import { Container, Heading } from "@/components/site/primitives";
import { TornEdge } from "@/components/site/torn-edge";
import type { Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { LiveReadout } from "./live-readout";

export function LiveQueue({ lang }: { lang: Lang }) {
  const { t } = getT(lang);
  return (
    <section id="queue" className="relative bg-forest py-20 text-paper sm:py-28">
      <TornEdge side="top" className="text-forest" />
      <Container>
        <LiveReadout
          intro={
            <>
              <Heading>{t("The token board from the waiting hall, on your phone.")}</Heading>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mint/85">
                {t("As the doctor calls the next patient and finishes each visit, your screen moves with the line. You see the token in the room, how many people are ahead of you, and roughly how long that means.")}
              </p>
            </>
          }
        />
      </Container>
      <TornEdge side="bottom" className="text-forest" />
    </section>
  );
}
