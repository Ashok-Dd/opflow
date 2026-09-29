/**
 * Business and legal details used across the site, the legal pages and structured data.
 *
 * The company details (registered name, CIN, office address, phone, Grievance Officer) are added here once the
 * company is registered; until then the site shows only OPflow and the email address.
 */
export const site = {
  name: "OPflow",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "OPflow spreads OPD patients across the doctor's hours. Find a doctor by specialty, symptom or hospital, book an hour-long consultation window, pay online and follow the live token queue.",

  email: "info@opflow.in",
  // The OPflow app in the browser (works on iPhone and Android) until the store listings are live.
  webAppUrl: "https://opflow-alpha.vercel.app",
  supportHours: "Monday to Saturday, 9 AM – 7 PM IST",

  // Business rules shown in the policies. The app and backend must use the same numbers.
  platformFeePercent: 10, // OPflow's share of each consultation fee; the rest is settled to the doctor/hospital
  rescheduleCutoff: "2 hours before your window starts",

  legalUpdated: "28 September 2026",
} as const;

export const legalPages = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refunds", label: "Rescheduling & Refunds" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
  { href: "/contact", label: "Contact Us" },
] as const;
