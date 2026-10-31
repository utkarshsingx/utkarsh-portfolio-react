import { useEffect, useRef, useState } from "react";
import { calendar, statsWindow } from "../../data/github-stats";
import { profile } from "../../data/profile";

/**
 * The familiar day-by-day contribution grid.
 *
 * Two renderers. The local SVG is the default; ghchart.rshah.org is wired up
 * behind USE_GHCHART and is off because rendering both and comparing them
 * showed ghchart is wrong for this page on two counts:
 *
 *   1. It draws empty days as WHITE cells. On a near-black surface the graph
 *      reads as a bright slab, and it does not follow the theme toggle.
 *   2. It inherits GitHub's fixed 0–4 buckets, which saturate completely for
 *      an account averaging ~25 contributions a day — almost every cell lands
 *      in the top bucket, so the graph stops carrying information, and its
 *      scale silently disagrees with the legend printed beneath it.
 *
 * The local renderer bins by quintiles of this account's own non-zero days,
 * draws from the same tokens as the rest of the page, and reads from the
 * authoritative source (the contributions API) rather than a third-party
 * proxy that can be down. Flip USE_GHCHART to true to use the hosted image;
 * the failure path below (error, 1px placeholder, or slow response) still
 * falls back to the local grid, so the section is never empty.
 */
const CELL = 11;
const GAP = 3;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const LOAD_TIMEOUT_MS = 6000;
const USE_GHCHART = false;

type ImgState = "loading" | "ok" | "failed";

// Accent without the leading '#': ghchart takes the colour in the path.
const GH_CHART = `https://ghchart.rshah.org/ff5c28/${profile.handle}`;

export default function ContributionHeatmap() {
  const [state, setState] = useState<ImgState>(USE_GHCHART ? "loading" : "failed");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!USE_GHCHART) return;
    timer.current = window.setTimeout(
      () => setState((s) => (s === "loading" ? "failed" : s)),
      LOAD_TIMEOUT_MS,
    );
    return () => window.clearTimeout(timer.current);
  }, []);

  const settle = (next: ImgState) => {
    window.clearTimeout(timer.current);
    setState((s) => (s === "loading" ? next : s));
  };

  return (
    <figure className="m-0">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
          Contribution graph · day by day
        </span>
        <span className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
          {state === "ok" ? "Live · ghchart" : "GitHub contributions API"}
        </span>
      </figcaption>

      <div className="overflow-x-auto">
        {state !== "failed" ? (
          <img
            src={GH_CHART}
            alt={`GitHub contribution graph for @${profile.handle}, the trailing twelve months`}
            width={880}
            height={128}
            loading="lazy"
            decoding="async"
            className={`h-auto w-full min-w-[640px] max-w-[920px] ${
              state === "loading" ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
            // A proxy that is up but erroring often returns a tiny placeholder,
            // which `onError` never sees — so check the decoded size too.
            onLoad={(e) => settle(e.currentTarget.naturalWidth > 120 ? "ok" : "failed")}
            onError={() => settle("failed")}
          />
        ) : null}

        {state !== "ok" ? <LocalHeatmap dimmed={state === "loading"} /> : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <span className="font-code text-[10px] tracking-[0.14em] uppercase text-ink-3">
          {statsWindow.from} → {statsWindow.to}
        </span>
        <Legend />
      </div>
    </figure>
  );
}

/** Quintile breaks over the non-zero days — a fixed 1/3/6/9 scale would read as
    empty for a year this dense. */
function breaks() {
  const counts = calendar
    .flat()
    .map((d) => d.count)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  if (counts.length === 0) return [1, 2, 3, 4];
  const at = (q: number) => counts[Math.floor(counts.length * q)] || 1;
  return [1, at(0.25), at(0.5), at(0.75)];
}

const STEPS = [
  // Step 0 is a neutral empty cell; 1→4 is one hue, dim to bright. On a dark
  // surface that is the correct direction for a sequential ramp — it is
  // selected for the mode, not an automatic flip of the light one.
  "color-mix(in oklab, var(--color-ink) 9%, var(--color-surface))",
  "color-mix(in oklab, var(--color-accent) 26%, var(--color-surface))",
  "color-mix(in oklab, var(--color-accent) 48%, var(--color-surface))",
  "color-mix(in oklab, var(--color-accent) 72%, var(--color-surface))",
  "var(--color-accent)",
];

function level(count: number, b: number[]) {
  if (count <= 0) return 0;
  if (count < b[1]) return 1;
  if (count < b[2]) return 2;
  if (count < b[3]) return 3;
  return 4;
}

function LocalHeatmap({ dimmed }: { dimmed: boolean }) {
  const b = breaks();
  const width = calendar.length * (CELL + GAP) + 30;
  const height = 7 * (CELL + GAP);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block h-auto w-full min-w-[640px] max-w-[920px] transition-opacity duration-300 ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
      role="img"
      aria-label={`GitHub contribution grid for @${profile.handle}, drawn from the contributions API`}
    >
      {DAY_LABELS.map((label, row) =>
        label ? (
          <text
            key={row}
            x={0}
            y={row * (CELL + GAP) + CELL - 1}
            className="font-code"
            fontSize={8.5}
            fill="var(--color-ink-3)"
          >
            {label}
          </text>
        ) : null,
      )}
      {calendar.map((week, col) =>
        week.map((day, row) => (
          <rect
            key={day.date}
            x={col * (CELL + GAP) + 30}
            y={row * (CELL + GAP)}
            width={CELL}
            height={CELL}
            rx={2}
            fill={STEPS[level(day.count, b)]}
          >
            <title>
              {day.count} contribution{day.count === 1 ? "" : "s"} on {day.date}
            </title>
          </rect>
        )),
      )}
    </svg>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-code text-[10px] tracking-[0.14em] uppercase text-ink-3">Less</span>
      {STEPS.map((bg, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[11px] rounded-[2px]"
          style={{ background: bg }}
        />
      ))}
      <span className="font-code text-[10px] tracking-[0.14em] uppercase text-ink-3">More</span>
    </div>
  );
}
