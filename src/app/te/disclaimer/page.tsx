import { LegalPage } from "@/components/legal/legal-page";
import { disclaimerTe as c } from "@/content/legal/disclaimer-te";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ lang: "te", path: "/disclaimer", title: c.title, description: c.description });

export default function Page() {
  return <LegalPage lang="te" path="/disclaimer" title={c.title} intro={c.intro} sections={c.sections} />;
}
