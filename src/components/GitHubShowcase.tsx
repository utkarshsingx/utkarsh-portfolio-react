import { ArrowUpRight, Eyebrow, Section } from "./ui/Primitives";
import ContributionBars from "./charts/ContributionBars";
import ContributionHeatmap from "./charts/ContributionHeatmap";
import { profile, repos } from "../data/profile";
import { stats, statsWindow } from "../data/github-stats";

const fmt = (n: number) => n.toLocaleString("en-US");

/** The stat-tile row. Bare tiles with no plot, so they carry no hover layer. */
const tiles = [
  { label: "Public commits", value: fmt(stats.publicCommits), note: "author-filtered" },
  { label: "Private work", value: fmt(stats.privateContributions), note: "counts only" },
  { label: "Pull requests", value: fmt(stats.pullRequests), note: `${stats.reviews} reviewed` },
  {
    label: "Active days",
    value: `${stats.activeDays}`,
    note: `of ${stats.totalDays}`,
  },
  { label: "Peak streak", value: `${stats.peakStreak}`, note: "consecutive days" },
  { label: "Public repos", value: `${stats.publicRepos}`, note: `since ${stats.joined}` },
];

export default function GitHubShowcase() {
  return (
    <Section
      id="github"
      index="02"
      eyebrow="GitHub · output, measured"
      title={
        <>
          What a year of output <span className="font-quote italic text-accent">actually</span>{" "}
          looks like.
        </>
      }
      lede={
        <>
          Every figure in this section was read from the GitHub contributions API on{" "}
          {statsWindow.pulledOn}, for the trailing twelve months — not typed in by hand. Re-pull the
          whole set with <code className="font-code text-[0.9em] text-ink">npm run refresh:stats</code>{" "}
          and the page updates itself.
        </>
      }
    >
      {/* Hero figure — exactly one on the page. */}
      <div className="reveal grid gap-8 border-y border-line py-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Contributions · trailing 12 months</Eyebrow>
          <p className="mt-3 text-[clamp(3rem,9vw,5rem)] font-semibold leading-none tracking-[-0.04em]">
            {fmt(stats.contributions)}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
          {tiles.map((t) => (
            <div key={t.label}>
              <dt className="font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-3">
                {t.label}
              </dt>
              <dd className="mt-2 text-[1.5rem] font-semibold leading-none tracking-[-0.02em] text-ink">
                {t.value}
                <span className="ml-2 font-ui text-[0.75rem] font-normal tracking-normal text-ink-3">
                  {t.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="reveal mt-14">
        <ContributionBars />
      </div>

      <div className="reveal mt-16 border-t border-line pt-12">
        <ContributionHeatmap />
      </div>

      {/* Repositories */}
      <div className="reveal mt-16 border-t border-line pt-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Selected repositories</Eyebrow>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-2">
              Builds outside the day job: betting markets, a reading studio, scrapers, visualisers,
              a television that wants you back. Everything here is public and links to source.
            </p>
          </div>
          <a
            href={`${profile.links.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="link-underline inline-flex items-center gap-1.5 font-code text-[11px] tracking-[0.14em] uppercase text-ink-2 transition-colors hover:text-accent"
          >
            All {stats.publicRepos} repos <ArrowUpRight />
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <li key={r.repo} className="h-full">
              <article className="group flex h-full flex-col rounded-xl border border-line bg-surface/50 p-5 transition duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface motion-reduce:hover:translate-y-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                    <a
                      href={`https://github.com/${profile.handle}/${encodeURIComponent(r.repo)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors group-hover:text-accent"
                    >
                      {r.name}
                    </a>
                  </h3>
                  {r.stars > 0 ? (
                    <span className="inline-flex shrink-0 items-center gap-1 font-code text-[10.5px] text-ink-3">
                      <StarIcon />
                      <span className="tnum">{r.stars}</span>
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 font-code text-[10px] tracking-[0.14em] uppercase text-ink-3">
                  {r.language}
                </p>

                <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-2">{r.blurb}</p>

                <div className="mt-5 flex items-center gap-4 border-t border-line-2 pt-4">
                  <a
                    href={`https://github.com/${profile.handle}/${encodeURIComponent(r.repo)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-2 transition-colors hover:text-accent"
                  >
                    Source <ArrowUpRight />
                  </a>
                  {r.live ? (
                    <a
                      href={r.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-2 transition-colors hover:text-accent"
                    >
                      Live <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-label="stars" className="size-3" fill="currentColor">
      <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3 4.2 13.3l.7-4.3-3.1-3 4.3-.6L8 1.5z" />
    </svg>
  );
}
