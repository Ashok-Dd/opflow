/**
 * Business and legal details used across the site, the legal pages and structured data.
 *
 * The company details (registered name, CIN, office address, phone, Grievance Officer) are added here once the
 * company is registered; until then the site shows only OPflow and the email address.
 */
export const site = {
  name: "OPflow",
  // Falls back to the real domain so a missing variable never puts localhost into canonical links or the sitemap.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://opflow.in").replace(/\/+$/, ""),
  // Shown in Google results and share cards, so it names what the product is, not just the brand.
  title: "OPflow: OPD appointment booking app, book doctors and track the live token queue",
  description:
    "Book an OPD appointment online with OPflow. Find a doctor by specialty, symptom or hospital, pick an hour-long window, pay online and follow the live token queue from home. Works in English and Telugu.",
  keywords: [
    "OPflow",
    "OP booking app",
    "OPD booking app",
    "OPD appointment booking",
    "online OP booking",
    "doctor appointment app India",
    "book doctor appointment online",
    "OPD token number",
    "live OPD queue",
    "doctors OP timings",
    "hospital appointment app",
    "clinic appointment software",
  ],

  email: "info@opflow.in",
  // The OPflow app in the browser (works on iPhone and Android) until the store listings are live.
  webAppUrl: "https://opflow-alpha.vercel.app",
  supportHours: "Monday to Saturday, 9 AM – 7 PM IST",

  // Business rules shown in the policies. The app and backend must use the same numbers.
  platformFeePercent: 10, // OPflow's share of each consultation fee; the rest is settled to the doctor/hospital
  rescheduleCutoff: "2 hours before your window starts",

  legalUpdated: "28 September 2026",
} as const;

/** Plain-language guide pages that target what people search for. Listed in the footer and the sitemap. */
export const guidePages = [
  { href: "/opd-appointment-booking", label: "How to book an OPD appointment online" },
  { href: "/live-opd-token-queue", label: "Live OPD token queue" },
  { href: "/for-doctors", label: "OPD software for doctors and clinics" },
] as const;

export const legalPages = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refunds", label: "Rescheduling & Refunds" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
  { href: "/contact", label: "Contact Us" },
] as const;
