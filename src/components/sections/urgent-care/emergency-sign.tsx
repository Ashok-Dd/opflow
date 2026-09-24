import { Container } from "@/components/site/primitives";

const numbers = [
  { n: "112", label: "Emergency" },
  { n: "108", label: "Ambulance" },
];

/** Full-bleed red band set like the emergency signage on a hospital wall. */
export function EmergencySign() {
  return (
    <div className="bg-alarm text-white">
      <Container className="grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.18em] text-white uppercase">Before anything else</p>
          <p className="mt-3 font-serif text-[2rem] leading-[1.1] sm:text-[2.5rem]">
            Could it be life-threatening? Don&apos;t book. Call.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:col-start-8">
          {numbers.map(({ n, label }) => (
            <a
              key={n}
              href={`tel:${n}`}
              className="group border-2 border-white px-4 py-3 transition-colors hover:bg-white hover:text-alarm sm:px-5"
            >
              <span className="block text-[3.2rem] leading-none font-semibold tracking-tight sm:text-6xl">{n}</span>
              <span className="mt-1.5 flex items-center justify-between text-sm font-medium tracking-wide uppercase">
                {label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
