/**
 * Business and legal details used across the site, the legal pages and structured data.
 *
 * TODO(before launch): replace every value in [square brackets]. Razorpay's website review and the
 * IT Rules / DPDP Act need a real legal entity, address, support contact and grievance officer.
 */
export const site = {
  name: "OPflow",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "OPflow spreads OPD patients across the doctor's hours. Find a doctor by specialty, symptom or hospital, book an hour-long consultation window, pay online and follow the live token queue.",

  legalName: "[Registered company name] Private Limited",
  cin: "[Company CIN]",
  address: "[Registered office address], [City], Andhra Pradesh [PIN], India",
  email: "[support@your-domain.in]",
  phone: "[+91 00000 00000]",
  supportHours: "Monday to Saturday, 9 AM – 7 PM IST",
  grievanceOfficer: {
    name: "[Grievance Officer name]",
    email: "[grievance@your-domain.in]",
  },
  jurisdiction: "[City], Andhra Pradesh",

  // Business rules shown in the policies. The app and backend must use the same numbers.
  platformFeePercent: 10, // OPflow's share of each consultation fee; the rest is settled to the doctor/hospital
  rescheduleCutoff: "2 hours before your window starts",

  legalUpdated: "24 September 2026",
} as const;

export const legalPages = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refunds", label: "Rescheduling & Refunds" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
  { href: "/contact", label: "Contact Us" },
] as const;
