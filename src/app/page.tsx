import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { Hero } from "@/components/sections/hero/hero";
import { FindCare } from "@/components/sections/find-care/find-care";
import { RightDoctor } from "@/components/sections/right-doctor/right-doctor";
import { Journey } from "@/components/sections/journey/journey";
import { Windows } from "@/components/sections/windows/windows";
import { LiveQueue } from "@/components/sections/live-queue/live-queue";
import { UrgentCare } from "@/components/sections/urgent-care/urgent-care";
import { Promises } from "@/components/sections/promises/promises";
import { GetApp } from "@/components/sections/get-app/get-app";
import { Faq, faqs } from "@/components/sections/faq/faq";
import { site } from "@/lib/site";

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
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${site.url}/#app`,
    name: site.name,
    url: site.url,
    description: site.description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Android, iOS (web app)",
    inLanguage: ["en", "te"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${site.url}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main className="flex-1">
        <Hero />
        <FindCare />
        <Windows />
        <LiveQueue />
        <Journey />
        <RightDoctor />
        <UrgentCare />
        <Promises />
        <GetApp />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
