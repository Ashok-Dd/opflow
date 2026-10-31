import { FindCare } from "@/components/sections/find-care/find-care";
import { Faq, faqText } from "@/components/sections/faq/faq";
import { GetApp } from "@/components/sections/get-app/get-app";
import { Hero } from "@/components/sections/hero/hero";
import { Journey } from "@/components/sections/journey/journey";
import { LiveQueue } from "@/components/sections/live-queue/live-queue";
import { Promises } from "@/components/sections/promises/promises";
import { RightDoctor } from "@/components/sections/right-doctor/right-doctor";
import { UrgentCare } from "@/components/sections/urgent-care/urgent-care";
import { Windows } from "@/components/sections/windows/windows";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { PageShell } from "@/components/site/page-shell";
import { localePath, type Lang } from "@/lib/i18n";
import { teMeta } from "@/lib/i18n/meta";
import { site } from "@/lib/site";

/** The home page in a language: the English one at "/" and the Telugu one at "/te". */
export function HomePage({ lang }: { lang: Lang }) {
  const description = lang === "te" ? teMeta.description : site.description;
  const url = `${site.url}${localePath(lang, "/")}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/opflow-logo.png`,
      email: site.email,
      areaServed: "IN",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        areaServed: "IN",
        availableLanguage: ["English", "Telugu"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      alternateName: ["OPflow app", "OPflow OPD booking"],
      url: site.url,
      description,
      inLanguage: lang === "te" ? "te-IN" : "en-IN",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      url,
      description,
      applicationCategory: "HealthApplication",
      operatingSystem: "Android, iOS (web app)",
      inLanguage: ["en", "te"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqText(lang).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <PageShell lang={lang}>
      <JsonLd data={jsonLd} />
      <Header />
      <main id="main" className="flex-1">
        <Hero lang={lang} />
        <FindCare lang={lang} />
        <Windows lang={lang} />
        <LiveQueue lang={lang} />
        <Journey lang={lang} />
        <RightDoctor lang={lang} />
        <UrgentCare lang={lang} />
        <Promises lang={lang} />
        <GetApp lang={lang} />
        <Faq lang={lang} />
      </main>
      <Footer lang={lang} />
    </PageShell>
  );
}
