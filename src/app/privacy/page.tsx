import type { Metadata } from "next";
import { LegalPage, Mail, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How OPflow collects, uses, shares and protects personal data of patients, doctors and clinics.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          OPflow is operated by <strong>{site.legalName}</strong> (CIN {site.cin}), registered at {site.address}{" "}
          (“OPflow”, “we”, “us”). For the purposes of the Digital Personal Data Protection Act, 2023 (“DPDP Act”),
          we are the <strong>Data Fiduciary</strong> for the personal data described in this policy.
        </p>
        <p>
          OPflow is a technology platform that helps patients book outpatient (OPD) consultation windows with
          independent doctors, clinics and hospitals (“Healthcare Providers”) and follow the live queue. We are not a
          healthcare provider.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "What this policy covers",
    body: (
      <p>
        This policy applies to the OPflow mobile app (patient portal and doctor & clinic portal), this website and
        any related services, notifications and support channels. It does not cover the practices of Healthcare
        Providers, who handle your consultation and medical records under their own obligations, or of third-party
        services you reach through links (for example, map apps).
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    body: (
      <>
        <h3>From patients</h3>
        <ul>
          <li><strong>Account data:</strong> mobile number (verified by OTP), name, and optionally email.</li>
          <li>
            <strong>Booking data:</strong> the patient&apos;s name, age, sex and relationship to you (for example, a
            child or parent you book for), the doctor, hospital, date, window, token and booking status.
          </li>
          <li>
            <strong>Queue data:</strong> arrival, called, completed, no-show and cancellation events recorded by the
            clinic for your booking.
          </li>
          <li>
            <strong>Payment data:</strong> amount, status, order and transaction references. Card, UPI and bank
            details are entered directly with our payment gateway (Cashfree Payments) and are <strong>not stored by OPflow</strong>.
          </li>
          <li>
            <strong>Search data:</strong> specialties, symptoms or hospitals you search for. Symptom search is used only
            to suggest a type of doctor.
          </li>
          <li>
            <strong>Location:</strong> only if you allow it: your area, from your phone&apos;s location, to show doctors
            and hospitals near you and distances, and to find doctors near you for a doctor suggestion.
          </li>
          <li>
            <strong>Doctor suggestions:</strong> when you ask for one, the type of doctor, your area, your agreement to
            the terms of the suggestion, the payment and the doctors suggested to you.
          </li>
          <li>
            <strong>Visit feedback:</strong> if you rate a finished visit, the rating (1 to 5) and your optional note.
            Only OPflow sees it; we use it to choose the doctors we suggest. It is never shown to the doctor or to other
            patients.
          </li>
          <li><strong>Support data:</strong> messages and call records when you contact us or a clinic through OPflow.</li>
        </ul>

        <h3>From doctors, clinic staff and hospitals</h3>
        <ul>
          <li>Name, photograph, specialty, qualifications, medical registration number and council, languages.</li>
          <li>Verification documents you submit, which are used only to verify your profile.</li>
          <li>Hospital or clinic details, OPD schedules, capacity, fees, delays and availability you publish.</li>
          <li>Bank or settlement details, if you receive payouts through OPflow.</li>
        </ul>

        <h3>Collected automatically</h3>
        <ul>
          <li>Device type, operating system, app version, IP address, crash reports and basic usage events.</li>
          <li>Push notification tokens, so we can send booking, delay and queue updates.</li>
        </ul>
        <p className="note">
          We follow data minimisation. OPflow V1 does not collect prescriptions, diagnoses, test reports or medical
          records. Please don&apos;t send them to us through support channels.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use personal data",
    body: (
      <ul>
        <li>To create and secure your account, including OTP login.</li>
        <li>To show doctors, hospitals, OPD schedules and open windows, and to make and manage bookings.</li>
        <li>To share your booking with the Healthcare Provider you chose, so they can see and serve you.</li>
        <li>To calculate queue positions, wait estimates and delays, and to notify you about them.</li>
        <li>To process payments, cancellations and refunds and to prevent duplicate or fraudulent payments.</li>
        <li>To verify doctors before their profiles become public.</li>
        <li>To provide support, resolve complaints and grievances, and send service messages.</li>
        <li>To keep the service secure, detect misuse and meet legal, tax and accounting obligations.</li>
        <li>
          To improve OPflow, for example queue-time predictions, using aggregated or de-identified data wherever
          possible.
        </li>
      </ul>
    ),
  },
  {
    id: "consent",
    title: "Consent and legal basis",
    body: (
      <>
        <p>
          We process personal data on the basis of your <strong>consent</strong>, given when you sign up, book, allow
          location or enable notifications, and for certain <strong>legitimate uses</strong> permitted by the DPDP Act,
          such as complying with law, responding to medical emergencies involving a threat to life, and processing that
          you have voluntarily provided data for.
        </p>
        <p>
          You can withdraw consent at any time from the app settings or by writing to us. Withdrawal does not affect
          processing already done, and some services (such as an active booking) may not be available without the data
          they need.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>We do not sell personal data. We share it only as needed to run OPflow:</p>
        <ul>
          <li><strong>Healthcare Providers</strong> you book with, and their authorised staff: booking and queue details.</li>
          <li><strong>Payment gateway</strong> (Cashfree Payments): to process payments and refunds, and to pay doctors their share.</li>
          <li>
            <strong>Service providers</strong> acting on our instructions: cloud hosting and databases, email delivery,
            SMS/OTP and push notifications, maps and analytics. They are bound by contracts to protect the data.
          </li>
          <li>
            <strong>Authorities</strong>, when required by law, court order or to protect the rights, safety or
            property of users, the public or OPflow.
          </li>
          <li>A successor entity in case of a merger or acquisition, under the same protections.</li>
        </ul>
        <p>
          Some providers may process data outside India. We transfer data only to countries not restricted by the
          Government of India under the DPDP Act, and with appropriate safeguards.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect data",
    body: (
      <ul>
        <li>Encryption in transit (HTTPS/TLS) and encryption at rest for our databases.</li>
        <li>Role-based access: a patient sees only their own bookings; a doctor or clinic sees only their own patients.</li>
        <li>Payment verification on our servers before any booking is confirmed.</li>
        <li>Access logs and audit trails for staff and admin actions on sensitive records.</li>
        <li>Regular backups and a recovery process.</li>
        <li>
          If a personal data breach occurs, we will inform affected users and the Data Protection Board of India as
          required by law.
        </li>
      </ul>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <>
        <p>We keep personal data only as long as needed for the purposes above:</p>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Kept for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account data</td>
              <td>While your account is active, then deleted or anonymised within 90 days of closure.</td>
            </tr>
            <tr>
              <td>Bookings, payments and refunds</td>
              <td>Up to 8 years, as required for tax and accounting records.</td>
            </tr>
            <tr>
              <td>Doctor verification documents</td>
              <td>While the profile is active and up to 3 years after, for audit.</td>
            </tr>
            <tr>
              <td>Logs and crash reports</td>
              <td>Up to 180 days, unless needed to investigate an incident.</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the DPDP Act you can:</p>
        <ul>
          <li>Get a summary of the personal data we process about you and who we share it with.</li>
          <li>Ask us to correct, complete, update or erase your personal data.</li>
          <li>Withdraw consent you have given.</li>
          <li>Nominate another person to exercise your rights in case of death or incapacity.</li>
          <li>Have your grievances addressed by our Grievance Officer, and then by the Data Protection Board of India.</li>
        </ul>
        <p>
          To exercise these rights, use the app settings or write to <Mail to={site.email} />. We may need to verify
          your identity first.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Accounts are for people aged 18 and above. Parents or lawful guardians can book for a child from their own
        account; by doing so they give consent on the child&apos;s behalf. We do not track, profile or send targeted
        advertising to children.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <p>
        This website uses only what is strictly needed to work and does not use advertising or cross-site tracking
        cookies. The app stores your session securely on your device so you stay signed in. If we add analytics, we
        will update this policy and ask for consent where required.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as OPflow changes or the law requires. We will change the date at the top and, for
        significant changes, notify you in the app or by email before they take effect.
      </p>
    ),
  },
  {
    id: "grievance",
    title: "Grievance Officer and contact",
    body: (
      <>
        <p>
          In line with the Information Technology Act, 2000, the rules made under it and the DPDP Act, our Grievance
          Officer is:
        </p>
        <p className="note">
          <strong>{site.grievanceOfficer.name}</strong>
          <br />
          {site.legalName}, {site.address}
          <br />
          Email: <Mail to={site.grievanceOfficer.email} />
        </p>
        <p>
          We acknowledge grievances within 24 hours and aim to resolve them within 15 days. For anything else, contact{" "}
          <Mail to={site.email} /> or see our <a href="/contact">Contact page</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      intro={
        <p>
          Your health appointments are personal. This policy explains what personal data OPflow collects, why, who it
          is shared with, how long we keep it and the rights you have over it.
        </p>
      }
      sections={sections}
    />
  );
}
