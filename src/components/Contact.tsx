import { ArrowUpRight, Eyebrow, Section } from "./ui/Primitives";
import { profile } from "../data/profile";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, primary: true },
  { label: "LinkedIn", value: "/in/utkarshsingx", href: profile.links.linkedin },
  { label: "GitHub", value: `@${profile.handle}`, href: profile.links.github },
  { label: "Writing", value: "utkarshreads.me", href: profile.links.writing },
  { label: "X / Twitter", value: `@${profile.handle}`, href: profile.links.twitter },
  { label: "YouTube", value: `@${profile.handle}`, href: profile.links.youtube },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      index="04"
      eyebrow="Contact · open channel"
      title={
        <>
          Want to build something <span className="font-quote italic text-accent">serious</span>?
        </>
      }
      lede="If you are putting together a platform that several organisations will use at once — or trying to make one you already have behave — that is the conversation I am most useful in. Send the problem, not a job description. I answer within a day."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="reveal">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-code text-[11.5px] tracking-[0.14em] uppercase text-accent-ink transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              Email me
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-control bg-surface/40 px-5 py-3 font-code text-[11.5px] tracking-[0.14em] uppercase text-ink transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              LinkedIn <ArrowUpRight />
            </a>
          </div>

          <dl className="mt-10 space-y-5 border-t border-line pt-8">
            {[
              ["Based in", profile.location],
              ["Timezone", profile.timezone],
              ["Status", profile.available],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-5">
                <dt className="font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-3 sm:w-24 sm:shrink-0 sm:pt-1">
                  {k}
                </dt>
                <dd className="text-[0.9375rem] leading-snug text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal">
          <Eyebrow className="mb-6">Every channel</Eyebrow>
          <ul className="overflow-hidden rounded-xl border border-line">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line-2 last:border-b-0">
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 bg-surface/40 px-5 py-4 transition-colors duration-300 hover:bg-surface"
                >
                  <span className="font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-3">
                    {c.label}
                  </span>
                  <span
                    className={`flex items-center gap-2 text-[0.9375rem] transition-colors ${
                      c.primary ? "text-accent" : "text-ink-2 group-hover:text-accent"
                    }`}
                  >
                    {c.value}
                    <ArrowUpRight className="opacity-50 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
