export type Pick = { name: string; detail: string; reasons: string[] };
export type DoctorType = { id: string; label: string; heading: string; picks: Pick[] };

export const doctorTypes: DoctorType[] = [
  {
    id: "skin",
    label: "Skin",
    heading: "Skin doctor",
    picks: [
      {
        name: "Dr. Farah Siddiqui",
        detail: "Dermatology · City Care Hospital",
        reasons: ["MD Dermatology, 11 years of experience", "Treats acne, rashes and hair fall", "2.1 km from you"],
      },
      {
        name: "Dr. Anitha Varma",
        detail: "Dermatology · Sunrise Clinic",
        reasons: ["MBBS, DDVL, 8 years of experience", "Speaks Telugu, English and Hindi", "3.4 km from you"],
      },
    ],
  },
  {
    id: "child",
    label: "Child",
    heading: "Child doctor",
    picks: [
      {
        name: "Dr. Arjun Rao",
        detail: "Pediatrics · Sunrise Children's Clinic",
        reasons: ["MD Pediatrics, 12 years of experience", "Treats fevers, coughs, growth and vaccines", "3.4 km from you"],
      },
      {
        name: "Dr. Swathi Menon",
        detail: "Pediatrics · City Care Hospital",
        reasons: ["MBBS, DCH, 7 years of experience", "Speaks Telugu and English", "2.1 km from you"],
      },
    ],
  },
  {
    id: "heart",
    label: "Heart",
    heading: "Heart doctor",
    picks: [
      {
        name: "Dr. Venkat Raju",
        detail: "Cardiology · City Care Hospital",
        reasons: ["DM Cardiology, 15 years of experience", "Treats chest pain, BP and heart rhythm problems", "2.1 km from you"],
      },
      {
        name: "Dr. Prakash Naidu",
        detail: "Cardiology · Lotus Heart Centre",
        reasons: ["MD, DM Cardiology, 9 years of experience", "Speaks Telugu, English and Hindi", "5.2 km from you"],
      },
    ],
  },
  {
    id: "bones",
    label: "Bones & joints",
    heading: "Bone & joint doctor",
    picks: [
      {
        name: "Dr. Rahul Varma",
        detail: "Orthopedics · City Care Hospital",
        reasons: ["MS Orthopedics, 10 years of experience", "Treats joint pain, back pain and fractures", "2.1 km from you"],
      },
      {
        name: "Dr. Kiran Kumar",
        detail: "Orthopedics · Sunrise Clinic",
        reasons: ["DNB Orthopedics, 6 years of experience", "Sports injuries and knee problems", "3.4 km from you"],
      },
    ],
  },
  {
    id: "women",
    label: "Women's health",
    heading: "Women's health doctor",
    picks: [
      {
        name: "Dr. Kavya Reddy",
        detail: "Gynecology & Obstetrics · City Care Hospital",
        reasons: ["MS OBG, 13 years of experience", "Pregnancy care and period problems", "2.1 km from you"],
      },
      {
        name: "Dr. Lakshmi Prasanna",
        detail: "Gynecology · Sunrise Clinic",
        reasons: ["DGO, 9 years of experience", "Speaks Telugu and English", "3.4 km from you"],
      },
    ],
  },
];

/** What the patient gets after paying: a printed recommendation that feeds out of the slot. */
export function RecommendationSlip({ type }: { type: DoctorType }) {
  return (
    <div className="bg-white px-6 pt-6 pb-6 shadow-[0_1px_0_var(--color-rule),0_18px_30px_-18px_rgba(23,34,29,0.35)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dashed border-ink/40 pb-3">
        <span className="text-[15px] font-semibold">Your OPflow recommendation</span>
        <span className="font-mono text-[13px] text-ink-soft">₹99 · Paid</span>
      </div>
      <p className="border-b border-dashed border-ink/40 py-3 font-mono text-[12px] tracking-[0.08em] text-ink-soft uppercase">
        {type.heading} · near Bhimavaram
      </p>

      {type.picks.map((p, i) => (
        <div key={p.name} className="relative border-b border-dashed border-ink/40 py-4">
          <p className="font-mono text-[11px] tracking-[0.14em] text-fern uppercase">Suggestion {i + 1}</p>
          <p className="mt-1 pr-24 text-lg font-semibold">{p.name}</p>
          <p className="text-[14px] text-ink-soft">{p.detail}</p>
          <ul className="mt-3 space-y-1.5 text-[14px]">
            {p.reasons.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-fern" aria-hidden="true">
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
          <span
            className="absolute top-4 right-0 animate-stamp-in border-2 border-fern px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-fern uppercase [--stamp-tilt:-6deg]"
            style={{ animationDelay: `${1350 + i * 260}ms` }}
            aria-hidden="true"
          >
            Recommended
          </span>
        </div>
      ))}

      <p className="pt-4 text-[13px] leading-relaxed text-ink-soft">
        This is a recommendation, not a guarantee of treatment outcome. Book any of these doctors in the app.
      </p>
    </div>
  );
}
