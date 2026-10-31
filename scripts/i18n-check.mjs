/**
 * Lists texts the site shows that have no Telugu yet, and Telugu entries nothing uses.
 *
 *   npm run i18n:check
 *
 * "Used" means: a literal inside t("…") or tf("…"), a PauseButton label, or a text in one of the data files
 * listed below (their texts are translated when shown, so they are not inside t("…") themselves).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src/", import.meta.url));

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const unescape = (s) => s.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
const slash = (p) => p.replace(/\\/g, "/");

// ---- Telugu entries
const known = new Set();
const dictDir = join(root, "lib/i18n/dict");
for (const file of readdirSync(dictDir)) {
  const src = readFileSync(join(dictDir, file), "utf8");
  for (const m of src.matchAll(/^ {2}(?:"((?:[^"\\]|\\.)*)"|([A-Za-z_$][\w$]*)):/gm)) known.add(unescape(m[1] ?? m[2]));
}

// ---- texts used through t("…") and tf("…"), and PauseButton labels
const used = new Map(); // text -> first file
const add = (text, file) => text && !used.has(text) && used.set(text, file);
for (const file of walk(root).filter((f) => /\.tsx?$/.test(f))) {
  const rel = slash(file.slice(root.length));
  if (rel.startsWith("lib/i18n/")) continue; // the translation code itself, not page texts
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/\btf?\(\s*"((?:[^"\\]|\\.)*)"/g)) add(unescape(m[1]), rel);
  for (const m of src.matchAll(/\blabel="([^"]+)"/g)) if (rel.includes("sections")) add(unescape(m[1]), rel);
}

// ---- data files whose texts are translated when shown (they are not inside t("…") themselves)
const dataFiles = [
  "components/sections/find-care/search-data.ts",
  "components/sections/find-care/route-board.tsx",
  "components/sections/find-care/search-demo.tsx",
  "components/sections/urgent-care/urgent-data.ts",
  "components/sections/urgent-care/emergency-sign.tsx",
  "components/sections/right-doctor/recommendation-slip.tsx",
  "components/sections/right-doctor/right-doctor.tsx",
  "components/sections/journey/route-steps.tsx",
  "components/sections/windows/window-planner.tsx",
  "components/sections/live-queue/live-readout.tsx",
  "components/sections/promises/promises.tsx",
  "components/sections/get-app/portal-showcase.tsx",
  "components/sections/get-app/screens/patient-screens.tsx",
  "components/sections/get-app/screens/doctor-screens.tsx",
  "components/sections/hero/waiting-hall.tsx",
  "components/sections/hero/hall-layout.ts",
  "components/sections/faq/faq.tsx",
  "components/site/header.tsx",
  "components/site/footer.tsx",
];

const tailwindWord = /^[a-z0-9:[\]\-/.#%()_,!&@*>+~]+$/;
const looksLikeText = (s) =>
  s.length >= 3 &&
  /[A-Za-z]/.test(s) &&
  !/^(@\/|\.\/|\.\.\/|https?:|#|\/|use client)/.test(s) &&
  !tailwindWord.test(s) && // one class name or id
  !(/[-[\]:/]/.test(s) && s.split(" ").every((w) => tailwindWord.test(w))) && // a string of class names
  !/\.(png|svg|jpg)$/.test(s);

for (const rel of dataFiles) {
  const src = readFileSync(join(root, rel), "utf8");
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const text = unescape(m[1]);
    if (looksLikeText(text)) add(text, rel);
  }
}

// ---- texts the site shows that sit in other shapes: page labels and hours in site.ts, symptom names as object keys
for (const m of readFileSync(join(root, "lib/site.ts"), "utf8").matchAll(/(?:label|supportHours):\s*"([^"]+)"/g)) add(m[1], "lib/site.ts");
for (const m of readFileSync(join(root, "components/sections/find-care/search-data.ts"), "utf8").matchAll(/^\s*"?([a-z][a-z ]+)"?:\s*(?:\[|"urgent")/gm)) {
  add(m[1], "components/sections/find-care/search-data.ts");
}
add("Guntur", "lib/site.ts"); // company.address, translated where it is shown
// the doctor schedule builds "Mon short", "Tue short"… from these day names
for (const day of ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) add(`${day} short`, "components/sections/get-app/screens/doctor-screens.tsx");

// ---- words and numbers that stay the same in Telugu, and code that only looks like text
const same = new Set([
  "OPflow", "OPD", "ENT", "112", "108", "UPI", "Cashfree", "OPFLOW", "Google Play", "App Store",
  "Tue", "Wed", "Sun", // day names that only feed the "… short" keys above
  "currentColor", "m13 13 4 4", "0 0 10px rgba(255,178,30,.5)", "${CSS.escape(key)}", "Find Your Right Doctor",
]);
const skip = (text) => same.has(text) || /^[\d\s:–.\-+₹%~×≈←→↓↑·,()/]+$/.test(text) || /^(en|te)(-IN)?$/.test(text);

const missing = [...used].filter(([text]) => !known.has(text) && !skip(text));
const unused = [...known].filter((text) => !used.has(text) && !text.startsWith("~"));

console.log(`Telugu entries: ${known.size} | texts used: ${used.size}`);
console.log(`\nMissing (${missing.length}):`);
for (const [text, file] of missing) console.log(`  ${file}: ${JSON.stringify(text)}`);
console.log(`\nUnused (${unused.length}):`);
for (const text of unused) console.log(`  ${JSON.stringify(text)}`);
process.exitCode = missing.length > 0 ? 1 : 0;
