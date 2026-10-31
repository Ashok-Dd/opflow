import { LegalPage } from "@/components/legal/legal-page";
import { refundsTe as c } from "@/content/legal/refunds-te";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ lang: "te", path: "/refunds", title: c.title, description: c.description });

export default function Page() {
  return <LegalPage lang="te" path="/refunds" title={c.title} intro={c.intro} sections={c.sections} />;
}
