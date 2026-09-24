import Image from "next/image";
import logo from "../../../public/opflow-logo.png";

export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src={logo} alt="" className="size-8 shrink-0" priority />
      <span className={`text-[1.3rem] font-semibold tracking-tight ${tone === "light" ? "text-paper" : "text-ink"}`}>
        OPflow
      </span>
    </span>
  );
}
