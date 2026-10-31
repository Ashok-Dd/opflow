import { Fragment, type ReactNode } from "react";

/**
 * Puts elements into a translated sentence. The sentence marks where with {0}, {1}…, so each language can
 * order its words its own way: rich(t("Read the {0} first."), <a href="/x">guide</a>).
 */
export function rich(template: string, ...nodes: ReactNode[]): ReactNode {
  return template.split(/(\{\d+\})/).map((part, i) => {
    const slot = /^\{(\d+)\}$/.exec(part);
    return <Fragment key={i}>{slot ? nodes[Number(slot[1])] : part}</Fragment>;
  });
}
