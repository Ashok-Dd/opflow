import Link from "next/link";
import type { ReactNode } from "react";
import type { GuideFaq, GuideSection } from "@/components/guide/guide-page";
import { localePath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** What a guide page says, in one language. */
export type GuideContent = {
  title: string;
  /** Used for the browser tab and search results (the page's own heading is `title`). */
  metaTitle: string;
  description: string;
  intro: ReactNode;
  sections: GuideSection[];
  faqs: GuideFaq[];
  cta: { heading: string; text: string };
};

export type GuideKey = "opd-appointment-booking" | "live-opd-token-queue" | "for-doctors";

const webApp = site.webAppUrl.replace("https://", "");
const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

/** The three guides, in English and Telugu. The Telugu follows the English paragraph by paragraph. */
export function guideContent(key: GuideKey, lang: Lang): GuideContent {
  const link = (path: string) => localePath(lang, path);

  const guides: Record<GuideKey, Record<Lang, GuideContent>> = {
    "opd-appointment-booking": {
      en: {
        title: "How to book an OPD appointment online",
        metaTitle: "How to book an OPD appointment online (OP booking app)",
        description:
          "What OPD and OP mean, and how to book a doctor's OPD appointment online in India with OPflow: pick a doctor, choose an hour-long window, pay, and follow the live token queue.",
        intro: (
          <p>
            A short guide to OPD (OP) appointment booking in India: what the terms mean, how online booking works, and how
            to stop spending the whole morning in a waiting hall.
          </p>
        ),
        sections: [
          {
            id: "what-is-opd",
            title: "What OPD and OP mean",
            body: (
              <>
                <p>
                  OPD stands for <strong>outpatient department</strong>. It is where you see a doctor without being admitted
                  to hospital. Many people just say <strong>OP</strong>, as in “OP timings”, “OP ticket” or “OP booking”.
                  They all mean the same thing: a consultation with a doctor during their outpatient hours.
                </p>
                <p>
                  Traditionally you reach the hospital early, take a token number at the counter and wait until the doctor
                  calls it. An online OPD booking app moves the first half of that onto your phone.
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
                    <strong>Find a doctor.</strong> Search by specialty, symptom or hospital. If you are not sure which kind
                    of doctor you need, OPflow can suggest the right one near you.
                  </li>
                  <li>
                    <strong>Pick a window.</strong> The doctor&apos;s OPD is split into hour-long windows with a fixed number
                    of places. Choose the day and the window that suits you.
                  </li>
                  <li>
                    <strong>Pay online.</strong> Pay with UPI, card or net banking through our payment partner Cashfree
                    Payments. Your booking is confirmed only after we verify the payment on our side.
                  </li>
                  <li>
                    <strong>Follow the live queue.</strong> On the day, your phone shows the token in the room, how many
                    people are ahead of you and roughly how long that means. Leave home when it is nearly your turn.
                  </li>
                </ul>
                <p>
                  You get an <strong>hour-long window</strong>, not an exact appointment time. Nobody honest can promise an
                  exact minute in an OPD, so OPflow shows a live estimate that admits it is an estimate. See how the queue
                  works in <Link href={link("/live-opd-token-queue")}>live OPD token queue</Link>.
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
                {site.rescheduleCutoff}, to any open window with the same doctor. If the doctor or hospital cancels, you get
                a <strong>100% refund</strong> automatically. The full rules are in the{" "}
                <Link href={link("/refunds")}>Rescheduling &amp; Refund Policy</Link>.
              </p>
            ),
          },
          {
            id: "walk-ins",
            title: "Can I still walk in?",
            body: (
              <p>
                Yes. Every doctor keeps places for walk-ins and emergencies. OPflow only manages the places the doctor
                chooses to open for online booking, so booking online never closes the door on anyone who walks in.
              </p>
            ),
          },
          {
            id: "emergencies",
            title: "When not to book online",
            body: (
              <p>
                An OPD booking is for planned consultations. OPflow does not diagnose or give medical advice. If something
                could be life-threatening, call <a href="tel:112">112</a> or <a href="tel:108">108</a>, or go straight to the
                nearest emergency department.
              </p>
            ),
          },
        ],
        faqs: [
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
            a: `Yes. Until the App Store app is out, open ${webApp} in Safari. It works like the app, including payments and the live queue. OPflow works in English and Telugu.`,
          },
        ],
        cta: {
          heading: "Book your next OPD visit on OPflow.",
          text: "Find a doctor, pick an hour-long window and follow the queue from home.",
        },
      },
      te: {
        title: "OPD అపాయింట్‌మెంట్ ఆన్‌లైన్‌లో ఎలా బుక్ చేయాలి",
        metaTitle: "OPD అపాయింట్‌మెంట్ ఆన్‌లైన్‌లో ఎలా బుక్ చేయాలి (OP బుకింగ్ యాప్)",
        description:
          "OPD, OP అంటే ఏమిటో, OPflow తో భారతదేశంలో డాక్టర్ OPD అపాయింట్‌మెంట్ ఆన్‌లైన్‌లో ఎలా బుక్ చేయాలో తెలుసుకోండి: డాక్టర్‌ని ఎంచుకోండి, గంట సమయం ఎంచుకోండి, చెల్లించండి, లైవ్ టోకెన్ లైన్ చూడండి.",
        intro: (
          <p>
            భారతదేశంలో OPD (OP) అపాయింట్‌మెంట్ బుకింగ్‌కు చిన్న గైడ్: పదాల అర్థం ఏమిటి, ఆన్‌లైన్ బుకింగ్ ఎలా పనిచేస్తుంది,
            ఉదయం అంతా వెయిటింగ్ హాల్‌లో గడపకుండా ఎలా ఉండాలి.
          </p>
        ),
        sections: [
          {
            id: "what-is-opd",
            title: "OPD, OP అంటే ఏమిటి",
            body: (
              <>
                <p>
                  OPD అంటే <strong>ఔట్‌పేషెంట్ డిపార్ట్‌మెంట్</strong>. ఇక్కడ మీరు హాస్పిటల్‌లో చేరకుండానే డాక్టర్‌ని చూస్తారు.
                  చాలామంది కేవలం <strong>OP</strong> అంటారు, ఉదాహరణకు “OP టైమింగ్స్”, “OP టికెట్”, “OP బుకింగ్”. అన్నింటి
                  అర్థం ఒకటే: డాక్టర్ ఔట్‌పేషెంట్ సమయాల్లో ఆయనతో సంప్రదింపు.
                </p>
                <p>
                  సంప్రదాయంగా మీరు హాస్పిటల్‌కి త్వరగా చేరి, కౌంటర్ దగ్గర టోకెన్ నంబర్ తీసుకుని, డాక్టర్ దాన్ని పిలిచే వరకు
                  వేచి ఉంటారు. ఆన్‌లైన్ OPD బుకింగ్ యాప్ ఇందులో మొదటి సగాన్ని మీ ఫోన్‌కి తీసుకొస్తుంది.
                </p>
              </>
            ),
          },
          {
            id: "how-to-book",
            title: "OPflow తో OPD అపాయింట్‌మెంట్ ఎలా బుక్ చేయాలి",
            body: (
              <>
                <ul>
                  <li>
                    <strong>డాక్టర్‌ని వెతకండి.</strong> స్పెషాలిటీ, లక్షణం లేదా హాస్పిటల్ ద్వారా వెతకండి. మీకు ఏ రకం డాక్టర్
                    కావాలో తెలియకపోతే, మీ దగ్గరలోని సరైన డాక్టర్‌ని OPflow సూచించగలదు.
                  </li>
                  <li>
                    <strong>సమయం ఎంచుకోండి.</strong> డాక్టర్ OPD ని నిర్ణీత స్థానాలతో ఒక్కో గంట సమయాలుగా విభజిస్తారు. మీకు
                    సరిపోయే రోజు, సమయం ఎంచుకోండి.
                  </li>
                  <li>
                    <strong>ఆన్‌లైన్‌లో చెల్లించండి.</strong> మా చెల్లింపు భాగస్వామి Cashfree Payments ద్వారా UPI, కార్డ్ లేదా
                    నెట్ బ్యాంకింగ్‌తో చెల్లించండి. చెల్లింపును మా వైపు ధృవీకరించిన తర్వాతే మీ బుకింగ్ నిర్ధారణ అవుతుంది.
                  </li>
                  <li>
                    <strong>లైవ్ లైన్ చూడండి.</strong> ఆ రోజున, గదిలో ఉన్న టోకెన్, మీ ముందు ఎంతమంది ఉన్నారు, దానికి సుమారు ఎంత
                    సమయం పడుతుందో మీ ఫోన్ చూపిస్తుంది. మీ వంతు దగ్గర పడినప్పుడే ఇంటి నుంచి బయలుదేరండి.
                  </li>
                </ul>
                <p>
                  మీకు వచ్చేది <strong>ఒక గంట సమయం</strong>, ఖచ్చితమైన అపాయింట్‌మెంట్ సమయం కాదు. OPD లో ఖచ్చితమైన నిమిషాన్ని
                  నిజాయితీగా ఉన్న ఎవరూ హామీ ఇవ్వలేరు, అందుకే OPflow అంచనా అని ఒప్పుకునే లైవ్ అంచనాను చూపిస్తుంది. లైన్ ఎలా
                  పనిచేస్తుందో <Link href={link("/live-opd-token-queue")}>లైవ్ OPD టోకెన్ లైన్</Link> లో చూడండి.
                </p>
              </>
            ),
          },
          {
            id: "changes",
            title: "బుకింగ్ మార్చడం లేదా రద్దు చేయడం",
            body: (
              <p>
                పేషెంట్లు బుకింగ్ రద్దు చేయలేరు, కానీ మీ సమయం మొదలవడానికి 2 గంటల ముందు వరకు అదే డాక్టర్‌తో ఖాళీ ఉన్న ఏ
                సమయానికైనా <strong>ఒకసారి ఉచితంగా మార్చుకోవచ్చు</strong>. డాక్టర్ లేదా హాస్పిటల్ రద్దు చేస్తే, మీకు
                ఆటోమేటిక్‌గా <strong>100% వాపసు</strong> వస్తుంది. పూర్తి నియమాలు{" "}
                <Link href={link("/refunds")}>సమయం మార్పు &amp; వాపసు విధానం</Link> లో ఉన్నాయి.
              </p>
            ),
          },
          {
            id: "walk-ins",
            title: "ఇంకా నేరుగా వెళ్ళవచ్చా?",
            body: (
              <p>
                అవును. ప్రతి డాక్టర్ నేరుగా వచ్చేవారికి, అత్యవసరాలకు స్థానాలు ఉంచుతారు. ఆన్‌లైన్ బుకింగ్ కోసం డాక్టర్ తెరిచిన
                స్థానాలను మాత్రమే OPflow నిర్వహిస్తుంది, కాబట్టి ఆన్‌లైన్‌లో బుక్ చేయడం వల్ల నేరుగా వచ్చేవారికి తలుపులు
                మూసుకుపోవు.
              </p>
            ),
          },
          {
            id: "emergencies",
            title: "ఆన్‌లైన్‌లో బుక్ చేయకూడని సందర్భాలు",
            body: (
              <p>
                OPD బుకింగ్ ముందుగా ప్లాన్ చేసిన సంప్రదింపుల కోసం. OPflow రోగ నిర్ధారణ చేయదు, వైద్య సలహా ఇవ్వదు. ప్రాణాపాయం
                కావచ్చనిపిస్తే, <a href="tel:112">112</a> లేదా <a href="tel:108">108</a> కి కాల్ చేయండి, లేదా నేరుగా దగ్గరలోని
                ఎమర్జెన్సీ విభాగానికి వెళ్ళండి.
              </p>
            ),
          },
        ],
        faqs: [
          {
            q: "లైవ్ టోకెన్ నంబర్ చూపించే OP బుకింగ్ యాప్ ఏదైనా ఉందా?",
            a: "ఉంది. గదిలో ప్రస్తుతం ఉన్న టోకెన్‌ను, మీ ముందు ఎంతమంది ఉన్నారో, లైవ్ అంచనాను OPflow చూపిస్తుంది, కాబట్టి హాస్పిటల్‌లో కాకుండా ఇంట్లోనే వేచి ఉండవచ్చు.",
          },
          {
            q: "నేను ఏ హాస్పిటళ్లు, క్లినిక్‌లలో బుక్ చేయవచ్చు?",
            a: "OPflow చిన్నగా మొదలవుతోంది: ఒక డాక్టర్, తర్వాత ఒక క్లినిక్, ఆపై మరికొన్ని, విస్తృతంగా తెరవడానికి ముందు నిజమైన OPDలు ఎలా నడుస్తాయో నేర్చుకోవడానికి. మీ దగ్గరలోని క్లినిక్‌లు చేరిన కొద్దీ యాప్‌లో కనిపిస్తాయి.",
          },
          {
            q: "నేను ఐఫోన్‌లో OPflow వాడవచ్చా?",
            a: `అవును. App Store యాప్ వచ్చే వరకు, Safari లో ${webApp} తెరవండి. ఇది యాప్ లాగే పనిచేస్తుంది, చెల్లింపులు, లైవ్ లైన్‌తో సహా. OPflow ఇంగ్లీష్, తెలుగులో పనిచేస్తుంది.`,
          },
        ],
        cta: {
          heading: "మీ తర్వాతి OPD విజిట్‌ని OPflow లో బుక్ చేయండి.",
          text: "డాక్టర్‌ని వెతకండి, ఒక గంట సమయం ఎంచుకోండి, ఇంటి నుంచే లైన్‌ను అనుసరించండి.",
        },
      },
    },

    "live-opd-token-queue": {
      en: {
        title: "Live OPD token queue, on your phone",
        metaTitle: "Live OPD token queue: track your doctor's queue from home",
        description:
          "How the OPD token system works and how OPflow shows your doctor's live token queue, patients ahead of you and an honest wait estimate on your phone.",
        intro: (
          <p>
            How the token queue in an OPD works, and how OPflow lets you follow it from home instead of from a crowded
            waiting hall.
          </p>
        ),
        sections: [
          {
            id: "token-system",
            title: "How the OPD token system works",
            body: (
              <p>
                In most hospitals, a patient takes a <strong>token number</strong> at the counter and the doctor sees
                patients in that order. The token board outside the room shows which number is being seen now. The catch is
                that you only find out how long the wait is once you are already sitting there.
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
                The clinic updates the delay and you see it straight away, for example “about 20 minutes late”. The estimate
                is an estimate, and OPflow says so. It changes as the real queue moves.
              </p>
            ),
          },
          {
            id: "windows",
            title: "How windows and tokens fit together",
            body: (
              <p>
                Each doctor&apos;s OPD is split into hour-long windows with a set number of places, while walk-in and
                emergency places stay with the doctor. You book a window, and the live queue then takes over on the day.
                Read the full steps in{" "}
                <Link href={link("/opd-appointment-booking")}>how to book an OPD appointment online</Link>.
              </p>
            ),
          },
        ],
        faqs: [
          {
            q: "Will I be seen at an exact time?",
            a: "No, and nobody honest can promise that in an OPD. You book an hour-long window, and the app keeps your estimate updated from the doctor's live queue.",
          },
          {
            q: "What happens if the doctor is running late?",
            a: "The clinic updates the delay and you see it straight away, so you can leave home later instead of waiting at the hospital.",
          },
        ],
        cta: {
          heading: "Follow your doctor's queue live.",
          text: "Book a window on OPflow and watch the token board from wherever you are.",
        },
      },
      te: {
        title: "లైవ్ OPD టోకెన్ లైన్, మీ ఫోన్‌లో",
        metaTitle: "లైవ్ OPD టోకెన్ లైన్: ఇంటి నుంచే డాక్టర్ లైన్‌ను అనుసరించండి",
        description:
          "OPD టోకెన్ వ్యవస్థ ఎలా పనిచేస్తుంది, OPflow డాక్టర్ లైవ్ టోకెన్ లైన్‌ను, మీ ముందు ఉన్నవారిని, నిజాయితీగా ఉండే నిరీక్షణ అంచనాను మీ ఫోన్‌లో ఎలా చూపిస్తుంది.",
        intro: (
          <p>
            OPD లో టోకెన్ లైన్ ఎలా పనిచేస్తుంది, రద్దీగా ఉండే వెయిటింగ్ హాల్‌లో కాకుండా ఇంటి నుంచే దాన్ని OPflow ఎలా
            అనుసరించనిస్తుంది.
          </p>
        ),
        sections: [
          {
            id: "token-system",
            title: "OPD టోకెన్ వ్యవస్థ ఎలా పనిచేస్తుంది",
            body: (
              <p>
                చాలా హాస్పిటళ్లలో, పేషెంట్ కౌంటర్ దగ్గర <strong>టోకెన్ నంబర్</strong> తీసుకుంటారు, డాక్టర్ ఆ వరుసలో పేషెంట్లను
                చూస్తారు. గది బయట ఉన్న టోకెన్ బోర్డు ఇప్పుడు ఏ నంబర్‌ని చూస్తున్నారో చూపిస్తుంది. సమస్య ఏమిటంటే, అక్కడ
                కూర్చున్న తర్వాతే మీకు ఎంత సేపు వేచి ఉండాలో తెలుస్తుంది.
              </p>
            ),
          },
          {
            id: "on-your-phone",
            title: "అదే టోకెన్ బోర్డు, మీ ఫోన్‌లో",
            body: (
              <>
                <p>
                  డాక్టర్ తర్వాతి పేషెంట్‌ని పిలిచి, ప్రతి విజిట్ పూర్తి చేసిన కొద్దీ మీ స్క్రీన్ లైన్‌తో పాటు కదులుతుంది. మీకు
                  కనిపించేవి:
                </p>
                <ul>
                  <li>గదిలో ప్రస్తుతం ఉన్న టోకెన్,</li>
                  <li>మీ ముందు ఎంతమంది ఉన్నారు,</li>
                  <li>దానికి మీకు సుమారు ఎంత సమయం పడుతుంది.</li>
                </ul>
                <p>కాబట్టి మీ వంతు దగ్గర పడినప్పుడే ఇంటి నుంచి బయలుదేరవచ్చు, అందరితో కలిసి ఉదయం 9 గంటలకు కాదు.</p>
              </>
            ),
          },
          {
            id: "delays",
            title: "డాక్టర్ ఆలస్యంగా ఉన్నప్పుడు",
            body: (
              <p>
                క్లినిక్ ఆలస్యాన్ని అప్‌డేట్ చేస్తుంది, మీకు వెంటనే కనిపిస్తుంది, ఉదాహరణకు “సుమారు 20 నిమిషాలు ఆలస్యం”. అంచనా
                అనేది అంచనా మాత్రమే, OPflow అదే చెబుతుంది. నిజమైన లైన్ కదిలే కొద్దీ ఇది మారుతుంది.
              </p>
            ),
          },
          {
            id: "windows",
            title: "సమయాలు, టోకెన్లు ఎలా కలిసి పనిచేస్తాయి",
            body: (
              <p>
                డాక్టర్ OPD ని నిర్ణీత స్థానాలతో ఒక్కో గంట సమయాలుగా విభజిస్తారు, నేరుగా వచ్చేవారికి, అత్యవసరాలకు స్థానాలు
                డాక్టర్ దగ్గరే ఉంటాయి. మీరు ఒక సమయం బుక్ చేస్తారు, ఆ రోజున లైవ్ లైన్ బాధ్యత తీసుకుంటుంది. పూర్తి దశలు{" "}
                <Link href={link("/opd-appointment-booking")}>OPD అపాయింట్‌మెంట్ ఆన్‌లైన్‌లో ఎలా బుక్ చేయాలి</Link> లో చూడండి.
              </p>
            ),
          },
        ],
        faqs: [
          {
            q: "నన్ను ఖచ్చితమైన సమయానికి చూస్తారా?",
            a: "లేదు, నిజాయితీగా ఉన్న ఎవరూ OPD లో దాన్ని హామీ ఇవ్వలేరు. మీరు ఒక గంట సమయం బుక్ చేస్తారు, డాక్టర్ లైవ్ లైన్ ఆధారంగా యాప్ మీ అంచనాను ఎప్పటికప్పుడు మారుస్తుంది.",
          },
          {
            q: "డాక్టర్ ఆలస్యంగా ఉంటే ఏమవుతుంది?",
            a: "క్లినిక్ ఆలస్యాన్ని అప్‌డేట్ చేస్తుంది, మీకు వెంటనే కనిపిస్తుంది, కాబట్టి హాస్పిటల్‌లో వేచి ఉండకుండా ఇంటి నుంచి ఆలస్యంగా బయలుదేరవచ్చు.",
          },
        ],
        cta: {
          heading: "మీ డాక్టర్ లైన్‌ను లైవ్‌లో అనుసరించండి.",
          text: "OPflow లో ఒక సమయం బుక్ చేసి, మీరు ఎక్కడ ఉన్నా టోకెన్ బోర్డును చూడండి.",
        },
      },
    },

    "for-doctors": {
      en: {
        title: "OPD appointment software for doctors and clinics",
        metaTitle: "OPD appointment software for doctors and clinics",
        description:
          "Run your OPD on OPflow: set your OPD days, hours and patients per hour, keep walk-in places, manage the live token queue and get paid online. No setup cost.",
        intro: (
          <p>
            OPflow spreads your OPD patients across your hours, keeps walk-in places for the patients who come without
            booking, and shows patients a live queue so your waiting hall stays calm.
          </p>
        ),
        sections: [
          {
            id: "what-you-get",
            title: "What doctors and clinics get",
            body: (
              <ul>
                <li>
                  <strong>Your OPD, split into hour-long windows.</strong> You choose the OPD days, hours and patients per
                  hour. Patients book into those places, so the crowd is spread across your hours instead of arriving all at
                  9 AM.
                </li>
                <li>
                  <strong>Walk-ins stay.</strong> You decide how many places are open for online booking. The rest stay for
                  walk-ins and emergencies, and you can change the split any day.
                </li>
                <li>
                  <strong>A live queue you control.</strong> Call the next patient, finish visits and post a delay. Patients
                  see it on their phones, so fewer people crowd the waiting hall.
                </li>
                <li>
                  <strong>Online payments.</strong> Patients pay when they book, through UPI, cards or net banking. Payments
                  are verified on our servers before a booking is confirmed.
                </li>
              </ul>
            ),
          },
          {
            id: "fees",
            title: "What it costs",
            body: (
              <p>
                There is no setup cost. OPflow keeps {site.platformFeePercent}% of each consultation booked through OPflow,
                and the rest is settled to the doctor or hospital. If a doctor or hospital cancels a booking, the patient
                gets a full refund. See the <Link href={link("/refunds")}>Rescheduling &amp; Refund Policy</Link> for how
                this works.
              </p>
            ),
          },
          {
            id: "getting-started",
            title: "How to get started",
            body: (
              <ul>
                <li>
                  Write to <a href={mail("Clinic onboarding")}>{site.email}</a>.
                </li>
                <li>The OPflow team verifies your qualifications and medical registration.</li>
                <li>We set up your account and give you an OPD ID and password.</li>
                <li>
                  You set your OPD days, hours and patients per hour, in the app or on the doctor website, and patients can
                  start booking.
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
        ],
        faqs: [
          {
            q: "Do I need to make every patient book online?",
            a: "No. Walk-ins stay. The doctor sets the split between online booking and walk-in places, every day if they like.",
          },
          { q: "Can I use OPflow on my computer?", a: "Yes. Doctors can run their OPD from the app or from the doctor website." },
          {
            q: "Is there a setup fee?",
            a: `No. OPflow keeps ${site.platformFeePercent}% of each consultation booked through it, and settles the rest to you.`,
          },
        ],
        cta: { heading: "Want to run your OPD on OPflow?", text: `Write to ${site.email} and we will set up your account.` },
      },
      te: {
        title: "డాక్టర్లు, క్లినిక్‌ల కోసం OPD అపాయింట్‌మెంట్ సాఫ్ట్‌వేర్",
        metaTitle: "డాక్టర్లు, క్లినిక్‌ల కోసం OPD అపాయింట్‌మెంట్ సాఫ్ట్‌వేర్",
        description:
          "మీ OPD ని OPflow లో నడపండి: OPD రోజులు, గంటలు, గంటకు పేషెంట్ల సంఖ్యను నిర్ణయించండి, నేరుగా వచ్చేవారికి స్థానాలు ఉంచండి, లైవ్ టోకెన్ లైన్‌ను నిర్వహించండి, ఆన్‌లైన్‌లో చెల్లింపులు పొందండి. సెటప్ ఖర్చు లేదు.",
        intro: (
          <p>
            OPflow మీ OPD పేషెంట్లను మీ గంటల మధ్య పంచుతుంది, బుక్ చేయకుండా వచ్చే పేషెంట్ల కోసం స్థానాలు ఉంచుతుంది,
            పేషెంట్లకు లైవ్ లైన్ చూపిస్తుంది, తద్వారా మీ వెయిటింగ్ హాల్ ప్రశాంతంగా ఉంటుంది.
          </p>
        ),
        sections: [
          {
            id: "what-you-get",
            title: "డాక్టర్లు, క్లినిక్‌లకు లభించేవి",
            body: (
              <ul>
                <li>
                  <strong>ఒక్కో గంట సమయాలుగా విభజించిన మీ OPD.</strong> మీరు OPD రోజులు, గంటలు, గంటకు పేషెంట్ల సంఖ్యను
                  ఎంచుకుంటారు. పేషెంట్లు ఆ స్థానాల్లో బుక్ చేస్తారు, కాబట్టి అందరూ ఉదయం 9 కే రాకుండా మీ గంటల మధ్య రద్దీ
                  పంచబడుతుంది.
                </li>
                <li>
                  <strong>నేరుగా వచ్చేవారు ఉంటారు.</strong> ఆన్‌లైన్ బుకింగ్ కోసం ఎన్ని స్థానాలు తెరవాలో మీరే నిర్ణయిస్తారు.
                  మిగిలినవి నేరుగా వచ్చేవారికి, అత్యవసరాలకు ఉంటాయి, ఆ విభజనను ఏ రోజైనా మార్చవచ్చు.
                </li>
                <li>
                  <strong>మీరు నియంత్రించే లైవ్ లైన్.</strong> తర్వాతి పేషెంట్‌ని పిలవండి, విజిట్లు పూర్తి చేయండి, ఆలస్యాన్ని
                  తెలపండి. పేషెంట్లకు అది వారి ఫోన్లలో కనిపిస్తుంది, కాబట్టి వెయిటింగ్ హాల్‌లో రద్దీ తగ్గుతుంది.
                </li>
                <li>
                  <strong>ఆన్‌లైన్ చెల్లింపులు.</strong> పేషెంట్లు బుక్ చేసేటప్పుడు UPI, కార్డులు లేదా నెట్ బ్యాంకింగ్‌తో
                  చెల్లిస్తారు. బుకింగ్ నిర్ధారణకు ముందు చెల్లింపులు మా సర్వర్లలో ధృవీకరించబడతాయి.
                </li>
              </ul>
            ),
          },
          {
            id: "fees",
            title: "దీని ఖరీదు ఎంత",
            body: (
              <p>
                సెటప్ ఖర్చు లేదు. OPflow ద్వారా బుక్ అయిన ప్రతి సంప్రదింపులో OPflow {site.platformFeePercent}% ఉంచుకుంటుంది,
                మిగిలినది డాక్టర్ లేదా హాస్పిటల్‌కి చెల్లిస్తుంది. డాక్టర్ లేదా హాస్పిటల్ బుకింగ్‌ను రద్దు చేస్తే, పేషెంట్‌కి
                పూర్తి వాపసు వస్తుంది. ఇది ఎలా పనిచేస్తుందో <Link href={link("/refunds")}>సమయం మార్పు &amp; వాపసు విధానం</Link> లో
                చూడండి.
              </p>
            ),
          },
          {
            id: "getting-started",
            title: "ఎలా మొదలుపెట్టాలి",
            body: (
              <ul>
                <li>
                  <a href={mail("Clinic onboarding")}>{site.email}</a> కి రాయండి.
                </li>
                <li>OPflow బృందం మీ అర్హతలను, వైద్య రిజిస్ట్రేషన్‌ను ధృవీకరిస్తుంది.</li>
                <li>మేము మీ ఖాతా సిద్ధం చేసి, OPD ID, పాస్‌వర్డ్ ఇస్తాం.</li>
                <li>
                  మీరు యాప్‌లో లేదా డాక్టర్ వెబ్‌సైట్‌లో OPD రోజులు, గంటలు, గంటకు పేషెంట్ల సంఖ్యను నిర్ణయిస్తారు, ఆ తర్వాత
                  పేషెంట్లు బుక్ చేయడం మొదలుపెట్టవచ్చు.
                </li>
              </ul>
            ),
          },
          {
            id: "fair",
            title: "ప్రతి డాక్టర్‌కీ న్యాయంగా",
            body: (
              <p>
                OPflow పేషెంట్లకు డాక్టర్లను సూచించేటప్పుడు, ఆ సూచన అర్హతలు, అనుభవం, ప్రాక్టీస్ రంగాలు, వచ్చి వెళ్ళిన
                పేషెంట్ల ప్రైవేట్ అభిప్రాయం ఆధారంగా ఉంటుంది. సూచించబడటానికి డాక్టర్లు ఎప్పుడూ డబ్బు చెల్లించలేరు.
              </p>
            ),
          },
        ],
        faqs: [
          {
            q: "ప్రతి పేషెంట్ ఆన్‌లైన్‌లోనే బుక్ చేయాలా?",
            a: "కాదు. నేరుగా వచ్చేవారు ఉంటారు. ఆన్‌లైన్ బుకింగ్‌కి, నేరుగా వచ్చేవారి స్థానాలకు మధ్య విభజనను డాక్టర్ నిర్ణయిస్తారు, కావాలంటే రోజూ.",
          },
          { q: "నేను కంప్యూటర్‌లో OPflow వాడవచ్చా?", a: "అవును. డాక్టర్లు తమ OPD ని యాప్ నుంచి లేదా డాక్టర్ వెబ్‌సైట్ నుంచి నడపవచ్చు." },
          {
            q: "సెటప్ ఫీజు ఉందా?",
            a: `లేదు. OPflow ద్వారా బుక్ అయిన ప్రతి సంప్రదింపులో OPflow ${site.platformFeePercent}% ఉంచుకుని, మిగిలినది మీకు చెల్లిస్తుంది.`,
          },
        ],
        cta: { heading: "మీ OPD ని OPflow లో నడపాలనుకుంటున్నారా?", text: `${site.email} కి రాయండి, మేము మీ ఖాతా సిద్ధం చేస్తాం.` },
      },
    },
  };

  return guides[key][lang];
}
