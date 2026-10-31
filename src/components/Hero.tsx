import { ArrowUpRight, Eyebrow } from "./ui/Primitives";
import { intro, profile } from "../data/profile";
import { stats } from "../data/github-stats";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-20 sm:pb-28">
      {/* Decorative ground: a faint grid, faded out before it reaches the text,
          plus one soft accent bloom. Both are masked, not layered over copy. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="grid-field absolute inset-0"
          style={{
            maskImage: "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)" }}
        />
      </div>

      <div className="shell">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3 py-1.5">
            <span className="relative grid size-1.5 place-items-center">
              <span className="absolute size-1.5 rounded-full bg-pulse" />
              <span className="absolute size-1.5 animate-ping rounded-full bg-pulse motion-reduce:animate-none" />
            </span>
            <span className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-2">
              Available for conversations
            </span>
          </span>
          <Eyebrow>
            {profile.role} · {profile.location.split(",")[0]}
          </Eyebrow>
        </div>

        <h1 className="mt-8 max-w-[22ch] text-[clamp(2.5rem,8vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance">
          {/* Inline below sm so the phrase wraps to the available width; the
              authored three-line break only applies once there is room for it,
              otherwise "behind" is orphaned on a line of its own. */}
          {intro.headline.map((line, i) => (
            <span key={line} className="sm:block">
              {line}
              {i === intro.headline.length - 1 ? <span className="text-accent">.</span> : " "}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-2 sm:text-lg">
          {intro.body}
        </p>

        <p className="mt-6 font-quote text-[1.5rem] italic leading-snug text-ink">
          “{intro.principle}”
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-code text-[11.5px] tracking-[0.14em] uppercase text-accent-ink transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          >
            View GitHub
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-control bg-surface/40 px-5 py-3 font-code text-[11.5px] tracking-[0.14em] uppercase text-ink transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            Contact me
          </a>
        </div>

        {/* Orientation facts, not a stat row — the measured numbers live in §03. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
          {[
            { k: "Currently", v: "Lead SWE @ AI Linc" },
            { k: "Also building", v: "Prephasz · Audix GRC" },
            { k: "Based in", v: profile.location.split(",")[0] + ", IN" },
            { k: "On GitHub since", v: stats.joined.replace("-", ".") },
          ].map((row) => (
            <div key={row.k}>
              <dt className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
                {row.k}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-ink">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
