import { guideCard } from "@/lib/og-card";

export const alt = "Live OPD token queue, on your phone, with OPflow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return guideCard({ kicker: "Guide", title: "Live OPD token queue, on your phone" });
}
