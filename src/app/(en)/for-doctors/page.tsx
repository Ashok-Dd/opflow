import { GuideRoute, guideMetadata } from "@/components/guide/guide-route";

export const metadata = guideMetadata("for-doctors", "en");

export default function Page() {
  return <GuideRoute guide="for-doctors" lang="en" />;
}
