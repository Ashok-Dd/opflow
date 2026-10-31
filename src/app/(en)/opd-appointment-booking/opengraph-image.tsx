import { guideCard } from "@/lib/og-card";

export const alt = "How to book an OPD appointment online, with OPflow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return guideCard({ kicker: "Guide", title: "How to book an OPD appointment online" });
}
