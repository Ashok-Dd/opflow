import { LegalPage } from "@/components/legal/legal-page";
import { privacyTe as c } from "@/content/legal/privacy-te";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ lang: "te", path: "/privacy", title: c.title, description: c.description });

export default function Page() {
  return <LegalPage lang="te" path="/privacy" title={c.title} intro={c.intro} sections={c.sections} />;
}
