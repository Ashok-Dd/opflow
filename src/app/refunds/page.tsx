import type { Metadata } from "next";
import { LegalPage, Mail, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rescheduling & Refund Policy",
  description:
    "Patients can reschedule OPflow bookings; only doctors and hospitals can cancel, with a 100% refund. How refunds and the platform fee work.",
  alternates: { canonical: "/refunds" },
};

const CUTOFF = site.rescheduleCutoff;
const FEE = site.platformFeePercent;

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "At a glance",
    body: (
      <table>
        <thead>
          <tr>
            <th>What happened</th>
            <th>What happens to your money</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You can&apos;t make it at your window</td>
            <td>
              <strong>Reschedule free of charge</strong> to another open window, up to {CUTOFF}
            </td>
          </tr>
          <tr>
            <td>You want to cancel</td>
            <td>Patients can&apos;t cancel a paid booking. Please reschedule instead</td>
          </tr>
          <tr>
            <td>You miss your window without rescheduling</td>
            <td>No refund</td>
          </tr>
          <tr>
            <td>The doctor, clinic or hospital cancels</td>
            <td>
              <strong>100% refund</strong> of everything you paid, including the platform fee
            </td>
          </tr>
          <tr>
            <td>Payment failed but money was debited</td>
            <td>Automatic reversal to your account</td>
          </tr>
          <tr>
            <td>You were charged twice for one booking</td>
            <td>Duplicate amount refunded automatically</td>
          </tr>
          <tr>
            <td>You paid for a doctor suggestion, but no doctor was left to suggest</td>
            <td>
              <strong>100% refund</strong> of the suggestion fee, automatically
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "no-patient-cancel",
    title: "Why patients reschedule instead of cancelling",
    body: (
      <p>
        Every window has a fixed number of places. When you book, a place is held for you and turned away from someone
        else, often a patient travelling from another town. So a paid booking can&apos;t be cancelled by the patient.
        Plans do change, though, which is why you can move your booking to another window instead.
      </p>
    ),
  },
  {
    id: "reschedule",
    title: "Rescheduling your booking",
    body: (
      <>
        <p>
          Go to <strong>My Appointments → Reschedule</strong> in the app.
        </p>
        <ul>
          <li>You can reschedule up to {CUTOFF}.</li>
          <li>You can move to any open window with the same doctor, on the same day or a later day.</li>
          <li>Rescheduling is free. You can reschedule a booking once.</li>
          <li>Your new window and token appear straight away, and the old place is released for someone else.</li>
          <li>
            After the cut-off, or if you don&apos;t come to your window, the booking can&apos;t be rescheduled or
            refunded.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "provider-cancel",
    title: "When the doctor or hospital cancels",
    body: (
      <>
        <p>
          Only the doctor, clinic or hospital can cancel a booking or an OPD session, for example because of an
          emergency or leave. When they do:
        </p>
        <ul>
          <li>You are told in the app straight away.</li>
          <li>
            You get a <strong>100% refund</strong> of the full amount you paid, including OPflow&apos;s platform fee.
            Nothing is deducted.
          </li>
          <li>The refund starts automatically. You don&apos;t need to ask for it.</li>
          <li>You are free to book the same or another doctor again.</li>
        </ul>
      </>
    ),
  },
  {
    id: "delays",
    title: "Delays",
    body: (
      <p>
        Your booking is for an expected window, not an exact time. A delay on the doctor&apos;s side doesn&apos;t by
        itself make a booking refundable. If the doctor&apos;s delay means you can&apos;t wait, you can reschedule
        (subject to the cut-off above). If the session ends up cancelled, you get a 100% refund.
      </p>
    ),
  },
  {
    id: "platform-fee",
    title: "The platform fee",
    body: (
      <>
        <p>
          The amount you pay for a booking is the consultation fee shown on the doctor&apos;s profile. OPflow keeps{" "}
          <strong>{FEE}%</strong> of it as a platform fee for running bookings, payments, the live queue and
          notifications. The remaining {100 - FEE}% goes to the doctor or hospital.
        </p>
        <p>
          For example, on a ₹400 consultation, OPflow&apos;s platform fee is ₹{(400 * FEE) / 100} and the doctor or
          hospital receives ₹{400 - (400 * FEE) / 100}. The split doesn&apos;t change what you pay.
        </p>
        <p>
          When a doctor or hospital cancels, the platform fee is refunded to you too, so you get back 100% of what you
          paid.
        </p>
      </>
    ),
  },
  {
    id: "failed-payments",
    title: "Failed and duplicate payments",
    body: (
      <ul>
        <li>
          If your payment fails but money leaves your account, no booking is created and the amount is reversed
          automatically by the bank or payment gateway, usually within 5–7 working days.
        </li>
        <li>If you are charged more than once for the same booking, the extra amount is refunded automatically.</li>
        <li>You can retry a failed payment. We never confirm a booking until the payment is verified.</li>
      </ul>
    ),
  },
  {
    id: "timelines",
    title: "How and when refunds are paid",
    body: (
      <ul>
        <li>Refunds are initiated within 2 working days of the cancellation.</li>
        <li>
          They are credited to the <strong>original payment method</strong> (UPI, card, net banking or wallet),
          normally within 5–7 working days after initiation, depending on your bank.
        </li>
        <li>You can track refund status under My Appointments → Payment.</li>
      </ul>
    ),
  },
  {
    id: "delivery",
    title: "Service delivery",
    body: (
      <p>
        OPflow sells no physical goods and ships nothing. The service we deliver is the booking itself: once your
        payment is verified, your confirmation, token and window appear in the app immediately and are sent by
        notification or email. The consultation takes place in person at the hospital or clinic you booked.
      </p>
    ),
  },
  {
    id: "help",
    title: "Refund help",
    body: (
      <p>
        If a refund hasn&apos;t reached you within the times above, write to <Mail to={site.email} /> with your booking
        number. If it still isn&apos;t resolved, write again with “Grievance” in the subject.
      </p>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      path="/refunds"
      title="Rescheduling & Refund Policy"
      intro={
        <p>
          Patients can move a booking to another window but can&apos;t cancel it. Doctors and hospitals can cancel,
          and when they do, you get every rupee back. Here are the details.
        </p>
      }
      sections={sections}
    />
  );
}
