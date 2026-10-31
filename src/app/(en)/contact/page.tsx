import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "en",
  path: "/contact",
  title: "Contact Us",
  description: "Reach OPflow support, onboard your clinic or hospital, or send us a complaint.",
});

export default function Contact() {
  return <ContactPage lang="en" />;
}
