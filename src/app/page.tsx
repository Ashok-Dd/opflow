import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
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
    name: site.name,
    url: site.url,
    logo: `${site.url}/opflow-logo.png`,
    email: site.email,
    areaServed: "IN",
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
      <script
        type="application/ld+json"
        // Static, trusted data; "<" is escaped so nothing can break out of the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
