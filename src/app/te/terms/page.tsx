import { LegalPage } from "@/components/legal/legal-page";
import { termsTe as c } from "@/content/legal/terms-te";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ lang: "te", path: "/terms", title: c.title, description: c.description });

export default function Page() {
  return <LegalPage lang="te" path="/terms" title={c.title} intro={c.intro} sections={c.sections} />;
}
