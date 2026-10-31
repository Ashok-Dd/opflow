import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "te",
  path: "/contact",
  title: "మమ్మల్ని సంప్రదించండి",
  description: "OPflow సహాయ బృందాన్ని సంప్రదించండి, మీ క్లినిక్ లేదా హాస్పిటల్‌ని చేర్చండి, లేదా ఫిర్యాదు పంపండి.",
});

export default function Contact() {
  return <ContactPage lang="te" />;
}
