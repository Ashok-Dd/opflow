import type { CSSProperties } from "react";
import { Container } from "@/components/site/primitives";
import { StoreButtons } from "@/components/site/store-buttons";
import styles from "./hero.module.css";
import { WaitingHall } from "./waiting-hall";

const delay = (ms: number) => ({ "--delay": `${ms}ms`, animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="bg-forest text-paper">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-5">
          <p className="animate-fade-up font-mono text-xs tracking-[0.16em] text-mint/75 uppercase" style={delay(0)}>
            OPD appointments · Live token queue
          </p>

          <h1 className="mt-6 font-serif text-[2.7rem] leading-[1.02] font-medium tracking-[-0.02em] sm:text-[3.6rem] lg:text-[3.9rem]">
            <span className={styles.line}>
              <span style={delay(120)}>Know when</span>
            </span>
            <span className={styles.line}>
              <span style={delay(220)}>the doctor</span>
            </span>
            <span className={styles.line}>
              <span style={delay(320)} className="text-leaf italic">
                will see you.
              </span>
            </span>
          </h1>

          <div className="animate-fade-up" style={delay(600)}>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-mint/80">
              The OPD appointment booking app: book an hour-long OP window with a doctor, follow the live token queue
              from home, and walk in when it&apos;s nearly your turn. Not at 9 AM with everyone else.
            </p>
            <StoreButtons tone="light" className="mt-8" />
          </div>
        </div>

        <div className="animate-fade-up lg:col-span-7" style={delay(450)}>
          <WaitingHall />
        </div>
      </Container>
    </section>
  );
}
