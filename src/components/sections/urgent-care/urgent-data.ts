// First aid as the app bundles it (app/lib/mock/first_aid.dart), trimmed for the landing page.
// Every line is copied from the app's WHO-based pages: never add home remedies or medicine doses here.

export type Place = { name: string; role: string; status: string; km: string; now: boolean };

export type Situation = {
  id: string;
  title: string;
  line: string;
  callNow: string;
  dos: string[];
  donts: string[];
  source: string;
  nearby: Place[];
};

const cityCare: Place = { name: "City Care Hospital", role: "Emergency department · 24 hours", status: "Open now", km: "2.1", now: true };
const areaHospital: Place = { name: "Government Area Hospital", role: "Emergency department · 24 hours", status: "Open now", km: "4.6", now: true };

export const situations: Situation[] = [
  {
    id: "heart",
    title: "Chest pain",
    line: "Pressure in the chest, pain in the arm or jaw",
    callNow: "Any of these signs. Call 108 now. Every minute counts.",
    dos: [
      "Stop all activity. Sit down and rest in a comfortable position.",
      "Loosen tight clothes.",
      "If the person collapses and is not breathing normally, start CPR if you know how.",
    ],
    donts: [
      "Do not let the person drive themselves to hospital.",
      "Do not wait to see if the pain goes away.",
      "Do not give food, drink or any medicine that was not prescribed.",
    ],
    source: "WHO fact sheet: Cardiovascular diseases",
    nearby: [cityCare, { name: "Dr. Venkat Raju", role: "Cardiology · City Care Hospital", status: "Available until 10 PM", km: "2.1", now: false }],
  },
  {
    id: "stroke",
    title: "Stroke signs",
    line: "Face drooping, weakness on one side, trouble speaking",
    callNow: "Any of these signs, even if they go away. Treatment works best in the first hours.",
    dos: [
      "Note the exact time the signs started, and tell the doctor.",
      "Go to a hospital that can do a brain scan, as fast as possible.",
      "If the person is drowsy or vomiting, lay them on their side.",
    ],
    donts: [
      "Do not give food, water or medicine. Swallowing may not be safe.",
      "Do not wait for the signs to pass or let the person “sleep it off”.",
    ],
    source: "WHO fact sheet: Cardiovascular diseases",
    nearby: [cityCare, areaHospital],
  },
  {
    id: "child",
    title: "Child very sick",
    line: "Can't drink, vomits everything, fits, very sleepy",
    callNow: "Any one danger sign: can't drink, vomits everything, fits, hard to wake, fast breathing.",
    dos: [
      "Go to the nearest hospital now.",
      "On the way, keep breastfeeding or giving small sips of fluid, if the child can drink.",
      "Keep a small baby warm, skin to skin with the mother if possible.",
    ],
    donts: [
      "Do not wait until morning or to see if it gets better.",
      "Do not give medicines on your own.",
      "Do not lose time with home remedies.",
    ],
    source: "WHO IMCI chart booklet",
    nearby: [{ name: "Dr. Arjun Rao", role: "Pediatrics · Sunrise Children's Clinic", status: "Available now", km: "3.4", now: true }, cityCare],
  },
  {
    id: "accident",
    title: "Accident & injury",
    line: "Road accidents, falls, heavy bleeding, head injury",
    callNow: "Heavy bleeding, a head injury, possible broken bones, or the person is not fully awake.",
    dos: [
      "Make the place safe first: watch for traffic, fire or falling objects.",
      "Press firmly on a bleeding wound with a clean cloth, and keep pressing.",
      "If the neck or back may be hurt, keep the head and body still.",
    ],
    donts: [
      "Do not move the person unless they are in danger where they are.",
      "Do not pull out objects stuck in a wound. Press around them instead.",
      "Do not give food or drink.",
    ],
    source: "WHO/ICRC Basic Emergency Care",
    nearby: [cityCare, { name: "Dr. Rahul Varma", role: "Orthopedics · City Care Hospital", status: "Available until 9 PM", km: "2.1", now: false }],
  },
  {
    id: "snake",
    title: "Snake bite",
    line: "Every bite needs a hospital, even without pain",
    callNow: "Always. Call 108 or go to the nearest hospital now.",
    dos: [
      "Keep the person calm and as still as possible. Moving spreads the venom faster.",
      "Take off rings, bangles and tight clothes near the bite, before swelling starts.",
      "Carry them to hospital if you can; do not let them walk or run.",
    ],
    donts: [
      "Do not tie a tight cloth, rope or band around the limb.",
      "Do not cut the bite or try to suck out the venom.",
      "Do not go to a traditional healer. It wastes time the person does not have.",
    ],
    source: "WHO fact sheet: Snakebite envenoming",
    nearby: [areaHospital, cityCare],
  },
  {
    id: "burn",
    title: "Burns",
    line: "Fire, hot liquids, electricity or chemicals",
    callNow: "Large or deep burns, burns on the face or hands, electric or chemical burns.",
    dos: [
      "Make sure you are safe first. Switch off electricity or gas.",
      "Cool the burn with cool (not cold) running water as soon as possible.",
      "Cover the burn loosely with a clean cloth or clean plastic wrap.",
    ],
    donts: [
      "Do not put paste, oil, haldi, toothpaste or raw cotton on the burn.",
      "Do not put ice on the burn. It makes the injury deeper.",
      "Do not break blisters.",
    ],
    source: "WHO fact sheet: Burns",
    nearby: [cityCare, areaHospital],
  },
  {
    id: "fits",
    title: "Fits",
    line: "Jerking, stiffening, not responding",
    callNow: "The fit lasts more than 5 minutes, or another starts before the person wakes up.",
    dos: [
      "Stay calm and note the time the fit started.",
      "Move hard or sharp things away. Put something soft under the head.",
      "When the jerking stops, turn the person onto their side.",
    ],
    donts: [
      "Do not put anything in the mouth: no spoon, cloth, fingers or water.",
      "Do not hold the person down or try to stop the movements.",
    ],
    source: "WHO mhGAP Intervention Guide 2.0",
    nearby: [cityCare, { name: "Dr. Meera Iyer", role: "General Medicine · City Care Hospital", status: "Available now", km: "2.1", now: true }],
  },
  {
    id: "pregnancy",
    title: "Pregnancy",
    line: "Bleeding, fits, severe pain or headache",
    callNow: "Any bleeding, fits, a very bad headache with blurred vision, or very bad stomach pain.",
    dos: [
      "Go to the hospital now. Take someone with you.",
      "Take your pregnancy card or reports.",
      "While waiting for transport, lie on your left side.",
    ],
    donts: ["Do not wait until morning.", "Do not take any medicine or home remedy on your own."],
    source: "WHO Pregnancy, childbirth, postpartum and newborn care",
    nearby: [
      { name: "Dr. Kavya Reddy", role: "Obstetrics · City Care Hospital", status: "Available until 11 PM", km: "2.1", now: false },
      { name: "City Care Hospital", role: "Labour room · 24 hours", status: "Open now", km: "2.1", now: true },
    ],
  },
];
