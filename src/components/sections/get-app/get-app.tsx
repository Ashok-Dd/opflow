import { Container, Heading } from "@/components/site/primitives";
import { StoreButtons } from "@/components/site/store-buttons";
import { PortalShowcase } from "./portal-showcase";

export function GetApp() {
  return (
    <section id="get-the-app" className="overflow-hidden bg-mint py-20 sm:py-28">
      <Container>
        <PortalShowcase
          intro={
            <>
              <Heading>One app. A portal for patients, another for doctors.</Heading>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
                Download OPflow once. Sign in with your mobile number as a patient, or as a doctor or clinic staff,
                and the app opens the portal that&apos;s yours.
              </p>
            </>
          }
          footer={
            <>
              <StoreButtons className="mt-10" />
              <p className="mt-6 text-[15px] text-ink-soft">
                Run a clinic or hospital?{" "}
                <a href="/contact" className="font-medium text-ink underline decoration-fern underline-offset-4">
                  Talk to us about onboarding
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
