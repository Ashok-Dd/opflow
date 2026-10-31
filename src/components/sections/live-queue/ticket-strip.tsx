"use client";

import type { CSSProperties } from "react";
import { useT } from "@/lib/i18n/context";
import styles from "./ticket-strip.module.css";

/** Thin and thick bars that look like a barcode, the same for the same token every time. */
function Barcode({ token }: { token: number }) {
  const widths = Array.from({ length: 14 }, (_, i) => ((token * 7 + i * 13) % 3) + 1);
  const starts = widths.map((_, i) => widths.slice(0, i).reduce((sum, w) => sum + w + 2, 0));
  const total = starts[starts.length - 1] + widths[widths.length - 1];
  return (
    <svg className={styles.bars} viewBox={`0 0 ${total} 18`} preserveAspectRatio="none" aria-hidden="true">
      {widths.map((width, i) => (
        <rect key={i} x={starts[i]} y={0} width={width} height={18} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * The queue as a strip of torn-off tickets. Tickets before `serving` have been torn off; the strip then
 * slides forward, so the tickets between the front and `mine` are the people ahead of you.
 */
export function TicketStrip({ first, last, serving, mine }: { first: number; last: number; serving: number; mine: number }) {
  const { t, tf } = useT();
  const tokens = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  const ahead = Math.max(0, mine - serving - 1);

  return (
    <div className={styles.viewport} aria-hidden="true">
      <span className={styles.slot} />
      <div className={styles.window}>
        <div className={styles.strip} style={{ "--shift": Math.max(0, serving - first) } as CSSProperties}>
          {tokens.map((token, i) => {
            const state = token < serving ? "gone" : token === serving ? "serving" : "waiting";
            return (
              <div
                key={token}
                className={styles.ticket}
                data-state={state}
                data-mine={token === mine}
                style={{ "--i": i } as CSSProperties}
              >
                <span className={styles.band} />
                <span className={styles.label}>{token === mine ? t("Yours") : t("Token")}</span>
                <span className={styles.number}>{String(token).padStart(3, "0")}</span>
                <Barcode token={token} />
                {token === mine && state === "serving" && <span className={styles.stamp}>{t("Your turn")}</span>}
              </div>
            );
          })}
        </div>
        <div className={styles.bracket} data-visible={ahead > 0} style={{ "--ahead": ahead } as CSSProperties}>
          <span>{tf("{0} ahead of you", ahead)}</span>
        </div>
      </div>
    </div>
  );
}
