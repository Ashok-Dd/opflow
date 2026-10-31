import { GuideRoute, guideMetadata } from "@/components/guide/guide-route";

export const metadata = guideMetadata("opd-appointment-booking", "te");

export default function Page() {
  return <GuideRoute guide="opd-appointment-booking" lang="te" />;
}
