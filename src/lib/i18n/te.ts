import { chrome } from "./dict/chrome";
import { contact } from "./dict/contact";
import { appPromisesFaq } from "./dict/app-promises-faq";
import { heroFind } from "./dict/hero-find";
import { journey } from "./dict/journey";
import { rightDoctor } from "./dict/right-doctor";
import { urgent } from "./dict/urgent";
import { windowsQueue } from "./dict/windows-queue";

/**
 * Telugu for every text on the site, keyed by the exact English text. To add a text: wrap it in t("…") (or
 * tf("… {0} …", value)) and add its Telugu in the matching file in ./dict. A missing text is shown in English.
 * A key that starts with "~" is a text that is empty in English (it only exists to finish a Telugu sentence).
 * `npm run i18n:check` lists texts that are used but not translated, and entries nothing uses.
 */
export const te: Record<string, string> = {
  ...chrome,
  ...heroFind,
  ...windowsQueue,
  ...journey,
  ...rightDoctor,
  ...urgent,
  ...appPromisesFaq,
  ...contact,
};
