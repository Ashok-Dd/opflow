import Link from "next/link";
import type { Metadata } from "next";
import { GuidePage, type GuideFaq, type GuideSection } from "@/components/guide/guide-page";
import { site } from "@/lib/site";

const path = "/for-doctors";

export const metadata: Metadata = {
  title: "OPD appointment software for doctors and clinics",
  description:
    "Run your OPD on OPflow: set your OPD days, hours and patients per hour, keep walk-in places, manage the live token queue and get paid online. No setup cost.",
  alternates: { canonical: path },
};

const sections: GuideSection[] = [
  {
    id: "what-you-get",
    title: "What doctors and clinics get",
    body: (
      <ul>
        <li>
          <strong>Your OPD, split into hour-long windows.</strong> You choose the OPD days, hours and patients per hour.
          Patients book into those places, so the crowd is spread across your hours instead of arriving all at 9 AM.
        </li>
        <li>
          <strong>Walk-ins stay.</strong> You decide how many places are open for online booking. The rest stay for
          walk-ins and emergencies, and you can change the split any day.
        </li>
        <li>
          <strong>A live queue you control.</strong> Call the next patient, finish visits and post a delay. Patients see
          it on their phones, so fewer people crowd the waiting hall.
        </li>
        <li>
          <strong>Online payments.</strong> Patients pay when they book, through UPI, cards or net banking. Payments are
          verified on our servers before a booking is confirmed.
        </li>
      </ul>
    ),
  },
  {
    id: "fees",
    title: "What it costs",
    body: (
      <p>
        There is no setup cost. OPflow keeps {site.platformFeePercent}% of each consultation booked through OPflow, and
        the rest is settled to the doctor or hospital. If a doctor or hospital cancels a booking, the patient gets a
        full refund. See the <Link href="/refunds">Rescheduling &amp; Refund Policy</Link> for how this works.
      </p>
    ),
  },
  {
    id: "getting-started",
    title: "How to get started",
    body: (
      <ul>
        <li>
          Write to <a href={`mailto:${site.email}?subject=${encodeURIComponent("Clinic onboarding")}`}>{site.email}</a>.
        </li>
        <li>The OPflow team verifies your qualifications and medical registration.</li>
        <li>We set up your account and give you an OPD ID and password.</li>
        <li>
          You set your OPD days, hours and patients per hour, in the app or on the doctor website, and patients can start
          booking.
        </li>
      </ul>
    ),
  },
  {
    id: "fair",
    title: "Fair to every doctor",
    body: (
      <p>
        When OPflow suggests doctors to patients, the suggestion is based on qualifications, experience, areas of
        practice and private feedback from patients who visited. Doctors can never pay to be suggested.
      </p>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Do I need to make every patient book online?",
    a: "No. Walk-ins stay. The doctor sets the split between online booking and walk-in places, every day if they like.",
  },
  {
    q: "Can I use OPflow on my computer?",
    a: "Yes. Doctors can run their OPD from the app or from the doctor website.",
  },
  {
    q: "Is there a setup fee?",
    a: `No. OPflow keeps ${site.platformFeePercent}% of each consultation booked through it, and settles the rest to you.`,
  },
];

export default function Page() {
  return (
    <GuidePage
      path={path}
      title="OPD appointment software for doctors and clinics"
      intro={
        <p>
          OPflow spreads your OPD patients across your hours, keeps walk-in places for the patients who come without
          booking, and shows patients a live queue so your waiting hall stays calm.
        </p>
      }
      sections={sections}
      faqs={faqs}
      cta={{
        heading: "Want to run your OPD on OPflow?",
        text: `Write to ${site.email} and we will set up your account.`,
      }}
    />
  );
}
