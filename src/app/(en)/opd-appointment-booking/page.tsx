import { GuideRoute, guideMetadata } from "@/components/guide/guide-route";

export const metadata = guideMetadata("opd-appointment-booking", "en");

export default function Page() {
  return <GuideRoute guide="opd-appointment-booking" lang="en" />;
}
