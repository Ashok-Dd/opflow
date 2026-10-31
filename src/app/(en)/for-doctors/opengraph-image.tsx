import { guideCard } from "@/lib/og-card";

export const alt = "OPD appointment software for doctors and clinics, OPflow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return guideCard({ kicker: "For doctors", title: "OPD appointment software for doctors and clinics" });
}
