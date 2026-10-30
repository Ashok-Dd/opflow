import Link from "next/link";
import type { Metadata } from "next";
import { GuidePage, type GuideFaq, type GuideSection } from "@/components/guide/guide-page";
import { site } from "@/lib/site";

const path = "/opd-appointment-booking";

export const metadata: Metadata = {
  title: "How to book an OPD appointment online (OP booking app)",
  description:
    "What OPD and OP mean, and how to book a doctor's OPD appointment online in India with OPflow: pick a doctor, choose an hour-long window, pay, and follow the live token queue.",
  alternates: { canonical: path },
};

const sections: GuideSection[] = [
  {
    id: "what-is-opd",
    title: "What OPD and OP mean",
    body: (
      <>
        <p>
          OPD stands for <strong>outpatient department</strong>. It is where you see a doctor without being admitted to
          hospital. Many people just say <strong>OP</strong>, as in “OP timings”, “OP ticket” or “OP booking”. They all
          mean the same thing: a consultation with a doctor during their outpatient hours.
        </p>
        <p>
          Traditionally you reach the hospital early, take a token number at the counter and wait until the doctor calls
          it. An online OPD booking app moves the first half of that onto your phone.
        </p>
      </>
    ),
  },
  {
    id: "how-to-book",
    title: "How to book an OPD appointment with OPflow",
    body: (
      <>
        <ul>
          <li>
            <strong>Find a doctor.</strong> Search by specialty, symptom or hospital. If you are not sure which kind of
            doctor you need, OPflow can suggest the right one near you.
          </li>
          <li>
            <strong>Pick a window.</strong> The doctor&apos;s OPD is split into hour-long windows with a fixed number of
            places. Choose the day and the window that suits you.
          </li>
          <li>
            <strong>Pay online.</strong> Pay with UPI, card or net banking through our payment partner Cashfree
            Payments. Your booking is confirmed only after we verify the payment on our side.
          </li>
          <li>
            <strong>Follow the live queue.</strong> On the day, your phone shows the token in the room, how many people
            are ahead of you and roughly how long that means. Leave home when it is nearly your turn.
          </li>
        </ul>
        <p>
          You get an <strong>hour-long window</strong>, not an exact appointment time. Nobody honest can promise an exact
          minute in an OPD, so OPflow shows a live estimate that admits it is an estimate. See how the queue works in{" "}
          <Link href="/live-opd-token-queue">live OPD token queue</Link>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changing or cancelling a booking",
    body: (
      <p>
        Patients cannot cancel a booking, but you can <strong>reschedule it once, free</strong>, up to{" "}
        {site.rescheduleCutoff}, to any open window with the same doctor. If the doctor or hospital cancels, you get a{" "}
        <strong>100% refund</strong> automatically. The full rules are in the{" "}
        <Link href="/refunds">Rescheduling &amp; Refund Policy</Link>.
      </p>
    ),
  },
  {
    id: "walk-ins",
    title: "Can I still walk in?",
    body: (
      <p>
        Yes. Every doctor keeps places for walk-ins and emergencies. OPflow only manages the places the doctor chooses to
        open for online booking, so booking online never closes the door on anyone who walks in.
      </p>
    ),
  },
  {
    id: "emergencies",
    title: "When not to book online",
    body: (
      <p>
        An OPD booking is for planned consultations. OPflow does not diagnose or give medical advice. If something could
        be life-threatening, call <a href="tel:112">112</a> or <a href="tel:108">108</a>, or go straight to the nearest
        emergency department.
      </p>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Is there an OP booking app that shows the live token number?",
    a: "Yes. OPflow shows the token currently in the doctor's room, how many people are ahead of you, and a live estimate, so you can wait at home instead of at the hospital.",
  },
  {
    q: "Which hospitals and clinics can I book at?",
    a: "OPflow is starting small, one doctor, then one clinic, then a few more, so we learn how real OPDs run before opening widely. Clinics near you appear in the app as they join.",
  },
  {
    q: "Can I use OPflow on an iPhone?",
    a: `Yes. Until the App Store app is out, open ${site.webAppUrl.replace("https://", "")} in Safari. It works like the app, including payments and the live queue. OPflow works in English and Telugu.`,
  },
];

export default function Page() {
  return (
    <GuidePage
      path={path}
      title="How to book an OPD appointment online"
      intro={
        <p>
          A short guide to OPD (OP) appointment booking in India: what the terms mean, how online booking works, and how
          to stop spending the whole morning in a waiting hall.
        </p>
      }
      sections={sections}
      faqs={faqs}
      cta={{
        heading: "Book your next OPD visit on OPflow.",
        text: "Find a doctor, pick an hour-long window and follow the queue from home.",
      }}
    />
  );
}
