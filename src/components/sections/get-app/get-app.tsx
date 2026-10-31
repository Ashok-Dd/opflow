import { Container, Heading } from "@/components/site/primitives";
import { StoreButtons } from "@/components/site/store-buttons";
import { localePath, type Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n/server";
import { PortalShowcase } from "./portal-showcase";

export function GetApp({ lang }: { lang: Lang }) {
  const { t } = getT(lang);
  return (
    <section id="get-the-app" className="overflow-hidden bg-mint py-20 sm:py-28">
      <Container>
        <PortalShowcase
          intro={
            <>
              <Heading>{t("One app. A portal for patients, another for doctors.")}</Heading>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
                {t("Patients sign in with their mobile number. Doctors sign in with the OPD ID and password the OPflow team gives them, in the same app or on the OPflow doctor website from a computer. OPflow works in English and Telugu.")}
              </p>
            </>
          }
          footer={
            <>
              <StoreButtons className="mt-10" lang={lang} />
              <p className="mt-6 text-[15px] text-ink-soft">
                {t("Run a clinic or hospital?")}{" "}
                <a href={localePath(lang, "/contact")} className="font-medium text-ink underline decoration-fern underline-offset-4">
                  {t("Talk to us about onboarding")}
                </a>
                .
              </p>
            </>
          }
        />
      </Container>
    </section>
  );
}
