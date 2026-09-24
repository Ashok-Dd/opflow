import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "OPflow is a booking platform. It does not diagnose, give medical advice or provide emergency care.",
  alternates: { canonical: "/disclaimer" },
};

const sections: LegalSection[] = [
  {
    id: "emergency",
    title: "Not an emergency service",
    body: (
      <p className="warn">
        If you or someone else may be facing a life-threatening situation (for example chest pain, severe breathing
        difficulty, heavy bleeding, a seizure, poisoning or a serious injury), <strong>call 112 or 108 now</strong> or
        go to the nearest emergency department. Do not wait for an OPD appointment.
      </p>
    ),
  },
  {
    id: "no-advice",
    title: "No medical advice or diagnosis",
    body: (
      <p>
        OPflow does not provide medical advice, diagnosis or treatment. Nothing in the app or on this website should be
        read as medical advice. Always consult a qualified doctor about your health.
      </p>
    ),
  },
  {
    id: "symptom-search",
    title: "Symptom search is a signpost",
    body: (
      <p>
        When you search by symptom, OPflow suggests the kind of doctor who usually sees that complaint, such as General
        Medicine or ENT. It does not assess how serious your condition is or what is causing it. Some symptoms are
        routed to urgent care as a precaution.
      </p>
    ),
  },
  {
    id: "urgent-care",
    title: "Urgent-care listings",
    body: (
      <p>
        Doctors and hospitals appear as available in urgent care only when they or their hospital have declared it.
        Availability can change quickly, so please call before travelling where possible. A listing is not a guarantee
        that care will be available when you arrive.
      </p>
    ),
  },
  {
    id: "estimates",
    title: "Wait times are estimates",
    body: (
      <p>
        Appointment windows, token positions and wait times are estimates based on the clinic&apos;s updates and past
        consultations. Real OPDs vary, and emergencies are always seen first.
      </p>
    ),
  },
  {
    id: "providers",
    title: "Doctors are independent",
    body: (
      <p>
        Doctors, clinics and hospitals on OPflow are independent professionals and organisations. We verify
        registration details before listing a doctor, but we do not supervise, recommend or guarantee any
        consultation. Responsibility for medical care rests with the treating doctor.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      path="/disclaimer"
      title="Medical Disclaimer"
      intro={<p>OPflow helps you reach the right doctor at the right time. It is not a doctor itself.</p>}
      sections={sections}
    />
  );
}
