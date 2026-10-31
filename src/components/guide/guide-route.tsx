import type { Metadata } from "next";
import { guideContent, type GuideKey } from "@/content/guides";
import type { Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { GuidePage } from "./guide-page";

/** The metadata of a guide page in a language. */
export function guideMetadata(key: GuideKey, lang: Lang): Metadata {
  const c = guideContent(key, lang);
  return pageMetadata({ lang, path: `/${key}`, title: c.metaTitle, description: c.description });
}

/** A guide page in a language: the English one at "/for-doctors", the Telugu one at "/te/for-doctors". */
export function GuideRoute({ guide, lang }: { guide: GuideKey; lang: Lang }) {
  const c = guideContent(guide, lang);
  return <GuidePage lang={lang} path={`/${guide}`} title={c.title} intro={c.intro} sections={c.sections} faqs={c.faqs} cta={c.cta} />;
}
