export type Doctor = { name: string; specialty: string; hospital: string; next: string };
export type Hospital = { name: string; area: string; km: string; status: string };

export const doctors: Doctor[] = [
  { name: "Dr. Meera Iyer", specialty: "General Medicine", hospital: "City Care Hospital", next: "Today 11 AM – 12 PM" },
  { name: "Dr. Suresh Babu", specialty: "General Medicine", hospital: "Sunrise Children's Clinic", next: "Today 12 – 1 PM" },
  { name: "Dr. Arjun Rao", specialty: "Pediatrics", hospital: "Sunrise Children's Clinic", next: "Today 5 – 6 PM" },
  { name: "Dr. Sameer Khan", specialty: "ENT", hospital: "Sri Sai Eye & ENT Centre", next: "Tomorrow 10 – 11 AM" },
  { name: "Dr. Lavanya Rao", specialty: "ENT", hospital: "City Care Hospital", next: "Today 12 – 1 PM" },
  { name: "Dr. Kavya Reddy", specialty: "Gynecology & Obstetrics", hospital: "City Care Hospital", next: "Today 12 – 1 PM" },
  { name: "Dr. Farah Siddiqui", specialty: "Dermatology", hospital: "City Care Hospital", next: "Today 4 – 5 PM" },
  { name: "Dr. Rahul Varma", specialty: "Orthopedics", hospital: "City Care Hospital", next: "Tomorrow 9 – 10 AM" },
  { name: "Dr. Priya Nair", specialty: "Ophthalmology", hospital: "Sri Sai Eye & ENT Centre", next: "Today 11 AM – 12 PM" },
  { name: "Dr. Venkat Raju", specialty: "Cardiology", hospital: "City Care Hospital", next: "Thu 10 – 11 AM" },
];

export const hospitals: Hospital[] = [
  { name: "City Care Hospital", area: "Bhimavaram", km: "2.1", status: "OPD open until 1 PM" },
  { name: "Sunrise Children's Clinic", area: "Tanuku", km: "3.4", status: "OPD opens 5 PM" },
  { name: "Sri Sai Eye & ENT Centre", area: "Main Bazaar", km: "6.8", status: "OPD open until 1 PM" },
];

// Where a symptom points. A signpost to a kind of doctor, never a diagnosis.
export const symptoms: Record<string, string[] | "urgent"> = {
  fever: ["General Medicine", "Pediatrics"],
  cough: ["General Medicine"],
  "cold": ["General Medicine", "ENT"],
  "sore throat": ["ENT", "General Medicine"],
  headache: ["General Medicine"],
  "ear pain": ["ENT"],
  "skin rash": ["Dermatology"],
  acne: ["Dermatology"],
  "hair fall": ["Dermatology"],
  "eye redness": ["Ophthalmology"],
  "joint pain": ["Orthopedics", "General Medicine"],
  "back pain": ["Orthopedics"],
  "stomach pain": ["General Medicine"],
  "menstrual problems": ["Gynecology & Obstetrics"],
  pregnancy: ["Gynecology & Obstetrics"],
  "chest pain": "urgent",
  "breathing difficulty": "urgent",
};

export const specialties = [...new Set(doctors.map((d) => d.specialty))];

export type Result =
  | { kind: "empty" }
  | { kind: "urgent"; symptom: string }
  | { kind: "symptom"; symptom: string; specialties: string[]; doctors: Doctor[] }
  | { kind: "specialty"; specialty: string; doctors: Doctor[] }
  | { kind: "hospital"; hospital: Hospital; doctors: Doctor[] }
  | { kind: "none" };

export function search(raw: string): Result {
  const q = raw.trim().toLowerCase();
  if (q.length < 2) return { kind: "empty" };

  const sym = Object.keys(symptoms).find((s) => s.startsWith(q) || (q.length > 3 && s.includes(q)));
  if (sym) {
    const target = symptoms[sym];
    if (target === "urgent") return { kind: "urgent", symptom: sym };
    return { kind: "symptom", symptom: sym, specialties: target, doctors: doctors.filter((d) => target.includes(d.specialty)) };
  }

  const spec = specialties.find((s) => s.toLowerCase().startsWith(q) || s.toLowerCase().includes(q));
  if (spec) return { kind: "specialty", specialty: spec, doctors: doctors.filter((d) => d.specialty === spec) };

  const hosp = hospitals.find((h) => `${h.name} ${h.area}`.toLowerCase().includes(q));
  if (hosp) return { kind: "hospital", hospital: hosp, doctors: doctors.filter((d) => d.hospital === hosp.name) };

  const doc = doctors.filter((d) => d.name.toLowerCase().includes(q));
  if (doc.length) return { kind: "specialty", specialty: doc[0].specialty, doctors: doc };

  return { kind: "none" };
}
