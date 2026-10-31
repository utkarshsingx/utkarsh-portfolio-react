import { Pill, Section } from "./ui/Primitives";
import { roles } from "../data/profile";

export default function Timeline() {
  return (
    <Section
      id="path"
      index="03"
      eyebrow="Experience · 5 organisations"
      title={
        <>
          The path, <span className="font-quote italic text-accent">replayed</span> from origin.
        </>
      }
      lede="Intern to lead in seven months, and three products running in parallel since. Everything below is work I shipped and still own — not a reading list of technologies I once touched."
    >
      <ol className="relative">
        {/* The rail. Decorative, so it is hidden from assistive tech — the
            ordered list already carries the sequence. */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[calc(9rem+7px)]"
        />

        {roles.map((role) => (
          <li key={`${role.org}-${role.start}`} className="reveal relative pb-12 last:pb-0">
            <div className="sm:flex sm:gap-0">
              {/* Dates column */}
              <div className="hidden w-36 shrink-0 pr-8 text-right sm:block">
                <p className="font-code text-[11px] leading-snug tracking-[0.08em] text-ink">
                  {role.end === "Present" ? role.start : `${role.start}`}
                </p>
                <p className="mt-1 font-code text-[11px] leading-snug tracking-[0.08em] text-ink-3">
                  → {role.end}
                </p>
                <p className="mt-3 font-code text-[9.5px] tracking-[0.12em] uppercase text-ink-3">
                  {role.place}
                </p>
              </div>

              {/* Marker */}
              <div className="absolute left-0 top-[6px] sm:left-[9rem]">
                <span
                  className={`block size-[15px] rounded-full border-2 ${
                    role.end === "Present"
                      ? "border-accent bg-accent/25"
                      : "border-line-2 bg-surface-2"
                  }`}
                  style={{ borderColor: role.end === "Present" ? "var(--color-accent)" : undefined }}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pl-8 sm:pl-10">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[1.1875rem] font-medium tracking-[-0.015em]">{role.title}</h3>
                  <span className="text-ink-3">·</span>
                  <p className="text-[1.0625rem] text-accent">{role.org}</p>
                </div>

                <p className="mt-1.5 font-code text-[10.5px] tracking-[0.12em] uppercase text-ink-3 sm:hidden">
                  {role.start} → {role.end} · {role.place}
                </p>
                <p className="mt-1.5 hidden font-code text-[10.5px] tracking-[0.12em] uppercase text-ink-3 sm:block">
                  {role.kind}
                </p>

                {role.promotions ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {role.promotions.map((p) => (
                      <li key={p}>
                        <Pill>{p}</Pill>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className="mt-4 max-w-[72ch] text-[0.9375rem] leading-relaxed text-ink-2">
                  {role.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <li key={s}>
                      <Pill>{s}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
