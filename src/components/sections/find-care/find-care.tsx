import { Container, Heading } from "@/components/site/primitives";
import type { Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { SearchDemo } from "./search-demo";

export function FindCare({ lang }: { lang: Lang }) {
  const { t } = getT(lang);
  return (
    <section id="find" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Heading className="lg:col-span-7 sm:text-[3rem]">{t("Type whatever you know. We'll find the way.")}</Heading>
          <p className="text-[17px] leading-relaxed text-ink-soft lg:col-span-5">
            {t("A symptom, a specialty, a hospital or a doctor's name. One search box routes you to the right department and the doctors with an open window.")}
          </p>
        </div>
        <SearchDemo />
      </Container>
    </section>
  );
}
