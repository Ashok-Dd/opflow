import type { Doctor, Result } from "./search-data";

export function SearchResults({ result }: { result: Result }) {
  if (result.kind === "empty") {
    return <p className="text-center text-ink-soft">Results appear here as you type.</p>;
  }

  if (result.kind === "none") {
    return <p className="text-center text-ink-soft">Nothing matches that yet. Try a symptom like “cough”.</p>;
  }

  if (result.kind === "urgent") {
    return (
      <div className="animate-flip-in rounded-[4px] bg-alarm p-6 text-white sm:p-8">
        <p className="font-serif text-[1.7rem] leading-tight">
          {cap(result.symptom)} can be serious. Don&apos;t wait for an OPD appointment.
        </p>
        <p className="mt-3 text-white/85">
          OPflow sends you to urgent care instead of a booking: call 112 or 108, or find an emergency department
          that&apos;s open now.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="tel:112" className="rounded-[4px] bg-white px-4 py-2 text-alarm">Call 112</a>
          <a href="#urgent" className="rounded-[4px] border border-white/70 px-4 py-2">Open urgent care ↓</a>
        </div>
      </div>
    );
  }

  let head: React.ReactNode;
  let list: Doctor[];
  if (result.kind === "symptom") {
    head = (
      <>
        <Tag>Symptom</Tag>
        <p className="mt-2 text-lg">
          <span className="font-medium">{cap(result.symptom)}</span> is usually seen by{" "}
          <span className="font-medium text-fern">{result.specialties.join(" or ")}</span>.
        </p>
        <p className="mt-1 text-sm text-ink-soft">A signpost to the right kind of doctor, not a diagnosis.</p>
      </>
    );
    list = result.doctors;
  } else if (result.kind === "specialty") {
    head = (
      <>
        <Tag>Specialty</Tag>
        <p className="mt-2 text-lg font-medium">{result.specialty}</p>
      </>
    );
    list = result.doctors;
  } else {
    head = (
      <>
        <Tag>Hospital</Tag>
        <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 text-lg">
          <span className="font-medium">{result.hospital.name}</span>
          <span className="font-mono text-sm text-ink-soft">
            {result.hospital.area} · {result.hospital.km} km · <span className="text-fern">{result.hospital.status}</span>
          </span>
        </p>
      </>
    );
    list = result.doctors;
  }

  return (
    <div key={`${result.kind}:${list.map((d) => d.name).join()}`} className="animate-flip-in">
      <div className="border-b border-rule pb-4">{head}</div>
      <ul>
        {list.map((d) => (
          <li key={d.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-0.5 border-b border-rule py-4">
            <span className="font-medium">{d.name}</span>
            <span className="row-span-2 rounded-[4px] bg-mint px-3 py-2 text-right text-sm">
              <span className="block font-mono text-[10px] tracking-[0.12em] text-ink-soft uppercase">Next window</span>
              <span className="font-medium text-forest">{d.next}</span>
            </span>
            <span className="text-sm text-ink-soft">
              {d.specialty} · {d.hospital}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return <span className="font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">{children}</span>;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
