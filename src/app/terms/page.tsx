import type { Metadata } from "next";
import { LegalPage, Mail, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when patients, doctors and clinics use OPflow.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <p>
        These Terms & Conditions (“Terms”) are an agreement between you and <strong>{site.legalName}</strong>{" "}
        (“OPflow”, “we”, “us”). By creating an account, booking an appointment or listing a practice on OPflow, you
        agree to these Terms, our <a href="/privacy">Privacy Policy</a>, our{" "}
        <a href="/refunds">Rescheduling & Refund Policy</a> and our <a href="/disclaimer">Medical Disclaimer</a>. If you
        don&apos;t agree, please don&apos;t use OPflow.
      </p>
    ),
  },
  {
    id: "what-opflow-is",
    title: "What OPflow is, and isn't",
    body: (
      <>
        <p>
          OPflow is a technology platform that lets patients discover doctors, book an{" "}
          <strong>expected consultation window</strong> for an outpatient (OPD) visit, pay online and follow the live
          queue. Doctors, clinics and hospitals (“Healthcare Providers”) are independent. They, not OPflow, provide
          medical consultation, diagnosis and treatment, and they are responsible for it.
        </p>
        <p className="warn">
          <strong>OPflow is not an emergency service.</strong> If a situation could be life-threatening, call 112 or
          108, or go to the nearest emergency department immediately.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    body: (
      <ul>
        <li>You must be 18 or older to hold an account. Parents or guardians may book for children and dependants.</li>
        <li>You sign in with a mobile number verified by OTP. Keep your device and OTPs private; you are responsible for activity on your account.</li>
        <li>Information you give us must be true and current. We may suspend accounts that use false details.</li>
      </ul>
    ),
  },
  {
    id: "bookings",
    title: "Bookings and appointment windows",
    body: (
      <>
        <ul>
          <li>
            A booking gives you a place in a <strong>window</strong> (for example, 10:00–11:00 AM) and a token. It is{" "}
            <strong>not a guarantee of being seen at an exact time</strong>. Consultations vary in length, and
            emergencies take priority.
          </li>
          <li>Wait times and delays shown in the app are estimates based on information from the clinic.</li>
          <li>A booking is confirmed only after your payment is successfully verified by us.</li>
          <li>
            Please arrive by the time shown on your booking and follow the clinic&apos;s instructions. If you arrive
            after your window, the clinic may see you later in the queue, reschedule you or treat the booking as a
            no-show under its policy.
          </li>
          <li>
            <strong>Patients cannot cancel a paid booking</strong>, but can reschedule it once, free of charge, up to{" "}
            {site.rescheduleCutoff}. A missed window without rescheduling is not refunded.
          </li>
          <li>
            Only Healthcare Providers can cancel a booking or session (for example, because of an emergency). When they
            do, you are told in the app and receive a <strong>100% refund</strong> of the amount you paid. See our{" "}
            <a href="/refunds">Rescheduling & Refund Policy</a>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payments",
    body: (
      <ul>
        <li>The consultation fee is set by the Healthcare Provider and shown before you pay. That is the amount you pay.</li>
        <li>
          OPflow retains a <strong>platform fee of {site.platformFeePercent}%</strong> of each consultation fee. The
          remaining {100 - site.platformFeePercent}% is settled to the Healthcare Provider. This split does not add to
          the amount you pay.
        </li>
        <li>
          Payments are processed by our payment gateway partner (Razorpay). OPflow does not store your card, UPI or
          bank credentials.
        </li>
        <li>All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</li>
      </ul>
    ),
  },
  {
    id: "providers",
    title: "Terms for doctors, clinics and hospitals",
    body: (
      <ul>
        <li>
          You must hold a valid registration with the National Medical Commission or the relevant State Medical
          Council (or the equivalent council for your field) and keep it current. Profiles go live only after
          verification.
        </li>
        <li>
          You are responsible for the accuracy of your profile, fees, OPD schedules, capacity, delays and declared
          emergency availability. Never show availability you cannot honour.
        </li>
        <li>
          You remain solely responsible for the medical care you provide and must follow applicable law and
          professional ethics, including patient confidentiality.
        </li>
        <li>
          You must use patient information from OPflow only to serve that booking, and make sure your staff accounts
          do the same.
        </li>
        <li>
          For every booking paid through OPflow, OPflow retains a platform fee of {site.platformFeePercent}% of the
          consultation fee and settles the remaining {100 - site.platformFeePercent}% to your registered bank account,
          on the settlement schedule in your provider agreement. The fee is charged per booking. For example, five
          patients booking five separate windows means five separate fees.
        </li>
        <li>
          You may cancel a booking or session when necessary. The patient then receives a full refund, including the
          platform fee, and no settlement is made for that booking. Frequent cancellations may lead to review of your
          listing.
        </li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>make fake, speculative or bulk bookings, or book to resell places;</li>
          <li>impersonate anyone, or list a doctor or hospital you are not authorised to represent;</li>
          <li>harass clinic staff, doctors or other users;</li>
          <li>scrape, reverse-engineer, disrupt or try to gain unauthorised access to OPflow;</li>
          <li>use OPflow for anything unlawful.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "Content and intellectual property",
    body: (
      <p>
        The OPflow name, logo, apps, website and their content belong to OPflow or its licensors. You get a limited,
        personal, non-transferable right to use the app for its intended purpose. Healthcare Providers grant us a
        licence to display the profile information and photos they submit on OPflow.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        OPflow is provided “as is”. We work to keep it accurate and available, but we don&apos;t guarantee
        uninterrupted service, exact wait times, or that every Healthcare Provider will be available as listed. We do
        not give medical advice and do not recommend or endorse any particular doctor. See the{" "}
        <a href="/disclaimer">Medical Disclaimer</a>.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, OPflow is not liable for the medical advice, diagnosis or treatment given by
        any Healthcare Provider, or for indirect or consequential losses. Our total liability for any claim relating to
        a booking is limited to the amount you paid through OPflow for that booking. Nothing in these Terms limits
        rights you have under the Consumer Protection Act, 2019 that cannot be excluded.
      </p>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to indemnify OPflow against claims arising from your breach of these Terms, your misuse of the
        platform or, for Healthcare Providers, the care you provide and the information you publish.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: (
      <p>
        You can delete your account at any time from the app. We may suspend or close accounts that break these Terms,
        endanger others or are required to be closed by law. Bookings already paid for will be handled under the{" "}
        <a href="/refunds">Rescheduling & Refund Policy</a>.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of India. Subject to your rights as a consumer, the courts at{" "}
        {site.jurisdiction} have jurisdiction. Please contact our Grievance Officer first. Most issues are resolved
        quickly that way.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms. We will change the date at the top and notify you of significant changes in the app
        or by email. Continuing to use OPflow after that means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Grievances and contact",
    body: (
      <p>
        Grievance Officer: <strong>{site.grievanceOfficer.name}</strong>,{" "}
        <Mail to={site.grievanceOfficer.email} />. General support: <Mail to={site.email} />, {site.phone} (
        {site.supportHours}). Registered office: {site.address}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms & Conditions"
      intro={
        <p>
          The rules for using OPflow, written as plainly as we could. They cover patients booking OPD windows and
          doctors, clinics and hospitals running their queue on OPflow.
        </p>
      }
      sections={sections}
    />
  );
}
