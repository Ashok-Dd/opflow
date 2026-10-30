import Link from "next/link";
import type { Metadata } from "next";
import { GuidePage, type GuideFaq, type GuideSection } from "@/components/guide/guide-page";

const path = "/live-opd-token-queue";

export const metadata: Metadata = {
  title: "Live OPD token queue: track your doctor's queue from home",
  description:
    "How the OPD token system works and how OPflow shows your doctor's live token queue, patients ahead of you and an honest wait estimate on your phone.",
  alternates: { canonical: path },
};

const sections: GuideSection[] = [
  {
    id: "token-system",
    title: "How the OPD token system works",
    body: (
      <p>
        In most hospitals, a patient takes a <strong>token number</strong> at the counter and the doctor sees patients in
        that order. The token board outside the room shows which number is being seen now. The catch is that you only
        find out how long the wait is once you are already sitting there.
      </p>
    ),
  },
  {
    id: "on-your-phone",
    title: "The same token board, on your phone",
    body: (
      <>
        <p>As the doctor calls the next patient and finishes each visit, your screen moves with the line. You see:</p>
        <ul>
          <li>the token currently in the room,</li>
          <li>how many people are ahead of you,</li>
          <li>roughly how long that means for you.</li>
        </ul>
        <p>So you can leave home when it is nearly your turn, not at 9 AM with everyone else.</p>
      </>
    ),
  },
  {
    id: "delays",
    title: "When the doctor is running late",
    body: (
      <p>
        The clinic updates the delay and you see it straight away, for example “about 20 minutes late”. The estimate is
        an estimate, and OPflow says so. It changes as the real queue moves.
      </p>
    ),
  },
  {
    id: "windows",
    title: "How windows and tokens fit together",
    body: (
      <p>
        Each doctor&apos;s OPD is split into hour-long windows with a set number of places, while walk-in and emergency
        places stay with the doctor. You book a window, and the live queue then takes over on the day. Read the full
        steps in <Link href="/opd-appointment-booking">how to book an OPD appointment online</Link>.
      </p>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Will I be seen at an exact time?",
    a: "No, and nobody honest can promise that in an OPD. You book an hour-long window, and the app keeps your estimate updated from the doctor's live queue.",
  },
  {
    q: "What happens if the doctor is running late?",
    a: "The clinic updates the delay and you see it straight away, so you can leave home later instead of waiting at the hospital.",
  },
];

export default function Page() {
  return (
    <GuidePage
      path={path}
      title="Live OPD token queue, on your phone"
      intro={
        <p>
          How the token queue in an OPD works, and how OPflow lets you follow it from home instead of from a crowded
          waiting hall.
        </p>
      }
      sections={sections}
      faqs={faqs}
      cta={{
        heading: "Follow your doctor's queue live.",
        text: "Book a window on OPflow and watch the token board from wherever you are.",
      }}
    />
  );
}
