import { Card, Eyebrow, Section } from "./ui/Primitives";
import { achievements, principles, profile, stackGroups } from "../data/profile";

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About · achievements"
      title={
        <>
          Blank repo to live platform, then{" "}
          <span className="font-quote italic text-accent">stay on it</span> — the unglamorous half.
        </>
      }
      lede="Most of my year goes into platforms several organisations use at once. That setting is unforgiving in a specific way: one badly scoped query leaks another tenant's data, one unguarded deploy drops a live class. So I work in evidence — before a fix ships I want the failing query, the rendered pixels, the row count. A check that cannot fail is not a check."
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Achievements — the four claims worth leading with. */}
        <div className="reveal">
          <Eyebrow className="mb-6">Milestones</Eyebrow>
          <ul className="space-y-px overflow-hidden rounded-xl border border-line">
            {achievements.map((a) => (
              <li
                key={a.metric}
                className="group bg-surface/40 p-6 transition-colors duration-300 hover:bg-surface sm:flex sm:gap-7"
              >
                <div className="sm:w-[8.5rem] sm:shrink-0">
                  <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.02em] text-accent">
                    {a.metric}
                  </p>
                  <p className="mt-2 font-code text-[10.5px] leading-snug tracking-[0.1em] uppercase text-ink-3">
                    {a.label}
                  </p>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:mt-0 sm:border-l sm:border-line-2 sm:pl-7">
                  {a.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal space-y-8">
          <Card>
            <Eyebrow className="mb-5">How I work</Eyebrow>
            <ul className="space-y-3.5">
              {principles.map((p) => (
                <li key={p} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-2">
                  <span aria-hidden="true" className="mt-[0.45em] size-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <Eyebrow className="mb-5">Education &amp; base</Eyebrow>
            <dl className="space-y-4 text-[0.9375rem]">
              {[
                ["Studied", profile.education],
                ["Based in", profile.location],
                ["Timezone", `${profile.timezone} · remote-first`],
                ["Outside work", "Reading, artwork, swimming, piano"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="font-code text-[10.5px] tracking-[0.12em] uppercase text-ink-3 sm:w-28 sm:shrink-0 sm:pt-1">
                    {k}
                  </dt>
                  <dd className="leading-snug text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>

      {/* Stack, grouped by the job it does rather than as a skill cloud. */}
      <div className="reveal mt-14 border-t border-line pt-10">
        <Eyebrow className="mb-7">Stack · what I reach for</Eyebrow>
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((g) => (
            <div key={g.label}>
              <p className="font-code text-[11px] tracking-[0.14em] uppercase text-accent">
                {g.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((i) => (
                  <li key={i} className="text-[0.9375rem] leading-snug text-ink-2">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
