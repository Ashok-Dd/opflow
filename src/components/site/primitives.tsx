import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-serif text-[2rem] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[2.6rem] ${className}`}
    >
      {children}
    </h2>
  );
}
